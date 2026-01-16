"use client";

// ============================================================
// AUTH GUARD - Protection des routes membres
// ============================================================

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protège les pages réservées aux membres
 * Redirige vers /login si l'utilisateur n'est pas connecté
 *
 * @usage
 * ```tsx
 * // Dans un layout ou une page
 * import { AuthGuard } from "@/guards";
 *
 * export default function MembreLayout({ children }) {
 *   return <AuthGuard>{children}</AuthGuard>;
 * }
 * ```
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Attendre que le chargement soit terminé
    if (!isLoading && !isAuthenticated) {
      // Sauvegarder l'URL actuelle pour redirection après login
      const currentPath = window.location.pathname;
      sessionStorage.setItem("redirectAfterLogin", currentPath);
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Afficher le loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  // Si non authentifié, ne rien afficher (la redirection est en cours)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Redirection...</p>
        </div>
      </div>
    );
  }

  // Utilisateur authentifié, afficher le contenu
  return <>{children}</>;
}

export default AuthGuard;
