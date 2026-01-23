// ============================================================
// TYPES DASHBOARD API - imo2tun
// ============================================================

/**
 * Utilisateur retourné par l'API dashboard
 */
export interface DashboardUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  civility: string | null;
  role: "ROLE_GUEST" | "ROLE_MEMBER" | "ROLE_ADMIN" | "ROLE_SUPER_ADMIN";
  accountType: "INDIVIDUAL" | "ORGANIZATION";
  profilePicture: string | null;
  linkedinProfileUrl: string | null;
  bio: string | null;
  expertise: string[];
  profession: string | null;
  emailVerified: boolean;
  active: boolean;
  mentor: boolean;
  memberType: string | null;
  membershipTierId: string | null;
  membershipTierName: string | null;
  membershipEndDate: string | null;
  membershipStartDate: string | null;
  lastLoginAt: string;
  createdAt: string;
}

/**
 * Adhésion active
 */
export interface ActiveMembership {
  memberType:
    | "FREEMIUM"
    | "OFFREUR"
    | "UTILISATEUR"
    | "CONTRIBUTEUR"
    | "PARTENAIRE";
  membershipTierId: string;
  membershipEndDate: string;
  membershipStartDate: string;
  tierName: string;
  eventDiscountPercent: number;
}

/**
 * Organisation de l'utilisateur (si applicable)
 */
export interface UserOrganization {
  id: string;
  name: string;
  logo: string | null;
  role: "OWNER" | "MEMBER";
}

/**
 * Candidature d'adhésion
 */
export interface MembershipApplication {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAYMENT_PENDING";
  createdAt: string;
  tierName: string;
}

/**
 * Réponse complète de l'API dashboard
 */
export interface DashboardApiResponse {
  user: DashboardUser;
  activeMembership: ActiveMembership | null;
  myOrganization: UserOrganization | null;
  myApplications: MembershipApplication[];
}

/**
 * État du hook useDashboard
 */
export interface DashboardState {
  data: DashboardApiResponse | null;
  isLoading: boolean;
  error: string | null;
}
