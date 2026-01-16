// ============================================================
// IMAGE URL HELPER - Construction des URLs d'images uploadées
// ============================================================

import { API_BASE_URL } from "@/lib/api/endpoints";

/**
 * Construit l'URL complète d'une image uploadée
 *
 * @param path - Le chemin retourné par l'API (ex: "/uploads/avatars/123.jpg")
 * @returns L'URL complète (ex: "https://api.imo2tun.org/uploads/avatars/123.jpg")
 *
 * @example
 * ```tsx
 * const avatarUrl = getImageUrl(user.profilePicture);
 * // Si profilePicture = "/uploads/avatars/123.jpg"
 * // Retourne: "https://api.imo2tun.org/uploads/avatars/123.jpg"
 *
 * <img src={avatarUrl} alt="Avatar" />
 * ```
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  // Si c'est déjà une URL complète (http:// ou https://), la retourner telle quelle
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Si c'est un data URL (base64), le retourner tel quel
  if (path.startsWith("data:")) {
    return path;
  }

  // Construire l'URL complète avec la base URL de l'API
  // S'assurer qu'il n'y a pas de double slash
  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  const imagePath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${imagePath}`;
}

/**
 * Construit l'URL d'un avatar avec fallback sur les initiales
 * Retourne null si pas d'image (pour afficher les initiales à la place)
 */
export function getAvatarUrl(
  profilePicture: string | null | undefined
): string | null {
  return getImageUrl(profilePicture);
}
