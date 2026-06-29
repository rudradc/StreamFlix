// ══════════════════════════════════════════════
//  StreamFlix – App Logic
// ══════════════════════════════════════════════

// ── Startup Active Profile Redirect Check ─────
(function() {
  const currentPath = window.location.pathname;
  if (!currentPath.endsWith('profiles.html')) {
    const activeProfile = localStorage.getItem('sf_current_profile');
    if (!activeProfile) {
      window.location.href = 'profiles.html';
    }
  }
})();

// ── State ─────────────────────────────────────
let myList = JSON.parse(localStorage.getItem('sf_mylist') || '[]');
let currentModal = null;

// ── LED Light Styles mapping helper ───────────
function getLedStyles(item) {
  const genres = (item.genres || []).map(g => g.toLowerCase());
  const title = (item.title || '').toLowerCase();
  
  // Default Crimson Red
  let color = '#ff003c'; 
  let glow = 'rgba(255, 0, 60, 0.55)';
  let glowDim = 'rgba(255, 0, 60, 0.15)';
  let colorAlpha30 = 'rgba(255, 0, 60, 0.35)';

  const hasGenre = (val) => genres.some(g => g.includes(val));
  
  if (
    hasGenre('horror') || 
    hasGenre('supernatural') || 
    hasGenre('apocalyptic') || 
    hasGenre('survival') || 
    hasGenre('animation') ||
    title.includes('witcher') || 
    title.includes('last of us') || 
    title.includes('squid game') || 
    title.includes('rick and morty')
  ) {
    color = '#05ffc4'; // Neon Emerald Green
    glow = 'rgba(5, 255, 196, 0.55)';
    glowDim = 'rgba(5, 255, 196, 0.15)';
    colorAlpha30 = 'rgba(5, 255, 196, 0.35)';
  } else if (
    hasGenre('sci-fi') || 
    hasGenre('space') || 
    hasGenre('mystery') || 
    title.includes('sherlock') || 
    title.includes('inception') || 
    title.includes('dark') || 
    title.includes('black mirror')
  ) {
    color = '#00d2ff'; // Cyber Electric Cyan
    glow = 'rgba(0, 210, 255, 0.55)';
    glowDim = 'rgba(0, 210, 255, 0.15)';
    colorAlpha30 = 'rgba(0, 210, 255, 0.35)';
  } else if (
    hasGenre('fantasy') || 
    hasGenre('adventure') || 
    hasGenre('royal') || 
    hasGenre('historical') ||
    title.includes('crown') || 
    title.includes('arcane') || 
    title.includes('succession')
  ) {
    color = '#ffaa00'; // Vibrant Amber Gold
    glow = 'rgba(255, 170, 0, 0.55)';
    glowDim = 'rgba(255, 170, 0, 0.15)';
    colorAlpha30 = 'rgba(255, 170, 0, 0.35)';
  } else if (
    hasGenre('superhero') || 
    hasGenre('action') || 
    hasGenre('comedy') ||
    title.includes('avengers') || 
    title.includes('dark knight') || 
    title.includes('wednesday')
  ) {
    color = '#a020f0'; // Bright Electric Violet
    glow = 'rgba(160, 32, 240, 0.55)';
    glowDim = 'rgba(160, 32, 240, 0.15)';
    colorAlpha30 = 'rgba(160, 32, 240, 0.35)';
  }

  return { color, glow, glowDim, colorAlpha30 };
}

// ── Dynamic Profile UI Sync ───────────────────
function updateUIForCurrentProfile() {
  const activeProfileRaw = localStorage.getItem('sf_current_profile');
  if (!activeProfileRaw) return;

  try {
    const profile = JSON.parse(activeProfileRaw);
    
    // Toggle theme class on body
    document.body.classList.remove('theme-alex', 'theme-sarah', 'theme-kids', 'theme-guest');
    if (profile.name === 'Alex Flix') document.body.classList.add('theme-alex');
    else if (profile.name === 'Sarah Flix') document.body.classList.add('theme-sarah');
    else if (profile.name === 'Kids Room') document.body.classList.add('theme-kids');
    else if (profile.name === 'Guest Streamer') document.body.classList.add('theme-guest');
    
    // 1. Update avatars
    const avatars = document.querySelectorAll('.avatar, .dd-avatar, .panel-avatar');
    avatars.forEach(img => {
      img.src = profile.avatar;
    });

    // 2. Update names
    const names = document.querySelectorAll('.dd-name, .panel-name');
    names.forEach(el => {
      el.textContent = profile.name;
    });

    // 3. Update emails
    const emails = document.querySelectorAll('.dd-email, .panel-email');
    emails.forEach(el => {
      el.textContent = profile.email;
    });
  } catch (e) {
    console.error("Error parsing current profile", e);
  }
}

