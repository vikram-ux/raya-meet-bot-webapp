'use client';

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <nav className="w-full bg-white border-b border-gray-100 h-[50px] flex items-center justify-center">
      <div className="flex space-x-12 h-full relative">
        {['discover', 'connected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-full flex items-center px-1 text-[15px] font-medium transition-colors duration-200 capitalize ${
              activeTab === tab ? 'text-[#8b5cf6]' : 'text-[#64748b] hover:text-gray-800'
            }`}
          >
            {tab === 'connected' ? 'Connected' : 'Discover'}
            
            {/* Exact Purple Underline as per Image */}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#a855f7] rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}