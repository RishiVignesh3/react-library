# React SPA with OIDC + PKCE (no custom auth backend)

This document describes a **second application style**: still a **static React app**, but with **real sign-in** using **OpenID Connect (OIDC)** and the **Authorization Code flow with PKCE** (RFC 7636). The important idea is:

> You do **not** run your own login server, session store, or token minting. **Google, Microsoft, Auth0, Okta, and others** host the OIDC/OAuth2 endpoints. Your app is a **public client** that proves possession of the PKCE verifier when exchanging the authorization code for tokens.

You **still** need a place to **register** the app (cloud consoles). That is not “your backend”—it is **configuration on the provider**.

---

## What you implement vs what the platform does

| Responsibility | Your React app (browser) | Identity provider (IdP) |
|----------------|-------------------------|-------------------------|
| User sign-in UI / redirect | Yes – start OIDC sign-in, handle callback | Hosts login page, MFA, org policies |
| `code_verifier` / `code_challenge` (PKCE) | Yes – generate per request | Verifies on token request |
| Client secret (public SPA) | **No** (must not ship secrets to the browser) | N/A for public client + PKCE |
| Issuing `id_token` / `access_token` | No | Yes |
| User directory | No | Yes (or federated, e.g. “Sign in with Google”) |
| **Your** REST API | Only if you build one; not required for “auth only” | N/A |

If later you add **your own** API, you will validate the **access token** (or **id_token** depending on design) on that server—that **is** a backend, but it is **not** an auth server. This guide assumes you want **auth without implementing an auth server**; a separate doc can cover “API + JWT validation.”

---

## Do Google and others support this without your backend?

**Yes, for the identity layer.** All major commercial IdPs support **OAuth 2.0 authorization code + PKCE** for **browser-based public clients** (as long as you follow their app registration and security guidance).

