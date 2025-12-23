'use client';
import { useState } from 'react';
import TabsNav from '@/components/Integrations/TabsNav';
import DiscoverSection from '@/components/Integrations/DiscoverSection';
import ConnectedSection from '@/components/Integrations/ConnectedSection';

export default function Home() {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation Component */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional Rendering Logic */}
      <div className="container mx-auto">
        {activeTab === 'discover' ? (
          <DiscoverSection />
        ) : (
          <ConnectedSection />
        )}
      </div>
    </main>
  );
}