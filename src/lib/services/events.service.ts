// ============================================================
// SERVICE ÉVÉNEMENTS - imo2tun
// ============================================================

import { get, post } from "@/lib/api/client";
import { EVENTS_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Event,
  EventDetail,
  EventCategory,
  EventsResponse,
  EventRegistrationResponse,
  GetEventsParams,
} from "@/types/event.types";

// ==================== HELPERS ====================

function buildQueryParams(params: GetEventsParams): string {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.size !== undefined) searchParams.set("size", String(params.size));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortDir) searchParams.set("sortDir", params.sortDir);
  if (params.search) searchParams.set("search", params.search);
  if (params.categorySlug)
    searchParams.set("category.slug", params.categorySlug);
  if (params.type) searchParams.set("type", params.type);
  if (params.format) searchParams.set("format", params.format);

  return searchParams.toString();
}

// ==================== SERVICE METHODS ====================

/**
 * Récupérer la liste des événements (paginée)
 */
async function getEvents(
  params: GetEventsParams = {},
): Promise<EventsResponse> {
  const queryString = buildQueryParams({
    page: 0,
    size: 10,
    sortBy: "startDate",
    sortDir: "asc",
    ...params,
  });

  return get<EventsResponse>(`${EVENTS_ENDPOINTS.LIST}?${queryString}`, false);
}

/**
 * Récupérer un événement par son slug
 */
async function getEventBySlug(slug: string): Promise<EventDetail> {
  return get<EventDetail>(EVENTS_ENDPOINTS.DETAIL(slug), false);
}

/**
 * Récupérer les prochains événements (pour la home)
 */
async function getUpcomingEvents(count: number = 3): Promise<Event[]> {
  const response = await getEvents({
    page: 0,
    size: count,
    sortBy: "startDate",
    sortDir: "asc",
  });
  // Filtrer uniquement les événements à venir
  return response.content.filter((event) => event.upcoming);
}

/**
 * Récupérer les catégories d'événements
 */
async function getCategories(): Promise<EventCategory[]> {
  return get<EventCategory[]>(EVENTS_ENDPOINTS.CATEGORIES, false);
}

/**
 * S'inscrire à un événement (nécessite authentification)
 */
async function registerToEvent(
  eventId: string,
): Promise<EventRegistrationResponse> {
  return post<EventRegistrationResponse>(
    EVENTS_ENDPOINTS.REGISTER(eventId),
    {},
    { auth: true },
  );
}

// ==================== EXPORT ====================

export const eventsService = {
  getEvents,
  getEventBySlug,
  getUpcomingEvents,
  getCategories,
  registerToEvent,
};

export default eventsService;
