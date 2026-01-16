"use client";

// ============================================================
// HOOK useProfile - Gestion du profil utilisateur
// ============================================================

import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";
import { profileService } from "@/lib/services/profile.service";
import type { UserProfile } from "@/types/auth.types";
import type {
  UpdateProfilePayload,
  ChangePasswordPayload,
  ProfileState,
} from "@/types/profile.types";

// ==================== INITIAL STATE ====================

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  isUpdating: false,
  isUploadingPicture: false,
  isChangingPassword: false,
  error: null,
  successMessage: null,
};

// ==================== HOOK ====================

interface UseProfileReturn extends ProfileState {
  // Actions
  fetchProfile: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<boolean>;
  uploadPicture: (file: File) => Promise<boolean>;
  deletePicture: () => Promise<boolean>;
  changePassword: (payload: ChangePasswordPayload) => Promise<boolean>;

  // Utilitaires
  clearError: () => void;
  clearSuccessMessage: () => void;
  reset: () => void;
}

/**
 * Hook pour gérer toutes les opérations du profil utilisateur
 * - Lecture du profil
 * - Mise à jour des informations
 * - Upload/suppression de photo
 * - Changement de mot de passe
 */
export function useProfile(): UseProfileReturn {
  const { user, refreshUser } = useAuth();

  const [state, setState] = useState<ProfileState>({
    ...initialState,
    profile: user,
  });

  // ==================== HELPERS ====================

  const setError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      error,
      successMessage: null,
      isLoading: false,
      isUpdating: false,
      isUploadingPicture: false,
      isChangingPassword: false,
    }));
  }, []);

  const setSuccess = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      successMessage: message,
      error: null,
    }));
  }, []);

  const handleError = useCallback((err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    return "Une erreur est survenue";
  }, []);

  // ==================== FETCH PROFILE ====================

  /**
   * Récupérer le profil depuis l'API
   */
  const fetchProfile = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const profile = await profileService.getProfile();

      setState((prev) => ({
        ...prev,
        profile,
        isLoading: false,
      }));
    } catch (err) {
      setError(handleError(err));
    }
  }, [setError, handleError]);

  // ==================== UPDATE PROFILE ====================

  /**
   * Mettre à jour les informations du profil
   * @returns true si succès, false sinon
   */
  const updateProfile = useCallback(
    async (payload: UpdateProfilePayload): Promise<boolean> => {
      setState((prev) => ({ ...prev, isUpdating: true, error: null }));

      try {
        const response = await profileService.updateProfile(payload);

        // Mettre à jour le state local
        setState((prev) => ({
          ...prev,
          profile: response.profile,
          isUpdating: false,
        }));

        // Rafraîchir le contexte auth
        await refreshUser();

        setSuccess("Profil mis à jour avec succès");
        return true;
      } catch (err) {
        setError(handleError(err));
        return false;
      }
    },
    [refreshUser, setError, setSuccess, handleError]
  );

  // ==================== UPLOAD PICTURE ====================

  /**
   * Uploader une nouvelle photo de profil
   * @param file - Fichier image à uploader
   * @returns true si succès, false sinon
   */
  const uploadPicture = useCallback(
    async (file: File): Promise<boolean> => {
      // Validation côté client
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Format non supporté. Utilisez JPG, PNG, GIF ou WebP.");
        return false;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("L'image ne doit pas dépasser 5 Mo.");
        return false;
      }

      setState((prev) => ({ ...prev, isUploadingPicture: true, error: null }));

      try {
        const response = await profileService.uploadProfilePicture(file);

        // Mettre à jour le profil local avec la nouvelle URL
        setState((prev) => ({
          ...prev,
          profile: prev.profile
            ? { ...prev.profile, profilePicture: response.profilePicture }
            : null,
          isUploadingPicture: false,
        }));

        // Rafraîchir le contexte auth
        await refreshUser();

        setSuccess("Photo de profil mise à jour");
        return true;
      } catch (err) {
        setState((prev) => ({ ...prev, isUploadingPicture: false }));
        setError(handleError(err));
        return false;
      }
    },
    [refreshUser, setError, setSuccess, handleError]
  );

  /**
   * Supprimer la photo de profil
   * @returns true si succès, false sinon
   */
  const deletePicture = useCallback(async (): Promise<boolean> => {
    setState((prev) => ({ ...prev, isUploadingPicture: true, error: null }));

    try {
      await profileService.deleteProfilePicture();

      // Mettre à jour le profil local
      setState((prev) => ({
        ...prev,
        profile: prev.profile
          ? { ...prev.profile, profilePicture: null }
          : null,
        isUploadingPicture: false,
      }));

      // Rafraîchir le contexte auth
      await refreshUser();

      setSuccess("Photo de profil supprimée");
      return true;
    } catch (err) {
      setState((prev) => ({ ...prev, isUploadingPicture: false }));
      setError(handleError(err));
      return false;
    }
  }, [refreshUser, setError, setSuccess, handleError]);

  // ==================== CHANGE PASSWORD ====================

  /**
   * Changer le mot de passe
   * @returns true si succès, false sinon
   */
  const changePassword = useCallback(
    async (payload: ChangePasswordPayload): Promise<boolean> => {
      // Validation côté client
      if (payload.newPassword !== payload.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return false;
      }

      if (payload.newPassword.length < 8) {
        setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
        return false;
      }

      setState((prev) => ({ ...prev, isChangingPassword: true, error: null }));

      try {
        await profileService.changePassword(payload);

        setState((prev) => ({
          ...prev,
          isChangingPassword: false,
        }));

        setSuccess("Mot de passe modifié avec succès");
        return true;
      } catch (err) {
        setState((prev) => ({ ...prev, isChangingPassword: false }));
        setError(handleError(err));
        return false;
      }
    },
    [setError, setSuccess, handleError]
  );

  // ==================== UTILITIES ====================

  /**
   * Effacer l'erreur
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  /**
   * Effacer le message de succès
   */
  const clearSuccessMessage = useCallback(() => {
    setState((prev) => ({ ...prev, successMessage: null }));
  }, []);

  /**
   * Réinitialiser l'état
   */
  const reset = useCallback(() => {
    setState({ ...initialState, profile: user });
  }, [user]);

  // ==================== RETURN ====================

  return {
    ...state,
    fetchProfile,
    updateProfile,
    uploadPicture,
    deletePicture,
    changePassword,
    clearError,
    clearSuccessMessage,
    reset,
  };
}

export default useProfile;
