"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image?: string;
  reversed?: boolean;
}

export function CtaSection({
  title,
  description,
  buttonText,
  buttonLink,
  image = "/images/cta-image.jpg",
  reversed = false,
}: CtaSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative ${reversed ? "lg:order-2" : ""}`}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-500 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-200 rounded-xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reversed ? "lg:order-1" : ""}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {title}
            </h2>
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              {description}
            </p>
            <Link href={buttonLink}>
              <Button variant="primary" size="lg">
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
