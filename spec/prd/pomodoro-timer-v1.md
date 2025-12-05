# PRD: Pomodoro Timer - Ứng dụng Quản lý Thời gian Tập trung

**Phiên bản:** 1.0
**Ngày tạo:** 02/12/2025
**Trạng thái:** Đã phát hành (Current State Documentation)

---

## 1. Problem Statement (Vấn đề cần giải quyết)

### Bối cảnh
Người dùng gặp khó khăn trong việc duy trì sự tập trung khi làm việc hoặc học tập. Các vấn đề thường gặp:

- **Mất tập trung liên tục**: Không có cơ chế phân chia thời gian làm việc và nghỉ ngơi hợp lý
- **Thiếu động lực**: Không theo dõi được tiến độ và số phiên làm việc đã hoàn thành
- **Môi trường ồn ào**: Cần âm nhạc nền phù hợp để hỗ trợ tập trung nhưng việc tìm kiếm/quản lý nhạc gây phân tâm
- **Không có kỷ luật**: Thiếu công cụ nhắc nhở nghỉ ngơi đúng lúc

### Đối tượng người dùng
- Học sinh, sinh viên cần tập trung học bài
- Người đi làm cần quản lý thời gian làm việc hiệu quả
- Freelancer, người làm việc từ xa cần tự kỷ luật bản thân
- Bất kỳ ai muốn áp dụng kỹ thuật Pomodoro

---

## 2. Proposed Solution (Giải pháp đề xuất)

### Tổng quan sản phẩm
Pomodoro Timer là ứng dụng web tĩnh (static web app) giúp người dùng áp dụng kỹ thuật Pomodoro với các tính năng:

1. **Bộ đếm thời gian thông minh** với 3 chế độ cấu hình sẵn
2. **Trình phát nhạc nền** với 2 mood (Calm/Energy) và 29 bài hát
3. **Timeline theo dõi** các phiên làm việc trong ngày
4. **Giao diện đơn giản**, không cần đăng ký/đăng nhập

### Kiến trúc kỹ thuật
- **Frontend**: Vanilla HTML, CSS, JavaScript (không framework)
- **Lưu trữ**: localStorage cho timeline, file tĩnh cho preferences
- **Âm thanh**: File MP3 local, phân chia theo mood

---

## 3. User Stories (Câu chuyện người dùng)

### Epic 1: Quản lý Thời gian (Timer Management)

#### US-1.1: Khởi động phiên làm việc
```
Là một người dùng,
Tôi muốn bắt đầu bộ đếm thời gian 25 phút,
Để tôi có thể tập trung làm việc trong một khoảng thời gian xác định.

Tiêu chí chấp nhận:
- [x] Hiển thị đồng hồ đếm ngược 25:00
- [x] Nút Start chuyển thành Pause khi đang chạy
- [x] Thời gian đếm ngược chính xác từng giây
- [x] Hiển thị nhãn "Work Time" khi ở chế độ làm việc
```

#### US-1.2: Tạm dừng và tiếp tục
```
Là một người dùng,
Tôi muốn tạm dừng bộ đếm thời gian,
Để tôi có thể xử lý việc khẩn cấp mà không mất tiến độ.

Tiêu chí chấp nhận:
- [x] Nút Pause dừng đồng hồ ngay lập tức
- [x] Thời gian còn lại được giữ nguyên
- [x] Nút chuyển về Start để tiếp tục
- [x] Có thể tiếp tục từ điểm dừng
```

#### US-1.3: Reset bộ đếm
```
Là một người dùng,
Tôi muốn reset bộ đếm về thời gian ban đầu,
Để tôi có thể bắt đầu lại phiên làm việc mới.

Tiêu chí chấp nhận:
- [x] Nút Reset đưa thời gian về giá trị mặc định của mode hiện tại
- [x] Dừng đồng hồ nếu đang chạy
- [x] Nút Start xuất hiện lại
```

#### US-1.4: Chuyển đổi chế độ
```
Là một người dùng,
Tôi muốn chuyển giữa các chế độ Work/Short Break/Long Break,
Để tôi có thể linh hoạt quản lý thời gian làm việc và nghỉ ngơi.

Tiêu chí chấp nhận:
- [x] 3 nút mode: Work (25 phút), Short Break (5 phút), Long Break (15 phút)
- [x] Click chuyển mode và reset thời gian
- [x] Nút active được highlight
- [x] Hiển thị tên chế độ tương ứng
```

