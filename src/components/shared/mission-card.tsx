"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Map des icônes
const iconMap = {
  GraduationCap,
  Users,
  Lightbulb,
};

interface MissionCardProps {
  icon: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  index?: number;
}

export function MissionCard({
  icon: iconName,
  title,
  description,
  link,
  linkText = "En savoir plus",
  index = 0,
}: MissionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[iconName as keyof typeof iconMap] || GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-md p-8 border-2 transition-all duration-300 text-center overflow-hidden",
        isHovered
          ? "bg-[#007DC5] border-[#007DC5] shadow-md"
          : "bg-white border-[#007DC5] shadow-sm hover:shadow-md"
      )}
    >
      {/* Effet de brillance en boucle infinie */}
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
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20"
        />
      )}

      {/* Icon */}
      <motion.div
        animate={{
          backgroundColor: isHovered ? "#FFFFFF" : "#007DC5",
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Icon
          className={cn(
            "w-8 h-8 transition-colors duration-300",
            isHovered ? "text-[#007DC5]" : "text-white"
          )}
        />
      </motion.div>

      {/* Title */}
      <h3
        className={cn(
          "relative z-10 text-lg font-semibold mb-2 transition-colors duration-300",
          isHovered ? "text-white" : "text-neutral-900"
        )}
      >
        {title}
      </h3>

      {/* Underline */}
      <motion.div
        animate={{
          backgroundColor: isHovered ? "#FFFFFF" : "#007DC5",
          width: isHovered ? "60px" : "40px",
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 h-[3px] rounded-full mx-auto mb-4"
      />

      {/* Description */}
      <p
        className={cn(
          "relative z-10 text-[15px] leading-relaxed mb-6 transition-colors duration-300",
          isHovered ? "text-white" : "text-neutral-600"
        )}
      >
        {description}
      </p>

      {/* Link/Button */}
      {link && (
        <Link href={link} className="relative z-10">
          <motion.button
            animate={{
              backgroundColor: isHovered ? "#FFFFFF" : "transparent",
              color: isHovered ? "#007DC5" : "#000000",
              borderColor: isHovered ? "#FFFFFF" : "#F9A825",
            }}
            transition={{ duration: 0.3 }}
            className="border-2 font-semibold px-6 py-2.5 rounded-md transition-all duration-300 inline-flex items-center gap-2"
          >
            {linkText}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}
