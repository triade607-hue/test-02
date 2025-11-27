"use client";

import { useRef, useEffect } from "react";
import { TestimonialCard } from "./testimonial-card";
import { SectionTitle } from "./section-title";
import { testimonials } from "@/lib/data";

export function TestimonialsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Auto-scroll en boucle
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (slider) {
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
  }, []);

  // Dupliquer les témoignages pour l'effet infini
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionTitle
          title="Ils parlent de nous"
          subtitle="Découvrez les témoignages de nos membres et partenaires."
        />
      </div>

      {/* Testimonials Slider - Full width */}
      <div className="mt-12">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden py-4 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[300px] md:w-[340px]"
            >
              <TestimonialCard testimonial={testimonial} index={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}