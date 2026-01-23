"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Download,
  Loader2,
  AlertCircle,
  Euro,
  Linkedin,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { EventCard } from "@/components/shared/event-card";
import { Button } from "@/components/ui";

// Hooks
import { useEvents } from "@/hooks/use-events";
import { useAuth } from "@/hooks/use-auth";

// Services & API
import { eventsService } from "@/lib/services/events.service";
import { getFileUrl } from "@/lib/utils/image-url";

// Types
import type { EventSpeaker } from "@/types/event.types";

// ============================================
// PAGE COMPONENT
// ============================================

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  // ========== NOUVEAU : State pour le message de feedback ==========
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Hook pour les événements
  const { event, events, isLoading, error, fetchEventBySlug, fetchEvents } =
    useEvents();

  // Charger l'événement au montage
  useEffect(() => {
    if (slug) {
      fetchEventBySlug(slug);
      fetchEvents({ size: 10 }); // Pour les événements similaires
    }
  }, [slug, fetchEventBySlug, fetchEvents]);

  // Gérer l'inscription automatique après login
  useEffect(() => {
    const handlePendingRegistration = async () => {
      const pendingEventId = localStorage.getItem("pendingEventRegistration");
      const action = searchParams.get("action");

      if (
        isAuthenticated &&
        pendingEventId &&
        action === "register" &&
        event &&
        pendingEventId === event.id
      ) {
        // Nettoyer le localStorage
        localStorage.removeItem("pendingEventRegistration");

        // Effectuer l'inscription
        try {
          setIsRegistering(true);
          setFeedbackMessage(null); // Reset message
          const response = await eventsService.registerToEvent(event.id);

          // ✅ Succès
          setFeedbackMessage({
            type: "success",
            text: "Inscription confirmée ! Vous recevrez un email de confirmation.",
          });

          if (response.paymentRedirectUrl) {
            window.location.href = response.paymentRedirectUrl;
          }
        } catch (err: unknown) {
          // ❌ Erreur
          let errorText = "Une erreur est survenue. Veuillez réessayer.";

          if (err && typeof err === "object" && "message" in err) {
            const apiError = err as { message?: string };
            const msg = (apiError.message || "").toLowerCase();

            if (msg.includes("already registered")) {
              errorText = "Vous êtes déjà inscrit à cet événement.";
            } else if (msg.includes("event is full")) {
              errorText = "Cet événement est complet.";
            } else if (msg.includes("registration closed")) {
              errorText = "Les inscriptions sont fermées.";
            } else if (apiError.message) {
              errorText = apiError.message;
            }
          }

          setFeedbackMessage({ type: "error", text: errorText });
        } finally {
          setIsRegistering(false);
        }
      }
    };

    handlePendingRegistration();
  }, [isAuthenticated, event, searchParams]);

  // Événements similaires (même catégorie, exclure l'actuel)
  const similarEvents = events
    .filter(
      (e) =>
        event && e.category.slug === event.category.slug && e.id !== event.id,
    )
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

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle inscription
  const handleRegister = async () => {
    if (!event) return;

    // Reset le message précédent
    setFeedbackMessage(null);

    // Si non connecté → sauvegarder l'intention et rediriger vers login
    if (!isAuthenticated) {
      localStorage.setItem("pendingEventRegistration", event.id);
      router.push(`/login?redirect=/events/${slug}&action=register`);
      return;
    }

    // Si connecté → appeler l'API d'inscription
    try {
      setIsRegistering(true);
      const response = await eventsService.registerToEvent(event.id);

      // ✅ Succès
      setFeedbackMessage({
        type: "success",
        text: "Inscription confirmée ! Vous recevrez un email de confirmation.",
      });

      // Rediriger vers la page de paiement
      if (response.paymentRedirectUrl) {
        window.location.href = response.paymentRedirectUrl;
      }
    } catch (err: unknown) {
      // ❌ Erreur - extraire le message user-friendly
      let errorText = "Une erreur est survenue. Veuillez réessayer.";

      if (err && typeof err === "object" && "message" in err) {
        const apiError = err as { message?: string };
        const msg = (apiError.message || "").toLowerCase();

        if (msg.includes("already registered")) {
          errorText = "Vous êtes déjà inscrit à cet événement.";
        } else if (msg.includes("event is full")) {
          errorText = "Cet événement est complet.";
        } else if (msg.includes("registration closed")) {
          errorText = "Les inscriptions sont fermées.";
        } else if (apiError.message) {
          errorText = apiError.message;
        }
      }

      setFeedbackMessage({ type: "error", text: errorText });
    } finally {
      setIsRegistering(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Événement non trouvé
        </h1>
        <p className="text-neutral-600 mb-6 text-center">
          {error || "Cet événement n'existe pas ou a été supprimé."}
        </p>
        <Link href="/events">
          <Button variant="primary">Retour aux événements</Button>
        </Link>
      </div>
    );
  }

  // URLs complètes avec Base URL
  const bannerUrl = event.banner ? getFileUrl(event.banner) : null;
  const programUrl = event.programUrl ? getFileUrl(event.programUrl) : null;

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
            {/* Sidebar gauche - Infos événement */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Date</p>
                    <p className="font-semibold text-neutral-900">
                      {formatDate(event.startDate)}
                    </p>
                  </div>
                </div>

                {/* Heure */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Horaires</p>
                    <p className="font-semibold text-neutral-900">
                      {formatTime(event.startDate)} -{" "}
                      {formatTime(event.endDate)}
                    </p>
                  </div>
                </div>

                {/* Lieu */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-md flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Lieu</p>
                    <p className="font-semibold text-neutral-900">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Places */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-md flex items-center justify-center">
                    <Users className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Places</p>
                    {/* <p className="font-semibold text-neutral-900">
                      {event.remainingSeats} / {event.maxAttendees} disponibles
                    </p> */}
                    <p className="font-semibold text-neutral-900">
                      {event.maxAttendees} disponibles
                    </p>
                  </div>
                </div>

                {/* Prix */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                    <Euro className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Prix</p>
                    <p className="font-semibold text-neutral-900">
                      {event.basePrice === 0
                        ? "Gratuit"
                        : `${event.basePrice.toLocaleString("fr-FR")} €`}
                    </p>
                  </div>
                </div>

                {/* Séparateur + Bouton inscription */}
                <div className="border-t border-neutral-200 pt-5">
                  {/* ========== NOUVEAU : Message de feedback ========== */}
                  {feedbackMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
                        feedbackMessage.type === "success"
                          ? "bg-accent-50 border border-accent-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      {feedbackMessage.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm font-medium ${
                          feedbackMessage.type === "success"
                            ? "text-accent-700"
                            : "text-red-700"
                        }`}
                      >
                        {feedbackMessage.text}
                      </p>
                    </motion.div>
                  )}

                  {/* Bouton S'inscrire */}
                  {event.upcoming && event.remainingSeats > 0 && (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={handleRegister}
                      disabled={isRegistering}
                    >
                      {isRegistering ? "Inscription en cours..." : "S'inscrire"}
                    </Button>
                  )}

                  {/* Complet */}
                  {event.upcoming && event.remainingSeats === 0 && (
                    <div className="w-full py-2.5 bg-neutral-200 text-neutral-600 text-center rounded-md font-medium">
                      Complet
                    </div>
                  )}

                  {/* Événement passé */}
                  {event.past && (
                    <div className="w-full py-2.5 bg-neutral-200 text-neutral-600 text-center rounded-md font-medium">
                      Événement terminé
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Image bannière */}
              {bannerUrl && (
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={bannerUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Badges catégorie et format */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                  {event.category.name}
                </span>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-full">
                  {event.format === "PHYSICAL"
                    ? "Présentiel"
                    : event.format === "ONLINE"
                      ? "En ligne"
                      : "Hybride"}
                </span>
              </div>

              {/* Titre */}
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                {event.title}
              </h1>

              {/* Description */}
              <section className="mb-8">
                <div
                  className="prose prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </section>

              {/* Bouton Télécharger le programme - Dans le corps après description */}
              {programUrl && (
                <section className="mb-12">
                  <Button
                    variant="primary"
                    onClick={() => window.open(programUrl, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le programme
                  </Button>
                </section>
              )}

              {/* Les Intervenants */}
              {event.allSpeakers && event.allSpeakers.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6 text-left">
                    Les Intervenants
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {event.allSpeakers.map((speaker: EventSpeaker) => (
                      <motion.div
                        key={speaker.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="relative w-24 h-24 mx-auto mb-3">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-secondary-500">
                            {speaker.photo ? (
                              <Image
                                src={getFileUrl(speaker.photo)}
                                alt={`${speaker.firstName} ${speaker.lastName}`}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                                {speaker.firstName[0]}
                                {speaker.lastName[0]}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="font-semibold text-neutral-900">
                          {speaker.firstName} {speaker.lastName}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {speaker.title}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {speaker.company}
                        </p>
                        {speaker.linkedinUrl && (
                          <a
                            href={speaker.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs text-primary-600 hover:underline"
                          >
                            <Linkedin className="w-3 h-3" />
                            LinkedIn
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
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
    </>
  );
}
