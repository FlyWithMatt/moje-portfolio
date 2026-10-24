import { useState } from 'react';
import { Language, VideoItem } from './types';
import { portfolioVideos } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyUgc } from './components/WhyUgc';
import { Deliverables } from './components/Deliverables';
import { Process } from './components/Process';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [lang, setLang] = useState<Language>('pl');
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [prefilledStyle, setPrefilledStyle] = useState<string | undefined>(undefined);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'pl' ? 'en' : 'pl'));
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (video: VideoItem) => {
    setActiveModalVideo(video);
  };

  const handleCloseModal = () => {
    setActiveModalVideo(null);
  };

  const handleInquireStyle = (videoTitle: string) => {
    setPrefilledStyle(videoTitle);
    handleCloseModal();
    setTimeout(() => {
      scrollToContact();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] flex flex-col font-sans-clean antialiased selection:bg-[#c6a87c] selection:text-black">
      {/* 3-zone Top Bar Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenContact={scrollToContact}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Split-Screen Hero with 9:16 Video Showcase */}
        <Hero
          lang={lang}
          featuredVideo={portfolioVideos[0]}
          onOpenVideoModal={handleOpenModal}
          onScrollToPortfolio={scrollToPortfolio}
          onScrollToContact={scrollToContact}
        />

        {/* Portfolio Section with 6 Videos & Filters */}
        <PortfolioSection
          lang={lang}
          onOpenModal={handleOpenModal}
        />

        {/* Why Hotel UGC Breakdown */}
        <WhyUgc lang={lang} />

        {/* Deliverables / Package inclusions */}
        <Deliverables lang={lang} />

        {/* 3-Step Collaboration Roadmap */}
        <Process lang={lang} />

        {/* Minimalist Contact & Inquiry Section */}
        <ContactSection
          key={lang + (prefilledStyle || '')}
          lang={lang}
          prefilledStyle={prefilledStyle}
        />
      </main>

      {/* Quiet Minimalist Footer */}
      <Footer
        lang={lang}
        onToggleLang={toggleLanguage}
        onBackToTop={scrollToTop}
      />

      {/* Fullscreen Video Modal Lightbox */}
      <VideoModal
        video={activeModalVideo}
        allVideos={portfolioVideos}
        lang={lang}
        onClose={handleCloseModal}
        onSelectVideo={handleOpenModal}
        onInquireStyle={handleInquireStyle}
      />
    </div>
  );
}
