import React from 'react';
import { X, Shield, Users, Eye, EyeOff, Lock } from 'lucide-react';
import { useList } from '../context/ListContext';

export default function SettingsModal() {
  const { 
    activeSettings, 
    closeSettings, 
    activeProfile, 
    selectProfile, 
    restrict18, 
    setRestrict18 
  } = useList();

  if (!activeSettings) return null;

  return (
    <div
      onClick={closeSettings}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
    >
      {/* Modal Container with Liquid Glass & Radiant Glow */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative liquid-glass-radiant radiant-${activeProfile === 'children' ? 'wood' : 'stellar'} w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col p-6`}
      >
        {/* Shifting liquid refraction backdrop */}
        <div className="absolute inset-0 z-[-1] liquid-refraction opacity-[0.92] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Shield size={18} className={activeProfile === 'children' ? 'text-emerald-400' : 'text-cyan-400'} />
            <h2 className="text-white font-black text-lg tracking-tight">Parental & Profile Settings</h2>
          </div>
          <button
            onClick={closeSettings}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Active Profile Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wider">
            <Users size={12} />
            <span>Active Watching Profile</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Adults Profile */}
            <button
              onClick={() => selectProfile('adults')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                activeProfile === 'adults'
                  ? 'border-cyan-500/50 bg-cyan-950/20 text-white font-bold'
                  : 'border-white/10 bg-black/25 text-white/60 hover:border-white/20'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-black/20">
                A
              </div>
              <span className="text-xs">Adults Profile</span>
            </button>

            {/* Children Profile */}
            <button
              onClick={() => selectProfile('children')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                activeProfile === 'children'
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-white font-bold'
                  : 'border-white/10 bg-black/25 text-white/60 hover:border-white/20'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-black/20">
                C
              </div>
              <span className="text-xs">Children Profile</span>
            </button>
          </div>
        </div>

        {/* Restrictions Section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {restrict18 ? (
                <EyeOff size={16} className="text-red-400 flex-shrink-0" />
              ) : (
                <Eye size={16} className="text-emerald-400 flex-shrink-0" />
              )}
              <div>
                <p className="text-white text-xs font-bold leading-tight">Restrict 18+ Content</p>
                <p className="text-white/40 text-[10px] leading-normal mt-0.5 max-w-[200px]">
                  Blocks all R and TV-MA rated movies and TV series.
                </p>
              </div>
            </div>

            {/* Switch Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={restrict18}
                disabled={activeProfile === 'children'}
                onChange={(e) => setRestrict18(e.target.checked)}
                className="sr-only peer"
              />
              <div className={`
                w-9 h-5 rounded-full relative transition-all duration-300 outline-none
                ${restrict18 ? 'bg-emerald-600' : 'bg-white/15'}
                peer-focus:outline-none peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all
                ${restrict18 ? 'after:translate-x-4' : 'after:translate-x-0'}
              `} />
            </label>
          </div>

          {/* Child Restriction Warning */}
          {activeProfile === 'children' && (
            <div className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2.5 text-[10px] text-emerald-400">
              <Lock size={12} className="flex-shrink-0 mt-0.5" />
              <p className="leading-normal">
                <strong>Parental Lock Active:</strong> The Children profile enforces a strict 18+ block. Restricting settings cannot be disabled on this profile.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={closeSettings}
          className="mt-6 w-full py-2.5 bg-white text-black font-extrabold rounded-lg text-xs hover:bg-white/95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border-0 shadow-lg shadow-white/5"
        >
          Save & Exit settings
        </button>
      </div>
    </div>
  );
}
