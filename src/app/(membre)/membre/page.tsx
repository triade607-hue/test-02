/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Gift,
  FileText,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  Crown,
  Sparkles,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";

// Auth
import { useAuth } from "@/hooks/use-auth";

// ============================================================
// CONFIGURATION DES TIERS
// ============================================================
const TIER_CONFIG: Record<string, { label: string; color: string }> = {
  ASUKA: { label: "Asuka", color: "#26A69A" },
  SUNUN: { label: "Sunun", color: "#F9A825" },
  MINDAHO: { label: "Mindaho", color: "#0077B6" },
  DAH: { label: "Dah", color: "#7B1FA2" },
};

const MEMBER_TYPE_LABELS: Record<string, string> = {
  OFFREUR: "Offreur",
  UTILISATEUR: "Utilisateur",
  CONTRIBUTEUR: "Contributeur",
  PARTENAIRE: "Partenaire",
};

// ============================================================
// MOCK DATA - En attendant les APIs dashboard (events, quotas)
// ============================================================
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Workshop Intelligence Artificielle",
    date: "2025-02-15",
    time: "09:00 - 17:00",
    location: "Cotonou, Bénin",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Conférence Fintech Summit",
    date: "2025-03-20",
    time: "14:00 - 18:00",
    location: "En ligne",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&q=80",
    status: "pending",
  },
];

// Avantages selon le tier (pour les membres)
const TIER_ADVANTAGES: Record<string, string[]> = {
  ASUKA: [
    "50% de rabais sur les événements",
    "2 demandes d'expertise/an",
    "Accès catégorie Asuka",
    "2 sollicitations projets/an",
    "1 présentation lors de colloques",
  ],
  SUNUN: [
    "50% de rabais sur les événements",
    "5 demandes d'expertise/an",
    "Accès catégories Sunun et Asuka",
    "5 sollicitations projets/an",
    "Rabais colloques partenaires",
    "2 présentations lors de colloques",
  ],
  MINDAHO: [
    "75% de rabais sur les événements",
    "12 demandes d'expertise/an",
    "Accès catégories Mindaho et en deçà",
    "12 sollicitations projets/an",
    "Rabais colloques partenaires",
    "3 présentations lors de colloques",
    "Mise en relation éditeurs",
  ],
  DAH: [
    "Accès gratuit aux événements",
    "Demandes d'expertise illimitées",
    "Accès à toutes les catégories",
    "Sollicitations projets illimitées",
    "Rabais colloques partenaires",
    "6 présentations lors de colloques",
    "Mise en relation éditeurs",
    "Rabais produits partenaires",
  ],
};

// Avantages Freemium (limités)
const FREEMIUM_FEATURES = [
  { label: "Accès aux actualités", available: true },
  { label: "Consultation événements", available: true },
  { label: "Profil basique", available: true },
  { label: "Rabais événements", available: false },
  { label: "Demandes d'expertise", available: false },
  { label: "Accès bibliothèque", available: false },
  { label: "Sollicitations projets", available: false },
];

const QUICK_ACTIONS = [
  {
    label: "Voir les événements",
    href: "/events",
    icon: Calendar,
    color: "bg-primary-500",
  },
  {
    label: "Actualités",
    href: "/news",
    icon: FileText,
    color: "bg-accent-500",
  },
  {
    label: "Annuaire membres",
    href: "/members",
    icon: Users,
    color: "bg-secondary-500",
  },
];

