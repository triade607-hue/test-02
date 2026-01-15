"use client";

// ============================================================
// HOOK useSetupAccount - Activation du compte
// ============================================================

import { useState, useCallback, useRef, useTransition } from "react";
import { authService } from "@/lib/services/auth.service";

type SetupStep = "idle" | "loading" | "success" | "error";

interface UseSetupAccountState {
  step: SetupStep;
  error: string | null;
  successMessage: string | null;
}

interface UseSetupAccountReturn extends UseSetupAccountState {
  isLoading: boolean;
  activateAccount: (token: string) => void;
}

/**
 * Hook pour gérer l'activation du compte
 * Utilisé sur la page /setup-account?token=xxx
 *
 * Note: Ce hook n'auto-déclenche PAS l'activation.
 * Le composant doit appeler activateAccount() explicitement.
 */
export function useSetupAccount(): UseSetupAccountReturn {
  // useTransition pour les mises à jour non-urgentes (React 19 pattern)
  const [isPending, startTransition] = useTransition();

  // Ref pour éviter les appels multiples simultanés
  const isActivatingRef = useRef(false);

  const [state, setState] = useState<UseSetupAccountState>({
    step: "idle",
    error: null,
    successMessage: null,
  });

  /**
   * Activer le compte avec le token
   */
  const activateAccount = useCallback((token: string) => {
    // Éviter les appels multiples simultanés
    if (isActivatingRef.current) return;
    isActivatingRef.current = true;

    // Utiliser startTransition pour éviter l'erreur de setState synchrone
    startTransition(async () => {
      setState({
        step: "loading",
        error: null,
        successMessage: null,
      });

      try {
        await authService.setupAccount({ token });

        setState({
          step: "success",
          error: null,
          successMessage:
            "Compte activé avec succès ! Vos identifiants ont été envoyés par email.",
        });
      } catch (err) {
        setState({
          step: "error",
          error:
            err instanceof Error
              ? err.message
              : "Le lien d'activation est invalide ou a expiré",
          successMessage: null,
        });
      } finally {
        isActivatingRef.current = false;
      }
    });
  }, []);

  return {
    ...state,
    isLoading: isPending || state.step === "loading",
    activateAccount,
  };
}

export default useSetupAccount;
