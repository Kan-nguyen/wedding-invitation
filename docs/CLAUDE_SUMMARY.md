# 💍 Wedding Invitation Project - Summary for Claude

## 📋 **Project Overview**
Online wedding invitation for **Minh Nguyệt & Anh Khoa**, featuring:
- Responsive design for mobile/desktop
- Interactive photo gallery (20 images)
- Background music playlist system
- RSVP form with meal preferences  
- Real-time countdown to wedding date
- Weather widget & QR code sharing
- Google Maps integration

**Wedding Date**: July 27, 2025, 5:00 PM  
**Venue**: JW Marriott Hotel & Suites Saigon

## 📁 **Project Structure** (Cleaned & Optimized 2025)
```
📦 Wedding/
├── 📄 index.html                    # Main HTML file
├── 🎨 css/
│   └── style.css                    # Optimized styles (3200+ lines)
├── ⚡ js/
│   └── wedding-fixed.js             # Production JS (optimized)
├── 🎵 music/
│   ├── a-thousand-years.mp4         # Primary wedding song
│   ├── Hon-ca-yeu.mp4               # Secondary song
│   └── README.md                    # Music instructions
├── 🖼️ PNG/
│   ├── main.jpeg                    # Hero image
│   └── Slides/                      # Gallery images (45+ files)
├── 🎨 assets/
│   ├── kn-uniform.png               # Logo (active)
│   └── brown-floral-divider.png     # Floral decoration
├── 📱 favicon files                 # Multiple sizes (16-256px)
├── 🛠️ dev_server.py                # Development server
├── 📖 docs/                         # Documentation
└── 🗂️ backup/                      # Archived files
    ├── js/                          # Old JavaScript versions
    ├── images/                      # Debug images & unused assets
    └── temp-files/                  # Temporary files
```

## 🎵 **Music System** (Completely Rewritten)
- **No YouTube API** - Pure HTML5 audio
- **Playlist System**: Automatically plays multiple songs in sequence
- **Auto-fade-in**: Smooth volume increase from 0% → 30%
- **Loop playlist**: Returns to first song after last
- **Easy to expand**: Just add MP3/MP4 files to `/music/` folder

### Adding New Songs:
1. Copy music file to `/music/` folder
2. Update playlist array in `js/wedding.js` line ~142:
```javascript
this.playlist = [
    'music/a-thousand-years.mp4',
    'music/Hon-ca-yeu.mp4',
    'music/your-new-song.mp3'  // Add here
];
```

## 🎨 **Key Features**

### **Gallery System**
- 20 pre-wedding photos with smooth transitions
- Auto-slideshow (3s intervals)
- Touch/swipe support for mobile
- Keyboard navigation (arrow keys, space)
- Thumbnail navigation

### **RSVP Form**
- Attendance confirmation (Yes/No)
- Meal preferences (Meat/Seafood/Vegetarian) 
- Guest count selector
- Special requests & wishes
- Animated success feedback

### **Interactive Elements**
- Real-time countdown timer
- Weather forecast widget
- QR code generator for sharing
- Google Maps integration
- Volume control for music
- Responsive animations

## 🔧 **Technical Details**

### **JavaScript Architecture** (NEW - Clean & Modular)
```javascript
class WeddingApp {          // Main application controller
class MusicPlayer {         // Handles music playlist
class RSVPForm {           // Form handling & validation  
class Utilities {          // QR codes, maps, weather
```

### **CSS Structure**
- Mobile-first responsive design
- CSS Grid & Flexbox layouts
- Smooth animations & transitions
- Vietnamese font support
- Touch-optimized interactions

### **Performance Optimizations**
- Lazy loading for images
- Intersection Observer for animations
- Debounced scroll events
- Compressed assets
- Minimal external dependencies

## 🎯 **User Experience**
1. **Loading screen** (2.5s) with couple names
2. **Auto-music start** with fade-in effect
3. **Smooth scrolling** with section animations
4. **Gallery autoplay** with touch controls
5. **Interactive RSVP** with real-time validation
6. **Share functionality** via QR code

## 🛠️ **Development**

### **Local Development**
```bash
python3 dev_server.py    # Starts server at localhost:8000
```

### **Key Files to Modify**
- `index.html` - Structure & content
- `css/style.css` - All styling 
- `js/wedding.js` - All functionality
- `music/` - Add new audio files

### **Browser Support**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile iOS/Android
- HTML5 audio support required

## 📝 **Common Tasks**

### **Update Wedding Details**
- Venue info: `index.html` lines ~132-140
- Date/time: `js/wedding.js` line ~66 (countdown)
- Couple names: Multiple locations in HTML

### **Customize Colors/Fonts** 
- Primary colors in `css/style.css` CSS variables
- Fonts imported from Google Fonts
- Logo files in `/assets/` folder

### **Add Photos**
- Copy to `/PNG/Slides/` folder  
- Update slide HTML in `index.html`
- Add thumbnail entries

## ⚠️ **Important Notes**
- **No external API dependencies** (self-contained)
- **Music files**: Use MP3/MP4 formats for compatibility
- **Images**: Optimized JPEG files recommended
- **Mobile-first**: Designed primarily for mobile viewing
- **Vietnamese content**: Full UTF-8 support

## 🚀 **Ready to Use**
The project is **production-ready** with:
- ✅ Clean, maintainable code structure
- ✅ Optimized performance  
- ✅ Mobile-responsive design
- ✅ Music playlist system working
- ✅ All interactive features functional
- ✅ Professional wedding invitation complete

---

**Last Updated**: July 2025  
**Status**: Production Ready 🎉