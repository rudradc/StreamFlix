# 🎬 StreamFlix – Netflix Clone

A beautiful, fully-featured Netflix-inspired streaming UI built with pure HTML, CSS, and JavaScript.

## 📁 Project Structure

```
netflix-clone/
├── index.html        ← Home page (hero + content rows)
├── movies.html       ← Movies browser with filters
├── tvshows.html      ← TV Shows browser with filters
├── css/
│   └── style.css     ← All styles (dark theme, animations, responsive)
├── js/
│   ├── data.js       ← Movie/show data & row config
│   └── app.js        ← All interactivity logic
└── README.md
```

## ✨ Features

- **Hero Section** – Full-screen backdrop with title, description, Play & More Info buttons
- **Content Rows** – Horizontally scrollable rows (Trending, Continue Watching, Top Picks, Action, My List)
- **Hover Cards** – Netflix-style card zoom with action buttons on hover
- **Detail Modal** – Click any title to see full details, cast, genres, and episode list
- **My List** – Add/remove titles; persisted in localStorage
- **Search** – Live search across titles, cast, and genres
- **Movies Page** – Grid view with Genre / Year / Rating filters
- **TV Shows Page** – Grid view with genre filter
- **Responsive** – Mobile-friendly hamburger menu and adaptive layouts
- **Dark Theme** – Pure #0d0d0d background with Netflix-red accents

## 🚀 How to Run

**Option 1 – Open directly:**
Just double-click `index.html` in your file manager.

**Option 2 – Local server (recommended for best experience):**
```bash
# Python
cd netflix-clone
python -m http.server 8000

# Node.js (npx)
npx serve .
```
Then open http://localhost:8000

## 🛠 Tech Stack

| Layer      | Tech                    |
|------------|-------------------------|
| Markup     | HTML5                   |
| Styles     | CSS3 (custom properties, grid, flexbox, animations) |
| Logic      | Vanilla JavaScript (ES6+) |
| Icons      | Font Awesome 6          |
| Fonts      | Google Fonts – Inter    |
| Images     | TMDB CDN (public posters) |

## 📌 Notes

- No backend or API key required – all data is in `js/data.js`
- To add more titles, add objects to the `CONTENT` array in `js/data.js`
- Images are sourced from TMDB's public CDN

---
Built for educational/portfolio purposes.
