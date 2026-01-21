"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Components
import { Button } from "@/components/ui";
import {
  HeroHome,
  SectionTitle,
  MissionCard,
  StatsBanner,
  EventCard,
  ArticleCard,
  PartnersSlider,
  TestimonialsSlider,
  CtaSection,
} from "@/components/shared";
import { NewsletterBanner } from "@/components/layout";

// Data
import { missions } from "@/lib/data";

// Hooks API
import { useArticles } from "@/hooks/use-articles";
import { useEvents } from "@/hooks/use-events";

export default function HomePage() {
  // Hook pour les événements
  const {
    events: upcomingEvents,
    isLoading: isLoadingEvents,
    fetchUpcomingEvents,
  } = useEvents();

  // Hook pour les articles
  const {
    articles: latestArticles,
    isLoading: isLoadingArticles,
    fetchLatestArticles,
  } = useArticles();

  // Charger les données au montage
  useEffect(() => {
    fetchUpcomingEvents(3);
    fetchLatestArticles(3);
  }, [fetchUpcomingEvents, fetchLatestArticles]);

  return (
    <>
      {/* HERO SECTION */}
      <HeroHome />

      {/* PARTNERS SLIDER */}
      <PartnersSlider />

      {/* MISSION SECTION */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Notre Mission"
            subtitle="Construire un écosystème vertueux de partage, d'échange et d'innovation dans les métiers du numérique en Afrique."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <MissionCard
                key={index}
                icon={mission.icon}
                title={mission.title}
                description={mission.description}
                link={mission.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <StatsBanner />

      {/* EVENTS SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionTitle
            title="Prochains Événements"
            subtitle="Participez à nos conférences, ateliers et meetups pour développer vos compétences et votre réseau."
          />

          {isLoadingEvents ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          ) : upcomingEvents.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/events">
                  <Button variant="outline">Voir tous les événements</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">
                Aucun événement à venir pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionTitle
            title="Actualités & Insights"
            subtitle="Restez informé des dernières tendances du numérique et des actualités de notre communauté."
          />

          {isLoadingArticles ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">
                Aucun article disponible pour le moment.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/news">
              <Button variant="outline">Toutes les actualités</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSlider />

      {/* CTA SECTION */}
      <CtaSection />

      {/* NEWSLETTER BANNER */}
      <NewsletterBanner />
    </>
  );
}
