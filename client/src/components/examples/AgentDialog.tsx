import { useState } from 'react';
import { AgentDialog } from '../AgentDialog';
import { Button } from '@/components/ui/button';
import { buddhistAgents } from '@shared/buddhistAgents';

export default function AgentDialogExample() {
  const [open, setOpen] = useState(false);
  const agent = buddhistAgents[0];

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <Button onClick={() => setOpen(true)}>
        Open Agent Dialog
      </Button>
      <AgentDialog agent={agent} open={open} onOpenChange={setOpen} />
    </div>
  );
}
