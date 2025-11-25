"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
  variant?: "featured" | "compact" | "default";
  index?: number;
}

export function EventCard({
  event,
  variant = "default",
  index = 0,
}: EventCardProps) {
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-primary-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
      >
        {/* Image */}
        <div className="relative h-48 md:h-56">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge
            variant={event.status === "upcoming" ? "success" : "default"}
            className="absolute top-3 right-3"
          >
            {event.status === "upcoming" ? "À venir" : "Passé"}
          </Badge>
          {/* Logo overlay */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white z-10">
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="#0077B6" />
              <circle cx="50" cy="50" r="20" fill="#F9A825" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-8">
          <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
            {event.title}
          </h3>
          <div className="space-y-2 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="mt-4 inline-block w-full text-center bg-white text-primary-600 font-semibold py-2 px-4 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            S&apos;inscrire
          </Link>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          href={`/events/${event.slug}`}
          className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(event.date)}</span>
            </div>
            <h4 className="font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {event.title}
            </h4>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge
          variant={event.status === "upcoming" ? "success" : "default"}
          className="absolute top-3 right-3"
        >
          {event.status === "upcoming" ? "À venir" : "Passé"}
        </Badge>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" size="sm">
            {event.category}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="mt-4 inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Voir les détails →
        </Link>
      </div>
    </motion.div>
  );
}
