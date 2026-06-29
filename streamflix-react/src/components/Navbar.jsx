import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Play, X, Sparkles } from 'lucide-react';
import { useList } from '../context/ListContext';
import { trendingData, continueWatchingData, topPicksData } from '../data/mockData';

// Combine data for search indexing
const ALL_MEDIA = [
  ...trendingData,
  ...continueWatchingData,
  ...topPicksData
].filter((item, index, self) => 
  self.findIndex(i => i.id === item.id) === index
);

// Dynamic mock notifications
const NOTIFICATIONS = [
  {
    id: 'notif-1',
    message: 'New Season: Stranger Things 5 is now streaming.',
    time: '2 hours ago',
    movieId: 1,
  },
  {
    id: 'notif-2',
    message: 'Trending: Peaky Blinders has climbed to the #1 spot today.',
    time: '5 hours ago',
    movieId: 'featured-peaky-blinders',
  },
  {
    id: 'notif-3',
    message: 'Recommendation: Check out Sherlock, a top pick for you.',
    time: '1 day ago',
    movieId: 101,
  }
];

const findMovieById = (id) => {
  if (id === 'featured-peaky-blinders') {
    return {
      id: "featured-peaky-blinders",
      title: "Peaky Blinders",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=85",
      genre: "Crime Drama",
      rating: "TV-MA",
      match: 98,
      year: "2024",
      duration: "6 Seasons",
      desc: "A gangster family epic set in 1900s England..."
    };
  }
  return ALL_MEDIA.find(m => m.id === id);
};

