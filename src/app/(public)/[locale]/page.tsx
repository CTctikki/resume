import LandingHeader from "@/components/home/LandingHeader";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

type LandingPageProps = {
  params?: {
    locale?: string;
  };
};

export const runtime = "edge";

export default function LandingPage({ params }: LandingPageProps = {}) {
  const locale = params?.locale === "zh" ? "zh" : "en";

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader locale={locale} />
      <HeroSection locale={locale} />
      <FeaturesSection locale={locale} />
      <CTASection locale={locale} />
      <FAQSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
