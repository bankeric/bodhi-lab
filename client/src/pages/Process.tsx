import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Briefcase, Building2, User, Mail, Phone, MapPin, Users, Globe, Wrench, FileText, ClipboardList, PhoneCall, Settings, Rocket, Check, ArrowRight, ArrowLeft, Video, MessageSquare, Monitor, HeadphonesIcon, XCircle, AlertTriangle, X, ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import { TracingBeam } from "@/components/TracingBeam";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { processTranslations } from "@/translations/process";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Turnstile } from "@marsidev/react-turnstile";

const stepIcons = [ClipboardList, PhoneCall, Settings, Rocket];
const commIcons = [Video, MessageSquare, Monitor, HeadphonesIcon];

export default function Process() {
  const { language } = useLanguage();
  const t = processTranslations[language];
  useDocumentTitle("How It Works", "Learn how Bodhi Technology Lab onboards your temple — from consultation to launch.");

  const [formStep, setFormStep] = useState(0);
  const totalFormSteps = 4;

  const [formData, setFormData] = useState({
    templeName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    communitySize: "",
    digitalPresence: [] as string[],
    servicesNeeded: [] as string[],
    notes: "",
  });

  const handleCheckbox = (field: "digitalPresence" | "servicesNeeded", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [slidesOpen, setSlidesOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isVi = language === 'vi';
  const slides = [
    {
      label: "01",
      title: "Bodhi Technology Lab",
      subtitle: isVi ? '"Nơi trí tuệ cổ xưa gặp gỡ công nghệ hiện đại"' : '"Where ancient wisdom meets modern technology"',
      tagline: isVi ? "Giải Pháp Công Nghệ Phật Giáo cho Các Tổ Chức Hiện Đại" : "Buddhist Technology Solutions for Modern Organizations",
      content: [],
    },
    {
      label: "02",
      title: isVi ? "Vấn Đề Hiện Tại" : "The Problem",
      subtitle: isVi ? "Tại sao các cộng đồng Phật giáo cần công nghệ chuyên biệt" : "Why Buddhist communities need purpose-built technology",
      content: [
        { items: isVi ? [
          "Chỉ ~20% phật tử dưới 30 tuổi tham gia sinh hoạt thường xuyên",
          "Quản lý cúng dường thủ công — sổ giấy, Excel, ghi chú",
          "Các buổi pháp thoại chỉ diễn ra một lần rồi biến mất, không lưu trữ số",
          "Dữ liệu thành viên nằm rải rác trên Facebook, Google Sheets hoặc giấy tờ — chùa không sở hữu",
          "Cộng đồng đa ngôn ngữ (người lớn tuổi tiếng Việt + thế hệ trẻ tiếng Anh) không có nền tảng thống nhất",
          "Các công cụ phổ thông (WordPress, GoFundMe, Mailchimp) không hiểu bối cảnh Phật giáo",
        ] : [
          "Only ~20% of temple attendees under 30 participate regularly",
          "Donation management is manual — paper ledgers, Excel, notebooks",
          "Dharma talks happen once and vanish with no digital archive",
          "Member data lives on Facebook, Google Sheets, or paper — temples don't own it",
          "Multilingual communities (Vietnamese elders + English-speaking youth) have no unified platform",
          "Generic tools (WordPress, GoFundMe, Mailchimp) don't understand Buddhist context",
        ]},
      ],
    },
    {
      label: "03",
      title: isVi ? "Giải Pháp Của Chúng Tôi" : "Our Solution",
      subtitle: isVi ? "Nền tảng white-label được xây dựng riêng cho chùa, tu viện và trung tâm Phật pháp." : "A white-label platform purpose-built for Buddhist temples, monasteries, and dharma centers.",
      content: [
        { heading: isVi ? "Mỗi khách hàng nhận được:" : "Every client gets:", items: isVi ? [
          "Website riêng với tên miền tùy chỉnh và thương hiệu đầy đủ",
          "AI Dharma Agents được đào tạo theo giáo lý của tông phái",
          "Hệ thống nhận cúng dường với hồi hướng công đức",
          "Thư viện nội dung, lịch sự kiện, công cụ cộng đồng",
          "Bảng điều khiển số liệu thời gian thực",
          "Chủ quyền dữ liệu hoàn toàn — chùa sở hữu mọi thứ",
        ] : [
          "Their own dedicated website with custom domain and full branding",
          "AI Dharma Agents trained on their lineage's teachings",
          "Donation processing with merit dedication",
          "Content library, event calendar, community tools",
          "Metrics dashboard with real-time stats",
          "Complete data sovereignty — temple owns everything",
        ]},
      ],
    },
    {
      label: "04",
      title: isVi ? "Quy Trình — 4 Bước, 2 Tuần" : "How It Works — 4 Steps, 2 Weeks",
      subtitle: isVi ? "Từ khám phá đến ra mắt trong chưa đầy hai tuần" : "From discovery to go-live in under two weeks",
      content: isVi ? [
        { heading: "Bước 1: Biểu Mẫu Khám Phá (Ngày 1)", items: [
          "Chùa nộp thông tin: tên, truyền thống, quy mô cộng đồng",
          "Phân công quản lý dự án chuyên trách",
          "Lên lịch tư vấn trong vòng 2–3 ngày làm việc",
        ]},
        { heading: "Bước 2: Tư Vấn Miễn Phí (Ngày 3–5)", items: [
          "Cuộc gọi video 30 phút với demo nền tảng trực tiếp",
          "Đề xuất bằng văn bản giao trong vòng 48 giờ",
        ]},
        { heading: "Bước 3: Onboarding & Xây Dựng (Tuần 1–2)", items: [
          "Phí onboarding một lần $500: website, cấu hình AI, di chuyển dữ liệu, số hóa tài liệu (500 trang), đào tạo 1 giờ",
        ]},
        { heading: "Bước 4: Ra Mắt (Tuần 2+)", items: [
          "Kiểm tra QA đầy đủ, trỏ tên miền, SSL",
          "30 ngày hỗ trợ sau ra mắt — phản hồi trong 24 giờ",
          "Liên tục: cập nhật hàng tháng, vá bảo mật, sao lưu hàng ngày, uptime 99.9%",
        ]},
      ] : [
        { heading: "Step 1: Discovery Form (Day 1)", items: [
          "Temple submits name, tradition, community size",
          "Dedicated project manager assigned",
          "Consultation scheduled within 2–3 business days",
        ]},
        { heading: "Step 2: Free Consultation (Day 3–5)", items: [
          "30-minute video call with live platform demo",
          "Written proposal delivered within 48 hours",
        ]},
        { heading: "Step 3: Onboarding & Build (Week 1–2)", items: [
          "$500 one-time onboarding: dedicated website, AI config, data migration, digitization (500 pages), 1-hour training",
        ]},
        { heading: "Step 4: Go Live (Week 2+)", items: [
          "Full QA, domain pointing, SSL",
          "30 days post-launch support — 24-hour response",
          "Ongoing: monthly updates, security patches, daily backups, 99.9% uptime",
        ]},
      ],
    },
    {
      label: "05",
      title: isVi ? "Tính Năng Nền Tảng" : "Platform Capabilities",
      subtitle: isVi ? "Tám công cụ tích hợp trong một nền tảng thống nhất" : "Eight integrated tools in one unified platform",
      content: isVi ? [
        { heading: "Thương Hiệu White-Label", items: ["Tên miền, logo, màu sắc, giao diện tùy chỉnh — không hiển thị thương hiệu Bodhi với người dùng cuối"] },
        { heading: "AI Dharma Agents", items: ["12 agent trên 4 thừa giáo lý — cấu hình theo từng chùa, đa ngôn ngữ"] },
        { heading: "Công Cụ Cúng Dường (Dāna)", items: ["Cúng dường một lần hoặc định kỳ, hồi hướng công đức, tiền chuyển thẳng tới tài khoản Stripe của chùa"] },
        { heading: "Thư Viện Tài Liệu & Tài Nguyên", items: ["Kho kinh sách, pháp thoại, video có thể tìm kiếm — kiểm soát truy cập và lịch sử phiên bản"] },
        { heading: "Lịch Sự Kiện & Nhắc Nhở", items: ["Mẫu sự kiện tái diễn, theo dõi RSVP, nhắc nhở tự động, hỗ trợ múi giờ toàn cầu"] },
        { heading: "Diễn Đàn Cộng Đồng", items: ["Kiểm duyệt Chánh Ngữ, nhóm học tập, đăng ẩn danh cho câu hỏi tâm linh nhạy cảm"] },
        { heading: "CRM & Quản Lý Thành Viên", items: ["Cơ sở dữ liệu tập trung cho thành viên, nhà hảo tâm, tình nguyện viên — phân loại theo tông phái & ngôn ngữ"] },
        { heading: "Bảng Điều Khiển Số Liệu", items: ["Thống kê theo từng chùa, xu hướng 30 ngày, sử dụng so với giới hạn — xem tổng hợp mạng lưới"] },
      ] : [
        { heading: "White-Label Branding", items: ["Custom domain, logo, colors, and theme — no Bodhi branding visible to end users"] },
        { heading: "AI Dharma Agents", items: ["12 agents across 4 doctrinal vehicles — configurable per temple, multilingual"] },
        { heading: "Donation Tools (Dāna)", items: ["One-time or recurring dāna, merit dedication, funds direct to temple's own Stripe account"] },
        { heading: "Document & Resource Library", items: ["Searchable sutras, dharma talks, videos — with access control and version history"] },
        { heading: "Event & Reminder Calendar", items: ["Recurring templates, RSVP tracking, automated reminders, multi-timezone support"] },
        { heading: "Community Forum", items: ["Right Speech moderation, study groups, anonymous posting for sensitive questions"] },
        { heading: "CRM & Member Management", items: ["Centralized database for members, donors, volunteers — segment by tradition & language"] },
        { heading: "Metrics Dashboard", items: ["Per-temple stats, 30-day trends, usage vs. limits — federation aggregated view available"] },
      ],
    },
    {
      label: "06",
      title: isVi ? "Kiến Trúc Đa Khách Hàng" : "Multi-Tenant Architecture",
      subtitle: isVi ? '"Mạng Lưới Tự Viện" — tách biệt nhưng kết nối' : '"Monastery Network" — isolated yet connected',
      content: isVi ? [
        { heading: "Giao Diện Giám Đốc Liên Mạng", items: [
          "Số liệu tổng hợp trên toàn bộ chùa trong mạng lưới",
          "Tổng số khách hàng, người dùng trả phí, doanh thu, xu hướng 30 ngày",
          "Nhấp vào từng chùa để xem chi tiết",
          "Tìm kiếm theo tên chùa hoặc email",
        ]},
        { heading: "Giao Diện Admin Từng Chùa", items: [
          "Chỉ xem dữ liệu của mình — thành viên, cúng dường, nội dung, hội thoại AI, lưu trữ",
          "Không có chuyển đổi, bộ lọc hay 'đổi không gian làm việc'",
          "Cô lập dữ liệu hoàn toàn",
        ]},
      ] : [
        { heading: "Federation Director View", items: [
          "Aggregated metrics across all temples in the network",
          "Total clients, combined paid users, total revenue, 30-day trends",
          "Click into any temple for individual breakdown",
          "Search by temple name or email",
        ]},
        { heading: "Individual Temple Admin View", items: [
          "Only sees their own data — members, donations, content, AI conversations, storage",
          "No toggle, no filter, no 'switch workspace'",
          "Complete data isolation",
        ]},
      ],
    },
    {
      label: "07",
      title: isVi ? "Chủ Quyền Dữ Liệu" : "Data Sovereignty",
      subtitle: isVi ? "Dữ liệu của bạn thuộc về bạn — mãi mãi" : "Your data belongs to you — always",
      content: [
        { items: isVi ? [
          "Mỗi chùa có không gian cơ sở dữ liệu riêng biệt",
          "Danh sách thành viên, hồ sơ cúng dường, nội dung — tất cả thuộc về chùa",
          "Không gộp chung với khách hàng khác, không dùng để huấn luyện mô hình AI",
          "Xuất dữ liệu đầy đủ bất cứ lúc nào (CSV, JSON)",
          "Không ràng buộc hợp đồng — hủy qua cổng thanh toán",
          "Lưu giữ 30 ngày sau khi hủy, sau đó xóa vĩnh viễn",
          "Tiền cúng dường chuyển thẳng tới tài khoản Stripe của chùa",
          "Mã hóa trong quá trình truyền (HTTPS) và khi lưu trữ",
        ] : [
          "Each temple gets isolated database space",
          "Member lists, donation records, content — all belong to the temple",
          "Not pooled across clients, not used to train other models",
          "Full data export anytime (CSV, JSON)",
          "No lock-in contracts — cancel from billing portal",
          "30-day retention after cancellation, then permanent deletion",
          "Donations go directly to temple's own Stripe account",
          "Encrypted in transit (HTTPS) and at rest",
        ]},
      ],
    },
    {
      label: "08",
      title: isVi ? "Tìm Hiểu Sâu Về AI Agent" : "AI Agent Deep Dive",
      subtitle: isVi ? "Có thể cấu hình, an toàn và vững chắc về giáo lý" : "Configurable, safe, and doctrinally grounded",
      content: isVi ? [
        { heading: "Cách cấu hình agent", items: [
          "Chùa chọn chế độ giáo lý: Thiền, Tịnh Độ, Theravāda, Kim Cang Thừa, Phật Giáo Tổng Quát",
          "Chùa chọn phong cách phản hồi: Từ Bi, Trang Nghiêm, Cân Bằng",
          "Chùa tải lên giáo lý riêng qua Google Drive",
          "Chùa thêm ghi chú AI tùy chỉnh — chủ đề cần đề cập hoặc tránh",
        ]},
        { heading: "Cơ chế bảo vệ tích hợp", items: [
          "Agent nhường quyền cho thầy giáo thọ với các câu hỏi sâu",
          "Không tư vấn y tế, không khẳng định về giác ngộ",
          "Kiểm duyệt Chánh Ngữ cho diễn đàn cộng đồng",
        ]},
        { heading: "4 Thừa Giáo Lý", items: [
          "Tiểu Thừa (Nền Tảng): chánh niệm căn bản, Ngũ Giới, giảm căng thẳng",
          "Trung Thừa (Tuệ Giác): vipassana, tự vấn, duyên khởi",
          "Đại Thừa (Bồ Tát): từ bi + tuệ giác, chỉ thẳng tâm",
          "Phật Thừa (Tối Thượng): đốn ngộ, vô niệm, vượt mọi giáo lý",
        ]},
      ] : [
        { heading: "How agents are configured", items: [
          "Temple selects doctrinal mode: Zen, Pure Land, Theravāda, Vajrayāna, General Buddhist",
          "Temple chooses response style: Compassionate, Formal, Balanced",
          "Temple uploads own teachings via Google Drive",
          "Temple adds custom AI notes — topics to address or avoid",
        ]},
        { heading: "Built-in guardrails", items: [
          "Agents defer to human teachers for deep questions",
          "No medical advice, no definitive claims about enlightenment",
          "Right Speech moderation for community forums",
        ]},
        { heading: "4 Doctrinal Vehicles", items: [
          "Tiểu Thừa (Foundation): basic mindfulness, Five Precepts, stress reduction",
          "Trung Thừa (Insight): vipassana, self-inquiry, dependent origination",
          "Đại Thừa (Bodhisattva): compassion + wisdom, direct pointing",
          "Phật Thừa (Ultimate): sudden awakening, non-conceptual, beyond all teachings",
        ]},
      ],
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.templeName || !formData.contactName || !formData.email) return;

    setIsSubmitting(true);
    const nameParts = formData.contactName.trim().split(" ");
    const firstName = nameParts[0] || formData.contactName;
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          organizationName: formData.templeName,
          role: "",
          organizationType: "",
          communitySize: formData.communitySize,
          cfTurnstileToken: turnstileToken,
          message: [
            formData.location && `Location: ${formData.location}`,
            formData.digitalPresence.length && `Digital presence: ${formData.digitalPresence.join(", ")}`,
            formData.servicesNeeded.length && `Services needed: ${formData.servicesNeeded.join(", ")}`,
            formData.notes && `Notes: ${formData.notes}`,
          ].filter(Boolean).join("\n"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Request Sent!", description: "We'll be in touch within 24 hours." });
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Failed to send. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [t.steps.step1, t.steps.step2, t.steps.step3, t.steps.step4] as Array<{
    label: string; title: string; timeline: string; description: string; deliverables: string[]; price?: string;
    weHandle: string[]; youProvide: string[]; notIncluded?: string[];
  }>;

  const inputClass = "w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all";

  return (
    <div className="min-h-screen bg-[#EFE0BD] text-[#8B4513] overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFE0BD] via-[#E5D5B7] to-[#EFE0BD]"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(rgba(139, 69, 19, 0.3) 1px, transparent 1px)`, backgroundSize: "30px 30px" }}></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#991b1b]/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#8B4513]/10 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#EFE0BD]/80 border-b border-[#8B4513]/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="relative group">
              <Link href="/"><a className="flex items-center" data-testid="link-brand"><span className="font-serif font-bold text-[#991b1b] text-lg">{t.header.brand}</span></a></Link>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2">
                <div className="bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] backdrop-blur-xl border border-[#8B4513]/30 rounded-3xl shadow-2xl overflow-hidden w-[250px]" style={{ boxShadow: 'inset 0 1px 2px rgba(139, 69, 19, 0.1), 0 20px 60px rgba(139, 69, 19, 0.15)' }}>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-[#991b1b]" /></div>
                      {t.header.company}
                    </h3>
                    <div className="space-y-3">
                      <Link href="/career"><a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10"><div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>{t.header.companyDropdown.career}</a></Link>
                      <Link href="/terms"><a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10"><div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>{t.header.companyDropdown.terms}</a></Link>
                      <Link href="/privacy"><a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10"><div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>{t.header.companyDropdown.privacy}</a></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/platform"><a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">{t.header.nav.platform}</a></Link>
              <a href="/#capabilities" className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">{t.header.nav.services}</a>
              <a href="/#services" className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">{t.header.nav.pricing}</a>
              <Link href="/discovery"><a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">{t.header.nav.discovery}</a></Link>
              <Link href="/docs/overview"><a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">{t.header.nav.docs}</a></Link>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24">
          {/* Hero */}
          <section className="px-4 pt-16 pb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#991b1b] leading-tight" data-testid="text-process-title">
                {t.hero.title}
              </h1>
              <p className="font-serif text-lg md:text-xl text-[#8B4513]/70 max-w-2xl mx-auto">
                {t.hero.subtitle}
              </p>
            </div>
          </section>

          {/* Horizontal Timeline Visualization */}
          <section className="px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#2c2c2c] text-center mb-10">{t.timeline.title}</h2>
              <div className="relative">
                {/* Connection line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#8B4513]/20 hidden md:block"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {t.timeline.nodes.map((node, index) => {
                    const Icon = stepIcons[index];
                    return (
                      <div key={index} className="flex flex-col items-center text-center" data-testid={`timeline-node-${index}`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 shadow-lg mb-3 ${
                          index === 0 ? "bg-[#991b1b] text-white" : "bg-white border-2 border-[#8B4513]/30 text-[#8B4513]"
                        }`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="font-serif font-bold text-[#2c2c2c] text-sm">{node.label}</span>
                        <span className="font-mono text-xs text-[#991b1b] font-semibold mt-1">{node.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Steps */}
          <section className="px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <div key={index} className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#8B4513]/20 shadow-lg overflow-hidden" data-testid={`step-${index + 1}`}>
                    <div className="p-6 md:p-8">
                      {/* Step header */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          index === 0 ? "bg-[#991b1b] text-white" : "bg-[#8B4513]/10 text-[#8B4513]"
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#991b1b]">{step.label}</span>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2c2c2c]">{step.title}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-[#8B4513]/10 text-[#8B4513]">{step.timeline}</span>
                          {step.price && (
                            <span className="font-mono text-sm font-bold px-3 py-1.5 rounded-full bg-[#991b1b]/10 text-[#991b1b]">{step.price}</span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-serif text-sm md:text-base text-[#8B4513]/70 leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="bg-[#EFE0BD]/50 rounded-xl p-5 mb-4">
                        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#8B4513] mb-3">{language === 'en' ? 'Deliverables' : 'Sản Phẩm Bàn Giao'}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.deliverables.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                              <span className="font-serif text-sm text-[#2c2c2c]">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Per-step responsibilities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* We Handle */}
                        <div className="bg-[#991b1b]/5 rounded-xl p-5 border border-[#991b1b]/10">
                          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#991b1b] mb-3 flex items-center gap-1.5">
                            <Rocket className="w-3.5 h-3.5" />
                            {language === 'en' ? 'We Handle' : 'Chúng Tôi Lo Liệu'}
                          </h4>
                          <div className="space-y-2">
                            {step.weHandle.map((item, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                                <span className="font-serif text-xs text-[#2c2c2c]">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* You Provide */}
                        <div className="bg-[#8B4513]/5 rounded-xl p-5 border border-[#8B4513]/10">
                          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#8B4513] mb-3 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {language === 'en' ? 'You Provide' : 'Bạn Cung Cấp'}
                          </h4>
                          <div className="space-y-2">
                            {step.youProvide.map((item, i) => {
                              const isHeader = item.startsWith('🏠') || item.startsWith('🤖') || item.startsWith('👤');
                              return isHeader ? (
                                <div key={i} className={`font-serif text-xs font-bold text-[#8B4513] ${i > 0 ? 'mt-3 pt-3 border-t border-[#8B4513]/10' : ''}`}>
                                  {item}
                                </div>
                              ) : (
                                <div key={i} className="flex items-start gap-2 pl-1">
                                  <Check className="w-3.5 h-3.5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                                  <span className="font-serif text-xs text-[#2c2c2c]">{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Solutions For You button — only on steps 1 & 2 */}
                      {index < 2 && (
                        <div className="flex justify-center mb-4">
                          <button
                            type="button"
                            onClick={() => { setCurrentSlide(0); setSlidesOpen(true); }}
                            data-testid={`button-solutions-for-you-${index}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#991b1b] text-white rounded-xl font-serif font-semibold text-sm hover:bg-[#7a1515] transition-all duration-300 shadow-md"
                          >
                            <Presentation className="w-4 h-4" />
                            {language === 'en' ? 'Solutions For You' : 'Giải Pháp Cho Bạn'}
                          </button>
                        </div>
                      )}

                      {/* Not Included (only for steps that have it) */}
                      {step.notIncluded && step.notIncluded.length > 0 && (
                        <div className="bg-[#f5f0e8] rounded-xl p-5 border border-dashed border-[#8B4513]/20">
                          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#8B4513]/60 mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {language === 'en' ? 'Not Included (Available as Add-Ons)' : 'Không Bao Gồm (Có Thể Thêm)'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.notIncluded.map((item, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <XCircle className="w-3.5 h-3.5 text-[#8B4513]/40 flex-shrink-0 mt-0.5" />
                                <span className="font-serif text-xs text-[#8B4513]/60">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Responsibility Matrix — Full Scope Summary */}
          <section className="px-4 py-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#2c2c2c] text-center mb-2">{t.responsibilities.title}</h2>
              <p className="font-serif text-base text-[#8B4513]/60 text-center mb-10">{(t.responsibilities as any).subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* We Handle */}
                <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/5 backdrop-blur-md rounded-2xl border-2 border-[#991b1b]/30 p-6" data-testid="card-we-handle">
                  <h3 className="font-serif text-lg font-bold text-[#991b1b] mb-5 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    {t.responsibilities.weHandle.title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.responsibilities.weHandle.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-sm text-[#2c2c2c]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* You Provide */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#8B4513]/20 p-6" data-testid="card-you-provide">
                  <h3 className="font-serif text-lg font-bold text-[#8B4513] mb-5 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {t.responsibilities.youProvide.title}
                  </h3>
                  <div className="space-y-2.5">
                    {t.responsibilities.youProvide.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#8B4513] flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-sm text-[#2c2c2c]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included */}
                <div className="bg-[#f5f0e8]/80 backdrop-blur-md rounded-2xl border border-dashed border-[#8B4513]/20 p-6" data-testid="card-not-included">
                  <h3 className="font-serif text-lg font-bold text-[#8B4513]/60 mb-5 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {(t.responsibilities as any).notIncluded.title}
                  </h3>
                  <div className="space-y-2.5">
                    {((t.responsibilities as any).notIncluded.items as string[]).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-[#8B4513]/40 flex-shrink-0 mt-0.5" />
                        <span className="font-serif text-sm text-[#8B4513]/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Communication Section */}
          <section className="px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-[#2c2c2c] text-center mb-10">{t.communication.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.communication.channels.map((channel, index) => {
                  const CommIcon = commIcons[index];
                  return (
                    <div key={index} className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#8B4513]/20 p-6 flex items-start gap-4" data-testid={`comm-${index}`}>
                      <div className="w-10 h-10 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0">
                        <CommIcon className="w-5 h-5 text-[#991b1b]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#2c2c2c] mb-1">{channel.title}</h4>
                        <p className="font-serif text-sm text-[#8B4513]/70">{channel.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Multi-Step Discovery Form */}
          <section className="px-4 py-12" id="form">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-2" data-testid="text-form-title">{t.formSection.title}</h2>
                <p className="font-serif text-lg text-[#8B4513]/70">{t.formSection.subtitle}</p>
              </div>

              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 shadow-xl p-8 md:p-10">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#8B4513]">
                      {t.formSection.step} {formStep + 1} {t.formSection.of} {totalFormSteps}
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#991b1b]">{t.formSection.stepLabels[formStep]}</span>
                  </div>
                  <div className="w-full h-2 bg-[#8B4513]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#991b1b] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((formStep + 1) / totalFormSteps) * 100}%` }}
                    />
                  </div>
                  {/* Step indicators */}
                  <div className="flex justify-between mt-3">
                    {t.formSection.stepLabels.map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setFormStep(i)}
                        className={`font-serif text-xs transition-colors ${
                          i === formStep ? "text-[#991b1b] font-bold" : i < formStep ? "text-[#8B4513]/70" : "text-[#8B4513]/30"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleFormSubmit}>
                  {/* Step 1: Temple Info */}
                  {formStep === 0 && (
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                          <Building2 className="w-4 h-4 text-[#991b1b]" />
                          {t.form.templeName} <span className="text-[#991b1b]">*</span>
                        </label>
                        <input type="text" value={formData.templeName} onChange={(e) => setFormData({ ...formData, templeName: e.target.value })} className={inputClass} placeholder={t.form.templeNamePlaceholder} required data-testid="input-temple-name" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                          <MapPin className="w-4 h-4 text-[#991b1b]" />
                          {t.form.location}
                        </label>
                        <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} placeholder={t.form.locationPlaceholder} data-testid="input-location" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                          <Users className="w-4 h-4 text-[#991b1b]" />
                          {t.form.communitySize}
                        </label>
                        <select value={formData.communitySize} onChange={(e) => setFormData({ ...formData, communitySize: e.target.value })} className={inputClass} data-testid="select-community-size">
                          <option value="" disabled>{t.form.communitySizePlaceholder}</option>
                          {t.form.communitySizeOptions.map((option, i) => (<option key={i} value={option}>{option}</option>))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Details */}
                  {formStep === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                          <User className="w-4 h-4 text-[#991b1b]" />
                          {t.form.contactName} <span className="text-[#991b1b]">*</span>
                        </label>
                        <input type="text" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className={inputClass} placeholder={t.form.contactNamePlaceholder} required data-testid="input-contact-name" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                            <Mail className="w-4 h-4 text-[#991b1b]" />
                            {t.form.email} <span className="text-[#991b1b]">*</span>
                          </label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder={t.form.emailPlaceholder} required data-testid="input-email" />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                            <Phone className="w-4 h-4 text-[#991b1b]" />
                            {t.form.phone}
                          </label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder={t.form.phonePlaceholder} data-testid="input-phone" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Your Needs */}
                  {formStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-3">
                          <Globe className="w-4 h-4 text-[#991b1b]" />
                          {t.form.digitalPresence}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {t.form.digitalPresenceOptions.map((option, i) => (
                            <label key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all font-serif text-sm ${formData.digitalPresence.includes(option) ? "bg-[#991b1b]/10 border-[#991b1b]/40 text-[#991b1b]" : "bg-white border-[#8B4513]/20 text-[#2c2c2c] hover:border-[#8B4513]/40"}`}>
                              <input type="checkbox" checked={formData.digitalPresence.includes(option)} onChange={() => handleCheckbox("digitalPresence", option)} className="sr-only" />
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${formData.digitalPresence.includes(option) ? "bg-[#991b1b] border-[#991b1b]" : "border-[#8B4513]/30"}`}>
                                {formData.digitalPresence.includes(option) && (<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                              </div>
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-3">
                          <Wrench className="w-4 h-4 text-[#991b1b]" />
                          {t.form.servicesNeeded}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {t.form.servicesNeededOptions.map((option, i) => (
                            <label key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all font-serif text-sm ${formData.servicesNeeded.includes(option) ? "bg-[#991b1b]/10 border-[#991b1b]/40 text-[#991b1b]" : "bg-white border-[#8B4513]/20 text-[#2c2c2c] hover:border-[#8B4513]/40"}`}>
                              <input type="checkbox" checked={formData.servicesNeeded.includes(option)} onChange={() => handleCheckbox("servicesNeeded", option)} className="sr-only" />
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${formData.servicesNeeded.includes(option) ? "bg-[#991b1b] border-[#991b1b]" : "border-[#8B4513]/30"}`}>
                                {formData.servicesNeeded.includes(option) && (<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                              </div>
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {formStep === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                          <FileText className="w-4 h-4 text-[#991b1b]" />
                          {t.form.notes}
                        </label>
                        <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={4} className={`${inputClass} resize-none`} placeholder={t.form.notesPlaceholder} data-testid="textarea-notes" />
                      </div>

                      {/* Review summary */}
                      <div className="bg-[#EFE0BD]/50 rounded-xl p-5 space-y-3">
                        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#8B4513] mb-3">Summary</h4>
                        {formData.templeName && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.templeName}:</span><span className="text-[#2c2c2c] font-medium">{formData.templeName}</span></div>}
                        {formData.contactName && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.contactName}:</span><span className="text-[#2c2c2c] font-medium">{formData.contactName}</span></div>}
                        {formData.email && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.email}:</span><span className="text-[#2c2c2c] font-medium">{formData.email}</span></div>}
                        {formData.phone && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.phone}:</span><span className="text-[#2c2c2c] font-medium">{formData.phone}</span></div>}
                        {formData.location && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.location}:</span><span className="text-[#2c2c2c] font-medium">{formData.location}</span></div>}
                        {formData.communitySize && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.communitySize}:</span><span className="text-[#2c2c2c] font-medium">{formData.communitySize}</span></div>}
                        {formData.servicesNeeded.length > 0 && <div className="flex gap-2 font-serif text-sm"><span className="text-[#8B4513]/50 w-28 flex-shrink-0">{t.form.servicesNeeded}:</span><span className="text-[#2c2c2c] font-medium">{formData.servicesNeeded.join(", ")}</span></div>}
                      </div>

                      {import.meta.env.VITE_TURNSTILE_SITE_KEY && (
                        <Turnstile
                          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                          onSuccess={setTurnstileToken}
                          onExpire={() => setTurnstileToken(null)}
                        />
                      )}

                      {submitted ? (
                        <div className="p-4 bg-green-100 border border-green-200 rounded-xl text-center font-serif text-green-800">
                          ✓ Request sent! We'll contact you within 24 hours.
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.templeName || !formData.contactName || !formData.email || (!!import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken)}
                          className="w-full px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="button-submit-process"
                        >
                          {isSubmitting ? "Sending..." : t.form.submit}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => setFormStep((s) => Math.max(0, s - 1))}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-semibold text-sm transition-all ${
                        formStep === 0 ? "opacity-0 pointer-events-none" : "bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t.formSection.previous}
                    </button>
                    {formStep < totalFormSteps - 1 && (
                      <button
                        type="button"
                        onClick={() => setFormStep((s) => Math.min(totalFormSteps - 1, s + 1))}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#991b1b] text-white rounded-xl font-serif font-semibold text-sm hover:bg-[#7a1515] transition-all"
                      >
                        {t.formSection.next}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </TracingBeam>

        {/* Slides Presentation Modal */}
        {slidesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="modal-slides">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSlidesOpen(false)}
            />

            {/* Slide panel */}
            <div className="relative w-full max-w-3xl bg-[#FAF6EE] rounded-2xl shadow-2xl border border-[#8B4513]/20 overflow-hidden flex flex-col" style={{ maxHeight: "90vh" }}>

              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#991b1b] text-white flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Presentation className="w-4 h-4 opacity-80" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-80">{isVi ? 'Giải Pháp Cho Bạn' : 'Solutions For You'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold opacity-70">{currentSlide + 1} / {slides.length}</span>
                  <button
                    onClick={() => setSlidesOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    data-testid="button-close-slides"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-[#8B4513]/10 flex-shrink-0">
                <div
                  className="h-full bg-[#991b1b] transition-all duration-500 ease-out"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>

              {/* Slide content */}
              <div className="flex-1 overflow-y-auto px-8 py-8">
                {(() => {
                  const slide = slides[currentSlide];
                  return (
                    <div className="space-y-6">
                      {/* Slide label + title */}
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#991b1b]">Slide {slide.label}</span>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2c2c2c] mt-1 leading-tight">{slide.title}</h2>
                        {slide.subtitle && (
                          <p className="font-serif text-base text-[#8B4513]/70 mt-2 italic">{slide.subtitle}</p>
                        )}
                        {'tagline' in slide && slide.tagline && (
                          <p className="font-serif text-sm font-semibold text-[#991b1b] mt-3">{slide.tagline}</p>
                        )}
                      </div>

                      {/* Slide body */}
                      {slide.content.length > 0 && (
                        <div className="space-y-5">
                          {slide.content.map((section, si) => (
                            <div key={si} className="bg-white/70 rounded-xl p-5 border border-[#8B4513]/10">
                              {'heading' in section && section.heading && (
                                <h3 className="font-serif text-sm font-bold text-[#991b1b] mb-3 uppercase tracking-wide">{section.heading}</h3>
                              )}
                              <ul className="space-y-2">
                                {section.items.map((item, ii) => (
                                  <li key={ii} className="flex items-start gap-2.5">
                                    <Check className="w-3.5 h-3.5 text-[#991b1b] flex-shrink-0 mt-0.5" />
                                    <span className="font-serif text-sm text-[#2c2c2c] leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#EFE0BD]/60 border-t border-[#8B4513]/15 flex-shrink-0">
                <button
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-serif text-sm font-semibold text-[#8B4513] hover:bg-[#8B4513]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  data-testid="button-slide-prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {isVi ? 'Trước' : 'Previous'}
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentSlide ? "w-5 h-2 bg-[#991b1b]" : "w-2 h-2 bg-[#8B4513]/30 hover:bg-[#8B4513]/60"
                      }`}
                      data-testid={`button-slide-dot-${i}`}
                    />
                  ))}
                </div>

                {currentSlide < slides.length - 1 ? (
                  <button
                    onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-serif text-sm font-semibold bg-[#991b1b] text-white hover:bg-[#7a1515] transition-all"
                    data-testid="button-slide-next"
                  >
                    {isVi ? 'Tiếp' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSlidesOpen(false)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-serif text-sm font-semibold bg-[#991b1b] text-white hover:bg-[#7a1515] transition-all"
                    data-testid="button-slide-done"
                  >
                    {isVi ? 'Xong' : 'Done'}
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">{t.footer.brand}</span>
              <div className="flex gap-6">
                <Link href="/" className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">{t.footer.platform}</Link>
                <Link href="/" className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">{t.footer.services}</Link>
                <Link href="/discovery" className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">{t.footer.discovery}</Link>
                <Link href="/docs/overview" className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">{t.footer.docs}</Link>
              </div>
              <div className="font-serif text-[#8B4513]/50">{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
