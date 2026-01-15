"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";

// Hook d'authentification
import { useLogin } from "@/hooks";

export default function LoginPage() {
  const router = useRouter();
  const {
    step,
    isLoading,
    error,
    email,
    submitCredentials,
    submitOTP,
    resendOTP,
    reset,
  } = useLogin();

  // États locaux pour les formulaires
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [otpCode, setOtpCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Gestion du changement des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission des identifiants (étape 1)
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCredentials(formData.email, formData.password);
  };

  // Soumission du code OTP (étape 2)
  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOTP(otpCode);
    // La redirection est gérée dans le context après succès
    router.push("/membre");
  };

  // Renvoi du code OTP
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    await resendOTP();
    setResendCooldown(60);

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Retour à l'étape 1
  const handleBackToCredentials = () => {
    reset();
    setOtpCode("");
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
          <div className="absolute inset-0 bg-accent-500/95" />

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
              <AnimatePresence mode="wait">
                {step === "credentials" ? (
                  <motion.div
                    key="credentials-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      Bon retour parmi nous !
                    </h3>
                    <p className="text-white/80 text-sm max-w-xs">
                      Connectez-vous pour accéder à votre espace personnel et
                      profiter de tous vos avantages membre.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Vérification 2FA
                    </h3>
                    <p className="text-white/80 text-sm max-w-xs">
                      Un code de vérification a été envoyé à votre adresse email
                      pour sécuriser votre connexion.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 md:px-8 md:pt-8 md:pb-0 flex items-center justify-between border-b border-neutral-100 md:border-none">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              {step === "credentials" ? "Connexion" : "Vérification 2FA"}
            </h2>
            <Link
              href="/"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Form */}
          <div className="flex-1 px-6 py-6 md:px-8 md:pb-8 md:pt-6">
            <AnimatePresence mode="wait">
              {step === "credentials" ? (
                <motion.form
                  key="credentials-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleCredentialsSubmit}
                  className="space-y-5"
                >
                  {/* Message d'erreur */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Adresse e-mail
                      <span className="text-secondary-500">*</span>
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
                        placeholder="••••••••"
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

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-neutral-600"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary-600 hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
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
                          Connexion...
                        </span>
                      ) : (
                        "SE CONNECTER"
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
                        Pas encore membre ?
                      </span>
                    </div>
                  </div>

                  {/* Register Link */}
                  <Link
                    href="/register"
                    className="block w-full px-5 py-3 bg-white border-2 border-secondary-500 text-secondary-500 text-sm font-semibold rounded-md hover:bg-secondary-500 hover:text-white transition-colors text-center"
                  >
                    CRÉER UN COMPTE
                  </Link>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleOTPSubmit}
                  className="space-y-5"
                >
                  {/* Bouton retour */}
                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Retour</span>
                  </button>

                  {/* Message d'erreur */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-4 bg-primary-50 border border-primary-100 rounded-md">
                    <p className="text-sm text-primary-700">
                      Un code de vérification à 6 chiffres a été envoyé à{" "}
                      <span className="font-semibold">{email}</span>
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Code de vérification
                      <span className="text-secondary-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) =>
                        setOtpCode(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      required
                      maxLength={6}
                      placeholder="000000"
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-md text-neutral-900 text-center text-2xl tracking-[0.5em] font-mono placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length !== 6}
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
                          Vérification...
                        </span>
                      ) : (
                        "VÉRIFIER"
                      )}
                    </button>
                  </div>

                  {/* Resend */}
                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-2">
                      Vous n&apos;avez pas reçu le code ?
                    </p>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendCooldown > 0}
                      className="text-sm text-primary-600 hover:underline disabled:text-neutral-400 disabled:no-underline"
                    >
                      {resendCooldown > 0
                        ? `Renvoyer dans ${resendCooldown}s`
                        : "Renvoyer le code"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
