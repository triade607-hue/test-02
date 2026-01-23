"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Gift,
  FileText,
  Users,
  ArrowRight,
  Crown,
  Sparkles,
  Clock,
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";

// Hook Dashboard API
import { useDashboard } from "@/hooks/use-dashboard";

// ============================================================
// CONFIGURATION
// ============================================================

const TIER_CONFIG: Record<string, { label: string; color: string }> = {
  GRATUIT: { label: "Gratuit", color: "#6B7280" },
  ASUKA: { label: "Asuka", color: "#26A69A" },
  SUNUN: { label: "Sunun", color: "#F9A825" },
  MINDAHO: { label: "Mindaho", color: "#0077B6" },
  DAH: { label: "Dah", color: "#7B1FA2" },
};

const MEMBER_TYPE_LABELS: Record<string, string> = {
  FREEMIUM: "Freemium",
  OFFREUR: "Offreur",
  UTILISATEUR: "Utilisateur",
  CONTRIBUTEUR: "Contributeur",
  PARTENAIRE: "Partenaire",
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

// Quick actions fonctionnelles (liens vers pages publiques)
const QUICK_ACTIONS_AVAILABLE = [
  {
    label: "Voir les événements",
    href: "/events",
    icon: Calendar,
    color: "bg-primary-500",
    available: true,
  },
  {
    label: "Actualités",
    href: "/news",
    icon: FileText,
    color: "bg-accent-500",
    available: true,
  },
];

// Quick actions non disponibles (affichées mais désactivées)
const QUICK_ACTIONS_COMING_SOON = [
  {
    label: "Annuaire membres",
    href: "#",
    icon: Users,
    color: "bg-secondary-500",
    available: false,
  },
];

// ============================================================
// COMPOSANT BADGE "BIENTÔT DISPONIBLE"
// ============================================================

function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
        "bg-amber-100 text-amber-700 border border-amber-200",
        className,
      )}
    >
      <Clock className="w-3 h-3" />
      Bientôt disponible
    </span>
  );
}

// ============================================================
// COMPOSANT SECTION DÉSACTIVÉE
// ============================================================

function DisabledSection({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="relative bg-neutral-50 rounded-md border border-neutral-200 p-5 opacity-60">
      {/* Overlay pour empêcher les clics */}
      <div className="absolute inset-0 cursor-not-allowed z-10" />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-neutral-200 flex items-center justify-center">
            <Icon className="w-5 h-5 text-neutral-400" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-500">{title}</h3>
            <p className="text-sm text-neutral-400">{description}</p>
          </div>
        </div>
        <ComingSoonBadge />
      </div>
    </div>
  );
}

// ============================================================
// PAGE DASHBOARD
// ============================================================

