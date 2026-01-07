import { NavLink } from "@/types";

export const SITE_CONFIG = {
  name: "imo2tun",
  description: "Construisons ensemble l'écosystème numérique africain",
  url: "https://imo2tun.org",
  email: "info@imo2tun.org",
  phone: "+33 6 32 80 83 16",
  addresses: {
    france: {
      street: "12 rue Pasteur",
      city: "60280 Margny-lès-Compiègne",
      country: "France",
    },
    benin: {
      street: "Lot 2019, Zogbohouè",
      city: "Maison Colonel BOSSOU Emmanuel",
      postal: "071 BP 333, Cotonou",
      country: "Bénin",
    },
  },
  social: {
    facebook: "https://facebook.com/imo2tun",
    instagram: "https://instagram.com/imo2tun",
    linkedin: "https://linkedin.com/company/imo2tun",
    twitter: "https://twitter.com/imo2tun",
  },
};

// Labels en français, URLs en anglais
export const NAV_LINKS: NavLink[] = [
  { label: "À propos", href: "/about" },
  { label: "Membres", href: "/members" },
  { label: "Actualités", href: "/news" },
  { label: "Événements", href: "/events" },
  { label: "Adhérer", href: "/membership" },

];
