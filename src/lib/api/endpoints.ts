// ============================================================
// ENDPOINTS API - imo2tun
// ============================================================

/**
 * URL de base de l'API
 * À configurer via variable d'environnement
 */
export const API_BASE_URL = "https://staging-api.imo2tun.org";

/**
 * Endpoints d'authentification
 */
export const AUTH_ENDPOINTS = {
  // Inscription
  REGISTER: "/api/auth/register",
  SETUP_ACCOUNT: "/api/auth/setup-account",

  // Connexion (2 étapes)
  PRE_LOGIN: "/api/auth/pre-login",
  LOGIN_OTP: "/api/auth/login-otp",

  // Token
  REFRESH: "/api/auth/refresh",

  // Mot de passe
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
} as const;

/**
 * Endpoints de profil
 */
export const PROFILE_ENDPOINTS = {
  ME: "/api/profile/me",
  UPDATE: "/api/profile/update",
  UPLOAD_PICTURE: "/api/profile/picture",
} as const;

/**
 * Tous les endpoints
 */
export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  PROFILE: PROFILE_ENDPOINTS,
} as const;
