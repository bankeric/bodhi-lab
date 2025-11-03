import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sparkles, Users, Heart, Briefcase, FileText, Shield, BookOpen, MessageCircle, Calendar, HandHeart, Check } from "lucide-react";
import { Link } from "wouter";
import { buddhistAgents } from "@shared/buddhistAgents";
import { TracingBeam } from "@/components/TracingBeam";

// Buddhist artwork for agent cards
import agentArt1 from "@assets/3_1761844028297.png";
import agentArt2 from "@assets/15_1761844089890.png";
import agentArt3 from "@assets/4_1761844089892.png";
import agentArt4 from "@assets/32_1761844089890.png";
import agentArt5 from "@assets/19_1761844089892.png";
import agentArt6 from "@assets/5_1761844089893.png";

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

function SphereAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <svg width="400" height="400" viewBox="0 0 400 400" className="animate-[spin_20s_linear_infinite]">
        <defs>
          <radialGradient id="sphereGradient">
            <stop offset="0%" stopColor="#991b1b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B4513" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2c2c2c" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="url(#sphereGradient)"
          stroke="#991b1b"
          strokeWidth="2"
          className="animate-pulse"
        />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="#991b1b" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const popularQuestions = [
    { name: "Giác Ngộ nghĩa là gì?" },
    { name: "Làm sao để thành Phật?" },
    { name: "Làm sao để thoát mọi khổ đau?" },
    { name: "Làm sao để tìm thấy hạnh phúc mãi mãi?" },
    { name: "Chánh niệm là gì?" },
    { name: "Nghiệp báo hoạt động ra sao?" },
  ];

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
              <Link href="/">
                <a className="flex items-center" data-testid="link-brand">
                  <span className="font-serif font-bold text-[#991b1b] text-lg">Bodhi Technology Lab</span>
                </a>
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
                      Company
                    </h3>
                    <div className="space-y-3">
                      <Link href="/career">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-career">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Career
                        </a>
                      </Link>
                      <Link href="/terms">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-terms">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Terms
                        </a>
                      </Link>
                      <Link href="/privacy">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-privacy">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Privacy
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
                Services
              </a>
              <a 
                href="#services" 
                className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" 
                data-testid="link-pricing"
              >
                Pricing
              </a>
              <Link href="/platform">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-platform">
                  Platform
                </a>
              </Link>
              <Link href="/discovery">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-discovery">
                  Discovery
                </a>
              </Link>
              <Link href="/docs/overview">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-docs">
                  Docs
                </a>
              </Link>
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24">
          <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative pb-16">
            <div className="absolute inset-0 -z-10">
              <SphereAnimation />
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
                Bodhi Technology Lab
              </h1>
              <p
                className={`font-serif text-xl text-[#8B4513]/70 text-center mb-12 max-w-2xl mx-auto transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-subtitle"
              >
                Awaken Technology for the Dharma-Ending Age
              </p>
              <p
                className={`font-serif text-base text-[#8B4513]/60 text-center mb-8 max-w-2xl mx-auto transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-description"
              >
                A studio-first builder hub for Buddhist organisations. We partner with temples, monasteries, and meditation centres to create sacred technology that serves the Dharma, not the market.
              </p>

              <div className={`flex flex-wrap justify-center gap-4 transition-all duration-500 ${searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                <a
                  href="#services"
                  className="font-serif px-8 py-4 rounded-xl bg-[#991b1b] hover:bg-[#8B4513] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  data-testid="button-start-sprint"
                >
                  Start a Sprint
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#capabilities"
                  className="font-serif px-8 py-4 rounded-xl bg-white/50 backdrop-blur-md hover:bg-white/70 text-[#991b1b] font-semibold border-2 border-[#8B4513]/20 transition-all duration-300 hover:scale-105"
                  data-testid="button-explore-platform"
                >
                  Explore Platform
                </a>
              </div>

              <div
                className={`flex flex-wrap justify-center gap-6 mt-8 transition-all duration-500 ${
                  searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
                }`}
              >
                <div className="flex items-center gap-2 text-[#8B4513]/70 font-serif text-sm">
                  <Check className="w-4 h-4 text-[#991b1b]" />
                  <span>Custom Branding</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B4513]/70 font-serif text-sm">
                  <Check className="w-4 h-4 text-[#991b1b]" />
                  <span>AI-Powered Tools</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B4513]/70 font-serif text-sm">
                  <Check className="w-4 h-4 text-[#991b1b]" />
                  <span>Decentralized Infrastructure</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B4513]/70 font-serif text-sm">
                  <Check className="w-4 h-4 text-[#991b1b]" />
                  <span>Censorship Resistant</span>
                </div>
              </div>
            </div>

            <div
              className={`absolute bottom-8 left-0 right-0 flex justify-center gap-16 transition-all duration-500 ${
                searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">200+</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">Engineers & Monastics</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">ISO</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">9001/27001 Certified</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">Global</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">Decentralized Network</div>
              </div>
            </div>
          </section>

          {/* Platform Capabilities Section */}
          <section id="capabilities" className="py-16 px-4 bg-[#EFE0BD]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-capabilities-title">
                Platform Capabilities
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                White-label tools designed to help your temple thrive, self-fund, and preserve your lineage with dignity and sovereignty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Custom Branding */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-branding">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Custom Branding</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Easily adapt the interface to your monastery's identity. Upload logos, choose color palettes, and map custom domains. Pre-loaded themes evoke Buddhist serenity.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Logo Upload</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Custom Domain</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Theme Builder</span>
                </div>
              </div>

              {/* Donation Tools */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-donation">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <HandHeart className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Donation Tools</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Accept one-time or recurring dāna via cards, bank transfers, or QR codes. Frame contributions as acts of generosity with optional sutra quotes and merit dedication.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Recurring</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">QR Codes</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Anonymous</span>
                </div>
              </div>

              {/* Event Calendar */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-events">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Event & Reminder Calendar</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Schedule temple rituals, group meditations, or retreats with ease. Automated push reminders, RSVP tracking, and pre-set templates for important days like Vesak.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Recurring Events</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">RSVP</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Reminders</span>
                </div>
              </div>

              {/* AI Guidance */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-ai">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Compassionate AI Guidance</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Configurable AI agents with your own knowledge bases. Select doctrinal modes like Zen, Pure Land, or Theravāda. Voice or text queries return curated sutra references.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Custom Knowledge</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Voice & Text</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Multi-Tradition</span>
                </div>
              </div>

              {/* Document Library */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-library">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Document & Resource Library</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Organize sutras, chants, commentaries, and audio/video files in a searchable library. Set access controls, enable offline access, and track versioning for updated translations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Searchable</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Offline Access</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Version Control</span>
                </div>
              </div>

              {/* Community Forum */}
              <div className="group bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl p-6 space-y-4" data-testid="card-capability-forum">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#991b1b]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c]">Community Forum</h3>
                </div>
                <p className="font-serif text-sm text-[#2c2c2c]/70">
                  Optional moderated discussion area for members to ask questions, share reflections, and form study groups. Pre-built Right Speech guidelines and anonymous posting options.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Moderated</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Study Groups</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-sans bg-[#991b1b]/10 text-[#991b1b]">Anonymous</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="#services">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border-2 border-[#991b1b] rounded-full text-[#991b1b] font-serif font-semibold text-lg hover:bg-[#991b1b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="button-view-services"
                >
                  Explore Our Services
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
                Pricing
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                Choose the plan that best serves your sangha—from exploration to enterprise-scale deployment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Seeker (Free) */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-seeker">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Seeker</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold text-[#991b1b]">US$0</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Small sanghas and independent practitioners exploring digital tools</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Access to a single project with basic templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Up to 100 messages/month through AI guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Basic library of open Dharma resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">1 admin user</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">5% donation processing fee</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300 text-sm"
                    data-testid="button-subscribe-seeker"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Practitioner Pod - Featured */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#991b1b] hover:shadow-2xl transition-all duration-300 relative" data-testid="card-pricing-practitioner">
                <div className="absolute top-0 left-0 right-0 bg-[#991b1b] text-white text-center py-2 font-serif text-xs font-semibold">
                  Most Popular
                </div>
                <div className="p-6 pt-10">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Practitioner Pod</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold text-[#991b1b]">US$49</span>
                      <span className="font-serif text-[#8B4513]/70">/month</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Temples and centres ready to digitise day‑to‑day operations</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Unlimited messages and full access to all agents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">White‑label modules for donations, events & library</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Priority support and bug fixes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Up to 5 admin users and 500 active devotees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Reduced donation fee (2%)</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-[#991b1b] rounded-xl text-white font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md text-sm"
                    data-testid="button-subscribe-practitioner"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Sangha Community */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-sangha">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Sangha Community</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold text-[#991b1b]">US$149</span>
                      <span className="font-serif text-[#8B4513]/70">/month</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Large monasteries or regional organisations needing multi‑member coordination</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">All Practitioner Pod features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Multiple pods/sites under one account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Custom domain and branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Advanced analytics dashboards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Custom AI agent training</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300 text-sm"
                    data-testid="button-subscribe-sangha"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Mandala Network */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-mandala">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Mandala Network</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="font-serif text-2xl font-bold text-[#991b1b]">Custom</span>
                    </div>
                    <p className="font-serif text-xs text-[#8B4513]/60 mb-2">(starting at US$299/month)</p>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">National or transnational sangha networks and federations</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Everything in Sangha Community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Bespoke development & unlimited projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Dedicated success manager & 24×7 support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Private on‑premises deployment options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-xs text-[#2c2c2c]">Governance tools for multiple councils</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300 text-sm"
                    data-testid="button-contact-mandala"
                  >
                    Contact Us
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
                  Partner With Us
                </h2>
                <p className="font-serif text-lg text-[#8B4513]/70 mb-8">
                  We offer tailored technology solutions for Buddhist organizations based on your specific needs and community size.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">White-label Solutions</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">Custom-branded platforms for your temple or center</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">Custom AI Agents</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">Specialized agents trained on your lineage's teachings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">Donation and Library Tools</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">Integrated systems for your community operations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#991b1b]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#2c2c2c] mb-1">Dedicated Support</h3>
                      <p className="font-serif text-sm text-[#8B4513]/70">Ongoing technical guidance and training</p>
                    </div>
                  </li>
                </ul>

                <p className="font-serif text-sm text-[#8B4513]/70 mt-8">
                  Contact us for a personalized consultation to discuss your organization's specific needs.
                </p>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-[#8B4513]/20 shadow-lg">
                <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">
                  Contact Our Team
                </h3>
                <p className="font-serif text-sm text-[#8B4513]/70 mb-6">
                  Fill out the form below to discuss your organization's needs and receive a custom proposal.
                </p>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@temple.org"
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Lotus Temple, Dharma Meditation Center"
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      data-testid="input-organization"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      Your Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Director, Abbot, Coordinator"
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      data-testid="input-role"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      Organization Type
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all appearance-none cursor-pointer"
                      data-testid="select-organization-type"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238B4513' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select organization type</option>
                      <option value="temple">Temple</option>
                      <option value="monastery">Monastery</option>
                      <option value="meditation-center">Meditation Center</option>
                      <option value="dharma-center">Dharma Center</option>
                      <option value="retreat-center">Retreat Center</option>
                      <option value="sangha-community">Sangha Community</option>
                      <option value="federation">Buddhist Federation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      Community Size
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all appearance-none cursor-pointer"
                      data-testid="select-organization-size"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238B4513' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select community size</option>
                      <option value="1-50">1-50 members</option>
                      <option value="51-200">51-200 members</option>
                      <option value="201-500">201-500 members</option>
                      <option value="501-1000">501-1,000 members</option>
                      <option value="1000+">1,000+ members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      How can we help?
                    </label>
                    <textarea
                      placeholder="Tell us about your specific needs and goals..."
                      rows={4}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all resize-none"
                      data-testid="textarea-message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md text-sm"
                    data-testid="button-submit-contact"
                  >
                    Request Information
                  </button>

                  <p className="font-serif text-xs text-[#8B4513]/60 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">Bodhi Technology Lab</span>
              <div className="flex gap-6">
                <a 
                  href="#capabilities" 
                  className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors"
                >
                  Platform
                </a>
                <a 
                  href="#services" 
                  className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors"
                >
                  Services
                </a>
                <Link href="/discovery">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Discovery
                  </a>
                </Link>
                <Link href="/docs/overview">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Docs
                  </a>
                </Link>
              </div>
              <div className="font-serif text-[#8B4513]/50">© {new Date().getFullYear()} Bodhi Technology Lab</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
