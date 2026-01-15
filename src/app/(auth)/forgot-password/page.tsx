"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, Mail, Check, ArrowRight } from "lucide-react";

// Hook d'authentification
import { usePasswordReset } from "@/hooks";

export default function ForgotPasswordPage() {
  const { step, isLoading, error, successMessage, requestReset } =
    usePasswordReset();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestReset(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel - Branding */}
        <div className="relative hidden md:flex md:w-[45%] md:min-h-[450px] text-white flex-col overflow-hidden">
          {/* Background Image */}
          <motion.div
            animate={{ scale: 1.15, rotate: 2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/avatar.png"
              alt="imo2tun"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-primary-600/95" />

          {/* Cercles décoratifs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 border-[40px] border-white/10 rounded-full" />

          {/* Contenu */}
          <div className="relative z-10 p-8 flex flex-col h-full">
            {/* Bouton Retour */}
            <Link
              href="/login"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour</span>
            </Link>

            {/* Contenu centré */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Icône */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-center mb-4">
                Mot de passe oublié ?
              </h3>

              {/* Description */}
              <p className="text-white/80 text-center text-sm max-w-xs">
                Pas de panique ! Nous allons vous envoyer un lien pour
                réinitialiser votre mot de passe.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              Réinitialiser le mot de passe
            </h2>
            <Link
              href="/login"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Form */}
          <div className="flex-1 px-6 py-6 md:px-8 md:pb-8 md:pt-6">
            {step === "email-sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Email envoyé !
                </h3>
                <p className="text-neutral-600 text-center mb-2">
                  {successMessage ||
                    "Un lien de réinitialisation a été envoyé à :"}
                </p>
                <p className="text-primary-600 font-medium mb-6">{email}</p>
                <p className="text-sm text-neutral-500 text-center mb-6">
                  Vérifiez votre boîte de réception et vos spams.
                  <br />
                  Le lien expire dans 30 minutes.
                </p>
                <Link
                  href="/login"
                  className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
                >
                  Retour à la connexion
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-neutral-600 text-sm">
                  Entrez l&apos;adresse e-mail associée à votre compte. Nous
                  vous enverrons un lien pour créer un nouveau mot de passe.
                </p>

                {/* Message d'erreur */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Adresse e-mail<span className="text-secondary-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-5 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
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
                        Envoi en cours...
                      </span>
                    ) : (
                      <>
                        ENVOYER LE LIEN
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Back to login */}
                <div className="text-center pt-4">
                  <Link
                    href="/login"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    ← Retour à la connexion
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
