import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import { VehicleProvider } from "@/components/VehicleContext";
import PricingSection from "@/components/PricingSection";
import MonthlyPlans from "@/components/MonthlyPlans";
import AddOnServices from "@/components/AddOnServices";
import WhyAutoGlow from "@/components/WhyAutoGlow";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import AppointmentSection from "@/components/AppointmentSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Services />
        <VehicleProvider>
          <PricingSection />
          <MonthlyPlans />
        </VehicleProvider>
        <AddOnServices />
        <WhyAutoGlow />
        <BeforeAfter />
        <Testimonials />
        <AppointmentSection />
        <FAQ />
        <FinalCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
