"use client";

// ============================================================
// HOOK usePasswordReset - Gestion du mot de passe oublié
// ============================================================

import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";

type PasswordResetStep = "request" | "email-sent" | "reset-form" | "success";

interface UsePasswordResetState {
  step: PasswordResetStep;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

interface UsePasswordResetReturn extends UsePasswordResetState {
  // Étape 1: Demander un email de réinitialisation
  requestReset: (email: string) => Promise<void>;

  // Étape 2: Définir le nouveau mot de passe
  submitNewPassword: (token: string, newPassword: string) => Promise<void>;

  // Utilitaires
  reset: () => void;
  goToResetForm: () => void;
}

/**
 * Hook pour gérer le processus de réinitialisation du mot de passe
 */
export function usePasswordReset(
  initialToken?: string
): UsePasswordResetReturn {
  const { forgotPassword, resetPassword } = useAuth();

  // Si un token est fourni, on est à l'étape du formulaire de reset
  const initialStep: PasswordResetStep = initialToken
    ? "reset-form"
    : "request";

  const [state, setState] = useState<UsePasswordResetState>({
    step: initialStep,
    isLoading: false,
    error: null,
    successMessage: null,
  });

  /**
   * Étape 1: Demander l'envoi d'un email de réinitialisation
   */
  const requestReset = useCallback(
    async (email: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await forgotPassword({ email });

        setState({
          step: "email-sent",
          isLoading: false,
          error: null,
          successMessage:
            "Si cet email existe, un lien de réinitialisation a été envoyé.",
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : "Une erreur est survenue",
        }));
      }
    },
    [forgotPassword]
  );

  /**
   * Étape 2: Soumettre le nouveau mot de passe
   */
  const submitNewPassword = useCallback(
    async (token: string, newPassword: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await resetPassword({ token, newPassword });

        setState({
          step: "success",
          isLoading: false,
          error: null,
          successMessage:
            "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "Le lien est invalide ou a expiré",
        }));
      }
    },
    [resetPassword]
  );

  /**
   * Aller au formulaire de reset (utilisé quand on a un token)
   */
  const goToResetForm = useCallback(() => {
    setState((prev) => ({ ...prev, step: "reset-form" }));
  }, []);

  /**
   * Réinitialiser le processus
   */
  const reset = useCallback(() => {
    setState({
      step: "request",
      isLoading: false,
      error: null,
      successMessage: null,
    });
  }, []);

  return {
    ...state,
    requestReset,
    submitNewPassword,
    reset,
    goToResetForm,
  };
}

export default usePasswordReset;
