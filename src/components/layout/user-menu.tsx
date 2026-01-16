"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/format-validation";

// Hook d'authentification
import { useAuth } from "@/hooks/use-auth";

interface UserMenuProps {
  variant?: "light" | "dark";
  className?: string;
}

export function UserMenu({ variant = "light", className }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // État d'authentification
  const { isAuthenticated, logout } = useAuth();

  // Fermer le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handler déconnexion
  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/");
  };

  const isDark = variant === "dark";

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      {/* Trigger Button - Identique à l'original */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          "focus:outline-none",
          isDark
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar petit - toujours le même */}
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-[#26A69A] to-[#0077B6]"
          )}
        >
          <User className="w-3.5 h-3.5 text-white" />
        </div>

        {/* Label - toujours "Mon espace" */}
        <span className="hidden sm:block">Mon espace</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-44 origin-top-right bg-white rounded-md shadow-md border border-neutral-100 overflow-hidden z-50"
          >
            <div className="py-1">
              {isAuthenticated ? (
                // ========== CONNECTÉ ==========
                <>
                  {/* Tableau de bord */}
                  <Link
                    href="/membre"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-[#0077B6] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Tableau de bord</span>
                  </Link>

                  {/* Divider */}
                  <div className="my-1 border-t border-neutral-100" />

                  {/* Déconnexion */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                // ========== NON CONNECTÉ ==========
                <>
                  {/* Se connecter */}
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-[#0077B6] transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se connecter</span>
                  </Link>

                  {/* Divider */}
                  <div className="my-1 border-t border-neutral-100" />

                  {/* S'inscrire */}
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:text-[#F9A825] transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>S&apos;inscrire</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Version mobile pour la sidebar
export function UserMenuMobile({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    onClose?.();
    await logout();
    router.push("/");
  };

  if (isAuthenticated) {
    // ========== MOBILE CONNECTÉ ==========
    return (
      <div className="space-y-1">
        <Link
          href="/membre"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5 text-[#0077B6]" />
          <span className="font-medium">Tableau de bord</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    );
  }

  // ========== MOBILE NON CONNECTÉ ==========
  return (
    <div className="space-y-1">
      <Link
        href="/login"
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
      >
        <LogIn className="w-5 h-5 text-[#0077B6]" />
        <span className="font-medium">Se connecter</span>
      </Link>

      <Link
        href="/register"
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#F9A825] hover:bg-[#E09000] text-white transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        <span className="font-medium">S&apos;inscrire</span>
      </Link>
    </div>
  );
}
