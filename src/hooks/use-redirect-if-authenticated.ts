/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// ============================================================
// HOOK useRedirectIfAuthenticated - Redirection si connecté
// Version corrigée - Gère sessionStorage, query params ET localStorage
// ============================================================

import { useEffect, useState, useRef } from "react";
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
 * 1. Query param "redirect" ou "returnUrl" dans l'URL (avec action si présent)
 * 2. sessionStorage "redirectAfterLogin"
 */
function getRedirectUrl(): string | null {
  if (typeof window === "undefined") return null;

  // 1. Query params dans l'URL actuelle (priorité haute)
  const urlParams = new URLSearchParams(window.location.search);

  // Supporter les deux formats : "redirect" (events) et "returnUrl" (candidature)
  let redirectParam = urlParams.get("redirect");
  if (!redirectParam) {
    const returnUrl = urlParams.get("returnUrl");
    if (returnUrl) {
      // returnUrl est encodé, le décoder
      redirectParam = decodeURIComponent(returnUrl);
    }
  }

  if (redirectParam) {
    // Préserver le query param "action" s'il existe (pour inscription événement)
    const action = urlParams.get("action");
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

  return null;
}

/**
 * Nettoie toutes les données de redirection après utilisation
 */
function clearRedirectData(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("redirectAfterLogin");
  // Note: On ne supprime PAS pendingEventRegistration ici
  // car la page événement en a besoin pour compléter l'inscription
}

export function useRedirectIfAuthenticated(
  options: UseRedirectIfAuthenticatedOptions = {},
): UseRedirectIfAuthenticatedReturn {
  const { redirectTo = "/" } = options;
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // État local pour tracker si on a déjà fait la vérification initiale
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Ref pour éviter les redirections multiples
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Ne rien faire tant que le contexte charge la session initiale
    if (isLoading) return;

    // Marquer qu'on a fait la vérification
    if (!hasCheckedAuth) {
      setHasCheckedAuth(true);
    }

    // Éviter les redirections multiples
    if (hasRedirected.current) return;

    // Rediriger si authentifié
    if (isAuthenticated) {
      hasRedirected.current = true;

      // Chercher l'URL de redirection (lecture directe depuis window.location)
      const savedRedirect = getRedirectUrl();

      // Debug log
      console.log(
        "[useRedirectIfAuthenticated] Authenticated, redirect URL:",
        savedRedirect,
      );

      if (savedRedirect) {
        clearRedirectData();
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
