import { Link } from "wouter";
import sutraIcon from "@assets/Wordless Sutra Icon - Sumi-e Style_1762155698128.png";
import bellIcon from "@assets/Bell_no_bg (1)_1762155616660.png";

export default function Terms() {
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
              <img src={sutraIcon} alt="Sutra" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#991b1b] mb-6" data-testid="text-terms-title">
              Terms of Service
            </h1>
            <p className="font-serif text-lg text-[#8B4513]/80 mb-4">
              Effective Date: November 3, 2025
            </p>
            <p className="font-serif text-lg text-[#8B4513]/80 max-w-3xl mx-auto">
              These Terms of Service govern your use of Bodhi Technology Lab's platform and services. By accessing our platform, you agree to these terms.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Acceptance */}
            <div data-testid="section-acceptance">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">1. Acceptance of Terms</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  By creating an account or using any Bodhi Technology Lab service, you agree to be bound by these Terms of Service, our Privacy Policy, and any additional guidelines we provide. If you do not agree, please discontinue use immediately.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  For white-label temple platforms, additional terms may apply as specified in your service agreement.
                </p>
              </div>
            </div>

            {/* Eligibility */}
            <div data-testid="section-eligibility">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">2. Eligibility</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  You must be at least 13 years old to use our services. If you are under 18, you must have parental or guardian consent.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  By registering, you represent that all information provided is accurate and that you have the authority to bind your organization (if registering on behalf of a temple, monastery, or sangha).
                </p>
              </div>
            </div>

            {/* Account Responsibilities */}
            <div data-testid="section-accounts">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">3. Account Responsibilities</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately of any unauthorized access.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Accurate Information:</strong> Provide truthful and complete information when creating your account and keep it updated.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>One Account Per User:</strong> Do not create multiple accounts or share accounts with others.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Your Actions:</strong> You are responsible for all activity that occurs under your account.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Acceptable Use */}
            <div data-testid="section-acceptable-use">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">4. Acceptable Use Policy</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Our platform is designed to serve the Dharma and reduce suffering. You agree not to:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Violate any laws, regulations, or rights of others</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Post harmful, hateful, violent, or sexually explicit content</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Harass, threaten, or impersonate others</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Distribute spam, malware, or viruses</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Scrape, crawl, or reverse-engineer our platform</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Attempt to gain unauthorized access to systems or data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Use the platform for commercial purposes unrelated to Buddhist practice or temple operations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Misrepresent teachings or impersonate spiritual teachers without authorization</span>
                  </li>
                </ul>
                <p className="font-serif text-[#2c2c2c] mt-4">
                  Violation of this policy may result in account suspension or termination.
                </p>
              </div>
            </div>

            {/* AI Agent Guidelines */}
            <div data-testid="section-ai">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">5. AI Agent Usage Guidelines</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  Our Buddhist AI agents are tools for guidance, not substitutes for qualified teachers or professional advice:
                </p>
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>AI responses are generated by algorithms and may contain errors or misinterpretations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Do not rely solely on AI agents for medical, legal, or mental health advice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Verify important teachings with qualified human teachers</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Respect rate limits and avoid abusive or excessive querying</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span>Do not use AI agents to generate harmful, fraudulent, or misleading content</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div data-testid="section-ip">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">6. Intellectual Property</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Our Content:</strong> All platform code, design, branding, AI models, and documentation are owned by Bodhi Technology Lab or our licensors. You may not copy, modify, or distribute our proprietary materials without permission.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Your Content:</strong> You retain ownership of content you upload (documents, media, AI training data). By uploading, you grant us a license to process, store, and display your content as necessary to provide our services.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Dharma Teachings:</strong> Traditional Buddhist texts, sutras, and teachings are considered part of the shared heritage of humanity. We respect the lineage holders and attributions of all teachings presented on our platform.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  <strong>Open Source:</strong> Some components of our platform may be released under open-source licenses. Those components are governed by their respective license terms.
                </p>
              </div>
            </div>

            {/* Payment & Donations */}
            <div data-testid="section-payment">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">7. Payment Terms & Donations</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Subscription Plans:</strong> Pricing is listed on our website. Fees are billed monthly or annually in advance. We reserve the right to change pricing with 30 days' notice.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Donation Processing:</strong> For temple platforms, we facilitate dana (donations) on your behalf. Processing fees (Stripe, PayPal) are clearly disclosed. Donations are non-refundable unless required by law.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Refunds:</strong> Subscription fees are generally non-refundable. We may provide pro-rated refunds on a case-by-case basis for cancellations within 14 days of initial purchase.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  <strong>Tax Receipts:</strong> For charitable donations to qualifying temples, we help generate tax receipts as required by local law. Consult your tax advisor for deductibility.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div data-testid="section-termination">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">8. Termination & Suspension</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>By You:</strong> You may cancel your account at any time through your account settings or by contacting support. Upon cancellation, you will lose access to paid features at the end of your billing period.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>By Us:</strong> We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or pose a security risk. We will provide notice when possible, except in cases of severe violations.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  <strong>Data Retention:</strong> Upon termination, we will retain your data for 30 days to allow recovery, then permanently delete it (except as required by law or our Privacy Policy).
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div data-testid="section-disclaimers">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">9. Disclaimers & Limitations</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>AS-IS Service:</strong> Our platform is provided "as-is" without warranties of any kind, express or implied. We do not guarantee uninterrupted, error-free, or secure operation.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>No Professional Advice:</strong> AI agents and platform content are for informational and spiritual guidance purposes only—not legal, medical, financial, or therapeutic advice.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, Bodhi Technology Lab is not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the fees you paid in the past 12 months.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  <strong>Third-Party Services:</strong> We integrate with third-party services (payment processors, AI providers). We are not responsible for their actions, outages, or privacy practices.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div data-testid="section-indemnification">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">10. Indemnification</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c]">
                  You agree to indemnify and hold harmless Bodhi Technology Lab, its affiliates, and partners from any claims, damages, or expenses (including legal fees) arising from your use of the platform, violation of these Terms, or infringement of third-party rights.
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div data-testid="section-disputes">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">11. Dispute Resolution</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Informal Resolution:</strong> Before filing a legal claim, please contact us at <a href="mailto:privacy@boddhilab.io" className="text-[#991b1b] underline font-semibold">privacy@boddhilab.io</a> to seek an informal resolution. We commit to good-faith dialogue.
                </p>
                <p className="font-serif text-[#2c2c2c] mb-4">
                  <strong>Arbitration:</strong> Any disputes not resolved informally will be settled through binding arbitration under the rules of a recognized arbitration body, rather than in court.
                </p>
                <p className="font-serif text-[#2c2c2c]">
                  <strong>Governing Law:</strong> These Terms are governed by the laws of the jurisdiction where Bodhi Technology Lab is registered, without regard to conflict of law principles.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div data-testid="section-changes">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">12. Changes to Terms</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <p className="font-serif text-[#2c2c2c]">
                  We may update these Terms from time to time. Material changes will be announced via email and/or a platform notice. Continued use after changes indicates acceptance. If you disagree with changes, you may terminate your account.
                </p>
              </div>
            </div>

            {/* Severability */}
            <div data-testid="section-severability">
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-6">13. Miscellaneous</h2>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 p-6">
                <ul className="space-y-3 font-serif text-[#2c2c2c]">
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Entire Agreement:</strong> These Terms, along with our Privacy Policy, constitute the entire agreement between you and Bodhi Technology Lab.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Waiver:</strong> Failure to enforce any right or provision does not constitute a waiver of future enforcement.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#991b1b] font-bold">•</span>
                    <span><strong>Assignment:</strong> You may not transfer your rights under these Terms without our consent. We may assign our rights to affiliates or successors.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#991b1b]/10 to-[#8B4513]/10 rounded-2xl border-2 border-[#991b1b]/30 p-8 text-center" data-testid="section-contact">
              <img src={bellIcon} alt="Bell" className="w-12 h-12 object-contain mx-auto mb-4" />
              <h2 className="font-serif text-3xl font-bold text-[#991b1b] mb-4">Questions About These Terms?</h2>
              <p className="font-serif text-[#2c2c2c] mb-6">
                If you have questions or need clarification about these Terms of Service, we're here to help.
              </p>
              <div className="space-y-2 font-serif text-[#2c2c2c]">
                <p><strong>Email:</strong> <a href="mailto:privacy@boddhilab.io" className="text-[#991b1b] underline font-semibold" data-testid="link-email-legal">privacy@boddhilab.io</a></p>
                <p><strong>Bodhi Technology Lab</strong></p>
                <p className="text-sm text-[#8B4513]/70">Building technology for awakening, with integrity and transparency</p>
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
