// ============================================================
// TYPES ÉVÉNEMENTS - imo2tun
// ============================================================

// ==================== ENUMS ====================

export type EventFormat = "PHYSICAL" | "ONLINE" | "HYBRID";
export type EventType =
  | "CONFERENCE"
  | "WORKSHOP"
  | "WEBINAR"
  | "MEETUP"
  | "HACKATHON"
  | "FORMATION";
export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";

// ==================== ENTITIES ====================

/**
 * Catégorie d'événement
 */
export interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Intervenant (format API)
 */
export interface EventSpeaker {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  bio: string;
  photo: string | null;
  linkedinUrl: string | null;
}

/**
 * Événement (format liste)
 */
export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  startDate: string;
  endDate: string;
  location: string;
  format: EventFormat;
  type: EventType;
  status: EventStatus;
  banner: string | null;
  category: EventCategory;
  past: boolean;
  upcoming: boolean;
}

/**
 * Événement détaillé
 */
export interface EventDetail extends Event {
  description: string;
  basePrice: number;
  programUrl: string | null;
  onlineUrl: string | null;
  maxAttendees: number;
  remainingSeats: number;
  allSpeakers: EventSpeaker[];
}

// ==================== PARAMS ====================

export interface GetEventsParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  search?: string;
  categorySlug?: string;
  type?: EventType;
  format?: EventFormat;
}

// ==================== RESPONSES ====================

export interface EventsResponse {
  content: Event[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EventRegistrationResponse {
  registrationId: string;
  paymentRedirectUrl: string;
  status: "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED";
}

// ==================== STATE ====================

export interface EventsState {
  events: Event[];
  event: EventDetail | null;
  categories: EventCategory[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    totalElements: number;
    hasMore: boolean;
  };
}
