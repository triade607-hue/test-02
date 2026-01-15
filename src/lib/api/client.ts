// ============================================================
// CLIENT HTTP - imo2tun
// ============================================================

import { API_BASE_URL, AUTH_ENDPOINTS } from "./endpoints";
import type { ApiError, RefreshTokenResponse } from "@/types/auth.types";

// ==================== STORAGE KEYS ====================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "imo2tun_access_token",
  REFRESH_TOKEN: "imo2tun_refresh_token",
  USER: "imo2tun_user",
} as const;

// ==================== TOKEN MANAGEMENT ====================

/**
 * Récupère le token d'accès depuis le localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Récupère le refresh token depuis le localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Sauvegarde les tokens dans le localStorage
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

/**
 * Supprime les tokens du localStorage
 */
export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// ==================== ERROR HANDLING ====================

/**
 * Parse l'erreur de l'API
 */
async function parseApiError(response: Response): Promise<ApiError> {
  try {
    const data = await response.json();
    return {
      message: data.message || data.error || "Une erreur est survenue",
      status: response.status,
      code: data.code,
      errors: data.errors,
    };
  } catch {
    return {
      message: `Erreur ${response.status}: ${response.statusText}`,
      status: response.status,
    };
  }
}

// ==================== REFRESH TOKEN LOGIC ====================

let isRefreshing = false;
let refreshPromise: Promise<RefreshTokenResponse> | null = null;

/**
 * Rafraîchit le token d'accès
 */
async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("Aucun refresh token disponible");
  }

  const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error("Session expirée, veuillez vous reconnecter");
  }

  const data: RefreshTokenResponse = await response.json();
  setTokens(data.accessToken, data.refreshToken);

  return data;
}

/**
 * Gère le refresh token avec mutex pour éviter les appels multiples
 */
async function handleTokenRefresh(): Promise<string> {
  if (isRefreshing && refreshPromise) {
    const result = await refreshPromise;
    return result.accessToken;
  }

  isRefreshing = true;
  refreshPromise = refreshAccessToken();

  try {
    const result = await refreshPromise;
    return result.accessToken;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
}

// ==================== HTTP CLIENT ====================

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean; // Si true, ajoute le token d'authentification
  isFormData?: boolean; // Si true, envoie en FormData
}

/**
 * Client HTTP principal
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    auth = false,
    isFormData = false,
  } = options;

  // Construire les headers
  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  // Ajouter Content-Type si ce n'est pas du FormData
  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  // Ajouter le token d'authentification si nécessaire
  if (auth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  // Préparer le body
  let requestBody: BodyInit | undefined;
  if (body) {
    if (isFormData) {
      // Convertir en FormData
      const formData = new FormData();
      Object.entries(body as Record<string, unknown>).forEach(
        ([key, value]) => {
          formData.append(key, String(value));
        }
      );
      requestBody = formData;
    } else {
      requestBody = JSON.stringify(body);
    }
  }

  // Première tentative
  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  // Si 401 et authentifié, tenter le refresh
  if (response.status === 401 && auth) {
    try {
      const newToken = await handleTokenRefresh();
      requestHeaders["Authorization"] = `Bearer ${newToken}`;

      // Réessayer avec le nouveau token
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: requestBody,
      });
    } catch {
      clearTokens();
      // Rediriger vers la page de login
      if (typeof window !== "undefined") {
        window.location.href = "/login?expired=true";
      }
      throw new Error("Session expirée");
    }
  }

  // Gérer les erreurs
  if (!response.ok) {
    const error = await parseApiError(response);
    throw error;
  }

  // Parser la réponse
  const data = await response.json();
  return data as T;
}

// ==================== SHORTHAND METHODS ====================

/**
 * GET request
 */
export function get<T>(endpoint: string, auth = false): Promise<T> {
  return apiClient<T>(endpoint, { method: "GET", auth });
}

/**
 * POST request
 */
export function post<T>(
  endpoint: string,
  body?: unknown,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: "POST", body });
}

/**
 * PUT request
 */
export function put<T>(
  endpoint: string,
  body?: unknown,
  auth = true
): Promise<T> {
  return apiClient<T>(endpoint, { method: "PUT", body, auth });
}

/**
 * PATCH request
 */
export function patch<T>(
  endpoint: string,
  body?: unknown,
  auth = true
): Promise<T> {
  return apiClient<T>(endpoint, { method: "PATCH", body, auth });
}

/**
 * DELETE request
 */
export function del<T>(endpoint: string, auth = true): Promise<T> {
  return apiClient<T>(endpoint, { method: "DELETE", auth });
}
