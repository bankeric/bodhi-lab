import { Link } from "wouter";
import buddhaIcon from "@assets/2_1762155709385.png";
import bellIcon from "@assets/Bell_no_bg (1)_1762155616660.png";

export default function Privacy() {
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
        {/* Header */}
        <header className="sticky top-0 backdrop-blur-md bg-[#EFE0BD]/80 border-b border-[#8B4513]/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="flex items-center" data-testid="link-brand">
                <span className="font-serif font-bold text-[#991b1b] text-lg">Bodhi Technology Lab</span>
              </a>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors" data-testid="link-home">
                  Home
                </a>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={buddhaIcon} alt="Buddha" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#991b1b] mb-6" data-testid="text-privacy-title">
              Privacy Policy
            </h1>
            <p className="font-serif text-lg text-[#8B4513]/80 mb-4">
              Effective Date: November 3, 2025
            </p>
            <p className="font-serif text-lg text-[#8B4513]/80 max-w-3xl mx-auto">
              At Bodhi Technology Lab, we believe privacy is a fundamental right. This policy explains how we collect, use, and protect your data with the same care we bring to our spiritual practice.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Our Commitment */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl border-2 border-[#991b1b]/30 p-8" data-testid="section-commitment">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Our Privacy Commitment</h2>
              <div className="space-y-4 font-serif text-[#2c2c2c]">
                <p className="text-lg">
                  We build technology that serves the Dharma, not surveillance capitalism. Your data is yours—not a product to be mined, sold, or exploited.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No tracking pixels or behavioral profiling</li>
                  <li>No data sales to third parties</li>
                  <li>No dark patterns or manipulative design</li>
                  <li>Transparent data practices aligned with Right Action</li>
                </ul>
              </div>
            </div>

            {/* Information We Collect */}
            <div data-testid="section-collection">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Information We Collect</h2>
              
              <div className="space-y-6">
                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">Account Information</h3>
                  <p className="font-serif text-[#8B4513]/80">
                    When you create an account, we collect your email address, name, and password (encrypted). For temple administrators, we may collect organizational details to provision your white-label platform.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">Usage Data</h3>
                  <p className="font-serif text-[#8B4513]/80">
                    We collect minimal analytics to improve our services: pages visited, features used, and error logs. We use privacy-respecting tools and never track individual behavior across sites.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">AI Interactions</h3>
                  <p className="font-serif text-[#8B4513]/80">
                    Conversations with our Buddhist AI agents are stored to improve responses and maintain context. You can delete your conversation history at any time. We anonymize data used for model training.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">Donation Information</h3>
                  <p className="font-serif text-[#8B4513]/80">
                    Payment processing is handled by trusted partners (Stripe, PayPal). We store donation records for tax purposes and merit dedication tracking, but never store full payment card details.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2c2c2c] mb-3">Communications</h3>
                  <p className="font-serif text-[#8B4513]/80">
                    When you contact us via email or support forms, we store your message and our responses to provide assistance and improve our services.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div data-testid="section-usage">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">How We Use Your Information</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Provide and maintain our platform services</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Improve AI agent responses and knowledge bases</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Process donations and generate tax receipts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Send essential service updates and security notifications</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Respond to support requests and technical issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Comply with legal obligations and prevent fraud</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Sharing */}
            <div data-testid="section-sharing">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Data Sharing & Third Parties</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  We do not sell your data. We share information only in these limited circumstances:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Service Providers:</strong> Infrastructure partners (cloud hosting, databases) bound by strict confidentiality agreements</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Payment Processors:</strong> Stripe, PayPal for donation processing—they have their own privacy policies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>AI Model Providers:</strong> OpenAI, Anthropic for agent responses—we anonymize data when possible</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Temple Partners:</strong> If you use a temple's white-label platform, they may access data within their instance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div data-testid="section-security">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Data Security</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  We employ industry-standard security measures to protect your data:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Encryption in transit (TLS/SSL) and at rest (AES-256)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Multi-factor authentication for administrative access</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Access controls and audit logs for sensitive operations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Regular backups with encrypted storage</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div data-testid="section-rights">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Your Privacy Rights</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  You have full control over your data. You may:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Access:</strong> Request a copy of all data we hold about you</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Correct:</strong> Update or correct inaccurate information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Delete:</strong> Request deletion of your account and associated data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Export:</strong> Download your data in machine-readable format</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Opt-out:</strong> Unsubscribe from marketing emails (service emails remain)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Object:</strong> Challenge data processing based on legitimate interests</span>
                  </li>
                </ul>
                <p className="font-serif text-[#2c2c2c] mt-6">
                  To exercise these rights, contact us at <a href="mailto:privacy@boddhilab.io" className="text-[#991b1b] underline font-semibold" data-testid="link-email-privacy">privacy@boddhilab.io</a>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div data-testid="section-cookies">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Cookies & Tracking</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  We use minimal, privacy-respecting cookies:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Essential Cookies:</strong> Authentication, session management, security—required for the platform to function</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Analytics:</strong> Privacy-focused analytics (Plausible or similar)—no personal data, no cross-site tracking</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Preferences:</strong> Remember your language, theme, and display settings</span>
                  </li>
                </ul>
                <p className="font-serif text-[#2c2c2c] mt-4">
                  We do not use advertising cookies or third-party tracking scripts.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div data-testid="section-children">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Children's Privacy</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c]">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us at <a href="mailto:privacy@boddhilab.io" className="text-[#991b1b] underline font-semibold">privacy@boddhilab.io</a> and we will promptly delete it.
                </p>
              </div>
            </div>

            {/* International Users */}
            <div data-testid="section-international">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">International Data Transfers</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c]">
                  Bodhi Technology Lab operates globally. Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards (standard contractual clauses, adequacy decisions) comply with GDPR and other privacy regulations. All transfers maintain the same level of protection described in this policy.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div data-testid="section-changes">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">Changes to This Policy</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c]">
                  We may update this Privacy Policy from time to time. Material changes will be notified via email and/or a prominent notice on our platform. Continued use after changes constitutes acceptance. The effective date is always listed at the top of this page.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-2xl border-2 border-[#991b1b]/30 p-8 text-center" data-testid="section-contact">
              <img src={bellIcon} alt="Bell" className="w-12 h-12 object-contain mx-auto mb-4" />
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-4">Questions About Privacy?</h2>
              <p className="font-serif text-[#2c2c2c] mb-6">
                We're committed to transparency and protecting your rights. If you have questions, concerns, or requests regarding your privacy, please reach out.
              </p>
              <div className="space-y-2 font-serif text-[#2c2c2c]">
                <p><strong>Email:</strong> <a href="mailto:privacy@boddhilab.io" className="text-[#991b1b] underline font-semibold">privacy@boddhilab.io</a></p>
                <p><strong>Bodhi Technology Lab</strong></p>
                <p className="text-sm text-[#8B4513]/70">Building technology for awakening, with respect for your sovereignty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-[#8B4513]/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-serif text-[#8B4513]/60 mb-4">
              © 2025 Bodhi Technology Lab. Building technology for awakening.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/career">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] transition-colors" data-testid="link-footer-career">
                  Career
                </a>
              </Link>
              <Link href="/privacy">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] transition-colors" data-testid="link-footer-privacy">
                  Privacy
                </a>
              </Link>
              <Link href="/terms">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] transition-colors" data-testid="link-footer-terms">
                  Terms
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