| Provider | OIDC / OAuth2 suitable for browser SPA + PKCE | Notes |
|----------|-----------------------------------------------|--------|
| **Google** | Yes | Create OAuth 2.0 **Web** credentials; set **Authorized JavaScript origins** and **Authorized redirect URIs**. Google’s docs cover PKCE (including patterns aligned with public clients; see [Google’s OAuth2 docs](https://developers.google.com/identity/protocols/oauth2) and the **web** sign-in guides). |
| **Microsoft Entra ID** (Azure AD) | Yes | “Single-page application” platform config, PKCE, redirect URIs. |
| **Auth0** | Yes | First-class SPA + PKCE, quickstarts for React. |
| **Okta** | Yes | SPA app type, PKCE. |
| **Amazon Cognito** | Yes | Hosted UI + public client, PKCE. |
| **Keycloak** (hosted or self-run) | Yes | You host Keycloak, but you **do not** implement OIDC from scratch. |
| **GitHub** | OAuth2 + PKCE (not full OIDC) | Good for “Sign in with GitHub”; id_token claims differ from OIDC. |

**Practical takeaway:** You pick **one** IdP, create an app registration, allow your dev and prod origins, then wire a React library to perform the code+PKCE flow. **You do not implement token or authorization endpoints yourself.**

**Caveat (honest):** Some organizations mandate a **Backend-for-Frontend (BFF)** or **httpOnly cookies** to keep refresh tokens off the client. That is a **security architecture** choice, not a requirement to “have a backend to use Google.” For many internal tools and public SPAs, **PKCE in the browser + short-lived access tokens** + careful storage is an accepted pattern; validate with your security team if you handle regulated data.

---

## Why PKCE (and not “implicit” flow)

- **Implicit flow** (token in URL fragment) is **deprecated** for new SPAs. Prefer **authorization code with PKCE**.
- PKCE prevents stolen authorization codes from being exchanged without the **verifier** that only your app generated.

---

## High-level flow (browser)

```mermaid
sequenceDiagram
  participant U as User
  participant A as Your React SPA
  participant I as IdP (e.g. Google)

  U->>A: Click Sign in
  A->>A: Create code_verifier, code_challenge
  A->>I: Redirect to /authorize?...&code_challenge=...
  I->>U: Login + consent
  I->>A: Redirect to your /callback?code=...
  A->>I: POST /token (code, code_verifier, client_id, redirect_uri)
  I-->>A: id_token, access_token (optional refresh)
  A->>A: Store tokens per your policy; update UI
```

Token exchange is **from the browser to the IdP** for public clients; the IdP’s token endpoint must allow your origin (**CORS**). Major IdPs that target SPAs support this. If something blocks CORS, the usual workarounds are a thin proxy or BFF—not “rewrite OIDC on your own.”

---

## Suggested stack (React)

| Concern | Recommendation |
|--------|-----------------|
| OIDC in React | **oidc-client-ts** (or **@auth0/auth0-spa** if you standardize on Auth0) |
| Routing | `react-router-dom` – **dedicated** `/signin-callback` (or `?` handler) with **fast** `UserManager.signinCallback()` |
| API calls to a **your** service | `Authorization: Bearer` from access token (future); **not** required for a purely client app |
| Config | `client_id`, `authority` (OIDC issuer URL), `redirect_uri`, `post_logout_redirect_uri`, `scope` (e.g. `openid profile email`) |

Implement **one** `UserManager` (or single Auth0 provider) at app root; **avoid** ad-hoc PKCE in every component—let the library handle storage of transient PKCE state (often `sessionStorage` for the sign-in round trip).

---

## Security checklist (client-only auth)

- **No client secret** in frontend bundles.
- **Redirect URI** exact match (including path, `http` vs `https`, trailing slash per provider).
- **Prefer** in-memory access token; if you use `localStorage` for refresh, understand **XSS** risk; many teams use **short sessions** and re-login, or a BFF for refresh.
- **Validate** `state` and **nonce** (libraries usually do this for OIDC).
- **CSP** and dependency hygiene to reduce XSS—tokens in the client are only as safe as your JS.

---

## Step-by-step implementation plan

Use this as a second product line parallel to the fully offline app in [complex-react-app-client-only.md](./complex-react-app-client-only.md). Adjust phases to your release cadence.

### Phase 0 – Choose provider and app registration

- [ ] Pick **one** IdP: Google, Microsoft, Auth0, or Okta.
- [ ] In the provider’s console, create a **public** (SPA / web) client: note **Client ID** and **Issuer/authority** URL.
- [ ] Add **redirect URIs**: `http://localhost:4200/callback` (or your Nx app port) and your production URL.
- [ ] Add **JavaScript origin** (or equivalent) for local + prod.
- [ ] Note **supported scopes** (`openid` minimum; add `email`, `profile` as needed).

**Exit:** You can see client ID, issuer, and allowed URIs in the console.

### Phase 1 – Install OIDC client and environment config

- [ ] Add `oidc-client-ts` (or provider-specific SPA SDK if you choose Auth0’s).
- [ ] Use **Vite** env vars: `VITE_OIDC_AUTHORITY`, `VITE_OIDC_CLIENT_ID`, `VITE_OIDC_REDIRECT_URI` (never put secrets; client ID is public for public clients).
- [ ] Create `OidcConfig` in `src/auth/oidcConfig.ts` and validate at startup in dev.

**Exit:** App builds with config loaded from env (no real login yet).

### Phase 2 – Sign-in, callback, and sign-out

- [ ] Initialize `UserManager` with `authority`, `client_id`, `redirect_uri`, `response_type: 'code'`, `scope`, `automaticSilentRenew` if you use silent renew (optional; depends on IdP and third-party cookie restrictions).
- [ ] Route: **`/signin-callback`** runs `userManager.signinCallback()` and navigates to home or intended URL.
- [ ] A **Sign in** button calls `userManager.signinRedirect()` (or `signinPopup` if you prefer a popup; redirects are more reliable on mobile).
- [ ] **Sign out** – `userManager.signoutRedirect()` and register **post-logout redirect URI** in the provider.

**Exit:** Full loop: sign in → see profile in UI; sign out → session cleared in app.

### Phase 3 – Guard routes and session state

- [ ] `useEffect` on app load: `userManager.getUser()`; store user in **React state** (Context or small store) or use library hooks.
- [ ] **Protected routes**: if `!user`, redirect to sign-in (or show landing + CTA).
- [ ] **Loading** state while `getUser()` runs to avoid layout flash.

**Exit:** Authenticated and unauthenticated routes behave predictably on refresh.

### Phase 4 – Optional hardening and UX

- [ ] **Silent renew** (if supported): test in browser with third-party cookies disabled; many teams skip and use visible re-login.
- [ ] **Deep linking**: preserve return URL in `state` or query before redirecting to IdP.
- [ ] **Error page** for `?error=access_denied` on callback.
- [ ] If you add **your API** later: pass `user.access_token` to `fetch`, and add server-side validation in a small API—not part of this “no backend” identity doc.

**Exit:** Production-ready sign-in experience for a static SPA.

---

## Relationship to the “no backend” data app

- **Data-only, offline-first app** (IndexedDB, no login): use [complex-react-app-client-only.md](./complex-react-app-client-only.md).
- **This document**: add **login** and **identity** using hosted OIDC, still **no custom auth server**.

You can also **combine** them: sign in for personalization or encrypted backup, while heavy data remains local—design depends on your threat model.

---

## References (official and stable patterns)

- [OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/) (IETF BCP-style guidance for SPAs).
- [PKCE (RFC 7636)](https://www.rfc-editor.org/rfc/rfc7636) – `code_verifier` / `code_challenge`.
- [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) – `id_token`, UserInfo, standard claims.
- Provider quickstarts: **Google** [Identity / OAuth2 web](https://developers.google.com/identity), **Microsoft** [MSAL.js SPA](https://learn.microsoft.com/entra/identity-platform/scenario-spa-app-registration), **Auth0** React, **Okta** React.

---

## Next step

1. Pick **Google** vs **Auth0** vs **Entra** (fastest to integrate is often the one your org already pays for).  
2. Complete **Phase 0** registration.  
3. Add **oidc-client-ts** and implement **Phases 1–2** in your Nx Vite app (`component-library` or a new app).

If you tell me the chosen provider and your dev `redirect` URL port, a follow-up can list **exact** console fields to fill and a **minimal** `oidcConfig` snippet for that provider only.
