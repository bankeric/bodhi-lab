import { Link } from "wouter";
import lotusIcon from "@assets/44_1762155223620.png";
import dharmaWheelIcon from "@assets/33_1762155223619.png";
import candleIcon from "@assets/66_1762155223619.png";
import bellIcon from "@assets/55_1762155223618.jpg";
import buddhaIcon from "@assets/2_1762155223620.png";

export default function About() {
  return (
    <div className="min-h-screen bg-[#EFE0BD] text-[#8B4513]">
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
        <header className="sticky top-0 backdrop-blur-md bg-[#EFE0BD]/80 border-b border-[#8B4513]/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="flex items-center" data-testid="link-brand">
                <span className="font-serif font-bold text-[#991b1b] text-lg">Bodhi Technology Lab</span>
              </a>
            </Link>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src={lotusIcon} alt="Lotus" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#991b1b] mb-6" data-testid="text-about-title">
              About Bodhi Technology Lab
            </h1>
            <p className="font-serif text-xl text-[#8B4513]/80 leading-relaxed max-w-2xl mx-auto">
              Where ancient wisdom meets modern technology—building digital tools that serve the Dharma and support Buddhist communities worldwide.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white/50 backdrop-blur-md rounded-3xl border-2 border-[#8B4513]/20 p-8 md:p-12 mb-12" data-testid="section-mission">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={dharmaWheelIcon} alt="Dharma Wheel" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#991b1b]">Our Mission</h2>
            </div>
            <p className="font-serif text-lg text-[#2c2c2c] leading-relaxed mb-6">
              We exist to preserve and propagate the Buddha-Dharma in the digital age. As temples and monasteries navigate an increasingly connected world, we provide the technological foundation that allows them to focus on what matters most: guiding practitioners on the path to liberation.
            </p>
            <p className="font-serif text-lg text-[#2c2c2c] leading-relaxed">
              Our platform empowers Buddhist organizations to maintain their sovereignty, authenticity, and spiritual integrity while leveraging modern tools for community building, education, and sustainable support.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white/50 backdrop-blur-md rounded-3xl border-2 border-[#8B4513]/20 p-8 md:p-12 mb-12" data-testid="section-values">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={candleIcon} alt="Candle" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#991b1b]">Our Values</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">🙏 Respect for Tradition</h3>
                <p className="font-serif text-[#8B4513]/80">
                  We honor the 2,500-year lineage of Buddhist wisdom. Our technology serves the Dharma—never the other way around. Every feature is designed with deep respect for contemplative practice and authentic transmission.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">🌸 Temple Sovereignty</h3>
                <p className="font-serif text-[#8B4513]/80">
                  Monasteries should own their data, control their branding, and maintain independence from external platforms. We provide white-label solutions that put temples in full control of their digital presence.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">💎 Transparency & Ethics</h3>
                <p className="font-serif text-[#8B4513]/80">
                  No hidden fees. No data exploitation. No surveillance capitalism. We operate with the same ethical principles that guide Buddhist communities—transparency, honesty, and genuine care for practitioner welfare.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">🪷 Accessible Technology</h3>
                <p className="font-serif text-[#8B4513]/80">
                  Dharma should be available to all beings, regardless of technical expertise or financial means. We build intuitive tools with pricing tiers that accommodate small meditation groups and large monastery networks alike.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="bg-white/50 backdrop-blur-md rounded-3xl border-2 border-[#8B4513]/20 p-8 md:p-12 mb-12" data-testid="section-what-we-do">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={bellIcon} alt="Bell" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#991b1b]">What We Build</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#EFE0BD]/50 to-[#E5D5B7]/30 rounded-2xl p-6 border border-[#8B4513]/20">
                <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-3">Community Platforms</h3>
                <p className="font-serif text-sm text-[#8B4513]/80">
                  White-label social networks for Buddhist temples with Right Speech moderation, study groups, and dharma discussion forums.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#EFE0BD]/50 to-[#E5D5B7]/30 rounded-2xl p-6 border border-[#8B4513]/20">
                <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-3">AI Buddhist Agents</h3>
                <p className="font-serif text-sm text-[#8B4513]/80">
                  Custom-trained AI assistants that can answer questions about specific lineages, traditions, and temple teachings in multiple languages.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#EFE0BD]/50 to-[#E5D5B7]/30 rounded-2xl p-6 border border-[#8B4513]/20">
                <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-3">Donation Infrastructure</h3>
                <p className="font-serif text-sm text-[#8B4513]/80">
                  Spiritual giving interfaces with merit dedication, QR codes, recurring dāna, and transparent low-fee payment processing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#EFE0BD]/50 to-[#E5D5B7]/30 rounded-2xl p-6 border border-[#8B4513]/20">
                <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-3">Digital Libraries</h3>
                <p className="font-serif text-sm text-[#8B4513]/80">
                  Searchable repositories for sutras, dharma talks, chant sheets, and teachings with version control and offline access.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-3xl border-2 border-[#991b1b]/30 p-8 md:p-12 mb-12" data-testid="section-team">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={buddhaIcon} alt="Buddha" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#2c2c2c]">Our Team</h2>
            </div>
            <p className="font-serif text-lg text-[#8B4513]/80 leading-relaxed mb-6">
              We are a distributed team of engineers, designers, and Buddhist practitioners who combine technical expertise with genuine understanding of contemplative traditions. Many of us maintain personal meditation practices and have spent time in retreat or monastery settings.
            </p>
            <p className="font-serif text-lg text-[#8B4513]/80 leading-relaxed">
              We work in contemplative mode—intentionally, mindfully, and with deep care for the communities we serve. Our development process honors both Buddhist principles and modern software best practices.
            </p>
          </div>

          {/* Global Reach Section */}
          <div className="bg-white/50 backdrop-blur-md rounded-3xl border-2 border-[#8B4513]/20 p-8 md:p-12 mb-12" data-testid="section-reach">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={dharmaWheelIcon} alt="Dharma Wheel" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#991b1b]">Global Reach, Local Care</h2>
            </div>
            <p className="font-serif text-lg text-[#2c2c2c] leading-relaxed mb-6">
              While we serve Buddhist communities worldwide—from Vietnamese Pure Land temples to Tibetan meditation centers to Japanese Zen monasteries—we understand that each tradition has unique needs, customs, and cultural contexts.
            </p>
            <p className="font-serif text-lg text-[#2c2c2c] leading-relaxed">
              Our platform adapts to your lineage's specific requirements while maintaining the universal values of the Dharma. We support multiple languages, cultural customization, and tradition-specific features.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[#991b1b] to-[#7a1515] rounded-3xl p-8 md:p-12 text-center" data-testid="section-contact">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">Join Us in Serving the Dharma</h2>
            <p className="font-serif text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're a temple administrator, monastery abbot, or meditation center coordinator, we'd love to learn about your community's needs and explore how we can support your mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/platform">
                <a className="px-8 py-4 bg-white text-[#991b1b] font-serif font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" data-testid="button-explore-platform">
                  Explore Platform Features
                </a>
              </Link>
              <Link href="/career">
                <a className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-serif font-bold text-lg rounded-full hover:bg-white/20 transition-all duration-300" data-testid="button-view-careers">
                  View Career Opportunities
                </a>
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">Bodhi Technology Lab</span>
              <div className="flex gap-6">
                <Link href="/about">
                  <a className="font-serif text-[#991b1b] underline transition-colors" data-testid="link-footer-about">
                    About
                  </a>
                </Link>
                <Link href="/career">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors" data-testid="link-footer-career">
                    Career
                  </a>
                </Link>
                <Link href="/terms">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors" data-testid="link-footer-terms">
                    Terms
                  </a>
                </Link>
                <Link href="/privacy">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors" data-testid="link-footer-privacy">
                    Privacy
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
