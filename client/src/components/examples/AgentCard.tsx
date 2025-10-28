import { AgentCard } from '../AgentCard';
import { buddhistAgents } from '@shared/buddhistAgents';

export default function AgentCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {buddhistAgents.slice(0, 2).map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onViewDetails={(agent) => console.log('View details for:', agent.name)}
          />
        ))}
      </div>
    </div>
  );
}
