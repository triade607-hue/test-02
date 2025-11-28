"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Accueil", href: "/home" },
  { label: "À propos", href: "/about" },
  { label: "Actualités", href: "/news" },
  { label: "Événements", href: "/events" },
  { label: "Adhérer", href: "/membership" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/imo2tun", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/imo2tun", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/imo2tun", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Partie supérieure - Bleu */}
      <div className="bg-[#007DC5]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-white font-semibold">Imo2tun</span>{" "}
                c&apos;est l&apos;expérience d&apos;une connaissance nouvelle au
                service de la jeunesse africaine pour un développement durable.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative">
                Liens rapides
                <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-white" />
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {/* <span className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contactez-nous */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative">
                Contactez-nous
                <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-white" />
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+33632808316"
                    className="text-white/80 hover:text-white text-sm transition-colors duration-300 flex items-start gap-3"
                  >
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>(33) 632808316</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@imo2tun.org"
                    className="text-white/80 hover:text-white text-sm transition-colors duration-300 flex items-start gap-3"
                  >
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>info@imo2tun.org</span>
                  </a>
                </li>
                <li>
                  <div className="text-white/80 text-sm flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      12 rue Pasteur 60280 Margny-lès-Compiègne
                      <br />
                      Oise France
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Adresse Bénin */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative">
                Notre siège Afrique
                <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-white" />
              </h4>
              <div className="text-white/80 text-sm flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Lot 2019, Zogbohouè Maison Colonel BOSSOU
                  <br />
                  Emmanuel 071 BP 333, Cotonou Bénin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partie inférieure - Vert/Teal */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/90 text-sm">
              Copyright © {currentYear} imo2tun.
            </p>

            {/* Liens légaux */}
            <div className="flex items-center gap-6">
              <Link
                href="/legal/mentions-legales"
                className="text-white/80 hover:text-white text-sm transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <Link
                href="/legal/politique-confidentialite"
                className="text-white/80 hover:text-white text-sm transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/legal/cgu"
                className="text-white/80 hover:text-white text-sm transition-colors duration-300"
              >
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}