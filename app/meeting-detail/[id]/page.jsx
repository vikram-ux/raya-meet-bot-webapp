"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumb, Button, Input, Tooltip } from 'antd';
import {
  MenuOutlined, EllipsisOutlined, SearchOutlined, ReadOutlined,
  SoundOutlined, MessageOutlined, TagOutlined, CloseOutlined,
  PlusOutlined, CheckCircleOutlined, BulbOutlined, HistoryOutlined
} from '@ant-design/icons';
import SmartSearchPanel from "@/components/Meeting-Detail/SmartSearchPanel";
import SmartNotesPanel from "@/components/Meeting-Detail/SmartNotesPanel";
import TranscriptPanel from "@/components/Transcript/TranscriptPanel";
import ChatBotPanel from "@/components/Chatbot/ChatBotPanel";
import AudioPlayer from "@/components/Audio/AudioPlayer";

export default function MeetingDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("transcript");
  const [search, setSearch] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [rightWidth, setRightWidth] = useState(30);
  const [dragging, setDragging] = useState(false);

  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:8000/get-meeting-details/${id}`);
        const json = await res.json();
        setData(json);
      } catch (error) { console.error("Fetch error:", error); }
    })();
  }, [id]);

  const transcript = data?.raw_json || [];
  const audioUrl = data?.meeting_id ? `http://localhost:8000/File/${data.meeting_id}/Combined_Meeting.wav` : null;

  const aiSummary = data?.ai_summary?.data;
  const overview = aiSummary?.overview;
  const keyPoints = aiSummary?.key_points || [];
  const actionItems = aiSummary?.action_items || [];

  const handlePlayPause = async () => {
    const audio = audioRef?.current;
    if (!audio) return;
    if (audio.paused) {
      try { await audio.play(); setIsPlaying(true); } catch (err) { console.error("Playback failed:", err); }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const onDrag = useCallback((e) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(55, Math.max(20, ((rect.width - (e.clientX - rect.left)) / rect.width) * 100));
    setRightWidth(pct);
  }, [dragging]);

  useEffect(() => {
    const stop = () => setDragging(false);
    const move = (e) => onDrag(e);
    window.addEventListener("mouseup", stop);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("mousemove", move);
    };
  }, [onDrag]);

  const sidebarItems = [
    { id: "search", icon: <SearchOutlined />, label: "Search" },
    { id: "notes", icon: <ReadOutlined />, label: "Smart Notes" },
    { id: "audio", icon: <SoundOutlined />, label: "Audio Logic" },
    { id: "chat", icon: <MessageOutlined />, label: "Comments" },
    { id: "bookmark", icon: <TagOutlined />, label: "Bookmarks" },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 font-sans">
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-2">
          <Button type="text" icon={<MenuOutlined />} />
          <Breadcrumb items={[
            { title: <span className="cursor-pointer font-medium text-gray-400 hover:text-purple-600" onClick={() => router.push('/meetings')}>Meetings</span> },
            { title: <span className="font-semibold text-gray-800">{data?.title || "Loading..."}</span> }
          ]} />
          <Button type="text" icon={<EllipsisOutlined />} />
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-purple-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition">Share</button>
          <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative bg-white" ref={containerRef}>
        <aside className="w-14 bg-white flex flex-col items-center py-4 gap-4 shrink-0 z-50 shadow-sm border-r border-gray-100">
          {sidebarItems.map((item) => (
            <Tooltip key={item.id} title={item.label} placement="right">
              <button
                onClick={() => setActivePanel(activePanel === item.id ? null : item.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 text-xl ${activePanel === item.id ? "bg-purple-50 text-purple-600 shadow-sm" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`}
              >
                {item.icon}
              </button>
            </Tooltip>
          ))}
        </aside>

        {activePanel && (
          <div className="w-80 bg-white flex flex-col shadow-lg z-40 border-r border-gray-200">
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base">
                {activePanel === 'search' && 'Smart Search'}
                {activePanel === 'notes' && 'Index'}
                {activePanel !== 'search' && activePanel !== 'notes' && sidebarItems.find(i => i.id === activePanel)?.label}
              </h3>
              <div className="flex items-center gap-1">
                <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => setActivePanel(null)} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {activePanel === "search" ? <SmartSearchPanel /> : activePanel === "notes" ? <SmartNotesPanel /> : <div className="p-6 text-gray-400 italic text-sm text-center">No content yet.</div>}
            </div>
          </div>
        )}

        <section className="flex-1 p-10 overflow-y-auto bg-white border-r border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-8">{data?.title || "Meeting Summary"}</h1>
            {!aiSummary ? (
              <div className="mt-8 text-gray-300 italic text-2xl animate-pulse">Analyzing content...</div>
            ) : (
              <div className="space-y-12 transition-all duration-500 fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                  <h3 className="flex items-center gap-2 text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-4"><HistoryOutlined /> Overview</h3>
                  <p className="text-gray-700 leading-relaxed text-xl font-medium italic">"{overview}"</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6"><BulbOutlined /> Key Discussions</h3>
                  <ul className="space-y-4">
                    {keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-600 text-lg group">
                        <span className="h-2 w-2 rounded-full bg-purple-400 mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6"><CheckCircleOutlined /> Action Items</h3>
                  <div className="grid gap-4">
                    {actionItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-purple-200 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-purple-500"><div className="w-3 h-3 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                          <span className="text-gray-800 font-bold text-lg">{item.task}</span>
                        </div>
                        <span className="text-[11px] font-black bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{item.owner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <div onMouseDown={() => setDragging(true)} className="w-1 bg-gray-50 hover:bg-purple-300 cursor-ew-resize transition-all shrink-0" />

        <section style={{ width: `${rightWidth}%` }} className="flex flex-col bg-white shrink-0">
          <div className="px-6 pt-5 pb-2">
            <div className="flex gap-8 text-sm font-bold mb-4">
              <button onClick={() => setActiveTab("transcript")} className={`pb-2 border-b-2 transition-all ${activeTab === "transcript" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-400"}`}>Transcript</button>
              <button onClick={() => setActiveTab("askfred")} className={`pb-2 border-b-2 transition-all ${activeTab === "askfred" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-400"}`}>AskFred</button>
            </div>
            {activeTab === "transcript" && (
              <Input placeholder="Find or Replace" prefix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} className="mb-2 rounded-lg" allowClear />
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === "transcript" ? (
              <TranscriptPanel transcript={transcript} search={search} audioRef={audioRef} setIsPlaying={setIsPlaying} />
            ) : (
              <ChatBotPanel meetingId={id} userName="User" />
            )}
          </div>
        </section>
      </main>

      <AudioPlayer 
        audioUrl={audioUrl} 
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        handlePlayPause={handlePlayPause} 
      />
    </div>
  );
}