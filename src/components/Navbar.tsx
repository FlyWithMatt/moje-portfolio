import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenContact }) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0c0e]/90 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line text element) */}
        <a
          href="#"
          className="text-base sm:text-lg font-semibold tracking-wider text-zinc-100 hover:text-white transition-colors whitespace-nowrap shrink-0 font-sans-clean"
        >
          {t.nav.brand}
        </a>

        {/* Zone 2: Navigation Links (single line, no wrapping) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-zinc-400">
          <a
            href="#portfolio"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.portfolio}
          </a>
          <a
            href="#why-ugc"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.whyUgc}
          </a>
          <a
            href="#deliverables"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.deliverables}
          </a>
          <a
            href="#process"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.process}
          </a>
        </nav>

        {/* Zone 3: Primary Action + Language Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher button */}
          <button
            onClick={onToggleLang}
            aria-label={t.nav.langAria}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#c6a87c]" />
            <span className="font-semibold">{t.nav.switchLang}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenContact}
            className="group flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-950 bg-[#e4d5b7] hover:bg-[#ebdcc0] rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            <span>{t.nav.inquireBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
