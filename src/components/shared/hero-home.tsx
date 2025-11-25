"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export function HeroHome() {
  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-image-back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-[42px] font-bold text-neutral-900 leading-tight mb-6">
              Construisons ensemble l&apos;écosystème numérique africain
            </h1>

            <p className="text-lg text-black mb-8 leading-relaxed max-w-lg">
              <span className="text-[#26A69A] font-semibold">Imo2tun</span> est
              une association loi 1901 à but non lucratif qui se veut être une
              académie de la connaissance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/membership">
                <Button
                  variant="secondary"
                  size="md"
                  className="rounded-md px-8"
                >
                  Devenir Membre
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="md"
                  className="rounded-md px-8 border-[#F9A825] text-black hover:bg-[#F9A825] hover:text-white"
                >
                  Découvrir nos programmes
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Image
                src="/images/hero-image-front.png"
                alt="imo2tun - Écosystème numérique africain"
                width={550}
                height={500}
                className="w-full max-w-[500px] lg:max-w-[550px] h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
