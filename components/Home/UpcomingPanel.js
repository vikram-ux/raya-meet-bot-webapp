"use client";

import { Flex } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import PanelContent from "@/components/Home/UpcomingPanelContent";

export default function UpcomingPanel({ open, onClose }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                right: open ? 0 : "-420px",
                height: "100vh",
                width: 420,
                background: "#fff",
                boxShadow: open ? "0 0 30px rgba(0,0,0,0.2)" : "none",
                transition: "right 0.35s ease",
                zIndex: 3000,
                padding: "22px 28px",
                overflow: "hidden", // ⭐ scroll removed
            }}
        >
            <PanelContent onClose={onClose} />
        </div>
    );
}
