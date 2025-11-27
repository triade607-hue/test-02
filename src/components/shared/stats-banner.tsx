"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { stats } from "@/lib/data";

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseInt(value.replace(/\D/g, ""));
          const suffix = value.replace(/[0-9]/g, "");
          const duration = 2000;
          const steps = 60;
          const increment = numericValue / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current) + suffix);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsBanner() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Desktop - Image combinée (monsieur + bande) */}
        <div className="hidden md:block relative">
          <Image
            src="/images/stats-banner-pc.png"
            alt="Statistiques imo2tun"
            width={1200}
            height={250}
            className="w-full h-auto"
            priority
          />
          {/* Stats superposés - positionnés sur la bande verte uniquement */}
          <div className="absolute top-0 right-0 bottom-0 w-[70%] lg:w-[65%] flex items-center justify-start pl-12 lg:pl-20 pt-28">
            <div className="grid grid-cols-3 gap-8 md:gap-12 lg:gap-20 text-center text-white">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="text-xl md:text-lg text-white/90">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile - Bande verte seule */}
        <div className="md:hidden relative">
          <Image
            src="/images/stats-banner-mobile.png"
            alt="Statistiques imo2tun"
            width={800}
            height={150}
            className="w-full h-auto rounded-md"
            priority
          />
          {/* Stats superposés */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6 text-center text-white">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xl font-bold mb-1">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="text-[10px] text-white/90">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
