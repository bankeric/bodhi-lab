import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TracingBeam } from "@/components/TracingBeam";

interface NavSection {
  id: string;
  title: string;
  icon: any;
  children: { id: string; title: string; href: string }[];
}

interface DocsNavProps {
  navigation: NavSection[];
}

export function DocsNav({ navigation }: DocsNavProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navigation.map(section => section.id)
  );

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections with IDs
      const sections = document.querySelectorAll('section[id]');
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        // Check if section is in viewport (with some offset for better UX)
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
          currentSection = section.getAttribute('id') || "";
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const filteredNavigation = navigation.map(section => ({
    ...section,
    children: section.children.filter(child =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.children.length > 0 || !searchQuery);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b space-y-4">
        <Link href="/">
          <div className="flex items-center cursor-pointer" data-testid="link-home">
            <span className="font-serif font-bold text-[#991b1b] text-lg">Bodhi Technology Lab</span>
          </div>
        </Link>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-serif"
            data-testid="input-search"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 relative">
        <TracingBeam>
          <div className="space-y-1">
            {filteredNavigation.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-serif text-sm font-semibold text-foreground hover-elevate transition-all"
                  data-testid={`button-section-${section.id}`}
                >
                  <div className="flex items-center gap-2">
                    <section.icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.includes(section.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-3">
                    {section.children.map((child) => {
                      // Extract section ID from href (e.g., /docs/overview#mission -> mission)
                      const sectionId = child.href.split('#')[1] || "";
                      const isActive = activeSection === sectionId || location === child.href;
                      
                      return (
                        <Link key={child.id} href={child.href}>
                          <div
                            onClick={() => {
                              // Smooth scroll to section
                              const element = document.getElementById(sectionId);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg font-serif text-sm transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#991b1b] text-white font-medium"
                                : "text-foreground hover:bg-[#991b1b]/10 hover:text-[#991b1b] active:bg-[#991b1b]/20"
                            }`}
                            data-testid={`link-nav-${child.id}`}
                          >
                            {child.title}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TracingBeam>
      </nav>

      <div className="border-t p-4 space-y-3">
        <div>
          <p className="font-serif text-xs text-muted-foreground mb-1">Version</p>
          <p className="font-serif text-sm font-semibold text-primary">2025.1</p>
        </div>
        <div className="space-y-1">
          <Link href="/community">
            <span className="block font-serif text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
              Community
            </span>
          </Link>
          <Link href="/library">
            <span className="block font-serif text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
              Library
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
