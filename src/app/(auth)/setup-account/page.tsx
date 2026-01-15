"use client";

import { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, AlertCircle, Mail, Loader2 } from "lucide-react";

// Hook d'authentification
import { useSetupAccount } from "@/hooks";

function SetupAccountContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  // Hook sans auto-activation
  const { step, isLoading, error, successMessage, activateAccount } =
    useSetupAccount();

  // Ref pour s'assurer qu'on appelle qu'une seule fois
  const hasCalledRef = useRef(false);

  // Déclencher l'activation au montage (une seule fois)
  useEffect(() => {
    if (token && !hasCalledRef.current) {
      hasCalledRef.current = true;
      // L'appel async ne pose pas de problème car il ne fait pas de setState synchrone
      activateAccount(token);
    }
  }, [token, activateAccount]);

  // Si pas de token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-md shadow-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Lien invalide
          </h2>
          <p className="text-neutral-600 mb-6">
            Le lien d&apos;activation est invalide ou a expiré.
          </p>
          <div className="space-y-3">
            <Link
              href="/register"
              className="block w-full px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              S&apos;inscrire à nouveau
            </Link>
            <Link
              href="/login"
              className="block w-full px-6 py-2.5 bg-white border-2 border-neutral-200 text-neutral-700 text-sm font-semibold rounded-md hover:bg-neutral-50 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Déterminer l'état d'affichage
  const showLoading = step === "idle" || step === "loading" || isLoading;
  const showSuccess = step === "success" && !isLoading;
  const showError = step === "error" && !isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel - Branding */}
        <div className="relative hidden md:flex md:w-[45%] md:min-h-[400px] text-white flex-col overflow-hidden">
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
          <div
            className={`absolute inset-0 ${
              showSuccess
                ? "bg-accent-500/95"
                : showError
                  ? "bg-red-500/95"
                  : "bg-primary-600/95"
            }`}
          />

          {/* Cercles décoratifs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border-[30px] border-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 border-[40px] border-white/10 rounded-full" />

          {/* Contenu */}
          <div className="relative z-10 p-8 flex flex-col h-full">
            {/* Contenu centré */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {showLoading && (
                <>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Activation en cours...
                  </h3>
                  <p className="text-white/80 text-center text-sm max-w-xs">
                    Veuillez patienter pendant que nous activons votre compte.
                  </p>
                </>
              )}

              {showSuccess && (
                <>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Bienvenue chez imo2tun !
                  </h3>
                  <p className="text-white/80 text-center text-sm max-w-xs">
                    Votre compte a été activé avec succès. Vos identifiants de
                    connexion ont été envoyés par email.
                  </p>
                </>
              )}

              {showError && (
                <>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    Échec de l&apos;activation
                  </h3>
                  <p className="text-white/80 text-center text-sm max-w-xs">
                    Le lien d&apos;activation est peut-être invalide ou a
                    expiré.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 md:px-8 md:pt-8 md:pb-0 border-b border-neutral-100 md:border-none">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              {showLoading && "Activation du compte"}
              {showSuccess && "Compte activé !"}
              {showError && "Erreur d'activation"}
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6 md:px-8 md:pb-8 md:pt-6 flex flex-col items-center justify-center">
            {/* Loading */}
            {showLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Activation en cours...
                </h3>
                <p className="text-neutral-600 text-sm">
                  Veuillez patienter quelques instants.
                </p>
              </motion.div>
            )}

            {/* Success */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 w-full max-w-sm"
              >
                <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Compte activé avec succès !
                </h3>
                <p className="text-neutral-600 mb-6">
                  {successMessage ||
                    "Vos identifiants de connexion ont été envoyés par email."}
                </p>

                <div className="p-4 bg-primary-50 border border-primary-100 rounded-md mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <p className="text-sm text-primary-700 text-left">
                      Consultez votre boîte email pour récupérer vos
                      identifiants de connexion.
                    </p>
                  </div>
                </div>

                <Link
                  href="/login"
                  className="block w-full px-6 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
                >
                  Se connecter
                </Link>
              </motion.div>
            )}

            {/* Error */}
            {showError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 w-full max-w-sm"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Échec de l&apos;activation
                </h3>
                <p className="text-neutral-600 mb-6">
                  {error ||
                    "Le lien d'activation est invalide ou a expiré. Veuillez vous inscrire à nouveau."}
                </p>

                <div className="space-y-3">
                  <Link
                    href="/register"
                    className="block w-full px-6 py-3 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700 transition-colors"
                  >
                    S&apos;inscrire à nouveau
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full px-6 py-3 bg-white border-2 border-neutral-200 text-neutral-700 text-sm font-semibold rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    Se connecter
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SetupAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-600">Chargement...</p>
          </div>
        </div>
      }
    >
      <SetupAccountContent />
    </Suspense>
  );
}
