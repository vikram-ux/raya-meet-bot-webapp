"use client";

import { useState } from "react";
import { Typography, Button, Space } from "antd";
import FeedbackModal from "@/components/Ui/FeedbackModal";

const { Title } = Typography;

export default function GreetingSection() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleFeedbackSubmit = (data) => {
    console.log(data);
    // yahan API call
  };

  return (
    <>
      <div
        style={{
          padding: "60px 40px",
          borderRadius: 20,
          marginBottom: 30,
          background: "linear-gradient(180deg,#d7e7ff 0%,#ffffff 70%)",
        }}
      >
        <Space orientation="vertical" size={0}>
          <Title level={2} style={{ margin: 0 }}>
            Good Evening, Vikram
          </Title>

          <Button
            type="link"
            icon={<span style={{ fontSize: 16 }}>💬</span>}
            style={{ paddingLeft: 0, color: "#444" }}
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            Share Feedback
          </Button>
        </Space>
      </div>

      <FeedbackModal
        open={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
}
