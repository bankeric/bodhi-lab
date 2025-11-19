import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sparkles, Users, Heart, Briefcase, FileText, Shield, BookOpen, MessageCircle, Calendar, HandHeart, Check } from "lucide-react";
import { Link } from "wouter";
import { buddhistAgents } from "@shared/buddhistAgents";
import { TracingBeam } from "@/components/TracingBeam";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { landingTranslations } from "@/translations/landing";

// Buddhist artwork for agent cards
import agentArt1 from "@assets/3_1761844028297.png";
import agentArt2 from "@assets/15_1761844089890.png";
import agentArt3 from "@assets/4_1761844089892.png";
import agentArt4 from "@assets/32_1761844089890.png";
import agentArt5 from "@assets/19_1761844089892.png";
import agentArt6 from "@assets/5_1761844089893.png";
import heroBackgroundImage from "@assets/ChatGPT Image Nov 18, 2025, 04_57_10 PM_1763503305579.png";
import bodhiLogo from "@assets/Bodhi Logo_1763503529516.png";

// Mapping of agent IDs to artwork images (first 6 featured agents)
const agentArtwork: Record<string, string> = {
  "tam-an": agentArt1,
  "giac-ngo": agentArt2,
  "don-ngo": agentArt3,
  "tinh-thuc": agentArt4,
  "ke-van-ngo": agentArt5,
  "van-tinh": agentArt6,
};

