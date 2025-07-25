# 🚀 GitHub Deployment Guide

## 📋 **Pre-deployment Checklist**

✅ **Project structure cleaned và organized**
✅ **RSVP form configured for Netlify/Formspree**
✅ **All images optimized và paths updated** 
✅ **Music autoplay enhanced**
✅ **Mobile responsive tested**
✅ **Documentation complete**

## 🌟 **Repository Setup**

### **Target Repository:** 
https://github.com/Kan-nguyen/wedding-invitation

### **1. Repository Structure:**
```
wedding-invitation/
├── README.md                    # Project overview
├── index.html                   # Main wedding page
├── css/
│   └── style.css               # Optimized styles
├── js/
│   └── wedding-fixed.js        # Enhanced JavaScript
├── images/
│   ├── main/                   # Hero & portrait images
│   └── gallery/                # Photo slideshow
├── music/                      # Background audio files
├── assets/                     # Icons & decorative elements
├── docs/                       # Documentation
└── .gitignore                  # Git ignore file
```

## 🛠️ **Deployment Commands**

### **Step 1: Initialize Git Repository**
```bash
cd "/Users/kan/Library/Mobile Documents/com~apple~CloudDocs/Wedding/Thiệp Cưới Online"

# Initialize git if not already done
git init

# Add remote repository
git remote add origin https://github.com/Kan-nguyen/wedding-invitation.git
```

### **Step 2: Create .gitignore**
```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Development files
dev-tools/
backup/
*.py
test_*.html

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
*~

# Logs
*.log

# IDE files
.vscode/
.idea/
EOF
```

### **Step 3: Commit và Push**
```bash
# Add all files
git add .

# Commit with descriptive message
git commit -m "🎉 Initial wedding invitation website

✨ Features:
- Responsive design with golden wedding theme
- Background music with autoplay enhancements
- Photo gallery with 45+ wedding photos
- Interactive RSVP form
- QR code sharing
- Live countdown to wedding day
- Mobile-optimized experience

🎯 Ready for production deployment"

# Push to GitHub
git push -u origin main
```

## 🌐 **GitHub Pages Setup**

### **Method 1: GitHub Pages (Simple)**

1. **Go to repository Settings**
2. **Scroll to "Pages" section**
3. **Source: Deploy from a branch**
4. **Branch: main**
5. **Folder: / (root)**
6. **Save**

**Website URL:** https://kan-nguyen.github.io/wedding-invitation/

### **Method 2: Netlify (Recommended for RSVP)**

1. **Go to netlify.com**
2. **Connect GitHub account**
3. **Select repository: Kan-nguyen/wedding-invitation**
4. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: (leave empty)
5. **Deploy site**

**Benefits:**
- ✅ RSVP form automatically works
- ✅ Custom domain easy setup
- ✅ Better performance
- ✅ Form submissions dashboard

## 🔧 **Post-Deployment Configuration**

### **1. Custom Domain (Optional)**
```
# If you have a custom domain like: wedding.example.com
# Add CNAME file:
echo "wedding.example.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### **2. RSVP Form Setup**

**For Netlify (Recommended):**
- Form submissions automatically available in Netlify dashboard
- Email notifications configured automatically
- Export to CSV/Excel available

**For GitHub Pages + Formspree:**
1. Create account at formspree.io
2. Create new form
3. Update form action in index.html:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### **3. Performance Optimizations**

Add to repository root:
```bash
# _headers file for Netlify (optional)
cat > _headers << 'EOF'
/*
  Cache-Control: public, max-age=86400
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff

/images/*
  Cache-Control: public, max-age=31536000

/music/*
  Cache-Control: public, max-age=31536000
EOF
```

## 📊 **Monitoring & Analytics**

### **1. Google Analytics (Optional)**
Add to `<head>` in index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### **2. Simple Analytics (Privacy-friendly)**
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

## 🧪 **Testing Checklist**

After deployment, test:

- [ ] **Homepage loads correctly**
- [ ] **All images display properly**
- [ ] **Music autoplay works (or shows prompt)**
- [ ] **Photo gallery navigation**
- [ ] **RSVP form submission**
- [ ] **QR code generation**
- [ ] **Mobile responsiveness**
- [ ] **Countdown timer accuracy**
- [ ] **Map/directions links**

## 📱 **Mobile Testing**

Test on multiple devices:
- [ ] **iPhone Safari**
- [ ] **Android Chrome**
- [ ] **iPad landscape/portrait**
- [ ] **Desktop Chrome/Firefox/Safari**

## 🔐 **Security Considerations**

- ✅ **No sensitive data exposed**
- ✅ **Form spam protection enabled**
- ✅ **HTTPS enforced**
- ✅ **No backend vulnerabilities (static site)**

## 📧 **RSVP Management**

### **Netlify Dashboard:**
1. Login to netlify.com
2. Go to site dashboard
3. Forms → wedding-rsvp
4. View/export submissions

### **Email Notifications:**
Automatic email when new RSVP submitted:
- Guest name & email
- Attendance confirmation
- Number of guests
- Meal preferences
- Submission timestamp

## 🎯 **Success Metrics**

Track after deployment:
- **Page views**
- **RSVP completion rate**
- **Music interaction rate**
- **Gallery engagement**
- **Mobile vs desktop usage**

## 🆘 **Troubleshooting**

### **Common Issues:**

**Images not loading:**
- Check file paths in HTML
- Ensure case-sensitive file names match

**Music not playing:**
- Test on different browsers
- Check browser autoplay policies
- Verify file formats (MP3/MP4)

**RSVP form not working:**
- Verify form attributes
- Check service configuration
- Test form submission manually

**Mobile layout broken:**
- Test responsive breakpoints
- Check touch interactions
- Verify viewport meta tag

---

## 🎉 **Final Steps**

1. **Deploy to GitHub**
2. **Enable GitHub Pages or setup Netlify**
3. **Test all functionality**
4. **Share wedding invitation URL**
5. **Monitor RSVP submissions**

**Wedding Website URL:** 
- GitHub Pages: https://kan-nguyen.github.io/wedding-invitation/
- Netlify: https://YOUR_SITE_NAME.netlify.app/

---
*Wedding invitation ready for the world! 💕*