import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Play, Info, Volume2, VolumeX, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useList } from '../context/ListContext';

// ── Theme Configuration ─────────────────────────────────────────────────────
const HERO_THEMES = {
  stellar: {
    color: '#4cc9f0',
    glow: 'rgba(76, 201, 240, 0.18)',
    accentClass: 'from-cyan-500 to-blue-600 hover:shadow-cyan-500/40 hover:ring-cyan-400 ring-cyan-500/30',
    badgeColor: 'bg-cyan-600',
    badgeText: 'Sci-Fi • Thriller • Action',
    btnBorder: 'hover:border-cyan-500/40 hover:shadow-cyan-950/20',
    gradientFrom: 'rgba(12, 30, 50, 0.9)',
    particleColor: '#4cc9f0',
  },
  city: {
    color: '#e50914',
    glow: 'rgba(229, 9, 20, 0.18)',
    accentClass: 'from-red-600 to-red-700 hover:shadow-red-500/40 hover:ring-red-400 ring-red-500/30',
    badgeColor: 'bg-red-600',
    badgeText: 'Gritty • Crime • Drama',
    btnBorder: 'hover:border-red-500/40 hover:shadow-red-950/20',
    gradientFrom: 'rgba(20, 5, 5, 0.9)',
    particleColor: '#e50914',
  },
  crown: {
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.18)',
    accentClass: 'from-amber-500 to-yellow-600 hover:shadow-amber-500/40 hover:ring-amber-400 ring-amber-500/30',
    badgeColor: 'bg-amber-600',
    badgeText: 'Period Piece • Political • Drama',
    btnBorder: 'hover:border-amber-500/40 hover:shadow-amber-950/20',
    gradientFrom: 'rgba(20, 14, 3, 0.9)',
    particleColor: '#f59e0b',
  },
  wood: {
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.18)',
    accentClass: 'from-emerald-500 to-teal-600 hover:shadow-emerald-500/40 hover:ring-emerald-400 ring-emerald-500/30',
    badgeColor: 'bg-emerald-600',
    badgeText: 'Ominous • Chilling • Horror',
    btnBorder: 'hover:border-emerald-500/40 hover:shadow-emerald-950/20',
    gradientFrom: 'rgba(3, 14, 10, 0.9)',
    particleColor: '#10b981',
  },
};

// ── Utility Functions ───────────────────────────────────────────────────────
const getMovieDesc = (item) => {
  if (item.desc) return item.desc;
  const title = item.title;
  if (title === 'Stranger Things') return 'A group of young friends in a small Indiana town uncover a series of supernatural mysteries and a secret government lab gateway to another dimension.';
  if (title === 'Breaking Bad') return 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.';
  if (title === 'Inception') return 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.';
  if (title === 'The Dark Knight') return 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.';
  if (title === 'The Witcher') return 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.';
  if (title === 'Arcane') return 'Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.';
  if (title === 'The Crown') return 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.';
  if (title === 'Black Mirror') return 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.';
  return `An exceptional cinematic masterpiece. Follow ${item.title} as this award-winning production takes you on a high-stakes ride filled with drama, thrills, and breathtaking moments.`;
};

const getMovieTheme = (genre, title = '') => {
  const g = String(genre || '').toLowerCase();
  const t = String(title || '').toLowerCase();
  if (g.includes('horror')) return 'wood';
  if (g.includes('sci-fi') || g.includes('space') || g.includes('mystery') || g.includes('animation') || g.includes('animated')) return 'stellar';
  if (g.includes('fantasy') || g.includes('adventure') || g.includes('superhero') || g.includes('historical') || g.includes('royal') || t.includes('crown') || t.includes('witcher') || t.includes('arcane')) return 'crown';
  return 'city';
};

// ── Midground Overlay Images Per Theme ────────────────────────────────────
const THEME_MID_OVERLAY = {
  stellar: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
  crown: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
  wood: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
  city: null,
};
const THEME_FORE_OVERLAY = {
  stellar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  indigo: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',
  wood: null,
  city: null,
};

// ── 5 Featured Carousel Movies for Spotlight Scrolling ──
const MOVIE_TITLES = [
  "Avengers: Endgame", "Inception", "The Dark Knight", "Parasite", "Interstellar", 
  "Fight Club", "The Lord of the Rings", "The Fellowship of the Ring", "The Matrix", 
  "The Dark Knight Rises", "Forrest Gump"
];
const isMovie = (item) => MOVIE_TITLES.includes(item.title);
const isTVShow = (item) => !isMovie(item);

