"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Linkedin,
  Link2,
  Check,
  Loader2,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";

// Hook centralisé (chemin complet pour éviter les problèmes d'index)
import { useArticles } from "@/hooks/use-articles";

// Utilitaires centralisés
import { getFileUrl, getAvatarUrl } from "@/lib/utils/image-url";
import { renderMarkdownContent } from "@/lib/utils/render-markdown";

// ==================== HELPERS ====================

/**
 * Formater une date en français
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


// ==================== PAGE COMPONENT ====================

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Récupérer le slug depuis les params
  const { slug } = use(params);

  // État local pour le bouton copier
  const [copied, setCopied] = useState(false);

  // Utiliser le hook centralisé
  const { article, isLoading, error, fetchArticleBySlug } = useArticles();

  // ==================== EFFECTS ====================

  // Charger l'article au montage
  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [slug, fetchArticleBySlug]);

  // ==================== HANDLERS ====================

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share handlers
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0077B6]" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">Erreur: {error}</p>
        <p className="text-neutral-500">Slug demandé: {slug}</p>
        <Link href="/news" className="text-[#0077B6] hover:underline">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  // Not found
  if (!article) {
    notFound();
  }

  // URLs des images
  const imageUrl = getFileUrl(article.featuredImage);
  const authorImageUrl = getAvatarUrl(article.authorImage);

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title={article.title}
        backgroundImage="/images/hero-bg.png"
      >
        {/* Author & Category */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
              <Image
                src={authorImageUrl}
                alt={article.authorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white font-medium">{article.authorName}</span>
          </div>
          <span className="text-white/50">•</span>
          <span className="text-white/80">
            Catégorie : {article.category.name}
          </span>
        </div>
      </HeroSecondary>

      {/* Breadcrumb + Share */}
      <div className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-neutral-600 hover:text-[#0077B6] transition-colors"
              >
                Accueil
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <Link
                href="/news"
                className="text-neutral-600 hover:text-[#0077B6] transition-colors"
              >
                Actualités & Insights
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-[#F9A825] font-medium">Article</span>
            </nav>

            {/* Share Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-[#0077B6] hover:text-[#005a8c] transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Lien copié !
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Partager
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Article Content */}
            <div>
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-md overflow-hidden mb-8"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Date & Read Time Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm text-neutral-700">
                    <Calendar className="w-4 h-4 text-[#0077B6]" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm text-neutral-700">
                    <Clock className="w-4 h-4 text-[#26A69A]" />
                    {article.readingTime} min
                  </span>
                </div>
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-[#FFF8E1] rounded-md p-6 mb-10"
              >
                <span className="absolute top-4 left-4 text-5xl text-[#F9A825] font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-neutral-700 italic pl-8 pr-4">
                  {article.excerpt}
                </p>
              </motion.blockquote>

              {/* Article Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                {renderMarkdownContent(article.content)}
              </motion.div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-3 mt-10 pt-8 border-t border-neutral-200">
                  <span className="text-sm font-medium text-neutral-700">
                    Tags :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-sm rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Share */}
                <div className="bg-neutral-50 rounded-md p-6">
                  <h3 className="font-semibold text-neutral-900 mb-4">
                    Partager
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-md bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-md bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="w-11 h-11 rounded-md bg-neutral-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-300 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Link2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Related Articles */}
                {article.relatedPosts && article.relatedPosts.length > 0 && (
                  <div className="bg-neutral-50 rounded-md p-6">
                    <h3 className="font-semibold text-neutral-900 mb-6">
                      Articles similaires
                    </h3>
                    <div className="space-y-5">
                      {article.relatedPosts.map((relatedArticle) => (
                        <Link
                          key={relatedArticle.id}
                          href={`/news/${relatedArticle.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={getFileUrl(relatedArticle.featuredImage)}
                                alt={relatedArticle.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#0077B6] font-medium mb-1">
                                {formatDate(relatedArticle.publishedAt)}
                              </p>
                              <h4 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-[#0077B6] transition-colors leading-snug">
                                {relatedArticle.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
