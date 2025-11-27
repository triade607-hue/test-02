"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-md overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer group h-[380px]"
    >
      {/* Image de fond */}
      <Image
        src={event.image}
        alt={event.title}
        fill
        className={cn(
          "object-cover transition-transform duration-700",
          isHovered ? "scale-110" : "scale-100"
        )}
      />

      {/* Overlay gradient - toujours visible */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isHovered
            ? "bg-[#007DC5]/90"
            : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        )}
      />

      {/* Badge statut - toujours visible */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm",
            event.status === "upcoming"
              ? "bg-white/20 text-white border border-white/30"
              : "bg-black/20 text-white/80 border border-white/20"
          )}
        >
          {event.status === "upcoming" ? "À venir" : "Passé"}
        </span>
      </div>

      {/* Contenu état normal - en bas */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-6 transition-all duration-500",
          isHovered ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        )}
      >
        {/* Catégorie */}
        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-3">
          {event.category}
        </span>

        {/* Titre */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Date simple */}
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.date)}</span>
        </div>
      </div>

      {/* Contenu état hover - centré */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6 flex flex-col justify-center"
          >
            {/* Catégorie */}
            <span className="inline-block self-start px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-4">
              {event.category}
            </span>

            {/* Titre */}
            <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>

            {/* Infos détaillées */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{event.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm mb-6 line-clamp-2">
              {event.description}
            </p>

            {/* Boutons */}
            <div className="flex gap-3">
              {event.status === "upcoming" && (
                <button className="flex-1 bg-white text-[#007DC5] font-semibold py-2.5 px-4 rounded-md text-sm hover:bg-white/90 transition-colors">
                  S&apos;inscrire
                </button>
              )}
              <Link
                href={`/events/${event.slug}`}
                className={event.status === "upcoming" ? "flex-1" : "w-full"}
              >
                <button className="w-full border-2 border-white text-white font-semibold py-2.5 px-4 rounded-md text-sm hover:bg-white hover:text-[#007DC5] transition-colors flex items-center justify-center gap-2">
                  Détails
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ligne décorative en bas */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-white transition-all duration-500",
          isHovered ? "w-full" : "w-0"
        )}
      />
    </motion.div>
  );
}
