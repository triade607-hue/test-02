// ============================================
// TYPES PRINCIPAUX - IMO2TUN
// ============================================

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image: string;
  category: string;
  status: "upcoming" | "past";
  price?: number;
  capacity?: number;
  registeredCount?: number;
}
export interface Speaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  bio?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  description?: string;
  type: "conference" | "workshop" | "break" | "networking";
  speakers?: Speaker[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category?: "platinum" | "gold" | "silver" | "bronze";
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface MissionItem {
  icon: string;
  title: string;
  description: string;
  link?: string;
  variant?: "featured" | "default";
}

export interface StatItem {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
