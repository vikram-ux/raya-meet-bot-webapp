"use client";

import { Flex, Typography } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function UpcomingBubble({ onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: "fixed",
        right: 0,
        top: "40%",
        background: "#fff",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
        padding: "12px 18px",
        cursor: "pointer",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 140,
      }}
    >
      <img
        src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png"
        width={22}
        height={22}
      />

      <Text strong style={{ fontSize: 14 }}>
        0 Upcoming
      </Text>

      <DoubleLeftOutlined style={{ fontSize: 20 }} />
    </div>
  );
}
