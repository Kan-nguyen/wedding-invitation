# 🎵 Music Conversion Instructions

## Convert MP4 to MP3 (For Better Performance)

### Why Convert?
- **MP3 files load 3-5x faster** than MP4
- **Smaller file sizes** (typically 60-80% smaller)
- **Better web compatibility** across all browsers
- **Reduced bandwidth usage** for users

### Current Files to Convert:
```
music/a-thousand-years.mp4 → music/a-thousand-years.mp3
music/Hon-ca-yeu.mp4 → music/Hon-ca-yeu.mp3
```

### Conversion Options:

#### Option 1: Online Converters (Easy)
- **CloudConvert.com** - Free, high quality
- **OnlineVideoConverter.com** - Simple interface
- **Convertio.co** - Supports batch conversion

#### Option 2: VLC Media Player (Desktop)
1. Open VLC → Media → Convert/Save
2. Add your MP4 file
3. Choose Profile: "Audio - MP3" 
4. Set quality: 192-320 kbps
5. Click Start

#### Option 3: FFmpeg (Advanced)
```bash
ffmpeg -i "input.mp4" -q:a 0 -map a "output.mp3"
```

### Recommended Settings:
- **Bitrate**: 192-320 kbps (320 for best quality)
- **Sample Rate**: 44.1 kHz
- **Channels**: Stereo

### After Conversion:
1. Replace MP4 files with MP3 versions
2. Update `musicFiles` array in `../js/wedding-fixed.js`
3. Test playback to ensure quality
4. Delete old MP4 files to save space

### Auto-Support:
The current code supports both MP3 and MP4 formats, so you can:
- Add MP3 files for new songs (recommended)
- Keep existing MP4 files if conversion isn't possible
- Mix both formats in the same playlist

**Note**: MP3 will always be prioritized for faster loading!