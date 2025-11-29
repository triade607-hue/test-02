"use client";

import { motion } from "framer-motion";
import {
  Share2,
  Heart,
  Award,
  Lightbulb,
  Eye,
  Leaf,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map des icônes
const iconMap: Record<string, LucideIcon> = {
  Share2,
  Heart,
  Award,
  Lightbulb,
  Eye,
  Leaf,
};

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  variant: "primary" | "secondary" | "accent" | "outline";
  index?: number;
}

export function ValueCard({
  icon,
  title,
  description,
  variant,
  index = 0,
}: ValueCardProps) {
  const Icon = iconMap[icon] || Share2;

  const variantStyles = {
    primary: {
      card: "bg-[#0077B6] text-white",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      titleColor: "text-white",
      descColor: "text-white/80",
    },
    secondary: {
      card: "bg-[#F9A825] text-white",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      titleColor: "text-white",
      descColor: "text-white/80",
    },
    accent: {
      card: "bg-[#26A69A] text-white",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      titleColor: "text-white",
      descColor: "text-white/80",
    },
    outline: {
      card: "bg-white border-2 border-neutral-100 hover:border-[#0077B6]/20",
      iconBg: "bg-[#0077B6]/10",
      iconColor: "text-[#0077B6]",
      titleColor: "text-neutral-900",
      descColor: "text-neutral-600",
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-md p-6 md:p-8 transition-shadow duration-300 hover:shadow-xl",
        styles.card
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className={cn(
          "w-14 h-14 rounded-md flex items-center justify-center mb-5",
          styles.iconBg
        )}
      >
        <Icon className={cn("w-7 h-7", styles.iconColor)} />
      </motion.div>

      {/* Title */}
      <h3 className={cn("text-xl font-bold mb-3", styles.titleColor)}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn("text-sm leading-relaxed", styles.descColor)}>
        {description}
      </p>
    </motion.div>
  );
}