#### US-1.5: Hoàn thành phiên làm việc
```
Là một người dùng,
Tôi muốn được thông báo khi hết thời gian,
Để tôi biết khi nào cần nghỉ ngơi hoặc tiếp tục làm việc.

Tiêu chí chấp nhận:
- [x] Alert thông báo khi hết thời gian
- [x] Thông báo khác nhau cho Work vs Break
- [x] Tự động dừng bộ đếm
- [x] Phiên được ghi vào timeline
```

### Epic 2: Theo dõi Tiến độ (Progress Tracking)

#### US-2.1: Đếm số phiên hoàn thành
```
Là một người dùng,
Tôi muốn xem số phiên làm việc đã hoàn thành,
Để tôi có động lực tiếp tục và đánh giá năng suất.

Tiêu chí chấp nhận:
- [x] Hiển thị "Completed sessions: X"
- [x] Chỉ đếm phiên Work (không đếm Break)
- [x] Số liệu được lưu trong ngày
- [x] Reset khi sang ngày mới
```

#### US-2.2: Timeline trong ngày
```
Là một người dùng,
Tôi muốn xem timeline các phiên đã hoàn thành trong ngày,
Để tôi có cái nhìn tổng quan về hoạt động của mình.

Tiêu chí chấp nhận:
- [x] Hiển thị các block theo thứ tự thời gian
- [x] Mỗi block có thời gian và loại (W/SB/LB)
- [x] Màu sắc phân biệt: Work (đỏ), Short Break (xanh dương), Long Break (tím)
- [x] Hover hiển thị tiêu đề và thời gian chi tiết
- [x] Legend giải thích màu sắc
```

#### US-2.3: Đặt tiêu đề phiên
```
Là một người dùng,
Tôi muốn đặt tiêu đề cho phiên làm việc,
Để tôi nhớ được mình đã làm gì trong mỗi phiên.

Tiêu chí chấp nhận:
- [x] Link "+ Add session title" mở input
- [x] Input có placeholder "What are you working on?"
- [x] Giới hạn 50 ký tự
- [x] Enter để xác nhận và tự động start timer
- [x] Có thể click để sửa tiêu đề
- [x] Tiêu đề hiển thị khi hover timeline block
```

#### US-2.4: Xóa timeline
```
Là một người dùng,
Tôi muốn xóa timeline của ngày,
Để tôi có thể bắt đầu lại khi cần.

Tiêu chí chấp nhận:
- [x] Nút "Clear Timeline" ở dưới timeline
- [x] Confirmation dialog trước khi xóa
- [x] Reset cả session count về 0
- [x] Timeline hiển thị message "No sessions yet..."
```

### Epic 3: Trình phát Nhạc (Music Player)

#### US-3.1: Bật/tắt nhạc nền
```
Là một người dùng,
Tôi muốn bật/tắt nhạc nền,
Để tôi có thể tập trung với âm nhạc phù hợp.

Tiêu chí chấp nhận:
- [x] Nút play/pause ở thanh điều khiển dưới màn hình
- [x] Hiển thị tên bài đang phát
- [x] Tự động phát bài tiếp theo khi hết
- [x] Playlist shuffle sau mỗi vòng
```

#### US-3.2: Chọn mood nhạc
```
Là một người dùng,
Tôi muốn chọn giữa nhạc Calm và Energy,
Để tôi có âm nhạc phù hợp với trạng thái làm việc.

Tiêu chí chấp nhận:
- [x] 2 nút mood: Calm (16 bài) và Energy (13 bài)
- [x] Chuyển mood thay đổi playlist ngay lập tức
- [x] Mood active được highlight
- [x] Nhớ mood đã chọn (qua preferences.js)
```

#### US-3.3: Like/Dislike bài hát
```
Là một người dùng,
Tôi muốn đánh giá bài hát đang nghe,
Để tôi có thể đánh dấu những bài yêu thích.

Tiêu chí chấp nhận:
- [x] Nút Like (👍) và Dislike (👎)
- [x] Hiển thị số lượng likes/dislikes
- [x] Animation khi like/dislike
- [x] Dislike tự động skip sang bài tiếp theo
- [x] (Lưu ý: Rating chỉ lưu trong session, mất khi refresh)
```

#### US-3.4: Skip bài hát
```
Là một người dùng,
Tôi muốn chuyển sang bài hát tiếp theo,
Để tôi có thể bỏ qua những bài không thích.

Tiêu chí chấp nhận:
- [x] Nút Skip (⏭) chuyển bài ngay lập tức
- [x] Chỉ hoạt động khi nhạc đang bật
- [x] Reset like button animation
```

### Epic 4: Cài đặt (Settings)

