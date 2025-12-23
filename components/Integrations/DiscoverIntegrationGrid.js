'use client';
import React from 'react';

const integrationApps = [
  {
    name: 'Google Meet',
    category: 'Fireflies',
    desc: 'Record, transcribe, search Google Meet meetings.',
    logo: 'https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg',
  },
//   {
//     name: 'Activepieces',
//     category: 'Activepieces',
//     desc: 'Activepieces offers a no-code integration with Fireflies.ai, enabling users to automate workflows involving meeting data.',
//     logo: 'https://www.activepieces.com/favicon.ico',
//   },
//   {
//     name: 'Affinity',
//     category: 'Fireflies',
//     desc: 'Automatically sync meeting data and tasks to the relevant people and companies in Affinity, streamlining your CRM workflow.',
//     logo: 'https://gdm-catalog-fms.imgix.net/product_logo/3e357904-8979-4598-9e67-0c1535497255.png',
//   },
 
];

export default function DiscoverIntegrationsGrid() {
  return (
    <div className="w-full px-10 md:px-24 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
      {integrationApps.map((app, index) => (
        <div 
          key={index} 
          className="group p-8 border border-gray-100 rounded-[24px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer flex flex-col min-h-[260px] border-solid"
        >
          {/* Logo Area */}
          <div className="w-12 h-12 mb-6 flex items-center justify-start">
            <img 
              src={app.logo} 
              alt={app.name} 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <h3 className="text-[18px] font-bold text-[#1e293b] mb-1">
              {app.name}
            </h3>
            <p className="text-[14px] text-[#94a3b8] font-semibold">
              {app.category}
            </p>
          </div>

          {/* Description Area */}
          <p className="text-[15px] text-[#64748b] leading-relaxed line-clamp-3">
            {app.desc}
          </p>
        </div>
      ))}
    </div>
  );
}