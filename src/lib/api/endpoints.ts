// ============================================================
// ENDPOINTS API - imo2tun
// ============================================================

/**
 * URL de base de l'API
 * À configurer via variable d'environnement
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://staging-api.imo2tun.org";

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
  // Lecture & mise à jour
  ME: "/api/profile/me",
  UPDATE: "/api/profile/me",

  // Photo de profil
  UPLOAD_PICTURE: "/api/profile/me/picture",

  // Mot de passe (utilisateur connecté)
  CHANGE_PASSWORD: "/api/profile/change-password",

  // Suppression compte
  DELETE: "/api/profile/me",
} as const;

/**
 * Endpoints utilisateur / dashboard
 */
export const USER_ENDPOINTS = {
  DASHBOARD: "/api/user/dashboard",
} as const;

/**
 * Endpoints événements
 */
export const EVENTS_ENDPOINTS = {
  LIST: "/api/events",
  DETAIL: (slug: string) => `/api/events/${slug}`,
  REGISTER: (id: string) => `/api/events/${id}/register`,
  UNREGISTER: (id: string) => `/api/events/${id}/unregister`,
  MY_EVENTS: "/api/user/events",
} as const;

/**
 * Endpoints articles / actualités
 */
export const ARTICLES_ENDPOINTS = {
  LIST: "/api/public/blog/posts",
  DETAIL: (slug: string) => `/api/public/blog/posts/${slug}`,
  CATEGORIES: "/api/public/blog/categories",
} as const;

/**
 * Endpoints membres
 */
export const MEMBERS_ENDPOINTS = {
  LIST: "/api/members",
  DETAIL: (id: string) => `/api/members/${id}`,
} as const;

/**
 * Endpoints adhésion / candidature
 */
export const MEMBERSHIP_ENDPOINTS = {
  TIERS: "/api/membership/tiers",
  CANDIDATURE: "/api/membership/candidature",
  MY_MEMBERSHIP: "/api/user/membership",
} as const;

/**
 * Endpoints contact / newsletter
 */
export const CONTACT_ENDPOINTS = {
  SEND: "/api/contact",
  NEWSLETTER_SUBSCRIBE: "/api/newsletter/subscribe",
  NEWSLETTER_UNSUBSCRIBE: "/api/newsletter/unsubscribe",
} as const;

/**
 * Tous les endpoints regroupés
 */
export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  PROFILE: PROFILE_ENDPOINTS,
  USER: USER_ENDPOINTS,
  EVENTS: EVENTS_ENDPOINTS,
  ARTICLES: ARTICLES_ENDPOINTS,
  MEMBERS: MEMBERS_ENDPOINTS,
  MEMBERSHIP: MEMBERSHIP_ENDPOINTS,
  CONTACT: CONTACT_ENDPOINTS,
} as const;
