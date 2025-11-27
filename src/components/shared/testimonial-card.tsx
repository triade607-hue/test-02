"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-10"
    >
      {/* Avatar - positionné au-dessus de la carte */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            borderColor: isHovered ? "#FFFFFF" : "#007DC5",
          }}
          transition={{ duration: 0.3 }}
          className="relative w-16 h-16 rounded-full overflow-hidden border-4 shadow-lg bg-white"
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Card */}
      <div
        className={cn(
          "relative rounded-md p-6 pt-12 transition-all duration-500 overflow-hidden",
          isHovered
            ? "bg-[#007DC5] shadow-xl"
            : "bg-white shadow-md hover:shadow-lg"
        )}
      >
        {/* Effet de brillance */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
          />
        )}

        {/* Quote icon */}
        <motion.div
          animate={{
            color: isHovered ? "rgba(255,255,255,0.15)" : "rgba(0,125,197,0.1)",
          }}
          className="absolute top-10 right-4"
        >
          <Quote className="w-10 h-10" />
        </motion.div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-4 relative z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                color: isHovered
                  ? "#FFFFFF"
                  : i < testimonial.rating
                    ? "#F9A825"
                    : "#E5E7EB",
              }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Star
                className="w-4 h-4"
                fill={i < testimonial.rating ? "currentColor" : "none"}
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <motion.p
          animate={{
            color: isHovered ? "rgba(255,255,255,0.95)" : "#525252",
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 text-sm leading-relaxed text-center mb-6 line-clamp-3"
        >
          &ldquo;{testimonial.content}&rdquo;
        </motion.p>

        {/* Divider */}
        <motion.div
          animate={{
            backgroundColor: isHovered ? "rgba(255,255,255,0.3)" : "#E5E7EB",
          }}
          className="h-px w-16 mx-auto mb-4"
        />

        {/* Author info */}
        <div className="text-center relative z-10">
          <motion.p
            animate={{
              color: isHovered ? "#FFFFFF" : "#171717",
            }}
            transition={{ duration: 0.3 }}
            className="font-bold text-sm"
          >
            {testimonial.author}
          </motion.p>
          <motion.p
            animate={{
              color: isHovered ? "rgba(255,255,255,0.8)" : "#6B7280",
            }}
            transition={{ duration: 0.3 }}
            className="text-xs mt-1"
          >
            {testimonial.role} • {testimonial.company}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
