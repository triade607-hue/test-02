"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { SectionTitle } from "@/components/shared/section-title";
import { ValueCard } from "@/components/shared/value-card";
import { TeamSlider } from "@/components/shared/team-slider";
import { PartnersSlider } from "@/components/shared/partners-slider";
import { Button } from "@/components/ui";

// Data
import { values } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="À propos d'imo2tun"
        backgroundImage="/images/hero-bg.png"
      />

      {/* Breadcrumb + Notre Histoire - même fond */}
      <div className="bg-neutral-50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-neutral-600 hover:text-[#0077B6] transition-colors"
            >
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <span className="text-[#F9A825] font-medium">À propos</span>
          </nav>
        </div>

        {/* Notre Histoire */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Notre histoire
                </h2>

                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    <strong className="text-[#0077B6]">Imo2tun</strong> est une
                    association loi 1901 à but non lucratif qui se veut être
                    académie de la connaissance.
                  </p>
                  <p>
                    Elle permet à ces membres une évolution continue par
                    l&apos;échange de savoir-faire, la transmission de
                    connaissances pour répondre aux enjeux de l&apos;Afrique.
                  </p>
                  <p>
                    Notre mission est de créer un écosystème vertueux de
                    partage, d&apos;échange et d&apos;innovation dans les
                    métiers du numérique en Afrique, en formant les jeunes
                    talents et en connectant les experts aux organisations.
                  </p>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-md overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                    alt="Équipe travaillant ensemble sur un projet numérique"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#F9A825]/20 rounded-md -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#0077B6]/20 rounded-md -z-10" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Nos Valeurs */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Nos valeurs"
            subtitle="Les principes qui guident chacune de nos actions au quotidien."
          />

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.id}
                icon={value.icon}
                title={value.title}
                description={value.description}
                variant={value.variant}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <TeamSlider />

      {/* Nos Partenaires */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Nos Partenaires"
            subtitle="Ils nous font confiance et nous accompagnent dans notre mission."
          />
        </div>

        {/* Partners Slider */}
        <PartnersSlider />

        {/* CTA Button */}
        <div className="text-center mt-8">
          <Link href="/contact">
            <Button variant="primary">Devenir partenaire</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
