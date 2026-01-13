/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  Building2,
  User,
  CreditCard,
  MessageSquare,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { NewsletterBanner } from "@/components/layout/newsletter-banner";
import { Button } from "@/components/ui";

// Data
import { memberTypes, membershipTiers } from "@/lib/data/membership";
import { COUNTRIES, PROFESSIONS } from "@/lib/data";

// Types
type MemberTypeId = "offreur" | "utilisateur" | "contributeur" | "partenaire";
type TierId = "asuka" | "sunun" | "mindaho" | "dah";
type Duration = 1 | 2 | 5;

interface FormData {
  // Adhésion (en premier)
  adhesion: {
    type: MemberTypeId;
    tier: TierId;
    duration: Duration;
  };
  // Organisation (pour offreur, utilisateur, partenaire)
  organisation: {
    nom: string;
    secteur: string;
    email: string;
    telephone: string;
    effectif: string;
    adresse: string;
    ville: string;
    pays: string;
    logo: File | null;
  };
  // Référent / Contributeur info
  referent: {
    civilite: string;
    nom: string;
    prenom: string;
    fonction: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    pays: string;
    // Champs spécifiques contributeur
    expertise: string;
    linkedin: string;
  };
  // Facturation
  facturation: {
    demanderDevis: boolean;
    emailDevis: string;
    adresse: string;
    email: string;
    telephone: string;
    adresseComplete: string;
    ville: string;
    pays: string;
  };
  // Commentaires
  commentaires: string;
  // Acceptations
  accepteReglement: boolean;
  accepteNewsletter: boolean;
}

function CandidaturePageContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoFileName, setLogoFileName] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    adhesion: {
      type: "utilisateur",
      tier: "sunun",
      duration: 1,
    },
    organisation: {
      nom: "",
      secteur: "",
      email: "",
      telephone: "",
      effectif: "",
      adresse: "",
      ville: "",
      pays: "",
      logo: null,
    },
    referent: {
      civilite: "",
      nom: "",
      prenom: "",
      fonction: "",
      email: "",
      telephone: "",
      adresse: "",
      ville: "",
      pays: "",
      expertise: "",
      linkedin: "",
    },
    facturation: {
      demanderDevis: false,
      emailDevis: "",
      adresse: "",
      email: "",
      telephone: "",
      adresseComplete: "",
      ville: "",
      pays: "",
    },
    commentaires: "",
    accepteReglement: false,
    accepteNewsletter: false,
  });

  // Pré-remplir le formulaire avec les query params
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const tierParam = searchParams.get("tier");

    if (typeParam || tierParam) {
      setFormData((prev) => ({
        ...prev,
        adhesion: {
          ...prev.adhesion,
          type: (typeParam as MemberTypeId) || prev.adhesion.type,
          tier: (tierParam as TierId) || prev.adhesion.tier,
        },
      }));
    }
  }, [searchParams]);

  // Vérifier si c'est un type organisation (pas contributeur)
  const isOrganisation = formData.adhesion.type !== "contributeur";

  // Obtenir les tiers pour le type sélectionné
  const currentTiers = membershipTiers[formData.adhesion.type] || [];

  // Calculer le prix total
  const priceCalculation = useMemo(() => {
    const tier = currentTiers.find((t) => t.id === formData.adhesion.tier);
    if (!tier) {
      return {
        total: 0,
        currency: "FCFA",
      };
    }

    // Convertir le prix string en nombre
    const basePrice = parseInt(tier.price.replace(/\./g, ""), 10);
    const duration = formData.adhesion.duration;
    const total = basePrice * duration;

    return {
      total,
      currency: tier.currency,
    };
  }, [currentTiers, formData.adhesion.tier, formData.adhesion.duration]);

  // Formater le prix
  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-FR");
  };

  // Handlers
  const handleAdhesionChange = (
    field: keyof FormData["adhesion"],
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      adhesion: { ...prev.adhesion, [field]: value },
    }));
  };

  const handleOrganisationChange = (
    field: keyof FormData["organisation"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      organisation: { ...prev.organisation, [field]: value },
    }));
  };

  const handleReferentChange = (
    field: keyof FormData["referent"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      referent: { ...prev.referent, [field]: value },
    }));
  };

  const handleFacturationChange = (
    field: keyof FormData["facturation"],
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      facturation: { ...prev.facturation, [field]: value },
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        organisation: { ...prev.organisation, logo: file },
      }));
      setLogoFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        <HeroSecondary title="Adhérer" backgroundImage="/images/hero-bg.png" />

        <section className="py-20 lg:py-32 bg-neutral-50">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 bg-[#26A69A] rounded-full flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4"
            >
              Candidature envoyée avec succès !
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-600 mb-8"
            >
              Merci pour votre demande d&apos;adhésion. Notre équipe examinera
              votre candidature et vous contactera sous 48h.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/">
                <Button variant="primary">Retour à l&apos;accueil</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <NewsletterBanner />
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <HeroSecondary title="Adhérer" backgroundImage="/images/hero-bg.png" />

      {/* Breadcrumb */}
      <div className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Accueil
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <Link
                href="/membership"
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Adhérer
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-secondary-500 font-medium">
                Formulaire d&apos;adhésion
              </span>
            </nav>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-10"
          >
            Formulaire d&apos;adhésion
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ========== SECTION 1: Type d'adhésion et cotisation ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-md p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F9A825]/10 rounded-md flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#F9A825]" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">
                    Type d&apos;adhésion et cotisation
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Choisissez votre formule d&apos;adhésion
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Type de membre */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Type de membre<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.adhesion.type}
                    onChange={(e) =>
                      handleAdhesionChange(
                        "type",
                        e.target.value as MemberTypeId
                      )
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    {memberTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tier */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Niveau d&apos;adhésion
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.adhesion.tier}
                    onChange={(e) =>
                      handleAdhesionChange("tier", e.target.value as TierId)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    {currentTiers.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.name} - {tier.price} {tier.currency}/an
                      </option>
                    ))}
                  </select>
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Durée d&apos;abonnement
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.adhesion.duration}
                    onChange={(e) =>
                      handleAdhesionChange(
                        "duration",
                        parseInt(e.target.value) as Duration
                      )
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    <option value={1}>1 an</option>
                    <option value={2}>2 ans</option>
                    <option value={5}>5 ans</option>
                  </select>
                </div>

                {/* Prix total */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Total à payer
                  </label>
                  <div className="px-4 py-1.5 bg-gradient-to-r from-[#0077B6]/10 to-[#26A69A]/10 rounded-md border border-[#0077B6]/20">
                    <p className="text-md  text-[#000000]">
                      {formatPrice(priceCalculation.total)}{" "}
                      <span className="text-sm font-normal">
                        {priceCalculation.currency}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description du type sélectionné */}
              <div className="mt-6 p-4 bg-[#FFF8E1] rounded-md">
                <p className="text-sm text-neutral-700">
                  {
                    memberTypes.find((t) => t.id === formData.adhesion.type)
                      ?.description
                  }
                </p>
              </div>
            </motion.div>

            {/* ========== SECTION 2: Organisation (si pas contributeur) ========== */}
            <AnimatePresence mode="wait">
              {isOrganisation && (
                <motion.div
                  key="organisation"
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-md p-6 md:p-8 shadow-sm overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#0077B6]/10 rounded-md flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900">
                        Informations de l&apos;Organisation
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Renseignez les informations de votre structure
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Nom Société/organisation
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={isOrganisation}
                        value={formData.organisation.nom}
                        onChange={(e) =>
                          handleOrganisationChange("nom", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Secteur d&apos;activité
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={isOrganisation}
                        value={formData.organisation.secteur}
                        onChange={(e) =>
                          handleOrganisationChange("secteur", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Adresse e-mail professionnelle
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required={isOrganisation}
                        value={formData.organisation.email}
                        onChange={(e) =>
                          handleOrganisationChange("email", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Téléphone<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required={isOrganisation}
                        value={formData.organisation.telephone}
                        onChange={(e) =>
                          handleOrganisationChange("telephone", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Effectif Société/Organisation
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        required={isOrganisation}
                        value={formData.organisation.effectif}
                        onChange={(e) =>
                          handleOrganisationChange("effectif", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      >
                        <option value="">Sélectionner</option>
                        <option value="1-10">1 - 10 employés</option>
                        <option value="11-50">11 - 50 employés</option>
                        <option value="51-200">51 - 200 employés</option>
                        <option value="201-500">201 - 500 employés</option>
                        <option value="500+">Plus de 500 employés</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.organisation.adresse}
                        onChange={(e) =>
                          handleOrganisationChange("adresse", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={formData.organisation.ville}
                        onChange={(e) =>
                          handleOrganisationChange("ville", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Pays<span className="text-red-500">*</span>
                      </label>
                      <select
                        required={isOrganisation}
                        value={formData.organisation.pays}
                        onChange={(e) =>
                          handleOrganisationChange("pays", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      >
                        <option value="">Sélectionner un pays</option>
                        {COUNTRIES.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Logo
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md text-sm font-medium cursor-pointer hover:bg-neutral-200 transition-colors">
                          Choisir un fichier
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-sm text-neutral-500">
                          {logoFileName || "Aucun fichier choisi"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ========== SECTION 3: Référent / Infos personnelles ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-md p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#26A69A]/10 rounded-md flex items-center justify-center">
                  <User className="w-5 h-5 text-[#26A69A]" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">
                    {isOrganisation
                      ? "Référent"
                      : "Vos informations personnelles"}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {isOrganisation
                      ? "Contact principal de l'organisation"
                      : "Renseignez vos coordonnées"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Civilité<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.referent.civilite}
                    onChange={(e) =>
                      handleReferentChange("civilite", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M.">M.</option>
                    <option value="Mme">Mme</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    NOM<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.referent.nom}
                    onChange={(e) =>
                      handleReferentChange("nom", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Prénom<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.referent.prenom}
                    onChange={(e) =>
                      handleReferentChange("prenom", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>

                {/* Champs spécifiques selon le type */}
                {isOrganisation ? (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Fonction<span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.referent.fonction}
                      onChange={(e) =>
                        handleReferentChange("fonction", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                    >
                      <option value="">Sélectionner une fonction</option>
                      {PROFESSIONS.map((profession) => (
                        <option key={profession} value={profession}>
                          {profession}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Domaines d&apos;expertise
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Data Science, Cloud Computing, IA, Cybersécurité..."
                      value={formData.referent.expertise}
                      onChange={(e) =>
                        handleReferentChange("expertise", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                    />
                  </div>
                )}

                <div className={isOrganisation ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    E-mail<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.referent.email}
                    onChange={(e) =>
                      handleReferentChange("email", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Téléphone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.referent.telephone}
                    onChange={(e) =>
                      handleReferentChange("telephone", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>

                {!isOrganisation && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Profil LinkedIn
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/votre-profil"
                      value={formData.referent.linkedin}
                      onChange={(e) =>
                        handleReferentChange("linkedin", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.referent.adresse}
                    onChange={(e) =>
                      handleReferentChange("adresse", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.referent.ville}
                    onChange={(e) =>
                      handleReferentChange("ville", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Pays<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.referent.pays}
                    onChange={(e) =>
                      handleReferentChange("pays", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    <option value="">Sélectionner un pays</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* ========== SECTION 4: Facturation ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-md p-6 md:p-8 shadow-sm"
            >
              <h3 className="font-bold text-neutral-900 mb-6">
                Informations relatives à la facturation
              </h3>

              {/* Devis checkbox */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-neutral-700">
                  Souhaitez-vous un devis afin d&apos;établir un bon de commande
                  ?
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.facturation.demanderDevis}
                    onChange={(e) =>
                      handleFacturationChange("demanderDevis", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-neutral-300 text-[#0077B6] focus:ring-[#0077B6]"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    oui
                  </span>
                </label>
              </div>

              {formData.facturation.demanderDevis && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Email destinataire du devis
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required={formData.facturation.demanderDevis}
                    value={formData.facturation.emailDevis}
                    onChange={(e) =>
                      handleFacturationChange("emailDevis", e.target.value)
                    }
                    className="w-full md:w-1/2 px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
              )}

              <h4 className="font-semibold text-neutral-900 mb-4">
                Facturation
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Adresse de facturation
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.facturation.adresse}
                    onChange={(e) =>
                      handleFacturationChange("adresse", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    E-mail<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.facturation.email}
                    onChange={(e) =>
                      handleFacturationChange("email", e.target.value)
                    }
                    placeholder="Email destinataire des factures"
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Téléphone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.facturation.telephone}
                    onChange={(e) =>
                      handleFacturationChange("telephone", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.facturation.ville}
                    onChange={(e) =>
                      handleFacturationChange("ville", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Pays<span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.facturation.pays}
                    onChange={(e) =>
                      handleFacturationChange("pays", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                  >
                    <option value="">Sélectionner un pays</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* ========== SECTION 5: Commentaires ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-md p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 rounded-md flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-neutral-900">Commentaires</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Informations complémentaires ou motivations
                </label>
                <textarea
                  rows={5}
                  value={formData.commentaires}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      commentaires: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent resize-none"
                />
              </div>
            </motion.div>

            {/* ========== Acceptations ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.accepteReglement}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accepteReglement: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-[#0077B6] focus:ring-[#0077B6]"
                />
                <span className="text-sm text-neutral-700">
                  <strong>
                    J&apos;accepte le règlement intérieur de l&apos;association
                  </strong>
                  <span className="text-red-500">*</span>
                  <br />
                  <span className="text-neutral-500 text-xs">
                    En cochant cette case, vous acceptez de respecter le
                    règlement intérieur de l&apos;association.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.accepteNewsletter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accepteNewsletter: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-[#0077B6] focus:ring-[#0077B6]"
                />
                <span className="text-sm text-neutral-700">
                  <strong>
                    J&apos;accepte de recevoir la newsletter de
                    l&apos;association
                  </strong>
                  <br />
                  <span className="text-neutral-500 text-xs">
                    Informations sur les activités et événements (optionnel)
                  </span>
                </span>
              </label>
            </motion.div>

            {/* ========== Submit Button ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-4"
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Envoyer la demande d&apos;adhésion
              </Button>
            </motion.div>
          </form>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterBanner />
    </>
  );
}

// Wrapper avec Suspense pour useSearchParams
export default function CandidaturePage() {
  return (
    <Suspense fallback={<CandidaturePageLoading />}>
      <CandidaturePageContent />
    </Suspense>
  );
}

// Loading state
function CandidaturePageLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077B6]"></div>
    </div>
  );
}
