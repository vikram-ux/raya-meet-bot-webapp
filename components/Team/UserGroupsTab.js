import React from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
const { Title, Text } = Typography;

const Feature = ({ text }) => (
    <Space>
        <CheckOutlined style={{ color: '#6366f1' }} />
        <Text>{text}</Text>
    </Space>
);

const UserGroupsTab = () => {
    return (
        <Row justify="center">
            <Col style={{ maxWidth: 520, textAlign: 'center', paddingTop: 80 }}>
                <Image
                    src="https://app.fireflies.ai/img/user-groups-list-illustration.svg"
                    alt="User groups illustration"
                    width={340}
                    height={200}
                    priority
                    style={{
                        margin: "auto",
                        marginBottom: 42,
                        height: 'auto',
                    }}
                />


                <Title level={3}>Get access to user groups</Title>

                <Text type="secondary">
                    Easily share meetings with a particular group within your
                    organization.
                </Text>

                <Row gutter={[24, 16]} style={{ marginTop: 32, textAlign: 'center' }}>
                    <Col span={12}><Feature text="User Groups" /></Col>
                    <Col span={12}><Feature text="Unlimited AI Summaries" /></Col>
                    <Col span={12}><Feature text="Audio Recording" /></Col>
                    <Col span={12}><Feature text="Google Meet Integrations" /></Col>
                </Row>

                <Button
                    type="primary"
                    size="large"
                    style={{
                        marginTop: 50,
                        borderRadius: 8,
                        padding: '0 36px',
                        background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
                        border: 'none',
                    }}
                >
                    Upgrade to Business
                </Button>
            </Col>
        </Row>
    );
};

export default UserGroupsTab;
