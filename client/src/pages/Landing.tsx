import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sparkles, Users, Heart, Briefcase, FileText, Shield, BookOpen, MessageCircle, Calendar, HandHeart, Check, Repeat2, MoreVertical, Home, User, Bell } from "lucide-react";
import { Link } from "wouter";
import { buddhistAgents } from "@shared/buddhistAgents";
import { TracingBeam } from "@/components/TracingBeam";
import logoImage from "@/assets/logo.png";

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
                  <img src={logoImage} alt="Giác Ngộ" className="h-8" />
                </a>
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2">
                <div className="bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] backdrop-blur-xl border border-[#8B4513]/30 rounded-3xl shadow-2xl overflow-hidden w-[850px]"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(139, 69, 19, 0.1), 0 20px 60px rgba(139, 69, 19, 0.15)' }}>
                  <div className="grid grid-cols-4 divide-x divide-[#8B4513]/15">
                    {/* Organization Column */}
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                          <Briefcase className="w-3.5 h-3.5 text-[#991b1b]" />
                        </div>
                        Organization
                      </h3>
                      <div className="space-y-3">
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-career">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Career
                        </a>
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-terms">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Terms
                        </a>
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-privacy">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Privacy
                        </a>
                      </div>
                    </div>
                    
                    {/* Library Column */}
                    <div className="p-6 bg-[#8B4513]/5">
                      <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                          <BookOpen className="w-3.5 h-3.5 text-[#991b1b]" />
                        </div>
                        Library
                      </h3>
                      <div className="space-y-3">
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-sutra">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Sutra
                        </a>
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-verse">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Verse
                        </a>
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-stories">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Stories
                        </a>
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-qa">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Q&A
                        </a>
                      </div>
                    </div>
                    
                    {/* Community Column */}
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                          <Calendar className="w-3.5 h-3.5 text-[#991b1b]" />
                        </div>
                        Community
                      </h3>
                      <div className="space-y-3">
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-dharma-calendar">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Dharma Calendar
                        </a>
                      </div>
                    </div>
                    
                    {/* Donation Column */}
                    <div className="p-6 bg-[#8B4513]/5">
                      <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                          <HandHeart className="w-3.5 h-3.5 text-[#991b1b]" />
                        </div>
                        Donation
                      </h3>
                      <div className="space-y-3">
                        <a href="#" className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10" data-testid="link-donation">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          Support Us
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer CTA */}
                  <div className="border-t border-[#8B4513]/15 p-4 bg-gradient-to-r from-[#991b1b]/5 to-[#8B4513]/5">
                    <a href="#" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#991b1b] text-white rounded-full hover:bg-[#7a1515] transition-all duration-300 hover:scale-105 shadow-lg font-serif font-semibold text-sm" data-testid="button-support-sangha">
                      <Sparkles className="w-4 h-4" />
                      Support the Sangha
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/docs/models">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-agents">
                  Agent Models
                </a>
              </Link>
              <Link href="/discovery">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-discovery">
                  Discovery
                </a>
              </Link>
              <Link href="/docs/manifesto">
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

        {/* Social Network Section */}
        <section className="py-16 px-4 bg-[#EFE0BD]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-social-title">
                Mạng Xã Hội Tâm Linh
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                Chia sẻ và khám phá những lời dạy từ Phật pháp qua các Agent AI
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 rounded-2xl max-w-3xl mx-auto mb-6">
              <div className="flex items-center justify-center gap-3 p-4">
                <button
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] bg-[#d4af37] text-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors"
                  title="Trang chủ - Xem tất cả bài viết"
                  data-testid="button-social-home"
                >
                  <Home className="w-5 h-5" />
                </button>

                <button
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors"
                  title="Tìm kiếm người dùng hoặc chủ đề"
                  data-testid="button-social-search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <button
                  className="flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors"
                  title="Trang cá nhân - Xem bài viết của bạn"
                  data-testid="button-social-profile"
                >
                  <User className="w-5 h-5" />
                </button>

                <button
                  className="relative flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors"
                  title="Thông báo"
                  data-testid="button-social-notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#991b1b] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    4
                  </span>
                </button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {/* Post 1 */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-social-post-1">
                {/* User Info */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8B4513] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Minh Tâm</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@minhtam</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">2 giờ trước</span>
                    </div>
                  </div>
                </div>

                {/* Agent Response Card */}
                <div className="bg-gradient-to-br from-[#EFE0BD]/80 to-[#E5D5B7]/80 rounded-xl p-5 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#991b1b]">Agent: Giác Ngộ</span>
                  </div>
                  <div className="mb-3">
                    <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-2">
                      "Làm thế nào để tìm thấy bình an trong tâm?"
                    </p>
                    <p className="font-serif text-[#2c2c2c] leading-relaxed">
                      Bình an không phải là điều ta tìm kiếm bên ngoài, mà là trạng thái ta nuôi dưỡng từ bên trong. Khi tâm không còn bám víu vào quá khứ, không lo âu về tương lai, chỉ an trú trong giây phút hiện tại - đó chính là bình an chân thật.
                    </p>
                  </div>
                </div>

                {/* User Caption */}
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Lời dạy này đã giúp tôi tìm thấy sự bình yên trong những ngày khó khăn. Cảm ơn Phật pháp! 🙏
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-like-post-1">
                    <Heart className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">15</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-post-1">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">7</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-post-1">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">3</span>
                  </button>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-social-post-2">
                {/* User Info */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B4513] to-[#991b1b] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Tuệ Minh</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@tueminh</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">1 ngày trước</span>
                    </div>
                  </div>
                </div>

                {/* Agent Response Card */}
                <div className="bg-gradient-to-br from-[#EFE0BD]/80 to-[#E5D5B7]/80 rounded-xl p-5 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#991b1b]">Agent: Kệ Vấn Ngộ</span>
                  </div>
                  <div className="mb-3">
                    <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-2">
                      "Thế nào là vô ngã?"
                    </p>
                    <p className="font-serif text-[#2c2c2c] leading-relaxed whitespace-pre-line">
                      Vô ngã không phải là không có "ta",
                      Mà là thấy rõ "ta" chỉ là giả danh.
                      Năm uẩn hợp lại tạm gọi thân,
                      Như mây trôi, như sóng vỗ bờ tan.
                    </p>
                  </div>
                </div>

                {/* User Caption */}
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Bài kệ này thật sâu sắc. Mỗi lần đọc lại là một lần hiểu thêm về vô ngã.
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-like-post-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-serif text-sm font-semibold">22</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-post-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">12</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-post-2">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">5</span>
                  </button>
                </div>
              </div>

              {/* Post 3 */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-social-post-3">
                {/* User Info */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#991b1b] to-[#d4af37] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Thanh Hương</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@thanhhuong</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">3 giờ trước</span>
                    </div>
                  </div>
                </div>

                {/* Agent Response Card */}
                <div className="bg-gradient-to-br from-[#EFE0BD]/80 to-[#E5D5B7]/80 rounded-xl p-5 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#991b1b]">Agent: Tâm An</span>
                  </div>
                  <div className="mb-3">
                    <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-2">
                      "Tôi cảm thấy lo lắng về tương lai. Phật dạy gì về điều này?"
                    </p>
                    <p className="font-serif text-[#2c2c2c] leading-relaxed">
                      Lo lắng về tương lai là khổ đau mà tâm tự tạo ra. Đức Phật dạy rằng tương lai chưa đến, quá khứ đã qua, chỉ có hiện tại là thật. Hãy sống trọn vẹn trong từng khoảnh khắc, làm tốt những gì có thể làm hôm nay.
                    </p>
                  </div>
                </div>

                {/* User Caption */}
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Đúng vậy, sống trong hiện tại là chìa khóa để giải thoát khỏi lo âu.
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-like-post-3">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-serif text-sm font-semibold">8</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-post-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">4</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-post-3">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">1</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CTA to see full feed */}
            <div className="text-center mt-12">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#991b1b] text-white rounded-full font-serif font-semibold text-lg hover:bg-[#7a1515] transition-all duration-300 shadow-lg hover:shadow-xl"
                data-testid="button-view-full-feed"
              >
                Khám phá toàn bộ mạng xã hội
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-pricing-title">
                Pricing
              </h2>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                Lựa chọn gói phù hợp với hành trình tu tập của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-free">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Cư Sĩ</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Lay Practitioner</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-serif text-5xl font-bold text-[#991b1b]">Free</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Truy cập cơ bản các Agent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">100 tin nhắn/tháng</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Tham gia cộng đồng</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Thư viện kinh điển cơ bản</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-6 py-3 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300"
                    data-testid="button-subscribe-free"
                  >
                    Bắt đầu ngay
                  </button>
                </div>
              </div>

              {/* Pro Tier - Featured */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#991b1b] hover:shadow-2xl transition-all duration-300 relative" data-testid="card-pricing-pro">
                <div className="absolute top-0 left-0 right-0 bg-[#991b1b] text-white text-center py-2 font-serif text-sm font-semibold">
                  Phổ biến nhất
                </div>
                <div className="p-8 pt-12">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Hành Giả</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Devoted Practitioner</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-serif text-5xl font-bold text-[#991b1b]">$19</span>
                      <span className="font-serif text-[#8B4513]/70">/tháng</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Không giới hạn tin nhắn</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Truy cập toàn bộ Agent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Ưu tiên hỗ trợ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Thư viện kinh điển đầy đủ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Tạo Agent cá nhân</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-6 py-3 bg-[#991b1b] rounded-xl text-white font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md"
                    data-testid="button-subscribe-pro"
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:shadow-xl transition-all duration-300" data-testid="card-pricing-enterprise">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Tăng Đoàn</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-4">Sangha Community</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-serif text-5xl font-bold text-[#991b1b]">$99</span>
                      <span className="font-serif text-[#8B4513]/70">/tháng</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Tất cả tính năng Hành Giả</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Hỗ trợ nhiều thành viên</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">API tùy chỉnh</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Đào tạo Agent riêng</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Tư vấn chuyên sâu</span>
                    </li>
                  </ul>

                  <button
                    className="w-full px-6 py-3 bg-white border-2 border-[#991b1b] rounded-xl text-[#991b1b] font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all duration-300"
                    data-testid="button-subscribe-enterprise"
                  >
                    Liên hệ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">Giác Ngộ Initiative</span>
              <div className="flex gap-6">
                <Link href="/docs/models">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Agent Models
                  </a>
                </Link>
                <Link href="/discovery">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Discovery
                  </a>
                </Link>
                <Link href="/docs/manifesto">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Docs
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
