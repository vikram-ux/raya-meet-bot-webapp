"use client";
import React, { useState } from "react";
import { Input, Badge, Button, Dropdown, Space } from "antd";
import {
  SearchOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { UserButton } from '@stackframe/stack';
import Link from "next/link";
import { useUser } from '@stackframe/stack';
import { usePathname } from "next/navigation"; 
import CaptureLiveMeeting from "../Meetings/CaptureLiveMeeting";

export default function HeaderBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useUser();
  const pathname = usePathname();

  // --- Purana functional dropdown logic wapas add kiya ---
  const menuItems = {
    items: [
      { 
        key: "1", 
        label: "Add to live meeting", 
        onClick: () => setIsModalVisible(true) 
      },
      { key: "2", label: "Schedule new meeting" },
      { key: "3", label: "Upload audio or video" },
      { key: "4", label: "Start recording" },
    ],
  };

  // 1. Saare pages ki mapping
  const titleMap = {
    "/": "Home",
    "/meetings": "Meetings",
    "/status": "Meeting Status",
    "/uploads": "Uploads",
    "/integrations": "Integrations",
    "/analytics": "Analytics",
    "/AI Apps": "AI Apps",
    "/team": "Team",
    "/upgrade": "Upgrade",
    "/settings": "Settings",
    "/soundbites": "Soundbites",
    "/playlist": "Playlist",
    "/topics": "Topics Tracker",
    "/contacts": "Contacts",
  };

  // 2. Breadcrumb logic for Integrations
  const pathParts = pathname.split('/').filter(Boolean);
  const isIntegrationSubPage = pathParts[0] === 'integrations' && pathParts.length > 1;
  
  const formattedAppName = isIntegrationSubPage 
    ? pathParts[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "";

  // 3. Final Dynamic Title Logic
  const getHeaderTitle = () => {
    if (isIntegrationSubPage) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Integrations</span>
          <span style={{ color: "#94a3b8", margin: "0 8px" }}>/</span>
          <span style={{ color: "#64748b", fontWeight: 500 }}>{formattedAppName}</span>
        </div>
      );
    }
    return titleMap[pathname] || "Dashboard";
  };

  return (
    <div style={{ 
      padding: "10px 20px", 
      background: "white", 
      borderBottom: "1px solid #eee", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      position: "sticky", 
      top: 0, 
      zIndex: 1000 
    }}>
      
      {/* Dynamic Title Section */}
      <div style={{ minWidth: "250px" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#1e293b" }}>
          {getHeaderTitle()}
        </h2>
      </div>

      {/* Center Search */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 20px" }}>
        <Input 
          prefix={<SearchOutlined />} 
          placeholder="Search by title or keyword" 
          style={{ width: "60%", maxWidth: 450, borderRadius: 8 }} 
        />
      </div>

      {/* Right Side Items */}
      <Space size="large" align="center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge count={1} style={{ backgroundColor: '#52c41a', borderRadius: '4px' }} />
          <span style={{ color: "gray", fontSize: '14px' }}>Free meeting</span>
        </div>

        <Link href={"/upgrade"}>
          <Button style={{ background: "#e8fff1", borderColor: "#b2f5da", color: '#00a854', fontWeight: 500 }}>
            Upgrade
          </Button>
        </Link>

        {/* Capture Button with Dropdown (Fixed items) */}
        <Space.Compact>
          <Button 
            type="primary" 
            icon={<VideoCameraOutlined />} 
            onClick={() => setIsModalVisible(true)}
            style={{ borderRight: '1px solid rgba(255,255,255,0.3)' }}
          >
            Capture
          </Button>
          {/* Menu items link kar diye hain yahan */}
          <Dropdown menu={menuItems} trigger={['click']} placement="bottomRight">
            <Button type="primary" icon={<DownOutlined style={{ fontSize: '12px' }} />} />
          </Dropdown>
        </Space.Compact>

        <AudioOutlined style={{ fontSize: 20, cursor: "pointer", color: "#722ed1" }} />
        <BellOutlined style={{ fontSize: 20, cursor: "pointer", color: "#8c8c8c" }} />
        <UserButton />
      </Space>

      <CaptureLiveMeeting 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        userId={user?.id} 
      />
    </div>
  );
}