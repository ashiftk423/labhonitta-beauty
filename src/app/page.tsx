import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import SoundToggle from "@/components/SoundToggle";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import MakeupTransformation from "@/components/sections/MakeupTransformation";
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
      <main className="relative z-10">
        <Hero />
        <Services />
        <MakeupTransformation />
        <HairStudio />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
