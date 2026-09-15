import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ApiSection from "../components/ApiSection";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import LandingFooter from "../components/LandingFooter";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">

      <LandingNavbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ApiSection />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <LandingFooter />

    </div>
  );
};

export default Home;