// ============================================================
// SERVICE PROFIL - imo2tun
// ============================================================

import { apiClient, get, put, del, getAccessToken } from "@/lib/api/client";
import { API_BASE_URL, PROFILE_ENDPOINTS } from "@/lib/api/endpoints";
import type { UserProfile, MessageResponse } from "@/types/auth.types";
import type {
  UpdateProfilePayload,
  UpdateProfileResponse,
  UploadPictureResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  DeleteAccountPayload,
  DeleteAccountResponse,
} from "@/types/profile.types";

// ==================== GET PROFILE ====================

/**
 * Récupérer le profil de l'utilisateur connecté
 * @returns Profil utilisateur complet
 */
export async function getProfile(): Promise<UserProfile> {
  return get<UserProfile>(PROFILE_ENDPOINTS.ME, true);
}

// ==================== UPDATE PROFILE ====================

/**
 * Mettre à jour le profil de l'utilisateur
 * @param payload - Champs à mettre à jour
 * @returns Message + profil mis à jour
 */
export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  return put<UpdateProfileResponse>(PROFILE_ENDPOINTS.UPDATE, payload, true);
}

// ==================== PROFILE PICTURE ====================

/**
 * Uploader une nouvelle photo de profil
 * Note: Utilise fetch directement car apiClient ne gère pas bien les File
 * @param file - Fichier image à uploader
 * @returns Message + URL de la nouvelle image
 */
export async function uploadProfilePicture(
  file: File
): Promise<UploadPictureResponse> {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Non authentifié");
  }

  // Créer le FormData avec le fichier
  const formData = new FormData();
  formData.append("file", file);

  // Appel direct sans passer par apiClient
  const response = await fetch(
    `${API_BASE_URL}${PROFILE_ENDPOINTS.UPLOAD_PICTURE}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Ne PAS mettre Content-Type, le navigateur le fait automatiquement pour FormData
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erreur ${response.status}: Upload échoué`
    );
  }

  return response.json();
}

/**
 * Supprimer la photo de profil
 * @returns Message de confirmation
 */
export async function deleteProfilePicture(): Promise<MessageResponse> {
  return del<MessageResponse>(PROFILE_ENDPOINTS.UPLOAD_PICTURE, true);
}

// ==================== CHANGE PASSWORD ====================

/**
 * Changer le mot de passe de l'utilisateur connecté
 * @param payload - Ancien et nouveau mot de passe
 * @returns Message de confirmation
 */
export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
  return apiClient<ChangePasswordResponse>(PROFILE_ENDPOINTS.CHANGE_PASSWORD, {
    method: "POST",
    body: payload,
    auth: true,
  });
}

// ==================== DELETE ACCOUNT ====================

/**
 * Supprimer définitivement le compte utilisateur
 * @param payload - Mot de passe + raison optionnelle
 * @returns Message de confirmation
 */
export async function deleteAccount(
  payload: DeleteAccountPayload
): Promise<DeleteAccountResponse> {
  return apiClient<DeleteAccountResponse>(PROFILE_ENDPOINTS.DELETE, {
    method: "DELETE",
    body: payload,
    auth: true,
  });
}

// ==================== EXPORT GROUPÉ ====================

export const profileService = {
  // Lecture
  getProfile,

  // Mise à jour
  updateProfile,

  // Photo
  uploadProfilePicture,
  deleteProfilePicture,

  // Mot de passe
  changePassword,

  // Suppression compte
  deleteAccount,
};

export default profileService;
