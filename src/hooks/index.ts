// ============================================================
// HOOKS D'AUTHENTIFICATION - imo2tun
// ============================================================

// Hook principal
export { useAuth, default as useAuthHook } from "./use-auth";
export { useProfile } from "./use-profile";

// Hooks spécialisés
export { useLogin, default as useLoginHook } from "./use-login";
export { useRegister, default as useRegisterHook } from "./use-register";
export {
  usePasswordReset,
  default as usePasswordResetHook,
} from "./use-password-reset";
export {
  useSetupAccount,
  default as useSetupAccountHook,
} from "./use-setup-account";

// Hook de redirection (NOUVEAU)
export {
  useRedirectIfAuthenticated,
  default as useRedirectIfAuthenticatedHook,
} from "./use-redirect-if-authenticated";
