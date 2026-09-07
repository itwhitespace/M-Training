import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Subtitles, Bookmark } from 'lucide-react';

export const VideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const timerRef = useRef(null);

  const duration = video?.durationSeconds || 105;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, duration, playbackSpeed]);

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    setCurrentTime(Number(e.target.value));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const jumpToTimestamp = (timeStr) => {
    const [m, s] = timeStr.split(':').map(Number);
    setCurrentTime(m * 60 + s);
    setIsPlaying(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/90 shadow-lg shadow-indigo-500/5 mb-5">
      {/* Video Viewport */}
      <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group rounded-t-[28px]">
        <img
          src={video?.posterUrl}
          alt={video?.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : 'brightness-75'}`}
        />

        {isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none flex flex-col justify-between p-3.5">
            <div className="flex justify-between items-center">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span> PLAYING (SIMULATED STREAM)
              </span>
              <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold text-indigo-700 px-2.5 py-0.5 rounded-full">
                UNESCO Video
              </span>
            </div>

            {showCaptions && (
              <div className="self-center bg-black/85 backdrop-blur-sm text-indigo-100 text-xs px-3.5 py-1.5 rounded-xl text-center max-w-[85%] border border-indigo-500/30 shadow-lg">
                💬 {currentTime < 30 ? "การปฏิบัติตามแนวทาง PDPA ในโรงเรียน ถือเป็นหัวใจสำคัญของครูดิจิทัล..." : currentTime < 70 ? "ความคุ้มครองข้อมูลส่วนบุคคลของนักเรียน รวมถึงภาพถ่ายและคลิปวิดีโอกิจกรรม..." : "การสร้างข้อตกลงร่วมกันกับผู้ปกครอง จะช่วยให้การจัดกิจกรรมเป็นไปอย่างราบรื่น..."}
              </div>
            )}
          </div>
        )}

        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute z-10 w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 hover:bg-indigo-500"
          >
            <Play className="w-7 h-7 fill-current translate-x-0.5" />
          </button>
        )}

        {!isPlaying && (
          <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 to-transparent text-white">
            <span className="text-[10px] font-bold text-indigo-300 block uppercase tracking-wider">Video Component • {video?.durationStr} mins</span>
            <h4 className="text-xs font-semibold line-clamp-1">{video?.title}</h4>
          </div>
        )}
      </div>

      {/* Media Controls Bar */}
      <div className="p-3.5 bg-indigo-50/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono font-bold text-slate-500 w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <span className="text-[11px] font-mono font-bold text-slate-500 w-10 text-right">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-600 transition-colors border border-indigo-100"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-600 transition-colors border border-indigo-100"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${showCaptions ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-indigo-200 text-slate-600 bg-white'}`}
            >
              <Subtitles className="w-3 h-3 inline mr-1" /> CC
            </button>

            <button
              onClick={() => setPlaybackSpeed(prev => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))}
              className="px-2.5 py-1 rounded-full bg-white border border-indigo-200 text-slate-700 font-mono font-bold text-[10px]"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {video?.keyTimestamps && video.keyTimestamps.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-indigo-100">
            <div className="text-[10px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-indigo-600" /> หัวข้อสำคัญในวิดีโอ (ข้ามไปยังช่วงเวลา):
            </div>
            <div className="flex flex-wrap gap-1">
              {video.keyTimestamps.map((ts, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToTimestamp(ts.time)}
                  className="text-[10px] bg-white hover:bg-indigo-600 hover:text-white border border-indigo-100 px-2.5 py-1 rounded-full text-slate-700 font-medium transition-all shadow-sm flex items-center gap-1"
                >
                  <span className="font-mono text-indigo-600 hover:text-white font-bold">{ts.time}</span>
                  <span>{ts.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
