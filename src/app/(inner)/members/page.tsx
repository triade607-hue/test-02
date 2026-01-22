"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Building2,
  Users,
  MapPin,
  ChevronRight,
  Globe,
  Linkedin,
  Clock,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";

// Data
import {
  members,
  MEMBER_TYPES,
  TIERS,
  TYPE_COLORS,
  type MemberType,
  type Tier,
} from "@/lib/data/members";

export default function MembresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MemberType | "all">("all");
  const [selectedTier, setSelectedTier] = useState<Tier | "all">("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  // Extraire la liste unique des pays
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(members.map((m) => m.country))];
    return uniqueCountries.sort((a, b) => a.localeCompare(b, "fr"));
  }, []);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.expertise?.some((exp) =>
          exp.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesType =
        selectedType === "all" || member.type === selectedType;
      const matchesTier =
        selectedTier === "all" || member.tier === selectedTier;
      const matchesCountry =
        selectedCountry === "all" || member.country === selectedCountry;
      return matchesSearch && matchesType && matchesTier && matchesCountry;
    });
  }, [searchQuery, selectedType, selectedTier, selectedCountry]);

  // Stats
  const stats = useMemo(() => {
    const activeMembers = members.filter((m) => !m.isProspect);
    return {
      total: activeMembers.length,
      offreurs: activeMembers.filter((m) => m.type === "Offreur").length,
      utilisateurs: activeMembers.filter((m) => m.type === "Utilisateur")
        .length,
      contributeurs: activeMembers.filter((m) => m.type === "Contributeur")
        .length,
      partenaires: activeMembers.filter((m) => m.type === "Partenaire").length,
      prospects: members.filter((m) => m.isProspect).length,
    };
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedTier("all");
    setSelectedCountry("all");
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
              <div className="flex items-center gap-4 text-sm flex-wrap">
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

              {/* Country Filter */}
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="appearance-none w-full sm:w-44 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">Tous les pays</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
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
                        {/* Badge Prospect "Bientôt membre" */}
                        {member.isProspect && (
                          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
                            <Clock className="w-3 h-3" />
                            <span>Bientôt membre</span>
                          </div>
                        )}

                        {/* Zone Logo */}
                        <div className="aspect-[4/3] flex items-center justify-center p-6 bg-white relative">
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
                            {member.type === "Contributeur" &&
                            member.linkedin ? (
                              <a
                                href={`https://linkedin.com/in/${member.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white text-[#0077B5] text-sm sm:text-xs font-medium rounded-md hover:bg-white/90 transition-colors"
                              >
                                <Linkedin className="w-5 h-5 sm:w-4 sm:h-4" />
                                Voir le profil
                              </a>
                            ) : member.website && member.website !== "#" ? (
                              <a
                                href={member.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white text-neutral-800 text-sm sm:text-xs font-medium rounded-md hover:bg-white/90 transition-colors"
                              >
                                <Globe className="w-5 h-5 sm:w-4 sm:h-4" />
                                Visiter le site
                              </a>
                            ) : member.isProspect ? (
                              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white/20 text-white text-sm sm:text-xs font-medium rounded-md cursor-default">
                                <Clock className="w-5 h-5 sm:w-4 sm:h-4" />
                                Adhésion en cours
                              </div>
                            ) : (
                              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2 bg-white/20 text-white text-sm sm:text-xs font-medium rounded-md cursor-default">
                                <Globe className="w-5 h-5 sm:w-4 sm:h-4" />
                                Site non disponible
                              </div>
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Styles pour l'effet flip 3D */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
