"use client";
import { Typography } from 'antd';

const LetterAvatar = ({ displayName, size }) => {
  const initials = displayName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  return <div className={`${size} rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{initials}</div>;
};

export default function TranscriptPanel({ transcript, search, audioRef, setIsPlaying }) {
  const handleSeek = (startTime) => {
    const audio = audioRef?.current;
    if (audio) {
      audio.dataset.seekTo = startTime; //
      audio.play().then(() => { if (setIsPlaying) setIsPlaying(true); }).catch(err => console.error("Playback error:", err));
    }
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => part.toLowerCase() === highlight.toLowerCase() ? <mark key={i} className="bg-yellow-200 text-gray-900 rounded-sm px-0.5">{part}</mark> : part)}
      </span>
    );
  };

  if (!transcript || transcript.length === 0) return <div className="p-10 text-center text-gray-400">No transcript available.</div>;

  return (
    <div className="px-6 py-4">
      {transcript.map((item, i) => {
        const isMatch = search && item.text.toLowerCase().includes(search.toLowerCase());
        return (
          <div key={i} onClick={() => handleSeek(item.start)} className={`py-3 flex border-b border-gray-100 transition cursor-pointer hover:bg-purple-50 group px-2 rounded-lg ${isMatch ? 'bg-yellow-50/50' : ''}`}>
            <div className="w-10 mr-3 mt-1"><LetterAvatar displayName={item.speaker} size="w-8 h-8" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">{item.speaker}</span>
                <span className="px-2 py-0.5 text-[10px] text-white bg-purple-600 rounded-full opacity-80">{Math.floor(item.start)}s → {Math.floor(item.end)}s</span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed">{getHighlightedText(item.text, search)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}