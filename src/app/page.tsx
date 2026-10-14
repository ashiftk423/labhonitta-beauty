import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import SoundToggle from "@/components/SoundToggle";
import Hero from "@/components/sections/Hero";
import ServiceStrip from "@/components/sections/ServiceStrip";
import About from "@/components/sections/About";
import SignatureClients from "@/components/sections/SignatureClients";
import WorkShowcase from "@/components/sections/WorkShowcase";
import Services from "@/components/sections/Services";
import HairStudio from "@/components/sections/HairStudio";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <Navbar />
      <SoundToggle />
      <main className="relative z-10 isolate">
        <Hero />
        <ServiceStrip />
        <SignatureClients />
        <About />
        <WorkShowcase />
        <Services />
        <HairStudio />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
