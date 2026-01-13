"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSecondaryProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function HeroSecondary({
  title,
  subtitle,
  backgroundImage = "/images/hero-bg.png",
  children,
}: HeroSecondaryProps) {
  return (
    <section className="relative min-h-[480px] md:min-h-[520px] lg:min-h-[550px] flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-20 pb-16">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/80 text-base md:text-lg max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
