// ============================================================
// MEMBERSHIP DATA - Données statiques pour l'adhésion
// Les prix et descriptions viennent de l'API, mais les features restent mockées
// ============================================================

// ==================== TYPES ====================

export type MemberTypeId =
  | "offreur"
  | "utilisateur"
  | "contributeur"
  | "partenaire";

export type TierId = "asuka" | "sunun" | "mindaho" | "dah";

// ==================== TYPES DE MEMBRES (fallback si API échoue) ====================

export interface MemberType {
  id: MemberTypeId;
  label: string;
  description: string;
}

export const memberTypes: MemberType[] = [
  {
    id: "offreur",
    label: "OFFREURS",
    description:
      "Un Membre Offreur (MO) est une entreprise commerciale dans le secteur du numérique qui dispose d'un programme RSE. Nous encourageons et accompagnons gratuitement les membres n'ayant pas encore mis ce genre de programme en place.",
  },
  {
    id: "utilisateur",
    label: "UTILISATEURS",
    description:
      "Un Membre Utilisateur (MU) est une entreprise commerciale qui dispose d'un programme RSE. Nous encourageons et accompagnons gratuitement les membres n'ayant pas encore mis ce genre de programme en place.",
  },
  {
    id: "contributeur",
    label: "CONTRIBUTEURS",
    description:
      "Un Membre Contributeur (MC) est un expert ou un passionné du digital (Big Data, IA, Cybersécurité, etc.) qui croit en notre démarche et nous rejoint pour accompagner les jeunes diplômés.",
  },
  {
    id: "partenaire",
    label: "PARTENAIRES",
    description:
      "Un Partenaire est une organisation (fondation, institution, entreprise) qui soutient financièrement ou matériellement les actions d'imo2tun.",
  },
];

// ==================== TIERS AVEC FEATURES (données mockées) ====================
// Les prix peuvent être surchargés par l'API, mais les features restent ici

export interface MembershipTier {
  id: TierId;
  name: string;
  price: string; // Prix formaté avec points (fallback)
  currency: string;
  featured: boolean;
  features: string[];
}

