"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, ChevronLeft } from "lucide-react";

// Types
import { Event } from "@/types";

interface EventRegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
}: EventRegistrationModalProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialNeeds: "",
    acceptCommunications: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset and close after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        specialNeeds: "",
        acceptCommunications: false,
      });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-md shadow-2xl z-[100] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Panel - Event Info (Hidden on mobile) - État hover par défaut */}
            <div
              className="relative hidden md:flex md:w-[45%] md:min-h-[500px] text-white flex-col overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image de fond avec parallax - toujours en scale */}
              <motion.div
                animate={{
                  scale: 1.15,
                  rotate: 2,
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

              {/* Overlay vert toujours visible (état hover par défaut) */}
              <div className="absolute inset-0 bg-accent-500/95" />

              {/* Cercles décoratifs toujours visibles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/10 rounded-full" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 border-[40px] border-white/10 rounded-full" />

              {/* Effet de brillance au hover seulement */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: 1 }}
                    exit={{ x: "200%", opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-10"
                  />
                )}
              </AnimatePresence>

              {/* Ligne blanche en bas toujours visible */}
              {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-white z-20" /> */}

              {/* Contenu */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Retour button */}
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 self-start"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Retour</span>
                </button>

                {/* Event Image */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-xl mb-6">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-center mb-6">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-3 w-full">
                    {[
                      { icon: Calendar, text: formatDate(event.date) },
                      { icon: Clock, text: event.time },
                      { icon: MapPin, text: event.location },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-white/90 text-sm"
                      >
                        <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/20">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form (fond blanc) */}
            <div className="flex-1 bg-white flex flex-col md:max-h-[90vh] overflow-hidden">
              {/* Header sticky sur mobile */}
              <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
                <h2 className="text-xl md:text-3xl font-bold text-neutral-900">
                  Inscrivez-vous
                </h2>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form content avec scroll */}
              <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:pb-8 md:pt-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      Inscription confirmée !
                    </h3>
                    <p className="text-neutral-600 text-center">
                      Vous recevrez un email de confirmation.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nom & Prénom - empilés sur mobile, côte à côte sur desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Nom<span className="text-secondary-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                          Prénom<span className="text-secondary-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Adresse e-mail professionnelle
                        <span className="text-secondary-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Besoins spéciaux */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Besoins spéciaux
                      </label>
                      <textarea
                        name="specialNeeds"
                        value={formData.specialNeeds}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Checkbox communications */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="acceptCommunications"
                        name="acceptCommunications"
                        checked={formData.acceptCommunications}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <label
                        htmlFor="acceptCommunications"
                        className="text-sm text-neutral-600"
                      >
                        J&apos;accepte de recevoir des{" "}
                        <span className="text-primary-600 hover:underline cursor-pointer">
                          communications
                        </span>
                      </label>
                    </div>

                    {/* Buttons - Un seul bouton bleu */}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-5 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Envoi...
                          </span>
                        ) : (
                          "CONFIRMER INSCRIPTION"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
