import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Sparkles, Users, Heart, Briefcase, FileText, Shield, BookOpen, MessageCircle, Calendar, HandHeart, Check, Repeat2, MoreVertical, Home, User, Bell, Hash, Radio, Clock, X, Mic, Hand, Share2 } from "lucide-react";
import { Link } from "wouter";
import { buddhistAgents } from "@shared/buddhistAgents";
import { TracingBeam } from "@/components/TracingBeam";

// Buddhist practitioner avatars
import avatar1 from "@assets/download (4)_1761842289234.jpg";
import avatar2 from "@assets/The Beginner's Guide to Meditation for Men_1761842289235.jpg";
import avatar3 from "@assets/♥_1761842289235.jpg";
import avatar4 from "@assets/Meditation_1761842289236.jpg";
import avatar5 from "@assets/Forest Meditation Moment – Calm Mind Retreat Vibes_1761842289236.jpg";
import avatar6 from "@assets/download (3)_1761842289236.jpg";
import avatar7 from "@assets/download (2)_1761842289237.jpg";
import avatar8 from "@assets/Buddhist nun_1761842289237.jpg";
import avatar9 from "@assets/download (1)_1761842289238.jpg";
import avatar10 from "@assets/download_1761842289238.jpg";
import avatar11 from "@assets/Master Shi HengYi_1761842289239.jpg";
import avatar12 from "@assets/3bacb184-32f1-4538-91c4-375a56b5ea47_1761842289239.jpg";
import avatar13 from "@assets/6bed521b-69ca-4b5d-a603-9d2361bff5f7_1761842289240.jpg";

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

