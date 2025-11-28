"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  CalendarPlus,
  ChevronDown,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { EventCard } from "@/components/shared/event-card";
import { EventRegistrationModal } from "@/components/shared/event-registration-modal";
import { Button } from "@/components/ui";

// Data
import { events } from "@/lib/data";

// Types
import { Speaker, ScheduleItem } from "@/types";

// ============================================
// DONNÉES STATIQUES POUR LA DÉMO
// ============================================

const DEMO_SPEAKERS: Speaker[] = [
  {
    id: "1",
    name: "Anne DOE",
    role: "Senior Developer",
    company: "Tech Corp",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "2",
    name: "Jean DUPONT",
    role: "Data Scientist",
    company: "Data Inc",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: "3",
    name: "Marie CLAIRE",
    role: "UX Designer",
    company: "Design Studio",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: "4",
    name: "Paul MARTIN",
    role: "Cloud Architect",
    company: "Cloud Solutions",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
];

const DEMO_SCHEDULE: ScheduleItem[] = [
  {
    id: "1",
    time: "08:00",
    endTime: "08:45",
    title: "Petit déjeuner",
    description:
      "Accueil des participants avec café, thé et viennoiseries. Moment de networking informel.",
    type: "break",
  },
  {
    id: "2",
    time: "09:00",
    endTime: "10:00",
    title: "Atelier",
    description:
      "Somos uma empresa orgulhosamente mineira, que desde 2006 atua exclusivamente no segmento de sistema de gestão escolar. Somos uma empresa orgulhosamente mineira, que desde 2006 atua exclusivamente no segmento de sistema de gestão escolar.",
    type: "workshop",
    speakers: DEMO_SPEAKERS.slice(0, 3),
  },
  {
    id: "3",
    time: "10:00",
    endTime: "10:45",
    title: "Atelier",
    description:
      "Session pratique sur les outils et méthodologies modernes de développement.",
    type: "workshop",
  },
  {
    id: "4",
    time: "11:00",
    endTime: "12:00",
    title: "Atelier",
    description:
      "Approfondissement des concepts avec exercices pratiques en groupe.",
    type: "workshop",
  },
  {
    id: "5",
    time: "12:00",
    endTime: "13:30",
    title: "Pause déjeuner",
    description:
      "Déjeuner offert sur place. Opportunité de networking avec les intervenants.",
    type: "break",
  },
  {
    id: "6",
    time: "14:00",
    endTime: "15:00",
    title: "Conférence",
    description:
      "Présentation des dernières tendances et innovations du secteur par nos experts.",
    type: "conference",
  },
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [openScheduleId, setOpenScheduleId] = useState<string | null>("2");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trouver l'événement par slug
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // Événements similaires (même catégorie, exclure l'actuel)
  const similarEvents = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Hero avec titre de l'événement */}
      <HeroSecondary
        title={event.title}
        backgroundImage="/images/hero-bg.png"
      />

      {/* Breadcrumb + Partager */}
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
              <Link
                href="/events"
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Événements
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-secondary-500 font-medium">Détails</span>
            </nav>

            {/* Partager */}
            <button className="flex items-center gap-2 text-secondary-500 hover:text-secondary-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Partager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sidebar gauche - Infos événement (sans carte) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-neutral-800 font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>

                {/* Heure */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-neutral-800 font-medium">
                    {event.time}
                  </span>
                </div>

                {/* Lieu */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-neutral-800 font-medium pt-2.5">
                    {event.location}
                  </span>
                </div>

                {/* Places */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-neutral-800 font-medium">
                    50 places
                  </span>
                </div>

                {/* Prix */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-md flex items-center justify-center">
                    <span className="text-accent-600 font-bold text-lg">€</span>
                  </div>
                  <span className="text-accent-600 font-bold text-lg">
                    Gratuit
                  </span>
                </div>

                {/* Séparateur */}
                <div className="border-neutral-200 pt-5 mt-2">
                  {/* Bouton S'inscrire */}
                  {event.status === "upcoming" && (
                    <Button
                      variant="primary"
                      className="w-full mb-3"
                      onClick={() => setIsModalOpen(true)}
                    >
                      S&apos;inscrire
                    </Button>
                  )}

                  {/* Ajouter au calendrier */}
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-neutral-200 rounded-md text-sm font-medium text-neutral-700 hover:bg-white hover:border-neutral-300 transition-colors">
                    <CalendarPlus className="w-4 h-4" />
                    Ajouter au calendrier
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Titre et description */}
              <section className="mb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                  {event.title}
                </h1>
                <div className="prose prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed">
                    {event.description}
                  </p>
                  <p className="text-neutral-600 leading-relaxed mt-4">
                    Somos uma empresa orgulhosamente mineira, que desde 2006
                    atua exclusivamente no segmento de sistema de gestão
                    escolar. Somos uma empresa orgulhosamente mineira, que desde
                    2006 atua exclusivamente no segmento de sistema de gestão
                    escolar. Somos uma empresa orgulhosamente mineira, que desde
                    2006 atua exclusivamente no segmento de sistema de gestão
                    escolar.
                  </p>
                  <p className="text-neutral-600 leading-relaxed mt-4">
                    Somos uma empresa orgulhosamente mineira, que desde 2006
                    atua exclusivamente no segmento de sistema de gestão
                    escolar. Somos uma empresa orgulhosamente mineira, que desde
                    2006 atua exclusivamente no segmento de sistema de gestão
                    escolar.
                  </p>
                </div>
              </section>

              {/* Programme de l'événement - Tous en dropdown */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
                  Programme de l&apos;événement
                </h2>
                <div className="space-y-3">
                  {DEMO_SCHEDULE.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-md border border-neutral-100 overflow-hidden"
                    >
                      {/* Header du dropdown */}
                      <button
                        onClick={() =>
                          setOpenScheduleId(
                            openScheduleId === item.id ? null : item.id
                          )
                        }
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Clock className="w-4 h-4" />
                            <span>
                              {item.time} - {item.endTime}
                            </span>
                          </div>
                          <span
                            className={`font-semibold ${
                              item.type === "break"
                                ? "text-neutral-600"
                                : "text-secondary-500"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                            openScheduleId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Contenu expandable */}
                      <AnimatePresence>
                        {openScheduleId === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 py-4 border-t border-neutral-100">
                              <p className="text-neutral-600 text-sm leading-relaxed">
                                {item.description}
                              </p>

                              {/* Speakers */}
                              {item.speakers && item.speakers.length > 0 && (
                                <div className="mt-5">
                                  <p className="text-secondary-500 font-semibold text-sm mb-4">
                                    Speaker
                                  </p>
                                  <div className="flex flex-wrap gap-6">
                                    {item.speakers.map((speaker) => (
                                      <div
                                        key={speaker.id}
                                        className="flex flex-col items-center"
                                      >
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary-500 mb-2">
                                          <Image
                                            src={speaker.avatar}
                                            alt={speaker.name}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <span className="text-xs font-medium text-neutral-900">
                                          {speaker.name.split(" ")[0]}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                          {speaker.role}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Les Intervenants */}
              <section className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6 text-left">
                  Les Intervenants
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {DEMO_SPEAKERS.map((speaker) => (
                    <motion.div
                      key={speaker.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-3">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-secondary-500">
                          <Image
                            src={speaker.avatar}
                            alt={speaker.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-neutral-900">
                        {speaker.name}
                      </h3>
                      <p className="text-sm text-neutral-500">{speaker.role}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Événements similaires */}
          {similarEvents.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 text-center">
                Événements similaires
              </h2>
              <div className="w-16 h-1 bg-secondary-500 mx-auto rounded-full mb-8" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarEvents.map((evt, index) => (
                  <EventCard key={evt.id} event={evt} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Modal d'inscription */}
      <EventRegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
