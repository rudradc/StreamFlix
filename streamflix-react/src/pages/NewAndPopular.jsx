import React, { useState } from 'react';
import { Check, Plus, Play, Bell } from 'lucide-react';
import { useList } from '../context/ListContext';
import { newOnStreamFlix, top10Today, comingSoon } from '../data/newAndPopularData';
import BackButton from '../components/BackButton';

const TABS = ['New on StreamFlix', 'Top 10 Today', 'Coming Soon'];

// ── New-release card ─────────────────────────────────────────────────────────
function NewCard({ item }) {
  const { addToList, removeFromList, isInList, playVideo, showDetails } = useList();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const listed = isInList(item.id);

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/20 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40 hover:ring-2 hover:ring-red-500/40 hover:border-red-500/30"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => showDetails(item)}
    >
      {!imgErr ? (
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950" />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Badge */}
      {item.badge && (
        <div 
          className="absolute top-3 left-3 px-2 py-0.5 bg-red-600 text-white text-[11px] font-black rounded uppercase shadow-lg shadow-black/50"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', letterSpacing: '0.06em' }}
        >
          {item.badge}
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
        <p className="text-white/50 text-[11px] mt-0.5">{item.genre} · {item.rating} · {item.match}% Match</p>

        {/* Hover actions */}
        <div className={`flex items-center gap-2 mt-2.5 transition-all duration-200 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); playVideo(item); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-bold rounded hover:bg-white/90 transition-colors cursor-pointer"
          >
            <Play size={11} className="fill-black" /> Play
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); listed ? removeFromList(item.id) : addToList(item); }}
            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
              listed
                ? 'border-white bg-white/20 text-white'
                : 'border-white/40 bg-black/30 text-white hover:border-white'
            }`}
            title={listed ? 'Remove from My List' : 'Add to My List'}
          >
            {listed ? <Check size={12} strokeWidth={3} /> : <Plus size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Top-10 row item ───────────────────────────────────────────────────────────
function Top10Item({ item, index }) {
  const { addToList, removeFromList, isInList, playVideo } = useList();
  const [imgErr, setImgErr] = useState(false);
  const listed = isInList(item.id);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer group ${
        expanded ? 'border-red-500/30 bg-white/5 ring-1 ring-red-500/20' : 'border-transparent hover:border-white/20 hover:bg-white/5 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/30'
      }`}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Rank */}
      <span
        className="flex-shrink-0 font-black text-transparent select-none"
        style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 1,
          WebkitTextStroke: '2px rgba(255,255,255,0.15)',
          width: '60px',
          textAlign: 'center',
        }}
      >
        {item.rank}
      </span>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden border border-white/10">
        {!imgErr ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
        <p className="text-white/50 text-xs mt-0.5">{item.genre} · {item.rating}</p>
        {expanded && (
          <p className="text-white/60 text-xs mt-1.5 leading-relaxed animate-fadeIn">{item.desc}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => { e.stopPropagation(); playVideo(item); }}
          className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          <Play size={12} className="text-white fill-white ml-0.5" />
        </button>
        <button
          onClick={() => listed ? removeFromList(item.id) : addToList(item)}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
            listed ? 'border-white bg-white/20' : 'border-white/30 bg-transparent hover:border-white/60'
          }`}
          title={listed ? 'Remove from My List' : 'Add to My List'}
        >
          {listed ? <Check size={12} strokeWidth={3} className="text-white" /> : <Plus size={12} className="text-white" />}
        </button>
      </div>
    </div>
  );
}

// ── Coming Soon card ─────────────────────────────────────────────────────────
function ComingSoonCard({ item }) {
  const { addToList, removeFromList, isInList, showDetails } = useList();
  const [imgErr, setImgErr] = useState(false);
  const [reminded, setReminded] = useState(false);
  const listed = isInList(item.id);

  return (
    <div
      onClick={() => showDetails(item)}
      className="flex gap-4 p-4 rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/30 transition-all duration-300 group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-36 h-20 rounded-lg overflow-hidden border border-white/10 relative">
        {!imgErr ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-center">
            <p className="text-white text-[9px] font-bold uppercase tracking-widest">Coming in</p>
            <p className="text-white font-black text-lg leading-none">{item.daysLeft}</p>
            <p className="text-white text-[9px]">days</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-white/40 font-semibold mb-0.5 uppercase tracking-wider">{item.releaseDate}</p>
            <p className="text-white font-bold text-sm">{item.title}</p>
            <p className="text-white/50 text-[11px] mt-0.5">{item.genre} · {item.rating}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
            {/* Remind Me */}
            <button
              onClick={() => setReminded((v) => !v)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                reminded ? 'border-white bg-white/20' : 'border-white/30 hover:border-white/60'
              }`}
              title={reminded ? 'Reminder set!' : 'Remind Me'}
            >
              <Bell size={11} className={reminded ? 'text-white fill-white/80' : 'text-white'} />
            </button>
            {/* Add to list */}
            <button
              onClick={() => listed ? removeFromList(item.id) : addToList(item)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                listed ? 'border-white bg-white/20' : 'border-white/30 hover:border-white/60'
              }`}
            >
              {listed ? <Check size={11} strokeWidth={3} className="text-white" /> : <Plus size={11} className="text-white" />}
            </button>
          </div>
        </div>
        <p className="text-white/50 text-xs mt-2 leading-relaxed line-clamp-2">{item.desc}</p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function NewAndPopular() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-8">
      <BackButton />
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-white font-black text-3xl tracking-tight mb-1">New &amp; Popular</h1>
        <p className="text-white/40 text-sm">The latest hits and what everyone's watching</p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 mb-8 border-b border-white/10 pb-0">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${
              activeTab === i
                ? 'border-red-500 text-white'
                : 'border-transparent text-white/45 hover:text-white/75'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: New on StreamFlix */}
      {activeTab === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
          {newOnStreamFlix.map((item) => (
            <NewCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Tab: Top 10 Today */}
      {activeTab === 1 && (
        <div className="max-w-3xl space-y-1 animate-fadeIn">
          {top10Today.map((item, i) => (
            <Top10Item key={item.id} item={item} index={i} />
          ))}
        </div>
      )}

      {/* Tab: Coming Soon */}
      {activeTab === 2 && (
        <div className="max-w-3xl space-y-3 animate-fadeIn">
          {comingSoon.map((item) => (
            <ComingSoonCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
