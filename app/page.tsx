import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import SkillsGear from "@/components/SkillsGear";
import Work from "@/components/Work";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SkillsGear />
      <Work />
      <About />
      <Resume />
      <Contact />
    </main>
  );
}
