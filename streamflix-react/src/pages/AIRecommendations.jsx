import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, RefreshCw, Star, Trash2, Play, Plus, Check, SlidersHorizontal, History, Film } from 'lucide-react';
import { useList } from '../context/ListContext';
import { trendingData, continueWatchingData, topPicksData } from '../data/mockData';
import BackButton from '../components/BackButton';

const ALL_MEDIA = [
  ...trendingData,
  ...continueWatchingData,
  ...topPicksData
].filter((item, index, self) => 
  self.findIndex(i => i.id === item.id) === index
);

const AVAILABLE_GENRES = [
  "Action", "Drama", "Sci-Fi", "Thriller", "Horror", "Mystery", "Fantasy", "Comedy", "Superhero", "Post-Apocalyptic"
];

const isGenreMatch = (movieGenre, favGenre) => {
  return String(movieGenre || '').toLowerCase().includes(String(favGenre || '').toLowerCase());
};

export default function AIRecommendations() {
  const { 
    watchHistory, 
    ratings, 
    favoriteGenres, 
    toggleFavoriteGenre, 
    clearAllPreferences,
    playVideo,
    addToList,
    removeFromList,
    isInList,
    showDetails
  } = useList();

  const [scanning, setScanning] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Run matching logic
  const runEngine = () => {
    const scored = ALL_MEDIA.map(movie => {
      let score = 65; // baseline start
      let reasons = [];

      // 1. Check Favorite Genres match
      favoriteGenres.forEach(favGenre => {
        if (isGenreMatch(movie.genre, favGenre)) {
          score += 15;
          reasons.push(`Matches favorite genre: ${favGenre}`);
        }
      });

      // 2. Check Watch History match
      watchHistory.forEach(historyItem => {
        const sharedGenres = AVAILABLE_GENRES.filter(g => 
          isGenreMatch(movie.genre, g) && isGenreMatch(historyItem.genre, g)
        );
        if (sharedGenres.length > 0) {
          score += 8 * sharedGenres.length;
          sharedGenres.forEach(g => {
            reasons.push(`Similar to "${historyItem.title}" (${g})`);
          });
        }
      });

      // 3. Check Ratings match
      Object.entries(ratings).forEach(([ratedId, ratingValue]) => {
        const ratedItem = ALL_MEDIA.find(m => String(m.id) === String(ratedId));
        if (ratedItem) {
          const sharedGenres = AVAILABLE_GENRES.filter(g => 
            isGenreMatch(movie.genre, g) && isGenreMatch(ratedItem.genre, g)
          );
          
          if (sharedGenres.length > 0) {
            if (ratingValue >= 4) {
              const multiplier = ratingValue === 5 ? 18 : 10;
              score += multiplier * sharedGenres.length;
              sharedGenres.forEach(g => {
                reasons.push(`Highly rated in "${g}" by you (${ratingValue}★)`);
              });
            } else if (ratingValue <= 2) {
              const penalty = ratingValue === 1 ? -20 : -10;
              score += penalty * sharedGenres.length;
              sharedGenres.forEach(g => {
                reasons.push(`Low rating in similar genre`);
              });
            }
          }
        }
      });

      // Add a tiny bit of random match factor so it feels dynamic
      const randomFactor = (movie.id % 7) - 3; // -3 to +3
      score += randomFactor;

      // Cap match percentage
      const finalMatch = Math.min(99, Math.max(60, Math.round(score)));

      // Select top explanation reason
      let explanation = "Specially selected based on your profile";
      if (reasons.length > 0) {
        const ratingReason = reasons.find(r => r.includes("Highly rated"));
        const watchReason = reasons.find(r => r.includes("Similar to"));
        const favReason = reasons.find(r => r.includes("Matches favorite"));
        explanation = ratingReason || watchReason || favReason || reasons[0];
      }

      return {
        ...movie,
        matchScore: finalMatch,
        explanation
      };
    })
    .filter(movie => !watchHistory.some(h => h.id === movie.id)) // Filter out watched
    .sort((a, b) => b.matchScore - a.matchScore); // Rank highest first

    setRecommendations(scored.slice(0, 8)); // Top 8 picks
  };

  useEffect(() => {
    runEngine();
  }, [favoriteGenres, watchHistory, ratings]);

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => {
      runEngine();
      setScanning(false);
    }, 1200);
  };

  const getStarredCount = () => Object.keys(ratings).length;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <BackButton />
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center shadow-lg shadow-red-950/40">
            <Brain size={24} className="text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight flex items-center gap-2">
              StreamFlix AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Recs</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 font-medium leading-none">
              Star-rating powered matchmaking engine updated instantly with your choices.
            </p>
          </div>
        </div>

        <button
          onClick={triggerScan}
          disabled={scanning}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black tracking-wider uppercase hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-red-950/30 self-start md:self-auto border-0"
        >
          <RefreshCw size={14} className={scanning ? 'animate-spin' : ''} />
          {scanning ? 'Computing Neural Picks...' : 'Re-calculate Recommendations'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT PANEL: CONFIG & PREFERENCES ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Favorite Genres Card */}
          <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
              <SlidersHorizontal size={18} className="text-red-500" />
              <h2 className="text-white font-bold text-base tracking-wide">Favorite Genres</h2>
            </div>

            <p className="text-white/50 text-xs leading-relaxed mb-5 font-medium">
              Select the genres you enjoy watching the most. We'll use these to find better recommendations tailored just for you.
            </p>

            <div className="flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map((genre) => {
                const isFavorite = favoriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    onClick={() => toggleFavoriteGenre(genre)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isFavorite 
                        ? 'bg-red-600 border-red-500 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {isFavorite ? '✓ ' : ''}{genre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Watch Stats */}
          <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
              <Sparkles size={18} className="text-amber-500" />
              <h2 className="text-white font-bold text-base tracking-wide">Your Watch Stats</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-white/10">
                <span className="text-white font-black text-3xl block tracking-tight mb-1">
                  {watchHistory.length}
                </span>
                <span className="text-white/40 text-[10px] font-semibold tracking-wide uppercase">Titles Watched</span>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-white/10">
                <span className="text-white font-black text-3xl block tracking-tight mb-1">
                  {getStarredCount()}
                </span>
                <span className="text-white/40 text-[10px] font-semibold tracking-wide uppercase">Titles Rated</span>
              </div>
            </div>

            <button
              onClick={clearAllPreferences}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Trash2 size={14} className="text-white/60" />
              Reset My Preferences
            </button>
          </div>

        </div>

        {/* ── RIGHT PANEL: RECOMMENDED PICKS GRID ── */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="relative liquid-glass p-6 rounded-2xl border border-white/5 min-h-[500px]">
            {/* Pulsing Scanning overlay when computing */}
            {scanning && (
              <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                <p className="text-white/50 text-xs tracking-widest uppercase font-bold">Matching neural signatures...</p>
              </div>
            )}

            {/* Glowing Laser line sweep */}
            {scanning && <div className="skeleton-laser" />}

            <div className="flex items-center gap-2 mb-6">
              <Brain size={18} className="text-red-500" />
              <h2 className="text-white font-black text-lg tracking-tight">Top AI Matches For You</h2>
            </div>

            {recommendations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <Brain size={48} className="text-white/10 mb-4" />
                <p className="text-white/50 font-bold text-sm">Not enough data to synthesize picks</p>
                <p className="text-white/30 text-[11px] max-w-xs mt-1 leading-relaxed">
                  Toggle more favorite genres, rate titles in their detail sheets, or watch videos to feed the recommendation engine.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {recommendations.map((movie) => {
                  const isHovered = hoveredCard === movie.id;
                  const listed = isInList(movie.id);

                  return (
                    <div
                      key={movie.id}
                      className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all duration-300 flex flex-col bg-black/20"
                      onMouseEnter={() => setScanning(false) || setHoveredCard(movie.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Image Frame */}
                      <div 
                        className="relative w-full overflow-hidden cursor-pointer"
                        style={{ aspectRatio: '16/9' }}
                        onClick={() => showDetails(movie)}
                      >
                        <img 
                          src={movie.image} 
                          alt={movie.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                        
                        {/* Hover Overlay Actions */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 bg-black/40'}`}>
                          <button
                            onClick={(e) => { e.stopPropagation(); playVideo(movie); }}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-xs font-black rounded-full hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 cursor-pointer border-0 shadow-lg"
                          >
                            <Play size={11} className="fill-black" />
                            Play
                          </button>
                          
                          <button
                            onClick={(e) => { e.stopPropagation(); listed ? removeFromList(movie.id) : addToList(movie); }}
                            className="flex items-center gap-1 px-3 py-1 bg-black/60 border border-white/20 text-white text-[10px] rounded-full hover:bg-black/80 hover:border-white/50 transition-colors cursor-pointer"
                          >
                            {listed ? <Check size={10} className="text-white" strokeWidth={3} /> : <Plus size={10} />}
                            {listed ? 'My List' : 'Add to List'}
                          </button>
                        </div>

                        {/* Top floating match badge */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#020204]/80 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-black text-emerald-400 tracking-wider">
                            {movie.matchScore}% AI MATCH
                          </span>
                        </div>
                      </div>

                      {/* Info details */}
                      <div className="p-4 flex-1 flex flex-col justify-between gap-1.5">
                        <div className="text-left">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-white font-bold text-sm tracking-tight truncate">
                              {movie.title}
                            </h3>
                            <span className="text-[10px] text-white/40 flex-shrink-0 font-medium">{movie.genre}</span>
                          </div>
                          
                          {/* Match reason explainability block */}
                          <p className="text-[#34d399] text-[10px] mt-1.5 font-bold tracking-wide leading-relaxed bg-emerald-950/20 border border-emerald-500/10 px-2 py-1 rounded">
                            ✨ {movie.explanation}
                          </p>
                        </div>

                        <button 
                          onClick={() => showDetails(movie)}
                          className="mt-2 text-center text-white/50 hover:text-white text-[9.5px] font-bold tracking-wider uppercase border-t border-white/5 pt-2 cursor-pointer bg-transparent border-x-0 border-b-0"
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── BOTTOM SECTIONS: LOGS & HISTORY DOCK ── */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Watch History Log */}
        <div className="relative liquid-glass p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-white/5 mb-4">
            <History size={16} className="text-red-500" />
            <h2 className="text-white font-black text-sm tracking-tight uppercase">Recent Watch History</h2>
          </div>

          {watchHistory.length === 0 ? (
            <div className="py-10 text-center text-white/30 text-xs">
              Titles you play will be tracked here to refine your taste map.
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {watchHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-14 h-9 rounded object-cover border border-white/10" />
                    <div className="text-left">
                      <p className="text-white font-bold text-xs leading-none">{item.title}</p>
                      <p className="text-white/40 text-[9px] mt-1">{item.genre}</p>
                    </div>
                  </div>
                  <span className="text-[8.5px] text-white/35 font-mono">
                    {item.watchedAt ? new Date(item.watchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Your Star Ratings Log */}
        <div className="relative liquid-glass p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-white/5 mb-4">
            <Star size={16} className="text-amber-500" />
            <h2 className="text-white font-black text-sm tracking-tight uppercase">Your Star Ratings</h2>
          </div>

          {getStarredCount() === 0 ? (
            <div className="py-10 text-center text-white/30 text-xs">
              Open details modals and rate titles to train the scoring algorithm.
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {Object.entries(ratings).map(([id, val]) => {
                const movie = ALL_MEDIA.find(m => String(m.id) === String(id));
                if (!movie) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-4 p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={movie.image} alt={movie.title} className="w-14 h-9 rounded object-cover border border-white/10" />
                      <div className="text-left">
                        <p className="text-white font-bold text-xs leading-none">{movie.title}</p>
                        <p className="text-white/40 text-[9px] mt-1">{movie.genre}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={11} 
                          className={s <= val ? 'fill-amber-400 text-amber-400' : 'text-white/20'} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
