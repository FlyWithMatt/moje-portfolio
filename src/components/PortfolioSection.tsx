import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Language, VideoItem } from '../types';
import { portfolioVideos } from '../data/portfolioData';
import { translations } from '../data/translations';
import { VideoCard } from './VideoCard';

interface PortfolioSectionProps {
  lang: Language;
  onOpenModal: (video: VideoItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ lang, onOpenModal }) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [globalMuted, setGlobalMuted] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'resort', label: t.portfolio.filterResort },
    { id: 'city', label: t.portfolio.filterCity },
    { id: 'dining', label: t.portfolio.filterDining },
    { id: 'lifestyle', label: t.portfolio.filterLifestyle },
  ];

  const filteredVideos =
    activeCategory === 'all'
      ? portfolioVideos
      : portfolioVideos.filter((v) => v.category === activeCategory);

  const toggleGlobalMute = () => {
    setGlobalMuted((prev) => !prev);
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c6a87c]" />
              <span>{t.portfolio.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>4K 60FPS</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              {t.portfolio.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl mt-3 leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Quick Sound Toggle Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleGlobalMute}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              {globalMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-zinc-400" />
                  <span>{t.portfolio.unmuteAll}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#c6a87c]" />
                  <span className="text-[#e4d5b7]">{t.portfolio.muteAll}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Segmented Controls (interactive buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-800/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#e4d5b7] text-zinc-950 font-semibold shadow-sm'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 6-Video Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop (2 rows of 3 vertical videos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              lang={lang}
              onOpenModal={onOpenModal}
              globalMuted={globalMuted}
            />
          ))}
        </div>

        {/* Quiet audio & format note */}
        <div className="mt-12 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
          <span>{t.portfolio.soundNotice}</span>
          <span aria-hidden="true">·</span>
          <span>{t.portfolio.playHoverHint}</span>
        </div>
      </div>
    </section>
  );
};
