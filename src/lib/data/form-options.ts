// ============================================================
// FORM OPTIONS - Données statiques pour les formulaires d'adhésion
// ============================================================

// ==================== CIVILITÉS ====================

export const CIVILITIES = [
  { value: "MR", label: "Monsieur" },
  { value: "MME", label: "Madame" },
  { value: "MLLE", label: "Mademoiselle" },
  { value: "DR", label: "Docteur" },
  { value: "PR", label: "Professeur" },
] as const;

export type CivilityValue = (typeof CIVILITIES)[number]["value"];

// ==================== SECTEURS D'ACTIVITÉ ====================

export const ACTIVITY_SECTORS = [
  { value: "tech", label: "Technologies / Numérique" },
  { value: "telecom", label: "Télécommunications" },
  { value: "finance", label: "Finance / Banque / Assurance" },
  { value: "energie", label: "Énergie / Utilities" },
  { value: "sante", label: "Santé / Pharmaceutique" },
  { value: "education", label: "Éducation / Formation" },
  { value: "commerce", label: "Commerce / Distribution" },
  { value: "industrie", label: "Industrie / Manufacture" },
  { value: "btp", label: "BTP / Construction" },
  { value: "transport", label: "Transport / Logistique" },
  { value: "services", label: "Services aux entreprises" },
  { value: "conseil", label: "Conseil / Audit" },
  { value: "media", label: "Médias / Communication" },
  { value: "agriculture", label: "Agriculture / Agroalimentaire" },
  { value: "administration", label: "Administration publique" },
  { value: "ong", label: "ONG / Association" },
  { value: "autre", label: "Autre" },
] as const;

export type ActivitySectorValue = (typeof ACTIVITY_SECTORS)[number]["value"];

// ==================== EFFECTIFS ====================

export const WORKFORCE_SIZES = [
  { value: "1-10", label: "1-10 employés" },
  { value: "11-50", label: "11-50 employés" },
  { value: "51-200", label: "51-200 employés" },
  { value: "201-500", label: "201-500 employés" },
  { value: "501-1000", label: "501-1000 employés" },
  { value: "1000+", label: "Plus de 1000 employés" },
] as const;

export type WorkforceSizeValue = (typeof WORKFORCE_SIZES)[number]["value"];

// ==================== DURÉES D'ADHÉSION ====================

export const DURATIONS = [1, 2, 5] as const;

export type Duration = (typeof DURATIONS)[number];

// ==================== DOMAINES D'EXPERTISE (contributeurs) ====================

export const EXPERTISE_DOMAINS = [
  { value: "ai-ml", label: "Intelligence Artificielle / Machine Learning" },
  { value: "big-data", label: "Big Data / Analytics" },
  { value: "cybersecurity", label: "Cybersécurité" },
  { value: "cloud", label: "Cloud Computing (AWS, Azure, GCP)" },
  { value: "devops", label: "DevOps / SRE" },
  { value: "blockchain", label: "Blockchain / Web3" },
  { value: "iot", label: "IoT / Systèmes embarqués" },
  { value: "web-dev", label: "Développement Web" },
  { value: "mobile-dev", label: "Développement Mobile" },
  { value: "architecture", label: "Architecture logicielle" },
  { value: "database", label: "Base de données / DBA" },
  { value: "network", label: "Réseaux / Télécoms" },
  { value: "erp", label: "ERP / SAP" },
  { value: "ux-ui", label: "UX/UI Design" },
  { value: "project-management", label: "Gestion de projet / Agile" },
  { value: "digital-transformation", label: "Transformation digitale" },
  { value: "fintech", label: "FinTech" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "digital-marketing", label: "Marketing Digital" },
  { value: "other", label: "Autre" },
] as const;

export type ExpertiseDomainValue = (typeof EXPERTISE_DOMAINS)[number]["value"];
