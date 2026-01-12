/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, Shield, Check, RefreshCw } from "lucide-react";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer pour le renvoi du code
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Focus sur le premier input au chargement
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Accepter seulement les chiffres
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];

    // Si on colle plusieurs chiffres
    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus sur le dernier champ rempli ou le suivant
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus sur le champ suivant
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    setError("");
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Supprimer et revenir au champ précédent
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Navigation avec les flèches
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setError("");

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Afficher un message de succès temporaire
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Veuillez entrer le code complet à 6 chiffres.");
      return;
    }

    setIsSubmitting(true);

    // Simulation de vérification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulation : code correct = 123456
    if (code === "123456") {
      setIsSuccess(true);
    } else {
      setError("Code incorrect. Veuillez réessayer.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setIsSubmitting(false);
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel - Branding */}
        <div className="relative hidden md:flex md:w-[45%] md:min-h-[500px] text-white flex-col overflow-hidden">
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
                <Shield className="w-8 h-8 text-white" />
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-center mb-4">
                Vérification en deux étapes
              </h3>

              {/* Description */}
              <p className="text-white/80 text-center text-sm max-w-xs">
                Pour protéger votre compte, nous avons besoin de vérifier votre
                identité avec un code de sécurité.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 md:border-none px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              Vérification 2FA
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
                  Vérification réussie !
                </h3>
                <p className="text-neutral-600 text-center mb-6">
                  Vous êtes maintenant connecté à votre compte.
                </p>
                <Link
                  href="/membre"
                  className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
                >
                  Accéder à mon espace
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <p className="text-neutral-600 text-sm mb-2">
                    Entrez le code à 6 chiffres envoyé à votre
                  </p>
                  <p className="text-primary-600 font-medium">
                    adresse e-mail / téléphone
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* OTP Inputs */}
                <div
                  className="flex justify-center gap-3"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ${
                        digit
                          ? "border-primary-300 bg-primary-50"
                          : "border-neutral-200 bg-white"
                      } ${error ? "border-red-300 bg-red-50" : ""}`}
                    />
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isComplete}
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
                        Vérification...
                      </span>
                    ) : (
                      "VÉRIFIER"
                    )}
                  </button>
                </div>

                {/* Resend code */}
                <div className="text-center">
                  <p className="text-sm text-neutral-500 mb-2">
                    Vous n&apos;avez pas reçu le code ?
                  </p>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-sm text-primary-600 hover:underline font-medium flex items-center justify-center gap-2 mx-auto"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Renvoyer le code
                    </button>
                  ) : (
                    <p className="text-sm text-neutral-400">
                      Renvoyer dans{" "}
                      <span className="font-medium text-neutral-600">
                        {resendTimer}s
                      </span>
                    </p>
                  )}
                </div>

                {/* Alternative options */}
                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500 text-center">
                    Problème d&apos;accès ?{" "}
                    <Link
                      href="/contact"
                      className="text-primary-600 hover:underline"
                    >
                      Contactez le support
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
