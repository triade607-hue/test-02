"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
    acceptCommunications: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
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
        <div className="relative hidden md:flex md:w-[45%] md:min-h-[550px] text-white flex-col overflow-hidden">
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

          {/* Overlay teal */}
          <div className="absolute inset-0 bg-primary-600/95" />

          {/* Cercles décoratifs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 border-[40px] border-white/10 rounded-full" />

          {/* Contenu */}
          <div className="relative z-10 p-8 flex flex-col h-full">
            {/* Bouton Retour */}
            <Link
              href="/"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour</span>
            </Link>

            {/* Contenu centré */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Titre */}
              <h3 className="text-2xl font-bold text-center mb-4">
                Rejoignez l&apos;aventure !
              </h3>

              {/* Description */}
              <p className="text-white/80 text-center text-sm max-w-xs mb-6">
                Créez votre compte et rejoignez la communauté imo2tun pour
                construire ensemble l&apos;écosystème numérique africain.
              </p>

              {/* Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <span className="block text-2xl font-bold">500+</span>
                  <span className="text-white/60 text-xs">Membres</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold">50+</span>
                  <span className="text-white/60 text-xs">Événements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col md:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              Créer un compte
            </h2>
            <Link
              href="/"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:pb-8 md:pt-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Compte créé avec succès !
                </h3>
                <p className="text-neutral-600 text-center mb-6">
                  Vérifiez votre email pour activer votre compte.
                </p>
                <Link
                  href="/login"
                  className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
                >
                  Se connecter
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Email */}
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

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Mot de passe<span className="text-secondary-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Minimum 8 caractères"
                      className="w-full px-4 py-2.5 pr-12 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox CGU */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-neutral-600"
                  >
                    J&apos;accepte les{" "}
                    <Link
                      href="/cgu"
                      className="text-primary-600 hover:underline"
                    >
                      conditions générales
                    </Link>{" "}
                    et la{" "}
                    <Link
                      href="/privacy"
                      className="text-primary-600 hover:underline"
                    >
                      politique de confidentialité
                    </Link>
                    <span className="text-secondary-500">*</span>
                  </label>
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
                    <span className="text-primary-600">communications</span> de
                    la part d&apos;imo2tun
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Création...
                      </span>
                    ) : (
                      "CRÉER MON COMPTE"
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-neutral-500">
                      Déjà membre ?
                    </span>
                  </div>
                </div>

                {/* Login Link */}
                <Link
                  href="/login"
                  className="block w-full px-5 py-3 bg-white border-2 border-accent-500 text-accent-500 text-sm font-semibold rounded-md hover:bg-accent-500 hover:text-white transition-colors text-center"
                >
                  SE CONNECTER
                </Link>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
