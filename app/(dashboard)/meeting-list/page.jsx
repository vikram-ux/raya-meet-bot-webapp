// // MeetingList.jsx

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// // import MeetingNavbar from "@/components/MeetingNavbar";
// import MeetingSidebar from "@/components/MeetingSidebar";
// import LetterAvatar from "@/components/LetterAvatar";

// // ----------------------
// // GROUPING FUNCTION
// // ----------------------
// function groupMeetingsByWeek(meetings) {
//   const grouped = {};

//   meetings.forEach((m) => {
//     // ⚠️ Note: 'created_at' या 'date' फ़ील्ड का उपयोग करें
//     const date = new Date(m.created_at || m.date); 
    
//     // Check if date is valid before proceeding
//     if (isNaN(date)) {
//         console.error("Invalid date found in meeting data:", m.created_at || m.date);
//         return; 
//     }

//     // Week calculation logic
//     const day = date.getDay();
//     // Monday as start of the week (adjusting Sunday=0 to be 7)
//     const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
    
//     const weekStart = new Date(date.setDate(diff));
//     const weekEnd = new Date(date.setDate(diff + 6));
    
//     // Normalize time to midnight to avoid issues with date comparison
//     weekStart.setHours(0, 0, 0, 0);
//     weekEnd.setHours(0, 0, 0, 0);


//     const range = `${weekStart.toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//     })} - ${weekEnd.toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//     })}, ${weekEnd.getFullYear()}`;

//     if (!grouped[range]) grouped[range] = [];
//     grouped[range].push(m);
//   });

//   return grouped;
// }

// export default function MeetingList() {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [activeTab, setActiveTab] = useState("all"); 

//   async function fetchMeetings() {
//     try {
//       // ⚠️ Note: यह मानते हुए कि Backend अब SORTED डेटा भेज रहा है (DESCENDING order)
//       const response = await fetch("http://localhost:8000/get_meeting_list");

//       if (!response.ok) throw new Error("Failed to fetch meetings");

//       const data = await response.json();
//       const normalized = Array.isArray(data.meetings) ? data.meetings : [];
      
//       // चूंकि Backend सॉर्ट कर रहा है, हम सीधे normalized डेटा का उपयोग करेंगे
//       setMeetings(normalized); 
      
//     } catch (err) {
//       setError(err.message || "Error fetching data");
//       setMeetings([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const groupedMeetings = groupMeetingsByWeek(meetings);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <MeetingSidebar active={activeTab} setActive={setActiveTab} />

//       <div className="flex flex-col w-full h-full">
//         {/* Navbar */}
//         {/* <div className="h-14 bg-white">
//           <MeetingNavbar />
//         </div> */}

//         {/* MAIN */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 py-6 px-4">

//           {/* ---------------- ALL MEETINGS UI ---------------- */}
//           {activeTab === "all" && (
//             <>
//               {/* Header Row */}
//               <div className="bg-white border border-gray-200 rounded-xl shadow-sm text-[13px] font-semibold text-gray-500 px-6 py-4 flex justify-between mb-4">
//                 <div className="w-1/3 flex items-center gap-3">MEETING</div>
//                 <div className="flex w-2/3 justify-between">
//                   <p>DATE</p>
//                   <p>TIME</p>
//                   <p>DURATION</p>
//                   <p></p>
//                 </div>
//               </div>

//               <div className="space-y-10">
//                 {/* 🚀 सुधार: groupedMeetings की keys (सप्ताह की श्रेणियों) को सॉर्ट करें */}
//                 {Object.keys(groupedMeetings)
//                     .sort((a, b) => new Date(b.split(' - ')[0]) - new Date(a.split(' - ')[0]))
//                     .map((range) => (
//                     <div key={range} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">

//                       <div className="px-6 py-4 text-sm font-semibold text-gray-700 bg-[#f2f5f8] border-b flex items-center gap-2">
//                         <span className="text-purple-500 text-base">📅</span>
//                         {range} · {groupedMeetings[range].length} Meetings
//                       </div>

//                       {groupedMeetings[range].map((meeting, idx) => {
//                           const meetingDate = new Date(meeting.date || meeting.created_at);
//                           const dateString = meetingDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
//                           const timeString = meetingDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });

//                           return (
//                             <Link
//                               href={`/meeting-detail/${meeting.meeting_id}`}
//                               key={meeting.meeting_id}
//                               className={`flex items-center justify-between px-6 py-4 ${idx % 2 !== 0 ? "bg-white" : "bg-gray-50"
//                                 } hover:bg-gray-100 hover:shadow-sm transition-all`}
//                             >
//                               <div className="w-1/3 flex items-center gap-4">
//                                 <span className="text-gray-400 cursor-grab">⋮⋮</span>
//                                 <input type="checkbox" className="cursor-pointer" />

//                                 {/* 🚀 Letter Avatar Component का उपयोग */}
//                                 <LetterAvatar
//                                   displayName={meeting.bot_display_name}
//                                   size="w-11 h-11" // Avatar का साइज़
//                                 />

//                                 <div>
//                                   {/* मीटिंग का शीर्षक (Topic) */}
//                                   <p className="text-gray-800 font-medium text-sm">
//                                     {meeting.meeting_name || meeting.title || "Untitled Meeting"}
//                                   </p>
//                                   {/* बॉट का नाम */}
//                                   <p className="text-gray-500 text-xs">
//                                     {meeting.bot_display_name || "Unknown User"}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex w-2/3 justify-between text-[13px] text-gray-600 items-center pr-2">
//                                 {/* 📅 DATE */}
//                                 <p className="flex items-center gap-1">📅 {dateString}</p>
//                                 {/* ⏰ TIME */}
//                                 <p className="flex items-center gap-1">⏰ {timeString}</p>
//                                 {/* ⏱️ DURATION */}
//                                 <p className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[12px] font-medium shadow-sm">
//                                   {meeting.duration || "10 mins"}
//                                 </p>
//                                 <button className="text-gray-400 hover:text-gray-600 text-xl">⋯</button>
//                               </div>
//                             </Link>
//                           );
//                         })}
//                       </div>
//                     ))}
//               </div>
//             </>
//           )}

//           {/* ---------------- MY MEETINGS UI ---------------- */}
//           {activeTab === "my" && (
//             <div className="mt-4">
//               <h2 className="text-xl font-semibold text-gray-800">My Meetings</h2>
//               <p className="text-gray-600 mb-6">Only your hosted meetings are shown.</p>

//               {meetings.filter(m => m.user === "Vikram").length === 0 && (
//                 <p className="text-gray-400 text-center mt-20">No personal meetings found.</p>
//               )}

//               <div className="space-y-4 mt-4">
//                 {meetings
//                   .filter(m => m.user === "Vikram")
//                   .map((meeting) => (
//                     <Link
//                       href={`/meeting-detail/${meeting.meeting_id}`}
//                       key={meeting.meeting_id}
//                       className="bg-white border rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all flex justify-between"
//                     >
//                       <div>
//                         <p className="text-gray-800 font-semibold">{meeting.title}</p>
//                         <p className="text-gray-500 text-sm">{meeting.date} • {meeting.time}</p>
//                       </div>
//                       <p className="text-purple-600 font-medium">{meeting.duration}</p>
//                     </Link>
//                   ))}
//               </div>
//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }