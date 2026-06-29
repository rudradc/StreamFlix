import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Zap, RotateCcw, Star, Flame, Award } from 'lucide-react';
import { ListProvider, useList } from './context/ListContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MediaRow from './components/MediaRow';
import Background3D from './components/Background3D';
import BoomerangVideoBg from './components/BoomerangVideoBg';
import VideoPlayer from './components/VideoPlayer';
import DetailsModal from './components/DetailsModal';
import SettingsModal from './components/SettingsModal';
import MyList from './pages/MyList';
import NewAndPopular from './pages/NewAndPopular';
import AIRecommendations from './pages/AIRecommendations';
import UserDashboard from './pages/UserDashboard';
import BackButton from './components/BackButton';
import { trendingData, continueWatchingData, topPicksData } from './data/mockData';

// ── Home page with filtering support for TV Shows & Movies ───────────────────
const MOVIE_TITLES = [
  "Avengers: Endgame", "Inception", "The Dark Knight", "Parasite", "Interstellar", 
  "Fight Club", "The Lord of the Rings", "The Fellowship of the Ring", "The Matrix", 
  "The Dark Knight Rises", "Forrest Gump"
];

const isMovie = (item) => MOVIE_TITLES.includes(item.title);
const isTVShow = (item) => !isMovie(item);

function HomePage({ filterType = 'all' }) {
  const filterData = (data) => {
    if (filterType === 'movies') {
      return data.filter(isMovie);
    }
    if (filterType === 'tv-shows') {
      return data.filter(isTVShow);
    }
    return data;
  };

  return (
    <>
      <HeroBanner filterType={filterType} />

      {/* ── Section Divider — vibrant gradient strip separating banner from rows ── */}
      <div className="relative h-px w-full overflow-visible">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020204] via-[#020204]/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* ── Media Rows — clearly separated below banner ── */}
      <div className="relative z-10 pt-2 pb-16">
        {(filterType === 'tv-shows' || filterType === 'movies') && (
          <div className="px-8 pt-4">
            <BackButton />
          </div>
        )}
        <MediaRow title="Trending Now"         icon={<Zap />}    data={filterData(trendingData)}          type="trending" />
        <MediaRow title="Continue Watching"    icon={<RotateCcw />} data={filterData(continueWatchingData)} type="continue" />
        <MediaRow title="Top Picks for You"    icon={<Star />}   data={filterData(topPicksData)}          type="default"  />
        <MediaRow title="Award-Winning Dramas" icon={<Award />}  data={filterData([...topPicksData].reverse())} type="default" />
        <MediaRow title="Popular on StreamFlix" icon={<Flame />} data={filterData([...trendingData].reverse())} type="trending" />
      </div>
    </>
  );
}

