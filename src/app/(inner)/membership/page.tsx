/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  MessageSquare,
  Shield,
  Star,
  ClipboardList,
  Search,
  CheckCircle,
  PartyPopper,
  Plus,
  Minus,
  Mail,
  Loader2,
} from "lucide-react";

// Components
import { HeroSecondary } from "@/components/shared/hero-secondary";
import { Button } from "@/components/ui";

// Data (mocks pour features et fallback)
import {
  memberTypes as mockMemberTypes,
  membershipTiers,
  membershipBenefits,
  adhesionProcess,
  membershipFAQ,
  type MemberTypeId,
} from "@/lib/data/membership";

// Hook API
import { useMembership } from "@/hooks/use-membership";
// Hook Auth (supposé existant dans le projet)
import { useAuth } from "@/hooks/use-auth";

export default function MembershipPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<MemberTypeId>("offreur");
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  // Hook Auth pour vérifier si l'utilisateur est connecté
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Hook pour charger les données API
  const {
    memberTypes: apiMemberTypes,
    tiers: apiTiers,
    isLoadingMemberTypes,
    isLoadingTiers,
    fetchMemberTypes,
    fetchTiersByMemberType,
    getMemberTypeBySlug,
  } = useMembership();

  // Charger les types de membres au montage
  useEffect(() => {
    fetchMemberTypes();
  }, []);

  // Charger les tiers quand le type change
  useEffect(() => {
    const memberType = getMemberTypeBySlug(selectedType);
    if (memberType && !apiTiers[memberType.id]) {
      fetchTiersByMemberType(memberType.id);
    }
  }, [selectedType, apiMemberTypes]);

  // Utiliser les données API si disponibles, sinon fallback sur les mocks
  const memberTypesToDisplay =
    apiMemberTypes.length > 0
      ? apiMemberTypes.map((mt) => ({
          id: mt.slug,
          label: mt.label,
          description: mt.description,
        }))
      : mockMemberTypes;

  const currentType = memberTypesToDisplay.find((t) => t.id === selectedType);

  // Récupérer les tiers actuels (API + features mockées)
  const apiMemberType = getMemberTypeBySlug(selectedType);
  const apiCurrentTiers = apiMemberType ? apiTiers[apiMemberType.id] || [] : [];
  const mockCurrentTiers = membershipTiers[selectedType] || [];

  // Combiner les prix API avec les features mockées
  const currentTiers =
    apiCurrentTiers.length > 0
      ? apiCurrentTiers.map((apiTier) => {
          const mockTier = mockCurrentTiers.find((m) => m.id === apiTier.slug);
          return {
            id: apiTier.slug,
            name: apiTier.name,
            price: apiTier.priceFormatted,
            currency: apiTier.currency,
            featured: apiTier.featured,
            features: mockTier?.features || [],
          };
        })
      : mockCurrentTiers;

  // Gérer le clic sur "Choisir" - Rediriger vers login si non connecté
  const handleChooseTier = (tierId: string) => {
    const targetUrl = `/membership/candidature?type=${selectedType}&tier=${tierId}`;

    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      // Rediriger vers login avec returnUrl
      const returnUrl = encodeURIComponent(targetUrl);
      router.push(`/login?returnUrl=${returnUrl}`);
    } else {
      // Utilisateur connecté, aller directement au formulaire
      router.push(targetUrl);
    }
  };

  // Get icon for benefits
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "message":
        return <MessageSquare className="w-8 h-8" />;
      case "shield":
        return <Shield className="w-8 h-8" />;
      case "star":
        return <Star className="w-8 h-8" />;
      default:
        return <MessageSquare className="w-8 h-8" />;
    }
  };

  // Get icon for process steps
  const getProcessIcon = (iconName: string) => {
    const iconClass = "w-10 h-10 text-white";
    switch (iconName) {
      case "clipboard":
        return <ClipboardList className={iconClass} />;
      case "search":
        return <Search className={iconClass} />;
      case "check":
        return <CheckCircle className={iconClass} />;
      case "party":
        return <PartyPopper className={iconClass} />;
      default:
        return <ClipboardList className={iconClass} />;
    }
  };

  // Get background color for process steps
  const getProcessColor = (index: number) => {
    const colors = [
      "bg-[#0077B6]",
      "bg-[#26A69A]",
      "bg-[#F9A825]",
      "bg-[#E91E63]",
    ];
    return colors[index] || colors[0];
  };

  return (
    <>
      {/* Hero */}
      <HeroSecondary
        title="Rejoignez la communauté imo2tun"
        backgroundImage="/images/hero-bg.png"
      />

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
              <span className="text-secondary-500 font-medium">Adhérer</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Type Selection Section */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 text-center mb-10"
          >
            Choisissez votre type d&apos;adhésion
          </motion.h2>

          {/* Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {isLoadingMemberTypes ? (
              <div className="flex items-center gap-2 text-neutral-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Chargement...</span>
              </div>
            ) : (
              memberTypesToDisplay.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as MemberTypeId)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    selectedType === type.id
                      ? "bg-[#F9A825] text-white shadow-md"
                      : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {type.label}
                </button>
              ))
            )}
          </div>

          {/* Type Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#FFF8E1] rounded-md p-6 mb-12 max-w-4xl mx-auto"
            >
              <p className="text-neutral-700 text-center leading-relaxed">
                {currentType?.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pricing Cards */}
          {isLoadingTiers ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#0077B6]" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {currentTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-md overflow-hidden ${
                    tier.featured
                      ? "bg-white shadow-xl ring-2 ring-[#F9A825] scale-105 z-10"
                      : "bg-white shadow-lg"
                  }`}
                >
                  {/* Header */}
                  <div
                    className={`p-6 text-center ${
                      tier.featured
                        ? "bg-[#F9A825] text-white"
                        : "bg-[#0077B6] text-white"
                    }`}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                        tier.featured
                          ? "bg-white/20 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {tier.name}
                    </span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl md:text-3xl font-bold">
                        {tier.price}
                      </span>
                      <span className="text-sm opacity-80">
                        {tier.currency}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-[#26A69A] flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6">
                    <Button
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                      onClick={() => handleChooseTier(tier.id)}
                      disabled={isAuthLoading}
                    >
                      {isAuthLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Choisir"
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 text-center mb-12"
          >
            Pourquoi adhérer
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {membershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF8E1] rounded-full flex items-center justify-center text-[#F9A825]">
                  {getBenefitIcon(benefit.icon)}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ChevronRight className="w-5 h-5" />}
              onClick={() => handleChooseTier("sunun")}
            >
              Commencer ma candidature
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 text-center mb-12"
          >
            Processus d&apos;adhésion
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {adhesionProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                {/* Icon */}
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${getProcessColor(index)}`}
                >
                  {getProcessIcon(step.icon)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 text-center mb-12"
          >
            Questions fréquemment posées
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 max-w-6xl mx-auto">
            {/* FAQ Accordion */}
            <div className="space-y-3">
              {membershipFAQ.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-neutral-50 rounded-md overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-100 transition-colors"
                  >
                    <span className="font-medium text-neutral-900 pr-4">
                      {faq.question}
                    </span>
                    {openFaqId === faq.id ? (
                      <Minus className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaqId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact Card */}
            <div className="bg-neutral-50 rounded-md p-8 h-fit">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FFF8E1] rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#F9A825]" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 text-center mb-2">
                Avez-vous d&apos;autres questions ?
              </h3>
              <p className="text-sm text-neutral-600 text-center mb-6 leading-relaxed">
                Notre équipe est disponible pour répondre à toutes vos questions
                concernant l&apos;adhésion à imo2tun.
              </p>
              <div className="text-center">
                <Link href="/contact">
                  <Button variant="outline">Écrivez-nous directement</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ChevronRight className="w-5 h-5" />}
              onClick={() => handleChooseTier("sunun")}
            >
              Commencer ma candidature
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
