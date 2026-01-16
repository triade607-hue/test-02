"use client";

// ============================================================
// HOOK useArticles - Gestion des articles
// ============================================================

import { useState, useCallback } from "react";
import { articlesService } from "@/lib/services/articles.service";
import type {
  Article,
  ArticleDetail,
  ArticleCategory,
  ArticlesState,
  GetArticlesParams,
} from "@/types/article.types";

// ==================== INITIAL STATE ====================

interface ExtendedArticlesState extends ArticlesState {
  categories: ArticleCategory[];
}

const initialState: ExtendedArticlesState = {
  articles: [],
  article: null,
  categories: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 0,
    totalPages: 0,
    totalElements: 0,
    hasMore: false,
  },
};

// ==================== HOOK ====================

interface UseArticlesReturn extends ExtendedArticlesState {
  // Actions
  fetchArticles: (params?: GetArticlesParams) => Promise<void>;
  fetchArticleBySlug: (slug: string) => Promise<ArticleDetail | null>;
  fetchLatestArticles: (count?: number) => Promise<Article[]>;
  fetchCategories: () => Promise<ArticleCategory[]>;

  // Utilitaires
  clearError: () => void;
  reset: () => void;
}

/**
 * Hook pour gérer les articles
 */
export function useArticles(): UseArticlesReturn {
  const [state, setState] = useState<ExtendedArticlesState>(initialState);

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

  // ==================== FETCH ARTICLES ====================

  /**
   * Récupérer la liste des articles (paginée)
   */
  const fetchArticles = useCallback(
    async (params: GetArticlesParams = {}) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await articlesService.getArticles(params);

        setState((prev) => ({
          ...prev,
          articles: response.content,
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
    [setError, handleError]
  );

  // ==================== FETCH ARTICLE BY SLUG ====================

  /**
   * Récupérer un article par son slug
   */
  const fetchArticleBySlug = useCallback(
    async (slug: string): Promise<ArticleDetail | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const article = await articlesService.getArticleBySlug(slug);

        setState((prev) => ({
          ...prev,
          article,
          isLoading: false,
        }));

        return article;
      } catch (err) {
        setError(handleError(err));
        return null;
      }
    },
    [setError, handleError]
  );

  // ==================== FETCH LATEST ARTICLES ====================

  /**
   * Récupérer les derniers articles (pour la page d'accueil)
   */
  const fetchLatestArticles = useCallback(
    async (count: number = 3): Promise<Article[]> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const articles = await articlesService.getLatestArticles(count);

        setState((prev) => ({
          ...prev,
          articles,
          isLoading: false,
        }));

        return articles;
      } catch (err) {
        setError(handleError(err));
        return [];
      }
    },
    [setError, handleError]
  );

  // ==================== FETCH CATEGORIES ====================

  /**
   * Récupérer les catégories d'articles
   */
  const fetchCategories = useCallback(async (): Promise<ArticleCategory[]> => {
    try {
      const categories = await articlesService.getCategories();

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
    fetchArticles,
    fetchArticleBySlug,
    fetchLatestArticles,
    fetchCategories,
    clearError,
    reset,
  };
}

export default useArticles;
