"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  Download,
  Search,
  File,
  Video,
  BookOpen,
  Presentation,
  Lock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";

// Mock data
const MOCK_USER = {
  tier: "Sunun",
  downloadsUsed: 7,
  downloadsTotal: 10,
};

const CATEGORIES = [
  { id: "all", label: "Tous", icon: FileText },
  { id: "etudes", label: "Études", icon: BookOpen },
  { id: "formations", label: "Formations", icon: Video },
  { id: "guides", label: "Guides", icon: File },
  { id: "presentations", label: "Présentations", icon: Presentation },
];

const MOCK_DOCUMENTS = [
  {
    id: "1",
    title: "Guide de transformation digitale pour PME africaines",
    description:
      "Un guide complet pour accompagner les PME dans leur transformation numérique.",
    category: "guides",
    type: "PDF",
    size: "2.4 MB",
    author: "imo2tun",
    date: "2025-01-10",
    downloads: 245,
    tierRequired: "Asuka",
    image:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80",
  },
  {
    id: "2",
    title: "Livre blanc : L'IA au service des entreprises",
    description:
      "Étude approfondie sur l'intégration de l'intelligence artificielle dans les processus métiers.",
    category: "etudes",
    type: "PDF",
    size: "5.1 MB",
    author: "Microsoft",
    date: "2025-01-05",
    downloads: 189,
    tierRequired: "Sunun",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
  },
  {
    id: "3",
    title: "Formation Cloud Computing - Module 1",
    description:
      "Introduction aux concepts fondamentaux du cloud computing et ses applications.",
    category: "formations",
    type: "Vidéo",
    size: "1.2 GB",
    author: "AWS",
    date: "2024-12-20",
    downloads: 312,
    tierRequired: "Asuka",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
  },
  {
    id: "4",
    title: "Présentation Fintech Summit 2024",
    description:
      "Slides de la conférence sur les tendances fintech en Afrique de l'Ouest.",
    category: "presentations",
    type: "PPTX",
    size: "15.8 MB",
    author: "Fintech Africa",
    date: "2024-12-15",
    downloads: 156,
    tierRequired: "Mindaho",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80",
  },
  {
    id: "5",
    title: "Étude de marché : E-commerce en Afrique 2025",
    description:
      "Analyse complète du marché e-commerce avec projections et opportunités.",
    category: "etudes",
    type: "PDF",
    size: "8.3 MB",
    author: "McKinsey",
    date: "2024-12-10",
    downloads: 423,
    tierRequired: "Dah",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
  },
  {
    id: "6",
    title: "Checklist Cybersécurité pour startups",
    description:
      "Liste complète des bonnes pratiques de sécurité informatique pour les jeunes entreprises.",
    category: "guides",
    type: "PDF",
    size: "890 KB",
    author: "ISACA",
    date: "2024-11-28",
    downloads: 278,
    tierRequired: "Asuka",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
  },
];

const TIER_ORDER = ["Asuka", "Sunun", "Mindaho", "Dah"];

export default function BibliothequePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const userTierIndex = TIER_ORDER.indexOf(MOCK_USER.tier);

  const canAccess = (tierRequired: string) => {
    const requiredIndex = TIER_ORDER.indexOf(tierRequired);
    return userTierIndex >= requiredIndex;
  };

  const filteredDocuments = MOCK_DOCUMENTS.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return FileText;
      case "Vidéo":
        return Video;
      case "PPTX":
        return Presentation;
      default:
        return File;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Bibliothèque
          </h1>
          <p className="text-neutral-600">
            Accédez aux ressources exclusives de la communauté
          </p>
        </div>

        {/* Quota indicator */}
        <div className="bg-white rounded-md border border-neutral-100 p-4 md:min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-600">Téléchargements</span>
            <span className="text-sm font-semibold text-neutral-900">
              {MOCK_USER.downloadsUsed}/{MOCK_USER.downloadsTotal}
            </span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full"
              style={{
                width: `${(MOCK_USER.downloadsUsed / MOCK_USER.downloadsTotal) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-neutral-500 mt-1">Ce mois-ci</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-md border border-neutral-100 p-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 relative lg:max-w-xs lg:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredDocuments.map((doc, index) => {
          const TypeIcon = getTypeIcon(doc.type);
          const hasAccess = canAccess(doc.tierRequired);

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "bg-white rounded-md border border-neutral-100 overflow-hidden group",
                !hasAccess && "opacity-75"
              )}
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Type badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-md text-xs font-medium text-neutral-700">
                  <TypeIcon className="w-3 h-3" />
                  {doc.type}
                </div>

                {/* Lock or tier badge */}
                {!hasAccess ? (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-neutral-900/80 rounded-md text-xs font-medium text-white">
                    <Lock className="w-3 h-3" />
                    {doc.tierRequired}+
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-accent-500 rounded-md text-xs font-medium text-white">
                    Accessible
                  </div>
                )}

                {/* Size */}
                <div className="absolute bottom-3 right-3 text-xs text-white/80">
                  {doc.size}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                  {doc.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {doc.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {doc.downloads}
                  </span>
                </div>

                {/* Action */}
                {hasAccess ? (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-500 text-sm font-medium rounded-md cursor-not-allowed">
                    <Lock className="w-4 h-4" />
                    Niveau {doc.tierRequired} requis
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-md border border-neutral-100 p-12 text-center">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            Aucun document trouvé
          </h3>
          <p className="text-neutral-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}
