// ============================================================
// TYPES DASHBOARD - imo2tun
// ============================================================

/**
 * Quota d'utilisation d'un service
 */
export interface QuotaItem {
  id: string;
  label: string;
  used: number;
  total: number;
  type: "expertise" | "downloads" | "presentations" | "projects";
}

/**
 * Événement inscrit par le membre
 */
export interface UserEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: "confirmed" | "pending" | "cancelled";
}

/**
 * Avantage du tier membre
 */
export interface MemberAdvantage {
  id: string;
  label: string;
  description?: string;
  active: boolean;
}

/**
 * Informations d'adhésion
 */
export interface MembershipInfo {
  tier: "Asuka" | "Sunun" | "Mindaho" | "Dah";
  tierColor: string;
  memberType: "Offreur" | "Utilisateur" | "Contributeur" | "Partenaire";
  memberSince: string;
  expiresAt?: string;
  autoRenew: boolean;
}

/**
 * Données complètes du dashboard
 */
export interface DashboardData {
  quotas: QuotaItem[];
  upcomingEvents: UserEvent[];
  advantages: MemberAdvantage[];
  membership: MembershipInfo;
  notifications: {
    unread: number;
  };
}

/**
 * État du dashboard dans le hook
 */
export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}
