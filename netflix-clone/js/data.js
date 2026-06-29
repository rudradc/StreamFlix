// ══════════════════════════════════════════════
//  StreamFlix – Content Data
// ══════════════════════════════════════════════

const CONTENT = [
  // ── SERIES ──────────────────────────────────
  {
    id: "tt4574334", type: "series", title: "Stranger Things",
    year: 2022, rating: 8.7, match: 98, age: "TV-14",
    seasons: 4, genres: ["Sci-Fi","Drama","Horror"],
    cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour",
    desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    thumb: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/56v2K5Ql84XJueq8fsyHkL2Y82F.jpg",
    poster: "https://image.tmdb.org/t/p/w342/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    episodes: [
      { title: "Chapter One: The Vanishing of Will Byers", desc: "On his way home from a friend's house, young Will sees something terrifying.", duration: "47 min", thumb: "https://image.tmdb.org/t/p/w300/AdwF2jXvhdODr6gUZ61bHKRkz09.jpg" },
      { title: "Chapter Two: The Weirdo on Maple Street", desc: "Lucas, Mike and Dustin try to talk to the girl they found in the woods.", duration: "55 min", thumb: "https://image.tmdb.org/t/p/w300/AdwF2jXvhdODr6gUZ61bHKRkz09.jpg" },
      { title: "Chapter Three: Holly, Jolly", desc: "An increasingly agitated Joyce is convinced Will is trying to talk to her.", duration: "51 min", thumb: "https://image.tmdb.org/t/p/w300/AdwF2jXvhdODr6gUZ61bHKRkz09.jpg" },
    ]
  },
  {
    id: "tt7366338", type: "series", title: "Chernobyl",
    year: 2019, rating: 9.4, match: 96, age: "TV-MA",
    seasons: 1, genres: ["Drama","History","Thriller"],
    cast: "Jared Harris, Stellan Skarsgård, Emily Watson, Paul Ritter",
    desc: "A dramatization of the true story of one of the worst man-made catastrophes in history, the catastrophic nuclear accident at Chernobyl.",
    thumb: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/xFdHJOCblHDPAoFfnQq2PSwSuFO.jpg",
    poster: "https://image.tmdb.org/t/p/w342/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    episodes: [
      { title: "1:23:45", desc: "On April 26, 1986, the Chernobyl Nuclear Power Plant suffers a catastrophic explosion.", duration: "62 min", thumb: "https://image.tmdb.org/t/p/w300/6GwXQSBN27KrMNOhIx2Lgacrxoa.jpg" },
      { title: "Please Remain Calm", desc: "As the Soviet apparatus attempts to contain the disaster, scientists grapple with what they know.", duration: "58 min", thumb: "https://image.tmdb.org/t/p/w300/6GwXQSBN27KrMNOhIx2Lgacrxoa.jpg" },
    ]
  },
  {
    id: "tt0903747", type: "series", title: "Breaking Bad",
    year: 2013, rating: 9.5, match: 99, age: "TV-MA",
    seasons: 5, genres: ["Drama","Crime","Thriller"],
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn, Dean Norris",
    desc: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    thumb: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    poster: "https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    episodes: [
      { title: "Pilot", desc: "Walter White, a struggling high school chemistry teacher, is diagnosed with lung cancer.", duration: "58 min", thumb: "https://image.tmdb.org/t/p/w300/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg" },
      { title: "Cat's in the Bag", desc: "Walt and Jesse attempt to tie up loose ends.", duration: "48 min", thumb: "https://image.tmdb.org/t/p/w300/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg" },
    ]
  },
  {
    id: "tt5180504", type: "series", title: "The Witcher",
    year: 2021, rating: 8.2, match: 91, age: "TV-MA",
    seasons: 3, genres: ["Fantasy","Action","Drama"],
    cast: "Henry Cavill, Freya Allan, Anya Chalotra, Joey Batey",
    desc: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    thumb: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
    poster: "https://image.tmdb.org/t/p/w342/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    episodes: [
      { title: "The End's Beginning", desc: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.", duration: "60 min", thumb: "https://image.tmdb.org/t/p/w300/gf7hKHFRKZA2bqSITYIXaMFo7u5.jpg" },
    ]
  },
  {
    id: "tt1475582", type: "series", title: "Sherlock",
    year: 2017, rating: 9.1, match: 95, age: "TV-14",
    seasons: 4, genres: ["Drama","Crime","Mystery"],
    cast: "Benedict Cumberbatch, Martin Freeman, Mark Gatiss",
    desc: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
    thumb: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/okMNpCPtFPbOPrF8RpYiMWHQ0rY.jpg",
    poster: "https://image.tmdb.org/t/p/w342/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
    episodes: [
      { title: "A Study in Pink", desc: "Detective Sherlock Holmes and Dr. John Watson team up to investigate a string of suicides.", duration: "88 min", thumb: "https://image.tmdb.org/t/p/w300/okMNpCPtFPbOPrF8RpYiMWHQ0rY.jpg" },
    ]
  },
  {
    id: "tt2861424", type: "series", title: "Rick and Morty",
    year: 2023, rating: 9.2, match: 94, age: "TV-MA",
    seasons: 7, genres: ["Comedy","Sci-Fi","Animation"],
    cast: "Justin Roiland, Chris Parnell, Spencer Grammer",
    desc: "An animated series that follows the misadventures of an alcoholic scientist and his good-hearted but fretful grandson.",
    thumb: "https://image.tmdb.org/t/p/w500/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/1ztBpO5yBxNbI9cHdFxp5A8oGar.jpg",
    poster: "https://image.tmdb.org/t/p/w342/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg",
    episodes: [
      { title: "Pilot", desc: "Rick moves in with his daughter's family and involves his grandson Morty in his adventures.", duration: "22 min", thumb: "https://image.tmdb.org/t/p/w300/1ztBpO5yBxNbI9cHdFxp5A8oGar.jpg" },
    ]
  },

  // ── MOVIES ──────────────────────────────────
  {
    id: "tt1375666", type: "movie", title: "Inception",
    year: 2010, rating: 8.8, match: 97, age: "PG-13",
    genres: ["Sci-Fi","Action","Thriller"],
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumb: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    poster: "https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    id: "tt0816692", type: "movie", title: "Interstellar",
    year: 2014, rating: 8.7, match: 96, age: "PG-13",
    genres: ["Sci-Fi","Drama","Adventure"],
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
    desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumb: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    poster: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: "tt0468569", type: "movie", title: "The Dark Knight",
    year: 2008, rating: 9.0, match: 99, age: "PG-13",
    genres: ["Action","Drama","Crime"],
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumb: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    poster: "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: "tt4154796", type: "movie", title: "Avengers: Endgame",
    year: 2019, rating: 8.4, match: 92, age: "PG-13",
    genres: ["Action","Sci-Fi","Adventure"],
    cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
    desc: "After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos' actions and restore balance.",
    thumb: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    poster: "https://image.tmdb.org/t/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: "tt0137523", type: "movie", title: "Fight Club",
    year: 1999, rating: 8.8, match: 95, age: "R",
    genres: ["Drama","Thriller"],
    cast: "Brad Pitt, Edward Norton, Helena Bonham Carter, Meat Loaf",
    desc: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    thumb: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
    poster: "https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: "tt0167260", type: "movie", title: "The Lord of the Rings",
    year: 2003, rating: 9.0, match: 98, age: "PG-13",
    genres: ["Fantasy","Adventure","Drama"],
    cast: "Elijah Wood, Viggo Mortensen, Ian McKellen, Orlando Bloom",
    desc: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    thumb: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
    poster: "https://image.tmdb.org/t/p/w342/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  },
  {
    id: "tt0120737", type: "movie", title: "The Fellowship of the Ring",
    year: 2001, rating: 8.8, match: 97, age: "PG-13",
    genres: ["Fantasy","Adventure","Drama"],
    cast: "Elijah Wood, Ian McKellen, Orlando Bloom, Viggo Mortensen",
    desc: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    thumb: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/pIgm6M4KdZIbzOoOJz9cFIjj7Wr.jpg",
    poster: "https://image.tmdb.org/t/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    id: "tt0133093", type: "movie", title: "The Matrix",
    year: 1999, rating: 8.7, match: 94, age: "R",
    genres: ["Sci-Fi","Action"],
    cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
    desc: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    thumb: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    poster: "https://image.tmdb.org/t/p/w342/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: "tt6751668", type: "movie", title: "Parasite",
    year: 2019, rating: 8.5, match: 93, age: "R",
    genres: ["Drama","Thriller","Comedy"],
    cast: "Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo, Woo-sik Choi",
    desc: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    thumb: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    poster: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: "tt1345836", type: "movie", title: "The Dark Knight Rises",
    year: 2012, rating: 8.4, match: 91, age: "PG-13",
    genres: ["Action","Drama","Thriller"],
    cast: "Christian Bale, Tom Hardy, Anne Hathaway, Gary Oldman",
    desc: "Eight years after the Joker's reign of anarchy, Batman must return to defend Gotham City against the enigmatic jewel thief Selina and the brutal extremist Bane.",
    thumb: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn41Gr.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
    poster: "https://image.tmdb.org/t/p/w342/hr0L2aueqlP2BYUblTTjmtn41Gr.jpg",
  },
  {
    id: "tt0109830", type: "movie", title: "Forrest Gump",
    year: 1994, rating: 8.8, match: 97, age: "PG-13",
    genres: ["Drama","Comedy","Romance"],
    cast: "Tom Hanks, Robin Wright, Gary Sinise, Sally Field",
    desc: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    thumb: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
    poster: "https://image.tmdb.org/t/p/w342/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    id: "tt3581920", type: "series", title: "The Last of Us",
    year: 2023, rating: 8.8, match: 97, age: "TV-MA",
    seasons: 1, genres: ["Action","Sci-Fi","Drama"],
    cast: "Pedro Pascal, Bella Ramsey, Gabriel Luna, Rutina Wesley",
    desc: "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
    thumb: "https://image.tmdb.org/t/p/w500/uDgy6hyPd32CLRs7cYnbZugYfs1.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/2vg9s5t58uiQvV2y36gsi77q52S.jpg",
    poster: "https://image.tmdb.org/t/p/w342/uDgy6hyPd32CLRs7cYnbZugYfs1.jpg",
    episodes: [
      { title: "When You're Lost in the Darkness", desc: "In 2003, a parasitic fungal infection triggers a global pandemic. In 2023, Joel attempts to escape a quarantine zone with a girl named Ellie.", duration: "81 min", thumb: "https://image.tmdb.org/t/p/w300/2vg9s5t58uiQvV2y36gsi77q52S.jpg" },
      { title: "Infected", desc: "Joel and Tess guide Ellie through the ruins of Boston, discovering secrets about her immunity along the way.", duration: "52 min", thumb: "https://image.tmdb.org/t/p/w300/2vg9s5t58uiQvV2y36gsi77q52S.jpg" }
    ]
  },
  {
    id: "tt10919420", type: "series", title: "Squid Game",
    year: 2021, rating: 8.0, match: 94, age: "TV-MA",
    seasons: 1, genres: ["Thriller","Drama","Action"],
    cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-jun, Jung Ho-yeon",
    desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    thumb: "https://image.tmdb.org/t/p/w500/djd45Ik9L4Uz7fG4s6NE86Z40qd.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/5D4p2Qip7SrnzL0P7682lC4o31z.jpg",
    poster: "https://image.tmdb.org/t/p/w342/djd45Ik9L4Uz7fG4s6NE86Z40qd.jpg",
    episodes: [
      { title: "Red Light, Green Light", desc: "Hoping to win some easy cash, a cash-strapped driver enters a mysterious tournament. But what follows is a nightmare.", duration: "60 min", thumb: "https://image.tmdb.org/t/p/w300/5D4p2Qip7SrnzL0P7682lC4o31z.jpg" },
      { title: "Hell", desc: "Faced with a democratic vote on whether to stop the games, the players struggle to return to their harsh real lives.", duration: "63 min", thumb: "https://image.tmdb.org/t/p/w300/5D4p2Qip7SrnzL0P7682lC4o31z.jpg" }
    ]
  },
  {
    id: "tt13443470", type: "series", title: "Wednesday",
    year: 2022, rating: 8.1, match: 92, age: "TV-14",
    seasons: 1, genres: ["Comedy","Fantasy","Mystery"],
    cast: "Jenna Ortega, Gwendoline Christie, Riki Lindhome, Christina Ricci",
    desc: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
    thumb: "https://image.tmdb.org/t/p/w500/9PFFDcrsbA75oK7VA960v7g6xoG.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/iHMR15L96752zoG8g7y2QA2lmEx.jpg",
    poster: "https://image.tmdb.org/t/p/w342/9PFFDcrsbA75oK7VA960v7g6xoG.jpg",
    episodes: [
      { title: "Wednesday's Child Is Full of Woe", desc: "When Wednesday gets expelled from high school, her parents enroll her in Nevermore Academy, the boarding school where they met.", duration: "59 min", thumb: "https://image.tmdb.org/t/p/w300/iHMR15L96752zoG8g7y2QA2lmEx.jpg" },
      { title: "Woe Is the Loneliest Number", desc: "The sheriff questions Wednesday about a shocking event. Later, Wednesday runs into a fierce rival in the race for the Edgar Allan Poe Cup.", duration: "48 min", thumb: "https://image.tmdb.org/t/p/w300/iHMR15L96752zoG8g7y2QA2lmEx.jpg" }
    ]
  },
  {
    id: "tt11198330", type: "series", title: "House of the Dragon",
    year: 2024, rating: 8.4, match: 95, age: "TV-MA",
    seasons: 2, genres: ["Fantasy","Drama","Action"],
    cast: "Matt Smith, Emma D'Arcy, Olivia Cooke, Rhys Ifans",
    desc: "The story of the House Targaryen, set 200 years before the events of Game of Thrones, exploring the deadly civil war known as the Dance of the Dragons.",
    thumb: "https://image.tmdb.org/t/p/w500/7gKI1kWtVjN0rxoMHWyOI06ZJ2C.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/etjK23Z2hHNtN27aqVsy5Eq1FWU.jpg",
    poster: "https://image.tmdb.org/t/p/w342/7gKI1kWtVjN0rxoMHWyOI06ZJ2C.jpg",
    episodes: [
      { title: "The Heirs of the Dragon", desc: "Viserys Targaryen hosts a tournament to celebrate the birth of his second child. Rhaenyra is welcomed to the Small Council.", duration: "66 min", thumb: "https://image.tmdb.org/t/p/w300/etjK23Z2hHNtN27aqVsy5Eq1FWU.jpg" },
      { title: "The Rogue Prince", desc: "Princess Rhaenyra Targaryen oversteps her bounds in council, while Prince Daemon makes an alliance in the Stepstones.", duration: "54 min", thumb: "https://image.tmdb.org/t/p/w300/etjK23Z2hHNtN27aqVsy5Eq1FWU.jpg" }
    ]
  },
  {
    id: "tt6468322", type: "series", title: "Money Heist",
    year: 2021, rating: 8.2, match: 96, age: "TV-MA",
    seasons: 5, genres: ["Crime","Drama","Thriller"],
    cast: "Álvaro Morte, Úrsula Corberó, Itziar Ituño, Pedro Alonso",
    desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    thumb: "https://image.tmdb.org/t/p/w500/yGV6tHd54o95a9MTjOIw6vI52w2.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/tbVZ3Sq2ns85hOBW7El4tewCuZy.jpg",
    poster: "https://image.tmdb.org/t/p/w342/yGV6tHd54o95a9MTjOIw6vI52w2.jpg",
    episodes: [
      { title: "Episode 1", desc: "The Professor recruits a young female robber and seven other criminals for a grand heist.", duration: "48 min", thumb: "https://image.tmdb.org/t/p/w300/tbVZ3Sq2ns85hOBW7El4tewCuZy.jpg" }
    ]
  },
  {
    id: "tt9140554", type: "series", title: "Loki",
    year: 2023, rating: 8.2, match: 97, age: "TV-14",
    seasons: 2, genres: ["Action","Sci-Fi","Adventure"],
    cast: "Tom Hiddleston, Sophia Di Martino, Owen Wilson, Wunmi Mosaku",
    desc: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.",
    thumb: "https://image.tmdb.org/t/p/w500/voHU16f4EX4x5n642nU5gH4967v.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/oO47q2t195LI4tB4CxN6q121H6S.jpg",
    poster: "https://image.tmdb.org/t/p/w342/voHU16f4EX4x5n642nU5gH4967v.jpg",
    episodes: [
      { title: "Glorious Purpose", desc: "Loki is arrested by the Time Variance Authority after stealing the Tesseract.", duration: "51 min", thumb: "https://image.tmdb.org/t/p/w300/oO47q2t195LI4tB4CxN6q121H6S.jpg" }
    ]
  },
  {
    id: "tt9652726", type: "series", title: "Lupin",
    year: 2023, rating: 7.5, match: 95, age: "TV-MA",
    seasons: 3, genres: ["Crime","Drama","Mystery"],
    cast: "Omar Sy, Ludivine Sagnier, Antoine Gouy, Soufiane Guerrab",
    desc: "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",
    thumb: "https://image.tmdb.org/t/p/w500/sg74Jv0n5oGE4oZztTRHQyZ0tge.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/e9N4gRI13m17ue6n4Wl49L2x43d.jpg",
    poster: "https://image.tmdb.org/t/p/w342/sg74Jv0n5oGE4oZztTRHQyZ0tge.jpg",
    episodes: [
      { title: "Chapter 1", desc: "Assane Diop plots the theft of a valuable necklace from the Louvre to seek justice for his late father.", duration: "47 min", thumb: "https://image.tmdb.org/t/p/w300/e9N4gRI13m17ue6n4Wl49L2x43d.jpg" }
    ]
  }
];

// Row configuration for home page
const ROWS = {
  trending:  { ids: ["tt6468322","tt9140554","tt9652726","tt4574334","tt0903747","tt11198330","tt4154796","tt10919420","tt0468569","tt3581920","tt1375666","tt0816692","tt0133093"], label: "Trending Now" },
  continue:  { ids: ["tt7366338","tt5180504","tt13443470","tt1475582","tt6751668","tt2861424"], label: "Continue Watching", progress: [0.65, 0.3, 0.2, 0.8, 0.45, 0.55] },
  toppicks:  { ids: ["tt6468322","tt9652726","tt0137523","tt0167260","tt13443470","tt0120737","tt10919420","tt1345836","tt0109830","tt4574334","tt0903747"], label: "Top Picks" },
  action:    { ids: ["tt9140554","tt6468322","tt11198330","tt4154796","tt0468569","tt3581920","tt1375666","tt0816692","tt0133093","tt5180504","tt1345836"], label: "Action & Adventure" },
  mylist:    { ids: ["tt0903747","tt1375666","tt7366338","tt0167260","tt3581920","tt11198330"], label: "My List" },
};