export const membershipTiers: Record<MemberTypeId, MembershipTier[]> = {
  offreur: [
    {
      id: "asuka",
      name: "ASUKA",
      price: "1.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "50% sur participation événements",
        "3 Pax autorisés",
        "1 showroom en ligne",
        "1 programme formation/an",
        "2 études (livre blanc)/an",
        "2 rabais produits/an",
      ],
    },
    {
      id: "sunun",
      name: "SUNUN",
      price: "2.000.000",
      currency: "FCFA",
      featured: true,
      features: [
        "50% sur participation événements",
        "5 Pax autorisés",
        "3 showrooms en ligne",
        "3 programmes formation/an",
        "5 études (livre blanc)/an",
        "5 rabais produits/an",
        "1 stand événement",
      ],
    },
    {
      id: "mindaho",
      name: "MINDAHO",
      price: "5.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "75% sur participation événements",
        "8 Pax autorisés",
        "6 showrooms en ligne",
        "12 programmes formation/an",
        "10 études (livre blanc)/an",
        "10 rabais produits/an",
        "2 stands événement",
        "1 événement gratuit/an",
      ],
    },
    {
      id: "dah",
      name: "DAH",
      price: "10.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "75% sur participation événements",
        "12 Pax autorisés",
        "12 showrooms en ligne",
        "Programmes formation illimités",
        "Études (livre blanc) illimitées",
        "Rabais produits illimités",
        "5 stands événement",
        "2 événements gratuits/an",
      ],
    },
  ],
  utilisateur: [
    {
      id: "asuka",
      name: "ASUKA",
      price: "500.000",
      currency: "FCFA",
      featured: false,
      features: [
        "50% sur participation événements",
        "3 Pax autorisés",
        "2 demandes d'expertise/an",
        "Accès experts Asuka",
        "2 sollicitations projets/an",
        "Accès 5 documents d'études",
      ],
    },
    {
      id: "sunun",
      name: "SUNUN",
      price: "1.000.000",
      currency: "FCFA",
      featured: true,
      features: [
        "50% sur participation événements",
        "5 Pax autorisés",
        "5 demandes d'expertise/an",
        "Accès experts Sunun et en deçà",
        "5 sollicitations projets/an",
        "Accès 10 documents d'études",
        "1 présentation colloques",
      ],
    },
    {
      id: "mindaho",
      name: "MINDAHO",
      price: "2.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "75% sur participation événements",
        "8 Pax autorisés",
        "12 demandes d'expertise/an",
        "Accès experts Mindaho et en deçà",
        "12 sollicitations projets/an",
        "Accès 20 documents d'études",
        "3 présentations colloques",
        "Rabais produits partenaires",
      ],
    },
    {
      id: "dah",
      name: "DAH",
      price: "5.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Accès gratuit aux événements",
        "12 Pax autorisés",
        "Demandes d'expertise illimitées",
        "Accès à tous les experts",
        "Sollicitations projets illimitées",
        "Accès documents illimité",
        "6 présentations colloques",
        "Rabais produits partenaires",
      ],
    },
  ],
  contributeur: [
    {
      id: "asuka",
      name: "ASUKA",
      price: "100.000",
      currency: "FCFA",
      featured: false,
      features: [
        "50% sur participation événements",
        "2 candidatures expertise/an",
        "Accès PMEs et organismes publics",
        "2 sollicitations projets/an",
        "Rabais colloques partenaires",
      ],
    },
    {
      id: "sunun",
      name: "SUNUN",
      price: "150.000",
      currency: "FCFA",
      featured: true,
      features: [
        "50% sur participation événements",
        "5 candidatures expertise/an",
        "Accès toutes catégories",
        "5 sollicitations projets/an",
        "Rabais colloques partenaires",
        "2 présentations colloques",
      ],
    },
    {
      id: "mindaho",
      name: "MINDAHO",
      price: "250.000",
      currency: "FCFA",
      featured: false,
      features: [
        "75% sur participation événements",
        "12 candidatures expertise/an",
        "Accès toutes catégories",
        "12 sollicitations projets/an",
        "Rabais colloques partenaires",
        "3 présentations colloques",
        "Accompagnement financement",
      ],
    },
    {
      id: "dah",
      name: "DAH",
      price: "500.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Accès gratuit aux événements",
        "Candidatures expertise illimitées",
        "Accès toutes catégories",
        "Sollicitations projets illimitées",
        "Rabais colloques partenaires",
        "6 présentations colloques",
        "Accompagnement financement",
        "Rabais produits partenaires",
      ],
    },
  ],
  partenaire: [
    {
      id: "asuka",
      name: "ASUKA",
      price: "2.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Logo sur site web",
        "Mention dans communications",
        "2 places événements/an",
        "Rapport d'impact annuel",
      ],
    },
    {
      id: "sunun",
      name: "SUNUN",
      price: "5.000.000",
      currency: "FCFA",
      featured: true,
      features: [
        "Logo sur site web (prioritaire)",
        "Mention dans toutes communications",
        "5 places événements/an",
        "Stand lors des événements",
        "Rapport d'impact trimestriel",
      ],
    },
    {
      id: "mindaho",
      name: "MINDAHO",
      price: "10.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Logo premium sur site web",
        "Co-branding sur événements",
        "10 places événements/an",
        "Stand premium événements",
        "Rapport d'impact mensuel",
        "Accès comité stratégique",
      ],
    },
    {
      id: "dah",
      name: "DAH",
      price: "25.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Partenaire titre",
        "Co-organisation événements",
        "Places illimitées événements",
        "Stand VIP événements",
        "Rapport d'impact en temps réel",
        "Siège au conseil d'administration",
      ],
    },
  ],
};

// ==================== AVANTAGES GÉNÉRAUX ====================

