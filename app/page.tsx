import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Announcements } from "@/components/announcements";
import { Divisions } from "@/components/divisions";
import { Products } from "@/components/products";
import { WhyChooseUs } from "@/components/why-choose-us";
import { HowItWorks } from "@/components/how-it-works";
import { Branches } from "@/components/branches";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Announcements />
        <Divisions />
        <Products />
        <WhyChooseUs />
        <HowItWorks />
        <Branches />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
