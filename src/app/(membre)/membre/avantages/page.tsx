"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Gift,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Ticket,
  Presentation,
  Building2,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user data
const MOCK_USER = {
  tier: "Sunun",
  tierColor: "#F9A825",
  memberType: "Utilisateur",
};

// Advantages configuration based on tier
const ADVANTAGES = [
  {
    id: 1,
    label: "Rabais sur la participation aux galas et événements",
    icon: Ticket,
    tiers: {
      Asuka: "50%",
      Sunun: "50%",
      Mindaho: "75%",
      Dah: "Gratuit",
    },
    category: "events",
  },
  {
    id: 2,
    label: "Nombre de Pax autorisés",
    icon: Users,
    tiers: {
      Asuka: "3",
      Sunun: "5",
      Mindaho: "8",
      Dah: "12",
    },
    category: "events",
  },
  {
    id: 3,
    label: "Demandes annuelles d'expertise",
    icon: MessageSquare,
    tiers: {
      Asuka: "2",
      Sunun: "5",
      Mindaho: "12",
      Dah: "Illimité",
    },
    category: "expertise",
  },
  {
    id: 4,
    label: "Accès aux catégories d'experts",
    icon: Building2,
    tiers: {
      Asuka: "Asuka",
      Sunun: "Sunun et en deçà",
      Mindaho: "Mindaho et en deçà",
      Dah: "Toutes",
    },
    category: "expertise",
  },
  {
    id: 5,
    label: "Sollicitations pour projets de recherche, présentations, mentorat",
    icon: FileText,
    tiers: {
      Asuka: "2",
      Sunun: "5",
      Mindaho: "12",
      Dah: "Illimité",
    },
    category: "expertise",
  },
  {
    id: 6,
    label: "Rabais sur des colloques organisés par des partenaires",
    icon: Calendar,
    tiers: {
      Asuka: true,
      Sunun: true,
      Mindaho: true,
      Dah: true,
    },
    category: "partners",
  },
  {
    id: 7,
    label: "Présentations lors de colloques",
    icon: Presentation,
    tiers: {
      Asuka: "1",
      Sunun: "2",
      Mindaho: "3",
      Dah: "6",
    },
    category: "partners",
  },
  {
    id: 8,
    label: "Mise en relation avec des éditeurs",
    icon: Building2,
    tiers: {
      Asuka: false,
      Sunun: false,
      Mindaho: true,
      Dah: true,
    },
    category: "partners",
  },
  {
    id: 9,
    label:
      "Rabais sur des produits partenaires (OS, Antivirus, bureautique...)",
    icon: ShoppingBag,
    tiers: {
      Asuka: false,
      Sunun: false,
      Mindaho: true,
      Dah: true,
    },
    category: "partners",
  },
];

const TIERS = ["Asuka", "Sunun", "Mindaho", "Dah"];

const TIER_COLORS: Record<string, string> = {
  Asuka: "#26A69A",
  Sunun: "#F9A825",
  Mindaho: "#0077B6",
  Dah: "#7C3AED",
};

// const CATEGORIES = [
//   { id: "all", label: "Tous les avantages" },
//   { id: "events", label: "Événements" },
//   { id: "expertise", label: "Expertise" },
//   { id: "partners", label: "Partenaires" },
// ];

export default function MesAvantagesPage() {
  const currentTierIndex = TIERS.indexOf(MOCK_USER.tier);

  const getValue = (advantage: (typeof ADVANTAGES)[0], tier: string) => {
    const value = advantage.tiers[tier as keyof typeof advantage.tiers];
    return value;
  };

  const isAvailable = (advantage: (typeof ADVANTAGES)[0]) => {
    const value =
      advantage.tiers[MOCK_USER.tier as keyof typeof advantage.tiers];
    return value !== false && value !== undefined;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Mes avantages
        </h1>
        <p className="text-neutral-600">
          Découvrez tous les avantages inclus dans votre abonnement
        </p>
      </motion.div>

      {/* Current Tier Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden bg-white rounded-md border border-neutral-100 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${MOCK_USER.tierColor}20` }}
            >
              <Crown
                className="w-8 h-8"
                style={{ color: MOCK_USER.tierColor }}
              />
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">
                Votre niveau actuel
              </p>
              <div className="flex items-center gap-3">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: MOCK_USER.tierColor }}
                >
                  {MOCK_USER.tier}
                </h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-md">
                  {MOCK_USER.memberType}
                </span>
              </div>
            </div>
          </div>

          {currentTierIndex < TIERS.length - 1 && (
            <Link
              href="/membre/upgrade"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              <TrendingUp className="w-5 h-5" />
              Passer à {TIERS[currentTierIndex + 1]}
            </Link>
          )}
        </div>

        {/* Tier Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            {TIERS.map((tier, index) => (
              <div
                key={tier}
                className={cn(
                  "flex flex-col items-center",
                  index <= currentTierIndex
                    ? "text-neutral-900"
                    : "text-neutral-400"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1",
                    index < currentTierIndex
                      ? "bg-accent-500 text-white"
                      : index === currentTierIndex
                        ? "text-white"
                        : "bg-neutral-200 text-neutral-500"
                  )}
                  style={
                    index === currentTierIndex
                      ? { backgroundColor: TIER_COLORS[tier] }
                      : {}
                  }
                >
                  {index + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  {tier}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full transition-all"
              style={{
                width: `${((currentTierIndex + 1) / TIERS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-md border border-neutral-100 overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
            <Gift className="w-5 h-5 text-accent-500" />
            Comparatif des avantages
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="text-left p-4 text-sm font-semibold text-neutral-700 min-w-[250px]">
                  Avantage
                </th>
                {TIERS.map((tier, index) => (
                  <th
                    key={tier}
                    className={cn(
                      "text-center p-4 text-sm font-semibold min-w-[100px]",
                      index === currentTierIndex ? "bg-primary-50" : ""
                    )}
                    style={
                      index === currentTierIndex
                        ? { color: TIER_COLORS[tier] }
                        : { color: "#525252" }
                    }
                  >
                    {tier}
                    {index === currentTierIndex && (
                      <span className="block text-xs font-normal text-neutral-500 mt-0.5">
                        (Votre tier)
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ADVANTAGES.map((advantage) => (
                <tr
                  key={advantage.id}
                  className={cn(
                    "hover:bg-neutral-50 transition-colors",
                    !isAvailable(advantage) && "opacity-60"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <advantage.icon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">
                        {advantage.label}
                      </span>
                    </div>
                  </td>
                  {TIERS.map((tier, index) => {
                    const value = getValue(advantage, tier);
                    const isCurrentTier = index === currentTierIndex;

                    return (
                      <td
                        key={tier}
                        className={cn(
                          "text-center p-4",
                          isCurrentTier ? "bg-primary-50/50" : ""
                        )}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <CheckCircle2 className="w-5 h-5 text-accent-500 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-neutral-300 mx-auto" />
                          )
                        ) : (
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isCurrentTier
                                ? "text-primary-600"
                                : "text-neutral-600"
                            )}
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CTA Upgrade */}
      {currentTierIndex < TIERS.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 rounded-md p-6 md:p-8 text-white"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 border-[30px] border-white/10 rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Passez à {TIERS[currentTierIndex + 1]} pour plus
                d&apos;avantages
              </h3>
              <p className="text-white/80">
                Débloquez des quotas plus élevés et accédez à plus de
                fonctionnalités
              </p>
            </div>
            <Link
              href="/membre/upgrade"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-white/90 transition-colors"
            >
              Mettre à niveau
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
