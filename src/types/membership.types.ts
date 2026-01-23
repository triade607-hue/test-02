// ============================================================
// TYPES MEMBERSHIP - imo2tun
// Types pour l'API et les données transformées
// ============================================================

import type { MemberTypeId, TierId } from "@/lib/data/membership";

// ==================== TYPES API (réponses brutes) ====================

/**
 * Noms des types de membres côté API
 */
export type MemberTypeNameAPI =
  | "OFFREUR"
  | "UTILISATEUR"
  | "CONTRIBUTEUR"
  | "PARTENAIRE";

/**
 * Noms des tiers côté API
 * Note: L'API utilise AGOJIE et MIGANON au lieu de SUNUN et MINDAHO
 */
export type TierNameAPI = "ASUKA" | "AGOJIE" | "MIGANON" | "DAH";

/**
 * Réponse API pour un type de membre
 */
export interface MemberTypeAPIResponse {
  id: string;
  name: MemberTypeNameAPI;
  description: string;
}

/**
 * Réponse API pour un tier
 */
export interface TierAPIResponse {
  id: string;
  name: string;
  tierTypeName: TierNameAPI;
  memberTypeName: MemberTypeNameAPI;
  annualPrice: number;
  // Autres champs non utilisés pour l'affichage...
}

// ==================== MAPPING API ↔ LOCAL ====================

/**
 * Mapping: Nom API du type de membre → Slug local
 */
export const MEMBER_TYPE_API_TO_LOCAL: Record<MemberTypeNameAPI, MemberTypeId> =
  {
    OFFREUR: "offreur",
    UTILISATEUR: "utilisateur",
    CONTRIBUTEUR: "contributeur",
    PARTENAIRE: "partenaire",
  };

/**
 * Mapping: Slug local → Nom API du type de membre
 */
export const MEMBER_TYPE_LOCAL_TO_API: Record<MemberTypeId, MemberTypeNameAPI> =
  {
    offreur: "OFFREUR",
    utilisateur: "UTILISATEUR",
    contributeur: "CONTRIBUTEUR",
    partenaire: "PARTENAIRE",
  };

/**
 * Mapping: Nom API du tier → Slug local
 * IMPORTANT: AGOJIE (API) correspond à sunun (local)
 *            MIGANON (API) correspond à mindaho (local)
 */
export const TIER_API_TO_LOCAL: Record<TierNameAPI, TierId> = {
  ASUKA: "asuka",
  AGOJIE: "sunun",
  MIGANON: "mindaho",
  DAH: "dah",
};

/**
 * Mapping: Slug local → Nom API du tier
 */
export const TIER_LOCAL_TO_API: Record<TierId, TierNameAPI> = {
  asuka: "ASUKA",
  sunun: "AGOJIE",
  mindaho: "MIGANON",
  dah: "DAH",
};

/**
 * Labels d'affichage pour les tiers (noms locaux)
 */
export const TIER_DISPLAY_NAMES: Record<TierId, string> = {
  asuka: "ASUKA",
  sunun: "SUNUN",
  mindaho: "MINDAHO",
  dah: "DAH",
};

// ==================== TYPES TRANSFORMÉS (pour l'UI) ====================

/**
 * Type de membre transformé pour l'UI
 */
export interface MemberTypeUI {
  id: string; // UUID de l'API
  slug: MemberTypeId; // Slug local (offreur, utilisateur, etc.)
  name: MemberTypeNameAPI; // Nom API
  label: string; // Label affiché (OFFREURS, UTILISATEURS, etc.)
  description: string;
}

/**
 * Tier transformé pour l'UI
 */
export interface TierUI {
  id: string; // UUID de l'API (pour soumission)
  slug: TierId; // Slug local (asuka, sunun, etc.) pour mapper aux features
  name: string; // Nom affiché (ASUKA, SUNUN, etc.)
  tierNameAPI: TierNameAPI;
  price: number; // Prix brut
  priceFormatted: string; // Prix formaté (1.000.000)
  currency: string;
  featured: boolean;
}

// ==================== PAYLOADS API ====================

/**
 * Payload pour candidature Organisation (Offreur, Utilisateur, Partenaire)
 */
export interface OrganizationApplicationPayload {
  // Adhésion (uniquement tierId et durée)
  requestedTierId: string;
  durationYears: number;

  // Organisation
  organizationName: string;
  organizationActivitySector: string;
  organizationAddress: string;
  organizationEmail: string;
  organizationCountryCode: string;
  organizationPhone: string;
  organizationWorkforceSize: string;
  organizationCity: string;
  organizationCountry: string;
  organizationWebsite?: string;

  // Contact / Référent
  contactCivility: string; // MR, MME, MLLE, DR, PR
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactCountryCode: string;
  contactPhone: string;
  contactJobTitle: string;
  contactAddress?: string;
  contactCity?: string;
  contactCountry?: string;

  // Facturation
  quoteRequested: boolean;
  quoteEmail?: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingEmail: string;
  billingCountryCode: string;
  billingPhone: string;

  // Acceptations
  rulesAccepted: boolean;
  newsletterAccepted: boolean;

  // Commentaires
  comments?: string;
}

/**
 * Payload pour candidature Contributeur
 */
export interface ContributorApplicationPayload {
  // Adhésion (uniquement tierId et durée)
  requestedTierId: string;
  durationYears: number;

  // Informations personnelles
  contactCivility: string; // MR, MME, MLLE, DR, PR
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactCountryCode: string;
  contactPhone: string;
  contactProfession: string;
  contactAddress?: string;
  contactCity?: string;
  contactCountry?: string;

  // Spécifique contributeur
  expertiseDomains: string[]; // Liste des domaines d'expertise
  linkedinProfileUrl?: string;
  // Le CV sera envoyé comme fichier séparé dans le FormData

  // Facturation
  quoteRequested: boolean;
  quoteEmail?: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingEmail: string;
  billingCountryCode: string;
  billingPhone: string;

  // Acceptations
  rulesAccepted: boolean;
  newsletterAccepted: boolean;

  // Commentaires
  comments?: string;
}

/**
 * Réponse de soumission de candidature
 */
export interface ApplicationResponse {
  message: string;
}

// ==================== STATE DU HOOK ====================

/**
 * État du hook useMembership
 */
export interface MembershipState {
  // Données API
  memberTypes: MemberTypeUI[];
  tiers: Record<string, TierUI[]>; // Cache par memberTypeId (UUID)

  // Loading states
  isLoadingMemberTypes: boolean;
  isLoadingTiers: boolean;
  isSubmitting: boolean;

  // Success/Error
  isSuccess: boolean;
  error: string | null;
  successMessage: string | null;
}

// ==================== HELPERS ====================

/**
 * Formater un prix en format local (avec points)
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR").replace(/\s/g, ".");
}

/**
 * Convertir un prix string formaté en nombre
 * Ex: "1.000.000" → 1000000
 */
export function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/\./g, ""), 10);
}
