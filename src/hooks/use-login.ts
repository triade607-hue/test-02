"use client";

// ============================================================
// HOOK useLogin - Gestion du login en 2 étapes
// ============================================================

import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";
import type { LoginState } from "@/types/auth.types";

interface UseLoginReturn extends LoginState {
  // Actions
  submitCredentials: (email: string, password: string) => Promise<void>;
  submitOTP: (otpCode: string) => Promise<void>;
  resendOTP: () => Promise<void>;
  reset: () => void;

  // État additionnel
  email: string;
}

/**
 * Hook pour gérer le processus de login en 2 étapes
 * Étape 1: Email + Mot de passe → reçoit preAuthToken
 * Étape 2: Code OTP → connexion finale
 */
export function useLogin(): UseLoginReturn {
  const { preLogin, loginWithOTP } = useAuth();

  // État local du processus de login
  const [state, setState] = useState<LoginState>({
    step: "credentials",
    preAuthToken: null,
    isLoading: false,
    error: null,
  });

  // Email stocké pour le resend
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  /**
   * Étape 1: Soumettre les identifiants
   */
  const submitCredentials = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Sauvegarder les credentials pour un éventuel resend
        setCredentials({ email, password });

        // Appeler le preLogin
        const preAuthToken = await preLogin({ email, password });

        // Passer à l'étape OTP
        setState({
          step: "otp",
          preAuthToken,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : "Identifiants incorrects",
        }));
      }
    },
    [preLogin]
  );

  /**
   * Étape 2: Soumettre le code OTP
   */
  const submitOTP = useCallback(
    async (otpCode: string) => {
      if (!state.preAuthToken) {
        setState((prev) => ({
          ...prev,
          error: "Session expirée, veuillez recommencer",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await loginWithOTP({
          preAuthToken: state.preAuthToken,
          otpCode,
        });

        // Succès - le contexte gère la redirection
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : "Code OTP invalide",
        }));
      }
    },
    [state.preAuthToken, loginWithOTP]
  );

  /**
   * Renvoyer le code OTP (refaire le preLogin)
   */
  const resendOTP = useCallback(async () => {
    if (!credentials.email || !credentials.password) {
      setState((prev) => ({
        ...prev,
        error: "Session expirée, veuillez recommencer",
        step: "credentials",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const preAuthToken = await preLogin({
        email: credentials.email,
        password: credentials.password,
      });

      setState((prev) => ({
        ...prev,
        preAuthToken,
        isLoading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Erreur lors du renvoi",
      }));
    }
  }, [credentials, preLogin]);

  /**
   * Réinitialiser le processus
   */
  const reset = useCallback(() => {
    setState({
      step: "credentials",
      preAuthToken: null,
      isLoading: false,
      error: null,
    });
    setCredentials({ email: "", password: "" });
  }, []);

  return {
    ...state,
    email: credentials.email,
    submitCredentials,
    submitOTP,
    resendOTP,
    reset,
  };
}

export default useLogin;
