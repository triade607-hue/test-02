"use client";

import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMemberCard } from "./team-member-card";
import { SectionTitle } from "./section-title";
import { team } from "@/lib/data";

export function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigation avec boucle infinie
  const navigate = useCallback((dir: "left" | "right") => {
    setDirection(dir === "right" ? 1 : -1);
    setCurrentIndex((prev) => {
      if (dir === "right") {
        return prev === team.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? team.length - 1 : prev - 1;
      }
    });
  }, []);

  // Calcul des indices visibles (3 pour desktop, 1 pour mobile)
  const getVisibleIndices = (count: number) => {
    const indices = [];
    for (let i = 0; i < count; i++) {
      indices.push((currentIndex + i) % team.length);
    }
    return indices;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionTitle
          title="Notre Équipe"
          subtitle="Des experts passionnés au service de l'écosystème numérique africain."
        />
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto relative mt-12" ref={containerRef}>
        {/* Left Arrow - toujours visible */}
        <button
          onClick={() => navigate("left")}
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-[#0077B6] hover:text-[#F9A825] transition-colors"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
        </button>

        {/* Desktop: 3 cartes */}
        <div className="hidden lg:block px-20">
          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" custom={direction}>
              {getVisibleIndices(3).map((idx, i) => (
                <motion.div
                  key={`${team[idx].id}-${currentIndex}-${i}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <TeamMemberCard member={team[idx]} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Tablet: 2 cartes */}
        <div className="hidden md:block lg:hidden px-16">
          <div className="grid grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout" custom={direction}>
              {getVisibleIndices(2).map((idx, i) => (
                <motion.div
                  key={`${team[idx].id}-${currentIndex}-${i}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <TeamMemberCard member={team[idx]} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: 1 carte centrée */}
        <div className="md:hidden px-14">
          <div className="flex justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`${team[currentIndex].id}-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-[250px]"
              >
                <TeamMemberCard member={team[currentIndex]} index={0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Arrow - toujours visible */}
        <button
          onClick={() => navigate("right")}
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-[#0077B6] hover:text-[#F9A825] transition-colors"
          aria-label="Suivant"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {team.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-[#0077B6] w-6"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Aller au membre ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