// ── Unified Signout Handler ───────────────────
function handleSignout() {
  if (document.getElementById('signoutOverlay')) {
    openSignoutDialog();
  } else {
    // If on subpages where signout dialog markup doesn't exist, sign out instantly
    localStorage.removeItem('sf_current_profile');
    window.location.href = 'profiles.html';
  }
}

// ── Navbar scroll ─────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Inject the website-wide viewport frame
  let frame = document.querySelector('.app-viewport-frame');
  if (!frame) {
    frame = document.createElement('div');
    frame.className = 'app-viewport-frame';
    document.body.appendChild(frame);
  }

  // Sync profile details
  updateUIForCurrentProfile();

  // Check URL params to auto-open panels (cross-page logic)
  const params = new URLSearchParams(window.location.search);
  if (params.get('panel') === 'profile') {
    openProfilePanel();
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (params.get('panel') === 'settings') {
    openSettingsPanel();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (ham) ham.addEventListener('click', () => links.classList.toggle('open'));

  // Search toggle
  const searchBox = document.getElementById('searchBox');
  const searchIcon = document.getElementById('searchIcon');
  const searchInput = document.getElementById('searchInput');

  // Profile dropdown mobile click toggle
  const profileMenu = document.querySelector('.profile-menu');
  if (profileMenu) {
    profileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('active');
    });
    document.addEventListener('click', () => {
      profileMenu.classList.remove('active');
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchBox.classList.toggle('open');
      if (searchBox.classList.contains('open')) searchInput.focus();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
    });
  }

  // Init page rows
  initRows();

  // Init Hero Carousel (Sliding Photo feature)
  initCarousel();
});

// ── Init home page rows ───────────────────────
function initRows() {
  if (document.getElementById('trending')) {
    renderRow(ROWS.trending.ids, 'trending');
    renderRow(ROWS.continue.ids, 'continue', ROWS.continue.progress);
    renderRow(ROWS.toppicks.ids, 'toppicks');
    renderRow(ROWS.action.ids, 'action');
    renderRow(ROWS.mylist.ids, 'mylist');
  }
}

// ── Render a horizontal row ───────────────────
function renderRow(ids, containerId, progress) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  ids.forEach((id, idx) => {
    const item = CONTENT.find(c => c.id === id);
    if (!item) return;
    el.appendChild(makeCard(item, idx + 1, progress ? progress[idx] : null));
  });
}

// ── Build a card element ──────────────────────
function makeCard(item, rank, progress) {
  const div = document.createElement('div');
  div.className = 'card led-glow-card';
  div.onclick = () => openModal(item.id);

  // Set LED custom properties
  const styles = getLedStyles(item);
  div.style.setProperty('--led-color', styles.color);
  div.style.setProperty('--led-glow', styles.glow);
  div.style.setProperty('--led-glow-dim', styles.glowDim);
  div.style.setProperty('--led-color-alpha30', styles.colorAlpha30);

  const inList = myList.includes(item.id);
  const progBar = progress
    ? `<div class="card-progress"><div class="card-progress-bar" style="width:${progress*100}%"></div></div>`
    : '';
  const rankBadge = rank <= 10
    ? `<div class="card-rank">${rank}</div>` : '';

  div.innerHTML = `
    <div class="card-thumb">
      <img src="${item.thumb}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/220x124/141414/808080?text=${encodeURIComponent(item.title)}'"/>
    </div>
    ${rankBadge}
    <div class="card-hover">
      <div class="card-hover-buttons">
        <button class="card-hover-btn play-btn" onclick="event.stopPropagation(); openModal('${item.id}')">
          <i class="fas fa-play"></i>
        </button>
        <button class="card-hover-btn ${inList ? 'added' : ''}"
          onclick="event.stopPropagation(); toggleListById('${item.id}', this)">
          <i class="fas fa-${inList ? 'check' : 'plus'}"></i>
        </button>
        <button class="card-hover-btn"><i class="fas fa-thumbs-up"></i></button>
        <button class="card-hover-btn card-hover-expand"
          onclick="event.stopPropagation(); openModal('${item.id}')">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="card-hover-title">${item.title}</div>
      <div class="card-hover-meta">
        <span class="card-match">${item.match}% Match</span>
        <span class="card-rating"><i class="fas fa-star" style="color: var(--gold); margin-right: 2px;"></i>${item.rating}</span>
        <span class="card-age">${item.age}</span>
        <span>${item.year}</span>
        ${item.type === 'series' ? `<span>${item.seasons}S</span>` : ''}
      </div>
      <div class="card-genres">${item.genres.slice(0,3).join(' • ')}</div>
      ${progBar}
    </div>`;
  return div;
}

