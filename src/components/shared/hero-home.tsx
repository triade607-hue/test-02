"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export function HeroHome() {
  return (
    <section className="relative bg-gradient-to-br from-white to-neutral-50 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Construisons ensemble{" "}
              <span className="text-primary-600">l&apos;écosystème</span>{" "}
              <span className="text-secondary-500">numérique</span>{" "}
              <span className="text-accent-500">africain</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              imo2tun est une association loi 1901 à but non lucratif qui veut
              être une académie de la connaissance. Nous formons les talents de
              demain aux métiers du numérique : Cloud, Data, IA, Cybersécurité.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/membership">
                <Button variant="primary" size="lg">
                  Devenir Membre
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Découvrir nos programmes
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/images/hero-image.png"
                alt="imo2tun - Écosystème numérique africain"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute top-10 right-10 bg-white rounded-xl shadow-lg p-4"
            >
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-neutral-500">Membres</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute bottom-20 left-0 bg-white rounded-xl shadow-lg p-4"
            >
              <div className="text-2xl font-bold text-secondary-500">50+</div>
              <div className="text-sm text-neutral-500">Experts</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
