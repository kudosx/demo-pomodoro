# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a static web application with no build tools. Open `index.html` directly in a browser or use a local server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

**Static single-page application** with vanilla HTML, CSS, and JavaScript. No frameworks or build process.

### File Structure

- `index.html` - Main application (HTML structure + inline JavaScript)
- `css/styles.css` - All styles (extracted from index.html)
- `preferences.js` - User preferences config (PREFERENCES object with music.mood and music.volume)
- `music/peaceful/` - Calm mood music tracks (MP3)
- `music/energetic/` - Energy mood music tracks (MP3)

### Key Components

**Timer System** (in index.html script):
- `MODES` object defines work (25min), shortBreak (5min), longBreak (15min)
- `toggleTimer()`, `resetTimer()`, `setMode()` control timer state
- Timeline stored in localStorage under key `pomodoroTimeline`

**Music Player**:
- `MUSIC` object maps mood categories to track arrays
- Tracks shuffle on playlist completion
- `trackRatings` object stores per-track likes/dislikes (not persisted)
- Preferences loaded from `preferences.js` on startup via `loadPreferences()`

**Settings Modal**:
- Three tabs: Mood, Sound, Library
- `switchTab()` handles tab navigation
- Library tab renders all tracks with `renderMusicList()`

### Data Persistence

- Timeline uses localStorage (auto-clears on new day via `todayKey`)
- Music preferences in `preferences.js` (static file, not auto-saved)
- Track ratings are session-only (lost on refresh)
