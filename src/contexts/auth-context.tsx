"use client";

// ============================================================
// CONTEXT D'AUTHENTIFICATION - imo2tun
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authService } from "@/lib/services/auth.service";
import { getAccessToken, clearTokens, STORAGE_KEYS } from "@/lib/api/client";
import type {
  UserProfile,
  AuthState,
  RegisterPayload,
  PreLoginPayload,
  LoginOTPPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ApiError,
} from "@/types/auth.types";

// ==================== TYPES ====================

interface AuthContextType extends AuthState {
  // Actions d'inscription
  register: (payload: RegisterPayload) => Promise<void>;
  setupAccount: (token: string) => Promise<void>;

  // Actions de connexion
  preLogin: (payload: PreLoginPayload) => Promise<string>; // Retourne preAuthToken
  loginWithOTP: (payload: LoginOTPPayload) => Promise<void>;
  logout: () => void;

  // Actions de mot de passe
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;

  // Utilitaires
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// ==================== CONTEXT ====================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==================== PROVIDER ====================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // État initial
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true, // True au démarrage pour vérifier la session
    error: null,
  });

  // ==================== HELPERS ====================

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  };

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const handleError = (err: unknown): string => {
    if ((err as ApiError).message) {
      return (err as ApiError).message;
    }
    if (err instanceof Error) {
      return err.message;
    }
    return "Une erreur inattendue est survenue";
  };

  // ==================== ACTIONS ====================

  /**
   * Inscription
   */
  const register = async (payload: RegisterPayload): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      await authService.register(payload);
      setLoading(false);
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Activation du compte
   */
  const setupAccount = async (token: string): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      await authService.setupAccount({ token });
      setLoading(false);
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Pré-connexion (étape 1)
   */
  const preLogin = async (payload: PreLoginPayload): Promise<string> => {
    setLoading(true);
    clearError();

    try {
      const response = await authService.preLogin(payload);
      setLoading(false);
      return response.preAuthToken;
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Connexion avec OTP (étape 2)
   */
  const loginWithOTP = async (payload: LoginOTPPayload): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      const response = await authService.loginWithOTP(payload);

      // Récupérer le profil
      const user = await authService.getProfile();

      setState({
        user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Sauvegarder le user dans le localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Déconnexion
   */
  const logout = useCallback(() => {
    authService.logout();
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  /**
   * Mot de passe oublié
   */
  const forgotPassword = async (
    payload: ForgotPasswordPayload
  ): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      await authService.forgotPassword(payload);
      setLoading(false);
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Réinitialisation du mot de passe
   */
  const resetPassword = async (
    payload: ResetPasswordPayload
  ): Promise<void> => {
    setLoading(true);
    clearError();

    try {
      await authService.resetPassword(payload);
      setLoading(false);
    } catch (err) {
      setError(handleError(err));
      throw err;
    }
  };

  /**
   * Rafraîchir les données utilisateur
   */
  const refreshUser = async (): Promise<void> => {
    try {
      const user = await authService.getProfile();
      setState((prev) => ({ ...prev, user }));
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      console.error("Erreur lors du rafraîchissement du profil:", err);
    }
  };

  // ==================== INITIALISATION ====================

  /**
   * Vérifier la session au chargement
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Essayer de récupérer le profil
        const user = await authService.getProfile();

        setState({
          user,
          accessToken: token,
          refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch {
        // Token invalide ou expiré
        clearTokens();
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    };

    initAuth();
  }, []);

  // ==================== RENDER ====================

  const value: AuthContextType = {
    ...state,
    register,
    setupAccount,
    preLogin,
    loginWithOTP,
    logout,
    forgotPassword,
    resetPassword,
    refreshUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ==================== HOOK ====================

/**
 * Hook pour accéder au contexte d'authentification
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext doit être utilisé dans un AuthProvider");
  }

  return context;
}

export default AuthContext;
