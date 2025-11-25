import { GraduationCap, Users, Lightbulb } from "lucide-react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui";
import {
  HeroHome,
  SectionTitle,
  MissionCard,
  StatsBanner,
  EventCard,
  ArticleCard,
  TestimonialCard,
  PartnersSlider,
  CtaSection,
} from "@/components/shared";
import { NewsletterBanner } from "@/components/layout";

// Data
import { events, articles, partners, testimonials } from "@/lib/data";

// Static data for missions
const missions = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Former les talents",
    description:
      "Nous formons les jeunes africains aux métiers du numérique : Cloud, Data, IA, Cybersécurité. Des programmes adaptés aux besoins du marché.",
    link: "/about",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Connecter les acteurs",
    description:
      "Nous créons des ponts entre experts, entreprises et talents pour favoriser le partage de connaissances et les opportunités professionnelles.",
    link: "/membership",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innover ensemble",
    description:
      "Nous accompagnons l'innovation africaine en mettant en relation startups, mentors et investisseurs pour des projets à impact.",
    link: "/about",
  },
];

// Static data for stats
const stats = [
  { value: "500+", label: "Membres" },
  { value: "50+", label: "Experts" },
  { value: "20+", label: "Formations" },
  { value: "10+", label: "Partenaires" },
];

export default function HomePage() {
  // Get upcoming events (max 3)
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  // Get latest articles (max 3)
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <HeroHome />

      {/* ============================================ */}
      {/* PARTNERS SLIDER */}
      {/* ============================================ */}
      <PartnersSlider partners={partners} />

      {/* ============================================ */}
      {/* MISSION SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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

      {/* ============================================ */}
      {/* STATS BANNER */}
      {/* ============================================ */}
      <StatsBanner stats={stats} />

      {/* ============================================ */}
      {/* EVENTS SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionTitle
            title="Prochains Événements"
            subtitle="Participez à nos conférences, ateliers et meetups pour développer vos compétences et votre réseau."
          />

          {upcomingEvents.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant={index === 0 ? "featured" : "default"}
                    index={index}
                  />
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

      {/* ============================================ */}
      {/* ARTICLES SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionTitle
            title="Actualités & Insights"
            subtitle="Restez informé des dernières tendances du numérique et des actualités de notre communauté."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/news">
              <Button variant="outline">Toutes les actualités</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionTitle
            title="Ils parlent de nous"
            subtitle="Découvrez les témoignages de nos membres et partenaires."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <CtaSection
        title="Prêt à rejoindre l'aventure ?"
        description="Rejoignez notre communauté de passionnés du numérique et participez à la construction de l'écosystème tech africain. Ensemble, formons les talents de demain."
        buttonText="Devenir Membre Maintenant"
        buttonLink="/membership"
        image="/images/cta-image.jpg"
      />

      {/* ============================================ */}
      {/* NEWSLETTER BANNER */}
      {/* ============================================ */}
      <NewsletterBanner />
    </>
  );
}
