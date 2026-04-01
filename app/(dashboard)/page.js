"use client";

import { useState, useEffect } from "react";
import GreetingSection from "@/components/Home/GreetingSection";
import SummaryCards from "@/components/Home/SummaryCards";
import AssistantCards from "@/components/Home/AssistantCards";
import RecentMeetings from "@/components/Home/RecentMeetings";
import UpcomingBubble from "@/components/Home/UpcomingBubble";
import UpcomingPanel from "@/components/Home/UpcomingPanel";
import { supabase } from "@/lib/supabaseClient"; 

export default function Page() {
  const [open, setOpen] = useState(false);
  const [latestMeeting, setLatestMeeting] = useState(null);
  const [stats, setStats] = useState({ total: 0, tasks: 0, hours: 0 });

  useEffect(() => {
    async function getDashboardData() {
      // Table name 'meeting' aur column 'ai_summary'
      const { data: meetings, error } = await supabase
        .from('meeting') 
        .select('id, duration, ai_summary, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Full Supabase Error:", error.message);
        return;
      }

      if (meetings && meetings.length > 0) {
        let totalMins = 0;

        // 1. Calculate Lifetime Hours
        meetings.forEach((m) => {
          const mins = parseFloat(m.duration);
          totalMins += isNaN(mins) ? 0 : mins;
        });

        // 2. Focus on LATEST meeting for Tasks count
        const latest = meetings[0];
        const latestSummary = typeof latest.ai_summary === 'string' 
          ? JSON.parse(latest.ai_summary) 
          : latest.ai_summary;
        
        // Latest meeting ke action items gino (e.g., 3 tasks)
        const latestTasks = latestSummary?.data?.action_items?.length || 0;

        setStats({
          total: meetings.length,
          tasks: latestTasks, // Ab yahan 13 ki jagah sirf latest meeting ke 3 dikhenge
          hours: totalMins > 0 ? (totalMins / 60).toFixed(1) : 0
        });

        setLatestMeeting(latest);
      }
    }

    getDashboardData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <GreetingSection />
      
      <SummaryCards 
        totalMeetings={stats.total} 
        totalTasks={stats.tasks} 
        hoursSaved={stats.hours} 
        latestMeeting={latestMeeting}
      />

      <AssistantCards latestMeeting={latestMeeting} />
      
      <RecentMeetings />

      {!open && <UpcomingBubble onOpen={() => setOpen(true)} />}
      <UpcomingPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}







// "use client";

// import { useState } from "react";
// import GreetingSection from "@/components/Home/GreetingSection";
// import SummaryCards from "@/components/Home/SummaryCards";
// import AssistantCards from "@/components/Home/AssistantCards";
// import RecentMeetings from "@/components/Home/RecentMeetings";

// import UpcomingBubble from "@/components/Home/UpcomingBubble";
// import UpcomingPanel from "@/components/Home/UpcomingPanel";

// export default function Page() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div style={{ padding: 24 }}>
//       <GreetingSection />
//       <SummaryCards />
//       <AssistantCards />
//       <RecentMeetings />

//       {/* Show bubble only if drawer is closed */}
//       {!open && <UpcomingBubble onOpen={() => setOpen(true)} />}

//       {/* Sliding panel */}
//       <UpcomingPanel open={open} onClose={() => setOpen(false)} />
//     </div>
//   );
// }
