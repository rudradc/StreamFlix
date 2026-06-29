import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ListContext = createContext(null);

export function ListProvider({ children }) {
  // Persist to localStorage
  const [myList, setMyList] = useState(() => {
    try {
      const saved = localStorage.getItem('streamflix_mylist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('streamflix_mylist', JSON.stringify(myList));
  }, [myList]);

  const addToList = useCallback((item) => {
    setMyList((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [item, ...prev];
    });
  }, []);

  const removeFromList = useCallback((id) => {
    setMyList((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInList = useCallback(
    (id) => myList.some((i) => i.id === id),
    [myList]
  );

  // Watch History State
  const [watchHistory, setWatchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('streamflix_watchhistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Ratings State (dictionary mapping movieId to rating value 1-5)
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('streamflix_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Favorite Genres State
  const [favoriteGenres, setFavoriteGenres] = useState(() => {
    try {
      const saved = localStorage.getItem('streamflix_fav_genres');
      return saved ? JSON.parse(saved) : ['Action', 'Drama', 'Sci-Fi'];
    } catch {
      return ['Action', 'Drama', 'Sci-Fi'];
    }
  });

  useEffect(() => {
    localStorage.setItem('streamflix_watchhistory', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('streamflix_ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('streamflix_fav_genres', JSON.stringify(favoriteGenres));
  }, [favoriteGenres]);

  const addToWatchHistory = useCallback((item) => {
    if (!item) return;
    setWatchHistory((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const newItem = {
        ...item,
        watchedAt: new Date().toISOString()
      };
      return [newItem, ...filtered];
    });
  }, []);

  const rateMovie = useCallback((movieId, stars) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: stars
    }));
  }, []);

  const toggleFavoriteGenre = useCallback((genre) => {
    setFavoriteGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  }, []);

  const clearAllPreferences = useCallback(() => {
    setWatchHistory([]);
    setRatings({});
    setFavoriteGenres([]);
  }, []);

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeDetails, setActiveDetails] = useState(null);
  const [activeSettings, setActiveSettings] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState({
    id: "featured-peaky-blinders",
    title: "Peaky Blinders",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=85",
    genre: "Crime Drama",
    rating: "TV-MA",
    match: 98,
    year: "2024",
    duration: "6 Seasons",
    desc: "A gangster family epic set in 1900s England, centering on a gang who sews razor blades in the peaks of their caps. Led by the fierce Tommy Shelby."
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('streamflix_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeProfile, setActiveProfile] = useState(() => {
    return localStorage.getItem('streamflix_profile') || 'adults';
  });

  const [restrict18, setRestrict18] = useState(() => {
    return localStorage.getItem('streamflix_restrict18') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('streamflix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('streamflix_user');
      localStorage.removeItem('streamflix_profile');
      localStorage.removeItem('streamflix_restrict18');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('streamflix_profile', activeProfile);
    if (activeProfile === 'children') {
      setRestrict18(true);
      localStorage.setItem('streamflix_restrict18', 'true');
    }
  }, [activeProfile]);

  useEffect(() => {
    localStorage.setItem('streamflix_restrict18', restrict18 ? 'true' : 'false');
  }, [restrict18]);

  const selectProfile = useCallback((profile) => {
    setActiveProfile(profile);
    if (profile === 'children') {
      setRestrict18(true);
    } else {
      setRestrict18(false);
    }
  }, []);

  const loginUser = useCallback((email) => {
    setUser({ email, name: email.split('@')[0] });
    setActiveProfile('adults');
    setRestrict18(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setActiveProfile('adults');
    setRestrict18(false);
  }, []);

  const playVideo = useCallback((item) => {
    setActiveVideo(item);
    if (item) {
      addToWatchHistory(item);
    }
  }, [addToWatchHistory]);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const showDetails = useCallback((item) => {
    setActiveDetails(item);
  }, []);

  const closeDetails = useCallback(() => {
    setActiveDetails(null);
  }, []);

  const showSettings = useCallback(() => {
    setActiveSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setActiveSettings(false);
  }, []);

  return (
    <ListContext.Provider
      value={{
        myList,
        addToList,
        removeFromList,
        isInList,
        activeVideo,
        playVideo,
        closeVideo,
        activeDetails,
        showDetails,
        closeDetails,
        activeSettings,
        showSettings,
        closeSettings,
        featuredMovie,
        setFeaturedMovie,
        user,
        loginUser,
        logout,
        activeProfile,
        selectProfile,
        restrict18,
        setRestrict18,
        watchHistory,
        addToWatchHistory,
        ratings,
        rateMovie,
        favoriteGenres,
        toggleFavoriteGenre,
        clearAllPreferences
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error('useList must be used inside <ListProvider>');
  return ctx;
}
