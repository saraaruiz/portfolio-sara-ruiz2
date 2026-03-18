import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import CareerSection from "@/components/CareerSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologiesSection from "@/components/MethodologiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <StackSection />
        <CareerSection />
        <ServicesSection />
        <MethodologiesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
