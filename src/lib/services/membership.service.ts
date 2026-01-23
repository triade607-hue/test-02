// ============================================================
// SERVICE MEMBERSHIP - imo2tun
// Gestion des appels API pour les adhésions
// ============================================================

import { API_BASE_URL, MEMBERSHIP_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  MemberTypeAPIResponse,
  TierAPIResponse,
  MemberTypeUI,
  TierUI,
  OrganizationApplicationPayload,
  ContributorApplicationPayload,
  ApplicationResponse,
} from "@/types/membership.types";
import {
  MEMBER_TYPE_API_TO_LOCAL,
  TIER_API_TO_LOCAL,
  TIER_DISPLAY_NAMES,
  formatPrice,
} from "@/types/membership.types";
import type { MemberTypeId } from "@/lib/data/membership";

// Labels pour l'affichage des types de membres
const MEMBER_TYPE_LABELS: Record<MemberTypeId, string> = {
  offreur: "OFFREURS",
  utilisateur: "UTILISATEURS",
  contributeur: "CONTRIBUTEURS",
  partenaire: "PARTENAIRES",
};

// ==================== TRANSFORMATEURS ====================

/**
 * Transformer un type de membre API en type UI
 */
function transformMemberType(data: MemberTypeAPIResponse): MemberTypeUI {
  const slug = MEMBER_TYPE_API_TO_LOCAL[data.name];
  return {
    id: data.id,
    slug,
    name: data.name,
    label: MEMBER_TYPE_LABELS[slug],
    description: data.description,
  };
}

/**
 * Transformer un tier API en type UI
 */
function transformTier(data: TierAPIResponse): TierUI {
  const slug = TIER_API_TO_LOCAL[data.tierTypeName];
  return {
    id: data.id,
    slug,
    name: TIER_DISPLAY_NAMES[slug], // On utilise le nom local (SUNUN au lieu de AGOJIE)
    tierNameAPI: data.tierTypeName,
    price: data.annualPrice,
    priceFormatted: formatPrice(data.annualPrice),
    currency: "FCFA",
    featured: slug === "sunun", // Le 2ème tier est mis en avant
  };
}

// ==================== HELPERS ====================

/**
 * Effectuer une requête API GET
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erreur API: ${response.status}`);
  }

  return response.json();
}

// ==================== MEMBER TYPES ====================

/**
 * Récupérer tous les types de membres depuis l'API
 */
async function getMemberTypes(): Promise<MemberTypeUI[]> {
  const data = await fetchAPI<MemberTypeAPIResponse[]>(
    MEMBERSHIP_ENDPOINTS.MEMBER_TYPES,
  );
  return data.map(transformMemberType);
}

// ==================== TIERS ====================

/**
 * Récupérer les tiers pour un type de membre depuis l'API
 */
async function getTiersByMemberType(memberTypeId: string): Promise<TierUI[]> {
  const data = await fetchAPI<TierAPIResponse[]>(
    MEMBERSHIP_ENDPOINTS.TIERS_BY_TYPE(memberTypeId),
  );

  // Transformer et trier par prix croissant
  return data.map(transformTier).sort((a, b) => a.price - b.price);
}

// ==================== APPLICATIONS ====================

/**
 * Soumettre une candidature pour une organisation
 */
async function applyAsOrganization(
  payload: OrganizationApplicationPayload,
  logoFile?: File | null,
): Promise<ApplicationResponse> {
  const formData = new FormData();

  // Ajouter tous les champs au FormData
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, String(value));
    }
  });

  // Ajouter le logo si présent
  if (logoFile) {
    formData.append("logo", logoFile);
  }

  const response = await fetch(`${API_BASE_URL}${MEMBERSHIP_ENDPOINTS.APPLY}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Erreur lors de la soumission de la candidature",
    );
  }

  return response.json();
}

/**
 * Soumettre une candidature pour un contributeur
 */
async function applyAsContributor(
  payload: ContributorApplicationPayload,
  cvFile?: File | null,
): Promise<ApplicationResponse> {
  const formData = new FormData();

  // Ajouter tous les champs au FormData
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Gérer les tableaux (expertiseDomains)
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  // Ajouter le CV si présent
  if (cvFile) {
    formData.append("cv", cvFile);
  }

  const response = await fetch(`${API_BASE_URL}${MEMBERSHIP_ENDPOINTS.APPLY}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Erreur lors de la soumission de la candidature",
    );
  }

  return response.json();
}

// ==================== EXPORT ====================

export const membershipService = {
  getMemberTypes,
  getTiersByMemberType,
  applyAsOrganization,
  applyAsContributor,
};

export default membershipService;
