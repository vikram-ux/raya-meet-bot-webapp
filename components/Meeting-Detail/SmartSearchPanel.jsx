import { Collapse, Progress } from 'antd';
import { PlusOutlined, NumberOutlined } from '@ant-design/icons';

export default function SmartSearchPanel() {
  
  const items = [
    {
      key: '1',
      label: <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">AI Filters</span>,
      children: (
        <div className="grid grid-cols-2 gap-3 px-1 pb-2">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100/50">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" /> Date & Time
            </span>
            <span className="text-gray-400 text-xs">1</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100/50">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Metrics
            </span>
            <span className="text-gray-400 text-xs">4</span>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sentiments</span>,
      children: (
        <div className="space-y-2 px-1 pb-2">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Positive
            </span>
            <span className="text-gray-400 text-sm font-medium">50%</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-300" /> Neutral
            </span>
            <span className="text-gray-400 text-sm font-medium">50%</span>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Speaker Talktime</span>,
      children: (
        <div className="px-1 pb-2">
          <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-3 px-1">
             <span>SPEAKERS</span>
             <div className="flex gap-10">
               <span>WPM</span>
               <span>TALKTIME</span>
             </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-emerald-400 flex items-center justify-center text-white font-bold text-xs">V</div>
              <span className="text-[13px] font-bold text-gray-700 uppercase">Vikram Singh</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> 105
              </span>
              <div className="flex items-center gap-2">
                 <Progress type="circle" percent={100} size={20} strokeWidth={12} strokeColor="#7c3aed" showInfo={false} />
                 <span className="text-sm text-gray-500 font-medium">100%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Topic Trackers</span>,
      extra: <PlusOutlined className="text-gray-400 text-sm hover:text-purple-600 transition-colors" />,
      children: (
        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
          <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center mb-4">
             <NumberOutlined className="text-orange-400 text-xl" />
          </div>
          <h4 className="text-gray-800 font-bold text-[15px] mb-2">No topic tracker</h4>
          <p className="text-gray-400 text-[13px] leading-relaxed">
            This meeting is not transcribed yet to show keywords mentioned in the meeting.
          </p>
        </div>
      ),
    }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <Collapse 
        ghost 
        defaultActiveKey={['1', '2', '3', '4']} 
        expandIconPlacement="end"
        items={items}
        /* Custom CSS to add dividers between panels */
        className="search-panel-collapse"
      />

      <style jsx global>{`
        /* Har panel ke niche line add karne ke liye */
        .search-panel-collapse .ant-collapse-item {
          border-bottom: 1px solid #f0f0f0 !important;
        }
        .search-panel-collapse .ant-collapse-item:last-child {
          border-bottom: none !important;
        }
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}