"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { partners } from "@/lib/data";

export function PartnersSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll en slow motion
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollPosition = 0;
    const scrollSpeed = 2; // Vitesse du défilement (px par frame)

    const animate = () => {
      if (slider && !isPaused) {
        scrollPosition += scrollSpeed;

        // Reset quand on arrive à la moitié (effet infini)
        if (scrollPosition >= slider.scrollWidth / 2) {
          scrollPosition = 0;
        }

        slider.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      // Pause l'animation auto
      setIsPaused(true);

      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Reprend l'animation après 2 secondes
      setTimeout(() => {
        setIsPaused(false);
      }, 2000);
    }
  };

  // Dupliquer les logos pour l'effet infini
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center text-[#007DC5] hover:text-[#0066A4] transition-colors"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
        </button>

        {/* Partners Slider */}
        <div className="px-4 md:px-20 lg:px-24">
          <div
            ref={sliderRef}
            className="flex items-center gap-16 overflow-x-hidden py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedPartners.map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center text-[#007DC5] hover:text-[#0066A4] transition-colors"
          aria-label="Suivant"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}