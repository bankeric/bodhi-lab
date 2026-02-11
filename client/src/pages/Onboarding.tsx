import { useState } from "react";
import { Link } from "wouter";
import { Briefcase, Building2, User, Mail, Phone, MapPin, Users, Globe, Wrench, FileText } from "lucide-react";
import { TracingBeam } from "@/components/TracingBeam";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { onboardingTranslations } from "@/translations/onboarding";

export default function Onboarding() {
  const { language } = useLanguage();
  const t = onboardingTranslations[language];

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
                  <span className="font-serif font-bold text-[#991b1b] text-lg">{t.header.brand}</span>
                </a>
              </Link>

              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 -translate-y-2">
                <div className="bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] backdrop-blur-xl border border-[#8B4513]/30 rounded-3xl shadow-2xl overflow-hidden w-[250px]"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(139, 69, 19, 0.1), 0 20px 60px rgba(139, 69, 19, 0.15)' }}>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-[#991b1b] mb-5 text-xs uppercase tracking-wider flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                        <Briefcase className="w-3.5 h-3.5 text-[#991b1b]" />
                      </div>
                      {t.header.company}
                    </h3>
                    <div className="space-y-3">
                      <Link href="/career">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.companyDropdown.career}
                        </a>
                      </Link>
                      <Link href="/terms">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.companyDropdown.terms}
                        </a>
                      </Link>
                      <Link href="/privacy">
                        <a className="group/item flex items-center gap-2 font-serif text-[#8B4513]/80 hover:text-[#991b1b] transition-all text-sm py-1.5 px-2 rounded-lg hover:bg-[#991b1b]/10">
                          <div className="w-1 h-1 rounded-full bg-[#8B4513]/40 group-hover/item:bg-[#991b1b]"></div>
                          {t.header.companyDropdown.privacy}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/platform">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                  {t.header.nav.platform}
                </a>
              </Link>
              <a href="/#capabilities" className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                {t.header.nav.services}
              </a>
              <a href="/#services" className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                {t.header.nav.pricing}
              </a>
              <Link href="/discovery">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                  {t.header.nav.discovery}
                </a>
              </Link>
              <Link href="/docs/overview">
                <a className="font-serif text-[#8B4513]/70 hover:text-[#991b1b] px-4 py-2 rounded-full hover:bg-[#8B4513]/5 transition-colors">
                  {t.header.nav.docs}
                </a>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <TracingBeam className="pt-24">
          <section className="min-h-screen px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-[#991b1b]" data-testid="text-onboarding-title">
                  {t.hero.title}
                </h1>
                <p className="font-serif text-lg text-[#8B4513]/70 max-w-2xl mx-auto">
                  {t.hero.subtitle}
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-md rounded-2xl border-2 border-[#8B4513]/20 shadow-xl p-8 md:p-10">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* Temple Name */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      <Building2 className="w-4 h-4 text-[#991b1b]" />
                      {t.form.templeName} <span className="text-[#991b1b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.templeName}
                      onChange={(e) => setFormData({ ...formData, templeName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      placeholder={t.form.templeNamePlaceholder}
                      required
                      data-testid="input-temple-name"
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      <User className="w-4 h-4 text-[#991b1b]" />
                      {t.form.contactName} <span className="text-[#991b1b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      placeholder={t.form.contactNamePlaceholder}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>

                  {/* Email & Phone - side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                        <Mail className="w-4 h-4 text-[#991b1b]" />
                        {t.form.email} <span className="text-[#991b1b]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                        placeholder={t.form.emailPlaceholder}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                        <Phone className="w-4 h-4 text-[#991b1b]" />
                        {t.form.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                        placeholder={t.form.phonePlaceholder}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      <MapPin className="w-4 h-4 text-[#991b1b]" />
                      {t.form.location}
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      placeholder={t.form.locationPlaceholder}
                      data-testid="input-location"
                    />
                  </div>

                  {/* Community Size */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      <Users className="w-4 h-4 text-[#991b1b]" />
                      {t.form.communitySize}
                    </label>
                    <select
                      value={formData.communitySize}
                      onChange={(e) => setFormData({ ...formData, communitySize: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                      data-testid="select-community-size"
                    >
                      <option value="" disabled>{t.form.communitySizePlaceholder}</option>
                      {t.form.communitySizeOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Digital Presence - Checkboxes */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-3">
                      <Globe className="w-4 h-4 text-[#991b1b]" />
                      {t.form.digitalPresence}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {t.form.digitalPresenceOptions.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all font-serif text-sm ${
                            formData.digitalPresence.includes(option)
                              ? "bg-[#991b1b]/10 border-[#991b1b]/40 text-[#991b1b]"
                              : "bg-white border-[#8B4513]/20 text-[#2c2c2c] hover:border-[#8B4513]/40"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.digitalPresence.includes(option)}
                            onChange={() => handleCheckbox("digitalPresence", option)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            formData.digitalPresence.includes(option)
                              ? "bg-[#991b1b] border-[#991b1b]"
                              : "border-[#8B4513]/30"
                          }`}>
                            {formData.digitalPresence.includes(option) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Services Needed - Checkboxes */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-3">
                      <Wrench className="w-4 h-4 text-[#991b1b]" />
                      {t.form.servicesNeeded}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {t.form.servicesNeededOptions.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all font-serif text-sm ${
                            formData.servicesNeeded.includes(option)
                              ? "bg-[#991b1b]/10 border-[#991b1b]/40 text-[#991b1b]"
                              : "bg-white border-[#8B4513]/20 text-[#2c2c2c] hover:border-[#8B4513]/40"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.servicesNeeded.includes(option)}
                            onChange={() => handleCheckbox("servicesNeeded", option)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            formData.servicesNeeded.includes(option)
                              ? "bg-[#991b1b] border-[#991b1b]"
                              : "border-[#8B4513]/30"
                          }`}>
                            {formData.servicesNeeded.includes(option) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-medium text-[#2c2c2c] mb-1.5">
                      <FileText className="w-4 h-4 text-[#991b1b]" />
                      {t.form.notes}
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all resize-none"
                      placeholder={t.form.notesPlaceholder}
                      data-testid="textarea-notes"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md"
                      data-testid="button-submit-onboarding"
                    >
                      {t.form.submit}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </TracingBeam>

        <footer className="border-t border-[#8B4513]/20 py-8 bg-[#EFE0BD]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-serif font-bold text-[#991b1b]">{t.footer.brand}</span>
              <div className="flex gap-6">
                <Link href="/">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    {t.footer.platform}
                  </a>
                </Link>
                <Link href="/">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    {t.footer.services}
                  </a>
                </Link>
                <Link href="/discovery">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    {t.footer.discovery}
                  </a>
                </Link>
                <Link href="/docs/overview">
                  <a className="font-serif text-[#8B4513]/50 hover:text-[#991b1b] transition-colors">
                    {t.footer.docs}
                  </a>
                </Link>
              </div>
              <div className="font-serif text-[#8B4513]/50">{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
