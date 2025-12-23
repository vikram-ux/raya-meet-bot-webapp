'use client';
import React, { useState } from 'react';

export default function DiscoverIntegrationsFilter() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Audio recording', 'Applicant tracking system', 'CRM'];

  return (
    <div className="w-full bg-white px-10 md:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Left Side: Filter Chips */}
      <div className="flex items-center gap-3 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg border text-[14px] font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-[#f5f3ff] border-[#6b46e5] text-[#6b46e5]' // Active state
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300' // Inactive state
            }`}
          >
            {filter}
          </button>
        ))}
        
        {/* More Dropdown Placeholder */}
        <button className="flex items-center gap-1 px-2 py-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-all">
          More 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Right Side: Search Bar */}
      <div className="relative w-full md:w-[320px]">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6b46e5] transition-all placeholder-gray-400"
        />
      </div>

    </div>
  );
}