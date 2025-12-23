"use client";
import { Typography } from 'antd';
const { Text } = Typography;

// Avatar Component (Internal helper)
const LetterAvatar = ({ displayName, size }) => {
  const initials = displayName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  return (
    <div className={`${size} rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
      {initials}
    </div>
  );
};

export default function TranscriptPanel({ transcript, search }) {
  // Filtering logic
  const filteredTranscript = transcript.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  if (transcript.length === 0) {
    return <div className="p-10 text-center text-gray-400">No transcript available.</div>;
  }

  return (
    <div className="px-6 py-4">
      {filteredTranscript.length > 0 ? (
        filteredTranscript.map((item, i) => {
          const segmentDuration = item.end - item.start;
          return (
            <div
              key={i}
              className="py-3 flex border-b border-gray-100  transition group"
            >
              <div className="w-10 mr-3 mt-1">
                <LetterAvatar displayName={item.speaker} size="w-8 h-8" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">
                    {item.speaker}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] text-white bg-purple-600 rounded-full opacity-80">
                    {Math.round(segmentDuration)}s
                  </span>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-10 text-center text-gray-400 italic">
          No results found for "{search}"
        </div>
      )}
    </div>
  );
}