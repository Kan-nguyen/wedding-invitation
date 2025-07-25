# 🎵 Music Folder - Wedding Playlist

## Current Files (Optimized):
- `a-thousand-years.mp3` - Primary wedding song
- `Hon-ca-yeu.mp3` - Secondary Vietnamese song

## Adding New Music:

1. **Copy music files to this folder** (MP3 recommended for best performance)

2. **Supported formats**:
   - **MP3** (.mp3) - **Recommended** (fast loading)
   - MP4 (.mp4) - Video with audio (larger files)
   - WAV (.wav) - High quality (very large)
   - OGG (.ogg) - Web optimized

3. **Update playlist**: Edit `../js/wedding-fixed.js` and modify the `musicFiles` array:

```javascript
const musicFiles = [
    'music/a-thousand-years.mp3',
    'music/Hon-ca-yeu.mp3',
    'music/your-new-song.mp3'  // Add your file here
];
```

## Tính năng playlist

- ✅ **Tự động phát**: Nhạc sẽ tự động bắt đầu khi tải trang
- ✅ **Fade-in**: Âm lượng tăng từ 0 lên 30% một cách mượt mà  
- ✅ **Auto-next**: Khi hết bài sẽ tự động chuyển sang bài tiếp theo
- ✅ **Loop playlist**: Khi hết playlist sẽ quay lại bài đầu tiên
- ✅ **Volume control**: Điều chỉnh âm lượng bằng slider
- ✅ **Play/Pause**: Nút điều khiển phát/tạm dừng

## Debug functions

Mở Developer Console (F12) và dùng các lệnh sau:
- `testMusic()` - Test phát nhạc
- `stopMusic()` - Dừng nhạc
- `nextTrack()` - Chuyển bài tiếp theo
- `prevTrack()` - Quay lại bài trước

## Files hiện có

- ✅ Christina Perri - A Thousand Years [Official Music Video].mp4

---

**Lưu ý**: Đảm bảo file nhạc có tên không chứa ký tự đặc biệt và có định dạng được trình duyệt hỗ trợ.