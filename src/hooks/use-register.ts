"use client";

// ============================================================
// HOOK useRegister - Gestion de l'inscription
// ============================================================

import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";
import type { RegisterPayload } from "@/types/auth.types";

type RegisterStep = "form" | "success" | "error";

interface UseRegisterState {
  step: RegisterStep;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

interface UseRegisterReturn extends UseRegisterState {
  submitRegistration: (payload: RegisterPayload) => Promise<void>;
  reset: () => void;
}

/**
 * Hook pour gérer le processus d'inscription
 */
export function useRegister(): UseRegisterReturn {
  const { register } = useAuth();

  const [state, setState] = useState<UseRegisterState>({
    step: "form",
    isLoading: false,
    error: null,
    successMessage: null,
  });

  /**
   * Soumettre l'inscription
   */
  const submitRegistration = useCallback(
    async (payload: RegisterPayload) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await register(payload);

        setState({
          step: "success",
          isLoading: false,
          error: null,
          successMessage:
            "Inscription réussie ! Vérifiez vos emails pour activer votre compte.",
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          step: "error",
          isLoading: false,
          error:
            err instanceof Error ? err.message : "Erreur lors de l'inscription",
        }));
      }
    },
    [register]
  );

  /**
   * Réinitialiser le formulaire
   */
  const reset = useCallback(() => {
    setState({
      step: "form",
      isLoading: false,
      error: null,
      successMessage: null,
    });
  }, []);

  return {
    ...state,
    submitRegistration,
    reset,
  };
}

export default useRegister;
