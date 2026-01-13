// Types de membres
export const memberTypes = [
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
      "Un Membre Utilisateur (MU) est une organisation (entreprise, ONG, institution) qui souhaite bénéficier des services et expertises de notre réseau pour accompagner sa transformation digitale.",
  },
  {
    id: "contributeur",
    label: "CONTRIBUTEURS",
    description:
      "Un Membre Contributeur (MC) est un expert ou passionné du digital (Big Data, IA, Cybersécurité, etc.) qui croit en notre démarche et nous rejoint pour accompagner les jeunes diplômés à travers du mentorat et des formations.",
  },
  {
    id: "partenaire",
    label: "PARTENAIRES",
    description:
      "Un Partenaire est une organisation (fondation, institution, entreprise) qui soutient financièrement ou matériellement les actions d'imo2tun et participe activement à la construction de l'écosystème numérique africain.",
  },
];

// Tiers de cotisation par type de membre
export const membershipTiers = {
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
        "2 demandes d'expertise/an",
        "Accès experts Asuka",
        "2 sollicitations projets/an",
        "Rabais colloques partenaires",
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
        "5 demandes d'expertise/an",
        "Accès experts Sunun et en deçà",
        "5 sollicitations projets/an",
        "Rabais colloques partenaires",
        "2 présentations lors de colloques",
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
        "12 demandes d'expertise/an",
        "Accès experts Mindaho et en deçà",
        "12 sollicitations projets/an",
        "Rabais colloques partenaires",
        "4 présentations lors de colloques",
      ],
    },
    {
      id: "dah",
      name: "DAH",
      price: "10.000.000",
      currency: "FCFA",
      featured: false,
      features: [
        "Accès gratuit aux événements",
        "12 Pax autorisés",
        "Demandes d'expertise illimitées",
        "Accès à tous les experts",
        "Sollicitations projets illimitées",
        "Rabais colloques partenaires",
        "Présentations illimitées",
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
        "2 Pax autorisés",
        "2 demandes d'expertise/an",
        "Accès experts Asuka",
        "Accès bibliothèque de base",
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
        "3 Pax autorisés",
        "5 demandes d'expertise/an",
        "Accès experts Sunun et en deçà",
        "Accès bibliothèque complète",
        "1 présentation lors de colloques",
      ],
    },
    {
      id: "mindaho",
      name: "MINDAHO",
      price: "2.500.000",
      currency: "FCFA",
      featured: false,
      features: [
        "75% sur participation événements",
        "5 Pax autorisés",
        "12 demandes d'expertise/an",
        "Accès experts Mindaho et en deçà",
        "Accès bibliothèque complète",
        "2 présentations lors de colloques",
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
        "8 Pax autorisés",
        "Demandes d'expertise illimitées",
        "Accès à tous les experts",
        "Accès bibliothèque complète",
        "Présentations illimitées",
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
        "Accès réseau contributeurs",
        "Opportunités de mentorat",
        "Accès bibliothèque de base",
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
        "Accès réseau contributeurs",
        "Opportunités de mentorat prioritaires",
        "Accès bibliothèque complète",
        "Invitations webinaires exclusifs",
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
        "Accès réseau contributeurs VIP",
        "Animation de formations",
        "Accès bibliothèque complète",
        "Badge expert certifié",
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
        "Accès réseau contributeurs VIP",
        "Animation de formations premium",
        "Accès bibliothèque complète",
        "Badge expert certifié",
        "Participation aux décisions",
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
        "Stand premium lors des événements",
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
        "Stand VIP lors des événements",
        "Rapport d'impact en temps réel",
        "Siège au conseil d'administration",
      ],
    },
  ],
};

// Avantages d'adhésion
export const membershipBenefits = [
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

// Étapes du processus d'adhésion
export const adhesionProcess = [
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

// FAQ Adhésion
export const membershipFAQ = [
  {
    id: "1",
    question: "Comment puis-je devenir membre d'imo2tun ?",
    answer:
      "Pour devenir membre, il suffit de remplir le formulaire de candidature en ligne. Votre demande sera examinée par notre équipe et vous recevrez une réponse sous 48h. Une fois validée, vous recevrez une facture pour le paiement de votre cotisation.",
  },
  {
    id: "2",
    question: "Quels sont les différents types de membres ?",
    answer:
      "imo2tun propose quatre types de membres : les Offreurs (entreprises tech), les Utilisateurs (organisations souhaitant se digitaliser), les Contributeurs (experts et mentors) et les Partenaires (soutiens institutionnels et financiers).",
  },
  {
    id: "3",
    question: "Comment choisir mon tier d'adhésion ?",
    answer:
      "Le choix du tier dépend de vos besoins et de votre budget. Chaque tier offre des avantages croissants. Nous vous recommandons le tier Sunun pour un bon équilibre entre services et investissement.",
  },
  {
    id: "4",
    question: "Puis-je changer de tier en cours d'année ?",
    answer:
      "Oui, vous pouvez upgrader votre tier à tout moment. Le montant sera calculé au prorata de la période restante. Le downgrade n'est possible qu'au renouvellement annuel.",
  },
  {
    id: "5",
    question: "Quels sont les moyens de paiement acceptés ?",
    answer:
      "Nous acceptons les virements bancaires, les paiements par chèque et les paiements mobiles (Orange Money, MTN Money, Wave). Les paiements par carte bancaire seront disponibles prochainement.",
  },
  {
    id: "6",
    question: "La cotisation est-elle annuelle ?",
    answer:
      "Oui, la cotisation est annuelle et renouvelable. Vous recevrez un rappel un mois avant l'échéance pour procéder au renouvellement.",
  },
  {
    id: "7",
    question: "Puis-je obtenir une facture pour ma comptabilité ?",
    answer:
      "Absolument. Une facture officielle vous sera envoyée automatiquement après validation de votre paiement. Vous pouvez également demander un devis préalable lors de votre candidature.",
  },
  {
    id: "8",
    question: "Comment contacter l'équipe pour plus d'informations ?",
    answer:
      "Vous pouvez nous contacter par email à info@imo2tun.org ou par téléphone au +33 6 32 80 83 16. Notre équipe est disponible du lundi au vendredi de 9h à 18h.",
  },
];
