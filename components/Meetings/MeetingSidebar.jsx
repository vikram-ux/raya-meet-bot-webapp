"use client";

import { useState } from 'react';
import { SearchOutlined, UserOutlined, FolderOutlined, ShareAltOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Input, Switch } from 'antd';

export default function MeetingSidebar({ active, setActive }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChannelName('');
    setIsPrivate(false);
  };

  const handleCreate = () => {
    if (channelName.trim()) {
      console.log('Creating channel:', { name: channelName, private: isPrivate });
      // Yaha API call karoge channel create karne ke liye
      handleCancel();
    }
  };

  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col overflow-hidden">

        {/* Search Box */}
        <div className="px-4 py-3 h-14 border-b border-gray-200 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 w-full hover:border-purple-400 transition-colors">
            <SearchOutlined className="text-gray-400 text-sm" />
            <input 
              placeholder="Search channels" 
              className="text-sm w-full outline-none bg-transparent text-gray-700 placeholder-gray-400" 
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="text-gray-700 text-sm font-medium py-4 px-2">
          
          {/* My Meetings */}
          <div
            onClick={() => setActive("my")}
            className={`px-3 py-2.5 cursor-pointer rounded-md flex items-center gap-3 mb-1 transition-all ${
              active === "my" 
                ? "bg-purple-50 text-purple-700 font-semibold border-l-4 border-purple-600 pl-2" 
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <UserOutlined className={`text-base ${active === "my" ? "text-purple-600" : "text-gray-400"}`} />
            <span>My Meetings</span>
          </div>

          {/* All Meetings */}
          <div
            onClick={() => setActive("all")}
            className={`px-3 py-2.5 cursor-pointer rounded-md flex items-center gap-3 mb-1 transition-all ${
              active === "all" 
                ? "bg-purple-50 text-purple-700 font-semibold border-l-4 border-purple-600 pl-2" 
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <FolderOutlined className={`text-base ${active === "all" ? "text-purple-600" : "text-gray-400"}`} />
            <span>All Meetings</span>
          </div>

          {/* Shared With Me */}
          <div
            onClick={() => setActive("shared")}
            className={`px-3 py-2.5 cursor-pointer rounded-md flex items-center gap-3 mb-1 transition-all ${
              active === "shared" 
                ? "bg-purple-50 text-purple-700 font-semibold border-l-4 border-purple-600 pl-2" 
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            <ShareAltOutlined className={`text-base ${active === "shared" ? "text-purple-600" : "text-gray-400"}`} />
            <span>Shared With Me</span>
          </div>

        </nav>

        {/* Channels Section */}
        <div className="px-4 py-4 border-t border-gray-200 mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">All channels</p>
          </div>
          
          <div className="text-center py-6">
            <p className="text-sm text-gray-400 mb-3">Create channels to organize your conversations</p>
            <button 
              onClick={showModal}
              className="flex items-center gap-2 px-4 py-2 mx-auto text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <PlusOutlined className="text-xs" />
              <span>Channel</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Channel Creation Modal */}
      <Modal
        title="Channel Name"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={440}
        styles={{
          header: {
            paddingBottom: 16,
            marginBottom: 0
          },
          body: {
            paddingTop: 8
          }
        }}
      >
        <div className="space-y-4">
          {/* Input Field */}
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter channel name"
            size="large"
            className="w-full"
            onPressEnter={handleCreate}
          />

          {/* Make Private Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">Make Private</span>
            <Switch
              checked={isPrivate}
              onChange={setIsPrivate}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!channelName.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}