export default function DashboardPage() {
  // Données utilisateur depuis le contexte Auth
  const { user } = useAuth();

  // Logique Freemium / Membre
  const isFreemium =
    user?.role === "ROLE_GUEST" ||
    (!user?.memberType && !user?.membershipTierId);

  // Récupérer le tier config
  const tierKey = user?.membershipTierId?.toUpperCase() || "";
  const tierConfig = TIER_CONFIG[tierKey] || null;

  // Avantages selon le tier
  const advantages = tierKey ? TIER_ADVANTAGES[tierKey] || [] : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative overflow-hidden rounded-md p-6 md:p-8 text-white",
          isFreemium
            ? "bg-gradient-to-r from-neutral-700 to-neutral-600"
            : "bg-gradient-to-r from-primary-600 to-accent-500"
        )}
      >
        {/* Cercles décoratifs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-white/10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border-[30px] border-white/10 rounded-full" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bonjour, {user?.firstName || "Membre"} ! 👋
              </h1>
              <p className="text-white/80">
                {isFreemium
                  ? "Bienvenue ! Devenez membre pour accéder à tous les avantages."
                  : "Bienvenue dans votre espace personnel imo2tun"}
              </p>
            </div>

            {isFreemium ? (
              // Bouton CTA Freemium
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-md transition-colors"
              >
                <Crown className="w-5 h-5" />
                Devenir membre
              </Link>
            ) : (
              // Info membre
              <div className="flex items-center gap-3">
                {tierConfig && (
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                    <span className="text-sm text-white/80">Niveau</span>
                    <p className="font-semibold">{tierConfig.label}</p>
                  </div>
                )}
                {user?.memberType && (
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                    <span className="text-sm text-white/80">Type</span>
                    <p className="font-semibold">
                      {MEMBER_TYPE_LABELS[user.memberType] || user.memberType}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Events & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-md border border-neutral-100 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900">
                {isFreemium ? "Événements à venir" : "Mes prochains événements"}
              </h2>
              <Link
                href="/events"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                Tout voir
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {MOCK_EVENTS.length > 0 ? (
              <div className="space-y-3">
                {MOCK_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-900 text-sm truncate">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                    {!isFreemium && (
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded-md",
                          event.status === "confirmed"
                            ? "bg-accent-100 text-accent-700"
                            : "bg-secondary-100 text-secondary-700"
                        )}
                      >
                        {event.status === "confirmed"
                          ? "Confirmé"
                          : "En attente"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 text-sm">
                  Aucun événement à venir
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Découvrir les événements
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-md border border-neutral-100 p-5"
          >
            <h2 className="font-semibold text-neutral-900 mb-4">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-4 rounded-md border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all group"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md flex items-center justify-center text-white",
                      action.color
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-md border border-neutral-100 p-5"
        >
          {isFreemium ? (
            // ========== FREEMIUM ==========
            <>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-neutral-400" />
                <h2 className="font-semibold text-neutral-900">
                  Fonctionnalités
                </h2>
              </div>

              <div className="mb-4 p-3 bg-neutral-50 rounded-md">
                <p className="text-sm text-neutral-600">
                  Votre compte Freemium vous donne un accès limité. Devenez
                  membre pour débloquer tous les avantages !
                </p>
              </div>

              <ul className="space-y-2 mb-4">
                {FREEMIUM_FEATURES.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.available ? (
                      <span className="w-4 h-4 rounded-full bg-accent-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-accent-500" />
                      </span>
                    ) : (
                      <Lock className="w-4 h-4 text-neutral-300" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.available
                          ? "text-neutral-700"
                          : "text-neutral-400"
                      )}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/membership"
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-md transition-colors"
              >
                <Crown className="w-4 h-4" />
                Devenir membre
              </Link>
            </>
          ) : (
            // ========== MEMBRE ==========
            <>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-secondary-500" />
                <h2 className="font-semibold text-neutral-900">
                  Mes avantages
                </h2>
              </div>

              {tierConfig && (
                <div className="mb-4 p-3 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="w-4 h-4 text-secondary-600" />
                    <span className="text-sm font-semibold text-secondary-700">
                      Niveau {tierConfig.label}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-600">
                    Profitez de tous vos avantages exclusifs
                  </p>
                </div>
              )}

              <ul className="space-y-2">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-accent-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-accent-500" />
                    </span>
                    <span className="text-sm text-neutral-700">
                      {advantage}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/membre/avantages"
                className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
              >
                Voir tous mes avantages
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
