'use client';
import React, { useState } from 'react';
import { Carousel, Button } from 'antd';
import DiscoverIntegrationsFilter from './DiscoverIntegrationsFilter';
import DiscoverIntegrationsGrid from './DiscoverIntegrationGrid';

export default function DiscoverSection({ onSelectApp }) {
  const [active, setActive] = useState(0);

  const slidesData = [
    {
      id: 0,
      title: "Google Meet",
      desc: "Fireflies automatically records, transcribes, and summarizes your Google Meet calls. Get accurate meeting notes, identify action items, and ask questions about your conversations without lifting a pen.",
      logo: "https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg",
      bg: "from-[#e8f5e9] via-[#f1f8e9] to-[#fffde7]", 
      rightImg: "https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg"
    }
  ];

  return (
    <div className="w-full bg-white relative custom-antd-dots">
      <div className="w-full overflow-hidden">
        <Carousel autoplay dots={true} beforeChange={(_, next) => setActive(next)}>
          {slidesData.map((slide) => (
            <div key={slide.id}>
              <div className={`bg-gradient-to-r ${slide.bg} px-10 md:px-24 py-10 flex flex-col md:flex-row items-center justify-between min-h-[320px]`}>
                <div className="max-w-xl text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-white relative">
                      <img src={slide.logo} alt="Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold text-[#1e293b]">{slide.title}</h2>
                      <span className="text-[10px] bg-[#3fd6c3] text-white px-2 py-0.5 rounded-md font-bold uppercase">NEW</span>
                    </div>
                  </div>
                  <p className="text-[#475569] text-[17px] mb-8 max-w-[500px]">{slide.desc}</p>
                  <Button type="primary" className="bg-[#6b46e5] h-11 px-8 rounded-xl font-semibold">
                    + Connect
                  </Button>
                </div>
                <div className="hidden md:block pr-6">
                  <div className="bg-[#1e0a3d] p-1.5 rounded-[28px] shadow-2xl border-[6px] border-[#2d1b4d]">
                    <img src={slide.rightImg} alt="Preview" className="max-w-[440px] rounded-[22px]" />
                  </div>
                </div>                      
              </div>
            </div>
          ))}
        </Carousel>

        <div className="mt-4"><DiscoverIntegrationsFilter /></div>
        <div className="mt-4 pb-10">
          <DiscoverIntegrationsGrid onSelectApp={onSelectApp} />
        </div>
      </div>
    </div>
  );
}