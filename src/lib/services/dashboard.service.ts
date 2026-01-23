// ============================================================
// SERVICE DASHBOARD - imo2tun
// ============================================================

import { get } from "@/lib/api/client";
import { USER_ENDPOINTS } from "@/lib/api/endpoints";
import type { DashboardApiResponse } from "@/types/dashboard.types";

/**
 * Récupérer les données du dashboard utilisateur
 * @returns Données complètes du dashboard
 */
export async function getDashboard(): Promise<DashboardApiResponse> {
  return get<DashboardApiResponse>(USER_ENDPOINTS.DASHBOARD, true);
}

// ==================== EXPORT GROUPÉ ====================

export const dashboardService = {
  getDashboard,
};

export default dashboardService;
