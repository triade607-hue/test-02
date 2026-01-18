"use client";

// ============================================================
// HOOK useContact - Gestion du formulaire de contact
// ============================================================

import { useState, useCallback } from "react";
import { contactService } from "@/lib/services/contact.service";
import type {
  ContactPayload,
  ContactState,
  NewsletterSubscribePayload,
} from "@/types/contact.types";

// ==================== INITIAL STATE ====================

const initialState: ContactState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
  successMessage: null,
};

// ==================== HOOK ====================

interface UseContactReturn extends ContactState {
  // Actions
  sendMessage: (payload: ContactPayload) => Promise<boolean>;
  subscribeNewsletter: (
    payload: NewsletterSubscribePayload,
  ) => Promise<boolean>;

  // Utilitaires
  clearError: () => void;
  clearSuccess: () => void;
  reset: () => void;
}

/**
 * Hook pour gérer le formulaire de contact et la newsletter
 */
export function useContact(): UseContactReturn {
  const [state, setState] = useState<ContactState>(initialState);

  // ==================== HELPERS ====================

  const handleError = useCallback((err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    return "Une erreur est survenue";
  }, []);

  // ==================== SEND CONTACT MESSAGE ====================

  /**
   * Envoyer un message de contact
   * @returns true si succès, false si erreur
   */
  const sendMessage = useCallback(
    async (payload: ContactPayload): Promise<boolean> => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
        isSuccess: false,
        successMessage: null,
      }));

      try {
        const response = await contactService.sendContactMessage(payload);

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          successMessage:
            response.message ||
            "Votre message a bien été envoyé. Nous vous répondrons sous peu.",
        }));

        return true;
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: handleError(err),
        }));
        return false;
      }
    },
    [handleError],
  );

  // ==================== SUBSCRIBE NEWSLETTER ====================

  /**
   * S'abonner à la newsletter
   * @returns true si succès, false si erreur
   */
  const subscribeNewsletter = useCallback(
    async (payload: NewsletterSubscribePayload): Promise<boolean> => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
        isSuccess: false,
        successMessage: null,
      }));

      try {
        const response = await contactService.subscribeNewsletter(payload);

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          successMessage:
            response.message ||
            "Vous êtes maintenant inscrit à notre newsletter !",
        }));

        return true;
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: handleError(err),
        }));
        return false;
      }
    },
    [handleError],
  );

  // ==================== UTILITIES ====================

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const clearSuccess = useCallback(() => {
    setState((prev) => ({ ...prev, isSuccess: false, successMessage: null }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // ==================== RETURN ====================

  return {
    ...state,
    sendMessage,
    subscribeNewsletter,
    clearError,
    clearSuccess,
    reset,
  };
}

export default useContact;
