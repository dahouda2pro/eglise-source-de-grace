import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Église Source de Grâce | Kolwezi",
  description:
    "Un lieu de foi, d'espérance et de transformation. Église Source de Grâce, Kolwezi, République démocratique du Congo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
