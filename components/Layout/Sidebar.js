"use client";

import React, { useState } from "react";
import { Layout, Menu, Popover } from "antd";
import {
  HomeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined,
  TeamOutlined,
  StarOutlined,
  SlackOutlined,
  EllipsisOutlined,
  SettingOutlined,
  RiseOutlined,
  BarChartOutlined,
  ProductOutlined,
  AudioOutlined,
  OrderedListOutlined,
  NumberOutlined,
  UserOutlined
} from "@ant-design/icons";

import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  let pathname = usePathname();
  const [popoverOpen, setPopoverOpen] = useState(false);

  if (!pathname) pathname = "/";

  const isCollapsed = pathname === "/meetings";


  const moreItems = [
    { key: "/soundbites", label: "Soundbites", icon: <AudioOutlined /> },
    { key: "/playlist", label: "Playlist", icon: <OrderedListOutlined /> },
    { key: "/topics", label: "Topics Tracker", icon: <NumberOutlined /> },
    { key: "/contacts", label: "Contacts", icon: <UserOutlined /> },
  ];

  const moreMenuContent = (
    <Menu
      items={moreItems}
      onClick={({ key }) => {
        setPopoverOpen(false);
        router.push(key);
      }}
      selectable={false}
      style={{ border: "none", width: 180 }}
    />
  );


  const sidebarItems = [
    { key: "/", label: "Home", icon: <HomeOutlined /> },
    { key: "/meetings", label: "Meetings", icon: <VideoCameraOutlined /> },
    { key: "/status", label: "Meeting Status", icon: <RiseOutlined /> },
    { key: "/uploads", label: "Uploads", icon: <UploadOutlined /> },
    { key: "/integration", label: "Integration", icon: <ProductOutlined /> },
    { key: "/analytics", label: "Analytics", icon: <BarChartOutlined /> },
    { key: "/AI Apps", label: "AI Apps", icon: <AppstoreOutlined /> },
    { key: "/team", label: "Team", icon: <TeamOutlined /> },
    { key: "/upgrade", label: "Upgrade", icon: <StarOutlined /> },
    { key: "/settings", label: "Settings", icon: <SettingOutlined /> },
    {
      key: "more",
      label: (
        <Popover
          content={moreMenuContent}
          trigger="click"
          placement="rightBottom"
          open={popoverOpen}
          onOpenChange={(visible) => setPopoverOpen(visible)}
          arrow={false}
          styles={{ body: { padding: 0 } }}
        >
          <div style={{ width: "70%" }}>More</div>
        </Popover>
      ),
      icon: <EllipsisOutlined />,
    },
  ];

  const onMenuClick = (e) => {

    if (e.key !== "more") {
      router.push(e.key);
    }
  };

  return (
    <Sider
      collapsible={false}
      collapsed={isCollapsed}
      collapsedWidth={60}
      width={230}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div
        className="text-white p-4 font-bold text-lg flex items-center gap-2"
        style={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
      >
        <SlackOutlined style={{ fontSize: 20 }} />
        {!isCollapsed && <span>LOGO</span>}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={sidebarItems} 
        onClick={onMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
}