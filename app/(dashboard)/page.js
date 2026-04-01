"use client";

import { useState, useEffect, useCallback } from "react";
import GreetingSection from "@/components/Home/GreetingSection";
import SummaryCards from "@/components/Home/SummaryCards";
import AssistantCards from "@/components/Home/AssistantCards";
import RecentMeetings from "@/components/Home/RecentMeetings";
import UpcomingBubble from "@/components/Home/UpcomingBubble";
import UpcomingPanel from "@/components/Home/UpcomingPanel";
import { supabase } from "@/lib/supabaseClient"; 
import { Spin } from "antd"; // Loading dikhane ke liye

export default function Page() {
  const [open, setOpen] = useState(false);
  const [latestMeeting, setLatestMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, tasks: 0, hours: 0 });

  // Data fetch karne ka function
  const getDashboardData = useCallback(async () => {
    try {
      const { data: meetings, error } = await supabase
        .from('meeting') 
        .select('id, duration, ai_summary, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (meetings && meetings.length > 0) {
        let totalMins = 0;

        // Calculate Lifetime Hours
        meetings.forEach((m) => {
          const mins = parseFloat(m.duration);
          totalMins += isNaN(mins) ? 0 : mins;
        });

        // Parse Latest Meeting
        const latest = meetings[0];
        let latestTasksCount = 0;
        
        try {
          const summaryData = typeof latest.ai_summary === 'string' 
            ? JSON.parse(latest.ai_summary) 
            : latest.ai_summary;
          latestTasksCount = summaryData?.data?.action_items?.length || 0;
        } catch (e) {
          console.error("JSON Parse Error");
        }

        setStats({
          total: meetings.length,
          tasks: latestTasksCount,
          hours: (totalMins / 60).toFixed(1)
        });
        setLatestMeeting(latest);
      }
    } catch (err) {
      console.error("Dashboard Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]); // Sirf mount par chalega

  if (loading) {
    return (
      <div style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', // Text ko niche lane ke liye
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '16px' // Icon aur text ke beech gap
      }}>
        <Spin size="large" />
        <span style={{ color: '#1890ff', fontWeight: 500 }}>Loading Dashboard...</span>
      </div>
    );
  }

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