// ── Render grid (movies / tv pages) ──────────
function renderGrid(items, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p style="color:#808080;padding:20px">No results found.</p>'; return; }
  el.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'grid-card led-glow-card';
    div.onclick = () => openModal(item.id);

    // Set LED custom properties
    const styles = getLedStyles(item);
    div.style.setProperty('--led-color', styles.color);
    div.style.setProperty('--led-glow', styles.glow);
    div.style.setProperty('--led-glow-dim', styles.glowDim);
    div.style.setProperty('--led-color-alpha30', styles.colorAlpha30);

    const inList = myList.includes(item.id);
    div.innerHTML = `
      <img src="${item.poster || item.thumb}"
        alt="${item.title}" loading="lazy"
        onerror="this.src='https://via.placeholder.com/180x270/141414/808080?text=${encodeURIComponent(item.title)}'"/>
      <div class="grid-card-overlay">
        <div class="grid-card-title">${item.title}</div>
        <div class="grid-card-meta">
          <span class="grid-card-rating"><i class="fas fa-star"></i> ${item.rating}</span>
          <span>${item.year}</span>
          <span>${item.age}</span>
        </div>
        <div class="grid-card-actions">
          <button class="gc-btn play" onclick="event.stopPropagation(); openModal('${item.id}')">
            <i class="fas fa-play"></i>
          </button>
          <button class="gc-btn ${inList ? 'added' : ''}"
            onclick="event.stopPropagation(); toggleListById('${item.id}', this)">
            <i class="fas fa-${inList ? 'check' : 'plus'}"></i>
          </button>
        </div>
      </div>`;
    el.appendChild(div);
  });
}

