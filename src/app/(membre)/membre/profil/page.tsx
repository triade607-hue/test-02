/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Camera,
  Edit3,
  Save,
  X,
  Loader2,
  Crown,
  Clock,
  Briefcase,
  MapPin,
  Globe,
  Award,
} from "lucide-react";
import { getFileUrl } from "@/lib/utils/image-url";

// Hooks
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";

// ============================================================
// CONFIGURATION
// ============================================================
const TIER_CONFIG: Record<string, { label: string; color: string }> = {
  ASUKA: { label: "Asuka", color: "#26A69A" },
  SUNUN: { label: "Sunun", color: "#F9A825" },
  MINDAHO: { label: "Mindaho", color: "#0077B6" },
  DAH: { label: "Dah", color: "#7B1FA2" },
};

const MEMBER_TYPE_LABELS: Record<string, string> = {
  OFFREUR: "Offreur",
  UTILISATEUR: "Utilisateur",
  CONTRIBUTEUR: "Contributeur",
  PARTENAIRE: "Partenaire",
};

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
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white rounded-md border border-neutral-100 p-5 opacity-60">
      <div className="absolute inset-0 z-10 cursor-not-allowed" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-500 flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </h3>
        <ComingSoonBadge />
      </div>
      <div className="text-neutral-400">{children}</div>
    </div>
  );
}

// ============================================================
// PAGE PROFIL
// ============================================================
export default function MonProfilPage() {
  // ==================== HOOKS ====================
  const { user, isAuthenticated } = useAuth();
  const {
    profile,
    isLoading,
    isUpdating,
    isUploadingPicture,
    error,
    successMessage,
    fetchProfile,
    updateProfile,
    uploadPicture,
    clearError,
    clearSuccessMessage,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  // Formulaire - Champs API uniquement
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
  });

  // ==================== EFFECTS ====================

  // Charger le profil au montage
  useEffect(() => {
    if (isAuthenticated && !profile) {
      fetchProfile();
    }
  }, [isAuthenticated, profile, fetchProfile]);

  // Synchroniser formData avec le profil API
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone
          ? `${profile.countryCode || ""} ${profile.phone}`
          : "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  // Auto-clear messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(clearSuccessMessage, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // ==================== HANDLERS ====================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const apiPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
    };

    const success = await updateProfile(apiPayload);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone
          ? `${profile.countryCode || ""} ${profile.phone}`
          : "",
        bio: profile.bio || "",
      });
    }
  };

  const handlePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPicture(file);
      e.target.value = "";
    }
  };

  // ==================== COMPUTED VALUES ====================

  const isFreemium =
    user?.role === "ROLE_GUEST" ||
    (!user?.memberType && !user?.membershipTierId);

  const tierKey = user?.membershipTierId?.toUpperCase() || "";
  const tierConfig = TIER_CONFIG[tierKey] || null;

  const displayData = {
    firstName: profile?.firstName || user?.firstName || "Membre",
    lastName: profile?.lastName || user?.lastName || "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone
      ? `${profile.countryCode || "+229"} ${profile.phone}`
      : "",
    bio: profile?.bio || "",
    profession: profile?.profession || user?.profession || "",
    profilePicture: getFileUrl(profile?.profilePicture),
    isFreemium,
    tier: tierConfig?.label || null,
    tierColor: tierConfig?.color || "#9E9E9E",
    memberType: user?.memberType
      ? MEMBER_TYPE_LABELS[user.memberType] || user.memberType
      : null,
  };

  // Initiales
  const initials =
    `${displayData.firstName.charAt(0)}${displayData.lastName.charAt(0)}`.toUpperCase();

  // ==================== LOADING STATE ====================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* Messages de feedback */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm"
        >
          {successMessage}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Mon profil
          </h1>
          <p className="text-neutral-600">
            Gérez vos informations personnelles
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Modifier
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Enregistrer
            </button>
          </div>
        )}
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1 space-y-4"
        >
          {/* Profile Card */}
          <div className="bg-white rounded-md border border-neutral-100 overflow-hidden">
            {/* Header Gradient */}
            <div className="h-24 bg-gradient-to-r from-primary-500 to-accent-500 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white p-1">
                    {displayData.profilePicture ? (
                      <img
                        src={displayData.profilePicture}
                        alt={`${displayData.firstName} ${displayData.lastName}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
                        {initials}
                      </div>
                    )}
                  </div>
                  {/* Bouton upload photo */}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white hover:bg-secondary-600 transition-colors cursor-pointer">
                      {isUploadingPicture ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureUpload}
                        className="hidden"
                        disabled={isUploadingPicture}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="pt-14 pb-5 px-5 text-center">
              <h2 className="text-xl font-bold text-neutral-900">
                {displayData.firstName} {displayData.lastName}
              </h2>
              {displayData.profession && (
                <p className="text-neutral-500 text-sm mt-1">
                  {displayData.profession}
                </p>
              )}

              {/* Badges */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {displayData.isFreemium ? (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600">
                    Freemium
                  </span>
                ) : (
                  <>
                    {displayData.tier && (
                      <span
                        className="px-3 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: displayData.tierColor }}
                      >
                        {displayData.tier}
                      </span>
                    )}
                    {displayData.memberType && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                        {displayData.memberType}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* CTA Devenir membre */}
              {displayData.isFreemium && (
                <a
                  href="/membership"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white text-sm font-semibold rounded-md transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  Devenir membre
                </a>
              )}
            </div>
          </div>

          {/* Sections Coming Soon */}
          <DisabledSection title="Compétences" icon={Award}>
            <p className="text-sm">Vos compétences et certifications</p>
          </DisabledSection>

          <DisabledSection title="Réseaux sociaux" icon={Globe}>
            <p className="text-sm">LinkedIn, Twitter, Site web</p>
          </DisabledSection>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Informations personnelles - API */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Prénom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <User className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.firstName}
                    </span>
                  </div>
                )}
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <User className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.lastName}
                    </span>
                  </div>
                )}
              </div>

              {/* Email - lecture seule */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-900">{displayData.email}</span>
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Téléphone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.phone || "Non renseigné"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Biographie</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Présentez-vous en quelques mots..."
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-neutral-700">
                {displayData.bio || "Aucune biographie renseignée."}
              </p>
            )}
          </div>

          {/* Sections Coming Soon */}
          <DisabledSection
            title="Informations professionnelles"
            icon={Briefcase}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-400 mb-1">Entreprise</p>
                <p className="text-sm">-</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">Poste</p>
                <p className="text-sm">-</p>
              </div>
            </div>
          </DisabledSection>

          <DisabledSection title="Adresse" icon={MapPin}>
            <p className="text-sm">Ville, Pays</p>
          </DisabledSection>
        </motion.div>
      </div>
    </div>
  );
}
