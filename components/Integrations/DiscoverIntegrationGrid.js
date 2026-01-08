'use client';
import React from 'react';

const integrationApps = [
  {
    name: 'Google Meet',
    slug: 'google-meet',
    category: 'Fireflies',
    desc: 'Record, transcribe, search Google Meet meetings.',
    logo: 'https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg',
    longDesc: 'Fireflies for Google Meet automatically records, transcribes, and summarizes your meetings. It seamlessly integrates with your calendar to ensure every conversation is captured without any manual effort.',
    features: [
      'Automatically record and transcribe Google Meet calls',
      'AI-generated meeting summaries and action items',
      'Search through transcripts for keywords',
      'Directly sync meeting notes to your CRM'
    ]
  }
];

export default function DiscoverIntegrationsGrid({ onSelectApp }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 md:px-24">
      {integrationApps.map((app) => (
        <div
          key={app.slug}
          onClick={() => onSelectApp(app)}
          className="cursor-pointer p-8 rounded-2xl border bg-white hover:shadow-lg transition flex flex-col items-start"
        >
          <img src={app.logo} className="w-10 h-10 mb-4" alt={app.name} />
          <h3 className="font-bold text-lg">{app.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{app.category}</p>
          <p className="text-gray-600 text-[15px]">{app.desc}</p>
        </div>
      ))}
    </div>
  );
}