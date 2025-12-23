"use client";

import { useState } from "react";
import GreetingSection from "@/components/Home/GreetingSection";
import SummaryCards from "@/components/Home/SummaryCards";
import AssistantCards from "@/components/Home/AssistantCards";
import RecentMeetings from "@/components/Home/RecentMeetings";

import UpcomingBubble from "@/components/Home/UpcomingBubble";
import UpcomingPanel from "@/components/Home/UpcomingPanel";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <GreetingSection />
      <SummaryCards />
      <AssistantCards />
      <RecentMeetings />

      {/* Show bubble only if drawer is closed */}
      {!open && <UpcomingBubble onOpen={() => setOpen(true)} />}

      {/* Sliding panel */}
      <UpcomingPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
