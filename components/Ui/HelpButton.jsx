"use client";
import React, { useState } from 'react'; // state management ke liye
import { FloatButton, Popover, Tooltip, Menu } from 'antd';
import { 
  QuestionCircleOutlined, 
  CloseOutlined, // Cross icon import kiya
  BulbOutlined, 
  BookOutlined, 
  UsergroupAddOutlined, 
  SendOutlined, 
  MessageOutlined 
} from '@ant-design/icons';

const HelpButton = () => {
  // State to track if popover is open
  const [open, setOpen] = useState(false);

  // Popover open/close change handler
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const items = [
    { key: '1', label: "What's new?", icon: <BulbOutlined /> },
    { key: '2', label: "Help center", icon: <BookOutlined /> },
    { key: '3', label: "Fireflies Community", icon: <UsergroupAddOutlined /> },
    { type: 'divider' },
    { key: '4', label: "Give feedback", icon: <SendOutlined /> },
    { key: '5', label: "Contact support", icon: <MessageOutlined /> },
  ];

  const content = (
    <Menu
      items={items}
      style={{ border: 'none', width: 220 }}
      selectable={false}
      mode="vertical"
    />
  );

  return (
    <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
      <Tooltip title={open ? "" : "Help & resources"} placement="left">
        <Popover 
          content={content} 
          trigger="click" 
          placement="topLeft"
          arrow={false}
          styles={{ body: { padding: 0 } }}
          onOpenChange={handleOpenChange} // State update karega
        >
          <FloatButton
            // Agar open hai toh Close icon, warna Question icon
            icon={open ? <CloseOutlined /> : <QuestionCircleOutlined />}
            type="primary"
            style={{ 
              width: 50, 
              height: 50,
              transition: 'all 0.3s' // Smooth transition ke liye
            }}
          />
        </Popover>
      </Tooltip>
    </div>
  );
};

export default HelpButton;