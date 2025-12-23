"use client";

import { useEffect, useState } from "react";
import { Typography, Tooltip, Spin, Popover, Dropdown, Drawer } from "antd";
import {
  EllipsisOutlined,
  LinkOutlined,
  RobotOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import styles from "./recentMeetings.module.css";
import Link from "next/link";

// Custom Components
import LetterAvatar from "@/components/Ui/LetterAvatar";
import ChatBotPanel from "@/components/Chatbot/ChatBotPanel";

const { Text, Title } = Typography;

export default function RecentMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  // 🔥 CHATBOT STATES
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeMeetingId, setActiveMeetingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchMeetings() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/get_meeting_list");
        if (!res.ok) throw new Error("Failed to fetch meetings");
        const data = await res.json();
        const list = Array.isArray(data.meetings) ? data.meetings : [];
        if (mounted) setMeetings(list.slice(0, 3));
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchMeetings();
    return () => { mounted = false; };
  }, []);

  const formatDateTime = (value) => {
    const d = new Date(value);
    if (isNaN(d)) return "";
    return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
  };

  const handleCopyLink = async (meetingId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const meetingUrl = `${window.location.origin}/meeting-detail/${meetingId}`;
    try {
      await navigator.clipboard.writeText(meetingUrl);
      setCopySuccess(meetingId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) { console.error('Failed to copy:', err); }
  };

  // 🔥 ROBOT CLICK HANDLER (AB SIRF DRAWER KHULEGA)
  const handleRobotClick = (e, meetingId) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setActiveMeetingId(meetingId);
    setIsChatOpen(true);
  };

  const getMoreMenuItems = (meetingId) => [
    { key: 'open', label: 'Open' },
    { key: 'share', label: 'Share' },
    { key: 'copy-link', label: 'Copy Link' },
    { type: 'divider' },
    { key: 'delete', label: 'Delete', danger: true },
  ];

  if (loading) return <div className={styles.wrapper}><Spin /></div>;
  if (error) return <div className={styles.wrapper}><Text type="danger">{error}</Text></div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CalendarOutlined />
        <Title level={4}>Recent Meetings</Title>
      </div>

      <div className={styles.list}>
        {meetings.map((meeting) => (
          <Link
            key={meeting.meeting_id}
            href={`/meeting-detail/${meeting.meeting_id}`}
            className={styles.row}
          >
            <div className={styles.left}>
              <LetterAvatar displayName={meeting.meeting_name} />
              <div>
                <Text strong>{meeting.meeting_name || "Untitled Meeting"}</Text>
                <div className={styles.timeRow}>
                  <span className={styles.time}>{formatDateTime(meeting.date || meeting.created_at)}</span>
                  <UnorderedListOutlined className={styles.gistIcon} />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Tooltip title={copySuccess === meeting.meeting_id ? "Link Copied!" : "Copy meeting link"}>
                <LinkOutlined onClick={(e) => handleCopyLink(meeting.meeting_id, e)} style={{ color: copySuccess === meeting.meeting_id ? '#52c41a' : 'inherit' }} />
              </Tooltip>

              <Dropdown menu={{ items: getMoreMenuItems(meeting.meeting_id) }} trigger={['click']}>
                <EllipsisOutlined onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
              </Dropdown>

              {/* 🔥 ROBOT ICON */}
              <Tooltip title="Ask Fred">
                <div className={styles.bot} onClick={(e) => handleRobotClick(e, meeting.meeting_id)}>
                  <RobotOutlined />
                </div>
              </Tooltip>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔥 FIXED DRAWER: Ab chatbot panel pehle se open nahi aayega */}
      <Drawer
        title="Fred AI Assistant"
        placement="right"
        size={450}
        onClose={() => setIsChatOpen(false)}
        open={isChatOpen}
        styles={{ body: { padding: 0 } }} // Taaki chatbot ke borders flush rahein
      >
        <ChatBotPanel 
          meetingId={activeMeetingId}
          userName="Vikram"
        />
      </Drawer>
    </div>
  );
}