export default function DashboardPage() {
  // Données depuis l'API
  const { data, isLoading, error, refresh, isFreemium, hasPendingApplication } =
    useDashboard();

  // Extraire les données
  const user = data?.user;
  const membership = data?.activeMembership;
  const applications = data?.myApplications || [];

  // Config du tier
  const tierName = membership?.tierName?.toUpperCase() || "GRATUIT";
  const tierConfig = TIER_CONFIG[tierName] || TIER_CONFIG.GRATUIT;

  // Formatage date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==================== LOADING STATE ====================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  // ==================== ERROR STATE ====================

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================

  return (
    <div className="space-y-6">
      {/* ==================== WELCOME CARD ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative overflow-hidden rounded-md p-6 md:p-8 text-white",
          isFreemium
            ? "bg-gradient-to-r from-neutral-700 to-neutral-600"
            : "bg-gradient-to-r from-primary-600 to-accent-500",
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
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-md transition-colors"
              >
                <Crown className="w-5 h-5" />
                Devenir membre
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                  <span className="text-sm text-white/80">Niveau</span>
                  <p className="font-semibold">{tierConfig.label}</p>
                </div>
                {membership?.memberType && (
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                    <span className="text-sm text-white/80">Type</span>
                    <p className="font-semibold">
                      {MEMBER_TYPE_LABELS[membership.memberType] ||
                        membership.memberType}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ==================== CANDIDATURE EN COURS ==================== */}
      {hasPendingApplication && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-amber-50 border border-amber-200 rounded-md p-4"
        >
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">
                Candidature en cours d&apos;examen
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                Votre demande d&apos;adhésion est en cours de traitement. Vous
                serez notifié par email dès qu&apos;une décision sera prise.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== MAIN GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================== LEFT COLUMN ==================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mes événements - COMING SOON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <DisabledSection
              title="Mes prochains événements"
              description="Retrouvez ici vos inscriptions aux événements"
              icon={Calendar}
            />
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Actions disponibles */}
              {QUICK_ACTIONS_AVAILABLE.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors group"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md flex items-center justify-center text-white",
                      action.color,
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 text-center group-hover:text-primary-600">
                    {action.label}
                  </span>
                </Link>
              ))}

              {/* Actions non disponibles */}
              {QUICK_ACTIONS_COMING_SOON.map((action) => (
                <div
                  key={action.label}
                  className="relative flex flex-col items-center gap-2 p-4 bg-neutral-50 rounded-md opacity-50 cursor-not-allowed"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md flex items-center justify-center text-white",
                      action.color,
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-500 text-center">
                    {action.label}
                  </span>
                  <ComingSoonBadge className="absolute top-1 right-1 text-[10px] px-1.5" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mes candidatures (si existantes) */}
          {applications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white rounded-md border border-neutral-100 p-5"
            >
              <h2 className="font-semibold text-neutral-900 mb-4">
                Mes candidatures
              </h2>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-neutral-900">
                        Adhésion {app.tierName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Soumise le {formatDate(app.createdAt)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-md",
                        app.status === "PENDING" &&
                          "bg-amber-100 text-amber-700",
                        app.status === "APPROVED" &&
                          "bg-green-100 text-green-700",
                        app.status === "REJECTED" && "bg-red-100 text-red-700",
                        app.status === "PAYMENT_PENDING" &&
                          "bg-blue-100 text-blue-700",
                      )}
                    >
                      {app.status === "PENDING" && "En attente"}
                      {app.status === "APPROVED" && "Approuvée"}
                      {app.status === "REJECTED" && "Refusée"}
                      {app.status === "PAYMENT_PENDING" &&
                        "Paiement en attente"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ==================== RIGHT COLUMN ==================== */}
        <div className="space-y-6">
          {/* Informations adhésion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-md border border-neutral-100 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900">Mon adhésion</h2>
              {!isFreemium && (
                <span
                  className="px-2 py-1 text-xs font-medium rounded-md text-white"
                  style={{ backgroundColor: tierConfig.color }}
                >
                  {tierConfig.label}
                </span>
              )}
            </div>

            {isFreemium ? (
              <>
                {/* Freemium Features */}
                <div className="space-y-2 mb-4">
                  {FREEMIUM_FEATURES.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      {feature.available ? (
                        <CheckCircle className="w-4 h-4 text-accent-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-neutral-300" />
                      )}
                      <span
                        className={
                          feature.available
                            ? "text-neutral-700"
                            : "text-neutral-400"
                        }
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/membership"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-4 h-4" />
                  Passer à un abonnement
                </Link>
              </>
            ) : (
              <>
                {/* Membership Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Type</span>
                    <span className="font-medium text-neutral-900">
                      {MEMBER_TYPE_LABELS[membership?.memberType || ""] ||
                        membership?.memberType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Rabais événements</span>
                    <span className="font-medium text-neutral-900">
                      {membership?.eventDiscountPercent || 0}%
                    </span>
                  </div>
                  {membership?.membershipStartDate && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Membre depuis</span>
                      <span className="font-medium text-neutral-900">
                        {formatDate(membership.membershipStartDate)}
                      </span>
                    </div>
                  )}
                  {membership?.membershipEndDate && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">
                        Valide jusqu&apos;au
                      </span>
                      <span className="font-medium text-neutral-900">
                        {formatDate(membership.membershipEndDate)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <Link
                    href="/membre/avantages"
                    className="flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Voir mes avantages
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </motion.div>

          {/* Mon profil - Aperçu rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white rounded-md border border-neutral-100 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-neutral-900">Mon profil</h2>
              <Link
                href="/membre/profil"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Modifier
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-lg font-semibold">
                {user?.firstName?.charAt(0) || ""}
                {user?.lastName?.charAt(0) || ""}
              </div>
              <div>
                <p className="font-medium text-neutral-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-neutral-500">{user?.email}</p>
                {user?.profession && (
                  <p className="text-sm text-neutral-500">{user.profession}</p>
                )}
              </div>
            </div>

            {/* Statut du profil */}
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-accent-500" />
              <span className="text-neutral-600">Email vérifié</span>
            </div>
          </motion.div>

          {/* Sections Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="space-y-3"
          >
            <DisabledSection
              title="Mes avantages"
              description="Quotas et bénéfices selon votre tier"
              icon={Gift}
            />
            <DisabledSection
              title="Bibliothèque"
              description="Documents et ressources exclusives"
              icon={FileText}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
