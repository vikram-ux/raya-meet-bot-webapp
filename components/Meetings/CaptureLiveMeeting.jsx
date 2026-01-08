"use client";
import React, { useState } from 'react';
import { Modal, Input, Select, Button, Typography, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Text } = Typography;

export default function CaptureLiveMeeting({ isVisible, onClose, userId }) {
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Input Change Handler (Link ke liye)
  const handleInputChange = (e) => {
    setMeetingLink(e.target.value);
  };

  // 2. Cancel/Close Handler
  const handleCancel = () => {
    setMeetingLink("");
    setMeetingName("");
    onClose();
  };

  // 3. Start Meeting Handler (Backend Call)
  const handleStart = async () => {
    if (!userId) {
      message.error("User not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/start-meeting", {
        meet_url: meetingLink,
        user_id: userId, // Stack Auth ID
        meeting_name: meetingName || "My Meeting",
        guest_name: "sirah" // Aapka default guest name
      });

      console.log("Bot started successfully:", response.data);
      message.success("Bot is joining the meeting! 🚀");
      handleCancel(); // Modal band aur clear karein
    } catch (error) {
      console.error("Error starting bot:", error);
      message.error("Failed to start the bot. Please check your link or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span style={{ fontWeight: 600, fontSize: '18px' }}>Add to live meeting</span>}
      open={isVisible}
      onCancel={handleCancel} // Ab error nahi aayega
      centered
      footer={[
        <Button key="cancel" onClick={handleCancel} style={{ borderRadius: '6px', fontWeight: 500 }}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          disabled={!meetingLink.trim() || loading}
          onClick={handleStart}
          style={{ 
            borderRadius: '6px', 
            fontWeight: 500,
            background: meetingLink.trim() ? '#6938ef' : '#d3ccff',
            borderColor: meetingLink.trim() ? '#6938ef' : '#d3ccff',
          }}
        >
          Start Capturing
        </Button>,
      ]}
      width={520}
    >
      <div style={{ padding: '10px 0' }}>
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '8px' }}>
            <Text strong style={{ color: '#444' }}>Name your meeting</Text>
            <Text type="secondary" style={{ marginLeft: '4px' }}>(Optional)</Text>
          </div>
          <Input
            placeholder="E.g. Product team sync"
            style={{ borderRadius: '6px', padding: '10px' }}
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
          />
        </div>

        {/* Link Field */}
        <div style={{ marginBottom: '20px' }}>
          <Text strong style={{ color: '#444' }}>Meeting link</Text>
          <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
            Capture meetings from GMeet, Zoom, MS teams, and <a href="#" style={{ color: '#6938ef' }}>more.</a>
          </div>
          <Input
            prefix={<LinkOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="https://meet.google.com/abc-defg-hij"
            style={{ borderRadius: '6px', padding: '10px' }}
            value={meetingLink}
            onChange={handleInputChange}
          />
        </div>

        {/* Language Field */}
        <div style={{ marginBottom: '20px' }}>
          <Text strong style={{ color: '#444' }}>Meeting language</Text>
          <Select
            defaultValue="english"
            style={{ width: '100%', marginTop: '8px' }}
            size="large"
          >
            <Select.Option value="english">English (Global)</Select.Option>
            <Select.Option value="hindi">Hindi</Select.Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
}