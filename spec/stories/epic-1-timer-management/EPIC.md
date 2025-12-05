# Epic 1: Quản lý Thời gian (Timer Management)

**ID:** EPIC-1
**Trạng thái:** ✅ Hoàn thành
**Mô tả:** Các tính năng cốt lõi của bộ đếm thời gian Pomodoro

---

## Tổng quan

Epic này bao gồm các tính năng cơ bản nhất của ứng dụng Pomodoro Timer:
- Khởi động, tạm dừng, reset bộ đếm
- Chuyển đổi giữa các chế độ làm việc và nghỉ ngơi
- Thông báo khi hoàn thành phiên
- Cấu hình thời gian cho mỗi chế độ

## User Stories

| ID | Tên | Trạng thái | File |
|----|-----|------------|------|
| US-1.1 | Khởi động phiên làm việc | ✅ Done | [US-1-1.md](US-1-1.md) |
| US-1.2 | Tạm dừng và tiếp tục | ✅ Done | [US-1-2.md](US-1-2.md) |
| US-1.3 | Reset bộ đếm | ✅ Done | [US-1-3.md](US-1-3.md) |
| US-1.4 | Chuyển đổi chế độ | ✅ Done | [US-1-4.md](US-1-4.md) |
| US-1.5 | Hoàn thành phiên làm việc | ✅ Done | [US-1-5.md](US-1-5.md) |
| US-1.6 | Cấu hình thời gian phiên làm việc | ✅ Done | [US-1-6.md](US-1-6.md) |

## RICE Score Summary

| User Story | Reach | Impact | Confidence | Effort | Score |
|------------|-------|--------|------------|--------|-------|
| US-1.1 | 100% | 3 | 100% | 0.5w | 600 |
| US-1.2 | 80% | 2 | 100% | 0.2w | 800 |
| US-1.3 | 60% | 1 | 100% | 0.1w | 600 |
| US-1.4 | 100% | 3 | 100% | 0.3w | 1000 |
| US-1.5 | 100% | 3 | 100% | 0.3w | 1000 |
| US-1.6 | 80% | 2 | 90% | 0.3w | 480 |

## Technical Notes

- Timer state: `isRunning`, `timeLeft`, `interval`
- Mode config trong `MODES` object
- Functions: `toggleTimer()`, `resetTimer()`, `setMode()`
