import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "imo2tun - Construisons ensemble l'écosystème numérique africain",
  description:
    "imo2tun est une association dédiée à la formation et à l'innovation dans les métiers du numérique en Afrique.",
  keywords: [
    "imo2tun",
    "numérique",
    "Afrique",
    "formation",
    "Cloud",
    "Data",
    "IA",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
