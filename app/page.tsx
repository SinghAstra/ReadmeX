import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import DemoForm from "./demo-form";
import FAQ from "./faq";
import FeatureSection from "./feature-section";
import HeroSection from "./hero";
import Navbar from "./navbar";
import Pricing from "./pricing";
import Testimonials from "./testimonial";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const isAuthenticated = session ? true : false;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <HeroSection isAuthenticated={isAuthenticated} />

        <section id="demo" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <DemoForm />
          </div>
        </section>

        <section id="features">
          <FeatureSection />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="pricing">
          <Pricing />
        </section>

        <section id="faq">
          <FAQ />
        </section>
      </main>
    </>
  );
};

export default HomePage;
