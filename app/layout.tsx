import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Malique Oil and Gas Ltd — Integrated Energy & Business Solutions",
    template: "%s",
  },
  description:
    "Malique Oil and Gas Ltd is a Nigerian company delivering integrated energy, infrastructure and commercial solutions — LPG and gas services, oil and gas operations, filling stations and gas plants, engineering and construction, real estate, borehole and water works, marine and dredging, transportation, procurement, import/export and training — headquartered in Rivers State.",
  keywords: [
    "Malique Oil and Gas",
    "oil and gas Nigeria",
    "LPG",
    "cooking gas",
    "acetylene",
    "methane",
    "gas delivery",
    "filling station",
    "gas plant",
    "Rivers State",
    "Port Harcourt",
    "cylinder refill",
    "construction",
    "real estate",
    "borehole drilling",
    "water works",
    "dredging",
    "haulage",
    "procurement",
    "import export",
    "training",
  ],
  openGraph: {
    title: "Malique Oil and Gas Ltd — Integrated Energy & Business Solutions",
    description:
      "A diversified Nigerian energy, infrastructure and commercial company — LPG and gas, oil and gas operations, filling stations and gas plants, engineering, construction, real estate, water works, dredging, transportation, procurement, import/export and training.",
    images: ["/logo.png"],
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <ScrollReveal />
        <AuthProvider>{children}</AuthProvider>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
