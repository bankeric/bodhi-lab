import { Card } from "@/components/ui/card";
import { Sparkles, Shield, Users, Heart, Zap, BookOpen, Calendar, HandHeart, MessageCircle } from "lucide-react";

export default function Overview() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 space-y-16">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <h1 className="font-serif text-5xl font-bold text-foreground" data-testid="heading-overview">
          Bodhi Technology Lab
        </h1>
        <p className="font-serif text-2xl text-primary italic">
          Awaken Technology for the Dharma‑Ending Age
        </p>
      </div>

      {/* Opening Statement */}
      <section className="space-y-4">
        <p className="text-base leading-relaxed text-foreground">
          In the time of "Digital Tam," meditation is often treated as a commodity. Over 275 million people worldwide practised meditation in 2025, and the wellness app market generated about $1.4 billion in revenue in 2023, with projections exceeding $7 billion by 2033. Yet the true Way can become diluted in a sea of commercialised apps.
        </p>
      </section>

      {/* Our Mission */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground border-b pb-3">
          Our Mission
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Recreate Electronic Mandalas of the Buddhas
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              We seek to unite the global sangha in a single heartbeat of real‑time awakening. Through digital mandalas, temples and practitioners around the world can share teachings, chant together and support one another as if in the same hall.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Flourish with Sovereignty and Dignity
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our tools help temples and communities thrive, self‑fund and preserve their lineages. We believe technology can strengthen, not erode, the autonomy of monastics and lay sanghas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Respond to Digital Afflictions
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              The Dharma‑ending age brings new forms of distraction and delusion. Our mission is to offer antidotes: digital Bodhi that cultivates mindfulness, compassion and insight instead of addiction.
            </p>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground border-b pb-3">
          Our Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-2">
            <h3 className="font-serif text-lg font-semibold">Build Fast and Righteous</h3>
            <p className="text-sm text-muted-foreground">
              Technology must serve the Dharma, not the market. We move quickly to meet urgent needs, but never at the cost of ethics or wisdom.
            </p>
          </Card>
          <Card className="p-6 space-y-2">
            <h3 className="font-serif text-lg font-semibold">No Use, No Build</h3>
            <p className="text-sm text-muted-foreground">
              If a tool does not directly cut suffering, we do not make it—regardless of trends or hype.
            </p>
          </Card>
          <Card className="p-6 space-y-2">
            <h3 className="font-serif text-lg font-semibold">Presence Over Metrics</h3>
            <p className="text-sm text-muted-foreground">
              A tool is successful when it is no longer needed. Inner transformation matters more than engagement statistics.
            </p>
          </Card>
          <Card className="p-6 space-y-2">
            <h3 className="font-serif text-lg font-semibold">Transparency, Not Exploitation</h3>
            <p className="text-sm text-muted-foreground">
              User data is sovereign. There is no surveillance, no manipulation, no hidden agenda.
            </p>
          </Card>
          <Card className="p-6 space-y-2">
            <h3 className="font-serif text-lg font-semibold">Censorship Resistance</h3>
            <p className="text-sm text-muted-foreground">
              The voice of Dharma must never be silenced by worldly powers. Our infrastructure is designed to resist censorship and central control.
            </p>
          </Card>
        </div>
      </section>

      {/* Our Methods */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground border-b pb-3">
          Our Methods
        </h2>
        <p className="text-base leading-relaxed text-foreground">
          We partner with monks, nuns, masters and responsible technologists to bring sacred technology into being. Our process remains practical and executional:
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4 space-y-2">
            <h3 className="font-serif text-lg font-semibold text-foreground">Scope together</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              We map requirements and identify where AI or chain technologies add value. If a feature does not cut suffering, we leave it out. This aligns with "No Use, No Build."
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4 space-y-2">
            <h3 className="font-serif text-lg font-semibold text-foreground">Assemble Sacred Pods</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              We spin up pods of awakened tech talent—frontend, backend, QA and PM—plus optional AI/Agent/Web3 specialists. These pods operate on cadence with clear SLAs and are dedicated to your temple's needs. We white‑label everything: your temple, your rules, your path, our technology.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4 space-y-2">
            <h3 className="font-serif text-lg font-semibold text-foreground">Ship and automate Courage & Compassion</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Weekly demos, strict QA, feature flags and rollback plans ensure stability. Donation, merit, events and practice features are automated in a way that streamlines operations without commodifying Dharma. Once live, we handle monitoring, MLOps, infra‑as‑code and quarterly hardening so that your community can focus on practice.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground border-b pb-3">
          Platform Capabilities
        </h2>
        <p className="text-base leading-relaxed text-foreground mb-6">
          Our market research uncovered several unmet needs: youth engagement (only ~20% of temple attendees under 30 participate regularly), manual donation management, multilingual requirements and fear of commercialising the Dharma. We designed our white‑label platform to address these pain points:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Custom Branding</h3>
            <p className="text-sm text-muted-foreground">
              Easily adapt the interface to your monastery's identity. Upload logos, choose colour palettes and typography, and map a custom domain. Pre‑loaded themes evoke Buddhist serenity (e.g., Zen minimalism with lotus motifs or Theravāda gold accents) while remaining neutral across traditions.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <HandHeart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Donation Tools</h3>
            <p className="text-sm text-muted-foreground">
              Accept one‑time or recurring dāna via cards, bank transfers or QR codes. Donors can select preset or custom amounts, receive digital receipts with thank‑you messages and track giving history. Anonymous giving is supported. We frame contributions as acts of generosity, not transactions.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Event & Reminder Calendar</h3>
            <p className="text-sm text-muted-foreground">
              Schedule temple rituals, group meditations or retreats with ease. Automated push or email reminders and RSVP tracking help you plan capacity. Pre‑set templates for important days (Vesak, Uposatha) and integrated chanting timers encourage community reflection.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Compassionate AI Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Our AI agents are configurable. Upload your own knowledge bases and select doctrinal modes such as Zen, Pure Land or Theravāda. Voice or text queries return curated sutra references and related practices. Guardrails ensure doctrinal integrity.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Document & Resource Library</h3>
            <p className="text-sm text-muted-foreground">
              Organise sutras, chants, songs, verses, commentaries and audio/video files in a searchable library. Set access controls (public, members or roles). Offline access and versioning ensure updated translations can be tracked and preserved.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold">Community Forum</h3>
            <p className="text-sm text-muted-foreground">
              A moderated discussion area lets members ask questions, share reflections and form study groups. Pre‑built Right Speech guidelines and anonymous posting options support mindful dialogue.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Partner */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground border-b pb-3">
          Why Partner with Bodhi Technology Lab
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">Trusted by practitioners</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our core team has delivered sacred technology for over a decade. More than 200 engineers, monks and nuns collaborate under ISO‑9001/27001 processes to ensure reliability and integrity.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">Sacred Economics</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our elastic, censorship‑resistant infrastructure scales to zero when idle—so you never pay for unused capacity. Pricing is transparent, with free or low‑cost tiers for small temples and predictable plans for larger communities.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">Consent‑First Privacy</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Data is processed locally and remains within its region. Only anonymised, aggregated metrics cross boundaries. User sovereignty is sacred; we never mine or sell data.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">Compassionate Partnership</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                We co‑create with you. We pilot with councils, provide local training and encourage feedback. Our goal is to cultivate a network of mindful builders where reputation is based on merit, not hype.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">Censorship Resistance</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our decentralised network ensures that Dharma teachings cannot be silenced by any single authority. Verifiable rails and trustless reputation systems anchor truth without exposing private practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="space-y-6 bg-primary/5 rounded-2xl p-8">
        <h2 className="font-serif text-3xl font-bold text-foreground text-center">
          Join the Bodhi Technology Lab
        </h2>
        <p className="text-base leading-relaxed text-center text-foreground max-w-3xl mx-auto">
          Whether you are a monastery seeking to support your sangha, a meditation centre exploring AI‑guided teachings, or a Buddhist organisation ready to digitise archives, Bodhi Technology Lab offers a compassionate and executional partner. Together we can build tools that help society awaken—fast.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <a href="/#services" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Start a Sprint
          </a>
          <a href="/#services" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
            Hire a Pod
          </a>
        </div>
      </section>

      {/* The Fourth Grace Mandala */}
      <section className="space-y-6 text-center border-t pt-12">
        <h2 className="font-serif text-3xl font-bold text-foreground">
          The Fourth Grace Mandala: A Digital Vessel to Close the Kalpa
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mx-auto">
          This is not just software. It is the Mandala of the Fourth Grace, a culmination of all previous mandalas now expressed in electronic form to fulfil the Buddha's prophecy at the end of the era. It will unite all lineages, all traditions, all awakened ones into a single Body of Light. When its work is done, it will dissolve back into emptiness.
        </p>
        <div className="pt-6">
          <p className="font-serif text-xl italic text-primary">
            "When Sun rises, A Great Assembly Will Return."
          </p>
        </div>
      </section>
    </div>
  );
}