// ── History Sync Helper for Modal Back Actions ───────────────────────────────
function HistorySync() {
  const { 
    activeDetails, closeDetails, 
    activeVideo, closeVideo, 
    activeSettings, closeSettings 
  } = useList();

  const [pushed, setPushed] = useState(false);

  useEffect(() => {
    const isOpen = !!activeDetails || !!activeVideo || activeSettings;
    
    if (isOpen && !pushed) {
      window.history.pushState({ modalOpen: true }, '');
      setPushed(true);
    } else if (!isOpen && pushed) {
      window.history.back();
      setPushed(false);
    }
  }, [activeDetails, activeVideo, activeSettings, pushed]);

  useEffect(() => {
    const handlePopState = (e) => {
      const isOpen = !!activeDetails || !!activeVideo || activeSettings;
      if (isOpen) {
        if (activeDetails) closeDetails();
        if (activeVideo) closeVideo();
        if (activeSettings) closeSettings();
        setPushed(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeDetails, activeVideo, activeSettings, closeDetails, closeVideo, closeSettings]);

  return null;
}

// ── Root App ─────────────────────────────────────────────────────────────────
import LandingPage from './pages/LandingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigate = (page) => {
    window.location.hash = '#' + page;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'landing';
      setCurrentPage(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial sync
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setCurrentPage(initialHash);
    } else {
      window.location.hash = '#landing';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let ctx;
    if (currentPage === 'home') {
      const timer = setTimeout(() => {
        ctx = gsap.context(() => {
          // Set initial hidden states to avoid flash of content
          gsap.set(['.gsap-nav-logo', '.gsap-nav-link', '.gsap-nav-right', '.gsap-hero-badge', '.gsap-hero-title', '.gsap-hero-meta', '.gsap-hero-desc', '.gsap-hero-btn', '.gsap-hero-right', '.gsap-media-card'], {
            opacity: 0
          });

          // Initialize positions
          gsap.set('.gsap-nav-logo', { x: -35 });
          gsap.set('.gsap-nav-link', { y: -25 });
          gsap.set('.gsap-nav-right', { x: 35 });
          gsap.set('.gsap-hero-badge', { scale: 0.8, y: 15 });
          gsap.set('.gsap-hero-title', { y: 35 });
          gsap.set('.gsap-hero-meta', { y: 20 });
          gsap.set('.gsap-hero-desc', { y: 15 });
          gsap.set('.gsap-hero-btn', { y: 15 });
          gsap.set('.gsap-hero-right', { scale: 0.8 });
          gsap.set('.gsap-media-card', { y: 40 });

          // Build the timeline
          const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

          tl.to('.gsap-nav-logo', { opacity: 1, x: 0, duration: 0.6 })
            .to('.gsap-nav-link', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, '-=0.45')
            .to('.gsap-nav-right', { opacity: 1, x: 0, duration: 0.6 }, '-=0.45')
            .to('.gsap-hero-badge', { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.5)', duration: 0.6 }, '-=0.35')
            .to('.gsap-hero-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.45')
            .to('.gsap-hero-meta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.65')
            .to('.gsap-hero-desc', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
            .to('.gsap-hero-btn', { opacity: 1, y: 0, duration: 0.6 }, '-=0.55')
            .to('.gsap-hero-right', { opacity: 1, scale: 1, duration: 0.6 }, '-=0.65')
            .to('.gsap-media-card', { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: 'power2.out' }, '-=0.75');
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        if (ctx) ctx.revert();
      };
    }
  }, [currentPage]);

  if (currentPage === 'landing') {
    return (
      <ListProvider>
        <LandingPage onEnter={() => navigate('home')} />
      </ListProvider>
    );
  }

  return (
    <ListProvider>
      <HistorySync />
      <div className="relative min-h-screen bg-[#020204] text-white font-sans overflow-x-hidden">
        {/* ── Hidden SVG filter for liquid-glass refraction (used via CSS filter:url(#liquid-glass-filter)) ── */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
          <defs>
            <filter id="liquid-glass-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="linearRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
              <feComposite in="blended" in2="SourceGraphic" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* ── Seamless Boomerang Video Background with Glass Transparent Overlay ── */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <BoomerangVideoBg
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4"
            className="w-full h-full object-cover opacity-60 scale-[1.02]"
          />
          {/* Glass overlay layer for modern frosted-glass transparent effect */}
          <div className="absolute inset-0 bg-[#020204]/40 backdrop-blur-[8px]" />
        </div>

        {/* Fixed navigation */}
        <Navbar currentPage={currentPage} onNavigate={navigate} />

        {/* Page content */}
        <div key={currentPage} className="animate-page-transition">
          {currentPage === 'home'        && <HomePage filterType="all" />}
          {currentPage === 'tv-shows'    && <HomePage filterType="tv-shows" />}
          {currentPage === 'movies'      && <HomePage filterType="movies" />}
          {currentPage === 'new-popular' && <NewAndPopular />}
          {currentPage === 'my-list'     && <MyList />}
          {currentPage === 'recommendations' && <AIRecommendations />}
          {currentPage === 'dashboard'   && <UserDashboard />}
        </div>

        {/* Footer gradient */}
        <div className="h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* Global Modals */}
        <DetailsModal />
        <VideoPlayer />
        <SettingsModal />
      </div>
    </ListProvider>
  );
}
