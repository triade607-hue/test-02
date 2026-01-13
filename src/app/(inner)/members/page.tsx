"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Building2,
  User,
  Users,
  Handshake,
  MapPin,
  ExternalLink,
  ChevronRight,
  Globe,
  Linkedin,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";

// Types
type MemberType = "Offreur" | "Utilisateur" | "Contributeur" | "Partenaire";
type Tier = "Asuka" | "Sunun" | "Mindaho" | "Dah";

interface Member {
  id: string;
  name: string;
  type: MemberType;
  tier: Tier;
  logo?: string;
  avatar?: string;
  description: string;
  location: string;
  sector?: string;
  expertise?: string[];
  website?: string;
  linkedin?: string;
}

// Mock data
const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Microsoft Afrique",
    type: "Offreur",
    tier: "Dah",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    description:
      "Leader mondial des solutions cloud et logicielles pour entreprises.",
    location: "Lagos, Nigeria",
    sector: "Technologies",
    website: "https://microsoft.com",
    linkedin: "microsoft",
  },
  {
    id: "2",
    name: "AWS West Africa",
    type: "Offreur",
    tier: "Mindaho",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
    description: "Services cloud et infrastructure pour l'Afrique de l'Ouest.",
    location: "Accra, Ghana",
    sector: "Cloud Computing",
    website: "https://aws.amazon.com",
  },
  {
    id: "3",
    name: "Africa Valley",
    type: "Offreur",
    tier: "Sunun",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
    description:
      "Écosystème d'innovation technologique pour startups africaines.",
    location: "Cotonou, Bénin",
    sector: "Innovation",
  },
  {
    id: "4",
    name: "NSIA Banque",
    type: "Utilisateur",
    tier: "Mindaho",
    logo: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=200&q=80",
    description:
      "Groupe bancaire panafricain en pleine transformation digitale.",
    location: "Abidjan, Côte d'Ivoire",
    sector: "Banque & Finance",
  },
  {
    id: "5",
    name: "SONEB",
    type: "Utilisateur",
    tier: "Sunun",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80",
    description: "Société nationale des eaux du Bénin.",
    location: "Cotonou, Bénin",
    sector: "Services publics",
  },
  {
    id: "6",
    name: "ECOBANK",
    type: "Utilisateur",
    tier: "Dah",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80",
    description: "Banque panafricaine leader de l'innovation financière.",
    location: "Lomé, Togo",
    sector: "Banque & Finance",
  },
  {
    id: "7",
    name: "Jean-Paul AKOUEGNON",
    type: "Contributeur",
    tier: "Mindaho",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    description: "Expert Cloud & DevOps avec 15 ans d'expérience.",
    location: "Paris, France",
    expertise: ["Cloud Computing", "DevOps", "Architecture"],
  },
  {
    id: "8",
    name: "Marie DOSSOU",
    type: "Contributeur",
    tier: "Sunun",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    description: "Consultante en transformation digitale et IA.",
    location: "Cotonou, Bénin",
    expertise: ["IA", "Data Science", "Stratégie digitale"],
    linkedin: "marie-dossou",
  },
  {
    id: "9",
    name: "Koffi MENSAH",
    type: "Contributeur",
    tier: "Asuka",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    description: "Développeur Full Stack et formateur.",
    location: "Accra, Ghana",
    expertise: ["React", "Node.js", "Formation"],
  },
  {
    id: "10",
    name: "Sèmè City",
    type: "Partenaire",
    tier: "Dah",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
    description: "Cité internationale de l'innovation et du savoir.",
    location: "Ouidah, Bénin",
    sector: "Éducation & Innovation",
    website: "https://semecity.bj",
  },
  {
    id: "11",
    name: "Fondation Bill & Melinda Gates",
    type: "Partenaire",
    tier: "Dah",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&q=80",
    description: "Fondation philanthropique soutenant l'innovation en Afrique.",
    location: "Seattle, USA",
    sector: "Philanthropie",
  },
  {
    id: "12",
    name: "ISACA Bénin",
    type: "Partenaire",
    tier: "Mindaho",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
    description: "Association professionnelle pour la gouvernance IT.",
    location: "Cotonou, Bénin",
    sector: "Association professionnelle",
  },
];

