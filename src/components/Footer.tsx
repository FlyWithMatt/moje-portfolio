import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onToggleLang, onBackToTop }) => {
  const t = translations[lang];

  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b] py-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          <div>
            <span className="text-base font-semibold text-white tracking-wider block font-sans-clean">
              {t.nav.brand}
            </span>
            <p className="text-zinc-400 text-xs mt-1">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#portfolio" className="hover:text-white transition-colors">
              {t.nav.portfolio}
            </a>
            <a href="#why-ugc" className="hover:text-white transition-colors">
              {t.nav.whyUgc}
            </a>
            <a href="#deliverables" className="hover:text-white transition-colors">
              {t.nav.deliverables}
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              {t.nav.process}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#c6a87c]" />
              <span>{lang === 'pl' ? 'Wersja: Polski (PL)' : 'Language: English (EN)'}</span>
            </button>

            <button
              onClick={onBackToTop}
              className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400">
          <p>© {new Date().getFullYear()} {t.nav.brand}. {t.footer.rights}</p>
          <p className="font-mono text-[11px] text-zinc-400">
            Hotel Video & Social Reels Creator
          </p>
        </div>
      </div>
    </footer>
  );
};