const getCarouselMovies = (restrict18, filterType) => {
  let list = [];
  if (restrict18) {
    list = [
      {
        id: 1,
        title: "Stranger Things",
        genre: "Sci-Fi Horror",
        year: 2024,
        rating: "TV-14",
        match: 98,
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=85",
        duration: "5 Seasons",
        desc: "A group of young friends in an Indiana town uncover a series of supernatural mysteries and a secret government gateway to another dimension."
      },
      {
        id: 201,
        title: "Wednesday",
        genre: "Dark Comedy",
        year: 2024,
        rating: "TV-14",
        match: 97,
        image: "https://images.unsplash.com/photo-1519074069444-1ba4e6664104?w=1600&q=85",
        duration: "1 Season",
        desc: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy."
      },
      {
        id: 210,
        title: "The Mandalorian",
        genre: "Sci-Fi Space",
        year: 2024,
        rating: "TV-14",
        match: 95,
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=85",
        duration: "3 Seasons",
        desc: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic."
      },
      {
        id: 4,
        title: "Avengers: Endgame",
        genre: "Action Superhero",
        year: 2023,
        rating: "PG-13",
        match: 96,
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&q=85",
        duration: "3h 2m",
        desc: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more."
      },
      {
        id: 5,
        title: "Inception",
        genre: "Sci-Fi Thriller",
        year: 2024,
        rating: "PG-13",
        match: 95,
        image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=1600&q=85",
        duration: "2h 28m",
        desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
      }
    ];
  } else {
    list = [
      {
        id: "featured-peaky-blinders",
        title: "Peaky Blinders",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=85",
        genre: "Crime Drama",
        rating: "TV-MA",
        match: 98,
        year: "2024",
        duration: "6 Seasons",
        desc: "A gangster family epic set in 1900s England, centering on a gang who sews razor blades in the peaks of their caps. Led by Tommy Shelby."
      },
      {
        id: 6,
        title: "The Dark Knight",
        genre: "Action Thriller",
        year: 2023,
        rating: "PG-13",
        match: 99,
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&q=85",
        duration: "2h 32m",
        desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
      },
      {
        id: 1,
        title: "Stranger Things",
        genre: "Sci-Fi Horror",
        year: 2024,
        rating: "TV-14",
        match: 98,
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=85",
        duration: "5 Seasons",
        desc: "A group of young friends in an Indiana town uncover a series of supernatural mysteries and a secret government gateway to another dimension."
      },
      {
        id: 2,
        title: "Breaking Bad",
        genre: "Crime Drama",
        year: 2023,
        rating: "TV-MA",
        match: 97,
        image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=1200&q=85",
        duration: "5 Seasons",
        desc: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future."
      },
      {
        id: 5,
        title: "Inception",
        genre: "Sci-Fi Thriller",
        year: 2024,
        rating: "PG-13",
        match: 95,
        image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=1600&q=85",
        duration: "2h 28m",
        desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
      },
      {
        id: 202,
        title: "The Last of Us",
        genre: "Post-Apocalyptic",
        year: 2024,
        rating: "TV-MA",
        match: 99,
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1600&q=85",
        duration: "1 Season",
        desc: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope."
      }
    ];
  }

  if (filterType === 'movies') {
    return list.filter(isMovie);
  }
  if (filterType === 'tv-shows') {
    return list.filter(isTVShow);
  }
  return list;
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function HeroBanner({ filterType = 'all' }) {
  const { featuredMovie, playVideo, showDetails, setFeaturedMovie, restrict18 } = useList();
  const [muted, setMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMousePos, setTargetMousePos] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);
  const animFrameRef = useRef(null);
  const glowRef = useRef(null);
  const borderRef = useRef(null);

  // Carousel specific state
  const carouselMovies = getCarouselMovies(restrict18, filterType);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showHovered, setShowHovered] = useState(false);

  // Derive active movie: show hovered context movie if user hovered, otherwise show carousel
  const activeMovie = showHovered ? featuredMovie : carouselMovies[carouselIndex];

  // Image crossfade state
  const [activeImg, setActiveImg] = useState(activeMovie.image);
  const [prevImg, setPrevImg] = useState(activeMovie.image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track key for reanimating content
  const [contentKey, setContentKey] = useState(0);

  // Reset to carousel index 0 if restriction changes
  useEffect(() => {
    setCarouselIndex(0);
    setShowHovered(false);
  }, [restrict18]);

  // Check if we should display the hovered movie from context
  useEffect(() => {
    if (featuredMovie && featuredMovie.id !== "featured-peaky-blinders" && featuredMovie.id !== 1) {
      setShowHovered(true);
    }
  }, [featuredMovie]);

  // Auto advance carousel slides every 6 seconds
  useEffect(() => {
    if (showHovered) return; // Pause auto-rotation when viewing a hovered movie preview

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselMovies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [showHovered, carouselMovies.length]);

  const nextSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setShowHovered(false);
    setCarouselIndex((prev) => (prev + 1) % carouselMovies.length);
  }, [carouselMovies.length]);

  const prevSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setShowHovered(false);
    setCarouselIndex((prev) => (prev - 1 + carouselMovies.length) % carouselMovies.length);
  }, [carouselMovies.length]);

  const selectSlide = useCallback((idx) => {
    setShowHovered(false);
    setCarouselIndex(idx);
  }, []);

  // Parental control redirect on hovered movie if it gets restricted
  useEffect(() => {
    if (restrict18 && showHovered && (featuredMovie.rating?.includes('MA') || featuredMovie.rating?.includes('R'))) {
      setShowHovered(false);
      setCarouselIndex(0);
    }
  }, [restrict18, featuredMovie, showHovered]);

  // Smooth crossfade on image change
  useEffect(() => {
    if (activeMovie.image !== activeImg) {
      setPrevImg(activeImg);
      setIsTransitioning(true);
      setContentKey((k) => k + 1);
      const t1 = setTimeout(() => {
        setActiveImg(activeMovie.image);
      }, 60);
      const t2 = setTimeout(() => setIsTransitioning(false), 600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMovie.image, activeImg]);

  // Theme derivation
  const themeKey = getMovieTheme(activeMovie.genre, activeMovie.title);
  const theme = HERO_THEMES[themeKey];

  // GSAP tween for background glow and border accent color transitions
  useEffect(() => {
    if (!glowRef.current || !borderRef.current) return;

    gsap.to(glowRef.current, {
      '--glow-color': theme.glow,
      duration: 1.2,
      ease: 'power2.out'
    });

    gsap.to(borderRef.current, {
      '--accent-color': theme.color,
      '--accent-glow-color': theme.glow,
      duration: 1.2,
      ease: 'power2.out'
    });
  }, [theme]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth mouse interpolation via rAF
  const handleMouseMove = useCallback((e) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    setTargetMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTargetMousePos({ x: 0, y: 0 });
  }, []);

  // Lerp animation for smooth parallax response
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      setMousePos((prev) => {
        const nx = lerp(prev.x, targetMousePos.x, 0.08);
        const ny = lerp(prev.y, targetMousePos.y, 0.08);
        if (Math.abs(nx - prev.x) < 0.0001 && Math.abs(ny - prev.y) < 0.0001) return prev;
        return { x: nx, y: ny };
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [targetMousePos]);

  // ── 5 Depth Layer Transforms ─────────────────────────────────────────────
  // Layer 1: Background — barely moves (depth = far)
  const bgTransform = `translate3d(${mousePos.x * 8}px, ${scrollY * 0.12 + mousePos.y * 8}px, 0) scale(1.08)`;
  // Layer 2: Mid-far atmospheric — slow
  const midFarTransform = `translate3d(${mousePos.x * 18}px, ${scrollY * 0.22 + mousePos.y * 18}px, 0) scale(1.12)`;
  // Layer 3: Mid atmospheric — medium
  const midTransform = `translate3d(${mousePos.x * 32}px, ${scrollY * 0.38 + mousePos.y * 28}px, 0) scale(1.18)`;
  // Layer 4: Foreground effects — faster
  const foreTransform = `translate3d(${mousePos.x * 50}px, ${scrollY * 0.55 + mousePos.y * 42}px, 0) scale(1.22)`;
  // Layer 5: Particles/foreground elements — fastest
  const nearTransform = `translate3d(${mousePos.x * 70}px, ${scrollY * 0.72 + mousePos.y * 56}px, 0)`;

  const midOverlayUrl = THEME_MID_OVERLAY[themeKey];
  const foreOverlayUrl = THEME_FORE_OVERLAY[themeKey];

  return (
    <div
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#06060c] select-none border-b border-white/5 hero-banner group/hero"
      style={{ height: 'clamp(480px, 62vw, 660px)', transition: 'background-color 0.7s ease' }}
    >
      {/* ── LAYER 1: Background Image (deepest, slowest) ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform"
        style={{ transform: bgTransform, transition: 'transform 0.1s linear' }}
      >
        {/* Previous image (crossfade out) */}
        {isTransitioning && (
          <img
            src={prevImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6] animate-cross-fade-out"
          />
        )}
        {/* Active image (crossfade in) */}
        <img
          src={activeImg}
          key={activeImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] animate-cross-fade-in"
        />
      </div>

      {/* ── LAYER 1.5: Dynamic Theme Color Tint ── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          '--glow-color': theme.glow,
          background: `radial-gradient(ellipse 80% 60% at 15% 60%, var(--glow-color) 0%, transparent 65%)`,
        }}
      />

      {/* ── LAYER 2: Mid-far atmospheric scatter ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[5] will-change-transform"
        style={{ transform: midFarTransform, transition: 'transform 0.1s linear' }}
      >
        {midOverlayUrl && (
          <div
            className="absolute inset-0 bg-cover opacity-[0.18] mix-blend-screen"
            style={{ backgroundImage: `url('${midOverlayUrl}')`, backgroundSize: 'cover' }}
          />
        )}
        {themeKey === 'city' && (
          /* City distant glow haze */
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-950/15 via-transparent to-transparent" />
        )}
      </div>

      {/* ── LAYER 3: Mid atmospheric (fx) ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[10] will-change-transform"
        style={{ transform: midTransform, transition: 'transform 0.1s linear' }}
      >
        {themeKey === 'stellar' && (
          <div className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-cover"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80')`, backgroundSize: 'cover' }} />
        )}
        {themeKey === 'crown' && (
          <div className="absolute inset-0 opacity-[0.2] mix-blend-color-dodge bg-cover"
            style={{ backgroundImage: `url('${midOverlayUrl}')`, backgroundSize: 'cover' }} />
        )}
        {themeKey === 'wood' && (
          <div className="absolute inset-0 opacity-[0.16] mix-blend-lighten bg-cover"
            style={{ backgroundImage: `url('${midOverlayUrl}')`, backgroundSize: 'cover' }} />
        )}
      </div>

      {/* ── LAYER 4: Foreground particle / effect layer ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[15] will-change-transform"
        style={{ transform: foreTransform, transition: 'transform 0.1s linear' }}
      >
        {themeKey === 'stellar' && foreOverlayUrl && (
          <div className="absolute inset-0 opacity-[0.12] mix-blend-screen bg-cover"
            style={{ backgroundImage: `url('${foreOverlayUrl}')`, backgroundSize: 'cover' }} />
        )}
        {themeKey === 'crown' && foreOverlayUrl && (
          <div className="absolute inset-0 opacity-[0.12] mix-blend-screen bg-cover"
            style={{ backgroundImage: `url('${foreOverlayUrl}')`, backgroundSize: 'cover' }} />
        )}
        {themeKey === 'wood' && (
          /* Fog wisps */
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-950/10 via-transparent to-transparent depth-shimmer" />
        )}
        {themeKey === 'city' && (
          /* Neon haze */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(229,9,20,0.08)_0%,transparent_70%)] depth-shimmer" />
        )}
      </div>

      {/* ── LAYER 5: Nearest — Rain / Fireflies / Stars ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[18] overflow-hidden will-change-transform"
        style={{ transform: nearTransform, transition: 'transform 0.1s linear' }}
      >
        {themeKey === 'city' && (
          /* Dynamic Rain Streaks */
          <>
            <div className="rain-streak" style={{ left: '8%', animationDelay: '0s', animationDuration: '0.6s' }} />
            <div className="rain-streak" style={{ left: '19%', animationDelay: '0.12s', animationDuration: '0.72s' }} />
            <div className="rain-streak" style={{ left: '31%', animationDelay: '0.28s', animationDuration: '0.58s' }} />
            <div className="rain-streak" style={{ left: '43%', animationDelay: '0.06s', animationDuration: '0.65s' }} />
            <div className="rain-streak" style={{ left: '57%', animationDelay: '0.38s', animationDuration: '0.75s' }} />
            <div className="rain-streak" style={{ left: '69%', animationDelay: '0.18s', animationDuration: '0.62s' }} />
            <div className="rain-streak" style={{ left: '81%', animationDelay: '0.45s', animationDuration: '0.7s' }} />
            <div className="rain-streak" style={{ left: '93%', animationDelay: '0.08s', animationDuration: '0.68s' }} />
          </>
        )}
        {themeKey === 'wood' && (
          /* Firefly Particles */
          <div className="absolute inset-0">
            {[
              { top: '28%', left: '42%', dur: '3.5s', size: 'w-2.5 h-2.5', color: 'bg-emerald-400' },
              { top: '52%', left: '78%', dur: '4.2s', size: 'w-2 h-2', color: 'bg-emerald-400' },
              { top: '38%', left: '22%', dur: '2.8s', size: 'w-1.5 h-1.5', color: 'bg-teal-400' },
              { top: '68%', left: '33%', dur: '5s', size: 'w-2.5 h-2.5', color: 'bg-emerald-300' },
              { top: '18%', left: '65%', dur: '3.8s', size: 'w-2 h-2', color: 'bg-teal-300' },
              { top: '75%', left: '58%', dur: '4.6s', size: 'w-1.5 h-1.5', color: 'bg-emerald-500' },
            ].map((ff, i) => (
              <div
                key={i}
                className={`absolute ${ff.size} rounded-full ${ff.color} blur-[2px] animate-ping float-glow`}
                style={{ top: ff.top, left: ff.left, animationDuration: ff.dur, animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        )}
        {themeKey === 'stellar' && (
          /* Distant Stardust Points */
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-300 blur-[1px] animate-pulse"
                style={{
                  top: `${10 + (i * 7.3) % 80}%`,
                  left: `${5 + (i * 8.1) % 90}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                  opacity: 0.4 + (i % 5) * 0.12,
                }}
              />
            ))}
          </div>
        )}
        {themeKey === 'crown' && (
          /* Golden ember sparks */
          <div className="absolute inset-0 opacity-50">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-400 blur-[1px] animate-ping"
                style={{
                  top: `${15 + (i * 9.7) % 70}%`,
                  left: `${10 + (i * 11.3) % 85}%`,
                  animationDuration: `${2.5 + (i % 4)}s`,
                  animationDelay: `${i * 0.45}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── VIGNETTE GRADIENTS — separated into distinct layers ── */}
      {/* Left vignette — strong dark panel for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[20] transition-colors duration-700"
        style={{
          background: `linear-gradient(105deg,
            ${theme.gradientFrom} 0%,
            rgba(8,7,15,0.82) 28%,
            rgba(8,7,15,0.45) 50%,
            rgba(8,7,15,0.08) 72%,
            transparent 100%)`,
        }}
      />
      {/* Bottom gradient — deep fade for content area */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[20] transition-colors duration-700"
        style={{
          height: '55%',
          background: `linear-gradient(to top,
            rgba(2,2,4,1) 0%,
            rgba(2,2,4,0.85) 25%,
            rgba(2,2,4,0.4) 55%,
            transparent 100%)`,
        }}
      />
      {/* Top navbar fade */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#020204]/75 to-transparent pointer-events-none z-[20]" />
      {/* Right side fade — let image bleed naturally on right */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-[#020204]/30 to-transparent pointer-events-none z-[20]" />

      {/* ── CONTENT BAR — full width bottom, two distinct columns ── */}
      <div
        key={contentKey}
        className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-8 pb-10 gap-6 animate-hero-content-in"
      >
        {/* ── LEFT COLUMN: Title + Meta + Buttons ── */}
        <div className="flex-1 max-w-lg min-w-0">
          {/* Badge row */}
          <div className="gsap-hero-badge flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[#E50914] text-xs font-black tracking-widest leading-none drop-shadow-[0_0_10px_rgba(229,9,20,1)]">S</span>
              <span className="text-white/70 text-[8px] font-bold tracking-[0.2em] leading-none drop-shadow-md">SERIES</span>
            </div>
            
            <div className="text-white/90 font-medium text-[11px] drop-shadow-md">
              {theme.badgeText}
            </div>
          </div>

          {/* Title — large, no word break, single visual block */}
          <h1
            className="gsap-hero-title text-white font-extrabold leading-[1.05] tracking-tight mb-3"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 5.2vw, 4rem)',
              textShadow: `0 4px 32px rgba(0,0,0,0.9), 0 0 48px ${theme.color}25`,
              letterSpacing: '-0.015em',
            }}
          >
            {activeMovie.title}
          </h1>

          {/* Ratings strip — single horizontal row, no wrapping */}
          <div className="gsap-hero-meta flex items-center gap-3.5 mb-4 flex-nowrap overflow-hidden drop-shadow-md">
            <span
              className="text-[13px] font-bold flex-shrink-0"
              style={{ color: '#46d369' }}
            >
              {activeMovie.match || 98}% Match
            </span>
            <span className="text-white/90 text-[13px] font-medium flex-shrink-0">
              {activeMovie.year || '2024'}
            </span>
            <span className="px-1.5 py-0.5 border border-white/40 text-white/90 text-[10px] font-medium rounded-sm flex-shrink-0 leading-none">
              {activeMovie.rating || 'TV-MA'}
            </span>
            <span className="text-white/90 text-[13px] font-medium flex-shrink-0">
              {activeMovie.duration || '6 Seasons'}
            </span>
            <span className="px-1 py-0.5 border border-white/40 text-white/90 text-[9px] font-bold rounded-sm tracking-wider flex-shrink-0 leading-none">
              HD
            </span>
          </div>

          {/* Description — compact, max 2 lines */}
          <p className="gsap-hero-desc text-white/80 text-sm leading-relaxed mb-5 line-clamp-2"
            style={{ maxWidth: '380px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            {getMovieDesc(activeMovie)}
          </p>

          {/* CTA Buttons — separated with gap, no overlap */}
          <div className="gsap-hero-btn flex items-center gap-3">
            <button
              onClick={() => playVideo(activeMovie)}
              className="flex items-center gap-2 px-6 py-2.5 font-extrabold rounded-full text-sm transition-all duration-300 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl"
              style={{
                background: 'rgba(255,255,255,1)',
                color: '#000',
                boxShadow: `0 4px 20px ${theme.color}50, 0 8px 32px rgba(0,0,0,0.4)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${theme.color}, ${theme.color}cc)`;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,1)';
                e.currentTarget.style.color = '#000';
              }}
            >
              <Play size={14} className="fill-current" />
              Play
            </button>

            <button
              onClick={() => showDetails(activeMovie)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Info size={14} />
              More Info
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Volume + Rating — completely separated ── */}
        <div className="gsap-hero-right flex flex-col items-center gap-3 flex-shrink-0 pb-1">
          {/* Age Rating Tag */}
          <div
            className="px-2.5 py-1 rounded border text-white/70 text-[9px] font-black uppercase tracking-widest select-none"
            style={{
              borderColor: `${theme.color}40`,
              background: `${theme.color}12`,
            }}
          >
            {activeMovie.rating || 'TV-MA'}
          </div>

          {/* Separator line */}
          <div
            className="w-[1px] h-8"
            style={{ background: `linear-gradient(to bottom, ${theme.color}50, transparent)` }}
          />

          {/* Volume Toggle */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            style={{
              border: `1px solid ${theme.color}40`,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
            }}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted
              ? <VolumeX size={14} className="text-white/60" />
              : <Volume2 size={14} className="text-white/60" />}
          </button>
        </div>
      </div>

      {/* Left scroll arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-35 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md shadow-black/40"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      {/* Right scroll arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-35 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md shadow-black/40"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      {/* Carousel slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-35 flex items-center gap-1.5 pointer-events-auto">
        {carouselMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => selectSlide(idx)}
            className={`h-[3.5px] cursor-pointer transition-all duration-300 rounded-full border-0 ${
              !showHovered && carouselIndex === idx
                ? 'w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                : 'w-3 bg-white/35 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
        {showHovered && (
          <span className="text-[9px] text-white/50 font-bold ml-2 tracking-widest uppercase px-2 py-0.5 bg-black/40 rounded border border-white/10 backdrop-blur-sm">
            Preview Mode
          </span>
        )}
      </div>

      {/* ── THEME ACCENT EDGE LINE — vibrant gradient separator ── */}
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
        style={{
          '--accent-color': theme.color,
          '--accent-glow-color': theme.glow,
          height: '3px',
          background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-glow-color) 50%, transparent 100%)`,
          boxShadow: `0 0 20px var(--accent-glow-color)`,
        }}
      />
    </div>
  );
}
