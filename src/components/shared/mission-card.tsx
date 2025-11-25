"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  index?: number;
}

export function MissionCard({
  icon,
  title,
  description,
  link,
  linkText = "En savoir plus",
  index = 0,
}: MissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-neutral-600 mb-4 line-clamp-3">{description}</p>

      {/* Link */}
      {link && (
        <Link
          href={link}
          className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group/link"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}
