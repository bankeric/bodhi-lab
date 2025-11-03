import { useState } from "react";
import { Link } from "wouter";
import { Search, Sparkles, Users, Heart, MessageCircle, Repeat2, Home, User, Bell, Hash, Radio, Clock, X, Mic, Hand, Share2, Briefcase, ArrowRight, MapPin, Calendar, Award, Flame, CheckCircle2, UserPlus, ThumbsUp, BookOpen, Megaphone, CalendarClock } from "lucide-react";
import { TracingBeam } from "@/components/TracingBeam";
import { buddhistAgents } from "@shared/buddhistAgents";

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

// Agent artwork images
import agentArt1 from "@assets/3_1761844028297.png";
import agentArt2 from "@assets/15_1761844089890.png";
import agentArt3 from "@assets/4_1761844089892.png";
import agentArt4 from "@assets/32_1761844089890.png";
import agentArt5 from "@assets/19_1761844089892.png";
import agentArt6 from "@assets/5_1761844089893.png";

// Mapping of agent IDs to artwork images
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#991b1b]" />
            <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-social-title">
              Engage Your Sangha
            </h2>
          </div>
          <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
            White-label community platform to connect your practitioners, share Dharma talks, and foster mindful Right Speech discussions with built-in moderation tools
          </p>
          <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto mb-8">
            Create study groups, moderate conversations with Buddhist ethics guidelines, and allow anonymous posting for sensitive spiritual questions—all under your monastery's trusted brand
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {/* Moderation Tools */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 text-left" data-testid="card-forum-moderation">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#991b1b]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#2c2c2c]">Right Speech Moderation</h3>
              </div>
              <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                Pre-built moderation guidelines based on Buddhist Right Speech principles. Flag harmful content, encourage constructive dialogue, and maintain a respectful sangha environment.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">AI-assisted content flagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">Customizable moderation rules</span>
                </li>
              </ul>
            </div>

            {/* Study Groups */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 text-left" data-testid="card-forum-study-groups">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#991b1b]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#2c2c2c]">Study Groups & Circles</h3>
              </div>
              <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                Members form private or public study groups around specific sutras, meditation practices, or philosophical topics. Track progress together with shared reading schedules.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">Create topic-based discussion groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">Shared reading schedules & milestones</span>
                </li>
              </ul>
            </div>

            {/* Anonymous Posting */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 text-left" data-testid="card-forum-anonymous">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#991b1b]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#2c2c2c]">Anonymous Posting Option</h3>
              </div>
              <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                Allow members to ask sensitive spiritual questions anonymously—addressing doubts, personal struggles, or practice challenges without fear of judgment while maintaining community trust.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">Optional anonymous mode per post</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-[#2c2c2c]">Admin accountability tracking</span>
                </li>
              </ul>
            </div>
          </div>

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
                    <div className="relative">
                      <img 
                        src={avatar3} 
                        alt="Minh Tâm" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37]"
                      />
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full" title="Đang hoạt động"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-[#2c2c2c]">Minh Tâm</h2>
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#d4af37]/20 rounded-full">
                          <Award className="w-3 h-3 text-[#d4af37]" />
                          <span className="text-xs font-semibold text-[#2c2c2c]">Intermediate Practitioner</span>
                        </div>
                      </div>
                      <p className="text-base text-[#8B4513]/60 mb-2">@minhtam</p>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-[#8B4513]/70">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Hà Nội, Việt Nam</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Joined March 2023</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                          <Flame className="w-4 h-4" />
                          <span className="text-sm font-bold">108 day streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-white border-2 border-[#2c2c2c] rounded-xl text-[#2c2c2c] shadow-[0_2px_0_#00000030,0_0_0_3px_#00000010_inset] hover:bg-[#efe2c9] transition-colors text-sm font-semibold" data-testid="button-edit-profile">
                    Edit Profile
                  </button>
                </div>

                <div className="mb-4 pb-4 border-b border-[#8B4513]/10">
                  <h3 className="text-sm font-bold text-[#2c2c2c] mb-2">About</h3>
                  <p className="text-sm text-[#2c2c2c]/80 leading-relaxed">
                    Học Phật, tu tâm, sống an lạc. Chia sẻ những bài học từ Phật pháp và hành trình giác ngộ của bản thân. Practicing mindfulness and meditation daily to cultivate inner peace and wisdom.
                  </p>
                </div>

                <div className="mb-4 pb-4 border-b border-[#8B4513]/10">
                  <h3 className="text-sm font-bold text-[#2c2c2c] mb-3">Favorite Practices</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#EFE0BD] text-[#2c2c2c] rounded-full text-xs font-medium border border-[#d4af37]/30">Thiền Vipassana</span>
                    <span className="px-3 py-1 bg-[#EFE0BD] text-[#2c2c2c] rounded-full text-xs font-medium border border-[#d4af37]/30">Niệm Phật</span>
                    <span className="px-3 py-1 bg-[#EFE0BD] text-[#2c2c2c] rounded-full text-xs font-medium border border-[#d4af37]/30">Kinh Hành</span>
                    <span className="px-3 py-1 bg-[#EFE0BD] text-[#2c2c2c] rounded-full text-xs font-medium border border-[#d4af37]/30">Tụng Kinh</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
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
                    <button className="px-6 py-2 bg-[#991b1b] text-white rounded-xl border-2 border-[#991b1b] shadow-[0_2px_0_#991b1b20] hover:bg-[#7a1515] transition-colors text-sm font-semibold" data-testid="button-follow">
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#991b1b]" />
                      <span className="font-serif font-bold text-[#991b1b] text-lg">Giác Ngộ</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-[#991b1b]/10 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs font-semibold text-[#2c2c2c]">Đang hoạt động</span>
                      </div>
                    </div>
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#8B4513]" />
                      <span className="font-serif font-bold text-[#8B4513] text-lg">Tâm An</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span className="text-xs font-semibold text-gray-600">Offline</span>
                      </div>
                    </div>
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
                    <span className="font-serif text-sm font-semibold">3</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-profile-post-2">
                    <Repeat2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">1</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feed View (Home) */}
          {activeView === "feed" && (
            <div className="space-y-6">
              {/* Temple Announcement Post */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-feed-post-1">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar13} 
                    alt="Chùa Linh Quang" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#991b1b]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#2c2c2c]">Chùa Linh Quang</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-[#991b1b]/10 rounded-full">
                        <Megaphone className="w-3 h-3 text-[#991b1b]" />
                        <span className="text-xs font-semibold text-[#991b1b]">Temple</span>
                      </div>
                      <span className="font-serif text-sm text-[#8B4513]/50">@linhquang</span>
                      <span className="text-sm text-[#8B4513]/50">·</span>
                      <span className="font-serif text-sm text-[#8B4513]/50">2 giờ trước</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-2">📿 Thông Báo: Khóa Tu Thiền Cuối Tuần</h3>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Chùa Linh Quang trân trọng thông báo khóa tu thiền cuối tuần dành cho Phật tử. Thời gian: Thứ 7-CN tuần sau (9-10/11). Chương trình bao gồm: Thiền hành, Thiền tọa, Pháp thoại, và Chia sẻ kinh nghiệm. Đăng ký tại văn phòng chùa hoặc qua điện thoại. Nam mô A Di Đà Phật! 🙏
                </p>

                <div className="bg-[#EFE0BD]/50 rounded-xl p-4 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarClock className="w-5 h-5 text-[#991b1b]" />
                    <span className="font-serif font-bold text-[#2c2c2c]">Thông tin sự kiện</span>
                  </div>
                  <div className="space-y-1 text-sm text-[#2c2c2c]/80">
                    <p><span className="font-semibold">Thời gian:</span> 9-10/11/2024, 6:00 AM - 5:00 PM</p>
                    <p><span className="font-semibold">Địa điểm:</span> Chùa Linh Quang, Hà Nội</p>
                    <p><span className="font-semibold">Đã đăng ký:</span> 45 người</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-like-feed-post-1">
                    <Heart className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">32</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-feed-post-1">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">12</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-feed-post-1">
                    <Share2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">8</span>
                  </button>
                </div>
              </div>

              {/* Community Member Re-sharing Agent Response */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-feed-post-2">
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
                    <span className="font-serif font-bold text-[#991b1b] text-base">Agent: Giác Ngộ</span>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-3">
                    "Làm thế nào để tìm thấy bình an trong tâm?"
                  </p>
                  <p className="font-serif text-[#2c2c2c] leading-relaxed">
                    Bình an không phải là điều ta tìm kiếm bên ngoài, mà là trạng thái ta nuôi dưỡng từ bên trong. Khi tâm không còn bám víu vào quá khứ, không lo âu về tương lai, chỉ an trú trong giây phút hiện tại - đó chính là bình an chân thật.
                  </p>
                </div>

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Lời dạy này đã giúp tôi tìm thấy sự bình yên trong những ngày khó khăn. Cảm ơn Phật pháp! 🙏
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-like-feed-post-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">15</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-feed-post-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">7</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-feed-post-2">
                    <Share2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">3</span>
                  </button>
                </div>
              </div>

              {/* Event Reminder Post */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-feed-post-3">
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
                      <span className="font-serif text-sm text-[#8B4513]/50">1 ngày trước</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Nhắc nhở: Buổi Pháp thoại "Tâm Kinh Bát Nhã" sẽ diễn ra vào Chủ nhật này lúc 2:00 PM. Thầy Minh Tuệ sẽ giảng giải chi tiết về ý nghĩa sâu xa của bộ kinh. Ai quan tâm có thể tham gia nhé! 📖✨
                </p>

                <div className="bg-[#EFE0BD]/50 rounded-xl p-4 mb-4 border border-[#d4af37]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-serif font-bold text-[#2c2c2c] mb-1">Pháp Thoại: Tâm Kinh Bát Nhã</h4>
                      <p className="text-sm text-[#8B4513]/70">Chủ nhật, 10/11/2024 - 2:00 PM</p>
                    </div>
                    <button className="px-4 py-2 bg-[#991b1b] text-white rounded-xl text-sm font-semibold hover:bg-[#7a1515] transition-colors" data-testid="button-rsvp">
                      RSVP
                    </button>
                  </div>
                  <p className="text-sm text-[#2c2c2c]/70">67 người đã xác nhận tham gia</p>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-like-feed-post-3">
                    <Heart className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">45</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-feed-post-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">18</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-feed-post-3">
                    <Share2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">12</span>
                  </button>
                </div>
              </div>

              {/* Community Member Re-sharing Agent Response */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-feed-post-4">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={avatar5} 
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
                    <span className="font-serif font-bold text-[#991b1b] text-base">Agent: Kế Văn Ngộ</span>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 italic mb-3">
                    "Thế nào là vô ngã?"
                  </p>
                  <p className="font-serif text-[#2c2c2c] leading-relaxed">
                    Vô ngã không phải là không có 'ta'. Mà là thấy rõ 'ta' chỉ là giả danh. Năm uẩn hợp lại tạm gọi thân. Như mây trời, như sóng vỡ bờ tan.
                  </p>
                </div>

                <p className="font-serif text-[#2c2c2c] mb-4">
                  Bài kệ này thật sâu sắc. Mỗi lần đọc lại là một lần hiểu thêm về vô ngã.
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-[#8B4513]/20">
                  <button className="flex items-center gap-2 text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-like-feed-post-4">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-serif text-sm font-semibold">22</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-comment-feed-post-4">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">12</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors" data-testid="button-share-feed-post-4">
                    <Share2 className="w-5 h-5" />
                    <span className="font-serif text-sm font-semibold">5</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications View */}
          {activeView === "notifications" && (
            <div className="space-y-4">
              {/* Agent Response Notification */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#991b1b]/30 p-5 hover:shadow-xl transition-all duration-300" data-testid="notification-1">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#991b1b] to-[#7a1515] rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        Giác Ngộ responded to your question
                      </p>
                      <span className="text-xs text-[#8B4513]/60">5 phút trước</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      "Làm thế nào để tìm thấy bình an trong tâm?"
                    </p>
                    <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-1">
                      View response →
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Reminder Notification */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/30 p-5 hover:shadow-xl transition-all duration-300" data-testid="notification-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center">
                      <CalendarClock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        Upcoming meditation session in 2 hours
                      </p>
                      <span className="text-xs text-[#8B4513]/60">1 giờ trước</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      Thiền buổi sáng tại Chùa Linh Quang - 6:00 AM. Đừng quên mang theo tọa cụ!
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-2">
                        View details →
                      </button>
                      <button className="text-sm font-semibold text-[#8B4513]/60 hover:text-[#2c2c2c] transition-colors" data-testid="button-dismiss-notification-2">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Follower Notification - Unread */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-5 hover:shadow-xl transition-all duration-300" data-testid="notification-3">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img 
                        src={avatar8} 
                        alt="Thanh Hương" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#991b1b]"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#991b1b] rounded-full flex items-center justify-center">
                        <UserPlus className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        Thanh Hương started following you
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#991b1b] rounded-full"></span>
                        <span className="text-xs text-[#8B4513]/60">3 giờ trước</span>
                      </div>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      Intermediate Practitioner • 234 followers
                    </p>
                    <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-3">
                      View profile →
                    </button>
                  </div>
                </div>
              </div>

              {/* Likes Notification */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-5 hover:shadow-xl transition-all duration-300 opacity-70" data-testid="notification-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                      <ThumbsUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        Your post received 10 likes
                      </p>
                      <span className="text-xs text-[#8B4513]/60">5 giờ trước</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      "Lời dạy này đã giúp tôi tìm thấy sự bình yên trong những ngày khó khăn..."
                    </p>
                    <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-4">
                      View post →
                    </button>
                  </div>
                </div>
              </div>

              {/* New Content Notification */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/30 p-5 hover:shadow-xl transition-all duration-300" data-testid="notification-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B4513] to-[#6b3410] rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        New Dharma talk available: Heart Sutra Commentary
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#991b1b] rounded-full"></span>
                        <span className="text-xs text-[#8B4513]/60">1 ngày trước</span>
                      </div>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      Thầy Minh Tuệ giảng giải chi tiết về Tâm Kinh Bát Nhã. Duration: 45 minutes
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-5">
                        Listen now →
                      </button>
                      <button className="text-sm font-semibold text-[#8B4513]/60 hover:text-[#2c2c2c] transition-colors" data-testid="button-save-notification-5">
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Notification - Read */}
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-5 hover:shadow-xl transition-all duration-300 opacity-70" data-testid="notification-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img 
                        src={avatar11} 
                        alt="Thầy Giác Minh" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#8B4513]"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#8B4513] rounded-full flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-serif text-[#2c2c2c] font-semibold">
                        Thầy Giác Minh commented on your post
                      </p>
                      <span className="text-xs text-[#8B4513]/60">2 ngày trước</span>
                    </div>
                    <p className="font-serif text-sm text-[#8B4513]/70 mb-2">
                      "Rất vui khi thấy con đã hiểu được ý nghĩa của sự tu tập. Hãy tiếp tục..."
                    </p>
                    <button className="text-sm font-semibold text-[#991b1b] hover:text-[#7a1515] transition-colors" data-testid="button-view-notification-6">
                      View comment →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Platform() {
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

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
              <Link href="/">
                <a className="font-serif text-[#991b1b] px-4 py-2 rounded-full bg-[#8B4513]/10 transition-colors" data-testid="link-platform">
                  Platform
                </a>
              </Link>
              <Link href="/">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-services">
                  Services
                </a>
              </Link>
              <Link href="/">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-pricing">
                  Pricing
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
          <SocialNetworkSection />

          {/* Custom Branding Section */}
          <section id="custom-branding" className="py-16 px-4 bg-[#EFE0BD]/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-[#991b1b]" />
                  <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-branding-title">
                    Custom Branding
                  </h2>
                </div>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
                  Transform the platform into a seamless extension of your monastery's identity
                </p>
                <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic">
                  Every temple has a unique lineage and aesthetic—your platform should reflect that dignity
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Logo & Visual Identity */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-8 hover:shadow-xl transition-all duration-300" data-testid="card-logo-upload">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c]">Logo & Visual Identity</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-6">
                    Upload your monastery's logo, dharma wheel, or lineage seal. Choose from temple-inspired color palettes or create custom themes that resonate with your tradition—Zen minimalism, Tibetan vibrancy, or Pure Land serenity.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Upload SVG, PNG logos with transparent backgrounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Pre-built Buddhist aesthetic themes (Lotus, Bodhi, Zen Garden)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Custom color palette generator with accessibility checks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Font pairing for sutras, headings, and body text</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Logo Upload</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Theme Builder</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Color Palettes</span>
                  </div>
                </div>

                {/* Domain & White-labeling */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-8 hover:shadow-xl transition-all duration-300" data-testid="card-domain-mapping">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c]">Domain & White-labeling</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-6">
                    Map your custom domain (e.g., platform.yourtemple.org) with automatic SSL certificates. Remove all external branding—this becomes your platform, serving your sangha under your monastery's trusted name.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Custom domain mapping with DNS guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Automatic SSL/TLS certificates for secure connections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Complete white-labeling (no Bodhi Tech branding visible)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Custom email domains for notifications (@yourtemple.org)</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Custom Domain</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">SSL Included</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">White-label</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-2xl border-2 border-[#991b1b]/30 p-8">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#991b1b]/20 flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#991b1b]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Sovereignty Through Design</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70">
                      Your monastery maintains complete visual sovereignty. Members experience your platform as a natural extension of your physical temple—building trust, familiarity, and deeper engagement with the Dharma under your lineage's guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Donation Tools Section */}
          <section id="donation-tools" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-[#991b1b]" />
                  <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-donation-title">
                    Donation Tools
                  </h2>
                </div>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
                  Accept dāna with dignity—frame generosity as spiritual practice, not transactional fundraising
                </p>
                <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic">
                  Transform online giving into an act of merit-making and support your temple's self-sufficiency
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Recurring Dāna */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-recurring-dana">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <CalendarClock className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Recurring Dāna</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-4">
                    Enable monthly or annual commitments. Members can sustain your monastery with predictable support—like traditional alms rounds, modernized.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Monthly, quarterly, annual cycles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Automatic receipts for tax deductions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Member dashboard to manage commitments</span>
                    </li>
                  </ul>
                </div>

                {/* QR Codes & Multiple Methods */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-payment-methods">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Multiple Payment Methods</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-4">
                    Accept cards, bank transfers, QR codes, and mobile wallets. Print QR codes for physical displays at your temple entrance or shrine.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Credit/debit cards, ACH transfers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">QR codes for instant donations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Mobile wallets (Apple Pay, Google Pay)</span>
                    </li>
                  </ul>
                </div>

                {/* Merit Dedication & Anonymous Giving */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6 hover:shadow-xl transition-all duration-300" data-testid="card-merit-dedication">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Merit Dedication</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-4">
                    Allow donors to dedicate merit to loved ones, include sutra quotes, or give anonymously. Honor the spiritual nature of generosity.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Dedicate merit to deceased or living beings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Optional sutra quotes on donation page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Anonymous donation option</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-2xl border-2 border-[#991b1b]/30 p-8">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#991b1b]/20 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-[#991b1b]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Transparent & Low-Fee Processing</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70">
                      Practitioner Pod tier: 2% processing fee. Sangha Community and above: negotiated rates based on volume. No hidden fees, no monthly minimums. Every donation goes toward sustaining the Dharma, not enriching payment processors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Document & Resource Library Section */}
          <section id="resource-library" className="py-16 px-4 bg-[#EFE0BD]/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-[#991b1b]" />
                  <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-library-title">
                    Document & Resource Library
                  </h2>
                </div>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
                  Organize your temple's sutras, chants, teachings, and media in a searchable, accessible digital library
                </p>
                <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic">
                  Preserve your lineage's wisdom for future generations with version control and offline access
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Searchable Library */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-8 hover:shadow-xl transition-all duration-300" data-testid="card-searchable-library">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Search className="w-6 h-6 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c]">Searchable Library</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-6">
                    Upload sutras, commentaries, chant sheets, audio dharma talks, and video recordings. Tag by tradition, teacher, topic, or language. Full-text search helps members find exactly what they need.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Support for PDF, EPUB, audio (MP3), video (MP4)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Full-text search across all documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Custom tagging system by topic, teacher, lineage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Multi-language support for translations</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Full-text Search</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Multi-format</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Tagging</span>
                  </div>
                </div>

                {/* Access Control & Version Control */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-8 hover:shadow-xl transition-all duration-300" data-testid="card-access-control">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2c2c]">Access Control & Versioning</h3>
                  </div>
                  <p className="font-serif text-sm text-[#2c2c2c]/70 mb-6">
                    Set permissions for public, members-only, or ordained-only content. Track updates to sutras and commentaries with version history—perfect for evolving translations or teacher revisions.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Granular access control (public, members, ordained)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Version history for all documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Offline download for retreats without internet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-sm text-[#2c2c2c]">Analytics on most-accessed resources</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Access Control</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Offline Access</span>
                    <span className="px-3 py-1 bg-[#991b1b]/10 text-[#991b1b] rounded-full text-xs font-semibold">Versioning</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-2xl border-2 border-[#991b1b]/30 p-8">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#991b1b]/20 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#991b1b]" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-2">Digital Dharma Preservation</h3>
                    <p className="font-serif text-sm text-[#8B4513]/70">
                      In the Dharma-Ending Age, preserving authentic teachings is paramount. Your library becomes a living archive—accessible to current sangha members and safeguarded for future generations. Host rare commentaries, lineage-specific practices, and local teacher wisdom that might otherwise be lost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dharma Radio Section - Events & Reminder Calendar */}
          <section id="dharma-radio" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-[#991b1b]" />
                  <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-radio-title">
                    Events & Reminder Calendar
                  </h2>
                </div>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
                  Schedule temple rituals, group meditations, and dharma talks with automated reminders and RSVP tracking
                </p>
                <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic mb-8">
                  Below is an interactive demo of "Dharma Radio"—live audio rooms where your sangha can gather for talks, Q&A sessions, and group practice. Event scheduling, RSVP management, and push notifications keep your community engaged.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Scheduling & Automation */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-events-scheduling">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <CalendarClock className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Smart Scheduling</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Schedule recurring events (daily meditation, weekly dharma talks, monthly retreats) with timezone support and automated reminders via email, SMS, or push notifications.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Recurring event templates (Vesak, Uposatha, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Multi-timezone support for global sangha</span>
                    </li>
                  </ul>
                </div>

                {/* RSVP & Attendance */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-events-rsvp">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">RSVP Tracking</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Members can RSVP with one click. Track attendance, send follow-up messages to attendees, and gather feedback after events to improve future programs.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">One-click RSVP with capacity limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Attendance analytics and member engagement insights</span>
                    </li>
                  </ul>
                </div>

                {/* Notifications & Reminders */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-events-reminders">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Automated Reminders</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Send reminders 24 hours, 1 hour, or 15 minutes before events. Members choose their preferred notification method—no one misses an important teaching session.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Email, SMS, and push notification options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Custom reminder schedules per event type</span>
                    </li>
                  </ul>
                </div>
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

          {/* Community Agents Section - Compassionate AI Guidance */}
          <section className="py-16 px-4 bg-[#EFE0BD]/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-[#991b1b]" />
                  <h2 className="font-serif text-4xl font-bold text-[#991b1b]" data-testid="text-agents-title">
                    Compassionate AI Guidance
                  </h2>
                </div>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto mb-4">
                  Deploy custom AI agents trained on your lineage's teachings—offering members 24/7 access to doctrinal guidance, meditation support, and sutra references
                </p>
                <p className="font-serif text-sm text-[#8B4513]/60 max-w-3xl mx-auto italic">
                  Unlike generic chatbots, these agents are fine-tuned on your specific tradition, ensuring answers align with your monastery's interpretation of the Dharma
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* Custom Training */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-ai-training">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Custom Knowledge Training</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Upload your monastery's sutras, commentaries, teacher talks, and practice guides. The AI learns your lineage's unique interpretation—Zen koans, Pure Land recitations, or Theravāda meditation instructions.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Upload PDFs, audio, video for training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Fine-tune responses to match your lineage style</span>
                    </li>
                  </ul>
                </div>

                {/* Multi-tradition Support */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-ai-traditions">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Multi-Tradition Modes</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Select doctrinal modes for different Buddhist traditions—Zen, Pure Land, Theravāda, Tibetan, or custom blends. Agents cite specific sutras and adapt tone to your teaching style.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Pre-configured tradition templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Cites sutras with chapter/verse precision</span>
                    </li>
                  </ul>
                </div>

                {/* Voice & Accessibility */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6" data-testid="card-ai-voice">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#991b1b]/10 flex items-center justify-center">
                      <Megaphone className="w-5 h-5 text-[#991b1b]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2c2c2c]">Voice & Text Queries</h3>
                  </div>
                  <p className="font-serif text-xs text-[#2c2c2c]/70 mb-3">
                    Members can ask questions via voice or text in multiple languages. Agents respond with written answers or audio, making teachings accessible to elderly members or those with low literacy.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Voice input in 50+ languages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                      <span className="font-serif text-[#2c2c2c]">Text-to-speech responses for accessibility</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mb-12">
                <h3 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-4">Community Agent Marketplace</h3>
                <p className="font-serif text-sm text-[#8B4513]/70 max-w-2xl mx-auto">
                  Explore pre-trained agents developed by temples worldwide, or share your custom agents with the broader Buddhist tech community
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {buddhistAgents.slice(0, 6).map((agent) => (
                  <div
                    key={agent.id}
                    className="group bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-[#8B4513]/20 hover:border-[#991b1b]/40 transition-all duration-300 hover:shadow-xl"
                    data-testid={`card-community-agent-${agent.id}`}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={agentArtwork[agent.id]} 
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
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
                            <span className="font-serif">{agent.likes >= 1000 ? `${(agent.likes / 1000).toFixed(1)}K` : agent.likes}</span>
                          </div>
                        </div>
                      )}

                      <Link href="/docs/models">
                        <a
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#991b1b] text-white rounded-xl hover:bg-[#7a1515] transition-colors font-serif font-semibold text-sm shadow-md"
                          data-testid={`button-explore-${agent.id}`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Khám phá Agent
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/docs/models">
                  <a
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border-2 border-[#991b1b] rounded-full text-[#991b1b] font-serif font-semibold text-lg hover:bg-[#991b1b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="button-view-all-agents"
                  >
                    Xem tất cả {buddhistAgents.length} Agents
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
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
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">Bodhi Technology Lab</span>
              <div className="flex gap-6">
                <Link href="/">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Platform
                  </a>
                </Link>
                <Link href="/">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    Services
                  </a>
                </Link>
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
