"use client";

// ============================================================
// GUEST GUARD - Protection des routes publiques (auth)
// ============================================================

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * GuestGuard - Protège les pages d'authentification (login, register)
 * Redirige vers /membre si l'utilisateur est déjà connecté
 *
 * @usage
 * ```tsx
 * // Dans un layout ou une page
 * import { GuestGuard } from "@/guards";
 *
 * export default function AuthLayout({ children }) {
 *   return <GuestGuard>{children}</GuestGuard>;
 * }
 * ```
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Attendre que le chargement soit terminé
    if (!isLoading && isAuthenticated) {
      // Vérifier s'il y a une URL de redirection sauvegardée
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");

      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.replace(redirectUrl);
      } else {
        // Par défaut, rediriger vers le dashboard membre
        router.replace("/membre");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Afficher le loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si authentifié, ne rien afficher (la redirection est en cours)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">
            Vous êtes déjà connecté, redirection...
          </p>
        </div>
      </div>
    );
  }

  // Utilisateur non authentifié, afficher le contenu (login/register)
  return <>{children}</>;
}

export default GuestGuard;
