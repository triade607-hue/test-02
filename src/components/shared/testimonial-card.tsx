/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
    >
      {/* Avatar & Rating */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            testimonial.author.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "fill-secondary-500 text-secondary-500"
                  : "fill-neutral-200 text-neutral-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-neutral-700 mb-4 italic leading-relaxed">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-neutral-100 pt-4">
        <p className="font-semibold text-neutral-900">{testimonial.author}</p>
        <p className="text-sm text-neutral-500">
          {testimonial.role}
          {testimonial.company && `, ${testimonial.company}`}
        </p>
      </div>
    </motion.div>
  );
}
