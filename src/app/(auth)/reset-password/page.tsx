"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Lock,
  Eye,
  EyeOff,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Validation du mot de passe
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    if (!passwordsMatch) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);

    // Simulation de réinitialisation
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
                <Lock className="w-8 h-8 text-white" />
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-center mb-4">
                Nouveau mot de passe
              </h3>

              {/* Description */}
              <p className="text-white/80 text-center text-sm max-w-xs">
                Choisissez un mot de passe fort et unique pour sécuriser votre
                compte imo2tun.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col md:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              Créer un nouveau mot de passe
            </h2>
            <Link
              href="/login"
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
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Mot de passe modifié !
                </h3>
                <p className="text-neutral-600 text-center mb-6">
                  Votre mot de passe a été réinitialisé avec succès.
                  <br />
                  Vous pouvez maintenant vous connecter.
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
                {/* Error message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Nouveau mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Nouveau mot de passe
                    <span className="text-secondary-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Entrez votre nouveau mot de passe"
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

                {/* Password strength indicators */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-600">
                    Le mot de passe doit contenir :
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks.length
                          ? "text-accent-600"
                          : "text-neutral-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${passwordChecks.length ? "opacity-100" : "opacity-30"}`}
                      />
                      Au moins 8 caractères
                    </div>
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks.uppercase
                          ? "text-accent-600"
                          : "text-neutral-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${passwordChecks.uppercase ? "opacity-100" : "opacity-30"}`}
                      />
                      Une majuscule
                    </div>
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks.lowercase
                          ? "text-accent-600"
                          : "text-neutral-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${passwordChecks.lowercase ? "opacity-100" : "opacity-30"}`}
                      />
                      Une minuscule
                    </div>
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks.number
                          ? "text-accent-600"
                          : "text-neutral-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${passwordChecks.number ? "opacity-100" : "opacity-30"}`}
                      />
                      Un chiffre
                    </div>
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordChecks.special
                          ? "text-accent-600"
                          : "text-neutral-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${passwordChecks.special ? "opacity-100" : "opacity-30"}`}
                      />
                      Un caractère spécial
                    </div>
                  </div>
                </div>

                {/* Confirmer mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Confirmer le mot de passe
                    <span className="text-secondary-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirmez votre mot de passe"
                      className={`w-full px-4 py-2.5 pr-12 bg-white border rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                        formData.confirmPassword && !passwordsMatch
                          ? "border-red-300"
                          : formData.confirmPassword && passwordsMatch
                            ? "border-accent-300"
                            : "border-neutral-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-500 mt-1">
                      Les mots de passe ne correspondent pas
                    </p>
                  )}
                  {formData.confirmPassword && passwordsMatch && (
                    <p className="text-xs text-accent-600 mt-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Les mots de passe correspondent
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || !isPasswordValid || !passwordsMatch
                    }
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
                        Réinitialisation...
                      </span>
                    ) : (
                      "RÉINITIALISER LE MOT DE PASSE"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
