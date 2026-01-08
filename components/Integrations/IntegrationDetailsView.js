"use client";
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function IntegrationDetailsView({ app, onBack }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto p-8 md:p-12">
        
        {/* Header Section: Back Arrow + Logo + Info */}
        <div className="flex items-start gap-4 mb-10">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="mt-2 p-2 hover:bg-gray-100 rounded-full transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
          >
            <ArrowLeftOutlined style={{ fontSize: '20px', color: '#64748b' }} />
          </button>

          <div className="flex items-start gap-6">
            {/* App Logo */}
            <div className="w-16 h-16 flex items-center justify-center bg-white border rounded-2xl p-2 shadow-sm">
              <img src={app.logo} alt={app.name} className="w-full h-full object-contain" />
            </div>

            {/* Title & Short Desc */}
            <div>
              <h1 className="text-[24px] font-bold text-gray-900 m-0 leading-tight">
                {app.name}
              </h1>
              <p className="text-[15px] text-gray-500 mt-2 m-0 max-w-xl">
                {app.desc}
              </p>
            </div>
          </div>

          <div className="ml-auto">
             <Button type="primary" className="bg-[#6332E5] hover:!bg-[#5229bf] h-[40px] px-8 rounded-lg font-semibold border-none">
                Connect
             </Button>
          </div>
        </div>

        {/* Aligned Body Content */}
        <div className="pl-14"> 
          <div className="mb-10">
            <h2 className="text-[17px] font-bold mb-4 text-gray-800">Overview</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed max-w-4xl">
              {app.longDesc || `Record, transcribe, and search ${app.name} meetings effortlessly with Fireflies.`}
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-[16px] font-bold mb-6 text-gray-800">
              With {app.name} + Fireflies, you can:
            </h3>
            <div className="flex flex-col gap-5">
              {app.features?.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#86efac] text-green-900 rounded flex items-center justify-center font-bold text-[11px] mt-1">
                    {i + 1}
                  </div>
                  <p className="text-[15px] text-gray-600 m-0">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="text-[#6332E5] font-semibold flex items-center gap-2 hover:underline bg-transparent border-none cursor-pointer p-0">
             Guide <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}