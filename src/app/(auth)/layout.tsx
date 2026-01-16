"use client";

import { GuestGuard } from "@/guards";

/**
 * Layout pour les pages d'authentification (login, register, etc.)
 * Utilise GuestGuard pour rediriger vers /membre si déjà connecté
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
