import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Check } from 'lucide-react';

interface DeliverablesProps {
  lang: Language;
}

export const Deliverables: React.FC<DeliverablesProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="deliverables" className="py-20 md:py-28 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-3">
            {t.deliverables.kicker}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            {t.deliverables.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.deliverables.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#c6a87c]/15 text-[#e4d5b7] flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-[#c6a87c]" />
                </div>
                <h3 className="text-base font-medium text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
