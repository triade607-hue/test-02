// ============================================================
// LAYOUT AUTH - Pages d'authentification
// ============================================================

/**
 * Layout pour les pages d'authentification (login, register, etc.)
 *
 * NOTE: On n'utilise PAS de GuestGuard ici car il bloque le rendu
 * pendant les opérations (register, login), ce qui peut causer
 * la perte d'état local (ex: écran de succès inscription).
 *
 * La redirection si déjà connecté est gérée par le hook
 * useRedirectIfAuthenticated dans chaque page.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
