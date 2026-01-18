/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, Loader2 } from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { Button } from "@/components/ui";

// Hook
import { useContact } from "@/hooks/use-contact";

// Types & Constants
import type { ContactPayload } from "@/types/contact.types";
import { PROFESSIONS } from "@/types/contact.types";

// ==================== PAGE COMPONENT ====================

export default function ContactPage() {
  // Hook contact
  const {
    isSubmitting,
    isSuccess,
    error,
    successMessage,
    sendMessage,
    clearError,
    reset,
  } = useContact();

  // Form state
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    profession: "",
    message: "",
    acceptTerms: false,
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error on change
    if (error) clearError();
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.acceptTerms) {
      return;
    }

    // Payload pour l'API
    const payload: ContactPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      message: formData.message,
    };

    // Envoyer via le hook
    const success = await sendMessage(payload);

    if (success) {
      // Reset form after delay
      setTimeout(() => {
        reset();
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          phone: "",
          profession: "",
          message: "",
          acceptTerms: false,
        });
      }, 5000);
    }
  };

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Contactez-nous"
        backgroundImage="/images/hero-bg.png"
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Accueil
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-secondary-500 font-medium">Contact</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-neutral-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Form Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8"
          >
            Envoyer un message
          </motion.h2>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-md p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                Message envoyé !
              </h3>
              <p className="text-neutral-600">{successMessage}</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Message d'erreur */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Nom & Prénom */}
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

              {/* Email & Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Adresse e-mail<span className="text-secondary-500">*</span>
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
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Téléphone<span className="text-secondary-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+229 XX XX XX XX"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Profession (Select) */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Profession<span className="text-secondary-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    {PROFESSIONS.map((profession) => (
                      <option key={profession.value} value={profession.value}>
                        {profession.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Message<span className="text-secondary-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Décrivez votre demande..."
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Checkbox CGU */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="text-sm text-neutral-600">
                  J'accepte que mes données soient utilisées pour me recontacter
                  dans le cadre de ma demande, conformément à notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-primary-600 hover:underline"
                  >
                    politique de confidentialité
                  </Link>
                  .<span className="text-secondary-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.acceptTerms}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    "Envoyer le message"
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </main>
    </>
  );
}
