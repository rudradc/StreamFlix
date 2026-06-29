import React, { useState } from 'react';
import { Play, Info, Plus, Check, Clock, Lock } from 'lucide-react';
import { useList } from '../context/ListContext';

const getLedStyles = (genre, title) => {
  const g = String(genre || '').toLowerCase();
  const t = String(title || '').toLowerCase();
  
  // Default Crimson Red
  let color = '#ff003c'; 
  let glow = 'rgba(255, 0, 60, 0.55)';
  let glowDim = 'rgba(255, 0, 60, 0.15)';
  let colorAlpha30 = 'rgba(255, 0, 60, 0.35)';

  if (
    g.includes('horror') || 
    g.includes('supernatural') || 
    g.includes('apocalyptic') || 
    g.includes('survival') || 
    g.includes('animation') ||
    t.includes('witcher') || 
    t.includes('last of us') || 
    t.includes('squid game') || 
    t.includes('rick and morty')
  ) {
    color = '#05ffc4'; // Neon Emerald Green
    glow = 'rgba(5, 255, 196, 0.55)';
    glowDim = 'rgba(5, 255, 196, 0.15)';
    colorAlpha30 = 'rgba(5, 255, 196, 0.35)';
  } else if (
    g.includes('sci-fi') || 
    g.includes('space') || 
    g.includes('mystery') || 
    t.includes('sherlock') || 
    t.includes('inception') || 
    t.includes('dark') || 
    t.includes('black mirror')
  ) {
    color = '#00d2ff'; // Cyber Electric Cyan
    glow = 'rgba(0, 210, 255, 0.55)';
    glowDim = 'rgba(0, 210, 255, 0.15)';
    colorAlpha30 = 'rgba(0, 210, 255, 0.35)';
  } else if (
    g.includes('fantasy') || 
    g.includes('adventure') || 
    g.includes('royal') || 
    g.includes('historical') ||
    t.includes('crown') || 
    t.includes('arcane') || 
    t.includes('succession')
  ) {
    color = '#ffaa00'; // Vibrant Amber Gold
    glow = 'rgba(255, 170, 0, 0.55)';
    glowDim = 'rgba(255, 170, 0, 0.15)';
    colorAlpha30 = 'rgba(255, 170, 0, 0.35)';
  } else if (
    g.includes('superhero') || 
    g.includes('action') || 
    g.includes('comedy') ||
    t.includes('avengers') || 
    t.includes('dark knight') || 
    t.includes('wednesday')
  ) {
    color = '#a020f0'; // Bright Electric Violet
    glow = 'rgba(160, 32, 240, 0.55)';
    glowDim = 'rgba(160, 32, 240, 0.15)';
    colorAlpha30 = 'rgba(160, 32, 240, 0.35)';
  }

  return {
    '--led-color': color,
    '--led-glow': glow,
    '--led-glow-dim': glowDim,
    '--led-color-alpha30': colorAlpha30,
  };
};

