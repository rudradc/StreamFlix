import React, { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { TrendingCard, ContinueWatchingCard, DefaultCard } from './MediaCard';
import { useList } from '../context/ListContext';

// Gap between cards (px)
const CARD_GAPS = {
  trending: 56,   // wider gap to accommodate the rank number overhang
  continue: 20,
  default: 16,
};

const getRowHeaderStyles = (title) => {
  const t = String(title || '').toLowerCase();
  
  if (t.includes('trending') || t.includes('popular')) {
    // Fire / energy gradient
    return {
      bg: 'linear-gradient(135deg, rgba(255, 75, 43, 0.28) 0%, rgba(255, 147, 15, 0.08) 100%)',
      border: 'rgba(255, 75, 43, 0.4)',
      glow: 'rgba(255, 75, 43, 0.2)',
      iconColor: '#ff4b2b',
    };
  }
  if (t.includes('continue')) {
    // Flowing purple
    return {
      bg: 'linear-gradient(135deg, rgba(160, 32, 240, 0.28) 0%, rgba(0, 210, 255, 0.08) 100%)',
      border: 'rgba(160, 32, 240, 0.4)',
      glow: 'rgba(160, 32, 240, 0.2)',
      iconColor: '#c084fc',
    };
  }
  if (t.includes('picks') || t.includes('star')) {
    // Stellar Gold
    return {
      bg: 'linear-gradient(135deg, rgba(255, 200, 55, 0.3) 0%, rgba(255, 120, 0, 0.08) 100%)',
      border: 'rgba(255, 200, 55, 0.45)',
      glow: 'rgba(255, 200, 55, 0.2)',
      iconColor: '#ffc837',
    };
  }
  if (t.includes('award') || t.includes('drama')) {
    // Emerald prestige
    return {
      bg: 'linear-gradient(135deg, rgba(5, 255, 196, 0.28) 0%, rgba(0, 210, 255, 0.08) 100%)',
      border: 'rgba(5, 255, 196, 0.4)',
      glow: 'rgba(5, 255, 196, 0.2)',
      iconColor: '#05ffc4',
    };
  }
  if (t.includes('list') || t.includes('heart')) {
    // Heart red
    return {
      bg: 'linear-gradient(135deg, rgba(255, 0, 96, 0.3) 0%, rgba(255, 100, 0, 0.08) 100%)',
      border: 'rgba(255, 0, 96, 0.45)',
      glow: 'rgba(255, 0, 96, 0.2)',
      iconColor: '#ff0060',
    };
  }
  
  // Default red
  return {
    bg: 'linear-gradient(135deg, rgba(229, 9, 20, 0.25) 0%, rgba(229, 9, 20, 0.08) 100%)',
    border: 'rgba(229, 9, 20, 0.35)',
    glow: 'rgba(229, 9, 20, 0.2)',
    iconColor: '#e50914',
  };
};

export default function MediaRow({ title, icon, data, type = 'default' }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [rowHovered, setRowHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { restrict18 } = useList();

  // Filter out 18+ content when children profile parental control is active
  const filteredData = restrict18
    ? data.filter((item) => !item.rating?.includes('MA') && !item.rating?.includes('R'))
    : data;
  const hiddenCount = data.length - filteredData.length;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scroll = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by 85% of the viewport width to align cards nicely
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateScrollState, 400);
  }, [updateScrollState]);

  const gap = CARD_GAPS[type] ?? 12;

  return (
    <section
      className="relative group/row"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
    >
      {/* ── Row Header ── */}
      <div 
        className="flex items-center group/title px-8 mb-3 w-fit cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2
          className="text-[#e5e5e5] font-bold tracking-normal leading-none flex items-center gap-2.5 group-hover/title:text-white transition-all duration-500 group-hover/title:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
        >
          {icon && (
            <span className="text-[#e5e5e5] group-hover/title:text-white transition-colors drop-shadow-sm">
              {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
            </span>
          )}
          {title}
        </h2>
        
        <div className="flex items-center text-[#54b9c5] text-[11px] font-bold tracking-wider uppercase ml-3 opacity-0 group-hover/title:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover/title:translate-x-0">
          <span className="mr-0.5">{isExpanded ? 'Show Less' : 'Explore All'}</span>
          <ChevronRight 
            size={14} 
            strokeWidth={3} 
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>

        {/* Children profile — parental lock badge */}
        {hiddenCount > 0 && (
          <span className="ml-4 flex items-center gap-1.5 text-white/50 text-[10px] font-medium tracking-wide border-l border-white/20 pl-4">
            <Lock size={10} className="text-red-500" />
            {hiddenCount} restricted
          </span>
        )}
      </div>

      {/* ── Scroll Container wrapper ── */}
      <div className="relative">
        {/* Left chevron */}
        <button
          onClick={() => scroll('left')}
          className={`
            absolute left-0 top-0 bottom-0 z-30
            w-14 flex items-center justify-center
            bg-black/15 hover:bg-black/75 backdrop-blur-[3px]
            text-white border-0 cursor-pointer
            transition-all duration-300 rounded-r-lg
            ${canScrollLeft && !isExpanded ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Scroll left"
        >
          <ChevronLeft size={36} className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125" strokeWidth={3} />
        </button>

        {/* Right chevron */}
        <button
          onClick={() => scroll('right')}
          className={`
            absolute right-0 top-0 bottom-0 z-30
            w-14 flex items-center justify-center
            bg-black/15 hover:bg-black/75 backdrop-blur-[3px]
            text-white border-0 cursor-pointer
            transition-all duration-300 rounded-l-lg
            ${canScrollRight && !isExpanded ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          aria-label="Scroll right"
        >
          <ChevronRight size={36} className="text-white/70 hover:text-white transition-all duration-200 hover:scale-125" strokeWidth={3} />
        </button>

        {/* ── The actual scrollable row ── */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={`flex ${isExpanded ? 'flex-wrap' : 'overflow-x-auto'} scrollbar-hide px-8 py-5`}
          style={{ gap: `${gap}px` }}
        >
          {filteredData.length === 0 ? (
            /* Row fully hidden by parental controls */
            <div className="flex-1 flex items-center gap-3 px-4 py-8">
              <Lock size={16} className="text-red-400/60 flex-shrink-0" />
              <p className="text-white/30 text-sm font-medium">
                All titles in this category are restricted by parental controls
              </p>
            </div>
          ) : (
            filteredData.map((item, index) => {
              if (type === 'trending') {
                return <TrendingCard key={item.id} item={item} index={index} />;
              }
              if (type === 'continue') {
                return <ContinueWatchingCard key={item.id} item={item} />;
              }
              return <DefaultCard key={item.id} item={item} />;
            })
          )}

          {/* Trailing spacer so last card isn't flush against edge */}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
