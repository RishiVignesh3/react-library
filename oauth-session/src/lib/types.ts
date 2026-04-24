export type AuthUserProfile = {
  sub: string;
  email?: string;
  name?: string;
};

export type AuthSession = {
  accessToken: string;
  idToken?: string;
  /** Present when Google returns `refresh_token` (requires offline access + consent). */
  refreshToken?: string;
  /** Unix seconds */
  expiresAt: number;
  profile: AuthUserProfile;
};
