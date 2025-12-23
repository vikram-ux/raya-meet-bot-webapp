// "use client";

// export default function MeetingNavbar() {
//   return (
//     <header className="border-b border-gray-200 h-14 flex items-center px-4 sm:px-6 justify-between bg-white">

//       {/* LEFT SECTION (Meetings + Search) */}
//       <div className="flex items-center gap-6 lg:gap-10">

//         {/* Meetings Text */}
//         <p className="text-gray-700 font-semibold text-sm">
//           Meetings
//         </p>

//         {/* Search Input */}
//         <div className="hidden md:block w-[300px] lg:w-[380px] ml-8 lg:ml-16">
//           <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1.5 gap-2">

//             {/* Outline Search Icon */}
//             <svg width="18" height="18" stroke="currentColor" fill="none" className="text-gray-500">
//               <circle cx="8" cy="8" r="6" strokeWidth="1.6" />
//               <line x1="13" y1="13" x2="17" y2="17" strokeWidth="1.6" />
//             </svg>

//             <input
//               placeholder="Search by title or keyword"
//               className="text-sm w-full outline-none"
//             />
//           </div>
//         </div>

//       </div>

//       {/* RIGHT ACTIONS */}
//       <div className="flex items-center gap-4">

//         {/* Free meeting tag */}
//         <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-md font-medium">
//           1 Free meeting
//         </span>

//         {/* Upgrade Button */}
//         <button className="text-xs px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition">
//           Upgrade
//         </button>

//         {/* Capture Button */}
//         <button className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition">
//           {/* Camera Icon */}
//           <svg width="18" height="18" stroke="currentColor" fill="none" className="text-white">
//             <rect x="2" y="4" width="14" height="10" rx="2" strokeWidth="1.5" />
//             <path d="M15 4l-2-2H9.5L8 4" strokeWidth="1.5" />
//           </svg>
//           Capture
//           {/* Arrow Icon */}
//           <svg width="14" height="14" fill="none" stroke="currentColor" className="text-white">
//             <path d="M4 5l3 3 3-3" strokeWidth="1.6" strokeLinecap="round" />
//           </svg>
//         </button>

//         {/* Mic Icon */}
//         <svg width="20" height="20" fill="none" stroke="currentColor" className="text-gray-500 cursor-pointer">
//           <path d="M10 2a3 3 0 0 1 3 3v3a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" strokeWidth="1.5" />
//           <path d="M4 8v1a6 6 0 0 0 12 0V8" strokeWidth="1.5" />
//           <line x1="10" y1="14" x2="10" y2="18" strokeWidth="1.5" />
//           <line x1="7" y1="18" x2="13" y2="18" strokeWidth="1.5" />
//         </svg>

//         {/* Bell Icon */}
//         <svg width="20" height="20" fill="none" stroke="currentColor" className="text-gray-500 cursor-pointer">
//           <path d="M10 2C6.7 2 4 4.7 4 8v4l-1 2h14l-1-2V8c0-3.3-2.7-6-6-6Z" strokeWidth="1.5" />
//         </svg>

//         {/* Profile Avatar */}
//         <img
//           src="https://picsum.photos/200"
//           className="w-9 h-9 rounded-full border border-gray-300 object-cover"
//         />
//       </div>

//     </header>
//   );
// }
