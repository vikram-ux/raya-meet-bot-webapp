// @/components/Chatbot/ChatBotPanel.jsx
"use client";
import { useState } from "react";
import { Typography, Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function ChatBotPanel({ meetingId, userName = "User" }) {
  const [inputValue, setInputValue] = useState("");

  const suggestedQuestions = [
    { icon: "✨", text: "Are there plans for additional personalization tools?", color: "#8b5cf6" },
    { icon: "✨", text: "What user feedback led to the folder feature?", color: "#ec4899" },
    { icon: "✨", text: "What training will be provided to help users?", color: "#f97316" }
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    console.log("Asking Fred about:", meetingId, "Question:", inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-sm">
          <span className="text-2xl text-white">✨</span>
        </div>

        <Title level={3}>Hello, {userName}</Title>
        <Paragraph className="text-gray-500 text-[15px] mb-8">
          I am Fred your AI Assistant. I can answer questions from your meeting and generate summaries.
        </Paragraph>

        <Text strong className="block mb-4 text-sm">Try asking...</Text>
        
        <div className="space-y-3">
          {suggestedQuestions.map((q, index) => (
            <div
              key={index}
              onClick={() => setInputValue(q.text)}
              className="p-4 border border-gray-100 rounded-lg cursor-pointer flex items-center gap-3 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 transition-all"
            >
              <span className="text-xl" style={{ color: q.color }}>{q.icon}</span>
              <Text className="text-sm">{q.text}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            className="rounded-lg py-2"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            className="h-auto px-5 bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}