"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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

// Mock user data
const MOCK_USER = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@exemple.com",
  avatar: null,
  memberType: "Utilisateur",
  tier: "Sunun",
  tierColor: "#F9A825",
};

export default function MembreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/membre") {
      return pathname === "/membre";
    }
    return pathname.startsWith(href);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                  {MOCK_USER.firstName[0]}
                  {MOCK_USER.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">
                    {MOCK_USER.firstName} {MOCK_USER.lastName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-md text-white"
                      style={{ backgroundColor: MOCK_USER.tierColor }}
                    >
                      {MOCK_USER.tier}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {MOCK_USER.memberType}
                    </span>
                  </div>
                </div>
              </div>
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
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </Link>
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
              className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-100">
                <Link href="/" onClick={closeSidebar}>
                  <Image
                    src="/images/logo.png"
                    alt="imo2tun"
                    width={120}
                    height={40}
                    className="h-9 w-auto"
                  />
                </Link>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              {/* User Card */}
              <div className="p-4">
                <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                      {MOCK_USER.firstName[0]}
                      {MOCK_USER.lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-900 text-sm truncate">
                        {MOCK_USER.firstName} {MOCK_USER.lastName}
                      </p>
                      <span
                        className="inline-block px-2 py-0.5 text-xs font-medium rounded-md text-white"
                        style={{ backgroundColor: MOCK_USER.tierColor }}
                      >
                        {MOCK_USER.tier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-neutral-100">
                <Link
                  href="/login"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-neutral-600" />
            </button>

            {/* Page title - hidden on mobile */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-neutral-900">
                Espace membre
              </h1>
            </div>

            {/* Mobile logo */}
            <Link href="/" className="lg:hidden">
              <Image
                src="/images/logo.png"
                alt="imo2tun"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="relative p-2 rounded-md hover:bg-neutral-100 transition-colors">
                <Bell className="w-5 h-5 text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full" />
              </button>

              {/* User avatar desktop */}
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-neutral-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900">
                    {MOCK_USER.firstName} {MOCK_USER.lastName}
                  </p>
                  <p className="text-xs text-neutral-500">{MOCK_USER.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                  {MOCK_USER.firstName[0]}
                  {MOCK_USER.lastName[0]}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}