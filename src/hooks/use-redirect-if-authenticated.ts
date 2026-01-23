/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// ============================================================
// HOOK useRedirectIfAuthenticated - Redirection si connecté
// Version corrigée - Gère sessionStorage, query params ET localStorage
// ============================================================

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./use-auth";

interface UseRedirectIfAuthenticatedOptions {
  redirectTo?: string;
}

interface UseRedirectIfAuthenticatedReturn {
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
}

/**
 * Récupère l'URL de redirection depuis plusieurs sources (par priorité) :
 * 1. Query param "redirect" dans l'URL (avec action si présent)
 * 2. sessionStorage "redirectAfterLogin"
 * 3. localStorage avec action pending (événement, candidature)
 */
function getRedirectUrl(searchParams: URLSearchParams): string | null {
  // 1. Query param "redirect" (priorité haute)
  const redirectParam = searchParams.get("redirect");
  if (redirectParam) {
    // Préserver le query param "action" s'il existe (pour inscription événement)
    const action = searchParams.get("action");
    if (action) {
      // Vérifier si l'URL contient déjà des query params
      const separator = redirectParam.includes("?") ? "&" : "?";
      return `${redirectParam}${separator}action=${action}`;
    }
    return redirectParam;
  }

  // 2. sessionStorage (set par AuthGuard ou client.ts)
  const sessionRedirect = sessionStorage.getItem("redirectAfterLogin");
  if (sessionRedirect) {
    return sessionRedirect;
  }

  // 3. localStorage - Pending event registration
  // Si on a un pending registration mais pas de redirect param,
  // on laisse la page par défaut et la page événement gérera

  return null;
}

/**
 * Nettoie toutes les données de redirection après utilisation
 */
function clearRedirectData(): void {
  sessionStorage.removeItem("redirectAfterLogin");
  // Note: On ne supprime PAS pendingEventRegistration ici
  // car la page événement en a besoin pour compléter l'inscription
}

export function useRedirectIfAuthenticated(
  options: UseRedirectIfAuthenticatedOptions = {},
): UseRedirectIfAuthenticatedReturn {
  const { redirectTo = "/membre" } = options;
  const router = useRouter();
  const searchParams = useSearchParams();
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
      // Chercher l'URL de redirection
      const savedRedirect = getRedirectUrl(searchParams);

      if (savedRedirect) {
        clearRedirectData();
        router.replace(savedRedirect);
      } else {
        router.replace(redirectTo);
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
    redirectTo,
    hasCheckedAuth,
    searchParams,
  ]);

  return {
    // On vérifie l'auth seulement au premier chargement
    isCheckingAuth: isLoading && !hasCheckedAuth,
    isAuthenticated,
  };
}

export default useRedirectIfAuthenticated;
