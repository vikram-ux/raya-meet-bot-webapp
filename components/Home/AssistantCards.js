"use client";

import { Card, Row, Col, Typography, Space, Flex } from "antd";
import {
  PlusOutlined,
  WifiOutlined,
  MessageOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const cardStyle = {
  borderRadius: 10,
  padding: 10,
  minHeight: 120,
  // Changed background color to a light off-white/gray
  backgroundColor: '#fcfcfc',
  // Using a very subtle border for definition
  border: "1px solid #eeeeee", 
  cursor: "pointer",
  transition: "all 0.3s",
  bodyStyle: { padding: 10 },
};

export default function AssistantCards() {
  return (
    <div style={{ padding: 30 }}>

      <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
        <Space align="center" size={8}>
          <Text style={{ fontSize: 16, color: '#404040' }}>
            ✢ Personal Assistant
          </Text>
        </Space>
        <Space size={4}>
          <Text style={{ color: '#4A90E2', cursor: 'pointer', fontSize: 14 }}>
            Manage
          </Text>
          <Text style={{ color: '#b0b0b0', fontSize: 14 }}>
            ⓘ
          </Text>
        </Space>
      </Flex>

      <Row gutter={20}>

        <Col span={8}>
          <Card
            style={cardStyle}
            hoverable
          >
            <Space orientation="vertical" size={10} style={{ width: '100%' }}>

              <div
                style={{
                  background: "#988aff",
                  padding: 8,
                  borderRadius: 6,
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WifiOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: 22,
                  }}
                />
              </div>

              <Space orientation="vertical" size={2}>
                <Space size={4}>
                  <Text strong style={{ fontSize: 16 }}>
                    Daily Digest
                  </Text>
                  <CheckOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                </Space>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  No digest yet
                </Text>
              </Space>

            </Space>
          </Card>
        </Col>


        <Col span={8}>
          <Card
            style={cardStyle}
            hoverable
          >
            <Space orientation="vertical" size={10} style={{ width: '100%' }}>

              <div
                style={{
                  background: "#c1f06b",
                  padding: 8,
                  borderRadius: 6,
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageOutlined
                  style={{
                    color: "#404040",
                    fontSize: 22,
                  }}
                />
              </div>

              <Space orientation="vertical" size={2}>
                <Text strong style={{ fontSize: 16 }}>
                  Popular Topics
                </Text>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  No topics yet
                </Text>
              </Space>

            </Space>
          </Card>
        </Col>


        <Col span={8}>
          <Card
            style={cardStyle}
            hoverable
          >
            <Space orientation="vertical" size={10} style={{ width: '100%' }}>

              <div
                style={{
                  background: 'transparent',
                  padding: 8,
                  borderRadius: 6,
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlusOutlined
                  style={{
                    color: "#b0b0b0",
                    fontSize: 22,
                  }}
                />
              </div>

              <Space orientation="vertical" size={2}>
                <Text strong style={{ fontSize: 16 }}>
                  Add Skills
                </Text>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Browse 100+
                </Text>
              </Space>

            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}