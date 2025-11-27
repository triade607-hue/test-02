"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
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
      className="relative rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-[440px] group"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Image de fond avec parallax */}
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay gradient normal */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      {/* Overlay bleu avec effet circulaire */}
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{
          clipPath: isHovered
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#007DC5]/95"
      />

      {/* Formes décoratives animées */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Cercle décoratif 1 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white rounded-full"
            />
            {/* Cercle décoratif 2 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-32 -left-32 w-80 h-80 border-[40px] border-white rounded-full"
            />
          </>
        )}
      </AnimatePresence>

      {/* Badge statut avec effet glow */}
      <div className="absolute top-4 right-4 z-10">
        <motion.span
          animate={{
            boxShadow: isHovered
              ? "0 0 20px rgba(255,255,255,0.3)"
              : "0 0 0px rgba(255,255,255,0)",
          }}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-colors duration-500",
            event.status === "upcoming"
              ? "bg-white/20 text-white border border-white/40"
              : "bg-black/30 text-white/80 border border-white/20"
          )}
        >
          {event.status === "upcoming" ? "À venir" : "Passé"}
        </motion.span>
      </div>

      {/* Contenu état normal */}
      <motion.div
        animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? 30 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-white/60" />
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
            {event.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-md" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location.split(",")[0]}</span>
          </div>
        </div>
      </motion.div>

      {/* Contenu état hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-0 p-6 flex flex-col justify-center z-10"
          >
            {/* Catégorie avec animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                {event.category}
              </span>
            </motion.div>

            {/* Titre avec animation */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-2xl font-bold text-white mb-5"
            >
              {event.title}
            </motion.h3>

            {/* Infos avec animation staggered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 mb-5"
            >
              {[
                { icon: Calendar, text: formatDate(event.date) },
                { icon: Clock, text: event.time },
                { icon: MapPin, text: event.location },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.1 }}
                  className="flex items-center gap-3 text-white/90 text-sm"
                >
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/20">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Description avec animation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-sm mb-6 line-clamp-2"
            >
              {event.description}
            </motion.p>

            {/* Boutons avec animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              {event.status === "upcoming" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white text-[#007DC5] font-bold py-3 px-4 rounded-md text-sm hover:bg-white/90 transition-colors shadow-lg shadow-black/10"
                >
                  S&apos;inscrire
                </motion.button>
              )}
              <Link
                href={`/events/${event.slug}`}
                className={event.status === "upcoming" ? "flex-1" : "w-full"}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border-2 border-white text-white font-bold py-3 px-4 rounded-md text-sm hover:bg-white hover:text-[#007DC5] transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Voir plus
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ligne animée en bas */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white origin-left"
      />

      {/* Effet de brillance au hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: isHovered ? "200%" : "-100%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
}
