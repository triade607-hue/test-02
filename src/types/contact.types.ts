// ============================================================
// TYPES CONTACT - imo2tun
// ============================================================

// ==================== PAYLOADS ====================

/**
 * Payload pour envoyer un message de contact
 */
export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  message: string;
}

/**
 * Payload pour s'abonner à la newsletter
 */
export interface NewsletterSubscribePayload {
  name: string;
  email: string;
}

// ==================== RESPONSES ====================

/**
 * Réponse de l'envoi de message de contact
 */
export interface ContactResponse {
  message: string;
}

/**
 * Réponse de l'abonnement newsletter
 */
export interface NewsletterResponse {
  message: string;
}

// ==================== STATE ====================

/**
 * État du hook useContact
 */
export interface ContactState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  successMessage: string | null;
}

// ==================== CONSTANTS ====================

/**
 * Liste des professions pour le select
 */
export const PROFESSIONS = [
  { value: "", label: "Sélectionnez votre profession" },
  { value: "Développeur", label: "Développeur / Ingénieur logiciel" },
  { value: "Designer", label: "Designer UI/UX" },
  { value: "Chef de projet", label: "Chef de projet / Product Manager" },
  { value: "Data Analyst", label: "Data Analyst / Data Scientist" },
  { value: "DevOps", label: "DevOps / SysAdmin" },
  { value: "Marketing Digital", label: "Marketing Digital" },
  { value: "Consultant IT", label: "Consultant IT" },
  { value: "Entrepreneur", label: "Entrepreneur / Startup Founder" },
  { value: "Étudiant", label: "Étudiant" },
  { value: "Enseignant", label: "Enseignant / Formateur" },
  { value: "Ressources Humaines", label: "Ressources Humaines" },
  { value: "Commercial", label: "Commercial / Business Developer" },
  { value: "Journaliste", label: "Journaliste / Communicant" },
  { value: "Autre", label: "Autre" },
] as const;

/**
 * Type pour une profession
 */
export type Profession = (typeof PROFESSIONS)[number];
