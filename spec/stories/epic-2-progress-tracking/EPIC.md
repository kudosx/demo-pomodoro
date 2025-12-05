# Epic 2: Theo dõi Tiến độ (Progress Tracking)

**ID:** EPIC-2
**Trạng thái:** ✅ Hoàn thành
**Mô tả:** Các tính năng giúp người dùng theo dõi và ghi lại hoạt động làm việc

---

## Tổng quan

Epic này bao gồm các tính năng theo dõi tiến độ:
- Đếm số phiên hoàn thành
- Timeline trực quan trong ngày
- Đặt tiêu đề cho phiên làm việc
- Quản lý dữ liệu timeline

## User Stories

| ID | Tên | Trạng thái | File |
|----|-----|------------|------|
| US-2.1 | Đếm số phiên hoàn thành | ✅ Done | [US-2-1.md](US-2-1.md) |
| US-2.2 | Timeline trong ngày | ✅ Done | [US-2-2.md](US-2-2.md) |
| US-2.3 | Đặt tiêu đề phiên | ✅ Done | [US-2-3.md](US-2-3.md) |
| US-2.4 | Xóa timeline | ✅ Done | [US-2-4.md](US-2-4.md) |

## RICE Score Summary

| User Story | Reach | Impact | Confidence | Effort | Score |
|------------|-------|--------|------------|--------|-------|
| US-2.1 | 100% | 2 | 100% | 0.2w | 1000 |
| US-2.2 | 80% | 2 | 100% | 0.5w | 320 |
| US-2.3 | 50% | 1 | 80% | 0.3w | 133 |
| US-2.4 | 30% | 0.5 | 100% | 0.1w | 150 |

## Data Persistence

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Timer Complete │ ──► │  addToTimeline() │ ──► │  localStorage   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    Page Load    │ ◄── │  getTimeline()   │ ◄── │  Check todayKey │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

- localStorage key: `pomodoroTimeline`
- Auto-reset khi `todayKey` thay đổi
