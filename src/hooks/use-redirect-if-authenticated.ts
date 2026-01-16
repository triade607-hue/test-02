/* eslint-disable react-hooks/set-state-in-effect */
"use client";

// ============================================================
// HOOK useRedirectIfAuthenticated - Redirection si connecté
// ============================================================

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

interface UseRedirectIfAuthenticatedOptions {
  redirectTo?: string;
}

interface UseRedirectIfAuthenticatedReturn {
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
}

export function useRedirectIfAuthenticated(
  options: UseRedirectIfAuthenticatedOptions = {}
): UseRedirectIfAuthenticatedReturn {
  const { redirectTo = "/membre" } = options;
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // État local pour tracker si on a déjà fait la vérification initiale
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Ne rien faire tant que le contexte charge la session initiale
    if (isLoading) return;

    // Marquer qu'on a fait la vérification
    if (!hasCheckedAuth) {
      setHasCheckedAuth(true);
    }

    // Rediriger si authentifié
    if (isAuthenticated) {
      // Vérifier s'il y a une URL de redirection sauvegardée
      const savedRedirect = sessionStorage.getItem("redirectAfterLogin");

      if (savedRedirect) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.replace(savedRedirect);
      } else {
        router.replace(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, hasCheckedAuth]);

  return {
    // On vérifie l'auth seulement au premier chargement
    isCheckingAuth: isLoading && !hasCheckedAuth,
    isAuthenticated,
  };
}

export default useRedirectIfAuthenticated;