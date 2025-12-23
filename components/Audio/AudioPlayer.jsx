"use client";
import { useState, useEffect } from "react";
import { Button, Tooltip } from 'antd';
import { 
  PlayCircleFilled, 
  PauseCircleFilled, 
  StepBackwardOutlined, 
  StepForwardOutlined, 
  RetweetOutlined, 
  DownloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  LikeOutlined,
  DislikeOutlined 
} from '@ant-design/icons';

export default function AudioPlayer({ audioUrl, audioRef, isPlaying, handlePlayPause }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);

  // Safely check if controls should be disabled
  const controlsDisabled = !audioUrl || audioLoading || audioError || duration === 0;

  // Time Formatter helper
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    setAudioLoading(true);
    setAudioError(false);

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setAudioLoading(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onError = () => {
      setAudioError(true);
      setAudioLoading(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("error", onError);
    };
  }, [audioUrl, audioRef]);

  return (
    <footer className="h-16 bg-white relative flex items-center justify-between px-6 text-gray-700  shadow-md z-[100]">
      {/* Seek Bar (Progress) */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (audioRef?.current && !controlsDisabled) {
            audioRef.current.currentTime = val;
            setCurrentTime(val);
          }
        }}
        disabled={controlsDisabled}
        className="absolute top-0 left-0 w-full h-1 accent-purple-600 cursor-pointer opacity-90 z-10"
      />

      {/* Status & Time Display */}
      <div className="relative z-20 text-sm font-medium text-gray-500 min-w-[200px]">
        {audioLoading && !audioError ? (
          <span className="animate-pulse flex items-center gap-2 text-purple-500">
            Fetching audio...
          </span>
        ) : audioError ? (
          <span className="text-red-400">Audio not available</span>
        ) : (
          <span className="font-mono text-gray-800 bg-gray-50 px-2 py-1 rounded border">
            {formatTime(currentTime)} <span className="text-gray-400">/</span> {formatTime(duration)}
          </span>
        )}
      </div>

      {/* Main Playback Controls */}
      <div className={`flex items-center gap-5 relative z-20 ${controlsDisabled ? "opacity-30 cursor-not-allowed" : ""}`}>
        <Tooltip title="Repeat">
          <Button type="text" icon={<RetweetOutlined />} disabled={controlsDisabled} className="text-lg" />
        </Tooltip>
        
        <Tooltip title="Previous">
          <Button type="text" icon={<StepBackwardOutlined />} disabled={controlsDisabled} className="text-xl" />
        </Tooltip>

        <Button 
          type="text"
          onClick={handlePlayPause} 
          disabled={controlsDisabled}
          icon={isPlaying ? 
            <PauseCircleFilled className="text-4xl text-purple-600" /> : 
            <PlayCircleFilled className="text-4xl text-purple-600" />
          }
          className="flex items-center justify-center hover:scale-110 transition-transform h-auto p-0 border-none bg-transparent"
        />

        <Tooltip title="Next">
          <Button type="text" icon={<StepForwardOutlined />} disabled={controlsDisabled} className="text-xl" />
        </Tooltip>

        <Tooltip title="Download">
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            disabled={controlsDisabled} 
            onClick={() => { if(audioUrl) window.open(audioUrl, "_blank") }}
            className="text-lg"
          />
        </Tooltip>
      </div>

      {/* Reactions & Feedback */}
      <div className="flex items-center gap-2 relative z-20">
        <Tooltip title="Star">
          <Button type="text" icon={<StarOutlined />} className="text-gray-400 hover:text-yellow-500" />
        </Tooltip>
        <Tooltip title="Check">
          <Button type="text" icon={<CheckCircleOutlined />} className="text-gray-400 hover:text-green-500" />
        </Tooltip>
        <div className="h-4 w-[1px] bg-gray-200 mx-1" />
        <Tooltip title="Like">
          <Button type="text" icon={<LikeOutlined />} className="text-gray-400 hover:text-blue-500" />
        </Tooltip>
        <Tooltip title="Dislike">
          <Button type="text" icon={<DislikeOutlined />} className="text-gray-400 hover:text-red-500" />
        </Tooltip>
      </div>

      {/* Audio Engine */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" key={audioUrl} />}
    </footer>
  );
}