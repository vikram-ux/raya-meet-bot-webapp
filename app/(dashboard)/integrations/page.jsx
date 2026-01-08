'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TabsNav from '@/components/Integrations/TabsNav';
import DiscoverSection from '@/components/Integrations/DiscoverSection';
import ConnectedSection from '@/components/Integrations/ConnectedSection';
import IntegrationDetailsView from '@/components/Integrations/IntegrationDetailsView';

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedApp, setSelectedApp] = useState(null);
  const router = useRouter();

  // App Select Logic
  const handleSelectApp = (app) => {
    setSelectedApp(app);
    // URL update karte hi HeaderBar detect kar lega
    window.history.pushState(null, '', `/integrations/${app.slug}`);
  };

  // Back Button Logic
  const handleBack = () => {
    setSelectedApp(null);
    window.history.pushState(null, '', `/integrations`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* NO HeaderBar HERE - It's already in Layout */}
      
      {selectedApp ? (
        <IntegrationDetailsView 
          app={selectedApp} 
          onBack={handleBack} 
        />
      ) : (
        <>
          <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="container mx-auto pb-10">
            {activeTab === 'discover' ? (
              <DiscoverSection onSelectApp={handleSelectApp} />
            ) : (
              <ConnectedSection />
            )}
          </div>
        </>
      )}
    </main>
  );
}