<div align="center">

  # 🍿 StreamFlix — Next-Gen Netflix Clone

  <p align="center">
    <b>A premium, feature-rich streaming web application inspired by Netflix, built with React 19, Vite, Three.js 3D visuals, Tailwind CSS, GSAP animations, and AI content discovery.</b>
  </p>

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**StreamFlix** goes beyond standard UI clones by combining modern web graphics, smooth animations, and intelligent user interaction into a seamlessly designed video streaming experience. Inspired by Netflix's signature interface, StreamFlix introduces **interactive 3D canvas visuals**, **smart AI-driven recommendations**, a **custom HTML5 media player**, and multi-profile watch state management.

---

## 🔥 Key Features

- 🍿 **Signature Netflix UI/UX**: Dark-mode glassmorphism design, responsive horizontal carousels, hero video showcases, and fluid hover cards.
- 🌌 **Interactive 3D Backgrounds**: Powered by Three.js particle visualizers for an elevated cinema atmosphere.
- 🤖 **AI Recommendation Engine**: Smart movie and series suggestions based on genre preference, watch history, and user moods.
- 🎬 **Custom Media Player**: Built-in video engine featuring custom controls, resolution switcher, audio/subtitle toggles, and skip-intro options.
- 👤 **Multi-Profile & Dashboard**: Seamless user switching, watch time statistics, history tracking, and profile customization.
- ➕ **Persistent Watchlist (My List)**: Easily bookmark titles and resume watching anytime with persistent state.
- 🎭 **Rich Details Modal**: View comprehensive metadata, trailers, cast lists, match scores, and related recommendations.
- ⚡ **Ultra Fast Performance**: Instant Hot Module Replacement (HMR) and optimized build bundling via Vite.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+) |
| **Build Tool** | Vite 6 |
| **Styling & Design System** | Tailwind CSS 3, Vanilla CSS |
| **3D Graphics & Visuals** | Three.js |
| **Animations & FX** | GSAP (GreenSock Animation Platform) |
| **Icons** | Lucide React |
| **Deployment** | Vercel Ready |

---

## 🚀 Getting Started

Follow these steps to run StreamFlix locally on your machine.

### Prerequisites

Ensure you have Node.js (v18.0 or higher) and npm installed:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rudradc/StreamFlix.git
   cd StreamFlix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Project Structure

```
StreamFlix-Netflix-Clone/
├── streamflix-react/            # Main React 19 + Vite Application
│   ├── public/                  # Static assets & media
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── Background3D.jsx # Three.js Canvas Visualizer
│   │   │   ├── VideoPlayer.jsx  # Custom Video Player Engine
│   │   │   ├── HeroBanner.jsx   # Interactive Spotlight Banner
│   │   │   ├── MediaRow.jsx     # Horizontal Media Carousels
│   │   │   ├── MediaCard.jsx    # Hoverable Content Card
│   │   │   └── DetailsModal.jsx # Full-screen Metadata Modal
│   │   ├── pages/               # Application Pages
│   │   │   ├── LandingPage.jsx  # Main Home Stream Page
│   │   │   ├── AIRecommendations.jsx # AI Match Page
│   │   │   ├── UserDashboard.jsx # Profiles & Analytics
│   │   │   ├── MyList.jsx       # Saved Watchlist
│   │   │   └── NewAndPopular.jsx # Trending & Latest Releases
│   │   ├── context/             # React Context (State & Watchlist)
│   │   ├── data/                # Mock Catalog & Metadata
│   │   ├── App.jsx              # Main Router & Layout Engine
│   │   └── index.css            # Tailwind & Custom CSS Utilities
│   └── package.json
├── package.json                 # Root Workspaces Configuration
└── vercel.json                  # Production Deployment Config
```

---

## 🌐 Deployment

StreamFlix is configured for 1-click deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel will automatically detect `vercel.json` and build the `streamflix-react` app.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/rudradc/StreamFlix/issues).

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
