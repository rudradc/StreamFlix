import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ fallbackPage = 'home' }) {
  const handleBack = () => {
    // If there is history to go back, do that
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback navigate to home page
      window.location.hash = '#' + fallbackPage;
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 hover:border-white/30 backdrop-blur-md text-white/90 hover:text-white text-xs font-bold transition-all shadow-lg cursor-pointer self-start border-0"
    >
      <ArrowLeft size={14} strokeWidth={2.5} />
      <span>Back</span>
    </button>
  );
}
