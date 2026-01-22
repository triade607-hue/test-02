// ============================================================
// DONNÉES MEMBRES - imo2tun
// ============================================================

// Types
export type MemberType =
  | "Offreur"
  | "Utilisateur"
  | "Contributeur"
  | "Partenaire";
export type Tier = "Asuka" | "Agojie" | "Miganon" | "Dah";

export interface Member {
  id: string;
  name: string;
  type: MemberType;
  tier: Tier;
  logo?: string;
  avatar?: string;
  description: string;
  location: string;
  country: string;
  sector?: string;
  expertise?: string[];
  website?: string;
  linkedin?: string;
  isProspect?: boolean;
}

// ============================================================
// DONNÉES DES MEMBRES
// ============================================================

export const members: Member[] = [
  // ==================== OFFREURS - MEMBRES ACTIFS ====================
  {
    id: "1",
    name: "Nyquist-Shannon",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/nyquist-shannon.png",
    description: "Expertise GRC, Cybersécurité et solutions juridiques OHADA.",
    location: "Cotonou, Bénin",
    country: "Bénin",
    sector: "Services IT & Cybersécurité",
    website: "https://www.nyquist-shannon.com",
    isProspect: false,
  },
  {
    id: "2",
    name: "Africa Valley",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/africa-valley.png",
    description: "Développement d'applications et conseil IT.",
    location: "Cotonou, Bénin",
    country: "Bénin",
    sector: "Services IT & Conseil",
    website: "https://africavalley.ca",
    isProspect: false,
  },

  // ==================== OFFREURS - PROSPECTS ====================
  {
    id: "3",
    name: "2SI (Stratégie & Solutions Informatiques)",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/2si.png",
    description:
      "ESN sénégalaise, ingénierie logicielle et automatismes depuis 2001.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Ingénierie IT",
    website: "https://ssi.sn",
    isProspect: true,
  },
  {
    id: "4",
    name: "Aruo Services",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/aruos.png",
    description:
      "Entreprise IT spécialisée en cybersécurité et solutions numériques.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Solutions IT & Cybersécurité",
    website: "https://aruoservices.com",
    isProspect: true,
  },
  {
    id: "5",
    name: "ATOS Sénégal",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/atos.png",
    description: "Leader international de la transformation digitale.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Services numériques",
    website: "https://atos.net",
    isProspect: true,
  },
  {
    id: "6",
    name: "Expresso Sénégal",
    type: "Offreur",
    tier: "Miganon",
    logo: "/images/offreurs/expresso.png",
    description: "Opérateur de télécommunications en Afrique de l'Ouest.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Télécommunications",
    website: "https://expressotelecom.sn",
    isProspect: true,
  },
  {
    id: "7",
    name: "GSIE Technology",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/gsie.png",
    description: "Groupe de services informatiques aux entreprises.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Services IT",
    website: "https://gsietechnology.com",
    isProspect: true,
  },
  {
    id: "8",
    name: "HP Sénégal",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/hp.png",
    description:
      "Fabricant informatique mondial, PC, imprimantes et services entreprises.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Matériel & Services IT",
    website: "https://www.hp.com",
    isProspect: true,
  },

  {
    id: "9",
    name: "IBM Sénégal",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/imb.png",
    description:
      "Géant informatique mondial, solutions entreprises et cloud hybride.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Services IT & Consulting",
    website: "https://www.ibm.com",
    isProspect: true,
  },
  {
    id: "10",
    name: "LaNEM (La Nouvelle École des Métiers)",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/lanem.png",
    description:
      "École supérieure numérique, licences informatique, réseaux et cloud.",
    location: "Cotonou, Bénin",
    country: "Bénin",
    sector: "Formation & Enseignement supérieur",
    website: "https://lanem.bj",
    isProspect: false,
  },
  {
    id: "11",
    name: "Loditech",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/loditech.png",
    description: "Société de conseil Salesforce et intégration SI à Dakar.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Services IT & Cloud",
    website: "https://loditech.sn",
    isProspect: true,
  },
  {
    id: "12",
    name: "Microsoft Sénégal",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/microsoft.png",
    description: "Éditeur mondial, solutions Azure, Microsoft 365, Windows.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Logiciels & Cloud",
    website: "https://www.microsoft.com",
    isProspect: true,
  },
  {
    id: "13",
    name: "Orange Business Sénégal",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/orange-business.png",
    description: "Division entreprise Orange : cloud, sécurité, réseaux gérés.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Solutions IT & Télécoms B2B",
    website: "https://www.orangebusiness.sn",
    isProspect: true,
  },
  {
    id: "14",
    name: "PCCI Group",
    type: "Offreur",
    tier: "Miganon",
    logo: "/images/offreurs/pcci.png",
    description: "Leader africain BPO et centres de contacts, créé en 2001.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "BPO & Centres d'appels",
    website: "https://pcci-group.com",
    isProspect: true,
  },
  {
    id: "15",
    name: "People Input",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/people-input.png",
    description: "Cabinet de conseil IT et services numériques au Sénégal.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "IT Services & Consulting",
    website: "https://www.peopleinput.com/",
    isProspect: true,
  },
  {
    id: "16",
    name: "Solid",
    type: "Offreur",
    tier: "Agojie",
    logo: "/images/offreurs/solid.png",
    description:
      "ESN multinationale, services IT et solutions métiers innovantes.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Services IT & Logiciels",
    website: "https://www.solid.sn",
    isProspect: true,
  },
  {
    id: "17",
    name: "Sonatel (Orange Sénégal)",
    type: "Offreur",
    tier: "Dah",
    logo: "/images/offreurs/sonatel.png",
    description:
      "Opérateur historique depuis 1985, leader télécoms Afrique de l'Ouest.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Télécoms & Services numériques",
    website: "https://sonatel.sn",
    isProspect: true,
  },
  {
    id: "18",
    name: "Wave Sénégal",
    type: "Offreur",
    tier: "Miganon",
    logo: "/images/offreurs/wave.png",
    description:
      "Première licorne d'Afrique francophone, paiement mobile à 1%.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Fintech & Mobile Money",
    website: "https://www.wave.com",
    isProspect: true,
  },

  // ==================== UTILISATEURS - PROSPECTS ====================
  {
    id: "19",
    name: "BP Sénégal",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/bp.png",
    description: "Opérateur du projet GTA, gaz naturel liquéfié offshore.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Gaz naturel",
    website: "https://www.bp.com",
    isProspect: true,
  },
  {
    id: "20",
    name: "CSE – Compagnie Sahélienne d'Entreprises",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/cse.png",
    description:
      "Entreprise sénégalaise historique de travaux publics et bâtiment.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "BTP & Construction",
    website: "https://groupecse.com/",
    isProspect: true,
  },
  {
    id: "21",
    name: "Compagnie Sucrière Sénégalaise (CSS)",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/css.png",
    description: "Unique producteur de sucre au Sénégal, groupe Mimran.",
    location: "Richard-Toll, Sénégal",
    country: "Sénégal",
    sector: "Agro-industrie",
    website: "https://www.css.sn/",
    isProspect: true,
  },
  {
    id: "22",
    name: "Eiffage Sénégal",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/eiffage.png",
    description: "Groupe de construction et concessions, leader du BTP.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "BTP & Infrastructures",
    website: "https://www.eiffage.com",
    isProspect: true,
  },
  {
    id: "23",
    name: "Oilibya Sénégal",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/oil-lybia.png",
    description: "Distributeur pétrolier libyen présent en Afrique de l'Ouest.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Distribution de carburants",
    website: "#",
    isProspect: true,
  },
  {
    id: "24",
    name: "Petrosen",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/petrosen.png",
    description:
      "Compagnie nationale pétrolière du Sénégal, exploration et production.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Pétrole & Gaz",
    website: "https://www.petrosen.sn",
    isProspect: true,
  },
  {
    id: "25",
    name: "Port Autonome de Dakar",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/port-autonome.png",
    description: "Principal port ouest-africain, hub régional stratégique.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Logistique portuaire",
    website: "https://www.portdakar.sn",
    isProspect: true,
  },
  {
    id: "26",
    name: "Société Africaine de Raffinage (SAR)",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/sar.png",
    description: "Seule raffinerie du Sénégal, capacité 1,2 million tonnes/an.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Énergie & Pétrochimie",
    website: "https://www.sar.sn/",
    isProspect: true,
  },
  {
    id: "27",
    name: "SEN'EAU",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/sen-eau.png",
    description: "Distribution d'eau potable en milieu urbain au Sénégal.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Eau & Services publics",
    website: "https://noflaye.seneau.sn/",
    isProspect: true,
  },
  {
    id: "28",
    name: "Senelec",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/senelec.png",
    description:
      "Société nationale d'électricité, monopole de distribution au Sénégal.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Énergie & Électricité",
    website: "https://www.senelec.sn",
    isProspect: true,
  },
  {
    id: "29",
    name: "Sococim Industries",
    type: "Utilisateur",
    tier: "Agojie",
    logo: "/images/utilisateurs/socosim.png",
    description: "Premier cimentier du Sénégal, filiale du groupe Vicat.",
    location: "Rufisque, Sénégal",
    country: "Sénégal",
    sector: "Cimenterie & BTP",
    website: "https://www.sococim.sn",
    isProspect: true,
  },
  {
    id: "30",
    name: "SONACOS",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/sonacos.png",
    description:
      "Société nationale de commercialisation des oléagineux du Sénégal.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Agroalimentaire",
    website: "https://sonacos.sn/",
    isProspect: true,
  },
  {
    id: "31",
    name: "TotalEnergies Marketing Sénégal",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/total-energies.png",
    description: "Filiale Total, réseau de stations-service au Sénégal.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Distribution de carburants",
    website: "https://totalenergies.sn",
    isProspect: true,
  },
  {
    id: "32",
    name: "Vivo Energy Sénégal (Shell)",
    type: "Utilisateur",
    tier: "Miganon",
    logo: "/images/utilisateurs/vivo-sn.png",
    description:
      "Distributeur Shell en Afrique, réseau stations et lubrifiants.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Distribution de carburants",
    website: "https://www.vivoenergy.com",
    isProspect: true,
  },
  {
    id: "33",
    name: "Woodside Energy Sénégal",
    type: "Utilisateur",
    tier: "Dah",
    logo: "/images/utilisateurs/woodside-energy.png",
    description: "Opérateur australien du projet pétrolier Sangomar offshore.",
    location: "Dakar, Sénégal",
    country: "Sénégal",
    sector: "Pétrole offshore",
    website: "https://www.woodside.com",
    isProspect: true,
  },
];

// ============================================================
// CONSTANTES DE FILTRAGE
// ============================================================

export const MEMBER_TYPES: {
  value: MemberType | "all";
  label: string;
}[] = [
  { value: "all", label: "Tous" },
  { value: "Offreur", label: "Offreurs" },
  { value: "Utilisateur", label: "Utilisateurs" },
  { value: "Contributeur", label: "Contributeurs" },
  { value: "Partenaire", label: "Partenaires" },
];

export const TIERS: { value: Tier | "all"; label: string }[] = [
  { value: "all", label: "Tous les tiers" },
  { value: "Asuka", label: "Asuka" },
  { value: "Agojie", label: "Agojie" },
  { value: "Miganon", label: "Miganon" },
  { value: "Dah", label: "Dah" },
];

export const TYPE_COLORS: Record<MemberType, string> = {
  Offreur: "#0077B6",
  Utilisateur: "#26A69A",
  Contributeur: "#F9A825",
  Partenaire: "#7C3AED",
};
