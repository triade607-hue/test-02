"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
  ChevronDown,
  X,
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
  { value: "all", label: "Tous les membres", icon: Users },
  { value: "Offreur", label: "Offreurs", icon: Building2 },
  { value: "Utilisateur", label: "Utilisateurs", icon: Building2 },
  { value: "Contributeur", label: "Contributeurs", icon: User },
  { value: "Partenaire", label: "Partenaires", icon: Handshake },
];

const TIERS: { value: Tier | "all"; label: string; color: string }[] = [
  { value: "all", label: "Tous les tiers", color: "#6B7280" },
  { value: "Asuka", label: "Asuka", color: "#26A69A" },
  { value: "Sunun", label: "Sunun", color: "#F9A825" },
  { value: "Mindaho", label: "Mindaho", color: "#0077B6" },
  { value: "Dah", label: "Dah", color: "#7C3AED" },
];

const TIER_COLORS: Record<Tier, string> = {
  Asuka: "#26A69A",
  Sunun: "#F9A825",
  Mindaho: "#0077B6",
  Dah: "#7C3AED",
};

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

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "all" || member.type === selectedType;
      const matchesTier =
        selectedTier === "all" || member.tier === selectedTier;
      return matchesSearch && matchesType && matchesTier;
    });
  }, [searchQuery, selectedType, selectedTier]);

  const memberCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_MEMBERS.length };
    MOCK_MEMBERS.forEach((member) => {
      counts[member.type] = (counts[member.type] || 0) + 1;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedTier("all");
  };

  const hasActiveFilters =
    searchQuery || selectedType !== "all" || selectedTier !== "all";

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Nos Membres"
        subtitle="Découvrez l'écosystème imo2tun"
        backgroundImage="/images/hero-bg.png"
      />

      <main className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {MEMBER_TYPES.slice(1).map((type) => (
              <div
                key={type.value}
                className="bg-white rounded-md p-4 border border-neutral-100"
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: `${TYPE_COLORS[type.value as MemberType]}15`,
                  }}
                >
                  <type.icon
                    className="w-5 h-5"
                    style={{ color: TYPE_COLORS[type.value as MemberType] }}
                  />
                </div>
                <p className="text-2xl font-bold text-neutral-900">
                  {memberCounts[type.value] || 0}
                </p>
                <p className="text-sm text-neutral-500">{type.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-md border border-neutral-100 p-4 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher un membre, secteur, localisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value as MemberType | "all")
                  }
                  className="appearance-none pl-4 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer min-w-[180px]"
                >
                  {MEMBER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Tier Filter */}
              <div className="relative">
                <select
                  value={selectedTier}
                  onChange={(e) =>
                    setSelectedTier(e.target.value as Tier | "all")
                  }
                  className="appearance-none pl-4 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer min-w-[150px]"
                >
                  {TIERS.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Effacer
                </button>
              )}
            </div>

            {/* Active filters tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-100">
                <span className="text-sm text-neutral-500">
                  Filtres actifs :
                </span>
                {selectedType !== "all" && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md text-white"
                    style={{ backgroundColor: TYPE_COLORS[selectedType] }}
                  >
                    {MEMBER_TYPES.find((t) => t.value === selectedType)?.label}
                    <button onClick={() => setSelectedType("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTier !== "all" && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md text-white"
                    style={{ backgroundColor: TIER_COLORS[selectedTier] }}
                  >
                    {selectedTier}
                    <button onClick={() => setSelectedTier("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-neutral-200 text-neutral-700">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-sm text-neutral-600">
              <span className="font-semibold text-neutral-900">
                {filteredMembers.length}
              </span>{" "}
              {filteredMembers.length > 1 ? "membres trouvés" : "membre trouvé"}
            </p>
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-md border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Header with image/logo */}
                <div className="relative h-32 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                  {member.type === "Contributeur" && member.avatar ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : member.logo ? (
                    <div className="relative w-24 h-16">
                      <Image
                        src={member.logo}
                        alt={member.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: `${TYPE_COLORS[member.type]}15`,
                      }}
                    >
                      <Building2
                        className="w-8 h-8"
                        style={{ color: TYPE_COLORS[member.type] }}
                      />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-md text-white"
                      style={{ backgroundColor: TYPE_COLORS[member.type] }}
                    >
                      {member.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-2 py-0.5 text-xs font-semibold rounded-md text-white"
                      style={{ backgroundColor: TIER_COLORS[member.tier] }}
                    >
                      {member.tier}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                    {member.description}
                  </p>

                  {/* Sector or Expertise */}
                  {member.sector && (
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md">
                        {member.sector}
                      </span>
                    </div>
                  )}

                  {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.expertise.slice(0, 3).map((exp, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-md"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Site web
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-[#0077B5] text-white rounded-md hover:bg-[#006399] transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {!member.website && !member.linkedin && (
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-neutral-200 text-neutral-600 text-sm font-medium rounded-md hover:bg-neutral-50 transition-colors">
                        Voir le profil
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-md border border-neutral-100 p-12 text-center"
            >
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
            </motion.div>
          )}

          {/* CTA Join */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 rounded-md p-8 md:p-12 text-white text-center"
          >
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
                href="/adherer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-white/90 transition-colors"
              >
                Devenir membre
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
