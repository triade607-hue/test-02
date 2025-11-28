"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

interface CtaSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

export function CtaSection({
  title = "Prêt à rejoindre l'aventure ?",
  description = "Rejoignez notre communauté de passionnés du numérique et participez à la construction de l'écosystème tech africain. Ensemble, formons les talents de demain et créons des opportunités pour tous.",
  buttonText = "Devenir Membre Maintenant",
  buttonLink = "/membership",
  image = "/images/cta-image.png",
}: CtaSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Background shape */}
              <div className="absolute inset-4 bg-neutral-300 rounded-2xl" />

              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Image
                  src={image}
                  alt="Rejoindre imo2tun"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
              {title}
            </h2>

            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              {description}
            </p>

            <Link href={buttonLink}>
              <Button
                variant="primary"
                size="lg"
                className="rounded-md px-8 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0"
              >
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
