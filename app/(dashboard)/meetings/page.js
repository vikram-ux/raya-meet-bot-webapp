// MeetingList.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout, Typography, Space, Spin, Result, Button, Modal, Input } from 'antd';
import MeetingSidebar from "@/components/Meetings/MeetingSidebar";
import LetterAvatar from "@/components/Ui/LetterAvatar";
import { useUser } from '@stackframe/stack';

import {
  CalendarOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  HolderOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  FolderOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  CloseOutlined,
  LoadingOutlined
} from '@ant-design/icons';


// ----------------------
// GROUPING FUNCTION (Unchanged)
// ----------------------
function groupMeetingsByWeek(meetings) {
  const grouped = {};

  meetings.forEach((m) => {
    const date = new Date(m.created_at || m.date);

    if (isNaN(date)) {
      return;
    }

    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    const weekStart = new Date(date);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(0, 0, 0, 0);

    const range = `${weekStart.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${weekEnd.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })}, ${weekEnd.getFullYear()}`;

    if (!grouped[range]) grouped[range] = [];
    grouped[range].push(m);
  });

  return grouped;
}

// ----------------------
// MAIN COMPONENT
// ----------------------

export default function MeetingList() {
  const user = useUser();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMeetings, setSelectedMeetings] = useState(new Set());
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [searchChannel, setSearchChannel] = useState('');
  const [channels, setChannels] = useState([]);

  async function fetchMeetings(userId) {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      // Hardcoded ID hata kar dynamic userId daali
      const response = await fetch(`http://localhost:8000/get_meeting_list?user_id=${userId}`);

      if (!response.ok) throw new Error("Failed to fetch meetings");

      const data = await response.json();
      const normalized = Array.isArray(data.meetings) ? data.meetings : [];
      setMeetings(normalized);

    } catch (err) {
      setError(err.message || "Error fetching data");
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  }

  // 2. Dependency array se extra brackets [[]] hataye
  useEffect(() => {
    if (user?.id) {
      fetchMeetings(user.id);
    }
  }, [user?.id]);

  const groupedMeetings = groupMeetingsByWeek(meetings);

  const toggleMeetingSelection = (meetingId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedMeetings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(meetingId)) {
        newSet.delete(meetingId);
      } else {
        newSet.add(meetingId);
      }
      return newSet;
    });
  };

  const handleMoveClick = () => {
    setIsMoveModalOpen(true);
  };

  const handleMoveCancel = () => {
    setIsMoveModalOpen(false);
    setSearchChannel('');
  };

  const handleCreateChannel = () => {
    console.log('Create new channel clicked');
    setIsMoveModalOpen(false);
  };

  // ------------------------------------
  // START: MODIFIED LOADING STATE (Fixing the 'tip' warning)
  // ------------------------------------
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Retained */}
        <MeetingSidebar active={activeTab} setActive={setActiveTab} />

        {/* Fix: Use an Ant Design Layout (or a div with appropriate height/width) 
                  and wrap the Spin content inside it. 
                  We will use the Ant Design Layout component here to ensure proper nesting 
                  for the 'tip' prop to work without warnings.
                */}
        <Layout style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <Spin
            // Set indicator to null to get the default dots spinner
            indicator={<LoadingOutlined style={{ fontSize: 48, color: '#7c3aed' }} spin />}
            size="large"
            // Added 'tip' prop for the text below the spinner
            tip={
              <span style={{
                color: '#7c3aed',
                fontSize: '20px',
                fontWeight: 600,
                display: 'block',
                marginTop: '16px'
              }}>
                Loading things up...
              </span>
            }
          >
            {/* Empty placeholder content to make Spin act as a wrapper */}
            <div style={{ height: 100, width: 200 }} />
          </Spin>
        </Layout>
      </div>
    );
  }

  // ------------------------------------
  // ERROR STATE (Ant Design Result) - Unchanged
  // ------------------------------------
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <MeetingSidebar active={activeTab} setActive={setActiveTab} />
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Result
            status="error"
            title="Failed to Load Meeting Data"
            subTitle={error}
            extra={[
              <Button
                type="primary"
                key="retry"
                onClick={fetchMeetings}
                style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
              >
                Try Again
              </Button>
            ]}
          />
        </div>
      </div>
    );
  }

  // ------------------------------------
  // RENDER MAIN UI
  // ------------------------------------
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <MeetingSidebar active={activeTab} setActive={setActiveTab} />

      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* MAIN Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">

          {/* ---------------- ALL MEETINGS UI ---------------- */}
          {activeTab === "all" && (
            <div className="max-w-full h-full">

              {/* Column Headers - Changes when meetings are selected */}
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                {selectedMeetings.size > 0 ? (
                  // Selection mode header
                  <div className="flex items-center justify-between px-8 py-4 bg-blue-50">
                    <div className="flex items-center gap-3">
                      <FolderOutlined className="text-blue-600 text-lg" />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedMeetings.size} meeting{selectedMeetings.size > 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <button
                      onClick={handleMoveClick}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <ArrowRightOutlined />
                      <span>Move</span>
                    </button>
                  </div>
                ) : (
                  // Normal header
                  <div className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wide py-4 px-8">
                    <div className="flex items-center gap-4" style={{ width: '45%' }}>
                      <span className="w-6"></span>
                      <span className="w-6"></span>
                      MEETING
                    </div>
                    <div className="flex justify-between items-center" style={{ width: '55%' }}>
                      <span style={{ width: '25%' }} className="text-center">DATE</span>
                      <span style={{ width: '25%' }} className="text-center">TIME</span>
                      <span style={{ width: '25%' }} className="text-center">DURATION</span>
                      <span style={{ width: '15%' }}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Meetings Grouped by Week */}
              <div className="pb-8">
                {Object.keys(groupedMeetings)
                  .sort((a, b) => new Date(b.split(' - ')[0]) - new Date(a.split(' - ')[0]))
                  .map((range) => (
                    <div key={range} className="border-b border-gray-100">

                      {/* Week Header */}
                      <div className="px-8 py-3 bg-gray-50">
                        <p className="text-sm font-medium text-gray-700">
                          {range} · {groupedMeetings[range].length} Meeting{groupedMeetings[range].length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Meeting Items */}
                      <div>
                        {groupedMeetings[range].map((meeting) => {
                          const meetingDate = new Date(meeting.date || meeting.created_at);
                          const dateString = meetingDate.toLocaleDateString("en-US", {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          });
                          const timeString = meetingDate.toLocaleTimeString("en-US", {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          });

                          return (
                            <Link
                              href={`/meeting-detail/${meeting.meeting_id}`}
                              key={meeting.meeting_id}
                              className="flex items-center px-8 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 group"
                            >
                              {/* Left Section */}
                              <div className="flex items-center gap-3" style={{ width: '45%' }}>
                                {/* Drag Handle - Only visible on hover */}
                                <HolderOutlined className="text-gray-300 text-base cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Checkbox - Visible on hover or when selected */}
                                <div
                                  onClick={(e) => toggleMeetingSelection(meeting.meeting_id, e)}
                                  className={`cursor-pointer transition-opacity ${selectedMeetings.has(meeting.meeting_id)
                                      ? 'opacity-100'
                                      : 'opacity-0 group-hover:opacity-100'
                                    }`}
                                >
                                  {selectedMeetings.has(meeting.meeting_id) ? (
                                    <CheckSquareOutlined className="text-blue-600 text-lg" />
                                  ) : (
                                    <BorderOutlined className="text-gray-300 text-lg hover:text-blue-600" />
                                  )}
                                </div>

                                {/* Avatar */}
                                <LetterAvatar
                                  displayName={meeting.bot_display_name}
                                  size="w-11 h-11"
                                />

                                {/* Meeting Info */}
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {meeting.meeting_name || meeting.title || "Untitled Meeting"}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {meeting.bot_display_name || "Unknown User"}
                                  </p>
                                </div>
                              </div>

                              {/* Right Section */}
                              <div className="flex justify-between items-center" style={{ width: '55%' }}>
                                {/* Date */}
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600" style={{ width: '25%' }}>
                                  <CalendarOutlined className="text-gray-400" />
                                  <span>{dateString}</span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600" style={{ width: '25%' }}>
                                  <ClockCircleOutlined className="text-gray-400" />
                                  <span>{timeString}</span>
                                </div>

                                {/* Duration */}
                                <div className="text-sm text-gray-700 text-center" style={{ width: '25%' }}>
                                  {meeting.duration || "10 mins"}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-center gap-2" style={{ width: '15%' }}>
                                  <EllipsisOutlined className="text-gray-400 text-xl cursor-pointer hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <InfoCircleOutlined className="text-gray-400 text-lg cursor-pointer hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ---------------- MY MEETINGS UI ---------------- */}
          {activeTab === "my" && (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">My Meetings</h2>
              <p className="text-gray-600 mb-6">Only your hosted meetings are shown.</p>

              {meetings.filter(m => m.user_id === user?.id).length === 0 && (
                <p className="text-gray-400 text-center mt-20">No personal meetings found.</p>
              )}

              <div className="space-y-4">
                {meetings
                  .filter(m => m.user_id === user?.id)
                  .map((meeting) => (
                    <Link
                    href={`/meeting-detail/${meeting.meeting_id}`}
                      key={meeting.meeting_id}
                      className="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-all flex justify-between items-center"
                    >
                      <div>
                        <p className="text-gray-900 font-semibold">{meeting.title}</p>
                        <p className="text-gray-500 text-sm mt-1">{meeting.date} • {meeting.time}</p>
                      </div>
                      <p className="text-purple-600 font-medium">{meeting.duration}</p>
                    </Link>
                  ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Move to Channel Modal */}
      <Modal
        title="Add meetings to channels"
        open={isMoveModalOpen}
        onCancel={handleMoveCancel}
        footer={null}
        centered
        width={520}
        closeIcon={<CloseOutlined className="text-gray-500" />}
      >
        <div className="space-y-6">
          {/* Search Input */}
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search channel"
            size="large"
            value={searchChannel}
            onChange={(e) => setSearchChannel(e.target.value)}
            className="w-full"
          />

          {/* Empty State */}
          <div className="text-center py-8">
            <div className="text-5xl text-gray-300 mb-4">#</div>
            <h3 className="text-base font-medium text-gray-800 mb-2">
              You don't have a channel yet!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Start by adding a new channel. It will show up right here.
            </p>
            <button
              onClick={handleCreateChannel}
              className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Create Channel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}








// // MeetingList.jsx

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Layout, Typography, Space, Spin, Result, Button, Modal, Input } from 'antd';
// import MeetingSidebar from "@/components/Meetings/MeetingSidebar";
// import LetterAvatar from "@/components/Meetings/LetterAvatar";

// import { 
//     CalendarOutlined, 
//     ClockCircleOutlined, 
//     EllipsisOutlined,
//     InfoCircleOutlined,
//     HolderOutlined,
//     CheckSquareOutlined,
//     BorderOutlined,
//     FolderOutlined,
//     ArrowRightOutlined,
//     SearchOutlined,
//     CloseOutlined,
//     LoadingOutlined
// } from '@ant-design/icons';


// // ----------------------
// // GROUPING FUNCTION (Unchanged)
// // ----------------------
// function groupMeetingsByWeek(meetings) {
//     const grouped = {};

//     meetings.forEach((m) => {
//         const date = new Date(m.created_at || m.date); 
        
//         if (isNaN(date)) {
//             return; 
//         }

//         const day = date.getDay();
//         const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
        
//         const weekStart = new Date(date);
//         weekStart.setDate(diff);
//         weekStart.setHours(0, 0, 0, 0);
        
//         const weekEnd = new Date(weekStart);
//         weekEnd.setDate(weekStart.getDate() + 6);
//         weekEnd.setHours(0, 0, 0, 0);

//         const range = `${weekStart.toLocaleString("en-US", {
//             month: "short",
//             day: "numeric",
//         })} - ${weekEnd.toLocaleString("en-US", {
//             month: "short",
//             day: "numeric",
//         })}, ${weekEnd.getFullYear()}`;

//         if (!grouped[range]) grouped[range] = [];
//         grouped[range].push(m);
//     });

//     return grouped;
// }

// // ----------------------
// // MAIN COMPONENT
// // ----------------------

// export default function MeetingList() {
//     const [meetings, setMeetings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState("all");
//     const [selectedMeetings, setSelectedMeetings] = useState(new Set());
//     const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
//     const [searchChannel, setSearchChannel] = useState('');
//     const [channels, setChannels] = useState([]); 

//     async function fetchMeetings() {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch("http://localhost:8000/get_meeting_list");

//             if (!response.ok) throw new Error("Failed to fetch meetings");

//             const data = await response.json();
//             const normalized = Array.isArray(data.meetings) ? data.meetings : [];
            
//             setMeetings(normalized); 
            
//         } catch (err) {
//             setError(err.message || "Error fetching data");
//             setMeetings([]);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchMeetings();
//     }, []);

//     const groupedMeetings = groupMeetingsByWeek(meetings);

//     const toggleMeetingSelection = (meetingId, e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setSelectedMeetings(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(meetingId)) {
//                 newSet.delete(meetingId);
//             } else {
//                 newSet.add(meetingId);
//             }
//             return newSet;
//         });
//     };

//     const handleMoveClick = () => {
//         setIsMoveModalOpen(true);
//     };

//     const handleMoveCancel = () => {
//         setIsMoveModalOpen(false);
//         setSearchChannel('');
//     };

//     const handleCreateChannel = () => {
//         console.log('Create new channel clicked');
//         setIsMoveModalOpen(false);
//     };

//     // ------------------------------------
//     // START: MODIFIED LOADING STATE (Ant Design Default Dots Spin + Text)
//     // ------------------------------------
//     if (loading) {
//         return (
//             <div className="flex h-screen bg-gray-50">
//                 {/* Sidebar - Retained */}
//                 <MeetingSidebar active={activeTab} setActive={setActiveTab} />
                
//                 {/* Centered Spin in the main content area */}
//                 <div className="flex flex-col w-full h-full items-center justify-center bg-white">
//                     <Spin 
//                         // Removed 'indicator' to use the default dots style, which matches the image
//                         size="large"
//                         // Added 'tip' prop for the text below the spinner
//                         tip={
//                             <span style={{ 
//                                 color: '#40a9ff', // Blue color for consistency with the dots
//                                 fontSize: '20px', 
//                                 fontWeight: 600, 
//                                 display: 'block', 
//                                 marginTop: '16px' 
//                             }}>
//                                 Loading things up...
//                             </span>
//                         }
//                     />
//                 </div>
//             </div>
//         );
//     }
    
//     // ------------------------------------
//     // ERROR STATE (Ant Design Result) - Unchanged
//     // ------------------------------------
//     if (error) {
//         return (
//             <div className="flex h-screen bg-gray-50">
//                 <MeetingSidebar active={activeTab} setActive={setActiveTab} />
//                 <div className="flex flex-col w-full h-full items-center justify-center">
//                     <Result
//                         status="error"
//                         title="Failed to Load Meeting Data"
//                         subTitle={error}
//                         extra={[
//                             <Button 
//                                 type="primary" 
//                                 key="retry" 
//                                 onClick={fetchMeetings}
//                                 style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
//                             >
//                                 Try Again
//                             </Button>
//                         ]}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     // ------------------------------------
//     // RENDER MAIN UI
//     // ------------------------------------
//     return (
//         <div className="flex h-screen bg-gray-50 overflow-hidden">
//             {/* Sidebar */}
//             <MeetingSidebar active={activeTab} setActive={setActiveTab} />

//             <div className="flex flex-col w-full h-full overflow-hidden">
//                 {/* MAIN Content Area */}
//                 <main className="flex-1 overflow-y-auto bg-white">

//                     {/* ---------------- ALL MEETINGS UI ---------------- */}
//                     {activeTab === "all" && (
//                         <div className="max-w-full h-full">
                            
//                             {/* Column Headers - Changes when meetings are selected */}
//                             <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
//                                 {selectedMeetings.size > 0 ? (
//                                     // Selection mode header
//                                     <div className="flex items-center justify-between px-8 py-4 bg-blue-50">
//                                         <div className="flex items-center gap-3">
//                                             <FolderOutlined className="text-blue-600 text-lg" />
//                                             <span className="text-sm font-medium text-gray-700">
//                                                 {selectedMeetings.size} meeting{selectedMeetings.size > 1 ? 's' : ''} selected
//                                             </span>
//                                         </div>
//                                         <button 
//                                             onClick={handleMoveClick}
//                                             className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
//                                         >
//                                             <ArrowRightOutlined />
//                                             <span>Move</span>
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     // Normal header
//                                     <div className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wide py-4 px-8">
//                                         <div className="flex items-center gap-4" style={{ width: '45%' }}>
//                                             <span className="w-6"></span>
//                                             <span className="w-6"></span>
//                                             MEETING
//                                         </div>
//                                         <div className="flex justify-between items-center" style={{ width: '55%' }}>
//                                             <span style={{ width: '25%' }} className="text-center">DATE</span>
//                                             <span style={{ width: '25%' }} className="text-center">TIME</span>
//                                             <span style={{ width: '25%' }} className="text-center">DURATION</span>
//                                             <span style={{ width: '15%' }}></span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Meetings Grouped by Week */}
//                             <div className="pb-8">
//                                 {Object.keys(groupedMeetings)
//                                     .sort((a, b) => new Date(b.split(' - ')[0]) - new Date(a.split(' - ')[0]))
//                                     .map((range) => (
//                                         <div key={range} className="border-b border-gray-100">

//                                             {/* Week Header */}
//                                             <div className="px-8 py-3 bg-gray-50">
//                                                 <p className="text-sm font-medium text-gray-700">
//                                                     {range} · {groupedMeetings[range].length} Meeting{groupedMeetings[range].length !== 1 ? 's' : ''}
//                                                 </p>
//                                             </div>

//                                             {/* Meeting Items */}
//                                             <div>
//                                                 {groupedMeetings[range].map((meeting) => {
//                                                     const meetingDate = new Date(meeting.date || meeting.created_at);
//                                                     const dateString = meetingDate.toLocaleDateString("en-US", { 
//                                                         weekday: 'short',
//                                                         month: 'short', 
//                                                         day: 'numeric' 
//                                                     });
//                                                     const timeString = meetingDate.toLocaleTimeString("en-US", { 
//                                                         hour: '2-digit', 
//                                                         minute: '2-digit', 
//                                                         hour12: true 
//                                                     });

//                                                     return (
//                                                         <Link
//                                                             href={`/meeting-detail/${meeting.meeting_id}`}
//                                                             key={meeting.meeting_id}
//                                                             className="flex items-center px-8 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 group"
//                                                         >
//                                                             {/* Left Section */}
//                                                             <div className="flex items-center gap-3" style={{ width: '45%' }}>
//                                                                 {/* Drag Handle - Only visible on hover */}
//                                                                 <HolderOutlined className="text-gray-300 text-base cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                
//                                                                 {/* Checkbox - Visible on hover or when selected */}
//                                                                 <div 
//                                                                     onClick={(e) => toggleMeetingSelection(meeting.meeting_id, e)}
//                                                                     className={`cursor-pointer transition-opacity ${
//                                                                         selectedMeetings.has(meeting.meeting_id) 
//                                                                             ? 'opacity-100' 
//                                                                             : 'opacity-0 group-hover:opacity-100'
//                                                                     }`}
//                                                                 >
//                                                                     {selectedMeetings.has(meeting.meeting_id) ? (
//                                                                         <CheckSquareOutlined className="text-blue-600 text-lg" />
//                                                                     ) : (
//                                                                         <BorderOutlined className="text-gray-300 text-lg hover:text-blue-600" />
//                                                                     )}
//                                                                 </div>

//                                                                 {/* Avatar */}
//                                                                 <LetterAvatar
//                                                                     displayName={meeting.bot_display_name}
//                                                                     size="w-11 h-11"
//                                                                 />

//                                                                 {/* Meeting Info */}
//                                                                 <div className="min-w-0 flex-1">
//                                                                     <p className="text-sm font-medium text-gray-900 truncate">
//                                                                         {meeting.meeting_name || meeting.title || "Untitled Meeting"}
//                                                                     </p>
//                                                                     <p className="text-sm text-gray-500 truncate">
//                                                                         {meeting.bot_display_name || "Unknown User"}
//                                                                     </p>
//                                                                 </div>
//                                                             </div>

//                                                             {/* Right Section */}
//                                                             <div className="flex justify-between items-center" style={{ width: '55%' }}>
//                                                                 {/* Date */}
//                                                                 <div className="flex items-center justify-center gap-2 text-sm text-gray-600" style={{ width: '25%' }}>
//                                                                     <CalendarOutlined className="text-gray-400" />
//                                                                     <span>{dateString}</span>
//                                                                 </div>

//                                                                 {/* Time */}
//                                                                 <div className="flex items-center justify-center gap-2 text-sm text-gray-600" style={{ width: '25%' }}>
//                                                                     <ClockCircleOutlined className="text-gray-400" />
//                                                                     <span>{timeString}</span>
//                                                                 </div>

//                                                                 {/* Duration */}
//                                                                 <div className="text-sm text-gray-700 text-center" style={{ width: '25%' }}>
//                                                                     {meeting.duration || "10 mins"}
//                                                                 </div>

//                                                                 {/* Actions */}
//                                                                 <div className="flex items-center justify-center gap-2" style={{ width: '15%' }}>
//                                                                     <EllipsisOutlined className="text-gray-400 text-xl cursor-pointer hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                                     <InfoCircleOutlined className="text-gray-400 text-lg cursor-pointer hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                                 </div>
//                                                             </div>
//                                                         </Link>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* ---------------- MY MEETINGS UI ---------------- */}
//                     {activeTab === "my" && (
//                         <div className="p-8">
//                             <h2 className="text-xl font-semibold text-gray-800 mb-2">My Meetings</h2>
//                             <p className="text-gray-600 mb-6">Only your hosted meetings are shown.</p>

//                             {meetings.filter(m => m.user === "Vikram").length === 0 && (
//                                 <p className="text-gray-400 text-center mt-20">No personal meetings found.</p>
//                             )}

//                             <div className="space-y-4">
//                                 {meetings
//                                     .filter(m => m.user === "Vikram")
//                                     .map((meeting) => (
//                                         <Link
//                                             href={`/meeting-detail/${meeting.meeting_id}`}
//                                             key={meeting.meeting_id}
//                                             className="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-all flex justify-between items-center"
//                                         >
//                                             <div>
//                                                 <p className="text-gray-900 font-semibold">{meeting.title}</p>
//                                                 <p className="text-gray-500 text-sm mt-1">{meeting.date} • {meeting.time}</p>
//                                             </div>
//                                             <p className="text-purple-600 font-medium">{meeting.duration}</p>
//                                         </Link>
//                                     ))}
//                             </div>
//                         </div>
//                     )}

//                 </main>
//             </div>

//             {/* Move to Channel Modal */}
//             <Modal
//                 title="Add meetings to channels"
//                 open={isMoveModalOpen}
//                 onCancel={handleMoveCancel}
//                 footer={null}
//                 centered
//                 width={520}
//                 closeIcon={<CloseOutlined className="text-gray-500" />}
//             >
//                 <div className="space-y-6">
//                     {/* Search Input */}
//                     <Input
//                         prefix={<SearchOutlined className="text-gray-400" />}
//                         placeholder="Search channel"
//                         size="large"
//                         value={searchChannel}
//                         onChange={(e) => setSearchChannel(e.target.value)}
//                         className="w-full"
//                     />

//                     {/* Empty State */}
//                     <div className="text-center py-8">
//                         <div className="text-5xl text-gray-300 mb-4">#</div>
//                         <h3 className="text-base font-medium text-gray-800 mb-2">
//                             You don't have a channel yet!
//                         </h3>
//                         <p className="text-sm text-gray-500 mb-6">
//                             Start by adding a new channel. It will show up right here.
//                         </p>
//                         <button
//                             onClick={handleCreateChannel}
//                             className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
//                         >
//                             Create Channel
//                         </button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// }