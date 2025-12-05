# Epic 3: Trình phát Nhạc (Music Player)

**ID:** EPIC-3
**Trạng thái:** ✅ Hoàn thành
**Mô tả:** Tính năng phát nhạc nền hỗ trợ tập trung với 2 mood và thư viện 29 bài

---

## Tổng quan

Epic này bao gồm toàn bộ tính năng music player:
- Bật/tắt nhạc nền
- Chọn mood (Calm/Energy)
- Like/Dislike và skip bài hát

## User Stories

| ID | Tên | Trạng thái | File |
|----|-----|------------|------|
| US-3.1 | Bật/tắt nhạc nền | ✅ Done | [US-3-1.md](US-3-1.md) |
| US-3.2 | Chọn mood nhạc | ✅ Done | [US-3-2.md](US-3-2.md) |
| US-3.3 | Like/Dislike bài hát | ✅ Done | [US-3-3.md](US-3-3.md) |
| US-3.4 | Skip bài hát | ✅ Done | [US-3-4.md](US-3-4.md) |

## RICE Score Summary

| User Story | Reach | Impact | Confidence | Effort | Score |
|------------|-------|--------|------------|--------|-------|
| US-3.1 | 70% | 2 | 100% | 0.5w | 280 |
| US-3.2 | 70% | 2 | 100% | 0.3w | 467 |
| US-3.3 | 40% | 1 | 80% | 0.3w | 107 |
| US-3.4 | 60% | 1 | 100% | 0.1w | 600 |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Music Controls Bar                        │
│  ┌────┐ │ ┌─────────────┐ │ ┌────┐┌────┐ │ 👍 0 👎 0 │ ┌────┐  │
│  │ ▶  │ │ │ Track Name  │ │ │Calm││Engy│ │           │ │ ⏭  │  │
│  └────┘ │ └─────────────┘ │ └────┘└────┘ │           │ └────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Playlist Content

**Peaceful (16 tracks):** A Special Morning, Seamlessly Loved, Hierbabuena, Solar Eclipse, Evening Draws Near, Flycatcher, Stonecutters, Vostoc, Calming State, My Cozy Christmas Mood, Prince Kali, Casita, If I Lose Myself Dancing, Mirage Lounge, Litang, La Lune Et La Mouette

**Energetic (13 tracks):** Cosmic Funk, CKT Rip, Feel The Beat, 24K, Dominion, Neon Favelas, A Different Life, Visionary Connection, Fighters Game, Skyline Hustle, Freaky Trumpets, Nothing Can Stop Us, You Were Right
