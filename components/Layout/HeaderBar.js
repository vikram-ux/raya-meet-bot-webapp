"use client";

import { Input, Badge, Button, Dropdown, Avatar, Space } from "antd";
import {
  SearchOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function HeaderBar() {
  return (
    <div
      style={{
        padding: "10px 20px",
        background: "white",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Page Title */}
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Meetings</h2>

      {/* Center: Search Bar */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 20px" }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by title or keyword"
          style={{ width: "60%", maxWidth: 450, borderRadius: 8 }}
        />
      </div>

      {/* Right Side Controls */}
      <Space size="large">

        {/* Free meetings badge */}
        <Badge
          count={1}
          color="green"
          style={{ marginRight: -20 }}
        />
        <span style={{ color: "gray" }}>Free meeting</span>

        {/* Upgrade Button */}
        <Button type="default" style={{ background: "#e8fff1", borderColor: "#b2f5da" }}>
          Upgrade
        </Button>

        {/* Capture Dropdown Button */}
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Start Video Recording" },
              { key: "2", label: "Upload Recording" },
            ],
          }}
        >
          <Button type="primary" icon={<VideoCameraOutlined />}>
            Capture <DownOutlined />
          </Button>
        </Dropdown>

        {/* Mic Icon */}
        <AudioOutlined style={{ fontSize: 22, cursor: "pointer" }} />

        {/* Bell Icon */}
        <BellOutlined style={{ fontSize: 22, cursor: "pointer" }} />

        {/* Avatar */}
        <Avatar
          src="https://i.pravatar.cc/150"
          size={35}
          style={{ cursor: "pointer" }}
        />
      </Space>
    </div>
  );
}
