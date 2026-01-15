"use client";

// ============================================================
// HOOK useAuth - imo2tun
// ============================================================

import { useAuthContext } from "@/contexts/auth-context";

/**
 * Hook principal pour l'authentification
 * Expose toutes les fonctionnalités du contexte auth
 */
export function useAuth() {
  const context = useAuthContext();
  return context;
}

export default useAuth;
