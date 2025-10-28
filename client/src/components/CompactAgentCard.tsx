import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { BuddhistAgent } from "@shared/buddhistAgents";

interface CompactAgentCardProps {
  agent: BuddhistAgent;
  onClick?: (agent: BuddhistAgent) => void;
}

export function CompactAgentCard({ agent, onClick }: CompactAgentCardProps) {
  return (
    <Card
      className="overflow-visible hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={() => onClick?.(agent)}
      data-testid={`card-agent-compact-${agent.id}`}
    >
      <div className="p-6 flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${agent.accentColor}20` }}
        >
          <Sparkles className="w-6 h-6" style={{ color: agent.accentColor }} />
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-lg font-semibold text-foreground" data-testid={`text-agent-name-${agent.id}`}>
              {agent.name}
            </h3>
            <Badge
              variant="secondary"
              className="font-mono text-xs"
              data-testid={`badge-model-${agent.id}`}
            >
              {agent.model}
            </Badge>
          </div>
          
          <p className="font-serif text-sm italic text-muted-foreground line-clamp-2" data-testid={`text-tagline-${agent.id}`}>
            {agent.tagline}
          </p>
        </div>
      </div>
    </Card>
  );
}