#### US-4.1: Mở/đóng Settings
```
Là một người dùng,
Tôi muốn truy cập cài đặt qua nút ⚙️,
Để tôi có thể tùy chỉnh trải nghiệm sử dụng.

Tiêu chí chấp nhận:
- [x] Nút Settings cố định góc trên phải
- [x] Click mở modal overlay
- [x] Click overlay hoặc nút X để đóng
- [x] Animation fade in/out
```

#### US-4.2: Điều chỉnh âm lượng
```
Là một người dùng,
Tôi muốn điều chỉnh âm lượng nhạc,
Để tôi có thể nghe ở mức phù hợp.

Tiêu chí chấp nhận:
- [x] Slider từ 0-100%
- [x] Hiển thị giá trị % hiện tại
- [x] Thay đổi âm lượng real-time
- [x] Giá trị mặc định 70%
```

#### US-4.3: Xem thư viện nhạc
```
Là một người dùng,
Tôi muốn xem danh sách tất cả các bài hát,
Để tôi có thể chọn bài muốn nghe.

Tiêu chí chấp nhận:
- [x] Tab Library trong Settings
- [x] Danh sách chia theo category (Calm/Energy)
- [x] Hiển thị tên bài, likes/dislikes
- [x] Nút Like, Dislike, Play cho mỗi bài
- [x] Highlight bài đang phát
- [x] Scroll trong danh sách dài
```

#### US-4.4: Phát nhạc từ thư viện
```
Là một người dùng,
Tôi muốn phát một bài cụ thể từ thư viện,
Để tôi có thể nghe ngay bài mình muốn.

Tiêu chí chấp nhận:
- [x] Nút Play (▶) cho mỗi bài
- [x] Click tự động bật nhạc nếu đang tắt
- [x] Chuyển mood nếu bài thuộc mood khác
- [x] Update UI để highlight bài đang phát
```

---

## 4. Success Metrics (Chỉ số thành công)

| Metric | Mô tả | Target |
|--------|-------|--------|
| Session Completion Rate | % phiên Work được hoàn thành (không reset giữa chừng) | > 80% |
| Daily Active Sessions | Số phiên Pomodoro trung bình/ngày/user | > 4 |
| Music Engagement | % thời gian có nhạc bật khi đang work | > 60% |
| Return Usage | User quay lại sử dụng sau 7 ngày | > 40% |

---

## 5. Technical Considerations (Cân nhắc kỹ thuật)

### Constraints (Ràng buộc)
- **No build process**: Không dùng webpack, vite, hay bất kỳ bundler nào
- **No frameworks**: Vanilla JS only, không React/Vue/Angular
- **Local storage only**: Không có backend, database
- **Static files**: Music preferences trong preferences.js (không auto-save)

### Current Limitations (Hạn chế hiện tại)
1. **Track ratings không persist**: Mất khi refresh trang
2. **Preferences không auto-save**: Phải sửa file preferences.js thủ công
3. **Không có notifications**: Chỉ dùng alert() cơ bản
4. **Không sync giữa devices**: Dữ liệu chỉ lưu local
5. **Không có thống kê dài hạn**: Chỉ track trong ngày

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## 6. Out of Scope (Ngoài phạm vi v1.0)

Các tính năng sau KHÔNG nằm trong phạm vi phiên bản hiện tại:

- [ ] Đăng ký/Đăng nhập người dùng
- [ ] Sync dữ liệu lên cloud
- [ ] Custom timer durations
- [ ] Desktop notifications (Web Notifications API)
- [ ] Keyboard shortcuts
- [ ] Dark mode
- [ ] Mobile app (PWA)
- [ ] Thống kê theo tuần/tháng
- [ ] Tích hợp calendar
- [ ] Pomodoro tự động chuyển mode
- [ ] White noise / ambient sounds
- [ ] Spotify/YouTube Music integration

---

## Appendix: Danh sách nhạc

### Calm (16 bài)
1. A Special Morning
2. Seamlessly Loved
3. Hierbabuena
4. Solar Eclipse
5. Evening Draws Near
6. Flycatcher
7. Stonecutters
8. Vostoc
9. Calming State
10. My Cozy Christmas Mood
11. Prince Kali
12. Casita
13. If I Lose Myself Dancing
14. Mirage Lounge
15. Litang
16. La Lune Et La Mouette

### Energy (13 bài)
1. Cosmic Funk
2. CKT Rip
3. Feel The Beat
4. 24K
5. Dominion
6. Neon Favelas
7. A Different Life
8. Visionary Connection
9. Fighters Game
10. Skyline Hustle
11. Freaky Trumpets
12. Nothing Can Stop Us
13. You Were Right
