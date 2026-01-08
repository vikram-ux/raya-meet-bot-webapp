"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout, Spin, Result, Button, Select } from "antd";
import LetterAvatar from "@/components/Ui/LetterAvatar";
import FeedbackModal from "@/components/Ui/FeedbackModal";
// 1. Hook import kiya
import { useUser } from '@stackframe/stack'; 

import {
  LoadingOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  DownOutlined,
  CalendarOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Option } = Select;

/* ----------------------
   COMMON WIDTH WRAPPER
---------------------- */
const contentWrapperStyle = {
  width: "70%",
  margin: "0 auto",
};

/* ----------------------
   GROUP MEETINGS
---------------------- */
function groupMeetingsByWeek(meetings) {
  const grouped = {};
  meetings.forEach((m) => {
    const date = new Date(m.created_at || m.date);
    if (isNaN(date)) return;
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(date);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const range = `${weekStart.toLocaleString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleString("en-US", { month: "short", day: "numeric" })}`;
    if (!grouped[range]) grouped[range] = [];
    grouped[range].push(m);
  });
  return grouped;
}

/* ----------------------
   STATUS BADGE
---------------------- */
function StatusBadge({ status }) {
  const map = {
    completed: { icon: <CheckCircleOutlined />, text: "Completed", color: "#52c41a" },
    ongoing: { icon: <LoadingOutlined />, text: "Ongoing", color: "#1890ff" },
  };
  const cfg = map[status] || map.completed;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, color: cfg.color }}>
      {cfg.icon}
      <span style={{ fontSize: 14 }}>{cfg.text}</span>
      <InfoCircleOutlined style={{ fontSize: 14, color: "#d9d9d9" }} />
    </div>
  );
}

/* ----------------------
   MAIN COMPONENT
---------------------- */
export default function MeetingList() {
  // 2. User object get kiya
  const user = useUser(); 
  
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // 3. fetchMeetings ko userId accept karne layak banaya
  async function fetchMeetings(userId) {
    if (!userId) return; // Agar ID nahi hai toh call mat karo
    
    try {
      setLoading(true);
      setError(null);
      // 4. Dynamic URL template literal use karke
      const res = await fetch(`http://localhost:8000/get_meeting_list?user_id=${userId}`);
      
      if (!res.ok) throw new Error("Failed to fetch meetings");
      const data = await res.json();
      setMeetings(Array.isArray(data.meetings) ? data.meetings : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // 5. useEffect mein user.id ko listen kiya
  useEffect(() => {
    if (user?.id) {
      fetchMeetings(user.id);
    }
  }, [user?.id]);

  const groupedMeetings = groupMeetingsByWeek(meetings);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin indicator={<LoadingOutlined spin style={{ fontSize: 48, color: "#7c3aed" }} />} />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to Load Meeting Data"
        subTitle={error}
        extra={
          <Button
            type="primary"
            // Retry button par bhi current id bheji
            onClick={() => fetchMeetings(user?.id)}
            style={{ backgroundColor: "#7c3aed", borderColor: "#7c3aed" }}
          >
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      <main className="bg-white">

        {/* FILTER BAR */}
        <div>
          <div style={{ ...contentWrapperStyle, padding: "20px 0", display: "flex", gap: 12, alignItems: "center" }}>
            <Select defaultValue="all" style={{ width: 180 }} suffixIcon={<DownOutlined />}>
              <Option value="all"><CalendarOutlined style={{ marginRight: 8 }} />All</Option>
              <Option value="Today">Today</Option>
              <Option value="Yesterday">Yesterday</Option>
              <Option value="Last 7 days">Last 7 days</Option>
              <Option value="Last 30 days">Last 30 days</Option>
              <Option value="Custom date range">Custom date range</Option>
            </Select>

            <Select defaultValue="all" style={{ width: 200 }} suffixIcon={<DownOutlined />}>
              <Option value="all"><RiseOutlined style={{ marginRight: 8 }} />All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="ongoing">Ongoing</Option>
            </Select>

            <div style={{ marginLeft: "auto" }}>
              <Button type="text" onClick={() => setIsFeedbackModalOpen(true)}>Feedback</Button>
            </div>
          </div>
        </div>

        {/* MEETING GROUPS */}
        {Object.keys(groupedMeetings).map((range) => (
          <div key={range}>
            <div style={{ ...contentWrapperStyle, padding: "16px 0" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#595959" }}>{range}</p>
            </div>

            {groupedMeetings[range].map((meeting) => {
              const date = new Date(meeting.date || meeting.created_at);
              const dateString = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
              const timeString = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

              return (
                <Link key={meeting.meeting_id} href={`/meeting-detail/${meeting.meeting_id}`} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ padding: "20px 0", cursor: "pointer" }}>
                    <div style={{ ...contentWrapperStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                        <LetterAvatar displayName={meeting.bot_display_name} size="w-11 h-11" />
                        <div style={{ minWidth: 0 }}>
                          <p style={{ color: "black", margin: 0, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {meeting.meeting_name || "Untitled Meeting"}
                          </p>
                          <p style={{ margin: 0, fontSize: 14, color: "#8c8c8c" }}>{dateString}, {timeString}</p>
                        </div>
                      </div>
                      <StatusBadge status={meeting.status} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}

        <FeedbackModal open={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} onSubmit={(data) => console.log(data)} />
      </main>
    </div>
  );
}