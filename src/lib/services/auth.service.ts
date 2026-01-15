// ============================================================
// SERVICE D'AUTHENTIFICATION - imo2tun
// ============================================================

import { apiClient, setTokens, clearTokens, get } from "@/lib/api/client";
import { AUTH_ENDPOINTS, PROFILE_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  RegisterPayload,
  SetupAccountPayload,
  PreLoginPayload,
  LoginOTPPayload,
  RefreshTokenPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  MessageResponse,
  PreLoginResponse,
  LoginResponse,
  RefreshTokenResponse,
  UserProfile,
} from "@/types/auth.types";

// ==================== INSCRIPTION ====================

/**
 * Inscription d'un nouvel utilisateur
 * @param payload - Données d'inscription
 * @returns Message de confirmation
 */
export async function register(
  payload: RegisterPayload
): Promise<MessageResponse> {
  // Convertir les booléens en string pour FormData
  const formDataPayload = {
    ...payload,
    acceptCondition: String(payload.acceptCondition),
    acceptCommunication: String(payload.acceptCommunication),
  };

  return apiClient<MessageResponse>(AUTH_ENDPOINTS.REGISTER, {
    method: "POST",
    body: formDataPayload,
    isFormData: true,
  });
}

/**
 * Activation du compte avec le token reçu par email
 * @param payload - Token d'activation
 * @returns Message de confirmation
 */
export async function setupAccount(
  payload: SetupAccountPayload
): Promise<MessageResponse> {
  return apiClient<MessageResponse>(AUTH_ENDPOINTS.SETUP_ACCOUNT, {
    method: "POST",
    body: payload,
  });
}

// ==================== CONNEXION (2 ÉTAPES) ====================

/**
 * Étape 1: Pré-connexion avec email et mot de passe
 * @param payload - Identifiants de connexion
 * @returns Token de pré-authentification pour l'étape OTP
 */
export async function preLogin(
  payload: PreLoginPayload
): Promise<PreLoginResponse> {
  return apiClient<PreLoginResponse>(AUTH_ENDPOINTS.PRE_LOGIN, {
    method: "POST",
    body: payload,
  });
}

/**
 * Étape 2: Vérification OTP et connexion finale
 * @param payload - Token de pré-auth + code OTP
 * @returns Tokens d'accès et de refresh
 */
export async function loginWithOTP(
  payload: LoginOTPPayload
): Promise<LoginResponse> {
  const response = await apiClient<LoginResponse>(AUTH_ENDPOINTS.LOGIN_OTP, {
    method: "POST",
    body: payload,
  });

  // Sauvegarder les tokens
  setTokens(response.accessToken, response.refreshToken);

  return response;
}

/**
 * Connexion complète (combine preLogin + loginWithOTP)
 * Utilisé quand on a déjà le code OTP
 */
export async function login(
  email: string,
  password: string,
  otpCode: string
): Promise<LoginResponse> {
  // Étape 1: Pré-login
  const preLoginResponse = await preLogin({ email, password });

  // Étape 2: OTP
  const loginResponse = await loginWithOTP({
    preAuthToken: preLoginResponse.preAuthToken,
    otpCode,
  });

  return loginResponse;
}

// ==================== DÉCONNEXION ====================

/**
 * Déconnexion de l'utilisateur
 * Supprime les tokens stockés localement
 */
export function logout(): void {
  clearTokens();

  // Rediriger vers la page d'accueil ou de login
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}

// ==================== TOKEN ====================

/**
 * Rafraîchir le token d'accès
 * @param payload - Refresh token
 * @returns Nouveaux tokens
 */
export async function refreshToken(
  payload: RefreshTokenPayload
): Promise<RefreshTokenResponse> {
  const response = await apiClient<RefreshTokenResponse>(
    AUTH_ENDPOINTS.REFRESH,
    {
      method: "POST",
      body: payload,
    }
  );

  // Mettre à jour les tokens stockés
  setTokens(response.accessToken, response.refreshToken);

  return response;
}

// ==================== MOT DE PASSE ====================

/**
 * Demande de réinitialisation du mot de passe
 * @param payload - Email de l'utilisateur
 * @returns Message de confirmation
 */
export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<MessageResponse> {
  return apiClient<MessageResponse>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
    method: "POST",
    body: payload,
  });
}

/**
 * Réinitialisation du mot de passe avec le token
 * @param payload - Token + nouveau mot de passe
 * @returns Message de confirmation
 */
export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<MessageResponse> {
  return apiClient<MessageResponse>(AUTH_ENDPOINTS.RESET_PASSWORD, {
    method: "POST",
    body: payload,
  });
}

// ==================== PROFIL ====================

/**
 * Récupérer le profil de l'utilisateur connecté
 * @returns Profil utilisateur
 */
export async function getProfile(): Promise<UserProfile> {
  return get<UserProfile>(PROFILE_ENDPOINTS.ME, true);
}

// ==================== EXPORT GROUPÉ ====================

export const authService = {
  // Inscription
  register,
  setupAccount,

  // Connexion
  preLogin,
  loginWithOTP,
  login,
  logout,

  // Token
  refreshToken,

  // Mot de passe
  forgotPassword,
  resetPassword,

  // Profil
  getProfile,
};

export default authService;
