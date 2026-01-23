// ============================================================
// HOOK USE-MEMBERSHIP - imo2tun
// Gestion de l'état et des actions pour les adhésions
// ============================================================

"use client";

import { useState, useCallback } from "react";
import membershipService from "@/lib/services/membership.service";
import type {
  MemberTypeUI,
  TierUI,
  MembershipState,
  OrganizationApplicationPayload,
  ContributorApplicationPayload,
} from "@/types/membership.types";
import type { MemberTypeId, TierId } from "@/lib/data/membership";

// ==================== ÉTAT INITIAL ====================

const initialState: MembershipState = {
  memberTypes: [],
  tiers: {},
  isLoadingMemberTypes: false,
  isLoadingTiers: false,
  isSubmitting: false,
  isSuccess: false,
  error: null,
  successMessage: null,
};

// ==================== HOOK ====================

export function useMembership() {
  const [state, setState] = useState<MembershipState>(initialState);

  // ========== FETCH MEMBER TYPES ==========

  const fetchMemberTypes = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoadingMemberTypes: true,
      error: null,
    }));

    try {
      const memberTypes = await membershipService.getMemberTypes();
      setState((prev) => ({
        ...prev,
        memberTypes,
        isLoadingMemberTypes: false,
      }));
      return memberTypes;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors du chargement des types de membres";

      setState((prev) => ({
        ...prev,
        isLoadingMemberTypes: false,
        error: errorMessage,
      }));

      console.error("Erreur fetchMemberTypes:", error);
      return [];
    }
  }, []);

  // ========== FETCH TIERS BY MEMBER TYPE ==========

  const fetchTiersByMemberType = useCallback(
    async (memberTypeId: string) => {
      // Vérifier si déjà en cache
      if (state.tiers[memberTypeId]) {
        return state.tiers[memberTypeId];
      }

      setState((prev) => ({
        ...prev,
        isLoadingTiers: true,
        error: null,
      }));

      try {
        const tiers =
          await membershipService.getTiersByMemberType(memberTypeId);

        setState((prev) => ({
          ...prev,
          tiers: {
            ...prev.tiers,
            [memberTypeId]: tiers,
          },
          isLoadingTiers: false,
        }));

        return tiers;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des niveaux d'adhésion";

        setState((prev) => ({
          ...prev,
          isLoadingTiers: false,
          error: errorMessage,
        }));

        console.error("Erreur fetchTiersByMemberType:", error);
        return [];
      }
    },
    [state.tiers],
  );

  // ========== GETTERS ===========

  /**
   * Récupère un type de membre par son slug local
   */
  const getMemberTypeBySlug = useCallback(
    (slug: MemberTypeId): MemberTypeUI | undefined => {
      return state.memberTypes.find((mt) => mt.slug === slug);
    },
    [state.memberTypes],
  );

  /**
   * Récupère les tiers depuis le cache pour un memberTypeId (UUID)
   */
  const getTiersForMemberType = useCallback(
    (memberTypeId: string): TierUI[] => {
      return state.tiers[memberTypeId] || [];
    },
    [state.tiers],
  );

  /**
   * Récupère le tierId (UUID) pour soumission
   */
  const getTierId = useCallback(
    (memberTypeSlug: MemberTypeId, tierSlug: TierId): string | null => {
      const memberType = getMemberTypeBySlug(memberTypeSlug);
      if (!memberType) {
        console.error(`Type de membre non trouvé: ${memberTypeSlug}`);
        return null;
      }

      const tiers = state.tiers[memberType.id];
      if (!tiers) {
        console.error(`Tiers non chargés pour: ${memberTypeSlug}`);
        return null;
      }

      const tier = tiers.find((t) => t.slug === tierSlug);
      if (!tier) {
        console.error(`Tier non trouvé: ${tierSlug}`);
        return null;
      }

      return tier.id;
    },
    [state.tiers, getMemberTypeBySlug],
  );

  // ========== SUBMIT ORGANIZATION APPLICATION ==========

  const submitOrganizationApplication = useCallback(
    async (payload: OrganizationApplicationPayload, logoFile?: File | null) => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
        isSuccess: false,
      }));

      try {
        const response = await membershipService.applyAsOrganization(
          payload,
          logoFile,
        );

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          successMessage:
            response.message || "Candidature envoyée avec succès !",
        }));

        return { success: true, message: response.message };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors de la soumission de la candidature";

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: errorMessage,
        }));

        return { success: false, message: errorMessage };
      }
    },
    [],
  );

  // ========== SUBMIT CONTRIBUTOR APPLICATION ==========

  const submitContributorApplication = useCallback(
    async (payload: ContributorApplicationPayload, cvFile?: File | null) => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
        isSuccess: false,
      }));

      try {
        const response = await membershipService.applyAsContributor(
          payload,
          cvFile,
        );

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          successMessage:
            response.message || "Candidature envoyée avec succès !",
        }));

        return { success: true, message: response.message };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erreur lors de la soumission de la candidature";

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: errorMessage,
        }));

        return { success: false, message: errorMessage };
      }
    },
    [],
  );

  // ========== RESET ==========

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const resetError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const resetSuccess = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSuccess: false,
      successMessage: null,
    }));
  }, []);

  // ========== RETURN ===========

  return {
    // État
    ...state,

    // Actions
    fetchMemberTypes,
    fetchTiersByMemberType,

    // Getters
    getMemberTypeBySlug,
    getTiersForMemberType,
    getTierId,

    // Soumissions
    submitOrganizationApplication,
    submitContributorApplication,

    // Reset
    reset,
    resetError,
    resetSuccess,
  };
}

export default useMembership;
