"use client";

import { useState, useMemo } from "react";
import { Card, Row, Col, Space, Typography, Modal, Button, Checkbox } from "antd";
import { VideoCameraOutlined, CheckOutlined, HistoryOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

const cardStyle = {
  borderRadius: 12,
  padding: "15px 20px",
  border: "1px solid #f0f0f0",
  height: '100%'
};

export default function SummaryCards({ totalMeetings = 0, totalTasks = 0, hoursSaved = 0, latestMeeting = null }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data ko render se pehle parse kar lo (Memoized style)
  const actionItems = useMemo(() => {
    if (!latestMeeting?.ai_summary) return [];
    try {
      const parsed = typeof latestMeeting.ai_summary === 'string' 
        ? JSON.parse(latestMeeting.ai_summary) 
        : latestMeeting.ai_summary;
      return parsed?.data?.action_items || [];
    } catch (e) {
      return [];
    }
  }, [latestMeeting]);

  return (
    <>
      <Row gutter={[20, 20]} style={{ marginBottom: 30, padding: "0 24px" }}>
        <Col xs={24} sm={8}>
          <Card style={cardStyle} hoverable onClick={() => router.push('/meetings')}>
            <Space size="middle">
              <div style={{ background: '#fff1f0', padding: 10, borderRadius: 8 }}>
                <VideoCameraOutlined style={{ color: "#ff6f61", fontSize: 22 }} />
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{totalMeetings}</Title>
                <Text type="secondary">Total Meetings</Text>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card style={cardStyle} hoverable onClick={() => totalTasks > 0 && setIsModalOpen(true)}>
            <Space size="middle">
              <div style={{ background: '#f6ffed', padding: 10, borderRadius: 8 }}>
                <CheckOutlined style={{ color: "#3ccf4e", fontSize: 22 }} />
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{totalTasks}</Title>
                <Text type="secondary">Latest Tasks</Text>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card style={cardStyle}>
            <Space size="middle">
              <div style={{ background: '#fff0f6', padding: 10, borderRadius: 8 }}>
                <HistoryOutlined style={{ color: "#ff42f5", fontSize: 22 }} />
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{hoursSaved}h</Title>
                <Text type="secondary">Hours Saved</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal 
        title="Latest AI Action Items" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        footer={[<Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>Close</Button>]}
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {actionItems.map((item, index) => (
            <div key={index} style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start' }}>
              <Checkbox checked={false} style={{ marginTop: 4 }} />
              <div style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: '15px', display: 'block' }}>
                  {typeof item === 'object' ? item.task : item}
                </Text>
                {item.owner && <Text type="secondary" style={{ fontSize: '12px' }}>Owner: {item.owner}</Text>}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}




// "use client";

// import { Card, Row, Col, Space, Typography } from "antd";
// import { CalendarOutlined, CheckOutlined, StarOutlined } from "@ant-design/icons";

// const { Text } = Typography;

// const cardStyle = {
//   borderRadius: 12,
//   padding: 10,
//   // Removed custom boxShadow to allow Ant Design's hoverable effect to work smoothly
//   border: "1px solid #f0f0f0", // Added a light border for definition
// };

// export default function SummaryCards() {
//   return (
//     <Row gutter={20} style={{ marginBottom: 30, padding: 30}}>
//       <Col span={8}>
//         <Card style={cardStyle} hoverable>
//           <Space>
//             <CalendarOutlined style={{ color: "#ff6f61", fontSize: 18 }} />
//             <Text>0 Meeting Preps</Text>
//           </Space>
//         </Card>
//       </Col>

//       <Col span={8}>
//         <Card style={cardStyle} hoverable>
//           <Space>
//             <CheckOutlined style={{ color: "#3ccf4e", fontSize: 18 }} />
//             <Text>0 Tasks</Text>
//           </Space>
//         </Card>
//       </Col>

//       <Col span={8}>
//         <Card style={cardStyle} hoverable>
//           <Space>
//             <StarOutlined style={{ color: "#ff42f5", fontSize: 18 }} />
//             <Text>0 AI Apps</Text>
//           </Space>
//         </Card>
//       </Col>
//     </Row>
//   );
// }