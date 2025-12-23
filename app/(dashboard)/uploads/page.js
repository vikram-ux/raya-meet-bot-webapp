"use client";

import { Upload, Button, Typography, Space, Empty } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function UploadTranscript() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      {/* Upload Box */}
      <Upload.Dragger
        multiple={false}
        showUploadList={false}
        style={{
          borderRadius: 12,
          padding: "48px 24px",
          border: "1.5px dashed #7c6cff",
          background: "#fff",
        }}
      >
        <Space orientation="vertical" size={14} align="center">
          <UploadOutlined style={{ fontSize: 28, color: "#7c6cff" }} />

          <Title level={4} style={{ margin: 0 }}>
            Upload a file to generate a transcript
          </Title>

          <Text type="secondary" style={{ textAlign: "center", maxWidth: 520 }}>
            Browse or drag and drop MP3, M4A, WAV, MP4 or WEBM files.
            (Max video size: 100 MB, Max audio size: 500 MB)
          </Text>

          <Button
            type="primary"
            size="large"
            style={{
              marginTop: 10,
              background: "#6A4BFF",
              borderRadius: 8,
              paddingInline: 28,
            }}
          >
            Browse Files
          </Button>
        </Space>
      </Upload.Dragger>

      {/* Empty State */}
      <div style={{ marginTop: 80 }}>
        <Empty
          styles={{
            image: { height: 60 },
          }}
          description={
            <Text strong style={{ fontSize: 16 }}>
              You have no recent uploads!
            </Text>
          }
        />

      </div>
    </div>
  );
}
