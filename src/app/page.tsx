import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Mission } from "@/components/Mission";
import { Values } from "@/components/Values";
import { Capabilities } from "@/components/Capabilities";
import { Footer } from "@/components/Footer";
import { BackgroundTransition } from "@/components/BackgroundTransition";

export default function Home() {
  return (
    <main>
      <BackgroundTransition />
      <Navigation />
      <Hero />
      <Portfolio />
      <Services />
      <Mission />
      <Values />
      <Capabilities />
      <Footer />
    </main>
  );
}
