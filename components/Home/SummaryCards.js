"use client";

import { Card, Row, Col, Space, Typography } from "antd";
import { CalendarOutlined, CheckOutlined, StarOutlined } from "@ant-design/icons";

const { Text } = Typography;

const cardStyle = {
  borderRadius: 12,
  padding: 10,
  // Removed custom boxShadow to allow Ant Design's hoverable effect to work smoothly
  border: "1px solid #f0f0f0", // Added a light border for definition
};

export default function SummaryCards() {
  return (
    <Row gutter={20} style={{ marginBottom: 30, padding: 30}}>
      <Col span={8}>
        <Card style={cardStyle} hoverable>
          <Space>
            <CalendarOutlined style={{ color: "#ff6f61", fontSize: 18 }} />
            <Text>0 Meeting Preps</Text>
          </Space>
        </Card>
      </Col>

      <Col span={8}>
        <Card style={cardStyle} hoverable>
          <Space>
            <CheckOutlined style={{ color: "#3ccf4e", fontSize: 18 }} />
            <Text>0 Tasks</Text>
          </Space>
        </Card>
      </Col>

      <Col span={8}>
        <Card style={cardStyle} hoverable>
          <Space>
            <StarOutlined style={{ color: "#ff42f5", fontSize: 18 }} />
            <Text>0 AI Apps</Text>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}