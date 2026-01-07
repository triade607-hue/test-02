"use client";

import { useState } from "react";
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
} from "lucide-react";

// Mock user data
const MOCK_USER = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@exemple.com",
  phone: "+229 97 00 00 00",
  address: "Cotonou, Bénin",
  company: "Tech Solutions SARL",
  position: "Directeur Technique",
  bio: "Passionné par l'innovation technologique et le développement de l'écosystème numérique africain. Plus de 10 ans d'expérience dans le secteur IT.",
  website: "https://jeandupont.com",
  linkedin: "jean-dupont",
  twitter: "@jeandupont",
  memberType: "Utilisateur",
  tier: "Sunun",
  tierColor: "#F9A825",
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: MOCK_USER.firstName,
    lastName: MOCK_USER.lastName,
    phone: MOCK_USER.phone,
    address: MOCK_USER.address,
    company: MOCK_USER.company,
    position: MOCK_USER.position,
    bio: MOCK_USER.bio,
    website: MOCK_USER.website,
    linkedin: MOCK_USER.linkedin,
    twitter: MOCK_USER.twitter,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Simulate save
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Modifier
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-600 font-medium rounded-md hover:bg-neutral-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white font-medium rounded-md hover:bg-accent-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-md border border-neutral-100 overflow-hidden">
            {/* Header gradient */}
            <div className="h-24 bg-gradient-to-r from-primary-500 to-accent-500 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
                      {MOCK_USER.firstName[0]}
                      {MOCK_USER.lastName[0]}
                    </div>
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white hover:bg-secondary-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-16 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold text-neutral-900">
                {MOCK_USER.firstName} {MOCK_USER.lastName}
              </h2>
              <p className="text-neutral-600 text-sm mb-3">
                {MOCK_USER.position}
              </p>

              {/* Tier badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-md">
                <span
                  className="px-2 py-0.5 text-xs font-semibold rounded-md text-white"
                  style={{ backgroundColor: MOCK_USER.tierColor }}
                >
                  {MOCK_USER.tier}
                </span>
                <span className="text-sm text-neutral-600">
                  {MOCK_USER.memberType}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-center gap-1 text-sm text-neutral-500">
                  <Calendar className="w-4 h-4" />
                  Membre depuis {MOCK_USER.memberSince}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {MOCK_USER.website && (
                  <a
                    href={MOCK_USER.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                {MOCK_USER.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${MOCK_USER.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {MOCK_USER.twitter && (
                  <a
                    href={`https://twitter.com/${MOCK_USER.twitter.replace("@", "")}`}
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
              {MOCK_USER.certifications.map((cert, index) => (
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
                      {MOCK_USER.firstName}
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
                      {MOCK_USER.lastName}
                    </span>
                  </div>
                )}
              </div>

              {/* Email (non modifiable) */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 rounded-md">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-900">{MOCK_USER.email}</span>
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
                    <span className="text-neutral-900">{MOCK_USER.phone}</span>
                  </div>
                )}
              </div>

              {/* Adresse */}
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
                      {MOCK_USER.address}
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
              {/* Entreprise */}
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
                      {MOCK_USER.company}
                    </span>
                  </div>
                )}
              </div>

              {/* Poste */}
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
                      {MOCK_USER.position}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
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
                    <p className="text-neutral-900">{MOCK_USER.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-md border border-neutral-100 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {MOCK_USER.skills.map((skill, index) => (
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
