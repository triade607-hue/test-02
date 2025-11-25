import { Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="bg-[#007DC5] text-white py-2.5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between text-sm">
        {/* Contact Info - Left */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
          </a>

          <span className="hidden md:block text-white/50">|</span>
          <a

            href={`mailto:${SITE_CONFIG.email}`}
            className="hidden md:flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{SITE_CONFIG.email}</span>
          </a>
        </div>

        {/* Social Links - Right */}
        <div className="flex items-center gap-4">
          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}