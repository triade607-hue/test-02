"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Partner } from "@/types";

interface PartnersSliderProps {
  partners: Partner[];
}

export function PartnersSlider({ partners }: PartnersSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Partners */}
          <div
            ref={sliderRef}
            className="flex items-center gap-8 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                {partner.url ? (
                    <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </a>
                ) : (
                  <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    </section>
  );
}