const MEMBER_TYPES: {
  value: MemberType | "all";
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "all", label: "Tous", icon: Users },
  { value: "Offreur", label: "Offreurs", icon: Building2 },
  { value: "Utilisateur", label: "Utilisateurs", icon: Building2 },
  { value: "Contributeur", label: "Contributeurs", icon: User },
  { value: "Partenaire", label: "Partenaires", icon: Handshake },
];

const TIERS: { value: Tier | "all"; label: string }[] = [
  { value: "all", label: "Tous les tiers" },
  { value: "Asuka", label: "Asuka" },
  { value: "Sunun", label: "Sunun" },
  { value: "Mindaho", label: "Mindaho" },
  { value: "Dah", label: "Dah" },
];

const TYPE_COLORS: Record<MemberType, string> = {
  Offreur: "#0077B6",
  Utilisateur: "#26A69A",
  Contributeur: "#F9A825",
  Partenaire: "#7C3AED",
};

export default function MembresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MemberType | "all">("all");
  const [selectedTier, setSelectedTier] = useState<Tier | "all">("all");

  // Filtered members
  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.expertise?.some((exp) =>
          exp.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesType =
        selectedType === "all" || member.type === selectedType;
      const matchesTier =
        selectedTier === "all" || member.tier === selectedTier;
      return matchesSearch && matchesType && matchesTier;
    });
  }, [searchQuery, selectedType, selectedTier]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: MOCK_MEMBERS.length,
      offreurs: MOCK_MEMBERS.filter((m) => m.type === "Offreur").length,
      utilisateurs: MOCK_MEMBERS.filter((m) => m.type === "Utilisateur").length,
      contributeurs: MOCK_MEMBERS.filter((m) => m.type === "Contributeur")
        .length,
      partenaires: MOCK_MEMBERS.filter((m) => m.type === "Partenaire").length,
    };
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedTier("all");
  };

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Nos Membres"
        subtitle="Découvrez les acteurs de l'écosystème numérique africain"
        backgroundImage="/images/hero-bg.png"
      />

      {/* Main Content */}
      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb + Stats + Search - Single Line */}
        <div className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left: Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
                <span className="text-secondary-500 font-medium">Membres</span>
              </nav>

              {/* Center: Stats inline */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-500">
                  <span className="font-semibold text-neutral-900">
                    {stats.total}
                  </span>{" "}
                  membres
                </span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="hidden sm:inline text-neutral-500">
                  <span className="font-semibold text-[#0077B6]">
                    {stats.offreurs}
                  </span>{" "}
                  offreurs
                </span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="hidden sm:inline text-neutral-500">
                  <span className="font-semibold text-[#26A69A]">
                    {stats.utilisateurs}
                  </span>{" "}
                  utilisateurs
                </span>
                <span className="hidden md:inline text-neutral-300">|</span>
                <span className="hidden md:inline text-neutral-500">
                  <span className="font-semibold text-[#F9A825]">
                    {stats.contributeurs}
                  </span>{" "}
                  contributeurs
                </span>
                <span className="hidden md:inline text-neutral-300">|</span>
                <span className="hidden md:inline text-neutral-500">
                  <span className="font-semibold text-[#7C3AED]">
                    {stats.partenaires}
                  </span>{" "}
                  partenaires
                </span>
              </div>

              {/* Right: Search */}
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-64 pl-4 pr-10 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-50 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6">
            <p className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wide">
              Filtrer
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value as MemberType | "all")
                  }
                  className="appearance-none w-full sm:w-44 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  {MEMBER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>

              {/* Tier Filter */}
              <div className="relative">
                <select
                  value={selectedTier}
                  onChange={(e) =>
                    setSelectedTier(e.target.value as Tier | "all")
                  }
                  className="appearance-none w-full sm:w-44 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  {TIERS.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>

              {/* Results count */}
              <div className="ml-auto text-sm text-neutral-600">
                <span className="font-semibold text-neutral-900">
                  {filteredMembers.length}
                </span>{" "}
                {filteredMembers.length > 1 ? "résultats" : "résultat"}
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            {filteredMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="group perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                      {/* Front - Logo + Nom */}
                      <div className="backface-hidden bg-white rounded-md border border-neutral-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                        {/* Zone Logo */}
                        <div className="aspect-[4/3] flex items-center justify-center p-6 bg-white">
                          {member.type === "Contributeur" && member.avatar ? (
                            <div className="relative w-28 h-28 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-neutral-100">
                              <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : member.logo ? (
                            <div className="relative w-full h-full max-h-28 sm:max-h-24">
                              <Image
                                src={member.logo}
                                alt={member.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div
                              className="w-24 h-24 sm:w-20 sm:h-20 rounded-md flex items-center justify-center"
                              style={{
                                backgroundColor: `${TYPE_COLORS[member.type]}10`,
                              }}
                            >
                              <Building2
                                className="w-12 h-12 sm:w-10 sm:h-10"
                                style={{ color: TYPE_COLORS[member.type] }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Nom */}
                        <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50">
                          <h3 className="font-semibold text-neutral-800 text-center text-sm sm:text-xs md:text-sm uppercase tracking-wide line-clamp-1">
                            {member.name}
                          </h3>
                        </div>
                      </div>

                      {/* Back - Informations */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div
                          className="w-full h-full rounded-md p-5 sm:p-4 flex flex-col text-white"
                          style={{ backgroundColor: TYPE_COLORS[member.type] }}
                        >
                          {/* Header */}
                          <h3 className="font-bold text-base sm:text-sm line-clamp-2 mb-2">
                            {member.name}
                          </h3>

                          {/* Badge type */}
                          <span className="inline-block self-start px-2 py-0.5 bg-white/20 text-white text-xs sm:text-[10px] font-medium rounded mb-2">
                            {member.type}
                          </span>

                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-white/80 text-sm sm:text-xs mb-3 sm:mb-2">
                            <MapPin className="w-4 h-4 sm:w-3 sm:h-3 flex-shrink-0" />
                            <span className="truncate">{member.location}</span>
                          </div>

                          {/* Description */}
                          <p className="text-white/90 text-sm sm:text-xs line-clamp-4 sm:line-clamp-3 mb-auto">
                            {member.description}
                          </p>

                          {/* Sector/Expertise */}
                          {member.sector && (
                            <span className="inline-block self-start px-2 py-1 bg-white/20 text-white text-xs sm:text-[10px] rounded mt-2 mb-2">
                              {member.sector}
                            </span>
                          )}
                          {member.expertise && member.expertise.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-1 mt-2 mb-2">
                              {member.expertise.slice(0, 3).map((exp, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 sm:py-0.5 bg-white/20 text-white text-xs sm:text-[10px] rounded"
                                >
                                  {exp}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* CTA */}
                          <div className="mt-3">
                            {member.type === "Contributeur" ? (
                              <a
                                href={
                                  member.linkedin
                                    ? `https://linkedin.com/in/${member.linkedin}`
                                    : "#"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white text-[#0077B5] text-sm sm:text-xs font-medium rounded-md hover:bg-white/90 transition-colors"
                              >
                                <Linkedin className="w-5 h-5 sm:w-4 sm:h-4" />
                                Voir le profil
                              </a>
                            ) : (
                              <a
                                href={member.website || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white text-neutral-800 text-sm sm:text-xs font-medium rounded-md hover:bg-white/90 transition-colors"
                              >
                                <Globe className="w-5 h-5 sm:w-4 sm:h-4" />
                                Visiter le site
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-md border border-neutral-100 p-12 text-center">
                <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Aucun membre trouvé
                </h3>
                <p className="text-neutral-600 mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* CTA Join */}
            <div className="mt-16 relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 rounded-md p-8 md:p-12 text-white text-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-white/10 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 border-[30px] border-white/10 rounded-full" />

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Rejoignez la communauté imo2tun
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-6">
                  Faites partie de l&apos;écosystème numérique africain et
                  bénéficiez d&apos;avantages exclusifs selon votre profil.
                </p>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-white/90 transition-colors"
                >
                  Devenir membre
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
