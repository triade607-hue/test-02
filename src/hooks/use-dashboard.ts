/* eslint-disable react-hooks/set-state-in-effect */
"use client";

// ============================================================
// HOOK useDashboard - Données du tableau de bord
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/lib/services/dashboard.service";
import type {
  DashboardState,
} from "@/types/dashboard.types";

// ==================== INITIAL STATE ====================

const initialState: DashboardState = {
  data: null,
  isLoading: true,
  error: null,
};

// ==================== HOOK ====================

interface UseDashboardReturn extends DashboardState {
  // Actions
  refresh: () => Promise<void>;
  clearError: () => void;

  // Computed values
  isFreemium: boolean;
  hasPaidMembership: boolean;
  hasOrganization: boolean;
  hasPendingApplication: boolean;
}

/**
 * Hook pour récupérer et gérer les données du dashboard
 */
export function useDashboard(): UseDashboardReturn {
  const [state, setState] = useState<DashboardState>(initialState);

  // ==================== FETCH DATA ====================

  const fetchDashboard = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await dashboardService.getDashboard();
      setState({ data, isLoading: false, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement du dashboard";
      setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  }, []);

  // ==================== EFFECTS ====================

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ==================== ACTIONS ====================

  const refresh = useCallback(async () => {
    await fetchDashboard();
  }, [fetchDashboard]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // ==================== COMPUTED VALUES ====================

  const isFreemium =
    state.data?.activeMembership?.memberType === "FREEMIUM" ||
    state.data?.user?.role === "ROLE_GUEST";

  const hasPaidMembership =
    !isFreemium &&
    state.data?.activeMembership !== null &&
    state.data?.activeMembership?.memberType !== "FREEMIUM";

  const hasOrganization = state.data?.myOrganization !== null;

  const hasPendingApplication =
    state.data?.myApplications?.some((app) => app.status === "PENDING") ||
    false;

  // ==================== RETURN ====================

  return {
    ...state,
    refresh,
    clearError,
    isFreemium,
    hasPaidMembership,
    hasOrganization,
    hasPendingApplication,
  };
}

export default useDashboard;
