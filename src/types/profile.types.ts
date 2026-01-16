// ============================================================
// TYPES PROFIL - imo2tun
// ============================================================

import type { UserProfile, MessageResponse } from "./auth.types";

// ==================== UPDATE PROFILE ====================

/**
 * Payload pour mettre à jour le profil
 * Tous les champs sont optionnels
 */
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  countryCode?: string;
  profession?: string;
  bio?: string;
  expertise?: string[];
}

/**
 * Réponse de mise à jour du profil
 */
export interface UpdateProfileResponse {
  message: string;
  profile: UserProfile;
}

// ==================== PROFILE PICTURE ====================

/**
 * Réponse de l'upload de photo
 */
export interface UploadPictureResponse {
  message: string;
  profilePicture: string; // URL de la nouvelle image
}

// ==================== CHANGE PASSWORD ====================

/**
 * Payload pour changer le mot de passe
 */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Réponse du changement de mot de passe
 */
export type ChangePasswordResponse = MessageResponse;

// ==================== DELETE ACCOUNT ====================

/**
 * Payload pour supprimer le compte
 */
export interface DeleteAccountPayload {
  password: string;
  reason?: string;
}

/**
 * Réponse de suppression du compte
 */
export type DeleteAccountResponse = MessageResponse;

// ==================== PROFILE STATE ====================

/**
 * État du profil dans le hook
 */
export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  isUploadingPicture: boolean;
  isChangingPassword: boolean;
  error: string | null;
  successMessage: string | null;
}

// ==================== FORM VALIDATION ====================

/**
 * Erreurs de validation du formulaire de profil
 */
export interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  countryCode?: string;
  profession?: string;
  bio?: string;
}

/**
 * Erreurs de validation du changement de mot de passe
 */
export interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
