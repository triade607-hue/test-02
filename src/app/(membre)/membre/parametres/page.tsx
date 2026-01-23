"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Trash2,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Smartphone,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils/format-validation";
import { useProfile } from "@/hooks/use-profile";

// ============================================================
// COMPOSANT BADGE "BIENTÔT DISPONIBLE"
// ============================================================
function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700 border border-amber-200">
      <Clock className="w-3 h-3" />
      Bientôt
    </span>
  );
}

// ============================================================
// COMPOSANT SECTION DÉSACTIVÉE
// ============================================================
function DisabledSection({
  id,
  title,
  icon: Icon,
  iconColor,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative bg-white rounded-md border border-neutral-100 p-6 opacity-60"
    >
      <div className="absolute inset-0 z-10 cursor-not-allowed rounded-md" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-500 flex items-center gap-2">
          <Icon className={cn("w-5 h-5", iconColor)} />
          {title}
        </h3>
        <ComingSoonBadge />
      </div>
      <div className="text-neutral-400">{children}</div>
    </section>
  );
}

// ============================================================
// NAVIGATION CONFIG
// ============================================================
const NAV_ITEMS = [
  { id: "security", label: "Sécurité", icon: Shield, available: true },
  { id: "notifications", label: "Notifications", icon: Bell, available: false },
  { id: "privacy", label: "Confidentialité", icon: Eye, available: false },
  { id: "preferences", label: "Préférences", icon: Settings, available: false },
  {
    id: "danger",
    label: "Zone de danger",
    icon: AlertTriangle,
    available: false,
  },
];

// ============================================================
// PAGE PARAMÈTRES
// ============================================================
export default function ParametresPage() {
  // Hook pour le changement de mot de passe
  const {
    isChangingPassword,
    error,
    successMessage,
    changePassword,
    clearError,
    clearSuccessMessage,
  } = useProfile();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Handler pour soumettre le changement de mot de passe
  const handlePasswordSubmit = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      return;
    }

    const success = await changePassword({
      currentPassword: passwordForm.current,
      newPassword: passwordForm.new,
      confirmPassword: passwordForm.confirm,
    });

    if (success) {
      setPasswordForm({ current: "", new: "", confirm: "" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Paramètres</h1>
        <p className="text-neutral-600">
          Gérez vos préférences et la sécurité de votre compte
        </p>
      </motion.div>

      {/* Messages de feedback */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-accent-50 border border-accent-200 rounded-md text-accent-700 text-sm"
        >
          {successMessage}
          <button
            onClick={clearSuccessMessage}
            className="ml-2 text-accent-500 hover:text-accent-700"
          >
            ×
          </button>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm"
        >
          {error}
          <button
            onClick={clearError}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-md border border-neutral-100 p-2">
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) =>
                item.available ? (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                      item.id === "danger"
                        ? "text-red-600 hover:bg-red-50"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-neutral-400 cursor-not-allowed"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    <ComingSoonBadge />
                  </div>
                ),
              )}
            </nav>
          </div>
        </motion.div>

        {/* Right Column - Settings Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* ==================== SÉCURITÉ (FONCTIONNEL) ==================== */}
          <section
            id="security"
            className="bg-white rounded-md border border-neutral-100 p-6"
          >
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent-500" />
              Sécurité
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 mb-4">
                Modifiez votre mot de passe pour sécuriser votre compte
              </p>

              {/* Mot de passe actuel */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.current}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        current: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 pr-12 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Nouveau mot de passe */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirm: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handlePasswordSubmit}
                disabled={isChangingPassword}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {isChangingPassword
                  ? "Mise à jour..."
                  : "Mettre à jour le mot de passe"}
              </button>
            </div>
          </section>

          {/* ==================== NOTIFICATIONS (BIENTÔT) ==================== */}
          <DisabledSection
            id="notifications"
            title="Notifications"
            icon={Bell}
            iconColor="text-primary-500"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Notifications par email</span>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm">Notifications push</span>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span className="text-sm">Rappels d&apos;événements</span>
              </div>
            </div>
          </DisabledSection>

          {/* ==================== CONFIDENTIALITÉ (BIENTÔT) ==================== */}
          <DisabledSection
            id="privacy"
            title="Confidentialité"
            icon={Eye}
            iconColor="text-secondary-500"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm">Profil public</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">Afficher l&apos;email</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">Afficher le téléphone</span>
              </div>
            </div>
          </DisabledSection>

          {/* ==================== PRÉFÉRENCES (BIENTÔT) ==================== */}
          <DisabledSection
            id="preferences"
            title="Préférences"
            icon={Globe}
            iconColor="text-accent-500"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm">Thème : Clair</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">Langue : Français</span>
              </div>
            </div>
          </DisabledSection>

          {/* ==================== ZONE DE DANGER (BIENTÔT) ==================== */}
          <DisabledSection
            id="danger"
            title="Zone de danger"
            icon={AlertTriangle}
            iconColor="text-red-500"
          >
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-neutral-500 text-sm">
                  Supprimer mon compte
                </p>
                <p className="text-xs text-neutral-400">
                  Supprime définitivement votre compte et toutes vos données
                </p>
              </div>
              <button
                disabled
                className="px-4 py-2 bg-neutral-100 text-neutral-400 font-medium rounded-md cursor-not-allowed flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          </DisabledSection>
        </motion.div>
      </div>
    </div>
  );
}
