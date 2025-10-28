import { CompactAgentCard } from '../CompactAgentCard';
import { buddhistAgents } from '@shared/buddhistAgents';

export default function CompactAgentCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {buddhistAgents.map(agent => (
          <CompactAgentCard
            key={agent.id}
            agent={agent}
            onClick={(agent) => console.log('Clicked:', agent.name)}
          />
        ))}
      </div>
    </div>
  );
}
