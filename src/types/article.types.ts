// ============================================================
// TYPES ARTICLES / BLOG - imo2tun
// ============================================================

/**
 * Catégorie d'article
 */
export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

/**
 * Article (format liste)
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  publishedAt: string;
  createdAt: string;
  readingTime: number;
  authorName: string;
  authorProfession: string;
  authorImage: string;
  category: ArticleCategory;
  tags: string[];
}

/**
 * Article détaillé (avec contenu complet)
 */
export interface ArticleDetail extends Article {
  content: string;
  relatedPosts: Article[];
  comments: ArticleComment[];
}

/**
 * Commentaire d'article
 */
export interface ArticleComment {
  id: string;
  content: string;
  authorName: string;
  authorImage?: string;
  createdAt: string;
}

// ==================== PAYLOADS ====================

/**
 * Paramètres pour la liste des articles
 */
export interface GetArticlesParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  search?: string;
  category?: string;
  authorName?: string;
  title?: string;
}

// ==================== RESPONSES ====================

/**
 * Réponse paginée (format Spring Boot)
 */
export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

/**
 * Réponse liste articles
 */
export type ArticlesResponse = PaginatedResponse<Article>;

/**
 * Réponse détail article
 */
export type ArticleDetailResponse = ArticleDetail;

// ==================== STATE ====================

/**
 * État du hook useArticles
 */
export interface ArticlesState {
  articles: Article[];
  article: ArticleDetail | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    totalElements: number;
    hasMore: boolean;
  };
}
