"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Lock,
  Trash2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ParametresPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    events: true,
    newsletter: true,
    updates: false,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
  });
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("fr");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

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
              {[
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "security", label: "Sécurité", icon: Shield },
                { id: "privacy", label: "Confidentialité", icon: Eye },
                { id: "preferences", label: "Préférences", icon: Settings },
                { id: "danger", label: "Zone de danger", icon: AlertTriangle },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                    item.id === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </a>
              ))}
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
          {/* Notifications */}
          <section
            id="notifications"
            className="bg-white rounded-md border border-neutral-100 p-6"
          >
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary-500" />
              Notifications
            </h3>
            <div className="space-y-4">
              {/* Email notifications */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      Notifications par email
                    </p>
                    <p className="text-sm text-neutral-500">
                      Recevez les notifications importantes par email
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      email: !notifications.email,
                    })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications.email ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      notifications.email ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Push notifications */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      Notifications push
                    </p>
                    <p className="text-sm text-neutral-500">
                      Recevez des notifications sur votre appareil
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      push: !notifications.push,
                    })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications.push ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      notifications.push ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Event reminders */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <p className="font-medium text-neutral-900">
                    Rappels d&apos;événements
                  </p>
                  <p className="text-sm text-neutral-500">
                    Soyez notifié avant vos événements
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      events: !notifications.events,
                    })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications.events ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      notifications.events ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Newsletter */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-neutral-900">Newsletter</p>
                  <p className="text-sm text-neutral-500">
                    Recevez nos actualités et offres
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      newsletter: !notifications.newsletter,
                    })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    notifications.newsletter
                      ? "bg-primary-500"
                      : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      notifications.newsletter
                        ? "translate-x-7"
                        : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Security */}
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

              {/* Current password */}
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

              {/* New password */}
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

              {/* Confirm password */}
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

              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors">
                <Lock className="w-4 h-4" />
                Mettre à jour le mot de passe
              </button>
            </div>
          </section>

          {/* Privacy */}
          <section
            id="privacy"
            className="bg-white rounded-md border border-neutral-100 p-6"
          >
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-secondary-500" />
              Confidentialité
            </h3>
            <div className="space-y-4">
              {/* Profile public */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <p className="font-medium text-neutral-900">Profil public</p>
                  <p className="text-sm text-neutral-500">
                    Permettre aux autres membres de voir votre profil
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPrivacy({
                      ...privacy,
                      profilePublic: !privacy.profilePublic,
                    })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    privacy.profilePublic ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      privacy.profilePublic ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Show email */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <p className="font-medium text-neutral-900">
                    Afficher l&apos;email
                  </p>
                  <p className="text-sm text-neutral-500">
                    Rendre votre email visible sur votre profil
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPrivacy({ ...privacy, showEmail: !privacy.showEmail })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    privacy.showEmail ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      privacy.showEmail ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Show phone */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-neutral-900">
                    Afficher le téléphone
                  </p>
                  <p className="text-sm text-neutral-500">
                    Rendre votre téléphone visible sur votre profil
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPrivacy({ ...privacy, showPhone: !privacy.showPhone })
                  }
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    privacy.showPhone ? "bg-primary-500" : "bg-neutral-200"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                      privacy.showPhone ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section
            id="preferences"
            className="bg-white rounded-md border border-neutral-100 p-6"
          >
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-neutral-500" />
              Préférences
            </h3>
            <div className="space-y-4">
              {/* Theme */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  {theme === "light" ? (
                    <Sun className="w-5 h-5 text-secondary-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary-500" />
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">Thème</p>
                    <p className="text-sm text-neutral-500">
                      Choisissez l&apos;apparence de l&apos;interface
                    </p>
                  </div>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900">Langue</p>
                    <p className="text-sm text-neutral-500">
                      Choisissez la langue de l&apos;interface
                    </p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section
            id="danger"
            className="bg-white rounded-md border border-red-200 p-6"
          >
            <h3 className="font-semibold text-red-600 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" />
              Zone de danger
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Attention : Ces actions sont irréversibles. Veuillez procéder avec
              précaution.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer mon compte
            </button>
          </section>
        </motion.div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-md p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">
                  Supprimer le compte ?
                </h3>
                <p className="text-sm text-neutral-500">
                  Cette action est irréversible
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-6">
              Toutes vos données seront définitivement supprimées. Vous perdrez
              l&apos;accès à vos avantages et à votre historique.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-neutral-200 text-neutral-600 font-medium rounded-md hover:bg-neutral-50 transition-colors"
              >
                Annuler
              </button>
              <button className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors">
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
