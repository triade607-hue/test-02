"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, PenTool, BookOpen } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { Button } from "@/components/ui";

export default function ArticlesPage() {
  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Actualités & Insights"
        subtitle="Restez informé des dernières tendances du numérique africain"
        backgroundImage="/images/hero-bg.png"
      />

      {/* Coming Soon Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Illustration animée - Stack de cartes */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-flex items-center justify-center mb-8"
            >
              {/* Cartes empilées */}
              <motion.div
                animate={{ rotate: [-3, -3], y: [0, -5, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity } }}
                className="absolute w-28 h-36 bg-[#26A69A]/20 rounded-md -rotate-6 -left-4"
              />
              <motion.div
                animate={{ rotate: [3, 3], y: [0, -3, 0] }}
                transition={{
                  y: { duration: 2.5, repeat: Infinity, delay: 0.3 },
                }}
                className="absolute w-28 h-36 bg-[#F9A825]/20 rounded-md rotate-3 -right-4"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                className="relative w-28 h-36 bg-gradient-to-br from-[#0077B6] to-[#0077B6]/80 rounded-md flex items-center justify-center shadow-lg"
              >
                <Newspaper className="w-10 h-10 text-white" />
              </motion.div>

              {/* Icône stylo animée */}
              <motion.div
                animate={{
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
              >
                <PenTool className="w-5 h-5 text-[#F9A825]" />
              </motion.div>
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
            >
              Nos articles arrivent bientôt
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-neutral-600 mb-4 max-w-2xl mx-auto"
            >
              Notre équipe éditoriale prépare du contenu de qualité pour vous.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-neutral-500 mb-8 max-w-xl mx-auto"
            >
              Analyses, interviews d&apos;experts, études de cas et actualités
              sur l&apos;écosystème numérique africain seront bientôt
              disponibles.
            </motion.p>

            {/* Categories preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {[
                "Tech",
                "Cloud",
                "Data & IA",
                "Cybersécurité",
                "Innovation",
              ].map((cat, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white rounded-md text-sm text-neutral-600 border border-neutral-200"
                >
                  {cat}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/events">
                <Button
                  variant="primary"
                  leftIcon={<BookOpen className="w-4 h-4" />}
                >
                  Voir nos événements
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Retour à l&apos;accueil</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
