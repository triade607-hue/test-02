"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler un envoi
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setEmail("");
    setName("");
    setIsSubmitting(false);

    // TODO: Implémenter l'envoi réel
    alert("Merci pour votre inscription !");
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-accent-500 py-12 lg:py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Pour plus d&apos;informations
          </h2>
          <p className="text-white/80">
            Inscrivez-vous à notre newsletter pour rester informé de nos
            actualités
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-secondary-500"
          />
          <input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-secondary-500"
          />
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
          >
            S&apos;abonner
          </Button>
        </form>
      </div>
    </section>
  );
}
