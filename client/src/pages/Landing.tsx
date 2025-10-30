import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sparkles, Users, Heart } from "lucide-react";
import { Link } from "wouter";
import { buddhistAgents } from "@shared/buddhistAgents";

function TracingBeam({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [beamPosition, setBeamPosition] = useState(50);
  const [beamEnd, setBeamEnd] = useState(50);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = rect.top + scrollY - windowHeight;
      const end = rect.top + scrollY + rect.height;
      const current = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

      setScrollProgress(current);

      const currentTime = Date.now();

      setLastScrollY(scrollY);
      setLastScrollTime(currentTime);

      const targetBeamPosition = 50 + (svgHeight - 100) * current;
      setBeamPosition((prev) => prev + (targetBeamPosition - prev) * 0.1);

      const targetBeamEnd = 50 + (svgHeight - 250) * current;
      setBeamEnd((prev) => prev + (targetBeamEnd - prev) * 0.05);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [svgHeight, lastScrollY, lastScrollTime]);

  return (
    <div ref={ref} className={`relative mx-auto h-full w-full max-w-6xl ${className}`}>
      <div className="absolute top-3 -left-4 md:-left-20">
        <div
          className={`ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm ${
            scrollProgress > 0
              ? "border-[#991b1b] shadow-none"
              : "border-[#8B4513] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full border ${
              scrollProgress > 0 ? "border-[#EFE0BD] bg-[#EFE0BD]" : "border-[#991b1b] bg-[#991b1b]"
            }`}
          />
        </div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          ></path>
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          ></path>
          <defs>
            <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={beamPosition} y2={beamEnd}>
              <stop stopColor="#991b1b" stopOpacity="0"></stop>
              <stop stopColor="#991b1b"></stop>
              <stop offset="0.325" stopColor="#8B4513"></stop>
              <stop offset="1" stopColor="#8B4513" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

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
            <span className="font-serif font-bold text-lg tracking-tight text-[#991b1b]" data-testid="text-brand">
              Giác Ngộ
            </span>
            <div className="flex items-center gap-4">
              <Link href="/docs/models">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-agents">
                  Agent Models
                </a>
              </Link>
              <Link href="/docs/manifesto">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-manifesto">
                  Manifesto
                </a>
              </Link>
              <Link href="/docs/quick-start">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-quick-start">
                  Quick Start
                </a>
              </Link>
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24 pb-16">
          <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative">
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
                Giác Ngộ
              </h1>
              <p
                className={`font-serif text-xl text-[#8B4513]/70 text-center mb-12 max-w-2xl mx-auto transition-all duration-500 ${
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                }`}
                data-testid="text-hero-subtitle"
              >
                Awakening Agentic Social Network
              </p>

              <form
                onSubmit={handleSearch}
                className={`relative transition-all duration-500 ${searchFocused ? "scale-110" : "scale-100"}`}
              >
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r rounded-full opacity-0 transition-all duration-300 ${
                      searchFocused ? "from-[#991b1b]/20 to-[#8B4513]/20 opacity-100 blur-sm" : ""
                    }`}
                  ></div>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      placeholder={searchFocused ? "" : "Hỏi về Phật pháp, tu tập, và con đường giác ngộ..."}
                      className="font-serif h-16 w-full pl-16 pr-32 rounded-full bg-white/50 backdrop-blur-md border border-[#8B4513]/30 text-[#8B4513] placeholder:text-[#8B4513]/50 focus:border-[#991b1b] focus:ring-2 focus:ring-[#991b1b]/20 transition-all duration-300 outline-none"
                      data-testid="input-search"
                    />
                    {searchFocused && searchQuery === "" && (
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 text-[#8B4513]/50 pointer-events-none font-serif">
                        <AnimatedPlaceholder
                          texts={[
                            "Giác Ngộ nghĩa là gì?",
                            "Làm sao để thành Phật?",
                            "Làm sao để thoát mọi khổ đau?",
                            "Làm sao để tìm thấy hạnh phúc mãi mãi?",
                          ]}
                        />
                      </div>
                    )}
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8B4513]/50" />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <span className="font-serif text-xs px-1.5 py-0.5 rounded bg-[#991b1b]/20 text-[#991b1b] border border-[#991b1b]/30">
                        AI
                      </span>
                      <div className="font-serif text-sm text-[#8B4513]/50 border-r border-[#8B4513]/20 pr-4 pl-2">
                        + Chat
                      </div>
                      <button
                        type="submit"
                        className="h-10 w-10 rounded-full bg-[#991b1b] hover:bg-[#8B4513] transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        data-testid="button-search-submit"
                      >
                        <ArrowRight className="h-5 w-5 text-[#EFE0BD]" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div
                className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-500 ${
                  searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
                }`}
              >
                {popularQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="font-serif px-4 py-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md border border-[#8B4513]/20 transition-colors text-[#8B4513]"
                    onClick={() => {
                      setSearchQuery(question.name);
                      handleSearch();
                    }}
                    data-testid={`button-question-${index}`}
                  >
                    {question.name}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`absolute bottom-8 left-0 right-0 flex justify-center gap-16 transition-all duration-500 ${
                searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">12+</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">Buddhist AI Agents</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">20K+</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">Conversations</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-[#991b1b]">24/7</div>
                <div className="font-serif text-[#8B4513]/50 text-sm">Available</div>
              </div>
            </div>
          </section>
        </TracingBeam>

        {/* Community Agents Section */}
        <section className="py-16 px-4 bg-[#EFE0BD]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-agents-title">
                Agents từ Cộng Đồng
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                Khám phá các AI Agent được phát triển bởi các chùa chiền, thiền viện và trung tâm tu tập khắp nơi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {buddhistAgents.slice(0, 6).map((agent) => (
                <div
                  key={agent.id}
                  className="group bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl"
                  data-testid={`card-community-agent-${agent.id}`}
                >
                  <div
                    className="relative h-32 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${agent.accentColor}20 0%, ${agent.accentColor}40 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: agent.accentColor }}
                      >
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">
                        {agent.name}
                      </h3>
                      <p className="font-serif text-sm italic text-[#991b1b] font-semibold mb-3">
                        {agent.tagline}
                      </p>
                      <p className="font-serif text-sm text-[#2c2c2c]/70 line-clamp-2">
                        {agent.purpose}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#8B4513]/20">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded-lg text-xs font-mono font-semibold"
                          style={{
                            backgroundColor: `${agent.accentColor}20`,
                            color: agent.accentColor,
                          }}
                        >
                          {agent.model}
                        </span>
                      </div>
                      {agent.monastery && (
                        <div className="text-xs font-serif text-[#8B4513]/60 truncate max-w-[150px]">
                          {agent.monastery}
                        </div>
                      )}
                    </div>

                    {agent.users !== undefined && agent.likes !== undefined && (
                      <div className="flex items-center gap-4 text-sm text-[#8B4513]/60">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-serif">{agent.users >= 1000 ? `${(agent.users / 1000).toFixed(1)}K` : agent.users}</span>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="font-serif">{agent.likes}</span>
                        </div>
                      </div>
                    )}

                    <Link href="/docs/models">
                      <a>
                        <button
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#991b1b] text-white rounded-xl hover:bg-[#7a1515] transition-colors font-serif font-semibold text-sm shadow-md"
                          data-testid={`button-explore-${agent.id}`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Khám phá Agent
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/docs/models">
                <a>
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border-2 border-[#991b1b] rounded-full text-[#991b1b] font-serif font-semibold text-lg hover:bg-[#991b1b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="button-view-all-agents"
                  >
                    Xem tất cả {buddhistAgents.length} Agents
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">Giác Ngộ Initiative</span>
              <div className="flex gap-6">
                <Link href="/docs/manifesto">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Manifesto
                  </a>
                </Link>
                <Link href="/docs/models">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Agent Models
                  </a>
                </Link>
                <Link href="/docs/quick-start">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Quick Start
                  </a>
                </Link>
              </div>
              <div className="font-serif text-[#8B4513]/50">© {new Date().getFullYear()} Giác Ngộ</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
