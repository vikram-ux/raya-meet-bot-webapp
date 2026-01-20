"use client";
import { useState, useEffect } from "react";
import { Button, Tooltip } from 'antd';
import { 
  PlayCircleFilled, PauseCircleFilled, StepBackwardOutlined, StepForwardOutlined, 
  RetweetOutlined, DownloadOutlined, StarOutlined, CheckCircleOutlined, 
  LikeOutlined, DislikeOutlined 
} from '@ant-design/icons';

export default function AudioPlayer({ audioUrl, audioRef, isPlaying, setIsPlaying, handlePlayPause }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);

  const controlsDisabled = !audioUrl || audioLoading || audioError || duration === 0;

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onLoaded = () => { setDuration(audio.duration || 0); setAudioLoading(false); };
    const onTimeUpdate = () => { setCurrentTime(audio.currentTime || 0); };
    const onError = () => { setAudioError(true); setAudioLoading(false); };

    // --- NEW SYNC LOGIC ---
    const onPlay = () => {
      setIsPlaying(true);
      const seekTime = audio.dataset.seekTo;
      if (seekTime) {
        audio.currentTime = parseFloat(seekTime);
        delete audio.dataset.seekTo;
      }
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioUrl, audioRef]);

  return (
    <footer className="h-16 bg-white relative flex items-center justify-between px-6 text-gray-700 shadow-md z-[100]">
      <input
        type="range" min="0" max={duration || 0} value={currentTime}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (audioRef?.current && !controlsDisabled) { audioRef.current.currentTime = val; setCurrentTime(val); }
        }}
        disabled={controlsDisabled}
        className="absolute top-0 left-0 w-full h-1 accent-purple-600 cursor-pointer opacity-90 z-10"
      />
      <div className="relative z-20 text-sm font-medium text-gray-500 min-w-[200px]">
        {audioLoading && !audioError ? <span className="animate-pulse text-purple-500">Fetching audio...</span> : audioError ? <span className="text-red-400">Audio not available</span> : 
          <span className="font-mono text-gray-800 bg-gray-50 px-2 py-1 rounded border">{formatTime(currentTime)} / {formatTime(duration)}</span>}
      </div>
      <div className={`flex items-center gap-5 relative z-20 ${controlsDisabled ? "opacity-30" : ""}`}>
        <Button type="text" icon={<RetweetOutlined />} disabled={controlsDisabled} />
        <Button type="text" icon={<StepBackwardOutlined />} disabled={controlsDisabled} />
        <Button type="text" onClick={handlePlayPause} disabled={controlsDisabled} icon={isPlaying ? <PauseCircleFilled className="text-4xl text-purple-600" /> : <PlayCircleFilled className="text-4xl text-purple-600" />} className="h-auto p-0 border-none bg-transparent" />
        <Button type="text" icon={<StepForwardOutlined />} disabled={controlsDisabled} />
        <Button type="text" icon={<DownloadOutlined />} disabled={controlsDisabled} onClick={() => { if(audioUrl) window.open(audioUrl, "_blank") }} />
      </div>
      <div className="flex items-center gap-2 relative z-20">
        <Tooltip title="Star"><Button type="text" icon={<StarOutlined />} /></Tooltip>
        <Tooltip title="Check"><Button type="text" icon={<CheckCircleOutlined />} /></Tooltip>
        <div className="h-4 w-[1px] bg-gray-200 mx-1" />
        <Tooltip title="Like"><Button type="text" icon={<LikeOutlined />} /></Tooltip>
        <Tooltip title="Dislike"><Button type="text" icon={<DislikeOutlined />} /></Tooltip>
      </div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </footer>
  );
}