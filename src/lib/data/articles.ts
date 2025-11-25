import { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "1",
    slug: "lancement-plateforme-imo2tun",
    title: "imo2tun lance sa plateforme pour l'écosystème numérique africain",
    excerpt:
      "Découvrez comment imo2tun compte révolutionner la formation aux métiers du numérique en Afrique avec sa nouvelle plateforme collaborative.",
    image: "/images/articles/lancement.jpg",
    category: "Actualité",
    author: {
      name: "Équipe imo2tun",
      avatar: "/images/team/admin.jpg",
    },
    publishedAt: "2025-01-15",
    readTime: 5,
    tags: ["Lancement", "Plateforme", "Innovation"],
  },
  {
    id: "2",
    slug: "importance-cloud-computing-afrique",
    title: "L'importance du Cloud Computing pour les entreprises africaines",
    excerpt:
      "Le Cloud Computing représente une opportunité majeure pour la transformation digitale des entreprises en Afrique. Analyse et perspectives.",
    image: "/images/articles/cloud.jpg",
    category: "Tech",
    author: {
      name: "Dr. Kofi Mensah",
      role: "Expert Cloud",
    },
    publishedAt: "2025-01-10",
    readTime: 8,
    tags: ["Cloud", "Transformation digitale", "Afrique"],
  },
  {
    id: "3",
    slug: "formation-jeunes-numerique",
    title: "Former les jeunes aux métiers du numérique : un enjeu crucial",
    excerpt:
      "Face aux défis de l'employabilité, la formation aux compétences numériques devient essentielle pour la jeunesse africaine.",
    image: "/images/articles/formation.jpg",
    category: "Formation",
    author: {
      name: "Aminata Diallo",
      role: "Responsable Formation",
    },
    publishedAt: "2025-01-05",
    readTime: 6,
    tags: ["Formation", "Jeunesse", "Emploi"],
  },
];
