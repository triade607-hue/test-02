"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Sparkles, ArrowRight } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { Button } from "@/components/ui";

export default function AdhererPage() {
  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Rejoignez-nous"
        subtitle="Devenez membre de l'écosystème imo2tun"
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
            {/* Icon animé */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-flex items-center justify-center mb-8"
            >
              {/* Cercle background */}
              <div className="w-32 h-32 bg-gradient-to-br from-[#0077B6]/10 to-[#26A69A]/10 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#0077B6]/20 to-[#26A69A]/20 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-[#0077B6]" />
                </div>
              </div>

              {/* Sparkles animés */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-[#F9A825]" />
              </motion.div>
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.5, repeat: Infinity, delay: 0.5 },
                }}
                className="absolute -bottom-1 -left-3"
              >
                <Sparkles className="w-5 h-5 text-[#26A69A]" />
              </motion.div>
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
            >
              Bientôt disponible
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-neutral-600 mb-4 max-w-2xl mx-auto"
            >
              Notre plateforme d&apos;adhésion est en cours de finalisation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-neutral-500 mb-8 max-w-xl mx-auto"
            >
              Très bientôt, vous pourrez rejoindre notre communauté en tant
              qu&apos;Offreur, Utilisateur, Contributeur ou Partenaire et
              accéder à tous nos programmes.
            </motion.p>

            {/* Features preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
            >
              {[
                { label: "4 types de membres", color: "bg-[#0077B6]" },
                { label: "Accès aux formations", color: "bg-[#F9A825]" },
                { label: "Réseau d'experts", color: "bg-[#26A69A]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 justify-center text-sm text-neutral-600"
                >
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <Button
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Nous contacter
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
