import { EllipsisOutlined } from '@ant-design/icons';

export default function SmartNotesPanel() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Humne Index Tag Row wala div yahan se hata diya hai */}
      
      <div className="flex-1 overflow-y-auto p-5 pt-4 custom-scrollbar">
        
        {/* Sections Area */}
        <div className="space-y-4">
          
          {/* Notes Section - Now styled like Action Items */}
          <div className="group flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50 transition-all">
            <h4 className="text-[16px] font-medium text-[#1e293b] group-hover:text-purple-600">
              Notes
            </h4>
            <EllipsisOutlined className="text-gray-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Action Items Section */}
          <div className="group flex items-center justify-between cursor-pointer p-1 rounded bg-purple-50/50">
            <h4 className="text-[16px] font-medium text-purple-600">
              Action items
            </h4>
            {/* Action items par ellipsis hamesha dikhe ya hover par, dono options acche hain */}
            <EllipsisOutlined className="text-gray-400 text-lg opacity-100 group-hover:text-purple-600 transition-colors" />
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { 
          width: 4px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #f1f5f9; 
          border-radius: 10px; 
        }
      `}</style>
    </div>
  );
}