export interface MembershipBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const membershipBenefits: MembershipBenefit[] = [
  {
    id: 1,
    title: "Réseau d'experts",
    description:
      "Accédez à un réseau de professionnels qualifiés dans le numérique pour vous accompagner dans vos projets et votre transformation digitale.",
    icon: "message",
  },
  {
    id: 2,
    title: "Formations & Événements",
    description:
      "Participez à des conférences, ateliers et formations exclusives pour développer vos compétences et rester à la pointe de l'innovation.",
    icon: "shield",
  },
  {
    id: 3,
    title: "Opportunités Business",
    description:
      "Bénéficiez de mises en relation privilégiées, d'appels à projets et de collaborations avec les acteurs clés de l'écosystème numérique africain.",
    icon: "star",
  },
];

// ==================== PROCESSUS D'ADHÉSION ====================

export interface AdhesionStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const adhesionProcess: AdhesionStep[] = [
  {
    id: 1,
    title: "Candidature",
    description:
      "Remplissez le formulaire en ligne avec les informations de votre organisation et choisissez votre type d'adhésion.",
    icon: "clipboard",
  },
  {
    id: 2,
    title: "Validation",
    description:
      "Notre équipe examine votre candidature sous 48h et vous contacte pour finaliser votre inscription.",
    icon: "search",
  },
  {
    id: 3,
    title: "Activation",
    description:
      "Après réception de votre paiement, votre compte membre est activé et vous recevez vos accès personnels.",
    icon: "check",
  },
  {
    id: 4,
    title: "Bienvenue",
    description:
      "Bienvenue dans la communauté imo2tun ! Accédez à tous vos avantages et participez à nos événements.",
    icon: "party",
  },
];

// ==================== FAQ ====================

export interface MembershipFAQ {
  id: string;
  question: string;
  answer: string;
}

export const membershipFAQ: MembershipFAQ[] = [
  {
    id: "1",
    question: "Quelle est la différence entre les types de membres ?",
    answer:
      "Les Offreurs sont des entreprises du numérique proposant des solutions. Les Utilisateurs sont des organisations souhaitant bénéficier de nos services. Les Contributeurs sont des experts individuels. Les Partenaires soutiennent financièrement nos actions.",
  },
  {
    id: "2",
    question: "Comment choisir mon niveau d'adhésion ?",
    answer:
      "Chaque niveau (Asuka, Sunun, Mindaho, Dah) offre des avantages croissants. Consultez le tableau comparatif pour choisir celui qui correspond le mieux à vos besoins et à votre budget.",
  },
  {
    id: "3",
    question: "Puis-je changer de niveau en cours d'année ?",
    answer:
      "Oui, vous pouvez upgrader votre niveau à tout moment. La différence de cotisation sera calculée au prorata de la période restante.",
  },
  {
    id: "4",
    question: "Comment se déroule le paiement ?",
    answer:
      "Après validation de votre candidature, vous recevrez une facture par email. Le paiement peut se faire par virement bancaire ou mobile money.",
  },
  {
    id: "5",
    question: "Quels sont les délais de traitement ?",
    answer:
      "Votre candidature est examinée sous 48h ouvrées. Une fois le paiement reçu, votre compte est activé dans les 24h.",
  },
];

// ==================== HELPER POUR RÉCUPÉRER LES FEATURES ====================

/**
 * Récupère les features mockées pour un tier donné
 * Utilisé pour afficher les avantages sur les cards pricing
 */
export function getTierFeatures(
  memberTypeId: MemberTypeId,
  tierId: TierId,
): string[] {
  const tiers = membershipTiers[memberTypeId];
  const tier = tiers?.find((t) => t.id === tierId);
  return tier?.features || [];
}

/**
 * Récupère un tier mocké complet
 */
export function getMockTier(
  memberTypeId: MemberTypeId,
  tierId: TierId,
): MembershipTier | undefined {
  const tiers = membershipTiers[memberTypeId];
  return tiers?.find((t) => t.id === tierId);
}
