"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article.types";
import { getFileUrl, getAvatarUrl } from "@/lib/utils/image-url";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Construire les URLs des images
  const imageUrl = getFileUrl(article.featuredImage);
  const authorImageUrl = getAvatarUrl(article.authorImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
    >
      {/* Image container */}
      <div className="relative h-62 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overlay gradient */}
        <motion.div
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#007DC5]"
        />

        {/* Effet de brillance */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.8,
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
          />
        )}

        {/* Badge catégorie */}
        <motion.div
          animate={{ y: isHovered ? 0 : 0, scale: isHovered ? 1.05 : 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <span className="px-4 py-1.5 bg-[#007DC5] text-white text-xs font-bold rounded-full shadow-lg">
            {article.category.name}
          </span>
        </motion.div>

        {/* Temps de lecture - apparaît au hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 z-10"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime} min de lecture
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Titre */}
        <Link href={`/news/${article.slug}`}>
          <motion.h3
            animate={{ color: isHovered ? "#007DC5" : "#171717" }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold mb-3 line-clamp-2 cursor-pointer"
          >
            {article.title}
          </motion.h3>
        </Link>

        {/* Ligne sous le titre */}
        <motion.div
          animate={{
            width: isHovered ? "60px" : "40px",
            backgroundColor: isHovered ? "#007DC5" : "#F9A825",
          }}
          transition={{ duration: 0.4 }}
          className="h-[3px] rounded-full mb-4"
        />

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md">
              <Image
                src={authorImageUrl}
                alt={article.authorName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                {article.authorName}
              </p>
              <p className="text-xs text-neutral-500">
                {article.authorProfession}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* Lien Lire la suite */}
        <Link href={`/news/${article.slug}`}>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 text-[#F9A825] font-semibold text-sm group/link cursor-pointer"
          >
            <span>Lire la suite</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
}
