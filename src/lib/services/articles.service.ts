// ============================================================
// SERVICE ARTICLES - imo2tun
// ============================================================

import { get } from "@/lib/api/client";
import { ARTICLES_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Article,
  ArticleDetail,
  ArticleCategory,
  ArticlesResponse,
  GetArticlesParams,
} from "@/types/article.types";

// ==================== HELPERS ====================

/**
 * Construit les query params pour la liste
 */
function buildQueryParams(params: GetArticlesParams): string {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.size !== undefined) searchParams.set("size", String(params.size));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortDir) searchParams.set("sortDir", params.sortDir);
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category.name", params.category);
  if (params.authorName) searchParams.set("authorName", params.authorName);
  if (params.title) searchParams.set("title", params.title);

  return searchParams.toString();
}

// ==================== GET ARTICLES ====================

/**
 * Récupérer la liste des articles (paginée)
 * @param params - Paramètres de pagination et filtres
 * @returns Liste paginée d'articles
 */
export async function getArticles(
  params: GetArticlesParams = {}
): Promise<ArticlesResponse> {
  const queryString = buildQueryParams({
    page: 0,
    size: 10,
    sortDir: "desc",
    ...params,
  });

  const endpoint = `${ARTICLES_ENDPOINTS.LIST}?${queryString}`;
  return get<ArticlesResponse>(endpoint, false);
}

// ==================== GET ARTICLE BY SLUG ====================

/**
 * Récupérer un article par son slug
 * @param slug - Slug de l'article
 * @returns Détail de l'article
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDetail> {
  return get<ArticleDetail>(ARTICLES_ENDPOINTS.DETAIL(slug), false);
}

// ==================== GET LATEST ARTICLES ====================

/**
 * Récupérer les derniers articles (pour la page d'accueil)
 * @param count - Nombre d'articles à récupérer
 * @returns Liste des derniers articles
 */
export async function getLatestArticles(count: number = 3): Promise<Article[]> {
  const response = await getArticles({
    page: 0,
    size: count,
    sortDir: "desc",
  });
  return response.content;
}

// ==================== GET CATEGORIES ====================

/**
 * Récupérer les catégories d'articles
 * @returns Liste des catégories
 */
export async function getCategories(): Promise<ArticleCategory[]> {
  return get<ArticleCategory[]>(ARTICLES_ENDPOINTS.CATEGORIES, false);
}

// ==================== EXPORT GROUPÉ ====================

export const articlesService = {
  // Liste
  getArticles,
  getLatestArticles,

  // Détail
  getArticleBySlug,

  // Catégories
  getCategories,
};

export default articlesService;
