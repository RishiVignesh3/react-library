# pkce-spa — PKCE sign-in (how it works)

This app uses **OAuth 2.0 Authorization Code** with **PKCE** (RFC 7636) against **Google’s** authorization and token endpoints. There is **no client secret in the browser** for the public SPA flow; optional `VITE_OIDC_CLIENT_SECRET` exists for server-style or hybrid cases only when you choose to send it at the token endpoint (see `@org/oauth-session`).

Code is split across three packages:

| Package | Role |
|--------|------|
| **`pkce-spa`** | React UI, routes, `AuthProvider`, and `src/auth/oidc.ts` wiring. |
| **`@org/oauth-session`** | Google session module from `createGooglePkceOauthSession()` — storage keys, `startSignInRedirect`, `completeSignInFromCurrentUrl`, refresh, revoke. |
| **`@org/pkce-identity`** | Low-level building blocks: `createPkcePair`, `buildAuthorizationUrl`, `buildAuthorizationCodeTokenBody`, etc. |

---

## 1. App bootstrap (order of execution on load)

1. **`main.tsx`**  
   Renders: `BrowserRouter` → **`AuthProvider`** → **`App`** (routes).

2. **`AuthProvider`** (`src/auth/AuthProvider.tsx`)  
   - If OIDC is not configured (missing `VITE_OIDC_CLIENT_ID`), sets `isLoading` false and stops.  
   - Otherwise: **`getStoredSession()`** → **`setUser(...)`** from `localStorage` (session key: `pkce-spa:session` via `AUTH_SESSION_STORAGE_KEY`).  
   - Subscribes to **`window` `storage`**: when the session key changes in another tab, reloads the user.  
   - If the user has a **refresh token**, schedules **`refreshAccessTokenCoordinated({ force: false })`** before access-token expiry (buffer from `VITE_TOKEN_REFRESH_BUFFER_SEC`, default 300s).

3. **`App`** (`src/app/app.tsx`)  
   Routes: `/` → `HomePage`, `/signin-callback` → `SigninCallbackPage`.

---

## 2. User clicks “Sign in” (redirect leg)

Triggered from the UI through **`useAuth().signIn()`** → **`startSignInRedirect()`** (from `src/auth/oidc.ts`, implemented in `oauth-session`).

**Order inside `startSignInRedirect`:**

1. **`createPkcePair()`** (`@org/pkce-identity`) — random `code_verifier` + `code_challenge` (S256).
2. Random **`state`** and **`nonce`** (OIDC).
3. **`sessionStorage.setItem('pkce-spa:pkce-pending', { state, codeVerifier, nonce })`** — verifier is *only* in the browser; it never appears in the redirect URL.
4. **`buildAuthorizationUrl(...)`** — query includes `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge`, `code_challenge_method=S256`, `nonce`, plus Google extras such as `access_type=offline` and `prompt`.
5. **`window.location.assign(authorizationUrl)`** — full-page navigation to Google. Your React app unloads; nothing runs until the user returns to the **callback** URL.

**Why this order:** The verifier must be stored **before** leaving the app so the return trip can find it. `state` ties the callback to this round trip and mitigates CSRF.

---

## 3. Return to `/signin-callback` (code exchange)

Google redirects the browser to:

`{origin}/signin-callback?code=...&state=...`  
(or `?error=...` if the user denied consent).

**`SigninCallbackPage`** (`src/app/SigninCallbackPage.tsx`) runs **once** in a `useEffect`:

1. **`completeSignInFromCurrentUrl()`** (oauth-session) — see below.  
2. **`refreshUser()`** from context — re-reads session from `localStorage` so `AuthProvider`’s `user` updates.  
3. **`navigate('/', { replace: true })`**.

**Order inside `completeSignInFromCurrentUrl`:**

1. Read `error` / `error_description` from the query → throw if present.  
2. Read `code` and `state` → throw if missing.  
3. Load **`pkce-spa:pkce-pending`** from `sessionStorage` → throw if missing or JSON invalid.  
4. **Compare** `pending.state` with the URL `state` → throw on mismatch, then **remove** the pending key from `sessionStorage` (one-time use).  
5. **`buildAuthorizationCodeTokenBody(...)`** with `grant_type=authorization_code`, `code`, `redirect_uri`, `client_id`, **`code_verifier`**, optional `client_secret`.  
6. **`POST`** Google **token** endpoint with `Content-Type: application/x-www-form-urlencoded`.  
7. Parse JSON: `access_token`, optional `id_token`, `refresh_token`, `expires_in`.  
8. **`GET`** **userinfo** with `Authorization: Bearer {access_token}` to build the profile.  
9. **`persistSession(session)`** — writes `pkce-spa:session` to **`localStorage`**.  
10. Return the **`AuthSession`**.

**Why this order:** The token request must use the same **`redirect_uri`** as step 2 and the **`code_verifier`** that was stored with the matching `state`. Userinfo comes after a valid access token is available.

---

## 4. After sign-in: session and refresh (background)

- **Session** lives in **`localStorage`** under `pkce-spa:session` (shared across tabs; `storage` event keeps `AuthProvider` in sync).  
- **`AuthProvider` effect** (depends on `user` + `refreshToken`): before expiry minus buffer, calls **`refreshAccessTokenCoordinated`**, which:
  - serializes refresh via **`navigator.locks`** or a **localStorage** lease,
  - **`POST`** refresh grant to the token endpoint,
  - **updates** stored session on success,
  - on **`invalid_grant`**, clears session and you typically show “sign in again”.

---

## 5. Sign out

**`useAuth().signOut()`** → **`revokeAndClearSession()`** (oauth-session):

1. **`clearStoredSession()`** (remove `localStorage` session).  
2. If there was a **refresh** or **access** token, **`POST`** Google’s **revoke** endpoint (network errors are ignored after local clear).

---

## 6. Quick reference — main functions

| When | What runs |
|------|-----------|
| App load, configured | `getStoredSession`, optional scheduled `refreshAccessTokenCoordinated` |
| User sign-in click | `startSignInRedirect` → `createPkcePair` → store pending → `buildAuthorizationUrl` → redirect |
| `/signin-callback` | `completeSignInFromCurrentUrl` → validate state → `buildAuthorizationCodeTokenBody` → token POST → userinfo → `persistSession` |
| Proactive / forced refresh | `refreshAccessTokenCoordinated` → `performRefreshTokenRequest` |
| Sign out | `revokeAndClearSession` |

---

## 7. Configuration checklist

- **`VITE_OIDC_CLIENT_ID`** — Google OAuth 2.0 client ID (required).  
- **Authorized redirect URI** in Google Cloud Console: **`https://<your-host>/signin-callback`** (and the same for local dev, e.g. `http://localhost:4201/signin-callback` — match **scheme, host, port, path** exactly).  
- Optional: `VITE_OIDC_PROMPT`, `VITE_TOKEN_REFRESH_BUFFER_SEC`, `VITE_OIDC_CLIENT_SECRET` (see `src/auth/oidc.ts` and `oauth-session` for usage).

For the generic OIDC / PKCE background (why PKCE, security notes), see `docs/react-spa-oidc-pkce.md` and `pkce-identity/README.md` in the repo.
