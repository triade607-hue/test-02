/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Gift,
  User,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";
import { getImageUrl } from "@/lib/utils/image-url";

// Auth
import { useAuth } from "@/hooks/use-auth";
import { AuthGuard } from "@/guards";

// Navigation items
const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    href: "/membre",
    icon: LayoutDashboard,
  },
  {
    label: "Mes événements",
    href: "/membre/evenements",
    icon: Calendar,
  },
  {
    label: "Mes avantages",
    href: "/membre/avantages",
    icon: Gift,
  },
  {
    label: "Bibliothèque",
    href: "/membre/bibliotheque",
    icon: FileText,
  },
  {
    label: "Mon profil",
    href: "/membre/profil",
    icon: User,
  },
  {
    label: "Paramètres",
    href: "/membre/parametres",
    icon: Settings,
  },
];

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

export default function MembreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Données utilisateur depuis le contexte Auth
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/membre") {
      return pathname === "/membre";
    }
    return pathname.startsWith(href);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // Handler déconnexion
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // ============================================================
  // LOGIQUE FREEMIUM / MEMBRE
  // ============================================================
  const isFreemium =
    user?.role === "ROLE_GUEST" ||
    (!user?.memberType && !user?.membershipTierId);

  // Récupérer le tier config
  const tierKey = user?.membershipTierId?.toUpperCase() || "";
  const tierConfig = TIER_CONFIG[tierKey] || null;

  // Données affichées
  const displayUser = {
    firstName: user?.firstName || "Membre",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatar: getImageUrl(user?.profilePicture),
    // Membership - Freemium ou Membre
    isFreemium,
    tier: tierConfig?.label || null,
    tierColor: tierConfig?.color || "#9E9E9E",
    memberType: user?.memberType
      ? MEMBER_TYPE_LABELS[user.memberType] || user.memberType
      : null,
  };

  // Initiales
  const initials =
    `${displayUser.firstName[0] || ""}${displayUser.lastName[0] || ""}`.toUpperCase();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-100">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-1 bg-white border-r border-neutral-200">
            {/* Logo */}
            <div className="flex items-center h-16 px-6 border-b border-neutral-100">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="imo2tun"
                  width={140}
                  height={45}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* User Card */}
            <div className="p-4">
              <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-md">
                <div className="flex items-center gap-3">
                  {/* Avatar - Photo ou Initiales */}
                  {displayUser.avatar ? (
                    <img
                      src={displayUser.avatar}
                      alt={`${displayUser.firstName} ${displayUser.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                      {initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {displayUser.firstName} {displayUser.lastName}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {displayUser.isFreemium ? (
                        // Compte Freemium
                        <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-neutral-200 text-neutral-600">
                          Freemium
                        </span>
                      ) : (
                        // Membre avec tier
                        <>
                          {displayUser.tier && (
                            <span
                              className="px-2 py-0.5 text-xs font-medium rounded-md text-white"
                              style={{ backgroundColor: displayUser.tierColor }}
                            >
                              {displayUser.tier}
                            </span>
                          )}
                          {displayUser.memberType && (
                            <span className="text-xs text-neutral-500">
                              {displayUser.memberType}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Devenir membre si Freemium */}
                {displayUser.isFreemium && (
                  <Link
                    href="/membership"
                    className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    Devenir membre
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-600"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-neutral-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />

              {/* Sidebar */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                  <Link href="/" onClick={closeSidebar}>
                    <Image
                      src="/images/logo.png"
                      alt="imo2tun"
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </Link>
                  <button
                    onClick={closeSidebar}
                    className="p-2 rounded-lg hover:bg-neutral-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Card Mobile */}
                <div className="p-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    {/* Avatar Mobile - Photo ou Initiales */}
                    {displayUser.avatar ? (
                      <img
                        src={displayUser.avatar}
                        alt={`${displayUser.firstName} ${displayUser.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                        {initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-900 text-sm truncate">
                        {displayUser.firstName} {displayUser.lastName}
                      </p>
                      <div className="flex items-center gap-2">
                        {displayUser.isFreemium ? (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-neutral-200 text-neutral-600">
                            Freemium
                          </span>
                        ) : displayUser.tier ? (
                          <span
                            className="px-2 py-0.5 text-xs font-medium rounded-md text-white"
                            style={{ backgroundColor: displayUser.tierColor }}
                          >
                            {displayUser.tier}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* CTA Mobile */}
                  {displayUser.isFreemium && (
                    <Link
                      href="/membership"
                      onClick={closeSidebar}
                      className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      Devenir membre
                    </Link>
                  )}
                </div>

                {/* Navigation Mobile */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSidebar}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                        isActive(item.href)
                          ? "bg-primary-50 text-primary-600"
                          : "text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Logout Mobile */}
                <div className="p-4 border-t border-neutral-100">
                  <button
                    onClick={() => {
                      closeSidebar();
                      handleLogout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Breadcrumb / Title */}
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Espace membre
                </h2>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-neutral-100">
                  <Bell className="w-5 h-5 text-neutral-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full" />
                </button>

                {/* User avatar desktop */}
                <div className="hidden md:flex items-center gap-3 pl-3 border-l border-neutral-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">
                      {displayUser.firstName} {displayUser.lastName}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {displayUser.isFreemium
                        ? "Compte Freemium"
                        : displayUser.tier || displayUser.email}
                    </p>
                  </div>
                  {/* Avatar Header - Photo ou Initiales */}
                  {displayUser.avatar ? (
                    <img
                      src={displayUser.avatar}
                      alt={`${displayUser.firstName} ${displayUser.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                      {initials}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
