import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ProcessProps {
  lang: Language;
}

export const Process: React.FC<ProcessProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="process" className="py-20 md:py-28 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-3">
            {t.process.kicker}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            {t.process.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {t.process.steps.map((st) => (
            <div
              key={st.step}
              className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl font-light text-[#c6a87c] tabular-nums block mb-6">
                  {st.step}
                </span>
                <h3 className="text-lg font-medium text-white mb-3">{st.name}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