function SocialNetworkSection() {
  const [activeView, setActiveView] = useState<"feed" | "search" | "profile" | "notifications">("feed");
  
  const trendingSuggestions = {
    topics: ["ngã nhân", "bình yên", "giác ngộ", "từ bi", "thiền định"],
    keywords: ["vô ngã", "nhân quả", "tứ diệu đế", "bát chánh đạo", "niết bàn"],
    questions: [
      "A Di Đà nghĩa là gì?",
      "Cực Lạc Tây Phương là đâu?",
      "Làm sao để tu tập thiền?",
      "Vô thường có nghĩa gì?",
      "Phật dạy gì về khổ đau?",
    ],
  };

  return (
    <section id="awaken-feed" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl font-bold text-[#991b1b] mb-4" data-testid="text-social-title">
            Engage Your Sangha
          </h2>
          <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
            White-label community platform to connect your practitioners, share Dharma talks, and foster mindful discussions
          </p>
          <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic mb-2">
            The interactive demo below shows the member experience within your temple's custom-branded platform—featuring your branding, your AI agents (like "Giác Ngộ" shown here), and your sangha's conversations
          </p>
          <p className="font-serif text-xs text-[#8B4513]/50 max-w-2xl mx-auto italic">
            (Demo content in Vietnamese represents sample temple community interactions)
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 rounded-2xl max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-3 p-4">
            <button
              onClick={() => setActiveView("feed")}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors ${
                activeView === "feed" ? "bg-[#d4af37] text-[#2c2c2c]" : "bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9]"
              }`}
              title="Community Feed - Sangha Announcements"
              data-testid="button-social-home"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveView("search")}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors ${
                activeView === "search" ? "bg-[#d4af37] text-[#2c2c2c]" : "bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9]"
              }`}
              title="Search Members & Topics"
              data-testid="button-social-search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveView("profile")}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors ${
                activeView === "profile" ? "bg-[#d4af37] text-[#2c2c2c]" : "bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9]"
              }`}
              title="Member Profile - Practitioner View"
              data-testid="button-social-profile"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveView("notifications")}
              className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] transition-colors ${
                activeView === "notifications" ? "bg-[#d4af37] text-[#2c2c2c]" : "bg-[#f3ead7] text-[#1f1f1f] hover:bg-[#efe2c9]"
              }`}
              title="Event & Announcement Notifications"
              data-testid="button-social-notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#991b1b] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                4
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Search View */}
          {activeView === "search" && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Search temple members, topics, or teachings..."
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-md text-[#2c2c2c] placeholder-[#8B4513]/50 font-serif rounded-2xl border-2 border-[#8B4513]/20 focus:outline-none focus:border-[#991b1b]/40 transition-colors"
                data-testid="input-social-search"
              />

              <div className="bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 rounded-2xl p-5">
                {/* Trending Topics */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#991b1b]" />
                    <h3 className="text-sm font-bold text-[#2c2c2c]">Chủ đề nổi bật</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSuggestions.topics.map((topic) => (
                      <button
                        key={topic}
                        className="px-4 py-2 bg-[#EFE0BD] text-[#2c2c2c] rounded-full text-sm font-medium border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-white transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Keywords */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-sm font-bold text-[#2c2c2c]">Từ khóa phổ biến</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSuggestions.keywords.map((keyword) => (
                      <button
                        key={keyword}
                        className="px-4 py-2 bg-white text-[#2c2c2c] rounded-full text-sm font-medium border border-[#2c2c2c]/20 hover:bg-[#2c2c2c] hover:text-white transition-colors"
                      >
                        #{keyword}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Questions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-[#991b1b]" />
                    <h3 className="text-sm font-bold text-[#2c2c2c]">Câu hỏi thường gặp</h3>
                  </div>
                  <div className="space-y-2">
                    {trendingSuggestions.questions.map((question) => (
                      <button
                        key={question}
                        className="w-full text-left px-4 py-3 bg-white border border-[#991b1b]/10 rounded-xl text-sm text-[#2c2c2c] hover:bg-[#EFE0BD] hover:border-[#991b1b]/30 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile View */}
          {activeView === "profile" && (
            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={avatar3} 
                      alt="Minh Tâm" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37]"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-[#2c2c2c] mb-1">Minh Tâm</h2>
                      <p className="text-base text-[#8B4513]/60 mb-3">@minhtam</p>
                      <p className="text-sm text-[#2c2c2c]/80 leading-relaxed max-w-md">
                        Học Phật, tu tâm, sống an lạc. Chia sẻ những bài học từ Phật pháp và hành trình giác ngộ của bản thân.
                      </p>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-white border-2 border-[#2c2c2c] rounded-xl text-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] hover:bg-[#efe2c9] transition-colors text-sm font-semibold">
                    Edit Profile
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/10">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#2c2c2c]">24</p>
                    <p className="text-sm text-[#8B4513]/60">Bài viết</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#2c2c2c]">156</p>
                    <p className="text-sm text-[#8B4513]/60">Người theo dõi</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#2c2c2c]">89</p>
                    <p className="text-sm text-[#8B4513]/60">Đang theo dõi</p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <button className="px-6 py-2 bg-[#991b1b] text-white rounded-xl border-2 border-[#991b1b] shadow-[0_2px_0_#991b1b20] hover:bg-[#7a1515] transition-colors text-sm font-semibold">
                      Theo dõi
                    </button>
                  </div>
                </div>
              </div>

              {/* Minh Tâm's Posts */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-profile-post-1">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar3} 
                    alt="Minh Tâm" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Minh Tâm</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@minhtam</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">293 ngày trước</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Lời dạy này đã giúp tôi tìm thấy sự bình yên trong những ngày khó khăn. Cảm ơn Phật pháp!
                </p>

                <div className="bg-gradient-to-br from-[#EFE0BD]/80 to-[#E5D5B7]/80 rounded-xl p-5 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#991b1b]">Giác Ngộ</span>
                  </div>
                  <div className="mb-3">
                    <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-2">
                      "Làm thế nào để tìm thấy bình an trong tâm?"
                    </p>
                    <p className="font-serif text-[#2c2c2c] leading-relaxed">
                      Bình an không phải là điều ta tìm kiếm bên ngoài, mà là trạng thái ta nuôi dưỡng từ bên trong. Khi tâm không còn bám víu vào quá khứ, không lo âu về tương lai, chỉ an trú trong giây phút hiện tại - đó chính là bình an chân thật. Hãy bắt đầu bằng việc quan sát hơi thở, để tâm trở về với thân, và từ từ, bình an sẽ tự nhiên hiện ra.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-like-profile-post-1">
                    <Heart className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">15</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-profile-post-1">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">7</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-profile-post-1">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">3</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-profile-post-2">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar8} 
                    alt="Thanh Hương" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#991b1b]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Thanh Hương</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@thanhhuong</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">293 ngày trước</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Đúng vậy, sống trong hiện tại là chìa khóa để giải thoát khỏi lo âu.
                </p>

                <div className="bg-gradient-to-br from-[#EFE0BD]/80 to-[#E5D5B7]/80 rounded-xl p-5 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#991b1b]">Tâm An</span>
                  </div>
                  <div className="mb-3">
                    <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-2">
                      "Tôi cảm thấy lo lắng về tương lai. Phật dạy gì về điều này?"
                    </p>
                    <p className="font-serif text-[#2c2c2c] leading-relaxed">
                      Lo lắng về tương lai là khổ đau mà tâm tự tạo ra. Đức Phật dạy rằng tương lai chưa đến, quá khứ đã qua, chỉ có hiện tại là thật. Hãy sống trọn vẹn trong từng khoảnh khắc, làm tốt những gì có thể làm hôm nay, và tin tưởng vào nhân quả. Khi ta gieo nhân lành, quả tốt sẽ đến một cách tự nhiên.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-like-profile-post-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-serif text-sm font-semibold">8</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-profile-post-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">4</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-profile-post-2">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">1</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications View */}
          {activeView === "notifications" && (
            <div className="bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#8B4513]/10">
                <h3 className="text-lg font-bold text-[#2c2c2c]">Thông báo</h3>
                <button className="text-xs text-[#991b1b] hover:text-[#7a1515] font-semibold">
                  Đánh dấu đã đọc
                </button>
              </div>

              <div className="divide-y divide-[#8B4513]/10">
                <div className="flex items-start gap-3 p-4 bg-[#EFE0BD]/20">
                  <img 
                    src={avatar8} 
                    alt="Thanh Hương" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#8B4513] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2c2c2c]">
                      <span className="font-semibold">Thanh Hương</span>{" "}
                      <span className="text-[#8B4513]/70">đã thích bài viết của bạn</span>
                    </p>
                    <p className="text-xs text-[#8B4513]/50 mt-1">293 ngày trước</p>
                  </div>
                  <Heart className="w-4 h-4 text-[#991b1b] flex-shrink-0" />
                  <div className="w-2 h-2 bg-[#991b1b] rounded-full flex-shrink-0 mt-2"></div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#EFE0BD]/20">
                  <img 
                    src={avatar11} 
                    alt="Tuệ Minh" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#991b1b] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2c2c2c]">
                      <span className="font-semibold">Tuệ Minh</span>{" "}
                      <span className="text-[#8B4513]/70">đã bình luận về bài viết của bạn</span>
                    </p>
                    <p className="text-xs text-[#8B4513]/50 mt-1">293 ngày trước</p>
                  </div>
                  <MessageCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <div className="w-2 h-2 bg-[#991b1b] rounded-full flex-shrink-0 mt-2"></div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#EFE0BD]/20">
                  <img 
                    src={avatar6} 
                    alt="An Nhiên" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2c2c2c]">
                      <span className="font-semibold">An Nhiên</span>{" "}
                      <span className="text-[#8B4513]/70">đã bắt đầu theo dõi bạn</span>
                    </p>
                    <p className="text-xs text-[#8B4513]/50 mt-1">292 ngày trước</p>
                  </div>
                  <User className="w-4 h-4 text-[#2c2c2c] flex-shrink-0" />
                  <div className="w-2 h-2 bg-[#991b1b] rounded-full flex-shrink-0 mt-2"></div>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <img 
                    src={avatar2} 
                    alt="Minh Đức" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#8B4513] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2c2c2c]">
                      <span className="font-semibold">Minh Đức</span>{" "}
                      <span className="text-[#8B4513]/70">đã chia sẻ lại bài viết của bạn</span>
                    </p>
                    <p className="text-xs text-[#8B4513]/50 mt-1">292 ngày trước</p>
                  </div>
                  <Repeat2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                </div>
              </div>
            </div>
          )}

          {/* Feed View (Posts) */}
          {activeView === "feed" && (
            <div className="space-y-6">
              {/* Post 1 */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-social-post-1">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar3} 
                    alt="Minh Tâm" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Minh Tâm</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@minhtam</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">2 giờ trước</span>
                    </div>
                  </div>
                </div>

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

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Lời dạy này đã giúp tôi tìm thấy sự bình yên trong những ngày khó khăn. Cảm ơn Phật pháp! 🙏
                </p>

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
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar11} 
                    alt="Tuệ Minh" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#8B4513]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Tuệ Minh</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">@tueminh</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">1 ngày trước</span>
                    </div>
                  </div>
                </div>

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

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Bài kệ này thật sâu sắc. Mỗi lần đọc lại là một lần hiểu thêm về vô ngã.
                </p>

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
            </div>
          )}
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
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

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
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#capabilities" 
                className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" 
                data-testid="link-platform"
              >
                Platform
              </a>
              <a 
                href="#services" 
                className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" 
                data-testid="link-services"
              >
                Services
              </a>
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

        <SocialNetworkSection />

        {/* Dharma Radio Section */}
        <section id="dharma-radio" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Radio className="w-8 h-8 text-[#991b1b]" />
                <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-radio-title">
                  Dharma Radio
                </h2>
              </div>
              <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                Tham gia các buổi thảo luận trực tiếp về Phật pháp
              </p>
            </div>

            {/* Live Now Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 className="font-serif text-2xl font-bold text-[#991b1b]">Đang Phát Trực Tiếp</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live Radio 1 */}
                <div 
                  onClick={() => setSelectedRadio("live-1")}
                  className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer" 
                  data-testid="card-radio-live-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="flex items-center gap-1 text-[#8B4513]/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">234</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Thiền Định và Tâm An</h4>
                  <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
                    Thảo luận về thực hành thiền định hàng ngày
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={avatar13} 
                      alt="Thầy Minh Tuệ" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37]"
                    />
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#2c2c2c]">Thầy Minh Tuệ</p>
                      <p className="font-serif text-xs text-[#8B4513]/60">Host</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Thiền</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Tâm An</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Thực Hành</span>
                  </div>
                </div>

                {/* Live Radio 2 */}
                <div 
                  onClick={() => setSelectedRadio("live-2")}
                  className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer" 
                  data-testid="card-radio-live-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="flex items-center gap-1 text-[#8B4513]/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">156</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Kinh Kim Cương - Giảng Giải</h4>
                  <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
                    Giảng giải chi tiết về Kinh Kim Cương
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={avatar8} 
                      alt="Cô Thanh Hương" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#991b1b]"
                    />
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#2c2c2c]">Cô Thanh Hương</p>
                      <p className="font-serif text-xs text-[#8B4513]/60">Host</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Kinh Điển</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Giảng Giải</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#8B4513]" />
                <h3 className="font-serif text-2xl font-bold text-[#8B4513]">Sắp Diễn Ra</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scheduled Radio 1 */}
                <div 
                  onClick={() => setSelectedRadio("scheduled-1")}
                  className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer" 
                  data-testid="card-radio-scheduled-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#8B4513]/20 text-[#2c2c2c] rounded-full text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      1h 59m
                    </div>
                    <div className="flex items-center gap-1 text-[#8B4513]/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">0</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Vô Ngã và Giải Thoát</h4>
                  <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
                    Khám phá khái niệm vô ngã trong Phật giáo
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={avatar11} 
                      alt="Thầy Giác Minh" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#8B4513]"
                    />
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#2c2c2c]">Thầy Giác Minh</p>
                      <p className="font-serif text-xs text-[#8B4513]/60">Host</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Vô Ngã</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Triết Học</span>
                  </div>
                </div>

                {/* Scheduled Radio 2 */}
                <div 
                  onClick={() => setSelectedRadio("scheduled-2")}
                  className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer" 
                  data-testid="card-radio-scheduled-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#8B4513]/20 text-[#2c2c2c] rounded-full text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      2h 59m
                    </div>
                    <div className="flex items-center gap-1 text-[#8B4513]/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">0</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Niệm Phật A Di Đà</h4>
                  <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
                    Hướng dẫn thực hành niệm Phật
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={avatar13} 
                      alt="Thầy Minh Tuệ" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37]"
                    />
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#2c2c2c]">Thầy Minh Tuệ</p>
                      <p className="font-serif text-xs text-[#8B4513]/60">Host</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Niệm Phật</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">#Tịnh Độ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dharma Radio Modal */}
        {selectedRadio && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRadio(null)}
          >
            <div 
              className="bg-[#f3ead7] border-2 border-[#2c2c2c] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_6px_0_#00000030]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b-2 border-[#8B4513]/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {selectedRadio.startsWith("live") && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[#8B4513]/60">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {selectedRadio === "live-1" ? "18" : selectedRadio === "live-2" ? "15" : "0"}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">
                      {selectedRadio === "live-1" && "Thiền Định và Tâm An"}
                      {selectedRadio === "live-2" && "Kinh Kim Cương - Giảng Giải"}
                      {selectedRadio === "scheduled-1" && "Vô Ngã và Giải Thoát"}
                      {selectedRadio === "scheduled-2" && "Niệm Phật A Di Đà"}
                    </h3>
                    <p className="font-serif text-sm text-[#8B4513]/70">
                      {selectedRadio === "live-1" && "Thảo luận về thực hành thiền định hàng ngày"}
                      {selectedRadio === "live-2" && "Giảng giải chi tiết về Kinh Kim Cương"}
                      {selectedRadio === "scheduled-1" && "Khám phá khái niệm vô ngã trong Phật giáo"}
                      {selectedRadio === "scheduled-2" && "Hướng dẫn thực hành niệm Phật"}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedRadio(null)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#8B4513]/10 transition-colors"
                    data-testid="button-close-radio-modal"
                  >
                    <X className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                </div>
              </div>

              {/* Host Avatar */}
              <div className="flex flex-col items-center py-8 border-b-2 border-[#8B4513]/20">
                <div className="relative mb-3">
                  <img 
                    src={
                      selectedRadio === "live-1" || selectedRadio === "scheduled-2" ? avatar13 : 
                      selectedRadio === "live-2" ? avatar8 : avatar11
                    }
                    alt="Host"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#d4af37]"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#991b1b] text-white rounded-full text-xs font-semibold">
                    Host
                  </div>
                </div>
                <p className="font-serif font-semibold text-[#2c2c2c] text-lg">
                  {selectedRadio === "live-1" || selectedRadio === "scheduled-2" ? "Thầy Minh Tuệ" : 
                   selectedRadio === "live-2" ? "Cô Thanh Hương" : "Thầy Giác Minh"}
                </p>
              </div>

              {/* Speakers */}
              <div className="p-6 border-b-2 border-[#8B4513]/20">
                <h4 className="font-serif text-xs uppercase tracking-wider text-[#8B4513]/60 mb-4 text-center">
                  SPEAKERS (5)
                </h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[
                    { name: "Cô Thanh Hương", avatar: avatar8 },
                    { name: "Anh Minh Đức", avatar: avatar3 },
                    { name: "Chị Hồng Nhung", avatar: avatar6 },
                    { name: "Anh Quang Minh", avatar: avatar2 },
                    { name: "Chị Phương Anh", avatar: avatar8 },
                  ].map((speaker, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <img 
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#8B4513] mb-1"
                      />
                      <p className="font-serif text-xs text-[#2c2c2c] text-center max-w-[60px] truncate">
                        {speaker.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Listeners */}
              <div className="p-6">
                <h4 className="font-serif text-xs uppercase tracking-wider text-[#8B4513]/60 mb-4 text-center">
                  LISTENERS (12)
                </h4>
                <div className="grid grid-cols-6 gap-3">
                  {[avatar1, avatar2, avatar3, avatar4, avatar5, avatar7, 
                    avatar9, avatar10, avatar11, avatar12, avatar6, avatar13].map((avatarSrc, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <img 
                        src={avatarSrc}
                        alt={`Listener ${idx + 1}`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#8B4513]/30"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="p-6 bg-[#EFE0BD]/50 border-t-2 border-[#8B4513]/20">
                <div className="flex items-center justify-center gap-3">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2c2c2c] hover:bg-[#8B4513]/10 transition-colors" data-testid="button-radio-mic">
                    <Mic className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2c2c2c] hover:bg-[#8B4513]/10 transition-colors" data-testid="button-radio-hand">
                    <Hand className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2c2c2c] hover:bg-[#8B4513]/10 transition-colors" data-testid="button-radio-like">
                    <Heart className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2c2c2c] hover:bg-[#8B4513]/10 transition-colors" data-testid="button-radio-chat">
                    <MessageCircle className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2c2c2c] hover:bg-[#8B4513]/10 transition-colors" data-testid="button-radio-share">
                    <Share2 className="w-5 h-5 text-[#2c2c2c]" />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#991b1b] border-2 border-[#991b1b] hover:bg-[#7a1515] transition-colors" data-testid="button-radio-leave">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
