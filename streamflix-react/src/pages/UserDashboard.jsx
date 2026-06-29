import React, { useState } from 'react';
import { User, History, Star, Bookmark, Settings, CreditCard, ChevronRight, Play } from 'lucide-react';
import { useList } from '../context/ListContext';
import BackButton from '../components/BackButton';
import { trendingData, continueWatchingData, topPicksData } from '../data/mockData';

// Combine data to look up movies by ID
const ALL_MEDIA = [
  ...trendingData,
  ...continueWatchingData,
  ...topPicksData
].filter((item, index, self) => 
  self.findIndex(i => i.id === item.id) === index
);

export default function UserDashboard() {
  const { activeProfile, watchHistory, ratings, myList, showDetails, playVideo, selectProfile } = useList();
  
  const [activeTab, setActiveTab] = useState('overview');

  const getStarredCount = () => Object.keys(ratings).length;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <BackButton />
      
      {/* ── Dashboard Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-2">
        <div className="flex items-center gap-5">
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-2xl ${
              activeProfile === 'children' 
                ? 'bg-emerald-500/40 border-emerald-400 text-emerald-50 shadow-emerald-900/50' 
                : 'bg-red-500/40 border-red-400 text-red-50 shadow-red-900/50'
            }`}
            style={{ 
              fontFamily: '"Arial Black", Impact, sans-serif',
              fontSize: '40px',
              lineHeight: '1',
              paddingTop: '3px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.2)'
            }}
          >
            {activeProfile === 'children' ? 'C' : 'A'}
          </div>
          <div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              {activeProfile === 'children' ? 'Baby Ghosts' : 'Adult Skeletons'}
            </h1>
            <p className="text-white/50 text-sm mt-1 font-medium flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white">Premium Ultra HD</span>
              Member since 2024
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ── Sidebar Navigation ── */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === 'overview' ? 'bg-white/10 text-white font-bold border border-white/20' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <User size={18} className={activeTab === 'overview' ? 'text-red-500' : ''} />
              <span>Overview</span>
            </div>
            <ChevronRight size={14} className={activeTab === 'overview' ? 'opacity-100' : 'opacity-0'} />
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === 'history' ? 'bg-white/10 text-white font-bold border border-white/20' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <History size={18} className={activeTab === 'history' ? 'text-amber-500' : ''} />
              <span>Watch History</span>
            </div>
            <ChevronRight size={14} className={activeTab === 'history' ? 'opacity-100' : 'opacity-0'} />
          </button>
          
          <button
            onClick={() => setActiveTab('ratings')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === 'ratings' ? 'bg-white/10 text-white font-bold border border-white/20' : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Star size={18} className={activeTab === 'ratings' ? 'text-yellow-400' : ''} />
              <span>My Ratings</span>
            </div>
            <ChevronRight size={14} className={activeTab === 'ratings' ? 'opacity-100' : 'opacity-0'} />
          </button>
        </div>

        {/* ── Main Content Area ── */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="animate-fadeIn space-y-10">
              {/* Circular Stats Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10">
                {/* Stat 1 */}
                <div className="group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-red-900/40 to-black/60 border border-red-500/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-300 backdrop-blur-md">
                  <div className="absolute inset-2 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
                  <History size={20} className="text-red-400 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-black text-3xl sm:text-4xl leading-none my-1">{watchHistory.length}</div>
                  <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-center px-2">Watched</span>
                </div>
                
                {/* Stat 2 */}
                <div className="group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-amber-900/40 to-black/60 border border-amber-500/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300 backdrop-blur-md">
                  <div className="absolute inset-2 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
                  <Star size={20} className="text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-black text-3xl sm:text-4xl leading-none my-1">{getStarredCount()}</div>
                  <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-center px-2">Rated</span>
                </div>
                
                {/* Stat 3 */}
                <div className="group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-emerald-900/40 to-black/60 border border-emerald-500/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 backdrop-blur-md">
                  <div className="absolute inset-2 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
                  <Bookmark size={20} className="text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-white font-black text-3xl sm:text-4xl leading-none my-1">{myList.length}</div>
                  <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-center px-2">My List</span>
                </div>
              </div>

              {/* Detailed Structured Information */}
              <div className="flex flex-col gap-6">
                
                {/* Viewing Profile */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl w-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <User size={20} className="text-cyan-400" />
                    <h2 className="text-white font-bold text-lg uppercase tracking-wide">Viewing Profile</h2>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Profile Type</span>
                      <span className="text-white text-sm font-bold bg-white/10 px-3 py-1.5 rounded-lg">{activeProfile === 'children' ? 'Kids (Restricted)' : 'Adult (Unrestricted)'}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Total Watch Time</span>
                      <span className="text-white text-base font-black tracking-tight">{watchHistory.length * 45} <span className="text-sm font-bold text-white/50">Hours</span></span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Top Genre</span>
                      <span className="text-emerald-400 text-base font-black tracking-tight">Sci-Fi Thriller</span>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl w-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <CreditCard size={20} className="text-white/80" />
                    <h2 className="text-white font-bold text-lg uppercase tracking-wide">Plan Details</h2>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Current Plan</span>
                      <span className="text-white text-sm font-bold bg-red-600 px-3 py-1.5 rounded-lg shadow-lg shadow-red-900/40">Premium Ultra HD</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Video Quality</span>
                      <span className="text-white text-base font-black tracking-tight">4K + HDR</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">Next Billing</span>
                      <span className="text-white text-base font-black tracking-tight">Aug 15, 2026</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-5 border-t border-white/10 flex justify-end">
                    <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider border border-white/20 hover:border-white/40 shadow-md cursor-pointer">
                      Manage Account
                    </button>
                  </div>
                </div>

                {/* Recently Watched */}
                <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl w-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <History size={20} className="text-red-400" />
                    <h2 className="text-white font-bold text-lg uppercase tracking-wide">Recently Watched</h2>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Interstellar</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Money Heist</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Dark</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">5 days ago</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Stranger Things 4</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">1 week ago</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">The Matrix</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">2 weeks ago</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Oppenheimer</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">3 weeks ago</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <span className="text-white font-bold text-base">Breaking Bad</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">1 month ago</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="animate-fadeIn">
              <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                <h2 className="text-white font-bold text-xl mb-6">Recent Watch History</h2>
                
                {watchHistory.length === 0 ? (
                  <p className="text-white/40 text-center py-12">You haven't watched anything yet.</p>
                ) : (
                  <div className="space-y-4">
                    {watchHistory.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <img src={item.image} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-lg shadow-md" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-white font-bold text-lg">{item.title}</h3>
                          <p className="text-white/50 text-xs mt-1">{item.genre} · {item.rating}</p>
                          <p className="text-white/40 text-[10px] mt-2 font-mono">
                            Watched on {new Date(item.watchedAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center sm:self-center">
                          <button 
                            onClick={() => playVideo(item)}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                          >
                            <Play size={16} className="fill-black ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RATINGS TAB */}
          {activeTab === 'ratings' && (
            <div className="animate-fadeIn">
              <div className="bg-[#0a0a0c]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                <h2 className="text-white font-bold text-xl mb-6">Titles You've Rated</h2>
                
                {getStarredCount() === 0 ? (
                  <p className="text-white/40 text-center py-12">You haven't rated any titles yet. Open a title's details to rate it.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(ratings).map(([id, val]) => {
                      const movie = ALL_MEDIA.find(m => String(m.id) === String(id));
                      if (!movie) return null;
                      
                      return (
                        <div key={id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors" onClick={() => showDetails(movie)}>
                          <img src={movie.image} alt={movie.title} className="w-16 h-12 object-cover rounded shadow" />
                          <div>
                            <p className="text-white font-semibold text-sm">{movie.title}</p>
                            <div className="flex gap-0.5 mt-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={12} className={s <= val ? 'fill-amber-400 text-amber-400' : 'text-white/20'} />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