// ─── TRENDING CARD ────────────────────────────────────────────────────────────
export function TrendingCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToList, removeFromList, isInList, playVideo, showDetails, setFeaturedMovie, restrict18 } = useList();
  const listed = isInList(item.id);
  const isRestricted = restrict18 && (item.rating?.includes('MA') || item.rating?.includes('R'));

  const fallbackColors = [
    'from-red-900 to-red-950', 'from-yellow-900 to-amber-950',
    'from-indigo-900 to-indigo-950', 'from-blue-900 to-blue-950',
    'from-cyan-900 to-slate-950', 'from-gray-800 to-gray-950',
    'from-stone-800 to-stone-950', 'from-teal-900 to-teal-950',
  ];

  return (
    <div
      className="gsap-media-card relative flex-shrink-0 flex items-end group cursor-pointer"
      style={{ width: '350px', minWidth: '350px', maxWidth: '350px' }}
      onMouseEnter={() => {
        setHovered(true);
        if (!isRestricted) setFeaturedMovie(item);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (isRestricted) {
          e.stopPropagation();
          alert("Access Restricted: This title is rated 18+ (TV-MA / R) and is blocked under current profile parental controls.");
          return;
        }
        showDetails(item);
      }}
    >
      {/* Giant Rank Number behind card */}
      <div className="absolute left-0 bottom-0 z-0 select-none pointer-events-none" style={{ transform: 'translateX(-28%)' }} aria-hidden="true">
        <span className="rank-number">{item.rank}</span>
      </div>

      {/* Card wrapper to contain card and below-card meta */}
      <div className="flex flex-col ml-auto z-10" style={{ width: '260px' }}>
        {/* Card */}
        <div
          className="led-glow-card relative rounded-lg overflow-hidden transition-all duration-500 ease-out z-20"
          style={{ 
            width: '260px', 
            height: '146px',
            transform: hovered ? 'perspective(1000px) rotateX(6deg) rotateY(-8deg) scale(1.08) translateY(-8px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)',
            boxShadow: hovered ? '-15px 20px 35px rgba(0,0,0,0.6)' : '0 4px 10px rgba(0,0,0,0.3)',
            ...getLedStyles(item.genre, item.title)
          }}
        >
          {!imgError ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgError(true)} loading="lazy" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} flex items-center justify-center`}>
              <span className="text-white/30 text-xs font-bold text-center px-2">{item.title}</span>
            </div>
          )}
          <div className="absolute inset-0 card-gradient-overlay opacity-60" />

          {/* Hover overlay */}
          <div className={`absolute inset-0 flex flex-col justify-end p-3 transition-all duration-300 bg-gradient-to-t from-black/95 via-black/50 to-transparent ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            {isRestricted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Lock size={18} className="text-red-500 mb-1 animate-pulse" />
                <p className="text-white font-extrabold text-[11px] uppercase tracking-wide">Locked Content</p>
                <p className="text-white/40 text-[9px] mt-0.5 font-medium">18+ Parental Lock Active</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); playVideo(item); }}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors border-0 cursor-pointer"
                  >
                    <Play size={12} className="text-black fill-black ml-0.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); listed ? removeFromList(item.id) : addToList(item); }}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      listed ? 'border-white bg-white/20' : 'border-white/40 bg-black/40 hover:border-white/80'
                    }`}
                    title={listed ? 'Remove from My List' : 'Add to My List'}
                  >
                    {listed ? <Check size={11} strokeWidth={3} className="text-white" /> : <Plus size={12} className="text-white" />}
                  </button>
                </div>
                <p className="text-white font-bold text-xs leading-tight truncate">{item.title}</p>
                <p className="text-white/70 text-[10px] mt-0.5">{item.genre} · <span className="text-emerald-400 font-semibold">{item.match}% match</span></p>
              </>
            )}
          </div>
        </div>

        {/* Below-card meta */}
        <div className="mt-2.5 px-0.5 text-left">
          <p className="text-white/90 text-sm font-semibold truncate">{item.title}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white/50">
            <span className="text-emerald-400 font-bold text-[11px]">{item.match}% Match</span>
            <span>·</span>
            <span>{item.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTINUE WATCHING CARD ───────────────────────────────────────────────────
export function ContinueWatchingCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { playVideo, showDetails, setFeaturedMovie, restrict18 } = useList();
  const isRestricted = restrict18 && (item.rating?.includes('MA') || item.rating?.includes('R'));

  return (
    <div
      className="gsap-media-card relative flex-shrink-0 cursor-pointer group"
      style={{ width: '310px', minWidth: '310px', maxWidth: '310px' }}
      onMouseEnter={() => {
        setHovered(true);
        if (!isRestricted) setFeaturedMovie(item);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (isRestricted) {
          alert("Access Restricted: This title is rated 18+ (TV-MA / R) and is blocked under current profile parental controls.");
          return;
        }
        playVideo(item);
      }}
    >
      <div
        className="led-glow-card relative rounded-lg overflow-hidden transition-all duration-500 ease-out z-20"
        style={{ 
          height: '174px',
          transform: hovered ? 'perspective(1000px) rotateX(6deg) rotateY(-8deg) scale(1.08) translateY(-8px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)',
          boxShadow: hovered ? '-15px 20px 35px rgba(0,0,0,0.6)' : '0 4px 10px rgba(0,0,0,0.3)',
          ...getLedStyles(item.genre, item.title)
        }}
      >
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
            <span className="text-white/30 text-xs font-bold">{item.title}</span>
          </div>
        )}
        <div className="absolute inset-0 card-gradient-overlay" />

        {/* Hover content */}
        <div className={`absolute inset-0 flex flex-col justify-between p-3.5 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {isRestricted ? (
            <div className="flex flex-col items-center justify-center h-full text-center bg-black/55 rounded-lg">
              <Lock size={20} className="text-red-500 mb-1 animate-pulse" />
              <p className="text-white font-extrabold text-xs uppercase tracking-wide">Locked Content</p>
              <p className="text-white/40 text-[9px] mt-0.5">Parental controls blocking 18+</p>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  onClick={(e) => { e.stopPropagation(); showDetails(item); }}
                  className="w-8 h-8 rounded-full bg-black/50 border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm border-0 cursor-pointer"
                >
                  <Info size={13} className="text-white" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Center play on hover */}
        {!isRestricted && hovered && (
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all">
              <Play size={18} className="text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-white/15 rounded-b-lg overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-red-400 progress-bar-fill rounded-b-lg" style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      {/* Below-card meta */}
      <div className="mt-2.5 px-0.5 text-left">
        <p className="text-white/90 text-sm font-semibold truncate">{item.title}</p>
        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white/50">
          <span className="truncate">{item.episode.split(' · ')[0]}</span>
          <span>·</span>
          <span>{item.timeLeft}</span>
        </div>
      </div>
    </div>
  );
}

// ─── DEFAULT CARD ─────────────────────────────────────────────────────────────
export function DefaultCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToList, removeFromList, isInList, playVideo, showDetails, setFeaturedMovie, restrict18 } = useList();
  const listed = isInList(item.id);
  const isRestricted = restrict18 && (item.rating?.includes('MA') || item.rating?.includes('R'));

  return (
    <div
      className="gsap-media-card relative flex-shrink-0 cursor-pointer group"
      style={{ width: '290px', minWidth: '290px', maxWidth: '290px' }}
      onMouseEnter={() => {
        setHovered(true);
        if (!isRestricted) setFeaturedMovie(item);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (isRestricted) {
          alert("Access Restricted: This title is rated 18+ (TV-MA / R) and is blocked under current profile parental controls.");
          return;
        }
        showDetails(item);
      }}
    >
      <div
        className="led-glow-card relative rounded-lg overflow-hidden transition-all duration-500 ease-out z-20"
        style={{ 
          height: '163px',
          transform: hovered ? 'perspective(1000px) rotateX(6deg) rotateY(-8deg) scale(1.08) translateY(-8px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)',
          boxShadow: hovered ? '-15px 20px 35px rgba(0,0,0,0.6)' : '0 4px 10px rgba(0,0,0,0.3)',
          ...getLedStyles(item.genre, item.title)
        }}
      >
        {!imgError ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
            <span className="text-white/30 text-xs font-bold">{item.title}</span>
          </div>
        )}
        <div className="absolute inset-0 card-gradient-overlay" />

        {/* Hover overlay */}
        <div className={`absolute inset-0 flex flex-col justify-end p-3.5 transition-all duration-300 bg-gradient-to-t from-black/95 via-black/55 to-transparent ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {isRestricted ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Lock size={18} className="text-red-500 mb-1 animate-pulse" />
              <p className="text-white font-extrabold text-[10px] uppercase tracking-wide">Locked Content</p>
              <p className="text-white/40 text-[8px] mt-0.5">Parental Block Active</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 mb-1.5">
                <button
                  onClick={(e) => { e.stopPropagation(); playVideo(item); }}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center border-0 cursor-pointer"
                >
                  <Play size={12} className="text-black fill-black ml-0.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); listed ? removeFromList(item.id) : addToList(item); }}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    listed ? 'border-white bg-white/20' : 'border-white/40 bg-black/30 hover:border-white/80'
                  }`}
                  title={listed ? 'Remove from My List' : 'Add to My List'}
                >
                  {listed ? <Check size={11} strokeWidth={3} className="text-white" /> : <Plus size={12} className="text-white" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Below-card meta */}
      <div className="mt-2.5 px-0.5 text-left">
        <p className="text-white/90 text-sm font-semibold truncate">{item.title}</p>
        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white/50">
          <span className="text-emerald-400 font-bold text-[11px]">{item.match}% Match</span>
          <span>·</span>
          <span>{item.year}</span>
          <span>·</span>
          <span className="px-1 py-0.2 text-[9px] font-bold border border-white/20 rounded leading-none flex items-center justify-center">{item.rating || 'PG-13'}</span>
        </div>
      </div>
    </div>
  );
}
