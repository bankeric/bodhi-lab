import { useState } from 'react';
import { DocsNav } from '../DocsNav';
import { Sparkles, DollarSign, BookOpen, Zap } from 'lucide-react';

export default function DocsNavExample() {
  const [activeSection, setActiveSection] = useState('overview');

  const navigation = [
    {
      id: 'agents',
      title: 'Agents',
      icon: Sparkles,
      children: [
        { id: 'overview', title: 'Overview', href: '#overview' },
        { id: 'models', title: 'Agent Models', href: '#models' },
        { id: 'quick-start', title: 'Quick Start', href: '#quick-start' },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing',
      icon: DollarSign,
      children: [
        { id: 'pricing-overview', title: 'Token Pricing', href: '#pricing' },
      ],
    },
  ];

  return (
    <div className="h-screen w-80 bg-sidebar border-r">
      <DocsNav
        navigation={navigation}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />
    </div>
  );
}
