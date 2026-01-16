"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";

// Mock data
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Workshop Intelligence Artificielle",
    date: "2025-02-15",
    time: "09:00 - 17:00",
    location: "Cotonou, Bénin",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    status: "confirmed",
    type: "upcoming",
  },
  {
    id: "2",
    title: "Conférence Fintech Summit",
    date: "2025-03-20",
    time: "14:00 - 18:00",
    location: "En ligne",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&q=80",
    status: "pending",
    type: "upcoming",
  },
  {
    id: "3",
    title: "Meetup Développeurs Afrique",
    date: "2025-01-10",
    time: "18:00 - 21:00",
    location: "Dakar, Sénégal",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
    status: "attended",
    type: "past",
  },
  {
    id: "4",
    title: "Formation Cloud Computing",
    date: "2024-12-05",
    time: "09:00 - 12:00",
    location: "En ligne",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    status: "attended",
    type: "past",
  },
  {
    id: "5",
    title: "Hackathon Innovation",
    date: "2024-11-18",
    time: "08:00 - 20:00",
    location: "Abidjan, Côte d'Ivoire",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    status: "cancelled",
    type: "past",
  },
];

const TABS = [
  { id: "all", label: "Tous" },
  { id: "upcoming", label: "À venir" },
  { id: "past", label: "Passés" },
];

export default function MesEvenementsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmé",
          icon: CheckCircle2,
          className: "bg-accent-100 text-accent-700",
        };
      case "pending":
        return {
          label: "En attente",
          icon: Clock3,
          className: "bg-secondary-100 text-secondary-700",
        };
      case "attended":
        return {
          label: "Participé",
          icon: CheckCircle2,
          className: "bg-primary-100 text-primary-700",
        };
      case "cancelled":
        return {
          label: "Annulé",
          icon: XCircle,
          className: "bg-red-100 text-red-700",
        };
      default:
        return {
          label: status,
          icon: Clock3,
          className: "bg-neutral-100 text-neutral-700",
        };
    }
  };

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesTab = activeTab === "all" || event.type === activeTab;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Mes événements
        </h1>
        <p className="text-neutral-600">
          Gérez vos inscriptions et consultez votre historique
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-md border border-neutral-100 p-4"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredEvents.map((event, index) => {
          const statusConfig = getStatusConfig(event.status);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-md border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-48 h-40 md:h-auto relative flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {/* Status badge mobile */}
                  <div className="md:hidden absolute top-3 left-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md",
                        statusConfig.className
                      )}
                    >
                      <statusConfig.icon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Clock className="w-4 h-4 text-neutral-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <MapPin className="w-4 h-4 text-neutral-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge desktop */}
                    <div className="hidden md:block">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-md",
                          statusConfig.className
                        )}
                      >
                        <statusConfig.icon className="w-4 h-4" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-3">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
                    >
                      Voir détails
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    {event.status === "confirmed" &&
                      event.type === "upcoming" && (
                        <button className="px-4 py-2 border border-neutral-200 text-neutral-600 text-sm font-medium rounded-md hover:bg-neutral-50 transition-colors">
                          Annuler
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-md border border-neutral-100 p-12 text-center">
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-neutral-600 mb-4">
              {activeTab === "upcoming"
                ? "Vous n'avez pas d'événements à venir"
                : activeTab === "past"
                  ? "Vous n'avez pas encore participé à des événements"
                  : "Aucun événement ne correspond à votre recherche"}
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors"
            >
              Découvrir les événements
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
