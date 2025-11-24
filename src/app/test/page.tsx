/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import {
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Star,
  Check,
  Share2,
  MessageCircle,
  Menu,
  X,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  Target,
  Lightbulb,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// PAGE DE TEST - DESIGN BRAIN IMO2TUN
// ============================================

export default function DesignTestPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ============================================ */}
      {/* SECTION 1: TOP BAR */}
      {/* ============================================ */}
      <div className="bg-primary-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="tel:+33632808316"
            className="flex items-center gap-2 text-sm hover:text-secondary-500 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+33 6 32 80 83 16</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-secondary-500 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-secondary-500 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-secondary-500 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 2: HEADER (Fond blanc) */}
      {/* ============================================ */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">i2</span>
            </div>
            <span className="font-bold text-xl">
              <span className="text-primary-600">imo</span>
              <span className="text-secondary-500">2</span>
              <span className="text-accent-500">tun</span>
            </span>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#"
              className="text-primary-600 font-medium transition-colors"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-neutral-600 font-medium hover:text-primary-600 transition-colors"
            >
              À propos
            </a>
            <a
              href="#"
              className="text-neutral-600 font-medium hover:text-primary-600 transition-colors"
            >
              Actualités
            </a>
            <a
              href="#"
              className="text-neutral-600 font-medium hover:text-primary-600 transition-colors"
            >
              Événements
            </a>
            <a
              href="#"
              className="text-neutral-600 font-medium hover:text-primary-600 transition-colors"
            >
              Adhérer
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="#"
            className="hidden md:inline-flex bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 items-center gap-2"
          >
            Contactez-nous
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 3: HERO HOME */}
      {/* ============================================ */}
      <section className="bg-gradient-to-br from-white to-neutral-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Construisons ensemble l'écosystème numérique{" "}
              <span className="text-primary-600">africain</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              imo2tun est une association loi 1901 à but non lucratif qui se
              veut être une académie de la connaissance au service de la
              jeunesse africaine.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Devenir Membre
              </a>
              <a
                href="#"
                className="bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                Découvrir nos programmes
              </a>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-16 h-16 text-primary-600" />
                </div>
                <p className="text-neutral-600">Image Hero</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: PARTNERS SLIDER */}
      {/* ============================================ */}
      <section className="bg-white py-8 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {["IBIAPARA", "IMEP", "FDN", "COLLEGE", "PARTENAIRE"].map(
              (partner, i) => (
                <div
                  key={i}
                  className="h-12 px-6 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 font-semibold grayscale hover:grayscale-0 hover:bg-primary-50 hover:text-primary-600 transition-all cursor-pointer"
                >
                  {partner}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: SECTION TITLE + MISSION CARDS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Notre Mission
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-7 h-7" />,
                title: "Former les talents",
                description:
                  "Combler l'écart observé de la disponibilité de compétences opérationnelles chez les jeunes dès leur premier jour d'embauche.",
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Connecter les experts",
                description:
                  "Créer un écosystème vertueux où nos membres se retrouvent à travers des événements thématiques réguliers.",
              },
              {
                icon: <Lightbulb className="w-7 h-7" />,
                title: "Innover ensemble",
                description:
                  "Promouvoir l'appartenance à un écosystème permettant aux jeunes diplômés de trouver de l'expertise de qualité.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 border border-neutral-200 text-center hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {item.description}
                </p>
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  En savoir plus <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: STATS BANNER */}
      {/* ============================================ */}
      <section className="relative py-16 bg-primary-900">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-3 gap-8 text-center text-white">
            {[
              { value: "500+", label: "Membres" },
              { value: "50+", label: "Experts" },
              { value: "20+", label: "Formations" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl md:text-5xl font-bold text-secondary-500">
                  {stat.value}
                </span>
                <p className="text-white/80 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: EVENT CARDS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Prochains Événements
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Event Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card - Grande (Featured) */}
            <motion.div
              className="bg-primary-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1 lg:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white/30" />
                </div>
                <span className="absolute top-3 left-3 inline-block px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                  À venir
                </span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full" />
                </div>
              </div>
              <div className="p-5 pt-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Lancement officiel imo2tun
                </h3>
                <div className="space-y-2 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>20 octobre 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>8h - 17h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Cotonou, Azalaï Hotel</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mt-3 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  at consequat sapien.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    S'inscrire
                  </a>
                  <a
                    href="#"
                    className="flex-1 border border-white/30 hover:bg-white/10 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Event Cards - Petites */}
            {[1, 2, 3, 4].map((_, i) => (
              <motion.div
                key={i}
                className="bg-primary-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-white/30" />
                  </div>
                  <span
                    className={`absolute top-3 right-3 inline-block px-3 py-1 ${i % 2 === 0 ? "bg-accent-500" : "bg-neutral-500"} text-white text-xs font-semibold rounded-full`}
                  >
                    {i % 2 === 0 ? "À venir" : "Passé"}
                  </span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full" />
                  </div>
                </div>
                <div className="p-4 pt-6 text-center">
                  <h3 className="text-base font-semibold text-white">
                    Lorem ipsum dolor sit amet
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-medium hover:border-primary-600 hover:text-primary-600 transition-all"
            >
              Voir tous les événements
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 8: ARTICLE CARDS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Actualités & Insights
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Article Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-52">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-neutral-400" />
                  </div>
                  <span className="absolute top-3 right-3 inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    Tech
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    Lorem ipsum dolor sit amet consectetur
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis at consequat sapien. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                        <Users className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        Jonathon Lopez
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500">
                      20 oct. 2025
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-secondary-500 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Lire la suite <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 bg-white text-neutral-700 rounded-lg font-medium hover:border-primary-600 hover:text-primary-600 transition-all"
            >
              Toutes les actualités
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 9: TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Ils parlent de nous
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-secondary-500 text-secondary-500"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  at consequat sapien. Nullam interdum neque vel ipsum
                  tincidunt."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    {["JL", "MA", "SK"][i]}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {["Jonathon Lopez", "Marie Adélaïde", "Samuel Koffi"][i]}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {
                        [
                          "CEO, TechCorp",
                          "Directrice, InnoLab",
                          "Fondateur, StartupX",
                        ][i]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 10: PRICING CARDS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choisissez votre type d'adhésion
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {["OFFREURS", "UTILISATEURS", "CONTRIBUTEURS", "PARTENAIRES"].map(
              (tab, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "bg-secondary-500 text-white" : "bg-white text-neutral-600 hover:bg-neutral-200"}`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tier: "ASUKA", price: "20.000", featured: false },
              { tier: "SUNUN", price: "20.000", featured: true },
              { tier: "MINDAHO", price: "20.000", featured: false },
              { tier: "DAH", price: "20.000", featured: false },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`bg-white rounded-2xl p-6 text-center transition-all duration-300 ${plan.featured ? "border-2 border-secondary-500 shadow-xl scale-105 relative" : "border border-neutral-200"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <span
                  className={`inline-block px-4 py-1 ${plan.featured ? "bg-primary-600" : "bg-primary-100"} ${plan.featured ? "text-white" : "text-primary-600"} text-sm font-semibold rounded-full mb-4`}
                >
                  {plan.tier}
                </span>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neutral-900">
                    {plan.price}
                  </span>
                  <span className="text-lg text-neutral-500 ml-1">FCFA</span>
                </div>
                <ul className="space-y-3 mb-6 text-left">
                  {[
                    "Avantage numéro 1",
                    "Avantage numéro 2",
                    "Avantage numéro 3",
                    "Avantage numéro 4",
                  ].map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <Check className="w-4 h-4 text-accent-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.featured ? "bg-secondary-500 text-white hover:bg-secondary-600" : "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"}`}
                >
                  Choisir
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 11: PROCESS STEPS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Processus d'adhésion
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: "Candidature" },
              { icon: <Users className="w-6 h-6" />, title: "Validation" },
              { icon: <Check className="w-6 h-6" />, title: "Activation" },
              { icon: <Award className="w-6 h-6" />, title: "Bienvenue" },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                <p className="text-sm text-neutral-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 12: FAQ */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquemment posées
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* FAQ Accordion */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  q: "Lorem ipsum dolor sit amet ?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at consequat sapien. Nullam interdum neque vel ipsum tincidunt, vel vehicula justo consequat.",
                },
                {
                  q: "Comment fonctionne l'adhésion ?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at consequat sapien. Nullam interdum neque vel ipsum tincidunt.",
                },
                {
                  q: "Quels sont les avantages membres ?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at consequat sapien.",
                },
                {
                  q: "Comment participer aux événements ?",
                  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at consequat sapien. Nullam interdum neque vel ipsum tincidunt.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-neutral-900">
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <Minus className="w-5 h-5 text-primary-600 shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-neutral-600">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Contact Box */}
            <div className="bg-neutral-50 rounded-xl p-6 h-fit border border-neutral-200">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-secondary-500" />
              </div>
              <h4 className="font-semibold text-center mb-2">
                Avez-vous d'autres questions ?
              </h4>
              <p className="text-sm text-neutral-600 text-center mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a
                href="#"
                className="w-full bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                Écrivez-nous directement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 13: CTA SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-16 h-16 text-primary-600 mx-auto mb-2" />
                  <p className="text-neutral-500">Image CTA</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Prêt à rejoindre l'aventure ?
              </h2>
              <p className="text-neutral-600 mb-8">
                Cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus. Cum soluta nobis
                est eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus.
              </p>
              <a
                href="#"
                className="bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Devenir Membre Maintenant
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 14: PAGE HEADER (Pour pages intérieures) */}
      {/* ============================================ */}
      <section className="relative bg-gradient-to-r from-accent-600 to-primary-600 min-h-[300px] flex flex-col">
        {/* Header Transparent */}
        <header className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">i2</span>
              </div>
              <span className="font-bold text-xl text-white">
                imo<span className="text-secondary-500">2</span>tun
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className="text-white/90 font-medium hover:text-white transition-colors"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-white/90 font-medium hover:text-white transition-colors"
              >
                À propos
              </a>
              <a
                href="#"
                className="text-secondary-500 font-medium transition-colors"
              >
                Actualités
              </a>
              <a
                href="#"
                className="text-white/90 font-medium hover:text-white transition-colors"
              >
                Événements
              </a>
              <a
                href="#"
                className="text-white/90 font-medium hover:text-white transition-colors"
              >
                Adhérer
              </a>
            </nav>
            <a
              href="#"
              className="hidden md:inline-flex bg-secondary-500 text-white hover:bg-secondary-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              Contactez-nous
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center text-center px-4 py-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Événements
            </h1>
            <p className="text-white/80 text-lg">Participez à nos rencontres</p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 15: BREADCRUMB BAR */}
      {/* ============================================ */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a
              href="/"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              Accueil
            </a>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <a
              href="/evenements"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              Événements
            </a>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            <span className="text-secondary-500 font-medium">Détails</span>
          </nav>
          <button className="flex items-center gap-2 text-secondary-500 hover:text-secondary-600 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Partager</span>
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 16: SPEAKER CARDS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Les Intervenants
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Speaker Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Anne DOE", "Jean DUPONT", "Marie CLAIRE", "Paul MARTIN"].map(
              (name, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                    <Users className="w-10 h-10 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900">{name}</h4>
                  <p className="text-sm text-neutral-500">Techno Corp</p>
                  <p className="text-xs text-secondary-500">PDG</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 17: NEWSLETTER BANNER */}
      {/* ============================================ */}
      <section className="relative bg-gradient-to-r from-primary-600 to-accent-500 py-16 overflow-hidden">
        {/* Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Pour plus d'informations
          </h2>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Votre Nom"
              className="flex-1 px-4 py-3 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Votre E-mail"
              className="flex-1 px-4 py-3 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300"
            >
              Soumettre
            </button>
          </form>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 18: FOOTER */}
      {/* ============================================ */}
      <footer className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-3 gap-12 py-16">
          {/* Colonne 1 - Logo & Description */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">i2</span>
              </div>
              <span className="font-bold text-xl text-white">
                imo<span className="text-secondary-500">2</span>tun
              </span>
            </a>
            <p className="text-neutral-400 text-sm">
              L'expérience d'une connaissance nouvelle au service de la jeunesse
              africaine pour un développement durable.
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h4 className="text-white font-semibold mb-4 underline underline-offset-4 decoration-secondary-500">
              Liens rapides
            </h4>
            <ul className="space-y-2">
              {[
                "Accueil",
                "À propos",
                "Actualités",
                "Événements",
                "Adhérer",
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 underline underline-offset-4 decoration-secondary-500">
              Contactez-nous
            </h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>(33) 632808316</li>
              <li>info@imo2tun.org</li>
              <li>
                12 rue Pasteur 60280 Margny-lès-Compiègne
                <br />
                Oise France
              </li>
              <li>
                Lot 2019, Zogbohouè Maison Colonel BOSSOU
                <br />
                Emmanuel 071 BP 333, Cotonou Bénin
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary-900 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between text-sm text-neutral-500">
            <span>Copyright © 2025 imo2tun.</span>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-white transition-colors">
                CGU
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* SECTION 19: UI COMPONENTS SHOWCASE */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Composants UI
            </h2>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>

          {/* Buttons */}
          <div className="bg-white rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Boutons
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02]">
                Bouton Primary
              </button>
              <button className="bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 inline-flex items-center gap-2">
                Bouton Secondary
              </button>
              <button className="text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-2">
                Bouton Ghost <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-600 hover:text-neutral-900">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Badges
            </h3>
            <div className="flex flex-wrap gap-4">
              <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                Tech
              </span>
              <span className="inline-block px-3 py-1 bg-secondary-500 text-white text-xs font-semibold rounded-full">
                Digital
              </span>
              <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                À venir
              </span>
              <span className="inline-block px-3 py-1 bg-neutral-500 text-white text-xs font-semibold rounded-full">
                Passé
              </span>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Formulaires
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nom*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-200"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-200 resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                  />
                  <span className="text-sm text-neutral-600">
                    J'accepte les{" "}
                    <a href="#" className="text-primary-600 underline">
                      conditions générales
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="text-primary-600 underline">
                      politique de confidentialité
                    </a>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
