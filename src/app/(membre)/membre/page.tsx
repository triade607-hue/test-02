"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Gift,
  FileText,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  Download,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const MOCK_USER = {
  firstName: "Jean",
  lastName: "Dupont",
  memberType: "Utilisateur",
  tier: "Sunun",
  tierColor: "#F9A825",
  memberSince: "Janvier 2024",
};

const MOCK_QUOTAS = [
  {
    label: "Demandes d'expertise",
    used: 3,
    total: 5,
    icon: MessageSquare,
    color: "#0077B6",
  },
  {
    label: "Téléchargements",
    used: 7,
    total: 10,
    icon: Download,
    color: "#26A69A",
  },
  {
    label: "Présentations",
    used: 1,
    total: 2,
    icon: Users,
    color: "#F9A825",
  },
];

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
  },
];

const MOCK_ADVANTAGES = [
  {
    label: "50% de rabais sur les événements",
    active: true,
  },
  {
    label: "5 demandes d'expertise/an",
    active: true,
  },
  {
    label: "Accès catégories Sunun et en deçà",
    active: true,
  },
  {
    label: "5 sollicitations projets/an",
    active: true,
  },
  {
    label: "Rabais colloques partenaires",
    active: true,
  },
  {
    label: "2 présentations lors de colloques",
    active: true,
  },
];

const QUICK_ACTIONS = [
  {
    label: "Voir les événements",
    href: "/events",
    icon: Calendar,
    color: "bg-primary-500",
  },
  {
    label: "Demander une expertise",
    href: "/membre/expertise",
    icon: MessageSquare,
    color: "bg-accent-500",
  },
  {
    label: "Bibliothèque",
    href: "/membre/bibliotheque",
    icon: FileText,
    color: "bg-secondary-500",
  },
];

export default function DashboardPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 rounded-md p-6 md:p-8 text-white"
      >
        {/* Cercles décoratifs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-white/10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border-[30px] border-white/10 rounded-full" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bonjour, {MOCK_USER.firstName} ! 👋
              </h1>
              <p className="text-white/80">
                Bienvenue dans votre espace personnel imo2tun
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                <span className="text-sm text-white/80">Membre</span>
                <p className="font-semibold">{MOCK_USER.tier}</p>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-md">
                <span className="text-sm text-white/80">Depuis</span>
                <p className="font-semibold">{MOCK_USER.memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_QUOTAS.map((quota, index) => (
          <motion.div
            key={quota.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-md p-5 border border-neutral-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: `${quota.color}15` }}
              >
                <quota.icon
                  className="w-5 h-5"
                  style={{ color: quota.color }}
                />
              </div>
              <span className="text-sm text-neutral-500">
                {quota.used}/{quota.total}
              </span>
            </div>
            <h3 className="font-medium text-neutral-900 mb-2">{quota.label}</h3>
            {/* Progress bar */}
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(quota.used / quota.total) * 100}%`,
                  backgroundColor: quota.color,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-md border border-neutral-100"
        >
          <div className="flex items-center justify-between p-5 border-b border-neutral-100">
            <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              Mes prochains événements
            </h2>
            <Link
              href="/membre/evenements"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {MOCK_EVENTS.map((event) => (
              <div
                key={event.id}
                className="p-5 flex gap-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-neutral-900 truncate">
                      {event.title}
                    </h3>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-md flex-shrink-0",
                        event.status === "confirmed"
                          ? "bg-accent-100 text-accent-700"
                          : "bg-secondary-100 text-secondary-700"
                      )}
                    >
                      {event.status === "confirmed" ? "Confirmé" : "En attente"}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDate(event.date)} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {MOCK_EVENTS.length === 0 && (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500">Aucun événement à venir</p>
                <Link
                  href="/events"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Découvrir les événements
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column - Advantages & Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-md border border-neutral-100 p-5"
          >
            <h2 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary-500" />
              Actions rapides
            </h2>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-neutral-50 transition-colors group"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md flex items-center justify-center text-white",
                      action.color
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 font-medium text-neutral-700 group-hover:text-neutral-900">
                    {action.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* My Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white rounded-md border border-neutral-100"
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent-500" />
                Mes avantages
              </h2>
              <span
                className="px-2 py-0.5 text-xs font-semibold rounded-md text-white"
                style={{ backgroundColor: MOCK_USER.tierColor }}
              >
                {MOCK_USER.tier}
              </span>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {MOCK_ADVANTAGES.slice(0, 5).map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{advantage.label}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/membre/avantages"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
              >
                Voir tous mes avantages
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Upgrade Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-md p-5 text-white"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 border-[15px] border-white/10 rounded-full" />
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Passez au niveau supérieur</h3>
            <p className="text-white/80 text-sm mb-4">
              Débloquez plus d&apos;avantages avec Mindaho
            </p>
            <Link
              href="/membre/upgrade"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-secondary-600 font-semibold text-sm rounded-md hover:bg-white/90 transition-colors"
            >
              Mettre à niveau
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
