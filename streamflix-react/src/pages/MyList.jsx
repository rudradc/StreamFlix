import React, { useState } from 'react';
import { Trash2, Play, ListVideo } from 'lucide-react';
import { useList } from '../context/ListContext';
import BackButton from '../components/BackButton';

function ListCard({ item, onRemove }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const { playVideo, showDetails } = useList();

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/20 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40 hover:ring-2 hover:ring-red-500/40 hover:border-red-500/30"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => showDetails(item)}
    >
      {!imgErr ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
          <span className="text-white/20 text-xs font-bold">{item.title}</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
        {item.genre && <p className="text-white/50 text-[11px] mt-0.5">{item.genre}</p>}
      </div>

      {/* Hover actions */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={(e) => { e.stopPropagation(); playVideo(item); }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
        >
          <Play size={13} className="fill-black" />
          Play
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 border border-white/30 text-white text-xs rounded-full hover:bg-red-600/40 hover:border-red-500/60 transition-all backdrop-blur-sm"
        >
          <Trash2 size={11} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function MyList() {
  const { myList, removeFromList } = useList();

  return (
    <div className="min-h-screen pt-20 pb-16 px-8">
      <BackButton />
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <ListVideo size={24} className="text-red-500" strokeWidth={2} />
        <div>
          <h1 className="text-white font-black text-3xl tracking-tight">My List</h1>
          <p className="text-white/40 text-sm mt-0.5">
            {myList.length === 0
              ? 'Your saved shows and movies will appear here'
              : `${myList.length} title${myList.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      {/* Empty state */}
      {myList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            <ListVideo size={32} className="text-white/25" />
          </div>
          <p className="text-white/60 font-semibold text-lg mb-2">Nothing saved yet</p>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed">
            Hit the <span className="text-white/50 font-bold">+</span> button on any title to add it here and watch later.
          </p>
        </div>
      )}

      {/* Grid of saved items */}
      {myList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fadeIn">
          {myList.map((item) => (
            <ListCard key={item.id} item={item} onRemove={removeFromList} />
          ))}
        </div>
      )}
    </div>
  );
}
