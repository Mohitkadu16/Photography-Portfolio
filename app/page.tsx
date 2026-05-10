import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import SkillsGear from "@/components/SkillsGear";
import Work from "@/components/Work";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import MarqueeBanner from "@/components/MarqueeBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <SkillsGear />
      <Work />
      <About />
      <Resume />
      <Contact />
    </main>
  );
}
