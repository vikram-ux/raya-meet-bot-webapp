'use client';
import React, { useState } from 'react';
import { Carousel, Button } from 'antd';
import DiscoverIntegrationsFilter from './DiscoverIntegrationsFilter';
import DiscoverIntegrationsGrid from './DiscoverIntegrationGrid';

export default function DiscoverSection() {
  const [active, setActive] = useState(0);

  const slidesData = [
    {
      id: 0,
      title: "Google Meet",
      desc: "Fireflies automatically records, transcribes, and summarizes your Google Meet calls. Get accurate meeting notes, identify action items, and ask questions about your conversations without lifting a pen.",
      logo: "https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg",
      bg: "from-[#e8f5e9] via-[#f1f8e9] to-[#fffde7]", 
      rightImg: "https://files.fireflies.ai/integrations/logos/videoconferencing/google-meet.svg"
    },
    // { id: 1, title: "Google Sheets", desc: "Auto-log meeting details into a Fireflies tracker in Google Sheets, so you can filter and analyze every conversation.", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg", bg: "from-[#eef9f2] via-[#f5fbf7] to-[#f7fcf3]", rightImg: "https://fireflies.ai/static/media/google-sheets.5b8004f1.png" },
    // { id: 2, title: "Notion", desc: "Now supports both pages and databases. Choose your preferred format to log meeting notes seamlessly into Notion.", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", bg: "from-[#f3f4f6] via-[#f9fafb] to-[#ffffff]", rightImg: "https://fireflies.ai/static/media/notion.70e9c49a.png" },
    // { id: 3, title: "Monday.com CRM", desc: "Sync Fireflies meeting notes to monday.com CRM and keep your contacts, leads, and accounts up to date — automatically.", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Monday_logo.png", bg: "from-[#e8fbfb] via-[#f2fdfd] to-[#f5fdfd]", rightImg: "https://fireflies.ai/static/media/monday.0963d3f1.png" },
    // { id: 4, title: "Wealthbox", desc: "Automatically sync meeting data and tasks to the relevant people and companies in Wealthbox, streamlining your CRM workflow.", logo: "https://www.wealthbox.com/wp-content/uploads/2019/10/wealthbox-icon-blue.png", bg: "from-[#f0f4ff] via-[#f8faff] to-[#ffffff]", rightImg: "https://fireflies.ai/static/media/wealthbox.64213d2f.png" },
    // { id: 5, title: "Todoist", desc: "Effortlessly sync action items and tasks from meetings to Todoist.", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Todoist_logo.png", bg: "from-[#fff1f0] via-[#fff8f7] to-[#ffffff]", rightImg: "https://fireflies.ai/static/media/todoist.79a6d36e.png" }
  ];

  return (
    <div className="w-full bg-white relative custom-antd-dots">
      <div className="w-full overflow-hidden">
        <Carousel
          autoplay
          dots={true}
          effect="scrollx"
          beforeChange={(_, next) => setActive(next)}
        >
          {slidesData.map((slide) => (
            <div key={slide.id}>
              <div className={`bg-gradient-to-r ${slide.bg} px-10 md:px-24 py-10 flex flex-col md:flex-row items-center justify-between min-h-[320px]`}>

                {/* Left Side: Logo aur Text */}
                <div className="max-w-xl text-left">
                  <div className="flex items-center gap-4 mb-5">
                    {/* Slack Logo Placeholder */}
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-white relative">
                      <img src={slide.logo} alt="Logo" className="w-8 h-8 object-contain" />
                      {slide.id === 0 && (
                        <div className="absolute -bottom-1 -right-1 bg-[#86efac] rounded-full w-4 h-4 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold text-[#1e293b]">{slide.title}</h2>
                      <span className="text-[10px] bg-[#3fd6c3] text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">NEW</span>
                    </div>
                  </div>
                  <p className="text-[#475569] text-[17px] leading-relaxed mb-8 max-w-[500px]">
                    {slide.desc}
                  </p>
                  <Button
                    type="primary"
                    className="bg-[#6b46e5] hover:!bg-[#5a39c4] border-none h-11 px-8 rounded-xl flex items-center gap-2 text-base font-semibold shadow-md shadow-purple-100"
                  >
                    <span className="text-xl">+</span> Connect
                  </Button>
                </div>

                {/* Right Side Image */}
                <div className="hidden md:block pr-6">
                  <div className="bg-[#1e0a3d] p-1.5 rounded-[28px] shadow-2xl border-[6px] border-[#2d1b4d]">
                    <img src={slide.rightImg} alt="Preview" className="max-w-[440px] rounded-[22px] block" />
                  </div>
                </div>                      

              </div>
            </div>
          ))}
        </Carousel>

        <div className="mt-4">
          <DiscoverIntegrationsFilter />
        </div>
        
        <div className="mt-4">
          <DiscoverIntegrationsGrid />
        </div>


        
      </div>

    </div>
  );
}