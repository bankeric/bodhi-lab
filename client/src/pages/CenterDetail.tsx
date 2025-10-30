import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  Globe,
  Phone,
  Mail,
  CalendarIcon,
  BookOpen,
  Bot,
  Heart,
  ArrowLeft,
  Clock,
  Video,
  FileText,
  Briefcase,
  Sparkles,
  HandHeart,
  Calendar,
} from "lucide-react";
import { buddhistCenters } from "@shared/buddhistCenters";
import { TracingBeam } from "@/components/TracingBeam";
import logoImage from "@/assets/logo.png";

export default function CenterDetail() {
  const params = useParams();
  const centerId = params.id as string;
  const [activeTab, setActiveTab] = useState<"about" | "dharma-talk" | "calendar" | "library" | "agents" | "donation">(
    "about"
  );

  const center = buddhistCenters.find((c) => c.id === centerId);

  if (!center) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-2">Không tìm thấy cộng đồng</h2>
          <Link href="/discovery">
            <a className="text-[#991b1b] hover:underline font-serif">Quay lại trang khám phá</a>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "about", label: "Giới thiệu", icon: BookOpen },
    { id: "dharma-talk", label: "Pháp Thoại", icon: Video },
    { id: "calendar", label: "Lịch", icon: CalendarIcon },
    { id: "library", label: "Thư viện", icon: FileText },
    { id: "agents", label: "AI Agents", icon: Bot },
    { id: "donation", label: "Cúng dường", icon: Heart },
  ];

  const getStatusBadge = () => {
    switch (center.status) {
      case "open":
        return (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 text-green-700 rounded-lg text-sm font-semibold">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Đang mở
          </div>
        );
      case "closed":
        return (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-700 rounded-lg text-sm font-semibold">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Đóng cửa
          </div>
        );
      case "retreat":
        return (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#991b1b]/20 text-[#991b1b] rounded-lg text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Đang tu tập
          </div>
        );
      case "by-appointment":
        return (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#2c2c2c]/20 text-[#2c2c2c] rounded-lg text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Theo lịch hẹn
          </div>
        );
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
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                  Agent Models
                </a>
              </Link>
              <Link href="/discovery">
                <a className="font-serif text-[#991b1b] px-4 py-2 rounded-full bg-[#8B4513]/10 transition-colors">
                  Discovery
                </a>
              </Link>
              <Link href="/docs/manifesto">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                  Docs
                </a>
              </Link>
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24">
          <div className="px-4 py-8">
            {/* Header with Cover */}
            <div
              className="relative h-64 rounded-3xl overflow-hidden mb-8 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${center.accentColor}60 0%, ${center.accentColor}90 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/60 to-transparent z-10" />

              <Link href="/discovery">
                <a className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md text-[#2c2c2c] rounded-xl
                  hover:bg-white transition-colors font-semibold z-20 shadow-md">
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </a>
              </Link>

              <div className="absolute top-6 right-6 bg-[#991b1b] text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg z-20">
                #{center.rank}
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
              {/* Info Card */}
              <div className="bg-white/50 backdrop-blur-md border border-[#8B4513]/30 rounded-3xl p-8 shadow-lg mb-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                      <div>
                        <h1 className="text-4xl font-serif font-bold text-[#2c2c2c] mb-2">{center.name}</h1>
                        <p className="text-lg font-serif text-[#8B4513]/70">{center.description}</p>
                      </div>
                      {getStatusBadge()}
                    </div>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2 text-[#2c2c2c]">
                        <Users className="w-5 h-5" />
                        <span className="font-serif font-semibold">{center.members.toLocaleString()} thành viên</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2c2c2c]">
                        <Star className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                        <span className="font-serif font-semibold">{center.rating} / 5.0</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2c2c2c]">
                        <MapPin className="w-5 h-5" />
                        <span className="font-serif font-semibold">
                          {center.location}, {center.country}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {center.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg text-sm font-serif font-semibold"
                          style={{
                            backgroundColor: `${center.accentColor}20`,
                            color: center.accentColor,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-80 bg-white border border-[#8B4513]/20 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-serif font-bold text-[#2c2c2c] mb-4">Liên hệ</h3>
                    <div className="space-y-3">
                      {center.website && (
                        <a
                          href={center.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-[#2c2c2c] hover:text-[#991b1b] transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                          <span className="text-sm font-serif">Trang web</span>
                        </a>
                      )}
                      {center.phone && (
                        <a
                          href={`tel:${center.phone}`}
                          className="flex items-center gap-3 text-[#2c2c2c] hover:text-[#991b1b] transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="text-sm font-serif">{center.phone}</span>
                        </a>
                      )}
                      {center.email && (
                        <a
                          href={`mailto:${center.email}`}
                          className="flex items-center gap-3 text-[#2c2c2c] hover:text-[#991b1b] transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                          <span className="text-sm font-serif">{center.email}</span>
                        </a>
                      )}
                    </div>

                    <button
                      className="w-full mt-6 px-6 py-3 bg-[#991b1b] text-white rounded-xl
                        hover:bg-[#7a1515] transition-colors font-serif font-bold text-base shadow-md"
                      data-testid="button-join-community"
                    >
                      Tham gia cộng đồng
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white/50 backdrop-blur-md border border-[#8B4513]/30 rounded-3xl overflow-hidden shadow-lg">
                <div className="flex items-center gap-2 p-3 border-b border-[#8B4513]/20 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap font-serif font-semibold text-sm
                          ${
                            activeTab === tab.id
                              ? "bg-[#991b1b] text-white shadow-md"
                              : "bg-transparent text-[#8B4513] hover:bg-white/50"
                          }`}
                        data-testid={`tab-${tab.id}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-8">
                  {activeTab === "about" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">Về {center.name}</h2>
                        <p className="text-base font-serif text-[#8B4513]/80 leading-relaxed">
                          {center.description}
                        </p>
                      </div>

                      <div className="bg-white/70 border border-[#8B4513]/20 rounded-2xl p-6">
                        <h3 className="text-lg font-serif font-bold text-[#2c2c2c] mb-4">Thông tin chi tiết</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span className="text-[#8B4513]/60 font-serif">Xếp hạng:</span>
                            <span className="font-serif font-semibold">#{center.rank}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8B4513]/60 font-serif">Loại hình:</span>
                            <span className="font-serif font-semibold">{center.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8B4513]/60 font-serif">Thành viên:</span>
                            <span className="font-serif font-semibold">{center.members.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8B4513]/60 font-serif">Đánh giá:</span>
                            <span className="font-serif font-semibold">{center.rating} / 5.0</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "dharma-talk" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">Pháp Thoại</h2>
                      <p className="text-base font-serif text-[#8B4513]/70">
                        Nội dung pháp thoại sẽ được cập nhật sớm...
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "calendar" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">Lịch Tu Tập</h2>
                      <p className="text-base font-serif text-[#8B4513]/70">
                        Lịch các khóa tu và sự kiện sẽ được cập nhật sớm...
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "library" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">Thư Viện</h2>
                      <p className="text-base font-serif text-[#8B4513]/70">
                        Tài liệu và kinh sách sẽ được cập nhật sớm...
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "agents" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">AI Agents</h2>
                      <p className="text-base font-serif text-[#8B4513]/70">
                        Các AI Agent của cộng đồng sẽ được cập nhật sớm...
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "donation" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4">Cúng Dường</h2>
                      <p className="text-base font-serif text-[#8B4513]/70 mb-6">
                        Hỗ trợ cộng đồng tu tập và phát triển các hoạt động hoằng pháp.
                      </p>
                      <button className="px-6 py-3 bg-[#991b1b] text-white rounded-xl hover:bg-[#7a1515] transition-colors font-serif font-bold shadow-md">
                        Cúng dường ngay
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm mt-16">
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
