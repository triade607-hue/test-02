// ============================================================
// TYPES D'AUTHENTIFICATION - imo2tun
// ============================================================

// ==================== REQUEST PAYLOADS ====================

/**
 * Payload pour l'inscription (envoyé en FormData)
 */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  profession: string;
  acceptCondition: boolean;
  acceptCommunication: boolean;
}

/**
 * Payload pour activer le compte
 */
export interface SetupAccountPayload {
  token: string;
}

/**
 * Payload pour la pré-connexion (étape 1 du login)
 */
export interface PreLoginPayload {
  email: string;
  password: string;
}

/**
 * Payload pour la vérification OTP (étape 2 du login)
 */
export interface LoginOTPPayload {
  preAuthToken: string;
  otpCode: string;
}

/**
 * Payload pour rafraîchir le token
 */
export interface RefreshTokenPayload {
  refreshToken: string;
}

/**
 * Payload pour mot de passe oublié
 */
export interface ForgotPasswordPayload {
  email: string;
}

/**
 * Payload pour réinitialiser le mot de passe
 */
export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// ==================== RESPONSE TYPES ====================

/**
 * Réponse générique avec message
 */
export interface MessageResponse {
  message: string;
}

/**
 * Réponse de la pré-connexion
 */
export interface PreLoginResponse {
  preAuthToken: string;
}

/**
 * Réponse de la connexion OTP (tokens)
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Réponse du refresh token
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Profil utilisateur
 */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string | null;
  phone: string;
  role: UserRole;
  accountType: AccountType;
  memberType: MemberType | null;
  profilePicture: string | null;
  bio: string | null;
  expertise: string[];
  profession: string;
  emailVerified: boolean;
  active: boolean;
  mentor: boolean;
  membershipTierId: string | null;
  membershipTierName: string | null;
  membershipEndDate: string | null;
  membershipStartDate: string | null;
  lastLoginAt: string;
  createdAt: string;
}

// ==================== ENUMS & UNIONS ====================

export type UserRole =
  | "ROLE_GUEST"
  | "ROLE_MEMBER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN";

export type AccountType = "INDIVIDUAL" | "ORGANIZATION";

export type MemberType =
  | "OFFREUR"
  | "UTILISATEUR"
  | "CONTRIBUTEUR"
  | "PARTENAIRE";

// ==================== AUTH STATE ====================

/**
 * État de l'authentification
 */
export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * État du processus de login (2 étapes)
 */
export interface LoginState {
  step: "credentials" | "otp";
  preAuthToken: string | null;
  isLoading: boolean;
  error: string | null;
}

// ==================== API ERROR ====================

/**
 * Erreur API standardisée
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}
