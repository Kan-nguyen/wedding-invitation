# 💍 Wedding Invitation Website

> A beautiful, responsive wedding invitation website built with modern web technologies

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-gold?style=for-the-badge)](https://kan-nguyen.github.io/wedding-invitation/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://github.com/Kan-nguyen/wedding-invitation)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🌟 **Overview**
Beautiful, responsive wedding invitation website with background music, photo gallery, and interactive features.

**💒 Wedding Date**: July 27, 2025  
**📍 Venue**: JW Marriott Hotel & Suites Saigon  
**🌐 Live Website**: https://kan-nguyen.github.io/wedding-invitation/

## ⚡ **Quick Start**
1. Open `index.html` in any modern browser
2. Or use the dev server: `python3 dev-tools/dev_server.py`
3. For music functionality, serve over HTTP/HTTPS

## 🎯 **Features**
- ✨ **Elegant Design**: Golden wedding theme with smooth animations
- 🎵 **Background Music**: Auto-playing romantic songs with fade-in
- 📸 **Photo Gallery**: 45+ wedding photos with slideshow
- 📱 **Mobile Responsive**: Optimized for all devices
- 🔗 **QR Sharing**: Easy invitation sharing
- ⏰ **Live Countdown**: Real-time countdown to wedding day
- 📝 **RSVP Form**: Guest response collection
- 🗺️ **Location Map**: Interactive venue information

## 📁 **File Structure**
```
├── index.html              # Main page
├── css/style.css           # Styles (optimized)
├── js/wedding-fixed.js     # JavaScript (clean architecture)
├── music/                  # Background music (MP3/MP4)
├── images/                 # Wedding photos and gallery
│   ├── main/              # Hero and portrait images
│   └── gallery/           # Photo slideshow (47 images)
├── assets/                 # Icons and decorative elements
├── docs/                   # Documentation
├── dev-tools/             # Development utilities
└── backup/                # Backup files
```

## 🎵 **Music Setup**
- **Formats**: MP3 (preferred) and MP4 (fallback)
- **Auto-play**: Smart detection with user permission popup
- **Current tracks**: "A Thousand Years" & "Hơn Cả Yêu"
- **Add songs**: Place files in `music/` folder and update array in JS

## 🖼️ **Photo Gallery**
- **Location**: `images/gallery/` directory (47 photos)
- **Format**: JPG/JPEG images
- **Auto-detection**: Automatically includes all images
- **Optimization**: Lazy loading for performance
- **Message Wall**: Real-time wedding wishes display

## 🚀 **Deployment**
1. **Static hosting**: Upload all files to web server
2. **GitHub Pages**: Push to repository with Pages enabled
3. **Netlify/Vercel**: Connect repository for auto-deployment
4. **Local testing**: Use included dev server

## 🔧 **Customization**

### **Content Updates**
- **Names**: Update in `index.html`
- **Date/Time**: Modify countdown target in JS
- **Venue**: Update address and map coordinates
- **Photos**: Replace images in `images/gallery/`

### **Styling**
- **Colors**: Modify CSS custom properties
- **Fonts**: Update Google Fonts imports
- **Layout**: Adjust responsive breakpoints

### **Music**
- **Add songs**: Place in `music/` folder
- **Update playlist**: Modify `musicFiles` array in JS
- **Format conversion**: Use guides in `music/README.md`

## 📱 **Browser Support**
- ✅ Chrome 90+ (Recommended)
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ **Development**

### **Local Development**
```bash
# Start dev server
python3 dev-tools/dev_server.py

# Or use any static server
python3 -m http.server 8000
```

### **Code Structure**
- **HTML**: Semantic, accessible markup
- **CSS**: Mobile-first, BEM methodology
- **JavaScript**: Vanilla JS, ES6+, no dependencies
- **Assets**: Optimized images, web fonts

## 🎨 **Design System**

### **Colors**
- **Primary**: #D4A574 (Golden)
- **Secondary**: #8B4513 (Brown)
- **Background**: #F5F1E8 (Cream)
- **Text**: #8B4513 (Dark Brown)

### **Typography**
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Script**: Sacramento (cursive)
- **Decorative**: Cormorant Garamond (serif)

## 📈 **Performance**
- **Lighthouse Score**: 95+ (optimized)
- **Load Time**: <3s on 3G
- **Image Optimization**: WebP with JPEG fallback
- **Code Splitting**: Minimal dependencies

## 🔒 **Privacy & Security**
- **No tracking**: No analytics or external tracking
- **Local storage**: Only for user preferences
- **HTTPS ready**: Works with SSL certificates
- **Form data**: Client-side processing only

## 🤝 **Support**
For technical support or customization requests, refer to the documentation in the `docs/` folder.

## 📄 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 **Contributing**
Contributions are welcome! Please feel free to submit a Pull Request. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⭐ **Show Your Support**
If you found this project helpful, please give it a ⭐ on GitHub!

## 🙏 **Acknowledgments**
- Design inspiration from modern wedding websites
- Icons from various open-source collections
- Music tracks used with proper licensing

---

<div align="center">

**Created with ❤️ for special moments**

[🌐 Live Demo](https://kan-nguyen.github.io/wedding-invitation/) • [📚 Documentation](./docs/) • [🐛 Report Bug](https://github.com/Kan-nguyen/wedding-invitation/issues)

*Last updated: July 25, 2025*

</div>