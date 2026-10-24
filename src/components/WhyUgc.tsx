import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Eye, TrendingUp } from 'lucide-react';

interface WhyUgcProps {
  lang: Language;
}

export const WhyUgc: React.FC<WhyUgcProps> = ({ lang }) => {
  const t = translations[lang];

  const icons = [
    <Eye className="w-5 h-5 text-[#c6a87c]" key="eye" />,
    <TrendingUp className="w-5 h-5 text-[#c6a87c]" key="trending" />,
    <Compass className="w-5 h-5 text-[#c6a87c]" key="compass" />,
  ];

  return (
    <section id="why-ugc" className="py-20 md:py-28 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-3">
            {t.whyUgc.kicker}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            {t.whyUgc.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light mt-4 leading-relaxed">
            {t.whyUgc.subtitle}
          </p>
        </div>

        {/* 3-in-a-row Editorial Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {t.whyUgc.points.map((point, index) => (
            <div
              key={point.num}
              className="flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#c6a87c] font-semibold tabular-nums">
                  {point.num}.
                </span>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  {icons[index]}
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mb-3">
                {point.title}
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
