import React, { useState } from 'react';
import { X, Play, Plus, Check, Star, Calendar, Clock, Film, Maximize2, Minimize2 } from 'lucide-react';
import { useList } from '../context/ListContext';

const getMovieTheme = (genre, title = '') => {
  const g = String(genre || '').toLowerCase();
  const t = String(title || '').toLowerCase();
  if (g.includes('horror')) return 'wood';
  if (g.includes('sci-fi') || g.includes('space') || g.includes('mystery')) return 'stellar';
  if (g.includes('fantasy') || g.includes('adventure') || g.includes('superhero') || g.includes('animated') || g.includes('historical') || g.includes('royal') || t.includes('crown')) return 'crown';
  return 'city';
};

export default function DetailsModal() {
  const { activeDetails, closeDetails, playVideo, addToList, removeFromList, isInList, ratings, rateMovie } = useList();
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!activeDetails) return null;

  const listed = isInList(activeDetails.id);

  const handleClose = () => {
    setIsFullscreen(false);
    closeDetails();
  };

  // Generate fallback detailed metadata if mockData lacks fields
  const showYear = activeDetails.year || '2023';
  const showDuration = activeDetails.duration || '1h 55m';
  const showRating = activeDetails.rating || 'PG-13';
  const showMatch = activeDetails.match || 95;
  const showGenre = activeDetails.genre || 'Action & Adventure';
  const showDesc = activeDetails.desc || 'An immersive cinematic journey. Delving deep into complex characters and stunning visual landscapes that define the modern era of screen storytelling.';
  const showCast = activeDetails.cast || ['Cillian Murphy', 'Florence Pugh', 'Robert Downey Jr.', 'Emily Blunt'];

  const themeKey = getMovieTheme(showGenre, activeDetails.title);

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center overflow-y-auto animate-fadeIn ${
        isFullscreen ? 'p-0' : 'p-4'
      }`}
    >
      {/* Modal Container with Radiant Liquid Glass */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative liquid-glass-radiant radiant-${themeKey} w-full transition-all duration-300 scale-100 flex flex-col ${
          isFullscreen 
            ? 'w-full h-full min-h-screen rounded-none max-w-none max-h-none overflow-y-auto modal-scrollbar z-50' 
            : 'max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl'
        }`}
      >
        {/* Shifting liquid refraction backdrop */}
        <div className="absolute inset-0 z-[-1] liquid-refraction opacity-[0.92] pointer-events-none" />
        {/* Banner/Header Block */}
        <div className="relative w-full h-64 md:h-80 flex-shrink-0">
          <img
            src={activeDetails.image}
            alt={activeDetails.title}
            className="w-full h-full object-cover"
          />
          {/* Shadows and highlights */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {/* Floating Buttons: Fullscreen & Exit */}
          <div className={`${isFullscreen ? 'fixed' : 'absolute'} top-6 right-6 flex items-center gap-2.5 z-[60]`}>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer backdrop-blur-sm"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer backdrop-blur-sm"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Core Info Overlay on Image bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
            <span className="text-red-500 text-[10px] font-black tracking-widest uppercase">STREAMFLIX CINEMA</span>
            <h1 className="text-white font-black text-2xl md:text-3xl leading-none tracking-tight">{activeDetails.title}</h1>
          </div>
        </div>

        {/* Info Grid Body */}
        <div className={`p-6 space-y-6 ${isFullscreen ? '' : 'overflow-y-auto flex-1 modal-scrollbar'}`}>
          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playVideo(activeDetails);
                handleClose();
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-lg text-sm transition-all duration-150 hover:bg-white/90 hover:scale-[1.02] cursor-pointer shadow-lg shadow-white/5"
            >
              <Play size={14} className="fill-black" />
              Play Title
            </button>
            
            <button
              onClick={() => listed ? removeFromList(activeDetails.id) : addToList(activeDetails)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                listed
                  ? 'border-white bg-white/10 text-white'
                  : 'border-white/20 bg-black/40 text-white hover:border-white/60 hover:bg-black/60'
              }`}
              title={listed ? 'Remove from My List' : 'Add to My List'}
            >
              {listed ? <Check size={14} className="text-white" strokeWidth={3} /> : <Plus size={14} className="text-white" />}
              {listed ? 'In My List' : 'Add to List'}
            </button>
          </div>

          {/* Quick specs */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 border-b border-white/5 pb-4">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <Star size={12} className="fill-emerald-400" />
              {showMatch}% Match
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {showYear}
            </span>
            <span className="text-white/20">|</span>
            <span className="px-1.5 py-0.5 border border-white/20 text-white/80 font-bold rounded text-[9px] uppercase tracking-wider">
              {showRating}
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {showDuration}
            </span>
          </div>

          {/* AI Rating System */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3.5">
            <div className="flex flex-col gap-0.5">
              <span className="text-white text-xs font-bold text-left">Rate this title</span>
              <span className="text-white/40 text-[10px] text-left">Your rating influences your AI recommendations in real-time.</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const currentRating = ratings[activeDetails.id] || 0;
                const isSelected = starValue <= currentRating;
                return (
                  <button
                    key={starValue}
                    onClick={() => rateMovie(activeDetails.id, starValue)}
                    className="p-1 hover:scale-125 transition-transform duration-100 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={20}
                      className={`transition-colors ${
                        isSelected 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-white/30 hover:text-white/60'
                      }`}
                      style={isSelected ? { filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.6))' } : {}}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual columns meta details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left large description */}
            <div className="md:col-span-2">
              <p className="text-white/70 text-sm leading-relaxed text-justify">
                {showDesc}
              </p>
            </div>
            
            {/* Right short specs metadata */}
            <div className="space-y-3.5 text-xs text-white/50 border-l border-white/5 pl-0 md:pl-6">
              <div>
                <span className="text-white/30 block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Genre</span>
                <span className="text-white/80 flex items-center gap-1">
                  <Film size={11} className="text-red-500" />
                  {showGenre}
                </span>
              </div>
              <div>
                <span className="text-white/30 block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Starring Cast</span>
                <span className="text-white/80 leading-normal block">
                  {showCast.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-white/30 block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Availability</span>
                <span className="text-white/80">StreamFlix Streaming Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
