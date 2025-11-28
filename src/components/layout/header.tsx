"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/" || href === "/home") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname.startsWith(href);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "bg-white sticky top-0 z-50 transition-shadow duration-300",
          isScrolled ? "shadow-md" : "shadow-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-18">
            {/* Logo - Left */}
            <Link href="/home" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="imo2tun"
                width={180}
                height={60}
                className="h-12 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Navigation + CTA - Right (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-[14px] transition-colors pb-1",
                      isActive(link.href)
                        ? "text-[#F9A825] font-semibold"
                        : "text-neutral-900 font-semibold hover:text-[#F9A825]"
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F9A825] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>

              <Link href="/contact">
                <Button
                  variant="primary"
                  className="rounded-md focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0
"
                  size="md"
                >
                  Contactez-nous
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 lg:hidden flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <Link href="/home" onClick={closeMobileMenu}>
                  <Image
                    src="/images/logo.png"
                    alt="imo2tun"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-neutral-700" />
                </button>
              </div>

              {/* Sidebar Navigation */}
              <nav className="flex-1 py-6 px-6">
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "relative text-[15px] py-3 transition-colors",
                        isActive(link.href)
                          ? "text-[#F9A825] font-semibold"
                          : "text-neutral-900 font-semibold hover:text-[#F9A825]"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="absolute bottom-2 left-0 w-8 h-[2px] bg-[#F9A825] rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-neutral-100">
                <Link href="/contact" onClick={closeMobileMenu}>
                  <Button
                    variant="primary"
                    className="w-full rounded-sm"
                    size="sm"
                  >
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
