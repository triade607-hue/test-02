"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { EventCard } from "@/components/shared/event-card";

// Data
import { events } from "@/lib/data";

// Constants
const EVENTS_PER_PAGE = 9;
const EVENT_TYPES = [
  "Tous",
  "Conférence",
  "Formation",
  "Meetup",
  "Workshop",
  "Hackathon",
];
const EVENT_CATEGORIES = [
  "Toutes",
  "Tech",
  "Cloud",
  "Data",
  "IA",
  "Cybersécurité",
  "Design",
];
const EVENT_LOCATIONS = ["Tous", "Cotonou", "Paris", "En ligne"];

export default function EventsPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedLocation, setSelectedLocation] = useState("Tous");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType =
        selectedType === "Tous" || event.category === selectedType;

      // Category filter (using category field for demo)
      const matchesCategory =
        selectedCategory === "Toutes" || event.category === selectedCategory;

      // Location filter
      const matchesLocation =
        selectedLocation === "Tous" ||
        event.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesType && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedCategory, selectedLocation]);

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Nos Événements"
        subtitle="Participez à nos rencontres"
        backgroundImage="/images/hero-bg.png"
      />

      {/* Main Content */}
      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb + Search Bar */}
        <div className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
                <span className="text-secondary-500 font-medium">
                  Événements
                </span>
              </nav>

              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={searchQuery}
                  onChange={(e) =>
                    handleFilterChange(setSearchQuery, e.target.value)
                  }
                  className="w-full sm:w-64 pl-4 pr-10 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
              {/* Type Filter */}
              <div className="relative col-span-1">
                <select
                  value={selectedType}
                  onChange={(e) =>
                    handleFilterChange(setSelectedType, e.target.value)
                  }
                  className="appearance-none w-full sm:w-40 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type === "Tous" ? "Type" : type}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>

              {/* Category Filter */}
              <div className="relative col-span-1">
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    handleFilterChange(setSelectedCategory, e.target.value)
                  }
                  className="appearance-none w-full sm:w-48 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "Toutes" ? "Catégorie" : cat}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>

              {/* Location Filter */}
              <div className="relative col-span-1">
                <select
                  value={selectedLocation}
                  onChange={(e) =>
                    handleFilterChange(setSelectedLocation, e.target.value)
                  }
                  className="appearance-none w-full sm:w-40 px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                >
                  {EVENT_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "Tous" ? "Lieu" : loc}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            {paginatedEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg">
                  Aucun événement trouvé pour ces critères.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("Tous");
                    setSelectedCategory("Toutes");
                    setSelectedLocation("Tous");
                  }}
                  className="mt-4 text-primary-600 font-medium hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    disabled={page === "..."}
                    className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-secondary-500 text-white"
                        : page === "..."
                          ? "bg-transparent text-neutral-400 cursor-default"
                          : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
