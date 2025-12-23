// "use client";

import { useState } from "react";
import { Card, Typography, Flex, Switch, Divider, Button } from "antd";
import {
    StarFilled,
    CalendarOutlined,
    GlobalOutlined,
    PlusOutlined,
    RightOutlined,
    CheckCircleFilled,
    CloseOutlined,
    SlackOutlined,
} from "@ant-design/icons";
import CalendarSettingsModal from "./CalendarSettingsModal";

const { Text } = Typography;

export default function PanelContent({ onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = (values) => {
        console.log("Saved settings:", values);
        setIsModalOpen(false);
    };


    return (
        <div style={{ marginTop: 10 }}>
            {/* FIREFLIES HEADER */}
            <div
                style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 8,
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Flex align="center" gap={10}>
                    <SlackOutlined />
                    <span
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "black",
                        }}
                    >
                        Fireflies Notetaker
                    </span>
                </Flex>

                <CloseOutlined
                    onClick={onClose}
                    style={{
                        fontSize: 18,
                        cursor: "pointer",
                        color: "black",
                    }}
                />
            </div>

            <div style={{ color: "#6B7280" }}>
                {/* Card 1 - Unlimited Transcripts */}
                <Card
                    style={{
                        borderRadius: 10,
                        marginBottom: 18,
                        background: "#F7FFFB",
                        borderColor: "#D3F7E6",
                    }}
                >
                    <Flex align="center" justify="space-between">
                        <Flex align="center" gap={10}>
                            <StarFilled style={{ color: "#30CF86", fontSize: 18 }} />
                            <Text strong style={{ color: "#374151" }}>Get unlimited transcripts</Text>
                            <Text style={{ color: "#30CF86", fontSize: 12 }}>FREE</Text>
                        </Flex>
                        <Switch defaultChecked disabled={disabled} />
                    </Flex>
                </Card>

                {/* Card 2 - Calendar meeting settings - CLICKABLE */}
                <Card
                    style={{
                        borderRadius: 10,
                        marginBottom: 18,
                        cursor: "pointer",
                    }}
                    onClick={showModal}
                    hoverable
                >
                    <Flex align="center" justify="space-between">
                        <Flex align="center" gap={12}>
                            <CalendarOutlined style={{ fontSize: 18, color: "#555" }} />
                            <div>
                                <Text strong style={{ color: "#374151" }}>Calendar meeting settings</Text>
                                <CheckCircleFilled style={{ color: "#3DD68C", fontSize: 17, marginLeft: 12 }} />
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Chose auto-join and share settings
                                </Text>
                            </div>
                        </Flex>
                        <RightOutlined />
                    </Flex>
                </Card>

                {/* Card 3 - Meeting Language */}
                <Card
                    style={{
                        borderRadius: 10,
                        marginBottom: 25,
                    }}
                    onClick={showModal}
                    hoverable
                >
                    <Flex align="center" gap={12}>
                        <GlobalOutlined style={{ fontSize: 18, color: "#555" }} />
                        <div>
                            <Text strong style={{ color: "#374151" }}>Meeting language</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                English (Global)
                            </Text>
                        </div>
                    </Flex>
                </Card>

                {/* Upcoming Meetings Header */}
                <Flex align="center" justify="space-between" style={{ marginBottom: 10 }}>
                    <Flex align="center" gap={8}>
                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png"
                            width={20}
                        />
                        <Text strong style={{ fontSize: 16, color: "#374151" }}>
                            Upcoming Meetings
                        </Text>
                    </Flex>

                    <Flex gap={15}>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            Join All
                        </Text>
                        <PlusOutlined style={{ color: "#6A4BFF" }} />
                    </Flex>
                </Flex>

                <Divider />

                {/* No meetings text */}
                <div style={{ textAlign: "center", marginTop: 10 }}>
                    <Text strong style={{ color: "#374151" }}>No meetings in the next week.</Text>
                    <br />
                    <Text type="secondary" style={{ color: "#6B7280" }}>
                        Schedule a meeting on your calendar or <br /> transcribe a live meeting.
                    </Text>
                </div>

                {/* Capture Button */}
                <div style={{ textAlign: "center", marginTop: 28, marginBottom: 40 }}>
                    <Button
                    onClick={()=> alert("hallo")}
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        style={{
                            background: "#6A4BFF",
                            height: 48,
                            paddingInline: 30,
                            fontSize: 16,
                            borderRadius: 12,
                            boxShadow: "0 4px 14px rgba(106,75,255,0.25)",
                        }}
                    >
                        Capture
                    </Button>
                </div>
            </div>

            {/* CALENDAR SETTINGS MODAL - Imported Component */}
            <CalendarSettingsModal
                open={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
            />
        </div>
    );
}