import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Language, VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
  lang: Language;
  onOpenModal: (video: VideoItem) => void;
  globalMuted: boolean;
  onToggleGlobalMute?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  lang,
  onOpenModal,
  globalMuted,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [localMuted, setLocalMuted] = useState(globalMuted);

  // Sync with global muted state if changed
  React.useEffect(() => {
    setLocalMuted(globalMuted);
    if (videoRef.current) {
      videoRef.current.muted = globalMuted;
    }
  }, [globalMuted]);

  const handleCardClick = () => {
    onOpenModal(video);
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !localMuted;
    videoRef.current.muted = next;
    setLocalMuted(next);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col cursor-pointer bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-3 sm:p-4 transition-all duration-300"
    >
      {/* 9:16 Video Canvas Container */}
      <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-zinc-800/60 shadow-lg mb-4">
        <video
          ref={videoRef}
          src={video.videoSrc}
          autoPlay
          loop
          muted={localMuted}
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Ambient measured gradient scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

        {/* Top actions: Duration & Audio toggle */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-auto">
          <span className="font-mono text-[11px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-zinc-300 border border-white/10 tabular-nums">
            {video.duration}
          </span>
          <button
            onClick={handleMuteToggle}
            aria-label={localMuted ? 'Włącz dźwięk' : 'Wycisz'}
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white transition-colors cursor-pointer"
          >
            {localMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#c6a87c]" />
            )}
          </button>
        </div>

        {/* Center Hover Action (Expand into Lightbox) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform group-hover:scale-105 transition-transform">
            <Maximize2 className="w-5 h-5 text-[#e4d5b7]" />
          </div>
        </div>

        {/* Bottom Micro-controls on card */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto text-xs text-zinc-300">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-1.5 bg-black/50 hover:bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10 transition-colors cursor-pointer text-[11px]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pauza</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-zinc-400">
            {lang === 'pl' ? 'Kliknij, by powiększyć' : 'Click to expand'}
          </span>
        </div>
      </div>

      {/* Typographic Metadata (Zero-Pills: clean text with dividers) */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex items-center gap-2 text-xs text-[#c6a87c] font-medium tracking-wide uppercase mb-1.5">
          <span>{video.categoryLabel[lang]}</span>
          <span aria-hidden="true">·</span>
          <span>9:16 Reel</span>
        </div>

        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#e4d5b7] transition-colors leading-snug mb-2">
          {video.title[lang]}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 font-light line-clamp-2 leading-relaxed mb-3">
          {video.description[lang]}
        </p>

        {/* Specs footer */}
        <div className="mt-auto pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <span className="truncate">{video.specs[lang]}</span>
          <span className="text-[#e4d5b7] group-hover:translate-x-0.5 transition-transform font-medium shrink-0 ml-2">
            →
          </span>
        </div>
      </div>
    </div>
  );
};
