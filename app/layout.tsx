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
    "Malique Oil and Gas Ltd is a Nigerian company delivering oil and gas operations, LPG sales and plant services, property development, engineering and construction, transportation, procurement and workforce development — headquartered in Rivers State.",
  keywords: [
    "Malique Oil and Gas",
    "oil and gas Nigeria",
    "LPG",
    "cooking gas",
    "gas delivery",
    "Rivers State",
    "Port Harcourt",
    "cylinder refill",
    "construction",
    "real estate",
    "procurement",
    "haulage",
  ],
  openGraph: {
    title: "Malique Oil and Gas Ltd — Integrated Energy & Business Solutions",
    description:
      "Oil and gas, LPG, construction, real estate, transportation, procurement and workforce development — professionally delivered from Rivers State, Nigeria.",
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
