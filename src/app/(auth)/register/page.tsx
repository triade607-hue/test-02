"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, Check, ChevronDown, Mail } from "lucide-react";

// Hook d'authentification
import { useRegister } from "@/hooks";

// Data
import { PROFESSIONS, COUNTRIES } from "@/lib/data";

export default function RegisterPage() {
  const { step, isLoading, error, successMessage, submitRegistration } =
    useRegister();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    profession: "",
    customProfession: "",
    countryCode: "+229",
    phone: "",
    acceptCondition: false,
    acceptCommunication: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si "Autre" est sélectionné, utiliser customProfession
    const finalProfession =
      formData.profession === "Autre"
        ? formData.customProfession
        : formData.profession;

    await submitRegistration({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      countryCode: formData.countryCode,
      profession: finalProfession,
      acceptCondition: formData.acceptCondition,
      acceptCommunication: formData.acceptCommunication,
    });
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
        <div className="relative hidden md:flex md:w-[45%] md:min-h-[600px] text-white flex-col overflow-hidden">
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
              {step === "success" ? (
                <>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Vérifiez votre email !
                  </h3>
                  <p className="text-white/80 text-center text-sm max-w-xs">
                    Un email de confirmation a été envoyé. Cliquez sur le lien
                    pour activer votre compte.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Rejoignez l&apos;aventure !
                  </h3>
                  <p className="text-white/80 text-center text-sm max-w-xs">
                    Créez votre compte pour accéder à toutes les ressources et
                    rejoindre la communauté imo2tun.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col md:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              {step === "success" ? "Inscription réussie" : "Créer un compte"}
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
            {step === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Inscription réussie !
                </h3>
                <p className="text-neutral-600 text-center mb-6">
                  {successMessage ||
                    "Vérifiez votre email pour activer votre compte."}
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
                {/* Message d'erreur */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
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
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Profession */}
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
                      className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner</option>
                      {PROFESSIONS.map((profession) => (
                        <option key={profession} value={profession}>
                          {profession}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                {/* Custom Profession (if "Autre" selected) */}
                {formData.profession === "Autre" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Précisez votre profession
                      <span className="text-secondary-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customProfession"
                      value={formData.customProfession}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                )}

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Téléphone<span className="text-secondary-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-32">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                      >
                        {COUNTRIES.map((country) => (
                          <option key={country.code} value={country.dialCode}>
                            {country.flag} {country.dialCode}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="00 00 00 00"
                      className="flex-1 px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptCondition"
                      checked={formData.acceptCondition}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">
                      J&apos;accepte les{" "}
                      <Link
                        href="/conditions-generales"
                        className="text-primary-600 hover:underline"
                      >
                        conditions générales
                      </Link>{" "}
                      et la{" "}
                      <Link
                        href="/politique-confidentialite"
                        className="text-primary-600 hover:underline"
                      >
                        politique de confidentialité
                      </Link>
                      <span className="text-secondary-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptCommunication"
                      checked={formData.acceptCommunication}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">
                      J&apos;accepte de recevoir des communications marketing
                      d&apos;imo2tun
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-5 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
