import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Film, Maximize2 } from 'lucide-react';
import { Language, VideoItem } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  lang: Language;
  featuredVideo: VideoItem;
  onOpenVideoModal: (video: VideoItem) => void;
  onScrollToPortfolio: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  featuredVideo,
  onOpenVideoModal,
  onScrollToPortfolio,
  onScrollToContact,
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      {/* Subtle radial luxury illumination */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#32281e]/30 via-transparent to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Editorial Typography on Left, 9:16 Video Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean kicker - No static pills or badges */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-5">
              <Film className="w-3.5 h-3.5 text-[#c6a87c]" />
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>4K HDR</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.headlineStart}{' '}
              <span className="italic text-[#e4d5b7] font-medium underline decoration-zinc-700/60 decoration-1 underline-offset-8">
                {t.hero.headlineAccent}
              </span>{' '}
              {t.hero.headlineEnd}
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToPortfolio}
                className="px-6 py-3.5 text-sm font-medium text-zinc-950 bg-[#e4d5b7] hover:bg-[#ebdcc0] rounded-md transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToContact}
                className="px-6 py-3.5 text-sm font-medium text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                {t.hero.secondaryCta}
              </button>
            </div>

            {/* Trust note */}
            <div className="mt-8 flex items-center gap-3 text-xs text-zinc-400">
              <span className="text-[#c6a87c]">✓</span>
              <span>
                {lang === 'pl'
                  ? 'Formaty dedykowane na Instagram Reels, TikTok, YouTube Shorts & Meta Ads'
                  : 'Tailored for Instagram Reels, TikTok, YouTube Shorts & Meta Paid Ads'}
              </span>
            </div>
          </div>

          {/* Right Column: 5 cols - Cinematic 9:16 vertical video frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-[320px] sm:max-w-[340px]">
              {/* Outer decorative hairline glow */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#c6a87c]/20 to-transparent blur-md opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none"
                aria-hidden="true"
              />

              {/* 9:16 Video Container */}
              <div
                onClick={() => onOpenVideoModal(featuredVideo)}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl cursor-pointer"
              >
                <video
                  ref={videoRef}
                  src={featuredVideo.videoSrc}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Scrim overlay for controls and info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge: Clean text overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-auto">
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-zinc-200 border border-white/10 font-medium">
                    {t.hero.previewBadge}
                  </div>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-zinc-300" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#c6a87c]" />
                    )}
                  </button>
                </div>

                {/* Center Play/Pause toggle on click */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                    <Maximize2 className="w-6 h-6 text-[#e4d5b7]" />
                  </div>
                </div>

                {/* Bottom Video Meta & Controls */}
                <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-auto">
                  <div className="flex items-center gap-2 text-[11px] text-[#c6a87c] font-medium uppercase tracking-wider mb-1">
                    <span>{featuredVideo.categoryLabel[lang]}</span>
                    <span>·</span>
                    <span>{featuredVideo.duration}</span>
                  </div>
                  <h3 className="text-white font-medium text-base mb-1">
                    {featuredVideo.title[lang]}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mt-2 pt-2 border-t border-white/10">
                    <button
                      onClick={togglePlay}
                      className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pauza</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Odtwórz</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-zinc-400">
                      {isMuted ? t.hero.previewPlayNotice : 'Dźwięk aktywny'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Row Below the Hero Split: Production Standards */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#e4d5b7] tabular-nums">
                9:16
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 mt-1">
                {t.hero.stats.format}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-semibold text-zinc-100 tabular-nums">
                4K 60
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 mt-1">
                {t.hero.stats.resolution}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-semibold text-emerald-400 tabular-nums">
                100%
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 mt-1">
                {t.hero.stats.organic}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