function AnimatedPlaceholder({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const text = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.substring(0, currentText.length + 1));
          setTypingSpeed(80);
        } else {
          setIsDeleting(true);
          setTypingSpeed(1000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(text.substring(0, currentText.length - 1));
          setTypingSpeed(40);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}


export default function Landing() {
  const { language } = useLanguage();
  const t = landingTranslations[language];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE0BD] text-[#8B4513] overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFE0BD] via-[#E5D5B7] to-[#EFE0BD]"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(rgba(139, 69, 19, 0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#991b1b]/10 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#8B4513]/10 blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#EFE0BD]/80 border-b border-[#8B4513]/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="relative group">
              <Link href="/" className="flex items-center" data-testid="link-brand">
                <img src={bodhiLogo} alt="Bodhi Technology Lab" className="h-12 brightness-110 contrast-125" />
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2">
                <div className="bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] backdrop-blur-xl border border-[#8B4513]/30 rounded-3xl shadow-2xl overflow-hidden w-[250px]"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(139, 69, 19, 0.1), 0 20px 60px rgba(139, 69, 19, 0.15)' }}>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                        <Briefcase className="w-3.5 h-3.5 text-[#991b1b]" />
                      </div>
                      {t.header.company.title}
                    </h3>
                    <div className="space-y-3">
                      <Link href="/about">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-about">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.company.about}
                        </a>
                      </Link>
                      <Link href="/career">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-career">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.company.career}
                        </a>
                      </Link>
                      <Link href="/terms">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-terms">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.company.terms}
                        </a>
                      </Link>
                      <Link href="/privacy">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-privacy">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.company.privacy}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#capabilities" 
                className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" 
                data-testid="link-services"
              >
                {t.header.nav.services}
              </a>
              <a 
                href="#services" 
                className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" 
                data-testid="link-pricing"
              >
                {t.header.nav.pricing}
              </a>
              <Link href="/platform">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-platform">
                  {t.header.nav.platform}
                </a>
              </Link>
              <Link href="/docs/overview">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-docs">
                  {t.header.nav.docs}
                </a>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24">
          <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative pb-16">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <img 
                src={heroBackgroundImage} 
                alt="" 
                className="w-[600px] h-[600px] object-contain opacity-20 animate-[spin_30s_linear_infinite]"
              />
            </div>
            <div
              className={`max-w-4xl w-full transition-all duration-500 ease-out ${
                searchFocused ? "scale-105" : "scale-100"
              }`}
            >
              <h1
                className={`font-serif text-5xl md:text-7xl font-bold mb-6 text-center text-[#991b1b] transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-title"
              >
                {t.hero.title}
              </h1>
              <p
                className={`font-serif text-xl text-[#8B4513]/70 text-center mb-12 max-w-2xl mx-auto transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-subtitle"
              >
                {t.hero.subtitle}
              </p>
              <p
                className={`font-serif text-base text-[#8B4513]/60 text-center mb-8 max-w-2xl mx-auto transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-description"
              >
                {t.hero.description}
              </p>

              <div className={`flex flex-wrap justify-center gap-4 transition-all duration-500 ${searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                <a
                  href="#services"
                  className="font-serif px-8 py-4 rounded-xl bg-[#991b1b] hover:bg-[#8B4513] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  data-testid="button-start-sprint"
                >
                  {t.hero.cta.startSprint}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#capabilities"
                  className="font-serif px-8 py-4 rounded-xl bg-white/50 backdrop-blur-md hover:bg-white/70 text-[#991b1b] font-semibold border-2 border-[#8B4513]/20 transition-all duration-300 hover:scale-105"
                  data-testid="button-explore-platform"
                >
                  {t.hero.cta.explorePlatform}
                </a>
              </div>

              <div
                className={`flex flex-wrap justify-center gap-6 mt-8 transition-all duration-500 ${
                  searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
                }`}
              >
                {t.hero.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#8B4513]/70 font-serif text-sm">
                    <Check className="w-4 h-4 text-[#991b1b]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`absolute bottom-8 left-0 right-0 flex justify-center gap-16 transition-all duration-500 ${
                searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">{t.hero.stats.engineers.value}</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">{t.hero.stats.engineers.label}</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">{t.hero.stats.certification.value}</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">{t.hero.stats.certification.label}</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">{t.hero.stats.network.value}</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">{t.hero.stats.network.label}</div>
              </div>
            </div>
          </section>

          {/* Platform Capabilities Section */}
          <section id="capabilities" className="py-16 px-4 bg-[#EFE0BD]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-capabilities-title">
                {t.capabilities.title}
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                {t.capabilities.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Custom Branding */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-branding">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.customBranding.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.customBranding.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.customBranding.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Donation Tools */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-donation">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <HandHeart className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.donationTools.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.donationTools.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.donationTools.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Event Calendar */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-events">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.eventCalendar.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.eventCalendar.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.eventCalendar.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* AI Guidance */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-ai">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.aiGuidance.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.aiGuidance.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.aiGuidance.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Document Library */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-library">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.documentLibrary.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.documentLibrary.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.documentLibrary.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Community Forum */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-forum">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">{t.capabilities.communityForum.title}</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  {t.capabilities.communityForum.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.communityForum.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="#services">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border-2 border-[#991b1b] rounded-full text-[#991b1b] font-serif font-semibold text-lg hover:bg-[#991b1b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="button-view-services"
                >
                  {t.capabilities.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="services" className="py-16 px-4 bg-[#EFE0BD]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-services-title">
                {t.pricing.title}
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Start */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-start">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">{t.pricing.start.title}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold text-[#991b1b]">{t.pricing.start.price}</span>
                      <span className="font-serif text-[#8B4513]/70">{t.pricing.start.priceUnit}</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">{t.pricing.start.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {t.pricing.start.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-xs text-[#2c2c2c]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300 text-sm"
                    data-testid="button-subscribe-start"
                  >
                    {t.pricing.start.cta}
                  </button>
                </div>
              </div>

              {/* Scale - Featured */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#991b1b] hover:shadow-2xl transition-all duration-300 relative" data-testid="card-pricing-scale">
                <div className="absolute top-0 left-0 right-0 bg-[#991b1b] text-white text-center py-2 font-serif text-xs font-semibold">
                  {t.pricing.scale.badge}
                </div>
                <div className="p-6 pt-10">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">{t.pricing.scale.title}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold text-[#991b1b]">{t.pricing.scale.price}</span>
                      <span className="font-serif text-[#8B4513]/70">{t.pricing.scale.priceUnit}</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">{t.pricing.scale.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {t.pricing.scale.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-xs text-[#2c2c2c]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-[#991b1b] rounded-xl text-white font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md text-sm"
                    data-testid="button-subscribe-scale"
                  >
                    {t.pricing.scale.cta}
                  </button>
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-enterprise">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">{t.pricing.enterprise.title}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-3xl font-bold text-[#991b1b]">{t.pricing.enterprise.price}</span>
                      <span className="font-serif text-[#8B4513]/70">{t.pricing.enterprise.priceUnit}</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">{t.pricing.enterprise.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {t.pricing.enterprise.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-xs text-[#2c2c2c]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300 text-sm"
                    data-testid="button-contact-enterprise"
                  >
                    {t.pricing.enterprise.cta}
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Package Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#991b1b]/5 to-[#8B4513]/5 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#991b1b]/30 shadow-xl p-8">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-3xl font-bold text-[#991b1b] mb-2">{t.pricing.premium.title}</h3>
                  <p className="font-serif text-lg text-[#8B4513] mb-4">{t.pricing.premium.subtitle}</p>
                  <p className="font-serif text-sm text-[#8B4513]/70 max-w-2xl mx-auto">{t.pricing.premium.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {t.pricing.premium.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-4">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    className="px-8 py-3 bg-[#991b1b] rounded-xl text-white font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-lg"
                    data-testid="button-add-premium"
                  >
                    {t.pricing.premium.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Information */}
              <div>
                <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-6" data-testid="text-contact-title">
                  {t.contact.title}
                </h2>
                <p className="font-serif text-lg text-[#8B4513]/70 mb-8">
                  {t.contact.subtitle}
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">{t.contact.benefits.whiteLabelSolutions.title}</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">{t.contact.benefits.whiteLabelSolutions.description}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">{t.contact.benefits.customAiAgents.title}</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">{t.contact.benefits.customAiAgents.description}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">{t.contact.benefits.donationLibraryTools.title}</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">{t.contact.benefits.donationLibraryTools.description}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">{t.contact.benefits.dedicatedSupport.title}</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">{t.contact.benefits.dedicatedSupport.description}</p>
                    </div>
                  </li>
                </ul>

                <p className="font-serif text-sm text-[#8B4513]/70 mt-8">
                  {t.contact.note}
                </p>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-[#8B4513]/20 shadow-lg">
                <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">
                  {t.contact.form.title}
                </h3>
                <p className="font-serif text-sm text-[#8B4513]/70 mb-6">
                  {t.contact.form.subtitle}
                </p>

                {/* Tally Inline Embed */}
                <iframe
                  data-tally-src="https://tally.so/embed/aQQvOv?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Contact our team"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <img src={bodhiLogo} alt="Bodhi Technology Lab" className="h-11 brightness-110 contrast-125" />
              <div className="flex gap-6">
                <a 
                  href="#capabilities" 
                  className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors"
                >
                  {t.footer.platform}
                </a>
                <a 
                  href="#services" 
                  className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors"
                >
                  {t.footer.services}
                </a>
                <Link href="/docs/overview">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    {t.footer.docs}
                  </a>
                </Link>
              </div>
              <div className="font-serif text-[#8B4513]/50">{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
