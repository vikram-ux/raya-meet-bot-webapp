// CalendarSettingsModal.jsx
"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Flex, Switch, Select, Typography } from "antd";
import { CalendarOutlined, GlobalOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CalendarSettingsModal({ open, onClose, onSave }) {
    const [autoJoin, setAutoJoin] = useState(true);
    const [autoJoinOption, setAutoJoinOption] = useState("All meetings with web-conf link");
    const [emailRecap, setEmailRecap] = useState("Everyone on the invite");
    const [meetingLanguage, setMeetingLanguage] = useState("English (Global)");

    // Switch off hone par automatically "Only when i invite open@meetbot.ai" select karo
    const handleAutoJoinChange = (checked) => {
        setAutoJoin(checked);
        if (!checked) {
            setAutoJoinOption("Only when i invite open@meetbot.ai");
        }
    };

    const handleSave = () => {
        onSave({
            autoJoin,
            autoJoinOption,
            emailRecap,
            meetingLanguage,
        });
    };

    return (
        <Modal
            title="Calendar Meeting Settings"
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    onClick={handleSave}
                    style={{
                        background: "#6A4BFF",
                        borderColor: "#6A4BFF",
                    }}
                >
                    Save
                </Button>,
            ]}
            width={600}
        >
            <div style={{ padding: "20px 0" }}>
                {/* Auto-join calendar meetings */}
                <Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
                    <Flex align="center" gap={12}>
                        <CalendarOutlined style={{ fontSize: 20, color: "#6A4BFF" }} />
                        <Text strong>Auto-join calendar meetings</Text>
                    </Flex>
                    <Switch checked={autoJoin} onChange={handleAutoJoinChange} />
                </Flex>

                {/* Dropdown hamesha dikhega, hide nahi hoga */}
                <Select
                    value={autoJoinOption}
                    onChange={setAutoJoinOption}
                    style={{ width: "100%", marginBottom: 24 }}
                    options={[
                        { value: "All meetings with web-conf link", label: "All meetings with web-conf link" },
                        { value: "Only meetings that I own", label: "Only meetings that I own" },
                        { value: "Only meetings with teammate", label: "Only meetings with teammate" },
                        { value: "Only when i invite open@meetbot.ai", label: "Only when i invite open@meetbot.ai" },
                    ]}
                />

                {/* Send email recap to */}
                <div style={{ marginBottom: 20 }}>
                    <Flex align="center" gap={12} style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 20 }}>✉️</span>
                        <Text strong>Send email recap to</Text>
                    </Flex>
                    <Select
                        value={emailRecap}
                        onChange={setEmailRecap}
                        style={{ width: "100%" }}
                        options={[
                            { value: "Everyone on the invite", label: "Everyone on the invite" },
                            { value: "Only me and participants from my Fireflies team", label: "Only me and participants from my Fireflies team" },
                            { value: "Only me", label: "Only me" },
                        ]}
                    />
                </div>

                {/* Meeting language */}
                <div>
                    <Flex align="center" gap={12} style={{ marginBottom: 8 }}>
                        <GlobalOutlined style={{ fontSize: 20, color: "#6A4BFF" }} />
                        <Text strong>Meeting language</Text>
                    </Flex>
                    <Select
                        value={meetingLanguage}
                        onChange={setMeetingLanguage}
                        style={{ width: "100%" }}
                        showSearch
                        placeholder="Search"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        popupMatchSelectWidth={false}
                        options={[
                            { value: "Afrikaans", label: "Afrikaans" },
                            { value: "Arabic", label: "Arabic" },
                            { value: "Bengali", label: "Bengali" },
                            { value: "Chinese", label: "Chinese" },
                            { value: "English (Global)", label: "English (Global)" },
                            { value: "French", label: "French" },
                            { value: "German", label: "German" },
                            { value: "Hindi", label: "Hindi" },
                            { value: "Japanese", label: "Japanese" },
                            { value: "Korean", label: "Korean" },
                            { value: "Portuguese", label: "Portuguese" },
                            { value: "Russian", label: "Russian" },
                            { value: "Spanish", label: "Spanish" },
                            { value: "Turkish", label: "Turkish" },
                            { value: "Urdu", label: "Urdu" },
                        ]}
                    />
                </div>
            </div>
        </Modal>
    );
}