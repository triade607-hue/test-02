"use client";

// ============================================================
// HOOK useEvents - Gestion des événements
// ============================================================

import { useState, useCallback } from "react";
import { eventsService } from "@/lib/services/events.service";
import type {
  Event,
  EventDetail,
  EventCategory,
  EventsState,
  GetEventsParams,
} from "@/types/event.types";

// ==================== INITIAL STATE ====================

const initialState: EventsState = {
  events: [],
  event: null,
  categories: [],
  isLoading: true, // Important: true pour éviter le flash
  error: null,
  pagination: {
    page: 0,
    totalPages: 0,
    totalElements: 0,
    hasMore: false,
  },
};

// ==================== HOOK ====================

interface UseEventsReturn extends EventsState {
  fetchEvents: (params?: GetEventsParams) => Promise<void>;
  fetchEventBySlug: (slug: string) => Promise<EventDetail | null>;
  fetchUpcomingEvents: (count?: number) => Promise<Event[]>;
  fetchCategories: () => Promise<EventCategory[]>;
  clearError: () => void;
  reset: () => void;
}

export function useEvents(): UseEventsReturn {
  const [state, setState] = useState<EventsState>(initialState);

  // ==================== HELPERS ====================

  const setError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      error,
      isLoading: false,
    }));
  }, []);

  const handleError = useCallback((err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    return "Une erreur est survenue";
  }, []);

  // ==================== FETCH EVENTS ====================

  const fetchEvents = useCallback(
    async (params: GetEventsParams = {}) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await eventsService.getEvents(params);

        setState((prev) => ({
          ...prev,
          events: response.content,
          isLoading: false,
          pagination: {
            page: response.number,
            totalPages: response.totalPages,
            totalElements: response.totalElements,
            hasMore: !response.last,
          },
        }));
      } catch (err) {
        setError(handleError(err));
      }
    },
    [setError, handleError],
  );

  // ==================== FETCH EVENT BY SLUG ====================

  const fetchEventBySlug = useCallback(
    async (slug: string): Promise<EventDetail | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const event = await eventsService.getEventBySlug(slug);

        setState((prev) => ({
          ...prev,
          event,
          isLoading: false,
        }));

        return event;
      } catch (err) {
        setError(handleError(err));
        return null;
      }
    },
    [setError, handleError],
  );

  // ==================== FETCH UPCOMING EVENTS ====================

  const fetchUpcomingEvents = useCallback(
    async (count: number = 3): Promise<Event[]> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const events = await eventsService.getUpcomingEvents(count);

        setState((prev) => ({
          ...prev,
          events,
          isLoading: false,
        }));

        return events;
      } catch (err) {
        setError(handleError(err));
        return [];
      }
    },
    [setError, handleError],
  );

  // ==================== FETCH CATEGORIES ====================

  const fetchCategories = useCallback(async (): Promise<EventCategory[]> => {
    try {
      const categories = await eventsService.getCategories();

      setState((prev) => ({
        ...prev,
        categories,
      }));

      return categories;
    } catch (err) {
      console.error("Erreur lors du chargement des catégories:", err);
      return [];
    }
  }, []);

  // ==================== UTILITIES ====================

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // ==================== RETURN ====================

  return {
    ...state,
    fetchEvents,
    fetchEventBySlug,
    fetchUpcomingEvents,
    fetchCategories,
    clearError,
    reset,
  };
}

export default useEvents;
