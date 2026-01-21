// ============================================================
// SERVICE CONTACT - imo2tun
// ============================================================

import { post } from "@/lib/api/client";
import { CONTACT_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  ContactPayload,
  ContactResponse,
  NewsletterSubscribePayload,
  NewsletterResponse,
} from "@/types/contact.types";

// ==================== SEND CONTACT MESSAGE ====================

/**
 * Envoyer un message de contact
 * @param payload - Données du formulaire de contact
 * @returns Message de confirmation
 */
export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResponse> {
  return post<ContactResponse>(CONTACT_ENDPOINTS.SEND, payload);
}

// ==================== NEWSLETTER ====================

/**
 * S'abonner à la newsletter
 * @param payload - Nom et email
 * @returns Message de confirmation
 */
export async function subscribeNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterResponse> {
  return post<NewsletterResponse>(
    CONTACT_ENDPOINTS.NEWSLETTER_SUBSCRIBE,
    payload,
  );
}

/**
 * Se désabonner de la newsletter
 * @param email - Email à désabonner
 * @returns Message de confirmation
 */
export async function unsubscribeNewsletter(
  email: string,
): Promise<NewsletterResponse> {
  return post<NewsletterResponse>(CONTACT_ENDPOINTS.NEWSLETTER_UNSUBSCRIBE, {
    email,
  });
}

// ==================== EXPORT GROUPÉ ====================

export const contactService = {
  sendContactMessage,
  subscribeNewsletter,
  unsubscribeNewsletter,
};

export default contactService;
