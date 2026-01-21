"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

// Hook
import { useContact } from "@/hooks/use-contact";

export function NewsletterBanner() {
  // État local pour le formulaire
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Hook pour la newsletter
  const {
    isSubmitting,
    isSuccess,
    error,
    successMessage,
    subscribeNewsletter,
    reset,
  } = useContact();

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await subscribeNewsletter({
      name: formData.name,
      email: formData.email,
    });

    if (success) {
      // Reset form après succès
      setTimeout(() => {
        reset();
        setFormData({ name: "", email: "" });
      }, 5000);
    }
  };

  return (
    <section className="relative py-16 md:py-20 bg-white overflow-hidden">
      {/* Forme décorative gauche - Hidden on mobile */}
      {/* <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30"
        >
          <circle cx="200" cy="200" r="180" stroke="#007DC5" strokeWidth="2" />
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#007DC5"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <circle cx="200" cy="200" r="100" stroke="#007DC5" strokeWidth="2" />
        </svg>
      </div> */}

      {/* Forme décorative droite - Hidden on mobile */}
      {/* <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30"
        >
          <circle cx="200" cy="200" r="180" stroke="#007DC5" strokeWidth="2" />
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#007DC5"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <circle cx="200" cy="200" r="100" stroke="#007DC5" strokeWidth="2" />
        </svg>
      </div> */}

      {/* Points décoratifs - Hidden on mobile */}
      {/* <div className="hidden lg:grid absolute top-8 left-1/4 grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#007DC5] rounded-full" />
        ))}
      </div>
      <div className="hidden lg:grid absolute bottom-8 right-1/4 grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#007DC5] rounded-full" />
        ))}
      </div> */}

      {/* Contenu */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Titre */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">
            Pour plus d&apos;informations
          </h2>

          {/* Ligne décorative */}
          <div className="flex justify-center mb-4">
            <div className="h-1 w-16 bg-[#007DC5] rounded-full" />
          </div>

          <p className="text-neutral-600 mb-10 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            actualités et événements.
          </p>

          {/* Message d'erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm max-w-xl mx-auto"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Formulaire */}
          {!isSuccess ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              {/* Input Nom */}
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full md:w-75 px-5 py-3 rounded-md bg-white border-2 border-[#007DC5] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007DC5]/20 transition-all"
              />

              {/* Input Email */}
              <input
                type="email"
                placeholder="Votre e-mail"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full md:w-75 px-5 py-3 rounded-md bg-white border-2 border-[#007DC5] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007DC5]/20 transition-all"
              />

              {/* Bouton */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto px-8 py-3 bg-transparent border-2 border-[#F9A825] text-neutral-900 font-semibold rounded-md hover:bg-[#F9A825] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    Soumettre
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-[#26A69A] rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-neutral-900 text-lg font-semibold">
                Merci pour votre inscription !
              </p>
              <p className="text-neutral-600 text-sm">
                {successMessage || "Vous recevrez bientôt nos actualités."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
