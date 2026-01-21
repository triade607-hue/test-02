/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Edit3,
  Camera,
  Save,
  X,
  Globe,
  Linkedin,
  Twitter,
  Award,
  CheckCircle2,
  Loader2,
  Crown,
} from "lucide-react";

// Hooks
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";

// Utils
import { getFileUrl } from "@/lib/utils/image-url";

// ============================================================
// CONFIGURATION DES TIERS
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
// MOCK DATA - Champs non disponibles via API (address, company, etc.)
// ============================================================
const MOCK_STATIC = {
  address: "Cotonou, Bénin",
  company: "Tech Solutions SARL",
  position: "Directeur Technique",
  website: "https://jeandupont.com",
  linkedin: "jean-dupont",
  twitter: "@jeandupont",
  memberSince: "Janvier 2024",
  skills: [
    "Cloud Computing",
    "Intelligence Artificielle",
    "Gestion de projet",
    "Cybersécurité",
  ],
  certifications: [
    { name: "AWS Solutions Architect", date: "2023" },
    { name: "PMP Certified", date: "2022" },
  ],
};

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

  // Formulaire - Combine API data + MOCK data
  const [formData, setFormData] = useState({
    // Champs API
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    // Champs MOCK (statiques)
    address: MOCK_STATIC.address,
    company: MOCK_STATIC.company,
    position: MOCK_STATIC.position,
    website: MOCK_STATIC.website,
    linkedin: MOCK_STATIC.linkedin,
    twitter: MOCK_STATIC.twitter,
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
      setFormData((prev) => ({
        ...prev,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone
          ? `${profile.countryCode || ""} ${profile.phone}`
          : "",
        bio: profile.bio || "",
      }));
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
    // Extraire les champs API modifiables
    const apiPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      // Note: phone nécessite parsing pour séparer countryCode
    };

    const success = await updateProfile(apiPayload);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Réinitialiser avec les données actuelles
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone
          ? `${profile.countryCode || ""} ${profile.phone}`
          : "",
        bio: profile.bio || "",
      }));
    }
  };

  /**
   * Handler pour l'upload de photo
   * Envoie directement le File au hook
   */
  const handlePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Appel direct avec le File
      await uploadPicture(file);
      // Reset l'input pour permettre de re-sélectionner le même fichier
      e.target.value = "";
    }
  };

  // ==================== COMPUTED VALUES ====================

  // Logique Freemium / Membre
  const isFreemium =
    user?.role === "ROLE_GUEST" ||
    (!user?.memberType && !user?.membershipTierId);

  // Récupérer le tier config
  const tierKey = user?.membershipTierId?.toUpperCase() || "";
  const tierConfig = TIER_CONFIG[tierKey] || null;

  // Utiliser les données API si disponibles, sinon fallback
  const displayData = {
    firstName: profile?.firstName || user?.firstName || "Membre",
    lastName: profile?.lastName || user?.lastName || "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone
      ? `${profile.countryCode || "+229"} ${profile.phone}`
      : "",
    bio: profile?.bio || "",
    profilePicture: getFileUrl(profile?.profilePicture),
    // Membership - de l'API user
    isFreemium,
    tier: tierConfig?.label || null,
    tierColor: tierConfig?.color || "#9E9E9E",
    memberType: user?.memberType
      ? MEMBER_TYPE_LABELS[user.memberType] || user.memberType
      : null,
    // Données MOCK (pas d'API pour ces champs)
    ...MOCK_STATIC,
  };

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
          className="lg:col-span-1"
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
                        {displayData.firstName[0]}
                        {displayData.lastName[0]}
                      </div>
                    )}
                  </div>
                  {/* Bouton upload photo - visible uniquement en mode édition */}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white hover:bg-secondary-600 transition-colors cursor-pointer">
                      {isUploadingPicture ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handlePictureUpload}
                        className="hidden"
                        disabled={isUploadingPicture}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-16 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold text-neutral-900">
                {displayData.firstName} {displayData.lastName}
              </h2>
              <p className="text-neutral-600 text-sm mb-3">
                {displayData.position}
              </p>

              {/* Tier badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-md">
                {displayData.isFreemium ? (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-neutral-300 text-neutral-700">
                    Freemium
                  </span>
                ) : (
                  <>
                    {displayData.tier && (
                      <span
                        className="px-2 py-0.5 text-xs font-semibold rounded-md text-white"
                        style={{ backgroundColor: displayData.tierColor }}
                      >
                        {displayData.tier}
                      </span>
                    )}
                    {displayData.memberType && (
                      <span className="text-sm text-neutral-600">
                        {displayData.memberType}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* CTA Devenir membre pour Freemium */}
              {displayData.isFreemium && (
                <Link
                  href="/membership"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white text-sm font-semibold rounded-md transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  Devenir membre
                </Link>
              )}

              {/* Date inscription - Seulement pour membres */}
              {!displayData.isFreemium && displayData.memberSince && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-center gap-1 text-sm text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    Membre depuis {displayData.memberSince}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {displayData.website && (
                  <a
                    href={displayData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                {displayData.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${displayData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {displayData.twitter && (
                  <a
                    href={`https://twitter.com/${displayData.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-md border border-neutral-100 p-5 mt-4">
            <h3 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-secondary-500" />
              Certifications
            </h3>
            <div className="space-y-3">
              {displayData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-md"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">
                      {cert.name}
                    </p>
                    <p className="text-xs text-neutral-500">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Info */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prénom - API */}
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

              {/* Nom - API */}
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

              {/* Email - API (lecture seule) */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-900">{displayData.email}</span>
                </div>
              </div>

              {/* Téléphone - API */}
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
                      {displayData.phone}
                    </span>
                  </div>
                )}
              </div>

              {/* Adresse - MOCK (statique) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Adresse
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">
              Informations professionnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Entreprise - MOCK */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Entreprise
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <Building2 className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.company}
                    </span>
                  </div>
                )}
              </div>

              {/* Poste - MOCK */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Poste
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                    <Briefcase className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">
                      {displayData.position}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio - API */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-neutral-50 rounded-md">
                    <p className="text-neutral-900">{displayData.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills - MOCK */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {displayData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md"
                >
                  {skill}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1.5 border-2 border-dashed border-neutral-300 text-neutral-500 text-sm font-medium rounded-md hover:border-primary-500 hover:text-primary-500 transition-colors">
                  + Ajouter
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
