import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Maximize,
} from 'lucide-react';
import { Language, VideoItem } from '../types';
import { translations } from '../data/translations';

interface VideoModalProps {
  video: VideoItem | null;
  allVideos: VideoItem[];
  lang: Language;
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
  onInquireStyle: (videoTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  allVideos,
  lang,
  onClose,
  onSelectVideo,
  onInquireStyle,
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Current video index
  const currentIndex = video ? allVideos.findIndex((v) => v.id === video.id) : -1;

  // Next / Previous helpers
  const handlePrev = () => {
    if (currentIndex <= 0) {
      onSelectVideo(allVideos[allVideos.length - 1]);
    } else {
      onSelectVideo(allVideos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= allVideos.length - 1) {
      onSelectVideo(allVideos[0]);
    } else {
      onSelectVideo(allVideos[currentIndex + 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, currentIndex]);

  // Reset video playback on source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [video?.videoSrc]);

  if (!video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header Bar inside Modal */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-mono text-[#c6a87c] font-semibold tabular-nums">
            {currentIndex + 1} / {allVideos.length}
          </span>
          <span aria-hidden="true">·</span>
          <span>{video.title[lang]}</span>
        </div>

        <button
          onClick={onClose}
          aria-label={t.modal.close}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition-colors text-xs font-medium cursor-pointer shadow-lg"
        >
          <span>{t.modal.close}</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Prev / Next Floating Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label={t.modal.prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 transition-all hover:scale-105 cursor-pointer shadow-xl"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label={t.modal.next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 transition-all hover:scale-105 cursor-pointer shadow-xl"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row items-center justify-center gap-6 z-10"
      >
        {/* 9:16 Video Player Container */}
        <div className="relative h-[65vh] sm:h-[75vh] lg:h-[80vh] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex items-center justify-center shrink-0">
          <video
            ref={videoRef}
            src={video.videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
            {/* Scrubber Range */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#c6a87c]"
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 hover:text-[#c6a87c] transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-[#c6a87c] transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#c6a87c]" />
                  )}
                </button>

                <span className="font-mono text-[11px] text-zinc-300 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>

              <span className="text-[11px] text-zinc-400 font-mono">
                {video.format}
              </span>
            </div>
          </div>
        </div>

        {/* Video Editorial Details Sidebar (Desktop / Tablet) */}
        <div className="hidden lg:flex flex-col justify-between max-w-sm w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 text-left shadow-2xl h-[80vh] overflow-y-auto">
          <div>
            {/* Category and specs */}
            <div className="flex items-center gap-2 text-xs text-[#c6a87c] font-medium tracking-wide uppercase mb-2">
              <span>{video.categoryLabel[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{video.specs[lang]}</span>
            </div>

            <h2 className="font-serif-luxury text-2xl font-normal text-white mb-4">
              {video.title[lang]}
            </h2>

            <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
              {video.description[lang]}
            </p>

            {/* Highlight quote */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-[#c6a87c] font-medium mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c6a87c]" />
                <span>
                  {lang === 'pl' ? 'Koncepcja i cel materiału' : 'Concept & Conversion Goal'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "{video.highlightQuote[lang]}"
              </p>
            </div>

            {/* Spec grid */}
            <div className="space-y-2.5 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span>{t.modal.format}:</span>
                <span className="text-zinc-200 font-mono">9:16 Vertical (Reels / TikTok)</span>
              </div>
              <div className="flex justify-between">
                <span>Rozdzielczość:</span>
                <span className="text-zinc-200 font-mono">4K Ultra HD (60fps)</span>
              </div>
              <div className="flex justify-between">
                <span>Dźwięk:</span>
                <span className="text-zinc-200">Spatial Audio & Sound Design</span>
              </div>
              <div className="flex justify-between">
                <span>{t.modal.duration}:</span>
                <span className="text-zinc-200 font-mono tabular-nums">{video.duration}</span>
              </div>
            </div>
          </div>

          {/* Direct Inquiry CTA button */}
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <button
              onClick={() => {
                onClose();
                onInquireStyle(video.title[lang]);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-zinc-950 bg-[#e4d5b7] hover:bg-[#ebdcc0] rounded-lg transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>{t.modal.inquireThisStyle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
