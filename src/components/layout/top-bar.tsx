import { Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="bg-primary-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between text-sm">
        {/* Contact Info */}
        <div className="flex items-center gap-6">
            <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-secondary-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
          </a>
            <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-2 hover:text-secondary-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{SITE_CONFIG.email}</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
            <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
            <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
            <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
            <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}