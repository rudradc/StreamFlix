import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X, Users, Lock } from 'lucide-react';
import { useList } from '../context/ListContext';
import BoomerangVideoBg from '../components/BoomerangVideoBg';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

export default function LandingPage({ onEnter }) {
  const { loginUser, selectProfile } = useList();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showProfileSelect, setShowProfileSelect] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (menuOpen || showSignIn || showProfileSelect) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, showSignIn, showProfileSelect]);

  const navLinks = [
    { href: '#experience', label: 'Experience' },
    { href: '#features', label: 'Features' },
    { href: '#plans', label: 'Premium Plans' },
  ];

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    loginUser(email || 'user@streamflix.com');
    setShowSignIn(false);
    setShowProfileSelect(true);
  };

  const handleProfileSelect = (profile) => {
    selectProfile(profile);
    setShowProfileSelect(false);
    onEnter(); // Navigate to main dashboard
  };

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden">
      {/* Seamless Boomerang Video Background */}
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />
      
      {/* Light vignette overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-white/10 mix-blend-overlay z-0 pointer-events-none" />

      {/* Nav bar */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter">
            STREAMFLIX<sup className="text-[10px] sm:text-xs font-semibold">TM</sup>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); setShowSignIn(true); }}
              className={`text-sm px-3 py-2 transition-colors ${
                i === 0 ? 'font-semibold text-[#1f2a1d]' : 'font-medium text-[#4b5b47] hover:text-[#1f2a1d]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => setShowSignIn(true)}
            className="ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer border-0"
          >
            Enter Cinema
          </button>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3 sm:gap-6 text-white">
          <button 
            onClick={() => setShowSignIn(true)}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-white/80 transition-colors cursor-pointer bg-transparent border-0 font-sans"
          >
            <UserPlus className="w-4 h-4" />
            Sign Me Up!
          </button>
          <button 
            onClick={() => setShowSignIn(true)}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-white/80 transition-colors cursor-pointer bg-transparent border-0 font-sans"
          >
            <LogIn className="w-4 h-4" />
            Enter
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[#1f2a1d] transition-all duration-300 hover:bg-white/90 cursor-pointer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#1f2a1d]/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); setShowSignIn(true); }}
                className={`text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <button 
              onClick={() => { setMenuOpen(false); setShowSignIn(true); }}
              className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden text-left bg-transparent border-0 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Sign Me Up!
            </button>
            <button 
              onClick={() => { setMenuOpen(false); setShowSignIn(true); }}
              className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden text-left bg-transparent border-0 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Enter
            </button>
            <button 
              onClick={() => { setMenuOpen(false); setShowSignIn(true); }}
              className="mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors cursor-pointer border-0"
            >
              Enter Cinema
            </button>
          </div>
        </div>
      </div>

      {/* Hero Copy */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
        <h1
          className="font-black leading-[0.95] text-white text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.025em' }}
        >
          Unlimited stories,{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent font-bold">
            linking
            <br className="hidden sm:block" /> movies and action
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl px-4 font-medium">
          Stream exclusive originals, blockbuster movies, and trending TV shows in ultra-high resolution.
        </p>
      </div>

      {/* Bottom-left CTA block */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-white mb-3">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-extrabold tracking-wide uppercase">
            StreamEngine<sup className="text-[10px]">TM</sup>
          </span>
        </div>
        <p className="text-white/90 text-xs leading-relaxed mb-6 max-w-xs font-semibold">
          StreamFlix smoothly delivers high-definition cinematic experiences, custom interactive soundscapes, and personal viewing recommendations.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => setShowSignIn(true)}
            className="bg-white hover:bg-white/90 text-[#1f2a1d] text-sm font-bold px-6 py-3 rounded-full transition-colors shadow-lg cursor-pointer border-0"
          >
            Enter Cinema
          </button>
          <button 
            onClick={() => setShowSignIn(true)}
            className="text-white hover:text-white/80 text-sm font-semibold transition-colors bg-transparent border-0 cursor-pointer"
          >
            Know More.
          </button>
        </div>
      </div>

      {/* Bottom-right video link */}
      <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/95 text-sm">
        <button 
          onClick={() => setShowSignIn(true)}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors border-0 cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current text-white ml-0.5" />
        </button>
        <span className="font-semibold">Watch Trailer</span>
        <span className="text-white/60 font-medium">1:35</span>
      </div>

      {/* ── INTERACTIVE SIGN IN MODAL ── */}
      {showSignIn && (
        <div
          onClick={() => setShowSignIn(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              border: '1px solid rgba(31, 42, 29, 0.18)',
              boxShadow: '0 30px 70px rgba(31, 42, 29, 0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-0 transition-all"
              style={{ background: 'rgba(31, 42, 29, 0.08)', zIndex: 10 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(31, 42, 29, 0.16)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(31, 42, 29, 0.08)'; }}
            >
              <X size={14} className="text-[#1f2a1d]/60" />
            </button>

            {/* ── Modal content — fully isolated padded container ── */}
            <div className="px-8 pt-10 pb-8">

              {/* StreamFlix badge */}
              <div className="flex justify-center mb-5">
                <span
                  className="text-[#1f2a1d] text-base font-black tracking-[0.25em] uppercase px-5 py-2 rounded-full shadow-sm"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.4)', 
                    border: '1.5px solid rgba(31, 42, 29, 0.25)',
                    textShadow: '0 1px 1px rgba(255,255,255,0.5)',
                  }}
                >
                  STREAM<span className="text-[#3d5638]">FLIX</span>
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-[#1f2a1d] font-black text-center leading-tight mb-1.5"
                style={{ fontSize: '1.6rem', letterSpacing: '-0.04em' }}
              >
                Sign In
              </h3>

              {/* Subtitle */}
              <p className="text-[#4b5b47]/60 text-[11px] text-center font-semibold mb-7 leading-relaxed">
                Use any credentials to simulate login
              </p>

              {/* ── Form ── */}
              <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label
                      htmlFor="sf-email"
                      className="text-[#1f2a1d]/60 text-[10px] uppercase font-black tracking-[0.18em]"
                    >
                      Email Address
                    </label>
                    <input
                      id="sf-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@streamflix.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl px-4 py-3 text-[#1f2a1d] text-sm outline-none transition-all duration-200 placeholder-[#4b5b47]/50"
                      style={{
                        background: 'rgba(31, 42, 29, 0.06)',
                        border: '1px solid rgba(31, 42, 29, 0.15)',
                        caretColor: '#3d5638',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(61, 86, 56, 0.6)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(61, 86, 56, 0.1)';
                        e.target.style.background = 'rgba(31, 42, 29, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(31, 42, 29, 0.15)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(31, 42, 29, 0.06)';
                      }}
                    />
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="sf-password"
                        className="text-[#1f2a1d]/60 text-[10px] uppercase font-black tracking-[0.18em]"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-[#3d5638]/70 hover:text-[#1f2a1d] text-[10px] font-bold transition-colors cursor-pointer bg-transparent border-0"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input
                      id="sf-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl px-4 py-3 text-[#1f2a1d] text-sm outline-none transition-all duration-200 placeholder-[#4b5b47]/50"
                      style={{
                        background: 'rgba(31, 42, 29, 0.06)',
                        border: '1px solid rgba(31, 42, 29, 0.15)',
                        caretColor: '#3d5638',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(61, 86, 56, 0.6)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(61, 86, 56, 0.1)';
                        e.target.style.background = 'rgba(31, 42, 29, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(31, 42, 29, 0.15)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.background = 'rgba(31, 42, 29, 0.06)';
                      }}
                    />
                  </div>

                  {/* Sign In button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 text-white font-black rounded-xl text-xs uppercase cursor-pointer border-0 mt-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #3d5638 0%, #1f2a1d 100%)',
                      boxShadow: '0 4px 20px rgba(61, 86, 56, 0.25), 0 2px 6px rgba(0,0,0,0.15)',
                      letterSpacing: '0.18em',
                    }}
                  >
                    Sign In
                  </button>

                </form>

              {/* Footer note */}
              <p className="text-center mt-5 text-[10px] leading-relaxed" style={{ color: 'rgba(31, 42, 29, 0.4)' }}>
                Demo only — no real data is stored or collected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── PROFILE SELECTION OVERLAY ── */}
      {showProfileSelect && (
        <div className="fixed inset-0 bg-[#020204]/60 backdrop-blur-[24px] z-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
          {/* Ambient gradient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/8 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative w-full max-w-lg p-10 text-center z-10">
            {/* Background Layer with Liquid Refraction (wavy only background) */}
            <div className="absolute inset-0 liquid-glass-radiant radiant-stellar liquid-refraction rounded-[32px] shadow-2xl shadow-black/80 z-0 pointer-events-none" />

            {/* Content Layer (perfectly stable text and controls) */}
            <div className="relative z-10 space-y-10">
              <div>
                <p 
                  className="text-[#ff2b36] text-xs font-black tracking-[0.35em] uppercase mb-3"
                  style={{ textShadow: '0 0 12px rgba(255, 43, 54, 0.8)' }}
                >
                  StreamFlix
                </p>
                <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter leading-none">Who's Watching?</h2>
                <p className="text-white/40 text-sm mt-3 font-medium">Select your profile to personalize your experience</p>
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                {/* Adults Profile */}
                <button 
                  onClick={() => handleProfileSelect('adults')}
                  className="group flex flex-col items-center gap-4 focus:outline-none border-0 bg-transparent cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-800/5 hover:from-red-500/25 hover:to-red-800/10 border border-red-500/20 hover:border-red-500/40 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-500/20">
                      <span className="bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent text-5xl font-black tracking-tight select-none">A</span>
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-110 pointer-events-none" />
                  </div>
                  <div className="text-center">
                    <span className="text-white/80 group-hover:text-white font-bold text-sm tracking-wide block transition-colors duration-250">Adults</span>
                    <span className="text-white/30 text-[11px] font-medium mt-0.5 block">All content</span>
                  </div>
                </button>

                {/* Children Profile */}
                <button 
                  onClick={() => handleProfileSelect('children')}
                  className="group flex flex-col items-center gap-4 focus:outline-none border-0 bg-transparent cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-800/5 hover:from-emerald-500/25 hover:to-teal-800/10 border border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-500/20">
                      <span className="bg-gradient-to-br from-emerald-400 to-teal-500 bg-clip-text text-transparent text-5xl font-black tracking-tight select-none">C</span>
                    </div>
                    {/* Lock badge */}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-950/85 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-950/40 z-10">
                      <Lock size={12} className="text-emerald-400" />
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-110 pointer-events-none" />
                  </div>
                  <div className="text-center">
                    <span className="text-white/80 group-hover:text-white font-bold text-sm tracking-wide block transition-colors duration-250">Children</span>
                    <span className="text-white/30 text-[11px] font-medium mt-0.5 block">Safe content only</span>
                  </div>
                </button>
              </div>

              {/* Safe guard info */}
              <div className="flex items-center justify-center gap-2 text-white/20 pt-2">
                <Lock size={10} />
                <p className="text-[10px] tracking-widest uppercase font-bold">StreamFlix Parental SafeGuard™</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
