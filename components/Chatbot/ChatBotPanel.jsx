"use client";
import { useState, useRef, useEffect } from "react";
import { Typography, Input, Button, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function ChatBotPanel({ meetingId, userName = "User" }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]); // Chat history store karne ke liye
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom jab naya message aaye
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const suggestedQuestions = [
    { icon: "✨", text: "Can you provide a summary of this meeting?", color: "#8b5cf6" },
    { icon: "✨", text: "What are the key action items identified?", color: "#ec4899" },
    { icon: "✨", text: "What was the main topic of discussion?", color: "#f97316" }
  ];

  const handleSend = async (text = inputValue) => {
    const query = text.trim();
    if (!query) return;

    // 1. User message UI mein add karein
    const newMessages = [...messages, { role: "user", text: query }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      // 2. Backend call (Humein wahi endpoint hit karna hai jo humne banaya tha)
      const res = await fetch(`http://localhost:8000/ask-fred/${meetingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      });
      const data = await res.json();

      // 3. Fred ka answer UI mein add karein
      setMessages((prev) => [...prev, { role: "fred", text: data.answer }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "fred", text: "Bhai, server se connect nahi ho pa raha hoon." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto px-6 py-8" ref={scrollRef}>
        
        {/* Welcome Section (Sirf tab dikhe jab koi message na ho) */}
        {messages.length === 0 && (
          <>
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
                  onClick={() => handleSend(q.text)}
                  className="p-4 border border-gray-100 rounded-lg cursor-pointer flex items-center gap-3 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 transition-all"
                >
                  <span className="text-xl" style={{ color: q.color }}>{q.icon}</span>
                  <Text className="text-sm">{q.text}</Text>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Chat History Section */}
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-purple-100" : "bg-indigo-100"}`}>
                {msg.role === "user" ? <UserOutlined className="text-purple-600" /> : <RobotOutlined className="text-indigo-600" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[85%] ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                <Paragraph className="mb-0 text-[14px] leading-relaxed" style={{ color: 'inherit' }}>
                  {msg.text}
                </Paragraph>
              </div>
            </div>
          ))}
          
          {/* Loading Animation */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <RobotOutlined className="text-indigo-600" />
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <Spin size="small" /> <Text className="ml-2 text-gray-400">Fred is typing...</Text>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Ask Fred anything about this meeting..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={() => handleSend()}
            disabled={loading}
            className="rounded-lg py-2.5 border-gray-200 focus:border-purple-400"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSend()}
            loading={loading}
            className="h-auto px-5 bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}