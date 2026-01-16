// ============================================================
// SERVICES - imo2tun
// ============================================================

// Service d'authentification
export {
  authService,
  register,
  setupAccount,
  preLogin,
  loginWithOTP,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getProfile,
} from "./auth.service";

export {
  profileService,
  updateProfile,
  uploadProfilePicture,
  changePassword,
} from "./profile.service";
