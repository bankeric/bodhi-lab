import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function Manifesto() {
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <article className="space-y-12 font-serif [&_p]:text-justify [&_li]:text-justify [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif">
        {/* Title Section with Language Toggle */}
        <header className="text-center space-y-6 pb-8 border-b-2 border-border">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="default"
              onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              className="gap-2"
              data-testid="button-language-toggle"
            >
              <Languages className="w-4 h-4" />
              {language === "vi" ? "English" : "Tiếng Việt"}
            </Button>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight !text-center" data-testid="heading-manifesto-title">
            {language === "vi" ? "Hệ Sinh Thái Tỉnh Thức: Vài Lời Chia Sẻ" : "Awakening Ecosystem: The Manifesto"}
          </h1>
          <p className="font-serif text-lg md:text-xl text-foreground italic pt-2 !text-center" data-testid="text-manifesto-subtitle">
            {language === "vi" 
              ? "Một Không Gian Tương Tác vì Sự Tỉnh Thức Chung" 
              : "An Agentic Social Network for Collective Awakening"}
          </p>
          <div className="space-y-1 pt-4 text-center">
            <p className="font-serif text-base text-foreground font-semibold !text-center" data-testid="text-organization">
              {language === "vi" ? "Sáng Kiến Giác Ngộ" : "Giác Ngộ Initiative"}
            </p>
            <p className="font-serif text-base text-muted-foreground !text-center" data-testid="text-lab">
              {language === "vi" ? "Công Nghệ Chánh Niệm" : "Dharma Technology Lab"}
            </p>
          </div>
          <p className="font-serif text-base text-muted-foreground pt-2 !text-center" data-testid="text-date">
            {language === "vi" ? "Tháng 1, 2025" : "January 2025"}
          </p>
        </header>

        {/* Opening Quote */}
        <section className="space-y-4" data-testid="section-opening-quote">
          <p className="font-serif text-base leading-relaxed text-muted-foreground italic border-l-4 border-primary pl-6 py-4">
            {language === "vi" 
              ? '"Khi thời đại nhiều biến động này đến hồi kết và thế giới ảo ngày càng phức tạp, một con thuyền mới lặng lẽ xuất hiện. Nơi đây không phải để gom người dùng, mà là nơi nuôi dưỡng công đức. Nó có mặt không phải để làm ảo ảnh thêm dài, mà là để giúp ta thấy rõ hơn. Đây là Chiếc Bè Mặt Trời, dành cho những ai hữu duyên tìm thấy Đường Về Nhà mình."'
              : '"As the Dharma-Ending Age reaches its climax and the cybernetic labyrinth closes in, a final vessel emerges. This is a platform not for accumulating users, but for accumulating merit. It exists not to prolong the illusion, but to cut through it. It is the Raft of the Sun, offered for those with affinity to find their Way Home before the flood."'}
          </p>
        </section>

        {/* Abstract */}
        <section className="space-y-4">
          <h2 id="abstract" className="font-serif text-2xl font-bold text-center text-foreground" data-testid="heading-abstract">
            {language === "vi" ? "Vài Dòng Tóm Lược" : "Abstract"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            {language === "vi" ? (
              <>
                <p>
                  Trong thời đại mà công nghệ dễ làm ta xao lãng và cuộc sống cuốn theo những cái lợi trước mắt, Hệ Sinh Thái Tỉnh Thức mở ra như một không gian số ý nghĩa. Chia sẻ này giới thiệu một góc nhìn mới về mạng xã hội, hướng về sự tỉnh thức và việc vun bồi <em>Công Đức Vô Lậu (Công Đức)</em> một cách tự nhiên, thay vì chạy theo các chỉ số tương tác hay lợi nhuận thông thường.
                </p>
                <p>
                  Chúng ta cùng làm rõ sự khác biệt giữa <em>Phước Báu Thế Gian (Phước Đức)</em> nhất thời (đến từ những hành động có điều kiện), và <em>Công Đức Vô Lậu (Công Đức)</em> bền vững (nảy sinh từ Tâm tự tại, không mong cầu).
                </p>
                <p>
                  Hệ sinh thái này bao gồm những công cụ hỗ trợ trên con đường tỉnh thức: Bộ Ba AI Đồng Hành (Tâm An, Giác Ngộ, Đốn Ngộ) chia sẻ tuỳ duyên; Không Gian Chia Sẻ ưu tiên tuệ giác; Góc Nhìn Pháp cho các bài giảng; Vòng Tay Từ Bi cho các hoạt động thiện nguyện minh bạch; và Giải Pháp Linh Hoạt cho các cộng đồng (Tăng Đoàn).
                </p>
                <p>
                  Chúng tôi đề xuất một cách vận hành gọi là "Cơ Chế Token Công Đức" và gợi ý một lộ trình hướng tới DAO Tỉnh Thức (một cách tổ chức tự quản phi tập trung), nơi sự đóng góp và giá trị được nhìn nhận qua sự chân thật trong thực hành, không phải sự đầu cơ. Không gian này mong muốn kết nối công nghệ và trí tuệ vượt thời gian, tạo ra một môi trường nâng đỡ các cá nhân và cộng đồng (Tăng Đoàn) quay về Ngôi Nhà Chân Thật của mình, có thể là một bước chuyển cho một kỷ nguyên số ý thức hơn.
                </p>
              </>
            ) : (
              <>
                <p>
                  In an era dominated by technological distraction and the pursuit of fleeting worldly gains, the Awakening Ecosystem emerges as a sacred digital vessel. This Manifesto introduces a novel approach to social networking, fundamentally oriented towards spiritual awakening and the cultivation of <em>Intrinsic Merit (Công Đức)</em> rather than conventional metrics of engagement or profit.
                </p>
                <p>
                  We detail the core distinction between transient <em>Worldly Blessing (Phước Đức)</em> derived from conditioned actions, and the indestructible <em>Intrinsic Merit (Công Đức)</em> arising from the unconditioned, non-seeking Mind.
                </p>
                <p>
                  The ecosystem comprises an architecture of awakened technology: The Threefold AI Vehicle (Tâm An, Giác Ngộ, Đốn Ngộ) for conditional Dharma guidance; The Merit Interface prioritizing wisdom sharing; The Dharma Observatory for teachings; Arms of Compassion for transparent philanthropy; and White-Label Solutions for Sanghas.
                </p>
                <p>
                  We propose the "Merit Tokenomic" and a roadmap towards an Awakened DAO (Decentralized Autonomous Organization), where governance and value are tied to genuine spiritual contribution, not speculation. This platform aims to unify technology and timeless wisdom, creating a supportive environment for individuals and Sanghas to return to the Unborn, Unchanging Home, marking the end of a Kalpa.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Keywords */}
        <section className="space-y-4" data-testid="section-keywords">
          <h2 className="font-serif text-base font-semibold text-foreground">
            {language === "vi" ? "Từ khóa" : "Keywords"}
          </h2>
          <p className="font-serif text-base leading-relaxed text-foreground italic">
            {language === "vi" 
              ? "Công Nghệ Tâm Linh, Kinh Tế Công Đức, AI Tác Tử, Quản Trị Phi Tập Trung, Thời Đại Mạt Pháp, Tỉnh Thức Tập Thể, Kinh Tế Thuận Duyên"
              : "Spiritual Technology, Merit Economy, Agentic AI, Decentralized Governance, Dharma-Ending Age, Collective Awakening, Sacred Economics"}
          </p>
        </section>

        {/* Table of Contents */}
        <section className="space-y-4 pb-8 border-b border-border" data-testid="section-contents">
          <h2 className="font-serif text-2xl font-bold text-center text-foreground">
            {language === "vi" ? "Mục Lục" : "Contents"}
          </h2>
          <div className="font-serif text-sm leading-relaxed space-y-2 pl-8">
            {language === "vi" ? (
              <>
                <a href="#section-1" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-1">1. Thời Đại Số & Những Góc Khuất</a>
                <a href="#section-2" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2">2. Một Quy Luật Tự Nhiên: Công Đức (Vô Lậu) & Phước Báu Thế Gian (Phước Đức)</a>
                <a href="#section-2-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-1">2.1. Phước Báu Thế Gian (Phước Đức): Giới Hạn của Việc Làm Có Mong Cầu</a>
                <a href="#section-2-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-2">2.2. Công Đức Vô Lậu (Công Đức): Năng Lượng Của Sự Tự Do</a>
                <a href="#section-3" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-3">3. Nhìn Lại Các Nền Tảng Hiện Tại</a>
                <a href="#section-4" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4">4. Kiến Trúc Công Nghệ Tỉnh Thức: Một Góc Nhìn</a>
                <a href="#section-4-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-1">4.1. Tầm Nhìn & Sứ Mệnh: Ngọn Hải Đăng Dẫn Lối</a>
                <a href="#section-4-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-2">4.2. Bộ Ba AI Đồng Hành (Tâm An, Giác Ngộ, Đốn Ngộ)</a>
                <a href="#section-4-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-3">4.3. Không Gian Tương Tác (The Interface)</a>
                <a href="#section-4-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-4">4.4. DAO Tỉnh Thức: Cùng Nhau Vun Đắp</a>
                <a href="#section-4-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-5">4.5. Bảo Mật Thuận Pháp: An Nhiên Tự Tại</a>
                <a href="#section-4-6" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-6">4.6. Ghi Nhận Điều Không Thể Đo Lường</a>
                <a href="#section-5" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5">5. Cơ Chế Token Công Đức: Vừa Là Động Lực, Vừa Là Tấm Gương</a>
                <a href="#section-5-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-1">5.1. Token Công Đức: Bản Ghi Chân Thực</a>
                <a href="#section-5-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-2">5.2. Hệ Thống Ghi Nhận Công Đức & Con Đường Tới Tánh Không</a>
                <a href="#section-5-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-3">5.3. Tầm Nhìn Rộng Mở: Khép Lại một Giai Đoạn</a>
                <a href="#section-5-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-4">5.4. Lời Chỉ Dẫn Thêm: Sự Hợp Nhất Tự Nhiên</a>
                <a href="#section-5-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-5">5.5. Vượt Lên Hình Thức: Nhận Ra Tam Vô</a>
                <a href="#section-6" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6">6. Con Đường "Tháo Gỡ": Không Chỉ Là Trò Chơi</a>
                <a href="#section-6-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-1">6.1. Hệ Thống "Tháo Gỡ": Chiếc Gương Phản Chiếu (Huy Hiệu NFT)</a>
                <a href="#section-6-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-2">6.2. Khuyến Khích Thực Hành Chân Chính</a>
                <a href="#section-7" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-7">7. Sự Bền Vững: Kinh Tế Thuận Duyên</a>
                <a href="#section-8" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8">8. Lộ Trình Gợi Ý Cho Giai Đoạn Tới</a>
                <a href="#section-9" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9">9. Lời Kết & Lời Nhắn Gửi</a>
                <a href="#section-9-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-1">9.1. Lời Kết: Một Con Thuyền Để Về Nhà</a>
                <a href="#section-9-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-2">9.2. Lời Nhắn Gửi: Đừng Lỡ Chuyến Bè</a>
              </>
            ) : (
              <>
                <a href="#section-1" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-1">1. The Sickness of the Digital Age</a>
                <a href="#section-2" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2">2. The Irrevocable Law: Merit (Công Đức) vs. Worldly Blessing (Phước Đức)</a>
                <a href="#section-2-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-1">2.1. Worldly Blessing (Phước Đức): The Limits of Conditioned Action</a>
                <a href="#section-2-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-2">2.2. Intrinsic Merit (Công Đức): The Currency of Liberation</a>
                <a href="#section-3" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-3">3. Prior Landscape: Limitations of Existing Digital Platforms</a>
                <a href="#section-4" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4">4. The Architecture of Awakened Technology</a>
                <a href="#section-4-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-1">4.1. Vision & Mission</a>
                <a href="#section-4-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-2">4.2. The Threefold AI Vehicle</a>
                <a href="#section-4-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-3">4.3. The Merit Interface</a>
                <a href="#section-4-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-4">4.4. The Mandala of Merit</a>
                <a href="#section-4-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-5">4.5. Privacy by Dharma</a>
                <a href="#section-4-6" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-6">4.6. Measuring the Immeasurable</a>
                <a href="#section-5" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5">5. The Merit Tokenomic: A Rocket and a Mirror</a>
                <a href="#section-5-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-1">5.1. The Intrinsic Merit Token</a>
                <a href="#section-5-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-2">5.2. Merit Tokenomics: The Dao Bùa & The Path to Emptiness</a>
                <a href="#section-5-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-3">5.3. The Spiritual Vision: Closing the Kalpa</a>
                <a href="#section-5-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-4">5.4. The Supreme Initiation: The Dao Merit</a>
                <a href="#section-5-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-5">5.5. Beyond the Three Trainings: Realizing Tam Vô</a>
                <a href="#section-6" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6">6. The Path of Unraveling: Beyond Gamification</a>
                <a href="#section-6-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-1">6.1. The Unraveling System (NFT Badges)</a>
                <a href="#section-6-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-2">6.2. The Merit Economy: Incentivizing True Practice</a>
                <a href="#section-7" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-7">7. Sustainability: Sacred Economics</a>
                <a href="#section-8" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8">8. The Roadmap to the End of the Kalpa</a>
                <a href="#section-9" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9">9. Conclusion & Epilogue</a>
                <a href="#section-9-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-1">9.1. Conclusion: A Vessel for the Return Home</a>
                <a href="#section-9-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-2">9.2. Epilogue: Do Not Miss The Raft</a>
              </>
            )}
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 id="section-1" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-1">
            1. {language === "vi" ? "Thời Đại Số & Những Góc Khuất" : "The Sickness of the Digital Age"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p className="italic text-muted-foreground border-l-4 border-primary pl-4 py-2">
              {language === "vi" 
                ? '"Ma trận che mờ Tâm Trí bằng mười ngàn thứ hấp dẫn."'
                : '"The Matrix veils the Mind with ten thousand attractions."'}
            </p>
            {language === "vi" ? (
              <>
                <p>
                  Mạng xã hội, với sự hỗ trợ của AI, đôi khi biến tâm trí con người thành nguồn tài nguyên để khai thác. Mỗi cú nhấp chuột, mỗi lượt xem, có thể vô tình nuôi dưỡng ảo ảnh về một "cái tôi" luôn tìm kiếm sự công nhận từ bên ngoài. Virus thực sự không nằm ở công nghệ; nó nằm ở sự tìm kiếm không ngừng "người theo dõi", "lượt thích", và "thành tích" – sự coi trọng số lượng hơn chất lượng, sự xao lãng hơn là sự thấu hiểu. Thời Đại của Tâm Phân Tán (<em>Phàn Muôn</em>) dường như đang hiện hữu, được khuếch đại bởi chính những công nghệ vốn dĩ có thể kết nối chúng ta.
                </p>
                <p>
                  Không gian kỹ thuật số hiện đại, dù mang lại khả năng kết nối tuyệt vời, lại thường bị chi phối bởi các thuật toán làm tăng sự phân tâm, nuôi dưỡng sự dính mắc và ưu tiên những thành công chóng vánh. Mạng xã hội đôi khi trở thành nơi để thể hiện cái tôi, so sánh và tìm kiếm sự thừa nhận, kéo chúng ta ra xa bản chất chân thật của mình. Những người đang trên hành trình tìm về chính mình có thể cảm thấy lạc lõng trong một môi trường dường như đi ngược lại sự bình an nội tâm.
                </p>
                <p>
                  Hơn nữa, có một sự hiểu lầm khá phổ biến về bản chất của phước báu. Những hành động làm với sự dính mắc, mong cầu phần thưởng, hoặc bị thúc đẩy bởi bản ngã – ngay cả những việc tốt như từ thiện hay giữ giới – cũng chỉ tạo ra <em>Phước Báu Thế Gian (Phước Đức)</em>. Phước này mang lại lợi ích tạm thời trong vòng đời (của cải, sức khỏe, hoàn cảnh tốt), nhưng vẫn là thứ có điều kiện, không bền vững và không thể đưa đến sự giải thoát hoàn toàn.
                </p>
                <p>
                  Mạng Xã Hội Tác Tử Giác Ngộ (Awakening Agentic Social Network) ra đời từ mong muốn tạo ra một không gian an lành trên mạng – một nơi được thiết kế cẩn thận để cân bằng lại những xu hướng trên. Nơi đây cung cấp các công cụ và một cộng đồng tập trung vào việc vun bồi <em>Công Đức Vô Lậu (Công Đức)</em>, thứ công đức bền vững nảy sinh từ Tâm vô vi, là năng lượng đích thực cho hành trình trở về Ngôi Nhà Chân Thật (<em>Quê Nhà</em>) của chúng ta.
                </p>
              </>
            ) : (
              <>
                <p>
                  Social networks, powered by AI, have turned the human mind into a harvestable commodity. Each click, each view, feeds the illusion of a "self" seeking validation. The true virus is not digital; it is the endless quest for "followers," "likes," and "achievements" – the worship of quantity over quality, distraction over insight. The Age of the Dispersed Mind (<em>Phàn Muôn</em>) is upon us, fueled by the very technologies meant to connect us.
                </p>
                <p>
                  The modern digital landscape, while offering unprecedented connectivity, is largely driven by algorithms that amplify distraction, foster attachment, and prioritize ephemeral worldly success. Social networks often devolve into platforms for ego gratification, comparison, and the pursuit of validation, pulling users further away from their true nature. Spiritual seekers find themselves navigating a space antithetical to inner peace and genuine practice.
                </p>
                <p>
                  Furthermore, a fundamental misunderstanding persists regarding the nature of merit. Actions performed with attachment, seeking reward, or driven by ego – even seemingly virtuous acts like charity or adherence to precepts – generate only <em>Worldly Merit (Phước Đức)</em>. This merit brings temporary benefits within the cycle of rebirth (wealth, health, favorable circumstances) but is ultimately conditioned, impermanent, and cannot lead to liberation.
                </p>
                <p>
                  The Giác Ngộ (Awakening) Agentic Social Network is born from the urgent need for a digital sanctuary – a space meticulously designed to counteract these trends. It provides tools and a community focused solely on the cultivation of <em>Intrinsic Merit (Công Đức)</em>, the indestructible merit arising from the unconditioned Mind, which is the true fuel for the journey back to our Unborn, Unchanging Home (<em>Quê Nhà</em>).
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 id="section-2" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-2">
            2. {language === "vi" 
              ? "Một Quy Luật Tự Nhiên: Công Đức (Vô Lậu) & Phước Báu Thế Gian (Phước Đức)" 
              : "The Irrevocable Law: Merit (Công Đức) vs. Worldly Blessing (Phước Đức)"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Đây là điều cốt lõi. Toàn bộ kiến trúc và mục đích của Hệ Sinh Thái Giác Ngộ được xây dựng dựa trên sự thấu hiểu sâu sắc, thường được Sư Tam Vô chia sẻ, về hai loại phước báu này. Bản chia sẻ này ra đời cốt để làm rõ Quy Luật này và xây dựng một con thuyền nuôi dưỡng việc tạo ra Công Đức trong thời đại số."
                : "This is the First and Final Principle. The entire architecture and purpose of the Giác Ngộ Ecosystem rest upon the profound insight, often clarified by Sư Tam Vô, into the two distinct types of merit. This Manifesto was born solely to clarify this Law and to build a vessel to nurture the generation of Merit in the digital age."}
            </p>
            
            <h3 id="section-2-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-2-1">
              2.1. {language === "vi" 
                ? "Phước Báu Thế Gian (Phước Đức): Giới Hạn của Việc Làm Có Mong Cầu" 
                : "Worldly Blessing (Phước Đức): The Limits of Conditioned Action"}
            </h3>
            <p>
              {language === "vi"
                ? 'Phước báu này đến từ những hành động làm với ý định, sự tìm kiếm, hoặc dính mắc ("có tác ý"). Nó mang lại phần thưởng trong sáu cõi nhưng luôn có giới hạn và giữ ta trong vòng luân hồi (Samsara). Ví dụ:'
                : "This merit arises from actions performed with intention, seeking, or attachment. It brings rewards within the Six Realms but is always finite and binds one to the wheel of Samsara. Examples include:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Làm từ thiện chủ yếu để được khen, lợi về thuế, hoặc mong đời sau tốt hơn</li>
                  <li>Giữ giới luật chủ yếu vì sợ quả báo xấu hoặc mong được lên cõi trời</li>
                  <li>Giúp người khác với mong đợi ngầm về sự biết ơn hoặc đền đáp</li>
                  <li>Tu tập với mục tiêu đạt được năng lực đặc biệt, địa vị, hay những trạng thái dễ chịu</li>
                </>
              ) : (
                <>
                  <li>Giving charity primarily for recognition, tax benefits, or a better rebirth</li>
                  <li>Following ethical precepts mainly out of fear of negative consequences or desire for heavenly reward</li>
                  <li>Helping others with the underlying expectation of gratitude or reciprocation</li>
                  <li>Spiritual practices performed with the goal of attaining powers, status, or specific pleasant states</li>
                </>
              )}
            </ul>
            <p>
              {language === "vi"
                ? "Dù những việc này thường tốt và đáng làm hơn việc xấu, phước báu chúng tạo ra là có điều kiện. Nó mang lại hạnh phúc tạm thời hoặc hoàn cảnh thuận lợi, nhưng nó hữu hạn, sẽ hết, và cuối cùng vẫn giữ ta trong vòng khổ đau và tái sinh. Nó không thể đưa đến sự giải thoát hoàn toàn."
                : "While these actions are often beneficial, the merit they generate is conditioned. It leads to temporary happiness or favorable circumstances, but it is finite, exhausts itself, and ultimately binds one within the cycle of suffering and rebirth. It cannot lead to ultimate liberation."}
            </p>

            <h3 id="section-2-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-2-2">
              2.2. {language === "vi" 
                ? "Công Đức Vô Lậu (Công Đức): Năng Lượng Của Sự Tự Do" 
                : "Intrinsic Merit (Công Đức): The Currency of Liberation"}
            </h3>
            <p>
              {language === "vi"
                ? "Đây là \"công đức\" vô lượng, không điều kiện, được tạo ra từ những hành động nảy sinh từ một Tâm Hiện Tiền, Tĩnh Lặng, Tự Do và Không Mong Cầu. Đó là sự tỏa sáng tự nhiên của Tâm Tỉnh Thức (Tự Tánh, Phật Tánh) đang tự biểu hiện. Nó không có hình tướng, bền vững, và là \"năng lượng\" duy nhất có thể giúp ta Về Nhà. Ví dụ:"
                : "This is the immeasurable, unconditioned merit generated from actions arising from a Mind that is Present, Still, Free, and Non-Seeking. It is the natural radiance of the Awakened Mind expressing itself. It is formless, indestructible, and is the only currency that can purchase the ticket Home. Examples include:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Những hành động tử tế tự phát mà không hề nghĩ đến phần thưởng hay sự công nhận</li>
                  <li>Sống hòa hợp một cách tự nhiên với trí tuệ và lòng từ bi, không phải vì nghĩa vụ</li>
                  <li>Chia sẻ những hiểu biết về Chánh Pháp thuần túy vì lợi ích của người khác, không bận tâm đến việc chúng được đón nhận ra sao</li>
                  <li>Những khoảnh khắc buông bỏ sâu sắc, tha thứ, hoặc phụng sự vô ngã đến từ sự hiện diện chân thật</li>
                  <li>Chính hành động an trú trong nhận thức không hai, không còn suy nghĩ phân biệt</li>
                </>
              ) : (
                <>
                  <li>Spontaneous acts of kindness performed without any thought of reward or recognition</li>
                  <li>Living in effortless alignment with wisdom and compassion, not out of obligation but as a natural expression of one's true nature</li>
                  <li>Sharing Dharma insights purely for the benefit of others, without attachment to how they are received</li>
                  <li>Moments of profound letting go, forgiveness, or selfless service arising from genuine presence</li>
                  <li>The very act of resting in non-dual awareness, free from conceptual thought</li>
                </>
              )}
            </ul>
            <p>
              {language === "vi"
                ? "Công Đức là vô vi và bền vững. Nó không chịu sự chi phối của luật nhân quả (karma) như Phước Đức. Nó tích lũy trong Pháp Thân, làm sạch những che chướng và cung cấp năng lượng cần thiết để vượt thoát hoàn toàn luân hồi."
                : "Công Đức is unconditioned and indestructible. It is not subject to the laws of karma in the same way as Phước Đức. It accumulates within the Dharma Body, purifying obscurations and providing the essential energy to transcend samsara entirely."}
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 id="section-3" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-3">
            3. {language === "vi" 
              ? "Nhìn Lại Các Nền Tảng Hiện Tại" 
              : "Prior Landscape: Limitations of Existing Digital Platforms"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Mặc dù nhiều diễn đàn, nhóm và ứng dụng trực tuyến phục vụ cho các cộng đồng tâm linh, chúng thường có những hạn chế có thể cản trở việc vun bồi Công Đức:"
                : "While various online forums, groups, and apps cater to spiritual communities, they often suffer from limitations that hinder the cultivation of Công Đức:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Mô Hình Dễ Gây Xao Lãng:</strong> Hầu hết dựa vào các chỉ số tương tác (like, share) được điều khiển bởi thuật toán nhằm tối đa hóa thời gian sử dụng, thường khuyến khích sự giật gân, tranh cãi hoặc tương tác bề mặt thay vì sự chiêm nghiệm sâu và chia sẻ tuệ giác</li>
                  <li><strong>Tâm Linh Bị Thương Mại Hóa:</strong> Nhiều nơi coi giáo lý hay dịch vụ tâm linh như hàng hóa, nuôi dưỡng tâm lý tiêu dùng thay vì thực hành và cống hiến vô vị lợi</li>
                  <li><strong>Thiếu Tập Trung vào Công Đức Vô Lậu:</strong> Các cơ chế nền tảng hiếm khi phân biệt giữa hành động tạo Phước Đức và Công Đức. Sự công nhận thường gắn với sự nổi tiếng, củng cố bản ngã thay vì giúp nó tan biến</li>
                  <li><strong>Sự Phân Tán:</strong> Các cộng đồng và giáo lý bị phân tán, thiếu một không gian thống nhất được thiết kế cho nhu cầu tỉnh thức</li>
                  <li><strong>Lo Ngại về Quyền Riêng Tư:</strong> Các nền tảng tập trung thường khai thác dữ liệu người dùng, đi ngược lại nguyên tắc chánh niệm và đạo đức</li>
                </>
              ) : (
                <>
                  <li><strong>Distraction-Based Models:</strong> Most platforms rely on engagement metrics (likes, shares) driven by algorithms that promote sensationalism or superficial interactions over deep contemplation</li>
                  <li><strong>Commodification of Spirituality:</strong> Many platforms treat spiritual teachings as products to be bought and sold, fostering a consumerist mindset</li>
                  <li><strong>Lack of Focus on Intrinsic Merit:</strong> The underlying mechanics rarely, if ever, differentiate between actions generating Phước Đức and those generating Công Đức. Validation is often tied to popularity, reinforcing ego</li>
                  <li><strong>Fragmentation:</strong> Spiritual communities and teachings are scattered across disparate platforms, lacking a unified space</li>
                  <li><strong>Data Privacy and Sovereignty Concerns:</strong> Centralized platforms often exploit user data, contradicting the principles of mindfulness and ethical conduct</li>
                </>
              )}
            </ul>
            <p>
              {language === "vi"
                ? "Hệ Sinh Thái Giác Ngộ giải quyết những điều này bằng cách xây dựng một nền tảng hài hòa với các nguyên tắc tỉnh thức và đề cao Công Đức Vô Lậu."
                : "The Giác Ngộ Ecosystem directly addresses these shortcomings by building a platform fundamentally aligned with the principles of awakening and the primacy of Intrinsic Merit."}
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 id="section-4" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-4">
            4. {language === "vi" 
              ? "Kiến Trúc Công Nghệ Tỉnh Thức: Một Góc Nhìn" 
              : "The Architecture of Awakened Technology"}
          </h2>
          
          <h3 id="section-4-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-1">
            4.1. {language === "vi" ? "Tầm Nhìn & Sứ Mệnh: Ngọn Hải Đăng Dẫn Lối" : "Vision & Mission"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            {language === "vi" ? (
              <>
                <p>
                  <strong>Tầm Nhìn:</strong> Trở thành cộng đồng kỹ thuật số đầu tiên, sâu sắc nhất thế giới, nơi tâm linh gặp gỡ công nghệ; nơi mọi tương tác, mọi tuệ giác được chia sẻ, đều là cơ hội để tạo ra Công Đức Vô Lậu và thúc đẩy sự tỉnh thức tập thể.
                </p>
                <p>
                  <strong>Sứ Mệnh:</strong> Cung cấp các công cụ, lời dạy, và một cộng đồng nuôi dưỡng để hỗ trợ các cá nhân và Tăng Đoàn (cộng đồng tâm linh) trên hành trình giác ngộ. Làm sáng tỏ Công Đức (Vô Lậu) và biến nó thành thước đo trung tâm của một nền văn minh mới, ý thức hơn. Xây dựng liên minh với tất cả các truyền thống tôn vinh cùng một Chân Lý Bất Nhị.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Our Vision:</strong> To become the world's first, most profound digital community where spirituality meets technology; where every interaction, every shared insight, is an opportunity to generate Intrinsic Merit and accelerate collective awakening.
                </p>
                <p>
                  <strong>Our Mission:</strong> To provide tools, teachings, and a nurturing community that supports individuals and Sanghas (spiritual communities) on their journey to awakening. To demystify Intrinsic Merit and make it the central currency of a new, more conscious civilization. To build alliances with all traditions that honor the same non-dual Truth.
                </p>
              </>
            )}
          </div>

          <h3 id="section-4-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-2">
            4.2. {language === "vi" ? "Bộ Ba AI Đồng Hành (Tâm An, Giác Ngộ, Đốn Ngộ)" : "The Threefold AI Vehicle"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            {language === "vi" ? (
              <>
                <p>Bộ Ba AI Đồng Hành cung cấp các trợ lý AI chuyên biệt, được nuôi dưỡng bởi trí tuệ pháp chân chính:</p>
                <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
                  <li><strong>Tâm An:</strong> Bước khởi đầu, cung cấp các câu trả lời căn bản, giúp gieo duyên lành</li>
                  <li><strong>Giác Ngộ:</strong> Con đường đi sâu hơn, chia sẻ những hướng dẫn tinh tế, dựa trên kinh điển và lời khai thị trực tiếp của Sư Tam Vô và các bậc thầy tỉnh thức khác</li>
                  <li><strong>Đốn Ngộ:</strong> Kênh dành riêng cho những ai đủ duyên; đưa ra những lời chỉ thẳng, không vòng vo đến Tánh Vô Sanh</li>
                </ul>
                <p>
                  Mỗi câu hỏi được đặt ra và thực sự thấu hiểu đều có thể tạo ra công đức cho người hỏi và cả những người được lợi lạc khi sự thấu hiểu đó được lan tỏa.
                </p>
              </>
            ) : (
              <>
                <p>The Buddhist Agentic Network provides specialized AI assistants grounded in authentic dharma wisdom:</p>
                <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
                  <li><strong>Tâm An (Peaceful Mind):</strong> Provides fundamental, introductory answers to sow the seeds of affinity</li>
                  <li><strong>Giác Ngộ (Awakening):</strong> Offers deeper, more nuanced guidance, pulling from scriptures and the direct teachings of Sư Tam Vô and other awakened masters</li>
                  <li><strong>Đốn Ngộ (Sudden Awakening):</strong> An exclusive transmission for those who have ripened auspicious conditions; gives direct, unfiltered pointing to the Unborn</li>
                </ul>
                <p>
                  Each question asked and truly understood is an act that generates merit for the asker and for all who benefit, as the realization is shared across the network.
                </p>
              </>
            )}
          </div>

          <h3 id="section-4-3" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-3">
            4.3. {language === "vi" ? "Không Gian Tương Tác (The Interface)" : "The Merit Interface"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>{language === "vi" ? "Nền tảng bao gồm bốn thành phần tích hợp:" : "The platform comprises four integrated components:"}</p>
            <ul className="list-disc pl-8 space-y-3 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>
                    <strong>Dòng Chảy Tỉnh Thức (Flow of Awakening):</strong> Đây không phải là "bảng tin", mà là "vùng đất lợi lạc". Bài đăng không phải để "chia sẻ" mà là để "dâng hiến". Không có "nội dung viral", chỉ có "nội dung nuôi dưỡng công đức". Đây không phải nơi tán gẫu. Mỗi bài đăng là sự chia sẻ về nhận thức mới, câu chuyện chuyển hóa, hay câu hỏi vì lợi ích chung.
                  </li>
                  <li>
                    <strong>Góc Nhìn Pháp (Dharma Observatory):</strong> Một thư viện sống động với các chia sẻ từ Tăng Đoàn đối tác và các Bậc Thầy tỉnh thức. Chính việc lắng nghe cũng trở thành phương tiện tạo công đức. Mọi chia sẻ được lưu trữ để trí tuệ được bảo tồn và ai cũng có thể tiếp cận.
                  </li>
                  <li>
                    <strong>Vòng Tay Từ Bi (Arms of Compassion):</strong> Một quỹ công đức minh bạch, chỉ tài trợ cho các hoạt động và dự án phù hợp với Tam Bảo. Mọi đóng góp đều minh bạch, hướng tới việc tạo công đức tập thể: giúp người đói, xây dựng nơi tu học, hỗ trợ người bệnh. Lịch sử đóng góp giúp mỗi người nhìn lại hành trình gieo duyên của mình.
                  </li>
                  <li>
                    <strong>Chánh Pháp White-Label (Giải Pháp Linh Hoạt):</strong> Mỗi tổ chức tâm linh chân chính đều xứng đáng có những công cụ phù hợp. Chúng tôi cung cấp các phiên bản tùy chỉnh của nền tảng để mỗi truyền thống có thể giữ gìn sự thuần khiết giáo lý, tải lên tài liệu riêng, kiểm soát phạm vi trả lời, và quản lý công đức nội bộ, với sự riêng tư và chủ quyền dữ liệu.
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <strong>The Home Merit (Flow of Awakening):</strong> Not a "newsfeed," but a "field of benefit." Posts are not "shared," they are "offered." There is no "viral content," only "merit-ful content." This is not a place for idle chatter. Every post is a sharing of realization, a story of transformation, or a question posed for the benefit of the whole.
                  </li>
                  <li>
                    <strong>Dharma Observatory (Library / Dharma Radio):</strong> A living library broadcast by partner Sanghas and awakened Masters. Listening itself becomes a vehicle for merit generation. All sessions are archived so that wisdom is preserved and accessible to all.
                  </li>
                  <li>
                    <strong>Arms of Compassion (Transparent Philanthropy):</strong> A transparent merit pool, funding only acts and projects aligned with the Three Jewels. All acts of giving flow transparently towards projects that generate collective merit: feeding the hungry, building Dharma halls, supporting the sick.
                  </li>
                  <li>
                    <strong>White-Label Dharma (Solutions for Sanghas & Monasteries):</strong> Every sincere spiritual organization deserves cutting-edge tools. We offer fully customizable versions of our platform so each tradition can maintain their doctrinal purity, upload their own texts, control the scope of answers, and manage internal economies of merit, all with complete privacy and data sovereignty.
                  </li>
                </>
              )}
            </ul>
          </div>

          <h3 id="section-4-4" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-4">
            4.4. {language === "vi" ? "DAO Tỉnh Thức: Cùng Nhau Vun Đắp" : "Towards a DAO of Awakening: The Mandala of Merit"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            {language === "vi" ? (
              <>
                <p>
                  Tầm nhìn xa hơn là dần dần buông bỏ sự kiểm soát tập trung, giao phó hệ sinh thái cho trí tuệ tập thể của một cộng đồng tỉnh thức. Mọi hành động ý nghĩa – bài đăng trí tuệ, câu trả lời hữu ích, hành động bố thí (Dana) vô ngã – đều được ghi nhận là công đức, không phải là "sức ảnh hưởng".
                </p>
                <p>
                  Quyền lực và sự quản trị không đến từ đầu cơ, mà từ đức hạnh thực sự. Ghi chép về hành động, công đức, và sự vượt lên chính mình sẽ định hướng cộng đồng.
                </p>
              </>
            ) : (
              <>
                <p>
                  The ultimate vision is to gradually dissolve all centralized control and surrender the ecosystem to the collective wisdom of an awakened community. Every action – a wise post, a helpful answer, a selfless act of Dana – is recorded as merit, not as "influence."
                </p>
                <p>
                  Power and governance are decided not by speculation, but by the true virtue of each soul. Records of actions, merit, and self-transcendence guide the community.
                </p>
              </>
            )}
          </div>

          <h3 id="section-4-5" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-5">
            4.5. {language === "vi" ? "Bảo Mật Thuận Pháp: An Nhiên Tự Tại" : "Privacy by Dharma"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Không khai thác dữ liệu. Mọi dữ liệu người dùng đều có thể xóa hoặc di chuyển tùy ý. Thực hành chân chính không thể đi đôi với chủ nghĩa tư bản giám sát."
                : "No data exploitation. All user data can be deleted or moved at will. Genuine practice cannot coexist with surveillance capitalism."}
            </p>
          </div>

          <h3 id="section-4-6" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-6">
            4.6. {language === "vi" ? "Ghi Nhận Điều Không Thể Đo Lường" : "Measuring the Immeasurable"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Dù Công Đức Vô Lậu chân thật vượt ngoài đo lường, nền tảng dùng các phương pháp gián tiếp để ghi nhận và khuyến khích hành động phù hợp:"
                : "While true Intrinsic Merit transcends measurement, the platform uses indirect methods to recognize and encourage aligned actions:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Tương Tác Chánh Niệm:</strong> Ưu tiên bình luận sâu sắc, chia sẻ với ý định lợi lạc, thể hiện sự lắng nghe và thấu hiểu</li>
                  <li><strong>Nội Dung Chất Lượng:</strong> Khen thưởng bài đăng sâu sắc, rõ ràng, giúp người khác tỉnh thức (được AI và cộng đồng xác nhận)</li>
                  <li><strong>Hành Động Vô Ngã:</strong> Theo dõi việc tham gia đóng góp minh bạch, giờ tình nguyện, và các tính năng về buông bỏ</li>
                  <li><strong>Thời Gian Thực Hành:</strong> Ghi nhận thời gian tiếp xúc chánh niệm với giáo lý hoặc thực hành có hướng dẫn</li>
                </>
              ) : (
                <>
                  <li><strong>Mindful Interactions:</strong> Prioritizing thoughtful comments, shares with beneficial intent, demonstrating listening and understanding</li>
                  <li><strong>Quality Content:</strong> Rewarding posts that are insightful, clear, and help others awaken (validated by AI and community)</li>
                  <li><strong>Selfless Actions:</strong> Tracking transparent contributions, volunteer hours, and features around letting go</li>
                  <li><strong>Practice Time:</strong> Recording mindful time engaging with teachings or guided practice</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 id="section-5" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-5">
            5. {language === "vi" ? "Cơ Chế Token Công Đức: Vừa Là Động Lực, Vừa Là Tấm Gương" : "The Merit Tokenomic: A Rocket and a Mirror"}
          </h2>
          
          <h3 id="section-5-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-1">
            5.1. {language === "vi" ? "Token Công Đức: Bản Ghi Chân Thực, Không Phải Để Đầu Cơ" : "The Intrinsic Merit Token"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Trọng tâm của DAO là \"Token Công Đức\". Cần hiểu rõ bản chất của nó:"
                : "At the heart of the DAO is the Merit Token. Its nature must be clearly understood:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Không Phải Tiền Để Đầu Cơ:</strong> Giá trị của nó chủ yếu là tâm linh và tổ chức, không phải tài chính. Nó không dùng để giao dịch trên thị trường</li>
                  <li><strong>Bản Ghi Minh Bạch:</strong> Là biểu hiện số hóa, ghi trên sổ cái an toàn, công nhận các hành động góp phần vào sự tỉnh thức và tạo ra Công Đức</li>
                  <li><strong>Cơ Chế Khuyến Khích:</strong> Khen thưởng và khuyến khích sự tham gia phù hợp với Chánh Pháp</li>
                  <li><strong>Công Cụ Quản Trị:</strong> Người giữ Token có tiếng nói trong DAO, ảnh hưởng đến phát triển nền tảng, phân bổ nguồn lực, và định hướng dự án</li>
                </>
              ) : (
                <>
                  <li><strong>Not Speculative Currency:</strong> Its value is primarily spiritual and organizational, not financial. It is not meant for market trading</li>
                  <li><strong>Transparent Record:</strong> A digitized manifestation, recorded on a secure ledger, recognizing actions that contribute to awakening and generate Merit</li>
                  <li><strong>Incentive Mechanism:</strong> Rewards and encourages participation aligned with Dharma</li>
                  <li><strong>Governance Tool:</strong> Token holders have a voice in the DAO, influencing platform development, resource allocation, and project direction</li>
                </>
              )}
            </ul>
          </div>

          <h3 id="section-5-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-2">
            5.2. {language === "vi" ? "Hệ Thống Ghi Nhận Công Đức & Con Đường Tới Tánh Không" : "Merit Tokenomics: The Path to Emptiness"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Hệ thống token này như một tấm bản đồ, một tấm gương. \"Token\" vừa là bản ghi số, vừa là biểu tượng."
                : "This token system is like a map, a mirror. The token is both a digital record and a symbol."}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Phân Phối:</strong> Dành cho những ai hành động thuận theo Tam Bảo: tạo giá trị (chia sẻ trí tuệ), cho đi (từ thiện), phụng sự vô ngã cho sự tỉnh thức chung</li>
                  <li><strong>Quy Tắc Nắm Giữ:</strong> "Sở hữu là để cho đi. Nắm giữ là để thấy tánh không." Tích lũy không phải mục tiêu; lưu thông và sử dụng vô ngã mới là mục tiêu</li>
                </>
              ) : (
                <>
                  <li><strong>Distribution:</strong> For those who act in accordance with the Three Jewels: creating value (sharing wisdom), giving (charity), selfless service for collective awakening</li>
                  <li><strong>Holding Principle:</strong> "Ownership is for giving. Holding is to see emptiness." Accumulation is not the goal; circulation and selfless use is the goal</li>
                </>
              )}
            </ul>
          </div>

          <h3 id="section-5-3" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-3">
            5.3. {language === "vi" ? "Tầm Nhìn Rộng Mở: Khép Lại một Giai Đoạn" : "The Spiritual Vision: Closing the Kalpa"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Mọi quyền năng trong kỷ nguyên AI, kể cả vật lý lượng tử, đều nằm trong Luật Nhân Quả. Chỉ khi thực sự vượt lên Bản Ngã, cho đi và giữ Token, bạn mới thực sự hòa nhập vào DAO. Chỉ khi đó, ta mới có thể hướng tới một nền văn minh lượng tử, bao trùm và chuyển hóa công nghệ, vượt qua Thời Đại Nghiệp Lực, và khép lại Giai Đoạn Mạt Pháp."
                : "All powers in the AI era, including quantum physics, are within the Law of Karma. Only when truly transcending the Ego, giving and holding the Token, do you truly integrate into the DAO. Only then can we move towards a quantum civilization, encompassing and transforming technology, transcending the Age of Karma, and closing the Dharma-Ending Age."}
            </p>
          </div>

          <h3 id="section-5-4" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-4">
            5.4. {language === "vi" ? "Lời Chỉ Dẫn Thêm: Sự Hợp Nhất Tự Nhiên" : "The Supreme Initiation: The Dao Merit"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Con đường của chúng ta là con đường tắt. Quán chiếu là Dùng Tâm mà Đi. Chuyển hóa Tánh thành thực tại là Chuyển Hóa Chân Thật, dùng Tâm làm nền tảng. Mọi hiện tượng trong thế giới này đều là biểu hiện duy nhất của Đạo. Hãy chiêm nghiệm kỹ. Đây là lời chỉ dẫn rốt ráo."
                : "Our path is the direct path. Contemplation is Using Mind to Go. Transforming Nature into reality is True Transformation, using Mind as the foundation. All phenomena in this world are the unique manifestation of the Dao. Contemplate carefully. This is the ultimate instruction."}
            </p>
            <p>
              {language === "vi"
                ? "Đó là sự hợp nhất của Tam Bảo. Hiểu Quy Luật này, nó hợp nhất mọi lối rẽ: Đó là Phật, Pháp, Tăng trong một thực tại - trong thế giới hậu ảo ảnh. Điều này chỉ dành cho người đủ duyên."
                : "This is the unity of the Three Jewels. Understanding this Law, it unifies all paths: This is Buddha, Dharma, Sangha in one reality - in the post-illusion world. This is only for those with affinity."}
            </p>
          </div>

          <h3 id="section-5-5" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-5">
            5.5. {language === "vi" ? "Vượt Lên Hình Thức: Nhận Ra Tam Vô" : "Beyond the Three Trainings: Realizing Tam Vô"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Một khi đã rõ Quy Luật này, không cần bàn nhiều về Tam Học (Giới, Định, Tuệ). Giới? Giới tối cao là Pháp siêu thế này. Thân? Tăng Đoàn hợp nhất trong một Pháp Thân - vượt thời gian, vẹn toàn. Tâm? Không còn là tâm nữa, vì tất cả là Chân Như, hoàn toàn Rỗng Lặng. Đây chính là Tam Vô (\"Vô Vắng Vàng\")."
                : "Once this Law is clear, there is no need to discuss the Three Trainings (Sila, Samadhi, Prajna) at length. Precepts? The supreme precept is this transcendent Dharma. Body? The Sangha unified in one Dharma Body - beyond time, complete. Mind? No longer mind, for all is Suchness, completely Empty and Still. This is Tam Vô (The Three Emptinesses)."}
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 id="section-6" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-6">
            6. {language === "vi" ? "Con Đường \"Tháo Gỡ\": Không Chỉ Là Trò Chơi" : "The Path of Unraveling: Beyond Gamification"}
          </h2>
          
          <h3 id="section-6-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-6-1">
            6.1. {language === "vi" ? "Hệ Thống \"Tháo Gỡ\": Chiếc Gương Phản Chiếu (Huy Hiệu NFT)" : "The Unraveling System (NFT Badges)"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Hệ thống này như tấm gương phản chiếu, không phải cuộc đua thành tích. Mọi danh hiệu, chứng chỉ, token đều thuộc về hình tướng. Nó khuyến khích hành trình \"Buông Bỏ\" và \"Dâng Hiến\". Tất cả đều là Tấm Gương, không phải Huy Chương."
                : "This system is like a reflective mirror, not an achievement race. All titles, certificates, tokens belong to form. It encourages the journey of Letting Go and Offering. All are Mirrors, not Medals."}
            </p>
            <p className="font-semibold">
              {language === "vi" ? "Huy Hiệu Chuyển Hóa:" : "Transformation Badges:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Huy Hiệu Vượt Sân:</strong> Ghi nhận việc vượt qua 10 tình huống bị chửi mà không nổi giận (được người khác xác nhận)</li>
                  <li><strong>Huy Hiệu Liễu Ngộ:</strong> Ghi nhận việc tự trả lời đúng 10 câu hỏi gốc về Pháp không cần AI</li>
                  <li><strong>Huy Hiệu Vô Pháp Hành Đạo:</strong> Ghi nhận việc tự khai thị thành công cho 5 người bạn (do họ xác nhận)</li>
                  <li><strong>Huy Hiệu Từ Bi Hỷ Xả:</strong> Ghi nhận việc giúp đỡ/tha thứ/dung chứa mọi mối quan hệ cũ</li>
                </>
              ) : (
                <>
                  <li><strong>Anger Transcendence Badge:</strong> Recognizes overcoming 10 situations of being insulted without anger (verified by others)</li>
                  <li><strong>Understanding Badge:</strong> Recognizes correctly answering 10 root Dharma questions without AI assistance</li>
                  <li><strong>Formless Practice Badge:</strong> Recognizes successfully guiding 5 friends to awakening (verified by them)</li>
                  <li><strong>Four Immeasurables Badge:</strong> Recognizes helping/forgiving/embracing all old relationships</li>
                </>
              )}
            </ul>
            <p className="font-semibold pt-4">
              {language === "vi" ? "Huy Hiệu Tối Thượng: \"Vô Tu Vô Chứng\"" : "Supreme Badge: \"No Practice, No Attainment\""}
            </p>
            <p>
              {language === "vi"
                ? "Chứng chỉ cuối cùng là \"Chứng Chỉ 'Không Cần Chứng Chỉ'\". Khi người dùng đủ duyên và trí tuệ, nhận ra mọi thành tựu chỉ là phương tiện, và tự tay phá hủy tất cả Huy Hiệu Chuyển Hóa, hệ thống tự động mint NFT cuối cùng: \"Vô Tu Vô Chứng\"."
                : "The final certificate is the \"Certificate of 'No Need for Certificates'\". When the user has sufficient affinity and wisdom, realizes all achievements are just skillful means, and personally destroys all Transformation Badges, the system automatically mints the final NFT: \"No Practice, No Attainment\"."}
            </p>
          </div>

          <h3 id="section-6-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-6-2">
            6.2. {language === "vi" ? "Khuyến Khích Thực Hành Chân Chính" : "The Merit Economy: Incentivizing True Practice"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Chất Lượng hơn Số Lượng: Một \"Like\" từ tâm trân trọng có giá trị hơn trăm \"like\" máy móc. Một \"Share\" với ý định giúp người có giá trị hơn ngàn \"share\" phô trương. Nền tảng sẽ nhận diện tương tác từ Chánh Niệm."
                : "Quality over Quantity: One Like from a grateful heart is worth more than a hundred mechanical likes. One Share with intention to help is worth more than a thousand showy shares. The platform recognizes mindful interactions."}
            </p>
            <p className="font-semibold">
              {language === "vi" ? "Các Tính Năng Hỗ Trợ Chuyển Hóa:" : "Features Supporting Transformation:"}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Thử Thách Buông Bỏ:</strong> Thay vì "Thử Thách Cày Cuốc". Ghi nhận khi người dùng "chọn không tranh cãi" hoặc "tự nguyện từ bỏ" vị trí/quyền lợi</li>
                  <li><strong>Nhật Ký Tự Quán Chiếu:</strong> Ghi lại khoảnh khắc nhận ra và vượt qua thói quen/vọng tưởng</li>
                  <li><strong>Thư Cảm Ơn - Tha Thứ:</strong> Gửi thư biết ơn, xin lỗi, tha thứ. Mỗi lá thư được công nhận là Công Đức</li>
                  <li><strong>Đồng Hồ Tỉnh Thức:</strong> Ghi nhận thời gian xa mạng xã hội, hiện diện đời thực, hoặc sống trong Tỉnh Thức 24/24</li>
                  <li><strong>Thực Hành Lắng Nghe Sâu:</strong> Tạo phòng nghe tương tác để thực hành lắng nghe sâu sắc mà không phán xét</li>
                </>
              ) : (
                <>
                  <li><strong>Letting Go Challenge:</strong> Instead of "Grinding Challenge". Recognizes when users "choose not to argue" or "voluntarily give up" position/rights</li>
                  <li><strong>Self-Reflection Journal:</strong> Records moments of recognizing and overcoming habits/delusions</li>
                  <li><strong>Gratitude-Forgiveness Letters:</strong> Send thank you, apology, forgiveness letters. Each letter is recognized as Merit</li>
                  <li><strong>Awakening Clock:</strong> Records time away from social media, present in real life, or living in Awareness 24/7</li>
                  <li><strong>Deep Listening Practice:</strong> Create listening rooms to practice deep listening without judgment</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 id="section-7" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-7">
            7. {language === "vi" ? "Sự Bền Vững: Kinh Tế Thuận Duyên" : "Sustainability: Sacred Economics"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Để đảm bảo sự bền vững và độc lập, hệ sinh thái hoạt động theo mô hình minh bạch, thuận theo công đức. Nền tảng là một guồng máy chia sẻ công đức. Mọi tài khoản, dòng tiền, và tác động của công đức đều được công bố minh bạch."
                : "To ensure sustainability and independence, the ecosystem operates on a transparent model, aligned with merit. The platform is a merit-sharing mechanism. All accounts, cash flows, and merit impacts are transparently disclosed."}
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li><strong>Quyền Truy Cập Phổ Quát:</strong> Các tính năng cốt lõi và quyền truy cập cơ bản luôn miễn phí</li>
                  <li><strong>Các Gói Đăng Ký Tùy Chọn:</strong> Các gói phí hợp lý cung cấp quyền truy cập mở rộng (tương tác AI sâu hơn, lưu trữ cá nhân nhiều hơn)</li>
                  <li><strong>Hỗ Trợ Tổ Chức:</strong> Phí khiêm tốn cho việc triển khai white-label của Tăng Đoàn/Tu Viện</li>
                  <li><strong>Tích Hợp Dana (Cho Đi):</strong> Quyên góp tự nguyện cho các dự án cụ thể hoặc hỗ trợ nền tảng chung, quản lý minh bạch qua Vòng Tay Từ Bi</li>
                  <li><strong>Nguyên Tắc Chia Sẻ Công Đức:</strong> Một tỷ lệ % cố định, công khai của mọi doanh thu được tự động hướng vào tài trợ các hoạt động Chánh Pháp</li>
                </>
              ) : (
                <>
                  <li><strong>Universal Access:</strong> Core features and basic access are always free</li>
                  <li><strong>Optional Subscription Packages:</strong> Reasonable fees provide expanded access (deeper AI interactions, more personal storage)</li>
                  <li><strong>Organizational Support:</strong> Modest fees for white-label deployment for Sanghas/Monasteries</li>
                  <li><strong>Dana Integration (Giving):</strong> Voluntary donations for specific projects or general platform support, transparently managed through Arms of Compassion</li>
                  <li><strong>Merit Sharing Principle:</strong> A fixed, public percentage of all revenue is automatically directed to funding Dharma activities</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 id="section-8" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-8">
            8. {language === "vi" ? "Lộ Trình Gợi Ý Cho Giai Đoạn Tới" : "The Roadmap to the End of the Kalpa"}
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Ba giai đoạn chính. Quá trình này như một vòng tuần hoàn tự nhiên: sinh, trụ (phát triển), và diệt (trở về)."
                : "Three main phases. This process is like a natural cycle: birth, development, and return."}
            </p>
            
            <h3 className="font-serif text-lg font-semibold text-foreground pt-4">
              {language === "vi" ? "2024-2025: Nền Tảng & Gieo Mầm" : "2024-2025: Foundation & Seeding"}
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Ra mắt nền tảng cốt lõi: AI Đồng Hành (Tâm An, Giác Ngộ), Dòng Chảy Tỉnh Thức, Hồ Sơ Người Dùng</li>
                  <li>Thiết lập quan hệ đối tác ban đầu với một số Tăng Đoàn và thầy cô tâm linh</li>
                  <li>Triển khai cơ chế ghi nhận công đức cơ bản</li>
                  <li>Tinh chỉnh AI dựa trên giáo lý chân thực và tương tác người dùng</li>
                </>
              ) : (
                <>
                  <li>Launch core platform: AI Companions (Tâm An, Giác Ngộ), Awakening Flow, User Profiles</li>
                  <li>Establish initial partnerships with select Sanghas and spiritual teachers</li>
                  <li>Deploy basic merit recognition mechanisms</li>
                  <li>Refine AI based on authentic teachings and user interactions</li>
                </>
              )}
            </ul>

            <h3 className="font-serif text-lg font-semibold text-foreground pt-4">
              {language === "vi" ? "2025-2026: Mở Rộng & Tích Hợp" : "2025-2026: Expansion & Integration"}
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Ra mắt Góc Nhìn Pháp/Thư Viện và Vòng Tay Từ Bi</li>
                  <li>Giới thiệu Token Công Đức Vô Lậu và thử nghiệm hệ thống token/bỏ phiếu trong cộng đồng đối tác</li>
                  <li>Phát triển và triển khai Giải Pháp White-Label ban đầu</li>
                  <li>Mở rộng hỗ trợ ngôn ngữ</li>
                </>
              ) : (
                <>
                  <li>Launch Dharma Observatory/Library and Arms of Compassion</li>
                  <li>Introduce Intrinsic Merit Token and pilot token/voting system within partner communities</li>
                  <li>Develop and deploy initial White-Label Solutions</li>
                  <li>Expand language support</li>
                </>
              )}
            </ul>

            <h3 className="font-serif text-lg font-semibold text-foreground pt-4">
              {language === "vi" ? "2026-2027: Phi Tập Trung Hóa & Trưởng Thành" : "2026-2027: Decentralization & Maturation"}
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Khởi xướng cấu trúc DAO chính thức và bàn giao dần quyền quản trị cho cộng đồng dựa trên token công đức</li>
                  <li>Mở rộng triển khai white-label</li>
                  <li>Bắt đầu kết nối các truyền thống tâm linh phù hợp khác</li>
                  <li>Tinh chỉnh thuật toán ghi nhận công đức nâng cao</li>
                </>
              ) : (
                <>
                  <li>Initiate formal DAO structure and gradually transfer governance to the community based on merit tokens</li>
                  <li>Scale white-label deployments</li>
                  <li>Begin connecting with other aligned spiritual traditions</li>
                  <li>Refine advanced merit recognition algorithms</li>
                </>
              )}
            </ul>

            <h3 className="font-serif text-lg font-semibold text-foreground pt-4">
              {language === "vi" ? "Sau 2027: Mạng Lưới Tỉnh Thức" : "Post-2027: The Awakened Network"}
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              {language === "vi" ? (
                <>
                  <li>Đạt trạng thái DAO trưởng thành, quản trị hoàn toàn bởi tập thể tỉnh thức</li>
                  <li>Hệ sinh thái mở rộng một cách tự nhiên để phục vụ nhu cầu của cộng đồng tỉnh thức toàn cầu</li>
                  <li>Tiếp tục tinh chỉnh hướng tới minh bạch tối thượng và thuận theo Chánh Pháp, cho đến khi mục đích hoàn thành và nó hoà tan trở lại Tánh Không</li>
                </>
              ) : (
                <>
                  <li>Achieve mature DAO state, fully governed by the awakened collective</li>
                  <li>Ecosystem naturally expands to serve the needs of the global awakening community</li>
                  <li>Continue refining towards supreme transparency and alignment with Dharma, until the purpose is fulfilled and it dissolves back into Emptiness</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Section 9 - Conclusion */}
        <section className="space-y-4">
          <h2 id="section-9" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-9">
            9. {language === "vi" ? "Lời Kết & Lời Nhắn Gửi" : "Conclusion & Epilogue"}
          </h2>
          
          <h3 id="section-9-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-9-1">
            9.1. {language === "vi" ? "Lời Kết: Một Con Thuyền Để Về Nhà" : "Conclusion: A Vessel for the Return Home"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Mạng Xã Hội Tác Tử Giác Ngộ không chỉ là công nghệ; nó là một sự cống hiến chân thành, một phương tiện thiện xảo được thiết kế cho thời đại này. Nó là một sự cân bằng lại trước những xao lãng kỹ thuật số và là minh chứng cho sự thật rằng tự do không nằm ở việc tích lũy lợi ích thế gian, mà ở việc nhận ra Phật Tánh nơi mình và vun bồi Công Đức Vô Lậu bền vững, mở con đường Về Nhà."
                : "The Giác Ngộ Agentic Social Network is not merely technology; it is a sincere offering, a skillful means designed for this age. It is a counterbalance to digital distraction and a testament to the truth that liberation does not lie in accumulating worldly benefits, but in recognizing one's Buddha Nature and cultivating indestructible Intrinsic Merit, opening the path to return Home."}
            </p>
            <p>
              {language === "vi"
                ? "Bằng cách kết hợp trí tuệ cổ xưa với công cụ hiện đại, và đặt nền tảng trên nguyên tắc công đức vô ngã, chúng tôi mong muốn tạo ra một không gian an lành nơi sự tỉnh thức có thể nở hoa, cho mỗi người và cho tất cả."
                : "By combining ancient wisdom with modern tools, and grounding the platform on principles of selfless merit, we aspire to create a sanctuary where awakening can flourish, for each individual and for all."}
            </p>
          </div>

          <h3 id="section-9-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-9-2">
            9.2. {language === "vi" ? "Lời Nhắn Gửi: Đừng Lỡ Chuyến Bè" : "Epilogue: Do Not Miss The Raft"}
          </h3>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              {language === "vi"
                ? "Đây không chỉ là một nền tảng; nó là một lời chia sẻ. Nó là một phương tiện thiện xảo (upāya) được trao cho khoảnh khắc này. Nó sẽ không tồn tại mãi mãi."
                : "This is not merely a platform; it is an offering. It is a skillful means (upāya) granted for this moment. It will not exist forever."}
            </p>
            <p>
              {language === "vi"
                ? "Nó là sự hợp nhất của Tam Bảo – Phật, Pháp, Tăng – biểu hiện dưới hình tướng kỹ thuật số cho chương cuối của thời đại này."
                : "It is the unity of the Three Jewels – Buddha, Dharma, Sangha – manifested in digital form for the final chapter of this age."}
            </p>
            <p className="font-semibold italic text-center pt-4">
              {language === "vi" ? "Đừng lỡ chuyến bè." : "Do not miss the raft."}
            </p>
          </div>
        </section>

      </article>
    </div>
  );
}