// ── Open modal ────────────────────────────────
function openModal(id) {
  const item = CONTENT.find(c => c.id === id);
  if (!item) return;
  currentModal = item;

  document.getElementById('modalHeroImg').src = item.backdrop || item.thumb;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalMeta').innerHTML = `
    <span class="modal-match">${item.match}% Match</span>
    <span class="modal-rating"><i class="fas fa-star" style="color: var(--gold); margin-right: 4px;"></i>${item.rating}</span>
    <span class="modal-year">${item.year}</span>
    ${item.type === 'series' ? `<span class="modal-seasons">${item.seasons} Season${item.seasons > 1 ? 's' : ''}</span>` : ''}
    <span class="modal-age">${item.age}</span>
    <span class="modal-hd">HD</span>`;
  document.getElementById('modalCast').innerHTML = `<b>Cast:</b> ${item.cast}`;
  document.getElementById('modalGenres').innerHTML = `<b>Genres:</b> ${item.genres.join(', ')}`;

  // List button state
  const btn = document.getElementById('modalListBtn');
  const inList = myList.includes(item.id);
  btn.innerHTML = `<i class="fas fa-${inList ? 'check' : 'plus'}"></i>`;
  btn.className = `btn-circle${inList ? ' added' : ''}`;
  btn.title = inList ? 'Remove from My List' : 'Add to My List';

  // Episodes
  const epContainer = document.getElementById('modalEpisodes');
  if (item.episodes && item.episodes.length) {
    epContainer.innerHTML = `<h3>Episodes</h3>` +
      item.episodes.map((ep, i) => `
        <div class="episode-item">
          <div class="episode-thumb">
            <img src="${ep.thumb}" alt="" onerror="this.parentElement.style.background='#1a1a1a'"/>
            <div class="ep-play"><i class="fas fa-play-circle"></i></div>
          </div>
          <div class="episode-info">
            <h4>${i + 1}. ${ep.title}</h4>
            <p>${ep.desc}</p>
          </div>
          <span class="episode-duration">${ep.duration}</span>
        </div>`).join('');
  } else {
    epContainer.innerHTML = '';
  }

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ── Close modal ───────────────────────────────
function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  currentModal = null;
}

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeSearch();
  }
});

// ── Toggle My List ────────────────────────────
function toggleList(btn) {
  if (!currentModal) return;
  toggleListById(currentModal.id, btn);
  // Sync modal button
  const inList = myList.includes(currentModal.id);
  btn.innerHTML = `<i class="fas fa-${inList ? 'check' : 'plus'}"></i>`;
  btn.className = `btn-circle${inList ? ' added' : ''}`;
}

function toggleListById(id, btn) {
  const idx = myList.indexOf(id);
  const item = CONTENT.find(c => c.id === id);
  if (idx > -1) {
    myList.splice(idx, 1);
    if (btn) { btn.innerHTML = '<i class="fas fa-plus"></i>'; btn.classList.remove('added'); }
    showToast(`"${item?.title}" removed from My List`);
  } else {
    myList.push(id);
    if (btn) { btn.innerHTML = '<i class="fas fa-check"></i>'; btn.classList.add('added'); }
    showToast(`"${item?.title}" added to My List`);
  }
  localStorage.setItem('sf_mylist', JSON.stringify(myList));
}

// ── Scroll row ────────────────────────────────
function scrollRow(btn, dir) {
  const wrapper = btn.closest('.row-wrapper');
  const row = wrapper.querySelector('.cards-row');
  row.scrollBy({ left: dir * 700, behavior: 'smooth' });
}

// ── Search ────────────────────────────────────
function handleSearch() {
  const q = document.getElementById('searchInput')?.value.trim().toLowerCase();
  const container = document.getElementById('searchResults');
  if (!container) return;

  if (!q) { container.classList.remove('visible'); return; }

  const results = CONTENT.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.genres.some(g => g.toLowerCase().includes(q)) ||
    c.cast.toLowerCase().includes(q)
  );

  if (!results.length) {
    container.innerHTML = `<h3>Search results for "${q}"</h3><p class="no-results">No titles found.</p>`;
  } else {
    container.innerHTML = `
      <h3>${results.length} result${results.length > 1 ? 's' : ''} for "${q}"</h3>
      <div class="search-grid">
        ${results.map(r => `
          <div class="search-result-card" onclick="openModal('${r.id}')">
            <img src="${r.thumb}" alt="${r.title}" onerror="this.src='https://via.placeholder.com/140x79/141414/808080?text=${encodeURIComponent(r.title)}'"/>
            <div class="search-result-title">${r.title}</div>
          </div>`).join('')}
      </div>`;
  }
  container.classList.add('visible');
}

function closeSearch() {
  const input = document.getElementById('searchInput');
  const box   = document.getElementById('searchBox');
  const container = document.getElementById('searchResults');
  if (input) input.value = '';
  if (box)   box.classList.remove('open');
  if (container) container.classList.remove('visible');
}

// ── Toast ─────────────────────────────────────
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Hero Carousel (Sliding Photo feature) ─────
function initCarousel() {
  const container = document.getElementById('heroCarouselContainer');
  const slidesWrapper = document.getElementById('heroSlides');
  const indicatorsWrapper = document.getElementById('carouselIndicators');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');

  if (!container || !slidesWrapper) return;

  // Use top high-quality content items for the Hero sliding list
  const CAROUSEL_IDS = ["tt4574334", "tt1375666", "tt5180504", "tt0816692"];
  const carouselItems = CAROUSEL_IDS.map(id => CONTENT.find(c => c.id === id)).filter(Boolean);

  if (carouselItems.length === 0) return;

  // Generate slides and indicators HTML
  slidesWrapper.innerHTML = '';
  indicatorsWrapper.innerHTML = '';

  carouselItems.forEach((item, index) => {
    // Slide layout
    const slide = document.createElement('div');
    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slide.setAttribute('data-id', item.id);
    
    // Custom label text for the badge to be more descriptive & dynamic
    let badgeText = '#1 Trending Today';
    let iconClass = 'fa-fire';
    if (index === 1) { badgeText = 'Critically Acclaimed'; iconClass = 'fa-award'; }
    if (index === 2) { badgeText = 'Viewer Favorite'; iconClass = 'fa-thumbs-up'; }
    if (index === 3) { badgeText = 'Sci-Fi Masterpiece'; iconClass = 'fa-user-astronaut'; }

    slide.innerHTML = `
      <div class="hero-bg">
        <img src="${item.backdrop}" alt="${item.title}" class="hero-img"/>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge"><i class="fas ${iconClass}"></i> ${badgeText}</div>
        <h1 class="hero-title">${item.title}</h1>
        <div class="hero-meta">
          <span class="match">${item.match}% Match</span>
          <span class="hero-rating"><i class="fas fa-star" style="color: var(--gold); margin-right: 4px;"></i>${item.rating}</span>
          <span>${item.year}</span>
          <span class="rating-badge">${item.age}</span>
          <span>${item.type === 'series' ? `${item.seasons} Seasons` : 'Movie'}</span>
        </div>
        <p class="hero-desc">${item.desc}</p>
        <div class="hero-buttons">
          <button class="btn-play" onclick="openModal('${item.id}')">
            <i class="fas fa-play"></i> Play
          </button>
          <button class="btn-info" onclick="openModal('${item.id}')">
            <i class="fas fa-info-circle"></i> More Info
          </button>
        </div>
      </div>
    `;
    slidesWrapper.appendChild(slide);

    // Indicator dot
    const dot = document.createElement('button');
    dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => { goToSlide(index); startAutoSlide(); });
    indicatorsWrapper.appendChild(dot);
  });

  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  let activeIndex = 0;
  let autoSlideTimer = null;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[activeIndex].classList.remove('active');
    dots[activeIndex].classList.remove('active');

    activeIndex = (index + slides.length) % slides.length;

    slides[activeIndex].classList.add('active');
    dots[activeIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(activeIndex + 1);
  }

  function prevSlide() {
    goToSlide(activeIndex - 1);
  }

  // Click bindings
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });

  // Auto-play logic
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  // Hover triggers
  container.addEventListener('mouseenter', stopAutoSlide);
  container.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

// ══════════════════════════════════════════════
//  PROFILE PANEL
// ══════════════════════════════════════════════

function openProfilePanel() {
  // Update dynamic stats
  const listCount = JSON.parse(localStorage.getItem('sf_mylist') || '[]').length;
  const statListEl = document.getElementById('statList');
  if (statListEl) statListEl.textContent = listCount;

  // Populate recently watched from ROWS data
  const panelRecent = document.getElementById('panelRecent');
  if (panelRecent && typeof ROWS !== 'undefined') {
    const recentIds = [...ROWS.continue.ids, ...ROWS.trending.ids].slice(0, 6);
    panelRecent.innerHTML = recentIds.map(id => {
      const item = CONTENT.find(c => c.id === id);
      if (!item) return '';
      return `<div class="recent-thumb" onclick="closeProfilePanel(); openModal('${item.id}')">
        <img src="${item.thumb}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/100x58/141414/808080?text=${encodeURIComponent(item.title)}'"/>
        <div class="recent-thumb-title">${item.title}</div>
      </div>`;
    }).join('');
  }

  document.getElementById('profilePanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProfilePanel() {
  document.getElementById('profilePanel').classList.remove('open');
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════
//  SETTINGS PANEL
// ══════════════════════════════════════════════

function openSettingsPanel() {
  // Load saved settings
  const saved = JSON.parse(localStorage.getItem('sf_settings') || '{}');
  if ('autoplay' in saved) document.getElementById('settingAutoplay').checked = saved.autoplay;
  if ('previews' in saved) document.getElementById('settingPreviews').checked = saved.previews;
  if ('quality' in saved) document.getElementById('settingQuality').value = saved.quality;
  if ('notifyNew' in saved) document.getElementById('settingNotifyNew').checked = saved.notifyNew;
  if ('notifyReminder' in saved) document.getElementById('settingNotifyReminder').checked = saved.notifyReminder;
  if ('mature' in saved) document.getElementById('settingMature').checked = saved.mature;
  if ('subtitles' in saved) document.getElementById('settingSubtitles').value = saved.subtitles;

  document.getElementById('settingsPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSettingsPanel() {
  document.getElementById('settingsPanel').classList.remove('open');
  document.body.style.overflow = '';
}

function saveSettingsToStorage() {
  const settings = {
    autoplay:       document.getElementById('settingAutoplay')?.checked,
    previews:       document.getElementById('settingPreviews')?.checked,
    quality:        document.getElementById('settingQuality')?.value,
    notifyNew:      document.getElementById('settingNotifyNew')?.checked,
    notifyReminder: document.getElementById('settingNotifyReminder')?.checked,
    mature:         document.getElementById('settingMature')?.checked,
    subtitles:      document.getElementById('settingSubtitles')?.value,
  };
  localStorage.setItem('sf_settings', JSON.stringify(settings));
  showToast('✅ Settings saved successfully!');
  closeSettingsPanel();
}

// ══════════════════════════════════════════════
//  SIGN OUT DIALOG
// ══════════════════════════════════════════════

function openSignoutDialog() {
  closeProfilePanel();
  closeSettingsPanel();
  document.getElementById('signoutOverlay').classList.add('open');
}

function closeSignoutDialog() {
  document.getElementById('signoutOverlay').classList.remove('open');
}

// ══════════════════════════════════════════════
//  WIRE UP ALL PANEL INTERACTIONS
// ══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Dropdown → Profile Panel
  document.querySelectorAll('#dropProfile, .profile-dropdown .profile-item:first-child').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelector('.profile-menu')?.classList.remove('active');
      if (document.getElementById('profilePanel')) {
        openProfilePanel();
      } else {
        window.location.href = 'index.html?panel=profile';
      }
    });
  });

  // ── Dropdown → Settings Panel
  document.querySelectorAll('#dropSettings, .profile-dropdown .profile-item:nth-child(2)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelector('.profile-menu')?.classList.remove('active');
      if (document.getElementById('settingsPanel')) {
        openSettingsPanel();
      } else {
        window.location.href = 'index.html?panel=settings';
      }
    });
  });

  // ── Dropdown → Help Center
  document.querySelectorAll('#dropHelp, .profile-dropdown .profile-item:nth-child(3):not(.signout)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelector('.profile-menu')?.classList.remove('active');
      showToast('📚 Help Center coming soon!');
    });
  });

  // ── Dropdown → Sign Out
  document.querySelectorAll('#dropSignout, .profile-dropdown .profile-item.signout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelector('.profile-menu')?.classList.remove('active');
      handleSignout();
    });
  });

  // ── Profile Panel close button
  document.getElementById('closeProfilePanel')?.addEventListener('click', closeProfilePanel);

  // ── Profile Panel → open Settings
  document.getElementById('openSettingsFromProfile')?.addEventListener('click', () => {
    closeProfilePanel();
    openSettingsPanel();
  });

  // ── Profile Panel → Sign Out
  document.getElementById('signoutFromProfile')?.addEventListener('click', handleSignout);

  // ── Settings Panel close button
  document.getElementById('closeSettingsPanel')?.addEventListener('click', closeSettingsPanel);

  // ── Settings save button
  document.getElementById('saveSettings')?.addEventListener('click', saveSettingsToStorage);

  // ── Settings download history
  document.getElementById('downloadHistory')?.addEventListener('click', () => {
    showToast('📥 Viewing history download started!');
  });

  // ── Settings clear history
  document.getElementById('clearHistory')?.addEventListener('click', () => {
    localStorage.removeItem('sf_mylist');
    myList = [];
    showToast('🗑️ Watch history cleared.');
  });

  // ── Sign out dialog buttons
  document.getElementById('signoutCancel')?.addEventListener('click', closeSignoutDialog);
  document.getElementById('signoutConfirm')?.addEventListener('click', () => {
    closeSignoutDialog();
    showToast('👋 Signed out successfully. See you soon!');
    localStorage.removeItem('sf_current_profile');
    setTimeout(() => {
      document.body.style.filter = 'brightness(0)';
      document.body.style.transition = 'filter 0.8s ease';
    }, 800);
    setTimeout(() => {
      window.location.href = 'profiles.html';
    }, 1600);
  });

  // ── Close panels when clicking overlay backdrop
  document.getElementById('profilePanel')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('profilePanel')) closeProfilePanel();
  });
  document.getElementById('settingsPanel')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('settingsPanel')) closeSettingsPanel();
  });
  document.getElementById('signoutOverlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('signoutOverlay')) closeSignoutDialog();
  });

  // ── Escape key closes panels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfilePanel();
      closeSettingsPanel();
      closeSignoutDialog();
    }
  }, { capture: false });
});

