import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X, Search, Sparkles, DollarSign, BookOpen, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavSection {
  id: string;
  title: string;
  icon: any;
  children: { id: string; title: string; href: string }[];
}

interface DocsNavProps {
  navigation: NavSection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function DocsNav({ navigation, activeSection, onSectionClick }: DocsNavProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navigation.map(section => section.id)
  );

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
          <div className="flex items-center gap-2 group cursor-pointer" data-testid="link-home">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover-elevate transition-all">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-serif text-lg font-bold text-primary">Giác Ngộ</span>
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

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
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
                {section.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onSectionClick(child.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-serif text-sm transition-all ${
                      activeSection === child.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover-elevate"
                    }`}
                    data-testid={`button-nav-${child.id}`}
                  >
                    {child.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
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
