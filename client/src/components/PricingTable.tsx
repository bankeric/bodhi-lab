import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { modelPricing } from "@shared/buddhistAgents";

export function PricingTable() {
  const models = Object.entries(modelPricing);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold text-foreground">
          Token Pricing
        </h2>
        <p className="text-muted-foreground">
          Transparent pricing per 1 million tokens. Choose the model that best serves your path to awakening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {models.map(([modelKey, model]) => (
          <Card
            key={modelKey}
            className="overflow-visible hover-elevate transition-all"
            data-testid={`card-pricing-${modelKey}`}
          >
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xl font-semibold text-foreground" data-testid={`text-model-${modelKey}`}>
                    {model.name}
                  </h3>
                  {modelKey === "gpt-5" && (
                    <Badge variant="default" data-testid="badge-advanced">Advanced</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-description-${modelKey}`}>
                  {model.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-foreground" data-testid={`text-input-price-${modelKey}`}>
                    ${model.inputPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 1M input tokens</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-foreground" data-testid={`text-output-price-${modelKey}`}>
                    ${model.outputPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 1M output tokens</span>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Context Window</p>
                    <p className="font-mono font-semibold" data-testid={`text-context-${modelKey}`}>
                      {model.contextWindow.toLocaleString()} tokens
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Max Output</p>
                    <p className="font-mono font-semibold" data-testid={`text-max-output-${modelKey}`}>
                      {model.maxOutput.toLocaleString()} tokens
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-3">
                    Used by Agents
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {model.agents.map((agentName) => (
                      <Badge
                        key={agentName}
                        variant="secondary"
                        className="text-xs"
                        data-testid={`badge-agent-${modelKey}-${agentName}`}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        {agentName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="max-w-5xl mx-auto bg-accent/30" data-testid="card-pricing-note">
        <div className="p-6 space-y-2">
          <p className="font-serif text-sm text-foreground">
            <strong>Merit-Based Economy:</strong> Pricing reflects computational costs while supporting our mission of spiritual awakening. 
            All proceeds support the development of dharma technology and the maintenance of this sacred digital vessel.
          </p>
        </div>
      </Card>
    </div>
  );
}
