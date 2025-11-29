"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Clock, ArrowLeft } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { Button } from "@/components/ui";

export default function ArticleDetailPage() {
  return (
    <>
      {/* Hero */}
      <HeroSecondary title="Article" backgroundImage="/images/hero-bg.png" />

      {/* Coming Soon Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Illustration animée - Document */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-flex items-center justify-center mb-8"
            >
              {/* Document principal */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-40 h-52 bg-white rounded-md shadow-xl border border-neutral-100 p-4"
              >
                {/* Lignes de texte simulées */}
                <div className="space-y-2">
                  <div className="h-3 bg-[#0077B6]/20 rounded-full w-3/4" />
                  <div className="h-2 bg-neutral-200 rounded-full w-full" />
                  <div className="h-2 bg-neutral-200 rounded-full w-5/6" />
                  <div className="h-2 bg-neutral-200 rounded-full w-full" />
                  <div className="h-2 bg-neutral-200 rounded-full w-4/6" />
                  <div className="mt-4 h-16 bg-[#26A69A]/10 rounded-md" />
                  <div className="h-2 bg-neutral-200 rounded-full w-full" />
                  <div className="h-2 bg-neutral-200 rounded-full w-3/4" />
                </div>

                {/* Icon document */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#0077B6] rounded-md flex items-center justify-center shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              {/* Clock animée */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-4 w-12 h-12 bg-[#F9A825] rounded-full flex items-center justify-center shadow-md"
              >
                <Clock className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
            >
              Article en préparation
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-neutral-600 mb-4 max-w-2xl mx-auto"
            >
              Ce contenu sera disponible très prochainement.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-neutral-500 mb-8 max-w-xl mx-auto"
            >
              Inscrivez-vous à notre newsletter pour être informé dès la
              publication de nos nouveaux articles.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/actualites">
                <Button
                  variant="primary"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Retour aux actualités
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
