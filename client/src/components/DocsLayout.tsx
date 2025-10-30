import { useState } from "react";
import { DocsNav } from "@/components/DocsNav";
import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/TracingBeam";
import { Sparkles, Download, Share2, Menu, X, BookOpen, Coins, Server, Bot } from "lucide-react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      id: "manifesto",
      title: "The Manifesto",
      icon: BookOpen,
      children: [
        { id: "abstract", title: "Abstract", href: "/docs/manifesto#abstract" },
        { id: "section-1", title: "1. The Sickness of the Digital Age", href: "/docs/manifesto#section-1" },
        { id: "section-2", title: "2. Merit vs. Worldly Blessing", href: "/docs/manifesto#section-2" },
        { id: "section-3", title: "3. Prior Landscape", href: "/docs/manifesto#section-3" },
        { id: "section-4", title: "4. Architecture of Awakened Technology", href: "/docs/manifesto#section-4" },
        { id: "section-7", title: "5. Sacred Economics", href: "/docs/manifesto#section-7" },
        { id: "section-8", title: "6. Roadmap", href: "/docs/manifesto#section-8" },
        { id: "section-9", title: "7. Conclusion & Epilogue", href: "/docs/manifesto#section-9" },
      ],
    },
    {
      id: "merit-economy",
      title: "Merit Economy",
      icon: Coins,
      children: [
        { id: "dao", title: "The Mandala of Merit", href: "/docs/mandala-merit" },
        { id: "tokenomics", title: "Merit Tokenomics", href: "/docs/merit-tokenomics" },
        { id: "unraveling", title: "Path of Unraveling", href: "/docs/path-of-unraveling" },
      ],
    },
    {
      id: "tech-stack",
      title: "Tech Stack",
      icon: Server,
      children: [
        { id: "vision", title: "Vision & Mission", href: "/docs/tech-stack#vision-mission" },
        { id: "compute", title: "Collective Compute Mandala", href: "/docs/tech-stack#compute-mandala" },
        { id: "ledger", title: "The Mandala Ledger", href: "/docs/tech-stack#mandala-ledger" },
        { id: "protocol", title: "Merit Attribution Protocol", href: "/docs/tech-stack#merit-protocol" },
        { id: "primitives", title: "Universal Primitives", href: "/docs/tech-stack#primitives" },
        { id: "privacy", title: "Privacy by Dharma", href: "/docs/tech-stack#privacy-dharma" },
      ],
    },
    {
      id: "agents",
      title: "Agents",
      icon: Bot,
      children: [
        { id: "overview", title: "Overview", href: "/docs/overview" },
        { id: "models", title: "Agent Models", href: "/docs/models" },
        { id: "quick-start", title: "Quick Start", href: "/docs/quick-start" },
        { id: "pricing", title: "Token Pricing", href: "/docs/pricing" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover-elevate rounded-lg transition-all"
              data-testid="button-sidebar-toggle"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-serif text-base sm:text-lg font-bold text-primary">An Agentic Social Network for Collective Awakening</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="hidden sm:flex" data-testid="button-download">
              <Download className="w-3.5 h-3.5 mr-2" />
              <span>Export PDF</span>
            </Button>
            <Button size="sm" data-testid="button-share">
              <Share2 className="w-3.5 h-3.5 mr-2" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-[57px]">
        <aside className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] w-80 bg-sidebar border-r overflow-y-auto z-30 lg:block ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <DocsNav navigation={navigation} />
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-80">
          <TracingBeam className="py-8 px-4">
            {children}
          </TracingBeam>
        </main>
      </div>
    </div>
  );
}
