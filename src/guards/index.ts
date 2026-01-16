// ============================================================
// GUARDS - Protection des routes
// ============================================================
//
// Architecture imo2tun:
// src/
// ├── components/    → Composants UI réutilisables
// ├── guards/        → Protection des routes (ce dossier)
// ├── hooks/         → Hooks React personnalisés
// ├── lib/           → Utilitaires et configurations
// │   ├── api/       → Client API et endpoints
// │   └── services/  → Services métier
// ├── types/         → Types TypeScript
// └── contexts/      → Contextes React (Auth, Theme, etc.)
//
// ============================================================

/**
 * AuthGuard - Protège les routes nécessitant une authentification
 *
 * Utilisation:
 * - Pages membres (/membre/*)
 * - Espace utilisateur
 * - Fonctionnalités réservées aux connectés
 *
 * Comportement:
 * - Non connecté → Redirige vers /login (sauvegarde URL)
 * - Connecté → Affiche le contenu
 */
export { AuthGuard } from "./auth-guard";

/**
 * GuestGuard - Protège les routes réservées aux visiteurs
 *
 * Utilisation:
 * - Pages d'authentification (/login, /register)
 * - Pages de récupération de mot de passe
 *
 * Comportement:
 * - Connecté → Redirige vers /membre (ou URL sauvegardée)
 * - Non connecté → Affiche le contenu
 */
export { GuestGuard } from "./guest-guard";
