"use client";

import { useState } from "react";
import { Typography, Button, Modal, Select, Rate, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function FeedbackModal({ open, onClose, onSubmit }) {
  const [feedbackType, setFeedbackType] = useState(
    "I want to share something I liked"
  );
  const [feedbackCategory, setFeedbackCategory] = useState("Welcome Page");
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleCancel = () => {
    onClose();
    setFeedbackType("I want to share something I liked");
    setFeedbackCategory("Welcome Page");
    setRating(0);
    setFeedbackText("");
  };

  const handleSubmit = () => {
    onSubmit({
      type: feedbackType,
      category: feedbackCategory,
      rating,
      feedback: feedbackText,
    });
    handleCancel();
  };

  const typeOptions = [
    { value: "I want to share something I liked", label: "I want to share something I liked" },
    { value: "I have and idea or feature request", label: "I have and idea or feature request" },
    { value: "Something was unclear or hard to use", label: "Something was unclear or hard to use" },
  ];

  const categoryOptions = [
    { value: "Welcome Page", label: "Welcome Page" },
    { value: "Itegrations", label: "Itegrations" },
    { value: "Chrome Extention", label: "Chrome Extention" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "Live Assist V1", label: "Live Assist V1" },
    { value: "Meeting Status", label: "Meeting Status" },
    { value: "Other", label: "Other" },
  ];

  return (
    <Modal
      title="Share Feedback"
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      width={560}
      closeIcon={<CloseOutlined className="text-gray-500" />}
    >
      <div className="space-y-5">
        <div>
          <Text className="text-gray-600">
            We'd love to hear your thoughts! Share your feedback with us and help us improve our product.
          </Text>
          <div className="mt-2">
            <Text className="text-gray-500 text-sm">Need support? </Text>
            <Link href="#" className="text-purple-600 text-sm">
              Chat with our team
            </Link>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type:
          </label>
          <Select
            value={feedbackType}
            onChange={setFeedbackType}
            options={typeOptions}
            size="large"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <Select
            value={feedbackCategory}
            onChange={setFeedbackCategory}
            options={categoryOptions}
            size="large"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate your experience:
          </label>
          <Rate
            value={rating}
            onChange={setRating}
            style={{ fontSize: 28 }}
          />
        </div>

        <div>
          <TextArea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Share anything you would like..."
            rows={4}
            style={{ resize: "none" }}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={handleCancel} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={rating === 0}
            size="large"
            style={{
              backgroundColor: "#7c3aed",
              borderColor: "#7c3aed",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
