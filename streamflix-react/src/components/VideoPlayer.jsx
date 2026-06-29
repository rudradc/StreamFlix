import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, X, Maximize, Loader2 } from 'lucide-react';
import { useList } from '../context/ListContext';

export default function VideoPlayer() {
  const { activeVideo, closeVideo } = useList();
  
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressBarRef = useRef(null);
  const waitingTimeoutRef = useRef(null);

  // Map item ID to a high-quality public domain MP4 trailer loop
  const getVideoUrl = (id) => {
    // Premium high-resolution CORS-enabled CDN links that load instantly
    const videoUrls = [
      'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4',
      'https://photo-sphere-viewer-data.netlify.app/assets/equirectangular-video/Ayutthaya_HD.mp4',
      'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4',
      'https://vjs.zencdn.net/v/oceans.mp4'
    ];
    
    // Gracefully handle non-numeric or string IDs (e.g. "featured-peaky-blinders")
    let index = 0;
    if (typeof id === 'number') {
      index = id % videoUrls.length;
    } else if (typeof id === 'string') {
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
      }
      index = Math.abs(hash) % videoUrls.length;
    }
    return videoUrls[index];
  };

  // Sync volume and mute properties of the HTML5 video tag
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Clean up waiting timeout on unmount
  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
    };
  }, []);

  // Buffering loader event handlers to prevent flicker
  const handleWaiting = () => {
    if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
    waitingTimeoutRef.current = setTimeout(() => {
      setLoading(true);
    }, 450); // 450ms threshold
  };

  const handlePlaying = () => {
    if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
    setLoading(false);
  };

  // Reset state and autoplay when active video changes
  useEffect(() => {
    if (videoRef.current && activeVideo) {
      setLoading(true);
      setCurrentTime(0);
      videoRef.current.load();
      videoRef.current.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Autoplay prevented or failed:", error);
          setPlaying(false);
          setLoading(false);
        });
    }
  }, [activeVideo]);

  // Toggle playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (!videoRef.current.paused) {
      videoRef.current.pause();
    } else {
      setLoading(true);
      videoRef.current.play()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log("Playback failed:", error);
          setPlaying(false);
          setLoading(false);
        });
    }
  };

  // Auto-hide controls on mouse inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3200);
  };

  useEffect(() => {
    handleMouseMove();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [playing]);

  // Time formatter (MM:SS or HH:MM:SS)
  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    const pad = (val) => String(val).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  };

  // Click handler to seek through timeline
  const handleSeek = (e) => {
    if (!progressBarRef.current || !videoRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));
    const seekTime = ratio * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Go to native Fullscreen mode
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!activeVideo) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 bg-[#020204] z-50 flex flex-col justify-between select-none overflow-hidden animate-fadeIn"
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Cinematic blurred background stream texture */}
      <div className="absolute inset-0 z-0 opacity-35 blur-3xl scale-110 pointer-events-none transition-transform duration-700">
        <img
          src={activeVideo.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main active HTML5 Video Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <video
          ref={videoRef}
          src={getVideoUrl(activeVideo.id)}
          autoPlay
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onDurationChange={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onCanPlay={handlePlaying}
          onError={(e) => {
            console.error("Video error:", e);
            if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
            setLoading(false);
            setPlaying(false);
          }}
          onClick={togglePlay}
          className={`w-full h-full object-cover max-w-5xl max-h-[82vh] rounded-lg shadow-2xl transition-all duration-500 border border-white/5 ${
            playing ? 'scale-100 opacity-95 brightness-95' : 'scale-[0.98] opacity-50 brightness-[0.45]'
          }`}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        />
        
        {/* Buffer loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px] z-20 pointer-events-none">
            <Loader2 size={48} className="text-red-500 animate-spin" />
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase">Buffering Stream...</p>
          </div>
        )}
      </div>

      {/* ── TOP NAV BAR ── */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-black/95 via-black/50 to-transparent flex items-center justify-between transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={closeVideo}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
          <div>
            <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase">STREAMING NOW</span>
            <h2 className="text-white font-black text-lg leading-tight">{activeVideo.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-white/10 border border-white/15 rounded text-[10px] text-white/70 font-bold uppercase tracking-wider">
            {activeVideo.rating || 'PG-13'}
          </span>
          <span className="text-white/45 text-xs font-semibold">1080p Digital Direct</span>
        </div>
      </div>

      {/* ── CENTER BIG STATE CONTROLS ── */}
      {!loading && !playing && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 pointer-events-none">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/40 flex items-center justify-center hover:bg-white/20 hover:scale-105 hover:border-white transition-all cursor-pointer shadow-2xl animate-fadeIn pointer-events-auto"
          >
            <Play size={32} className="text-white fill-white ml-1.5" />
          </button>
        </div>
      )}

      {/* ── BOTTOM CONTROL CONSOLE ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Timeline Slider */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-white/50 text-xs font-mono w-12 text-right">
            {formatTime(currentTime)}
          </span>
          
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="flex-1 h-[6px] bg-white/15 rounded-full relative cursor-pointer group/timeline"
          >
            {/* Click/hover zone expander */}
            <div className="absolute -inset-y-2 left-0 right-0 cursor-pointer" />
            {/* Filled track */}
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Floating glow thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-white scale-0 group-hover/timeline:scale-100 transition-transform shadow-lg shadow-red-500/50" />
            </div>
          </div>

          <span className="text-white/50 text-xs font-mono w-12">
            -{formatTime(duration - currentTime)}
          </span>
        </div>

        {/* Buttons Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-red-500 transition-colors cursor-pointer"
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause size={20} className="fill-white" /> : <Play size={20} className="fill-white" />}
            </button>

            {/* Back 10s */}
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Skip back 10 seconds"
            >
              <RotateCcw size={18} />
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Skip forward 10 seconds"
            >
              <RotateCw size={18} />
            </button>

            {/* Mute/Volume controls */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0) setMuted(false);
                }}
                className="w-16 h-[3px] accent-red-600 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-200 group-hover/volume:w-20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleFullscreen}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
