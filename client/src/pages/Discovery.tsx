import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Users, Zap } from "lucide-react";
import { buddhistAgents } from "@shared/buddhistAgents";
import { Link } from "wouter";
import { TracingBeam } from "@/components/TracingBeam";

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tất cả", icon: "🏛️" },
    { id: "monastery", label: "Chùa Chiền", icon: "🏯" },
    { id: "meditation-center", label: "Thiền Viện", icon: "🧘" },
    { id: "temple", label: "Đền Tháp", icon: "⛩️" },
    { id: "retreat-center", label: "Trung Tâm Tu Tập", icon: "🌄" },
  ];

  const getCenterCategory = (monastery: string | undefined): string => {
    if (!monastery) return "meditation-center";
    const lower = monastery.toLowerCase();
    if (lower.includes("chùa") || lower.includes("tự")) {
      return "monastery";
    }
    if (lower.includes("thiền viện") || lower.includes("thiền tông")) {
      return "meditation-center";
    }
    if (lower.includes("đền") || lower.includes("tháp")) {
      return "temple";
    }
    if (lower.includes("trung tâm") || lower.includes("center")) {
      return "retreat-center";
    }
    return "meditation-center";
  };

  const filteredAgents = buddhistAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agent.monastery && agent.monastery.toLowerCase().includes(searchQuery.toLowerCase()));

    const centerCategory = getCenterCategory(agent.monastery);
    const matchesCategory = selectedCategory === "all" || centerCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const AgentCard = ({ agent }: { agent: typeof buddhistAgents[0] }) => {
    const category = getCenterCategory(agent.monastery);
    const categoryLabel = categories.find((c) => c.id === category)?.label || "Khác";
    const categoryIcon = categories.find((c) => c.id === category)?.icon || "🏛️";

    return (
      <Link href="/docs/models">
        <a>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f3ead7] border-2 border-[#2c2c2c] rounded-2xl overflow-hidden
              shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset]
              hover:shadow-[0_3px_0_#00000040,0_0_0_3px_#00000015_inset] transition-all cursor-pointer h-full"
            data-testid={`card-discovery-agent-${agent.id}`}
          >
            <div
              className="relative h-32 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${agent.accentColor}20 0%, ${agent.accentColor}40 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-lg"
                  style={{ backgroundColor: agent.accentColor }}
                >
                  {categoryIcon}
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-serif font-bold text-[#2c2c2c] mb-2">{agent.name}</h3>
              <p className="text-sm font-serif text-[#991b1b] font-semibold mb-3">{agent.tagline}</p>
              <p className="text-sm font-serif text-[#2c2c2c]/70 mb-4 line-clamp-3">{agent.purpose}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#2c2c2c]/60">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold">{agent.model}</span>
                </div>
                {agent.monastery && (
                  <div className="flex items-center gap-2 text-[#2c2c2c]/60">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-serif">{agent.monastery}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-serif font-semibold border-2"
                  style={{
                    backgroundColor: `${agent.accentColor}20`,
                    color: agent.accentColor,
                    borderColor: agent.accentColor,
                  }}
                >
                  {categoryLabel}
                </span>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#991b1b] text-white rounded-xl
                  border-2 border-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset]
                  hover:bg-[#7a1515] transition-colors font-semibold text-sm"
                data-testid={`button-explore-discovery-${agent.id}`}
              >
                <Sparkles className="w-4 h-4" />
                Tìm hiểu thêm
              </button>
            </div>
          </motion.div>
        </a>
      </Link>
    );
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
            <Link href="/">
              <a className="font-serif font-bold text-lg tracking-tight text-[#991b1b]" data-testid="text-brand">
                Giác Ngộ
              </a>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/docs/models">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-agents">
                  Agent Models
                </a>
              </Link>
              <Link href="/discovery">
                <a className="font-serif text-[#991b1b] px-4 py-2 rounded-full bg-[#8B4513]/10 transition-colors" data-testid="link-discovery">
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
          <section className="min-h-screen px-4 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#991b1b]" data-testid="text-discovery-title">
                  Khám Phá Cộng Đồng
                </h1>
                <p className="font-serif text-xl text-[#8B4513]/70 max-w-2xl mx-auto mb-8">
                  Kết nối với các chùa chiền, thiền viện, và trung tâm tu tập Phật giáo khắp nơi trên thế giới
                </p>

                <div className="max-w-2xl mx-auto mb-8">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md border border-[#8B4513]/30 rounded-full px-6 py-4 shadow-sm">
                    <Search className="w-5 h-5 text-[#8B4513]/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm cộng đồng, chùa chiền, thiền viện..."
                      className="flex-1 bg-transparent outline-none text-base font-serif text-[#8B4513] placeholder:text-[#8B4513]/50"
                      data-testid="input-discovery-search"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-serif font-semibold text-sm
                        ${
                          selectedCategory === category.id
                            ? "bg-[#991b1b] text-white shadow-md"
                            : "bg-white/30 backdrop-blur-md text-[#8B4513] border border-[#8B4513]/20 hover:bg-white/50"
                        }`}
                      data-testid={`button-category-${category.id}`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-serif text-lg text-[#8B4513]/70">
                  Tìm thấy <span className="font-bold text-[#991b1b]">{filteredAgents.length}</span> cộng đồng
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>

              {filteredAgents.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏯</div>
                  <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">Không tìm thấy cộng đồng</h3>
                  <p className="font-serif text-lg text-[#8B4513]/70">
                    Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                  </p>
                </div>
              )}
            </div>
          </section>
        </TracingBeam>

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
                <Link href="/discovery">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Discovery
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