const NAV_LINKS = [
  { label: 'Home',              page: 'home' },
  { label: 'TV Shows',          page: 'tv-shows' },
  { label: 'Movies',            page: 'movies' },
  { label: 'New & Popular',     page: 'new-popular' },
  { label: 'AI Recs',           page: 'recommendations' },
  { label: 'My List',           page: 'my-list' },
  { label: 'Browse by Language',page: 'home' },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { myList, activeProfile, selectProfile, showSettings, logout, showDetails } = useList();

  const searchResults = searchQuery
    ? ALL_MEDIA.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-6 right-6 z-50 px-6 sm:px-8 py-3 flex items-center justify-between rounded-full transition-all duration-300 ${
        scrolled ? 'glass-nav-scrolled shadow-2xl' : 'glass-nav-top shadow-lg'
      }`}
    >
      {/* Left — Logo + Nav */}
      <div className="flex items-center gap-8">
        {/* StreamFlix Logo — click goes home */}
        <button onClick={() => onNavigate('home')} className="gsap-nav-logo flex-shrink-0 focus:outline-none bg-transparent border-0 cursor-pointer">
          <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-[#e50914] flex items-center">
            STREAM<span className="text-white">FLIX</span><sup className="text-[10px] sm:text-xs font-semibold text-white/50 ml-0.5">TM</sup>
          </span>
        </button>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <li key={link.label} className="gsap-nav-link">
                <button
                  onClick={() => onNavigate(link.page)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-150 focus:outline-none border-0 bg-transparent cursor-pointer group ${
                    isActive ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.page === 'recommendations' && (
                    <Sparkles size={11} className="inline-block ml-1 text-amber-400 animate-pulse" />
                  )}
                  {/* My List badge */}
                  {link.page === 'my-list' && myList.length > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full">
                      {myList.length > 9 ? '9+' : myList.length}
                    </span>
                  )}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right — Search, Bell, Profile */}
      <div className="gsap-nav-right flex items-center gap-4">
        
        {/* Search Bar */}
        <div className={`relative flex items-center transition-all duration-300 ${searchOpen ? 'w-48 sm:w-64 bg-black/60 border border-white/20 px-2.5 py-1 rounded-md' : 'w-8 justify-center bg-transparent border-0'}`}>
          {searchOpen ? (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, genres..."
                className="bg-transparent border-none outline-none text-white text-xs w-full mr-2"
                autoFocus
              />
              <button 
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="text-white/40 hover:text-white bg-transparent border-0 cursor-pointer flex items-center justify-center p-0"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                setSearchOpen(true);
                setDropdownOpen(false);
                setNotificationsOpen(false);
              }}
              className="text-white/70 hover:text-white transition-colors bg-transparent border-0 cursor-pointer flex items-center justify-center" 
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          )}
        </div>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setSearchOpen(false);
              setDropdownOpen(false);
            }}
            className="relative text-white/70 hover:text-white transition-colors bg-transparent border-0 cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10" 
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
              
              <div className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-xl border border-white/10 bg-[#0c0a18]/90 backdrop-blur-xl p-3 shadow-2xl z-50 flex flex-col gap-2 text-xs text-white/80 animate-fadeIn">
                <div className="flex items-center justify-between px-1.5 py-1 border-b border-white/10 mb-1">
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Notifications</span>
                  <span className="text-[9.5px] text-emerald-400 font-bold hover:underline cursor-pointer" onClick={() => setNotificationsOpen(false)}>Mark all read</span>
                </div>
                
                <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => {
                    const movie = findMovieById(n.movieId);
                    return (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (movie) showDetails(movie);
                          setNotificationsOpen(false);
                        }}
                        className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-left font-medium"
                      >
                        {movie && (
                          <img src={movie.image} alt={movie.title} className="w-12 h-8 rounded object-cover flex-shrink-0 border border-white/10" />
                        )}
                        <div className="flex flex-col gap-0.5">
                          <p className="text-white/95 leading-tight">{n.message}</p>
                          <p className="text-white/40 text-[9px] font-medium">{n.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Interactive Dropdown Avatar */}
        <div className="relative">
          <div 
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setSearchOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-1 cursor-pointer group/profile"
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border backdrop-blur-md ${
                activeProfile === 'children' 
                  ? 'bg-emerald-500/40 border-emerald-300/50 shadow-[0_6px_12px_rgba(16,185,129,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.4)] text-emerald-50' 
                  : 'bg-red-500/40 border-red-300/50 shadow-[0_6px_12px_rgba(229,9,20,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.4)] text-red-50'
              }`}
              style={{ 
                fontFamily: '"Arial Black", Impact, sans-serif',
                fontSize: '22px',
                lineHeight: '1',
                paddingTop: '2px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)'
              }}
            >
              {activeProfile === 'children' ? 'C' : 'A'}
            </div>
            <ChevronDown size={13} className="text-white/60 group-hover/profile:rotate-180 transition-transform duration-200" />
          </div>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Invisible overlay to close dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              
              <div className="absolute right-0 mt-6 w-52 rounded-[24px] p-4 z-50 flex flex-col gap-1.5 text-xs text-white/80 animate-fadeIn font-sans bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_2px_8px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.5)]">
                {/* Animated X-Ray Skeleton Laser Scanner (optional, kept for aesthetic) */}
                <div className="skeleton-laser" />

                {/* Content Layer (perfectly stable text and items) */}
                <div className="relative z-10 flex flex-col gap-1.5">
                  <span className="px-2.5 py-0.5 text-[9px] uppercase font-black text-[#39ff14] tracking-[0.2em]" style={{ textShadow: '0 0 8px rgba(57, 255, 20, 0.4)' }}>
                    Skeletons
                  </span>
                  
                  {/* Switch to Adults */}
                  <button
                    onClick={() => { selectProfile('adults'); setDropdownOpen(false); }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/5 text-left border-0 bg-transparent text-white cursor-pointer w-full transition-all duration-200 group/item ${
                      activeProfile === 'adults' ? 'font-bold text-red-400' : 'font-bold text-white/70 hover:text-white'
                    }`}
                  >
                    <div className={`w-5.5 h-5.5 rounded bg-gradient-to-br from-red-500/20 to-red-800/10 border ${
                      activeProfile === 'adults' ? 'border-red-400' : 'border-white/20 group-hover/item:border-white/40'
                    } flex items-center justify-center text-[11px] font-black text-red-400 transition-colors shadow-sm`}>
                      💀
                    </div>
                    <span className="tracking-wide" style={activeProfile === 'adults' ? { textShadow: '0 0 8px rgba(239, 68, 68, 0.3)' } : {}}>Adult Skeletons</span>
                  </button>

                  {/* Switch to Children */}
                  <button
                    onClick={() => { selectProfile('children'); setDropdownOpen(false); }}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/5 text-left border-0 bg-transparent text-white cursor-pointer w-full transition-all duration-200 group/item ${
                      activeProfile === 'children' ? 'font-bold text-emerald-400' : 'font-bold text-white/70 hover:text-white'
                    }`}
                  >
                    <div className={`w-5.5 h-5.5 rounded bg-gradient-to-br from-emerald-500/20 to-teal-700/10 border ${
                      activeProfile === 'children' ? 'border-emerald-400' : 'border-white/20 group-hover/item:border-white/40'
                    } flex items-center justify-center text-[11px] font-black text-emerald-400 transition-colors shadow-sm`}>
                      👻
                    </div>
                    <span className="tracking-wide" style={activeProfile === 'children' ? { textShadow: '0 0 8px rgba(52, 211, 153, 0.3)' } : {}}>Baby Ghosts</span>
                  </button>

                  <div className="h-[1px] bg-white/10 my-1 mx-1.5" />

                  {/* Dashboard Button */}
                  <button
                    onClick={() => { onNavigate('dashboard'); setDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/5 text-left border-0 bg-transparent text-white/70 hover:text-white cursor-pointer w-full font-bold tracking-wide transition-all"
                  >
                    <span>User Dashboard 📊</span>
                  </button>

                  {/* Settings Button */}
                  <button
                    onClick={() => { showSettings(); setDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/5 text-left border-0 bg-transparent text-white/70 hover:text-white cursor-pointer w-full font-bold tracking-wide transition-all"
                  >
                    <span>Spooky Settings ⚙️</span>
                  </button>

                  {/* Log Out */}
                  <button
                    onClick={() => { logout(); onNavigate('landing'); setDropdownOpen(false); }}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-red-500/15 hover:text-red-300 text-left border-0 bg-transparent text-white/70 cursor-pointer w-full font-bold tracking-wide transition-all"
                  >
                    <span>Bail Out! 🏃‍♂️</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Results Overlay */}
      {searchQuery && (
        <div className="fixed inset-0 bg-[#020204]/95 backdrop-blur-xl z-[45] overflow-y-auto px-8 pt-24 pb-10 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white/60 text-sm font-semibold tracking-wider mb-6 text-left">
              Search results for "{searchQuery}"
            </h2>
            {searchResults.length === 0 ? (
              <p className="text-white/30 text-sm text-left font-medium">No matches found. Try searching for a different title or genre.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => { showDetails(item); setSearchQuery(''); setSearchOpen(false); }}
                    className="group/search-item cursor-pointer flex flex-col gap-2.5"
                  >
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10 group-hover/search-item:border-white/30 transition-all duration-300 shadow-md shadow-black/40 group-hover/search-item:scale-[1.03] group-hover/search-item:-translate-y-1">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/search-item:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center"><Play size={14} className="text-black fill-black ml-0.5" /></span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-xs truncate">{item.title}</p>
                      <p className="text-white/50 text-[10px] mt-0.5 font-medium">{item.genre} · {item.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
