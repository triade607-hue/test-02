// ============================================================
// IMAGE URL HELPER - Construction des URLs d'images uploadées
// Fichier: src/lib/utils/image-url.ts
// ============================================================

import { API_BASE_URL } from "@/lib/api/endpoints";

// ==================== PLACEHOLDERS ====================

const PLACEHOLDER_IMAGE = "";
const PLACEHOLDER_AVATAR = "";

// ==================== HELPERS ====================

/**
 * Construit l'URL complète d'une image uploadée
 *
 * @param path - Le chemin retourné par l'API (ex: "/files/post-images/123.jpg")
 * @returns L'URL complète (ex: "https://staging-api.imo2tun.org/files/post-images/123.jpg")
 *
 * @example
 * ```tsx
 * const imageUrl = getFileUrl(article.featuredImage);
 * // Si featuredImage = "/files/post-images/123.jpg"
 * // Retourne: "https://staging-api.imo2tun.org/files/post-images/123.jpg"
 *
 * <Image src={imageUrl} alt="Article" />
 * ```
 */
export function getFileUrl(path: string | null | undefined): string {
  // Si pas de path, retourner le placeholder
  if (!path || path.trim() === "") {
    return PLACEHOLDER_IMAGE;
  }

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
 * Construit l'URL d'un avatar avec fallback sur le placeholder avatar
 *
 * @param profilePicture - Le chemin de l'image de profil
 * @returns L'URL complète ou le placeholder avatar
 */
export function getAvatarUrl(
  profilePicture: string | null | undefined,
): string {
  // Si pas d'image, retourner le placeholder avatar
  if (!profilePicture || profilePicture.trim() === "") {
    return PLACEHOLDER_AVATAR;
  }

  return getFileUrl(profilePicture);
}

/**
 * Vérifie si une URL d'image est valide (non vide, non placeholder)
 */
export function hasValidImage(path: string | null | undefined): boolean {
  return !!path && path.trim() !== "";
}
