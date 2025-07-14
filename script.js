// Wedding Invitation Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Management
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const invitationContainer = document.getElementById('invitationContainer');
        
        // Simulate loading time (2-3 seconds)
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            invitationContainer.classList.add('loaded');
            
            // Start staggered section animations
            setTimeout(() => {
                initSectionAnimations();
            }, 300);
            
        }, 2500);
    }

    // Initialize section scroll animations
    function initSectionAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animations
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, observerOptions);

        // Observe all main sections
        const sections = document.querySelectorAll('.hero-section, .countdown-section, .wedding-details, .gallery-section, .timeline-section, .rsvp-section, .weather-section, .qr-section');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Enhanced smooth scrolling for mobile
    function initSmoothScroll() {
        // Add touch momentum scrolling for iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Optimize scroll performance
        let ticking = false;
        
        function updateScrollEffects() {
            // Add subtle parallax to background elements
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-section, .countdown-section');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // Optimize touch interactions for mobile
    function initTouchOptimizations() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('button, .main-photo, .thumbnail, .time-unit, .detail-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });

        // Prevent 300ms click delay on mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Enhanced loading with progressive enhancement
    function progressiveLoad() {
        // Load critical images first
        const criticalImages = document.querySelectorAll('.main-photo');
        const imagePromises = [];

        criticalImages.forEach(img => {
            if (img.src) {
                const imageLoad = new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', resolve);
                    }
                });
                imagePromises.push(imageLoad);
            }
        });

        // Load other images after critical ones
        Promise.all(imagePromises).then(() => {
            const otherImages = document.querySelectorAll('img:not(.main-photo)');
            otherImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        });
    }

    // Initialize viewport height fix for mobile browsers
    function fixViewportHeight() {
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }

    // Initialize performance optimizations
    function initPerformanceOptimizations() {
        // Reduce animations on low-end devices
        if ('connection' in navigator && navigator.connection.effectiveType === 'slow-2g') {
            document.body.classList.add('reduced-motion');
        }

        // Pause heavy animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('page-hidden');
            } else {
                document.body.classList.remove('page-hidden');
            }
        });
    }

    // Start initialization
    showLoadingScreen();
    initSmoothScroll();
    initTouchOptimizations();
    progressiveLoad();
    fixViewportHeight();
    initPerformanceOptimizations();
    
    // Smooth scroll animation for better UX
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const sections = document.querySelectorAll('.hero-section, .wedding-details, .timeline-section, .invitation-footer');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(' + (index % 2 === 0 ? '-30px' : '30px') + ')';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = (index * 0.2) + 's';
        observer.observe(item);
    });

    // Add sparkle effect to couple names
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    // Add sparkle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-40px) scale(0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // Add floating animation to initials
    const initials = document.querySelector('.initials');
    if (initials) {
        initials.classList.add('floating');
    }

    // Create sparkles periodically
    setInterval(createSparkle, 3000);

    // Add click effect to main photo
    const mainPhoto = document.querySelector('.main-photo');
    if (mainPhoto) {
        mainPhoto.addEventListener('click', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 200);
            
            // Create multiple sparkles around the photo
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createSparkle(), i * 100);
            }
        });
    }

    // Add hover effect to timeline dots
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 20px rgba(184, 149, 106, 0.6)';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 0 2px #B8956A';
        });
    });

    // Add smooth color transition to color dots
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        dot.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.4)';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.2)';
        });
    });

    // Add gentle parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Countdown Timer Function
    function updateCountdown() {
        const weddingDate = new Date('2025-07-27T17:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update countdown display with animation
            updateTimeUnit('days', days);
            updateTimeUnit('hours', hours);
            updateTimeUnit('minutes', minutes);
            updateTimeUnit('seconds', seconds);
        } else {
            // Wedding day has arrived!
            document.querySelector('.countdown-title').innerHTML = '🎉 Ngày cưới đã đến! 🎉';
            document.querySelector('.countdown-timer').innerHTML = '<div class="celebration">Chúc mừng cô dâu chú rể!</div>';
        }
    }

    function updateTimeUnit(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element && element.textContent !== String(newValue).padStart(2, '0')) {
            // Add animation class
            element.classList.add('updating');
            
            setTimeout(() => {
                element.textContent = String(newValue).padStart(2, '0');
                element.classList.remove('updating');
            }, 150);
        }
    }

    // Update countdown every second for real-time effect
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP Form Functionality
    const rsvpForm = document.getElementById('rsvpForm');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const mealPreferenceGroup = document.getElementById('mealPreferenceGroup');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    // Show/hide form sections based on attendance choice
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestCountGroup.style.display = 'block';
                mealPreferenceGroup.style.display = 'block';
                // Make meal preference required
                document.querySelectorAll('input[name="mealPreference"]').forEach(input => {
                    input.required = true;
                });
            } else {
                guestCountGroup.style.display = 'none';
                mealPreferenceGroup.style.display = 'none';
                // Remove meal preference requirement
                document.querySelectorAll('input[name="mealPreference"]').forEach(input => {
                    input.required = false;
                    input.checked = false;
                });
            }
        });
    });

    // Handle form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Add timestamp
            data.timestamp = new Date().toLocaleString('vi-VN');
            
            // Simulate form submission (in real implementation, send to server)
            console.log('RSVP Data:', data);
            
            // Show success message with animation
            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
            rsvpSuccess.style.opacity = '0';
            rsvpSuccess.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                rsvpSuccess.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                rsvpSuccess.style.opacity = '1';
                rsvpSuccess.style.transform = 'translateY(0)';
            }, 100);
            
            // Create celebration effect
            createCelebrationEffect();
            
            // In real implementation, you would send data to your backend:
            // fetch('/api/rsvp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }

    // Celebration effect for successful RSVP
    function createCelebrationEffect() {
        const celebrationEmojis = ['🎉', '💕', '🌸', '✨', '💐', '🥂'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const emoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                const element = document.createElement('div');
                element.innerHTML = emoji;
                element.style.position = 'fixed';
                element.style.fontSize = '24px';
                element.style.pointerEvents = 'none';
                element.style.zIndex = '10000';
                element.style.left = Math.random() * window.innerWidth + 'px';
                element.style.top = '-50px';
                element.style.animation = 'celebrationFall 3s ease-out forwards';
                
                document.body.appendChild(element);
                
                setTimeout(() => {
                    element.remove();
                }, 3000);
            }, i * 200);
        }
    }

    // Add celebration animation CSS
    const celebrationStyle = document.createElement('style');
    celebrationStyle.textContent = `
        @keyframes celebrationFall {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 50}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(celebrationStyle);

    // Add smooth animations to form elements
    const formInputs = document.querySelectorAll('.rsvp-form input, .rsvp-form select, .rsvp-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });

    // QR Code Generation and Functionality
    function generateQRCode() {
        const currentUrl = window.location.href;
        const canvas = document.getElementById('qrcode');
        const urlDisplay = document.getElementById('currentUrl');
        
        if (canvas && urlDisplay) {
            // Update URL display
            urlDisplay.textContent = currentUrl;
            
            // Simple QR Code generation using canvas (basic implementation)
            // In production, you'd use a proper QR code library like qrcode.js
            generateSimpleQR(canvas, currentUrl);
        }
    }

    // Simple QR code generator (placeholder - in production use qrcode.js library)
    function generateSimpleQR(canvas, text) {
        const ctx = canvas.getContext('2d');
        const size = 200;
        const moduleSize = 8;
        const modules = size / moduleSize;
        
        // Clear canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        
        // Generate simple pattern (this is a placeholder - use proper QR library)
        ctx.fillStyle = '#8B4513';
        
        // Create a simple pattern that represents the URL
        const hash = simpleHash(text);
        for (let i = 0; i < modules; i++) {
            for (let j = 0; j < modules; j++) {
                if ((hash + i * j) % 3 === 0) {
                    ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
                }
            }
        }
        
        // Add corner markers
        drawCornerMarker(ctx, 0, 0, moduleSize);
        drawCornerMarker(ctx, size - 7 * moduleSize, 0, moduleSize);
        drawCornerMarker(ctx, 0, size - 7 * moduleSize, moduleSize);
    }

    function drawCornerMarker(ctx, x, y, moduleSize) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
    }

    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // QR Code action handlers
    const copyUrlBtn = document.getElementById('copyUrlBtn');
    const shareBtn = document.getElementById('shareBtn');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', async function() {
            const url = window.location.href;
            
            try {
                await navigator.clipboard.writeText(url);
                
                // Show success animation
                this.classList.add('copied');
                this.innerHTML = '<span>✓</span> Đã copy!';
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = '<span>📋</span> Copy Link';
                }, 2000);
                
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                this.innerHTML = '<span>✓</span> Đã copy!';
                setTimeout(() => {
                    this.innerHTML = '<span>📋</span> Copy Link';
                }, 2000);
            }
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const url = window.location.href;
            const title = 'Thiệp Cưới - Minh Nguyệt & Anh Khoa';
            const text = 'Chúng tôi trân trọng kính mời bạn tham dự lễ cưới của chúng tôi!';
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: url
                }).catch(console.error);
            } else {
                // Fallback - open share dialog
                const shareData = {
                    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
                    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
                };
                
                // Simple share menu
                const shareMenu = prompt('Chọn cách chia sẻ:\n1. Facebook\n2. WhatsApp\n3. Email\n4. Copy link', '4');
                
                switch(shareMenu) {
                    case '1':
                        window.open(shareData.facebook, '_blank');
                        break;
                    case '2':
                        window.open(shareData.whatsapp, '_blank');
                        break;
                    case '3':
                        window.location.href = shareData.email;
                        break;
                    default:
                        copyUrlBtn.click();
                }
            }
        });
    }

    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', function() {
            const canvas = document.getElementById('qrcode');
            if (canvas) {
                // Create download link
                const link = document.createElement('a');
                link.download = 'thiep-cuoi-qr-code.png';
                link.href = canvas.toDataURL();
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success animation
                this.innerHTML = '<span>✓</span> Đã tải!';
                setTimeout(() => {
                    this.innerHTML = '<span>💾</span> Tải QR';
                }, 2000);
            }
        });
    }

    // Generate QR code when page loads
    generateQRCode();

    // Photo Gallery Functionality
    let slideIndex = 1;
    let autoplayInterval;
    let isAutoplayActive = true;
    let autoplaySpeed = 3000;

    // Initialize gallery
    function initGallery() {
        showSlide(slideIndex);
        startAutoplay();
    }

    // Show specific slide
    function showSlide(n) {
        const slides = document.getElementsByClassName('slide');
        const indicators = document.getElementsByClassName('indicator');
        const thumbnails = document.getElementsByClassName('thumbnail');
        
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        // Remove active from all indicators
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
        }
        
        // Remove active from all thumbnails
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].classList.remove('active');
        }
        
        // Show current slide
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        
        // Activate current indicator
        if (indicators[slideIndex - 1]) {
            indicators[slideIndex - 1].classList.add('active');
        }
        
        // Activate current thumbnail
        if (thumbnails[slideIndex - 1]) {
            thumbnails[slideIndex - 1].classList.add('active');
        }
    }

    // Change slide function (global for onclick)
    window.changeSlide = function(n) {
        slideIndex += n;
        showSlide(slideIndex);
        restartAutoplay();
    };

    // Go to specific slide (global for onclick)
    window.currentSlide = function(n) {
        slideIndex = n;
        showSlide(slideIndex);
        restartAutoplay();
    };

    // Autoplay functions
    function startAutoplay() {
        if (isAutoplayActive) {
            autoplayInterval = setInterval(() => {
                slideIndex++;
                showSlide(slideIndex);
            }, autoplaySpeed);
        }
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Toggle autoplay (global for onclick)
    window.toggleAutoplay = function() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playIcon = document.getElementById('playIcon');
        
        if (isAutoplayActive) {
            stopAutoplay();
            isAutoplayActive = false;
            playIcon.textContent = '▶️';
            playPauseBtn.innerHTML = '<span id="playIcon">▶️</span> Phát';
        } else {
            isAutoplayActive = true;
            startAutoplay();
            playIcon.textContent = '⏸️';
            playPauseBtn.innerHTML = '<span id="playIcon">⏸️</span> Tạm dừng';
        }
    };

    // Change speed (global for onchange)
    window.changeSpeed = function() {
        const speedSelect = document.getElementById('speedSelect');
        autoplaySpeed = parseInt(speedSelect.value);
        if (isAutoplayActive) {
            restartAutoplay();
        }
    };

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoplay();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideshowContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }

    // Pause autoplay when hovering over slideshow
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            if (isAutoplayActive) {
                stopAutoplay();
            }
        });

        slideshowContainer.addEventListener('mouseleave', function() {
            if (isAutoplayActive) {
                startAutoplay();
            }
        });
    }

    // Initialize gallery when DOM is loaded
    initGallery();

    // Background Music Player Functionality
    const audio = document.getElementById('backgroundAudio');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicMinimize = document.getElementById('musicMinimize');
    const progressFill = document.getElementById('progressFill');
    let isPlaying = false;
    let isMinimized = false;

    // Initialize music player
    function initMusicPlayer() {
        if (audio) {
            // Set initial volume
            audio.volume = volumeSlider.value / 100;
            
            // Update progress bar
            audio.addEventListener('timeupdate', updateProgress);
            
            // Handle audio end (though it's looped)
            audio.addEventListener('ended', function() {
                resetMusicPlayer();
            });
            
            // Handle audio loading errors
            audio.addEventListener('error', function() {
                console.log('Audio could not be loaded. Music player will work with local files.');
                // You can replace with local audio file here
            });
        }
    }

    // Toggle music play/pause
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
    }

    function playMusic() {
        if (audio) {
            audio.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<span class="music-icon">⏸️</span><span class="music-text">Tạm dừng</span>';
                createFloatingNotes();
            }).catch((error) => {
                console.log('Audio playback failed:', error);
                // Fallback: Show music is "playing" even without audio
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<span class="music-icon">⏸️</span><span class="music-text">Tạm dừng</span>';
                simulateProgress(); // Simulate progress for demo
            });
        }
    }

    function pauseMusic() {
        if (audio) {
            audio.pause();
        }
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Phát nhạc</span>';
    }

    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            if (audio) {
                audio.volume = this.value / 100;
            }
            
            // Update volume icon
            const volumeIcon = document.querySelector('.volume-icon');
            if (this.value == 0) {
                volumeIcon.textContent = '🔇';
            } else if (this.value < 50) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        });
    }

    // Minimize/maximize music player
    if (musicMinimize) {
        musicMinimize.addEventListener('click', function() {
            if (isMinimized) {
                musicPlayer.classList.remove('minimized');
                this.textContent = '−';
                isMinimized = false;
            } else {
                musicPlayer.classList.add('minimized');
                this.textContent = '+';
                isMinimized = true;
            }
        });
    }

    // Update progress bar
    function updateProgress() {
        if (audio && audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
    }

    // Simulate progress for demo when audio doesn't load
    function simulateProgress() {
        if (isPlaying && !audio.duration) {
            let progress = 0;
            const interval = setInterval(() => {
                if (!isPlaying) {
                    clearInterval(interval);
                    return;
                }
                progress += 0.5;
                if (progress >= 100) {
                    progress = 0; // Loop
                }
                progressFill.style.width = progress + '%';
            }, 100);
        }
    }

    // Create floating music notes effect
    function createFloatingNotes() {
        if (!isPlaying) return;
        
        const notes = ['♪', '♫', '♬', '🎵', '🎶'];
        const note = notes[Math.floor(Math.random() * notes.length)];
        
        const floatingNote = document.createElement('div');
        floatingNote.className = 'floating-note';
        floatingNote.textContent = note;
        
        // Random position near the music player
        const playerRect = musicPlayer.getBoundingClientRect();
        floatingNote.style.left = (playerRect.left + Math.random() * 100) + 'px';
        floatingNote.style.top = (playerRect.top + Math.random() * 50) + 'px';
        
        document.body.appendChild(floatingNote);
        
        // Remove after animation
        setTimeout(() => {
            floatingNote.remove();
        }, 3000);
        
        // Create more notes
        if (isPlaying) {
            setTimeout(createFloatingNotes, 2000 + Math.random() * 3000);
        }
    }

    function resetMusicPlayer() {
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Phát nhạc</span>';
        progressFill.style.width = '0%';
    }

    // Auto-play attempt (most browsers block this, so it's user-initiated)
    function attemptAutoplay() {
        // Try to play music after first user interaction
        document.addEventListener('click', function autoPlayOnClick() {
            if (!isPlaying) {
                playMusic();
            }
            document.removeEventListener('click', autoPlayOnClick);
        }, { once: true });
    }

    // Initialize music player
    initMusicPlayer();
    
    // Show initial tip about music
    setTimeout(() => {
        if (!isPlaying) {
            createMusicTip();
        }
    }, 3000);

    function createMusicTip() {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(184, 149, 106, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 10px;
            font-size: 12px;
            font-family: 'Open Sans', sans-serif;
            z-index: 1001;
            animation: fadeInOut 4s ease-in-out forwards;
        `;
        tip.textContent = '🎵 Nhấn để phát nhạc nền';
        
        document.body.appendChild(tip);
        
        setTimeout(() => {
            tip.remove();
        }, 4000);
    }

    // Add fadeInOut animation
    const tipStyle = document.createElement('style');
    tipStyle.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(20px); }
            20%, 80% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(tipStyle);

    // Google Maps Integration
    const venueLocation = {
        name: 'JW Mariott Hotel & Suites Saigon',
        address: 'Nút Giao Hai Bà Trưng Và Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM',
        lat: 10.7886,
        lng: 106.7024,
        placeId: 'ChIJBwNTFXrMBjERa1_1cj1yMxs' // Google Place ID for JW Marriott Saigon
    };

    // Open Google Maps (global for onclick)
    window.openGoogleMaps = function() {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation.address)}&query_place_id=${venueLocation.placeId}`;
        window.open(url, '_blank');
    };

    // Get directions to venue (global for onclick)
    window.getDirections = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${venueLocation.lat},${venueLocation.lng}`;
                    window.open(url, '_blank');
                },
                function(error) {
                    // Fallback: open directions without user location
                    const url = `https://www.google.com/maps/dir//${venueLocation.lat},${venueLocation.lng}`;
                    window.open(url, '_blank');
                }
            );
        } else {
            // Browser doesn't support geolocation
            const url = `https://www.google.com/maps/dir//${venueLocation.lat},${venueLocation.lng}`;
            window.open(url, '_blank');
        }
    };

    // Share location (global for onclick)
    window.shareLocation = function() {
        const shareData = {
            title: venueLocation.name,
            text: `Địa điểm đám cưới: ${venueLocation.name}`,
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation.address)}`
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            const textToCopy = `${shareData.text}\n${shareData.url}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showMapNotification('Đã copy thông tin địa điểm!');
                });
            } else {
                // Even older fallback
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showMapNotification('Đã copy thông tin địa điểm!');
            }
        }
    };

    function showMapNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
            animation: slideInNotification 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification animations
    const mapNotificationStyle = document.createElement('style');
    mapNotificationStyle.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(mapNotificationStyle);

    // Enhanced map placeholder with interactive features
    const mapPlaceholder = document.getElementById('weddingMap');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            openGoogleMaps();
        });
        
        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.title = 'Nhấn để mở Google Maps';
        
        // Add hover effect
        mapPlaceholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        mapPlaceholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add floating location pin animation
    function createFloatingLocationPin() {
        const pin = document.createElement('div');
        pin.innerHTML = '📍';
        pin.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 999;
            animation: floatUpLocation 4s ease-out forwards;
        `;
        
        // Random position near the map section
        if (mapPlaceholder) {
            const mapRect = mapPlaceholder.getBoundingClientRect();
            pin.style.left = (mapRect.left + Math.random() * mapRect.width) + 'px';
            pin.style.top = (mapRect.bottom - 20) + 'px';
        }
        
        document.body.appendChild(pin);
        
        setTimeout(() => {
            pin.remove();
        }, 4000);
    }

    // Add floating pin animation CSS
    const locationPinStyle = document.createElement('style');
    locationPinStyle.textContent = `
        @keyframes floatUpLocation {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            50% {
                opacity: 1;
                transform: translateY(-30px) scale(1.1);
            }
            100% {
                opacity: 0;
                transform: translateY(-60px) scale(0.8);
            }
        }
    `;
    document.head.appendChild(locationPinStyle);

    // Periodically create floating pins
    setInterval(createFloatingLocationPin, 8000);

    // Weather Widget Functionality
    const weatherData = {
        current: {
            temp: 28,
            desc: 'Nắng đẹp',
            emoji: '☀️',
            humidity: 65,
            wind: 15,
            rain: 20,
            tempRange: '25°C - 32°C'
        },
        hourly: [
            { time: '17:00', temp: 29, emoji: '☀️' },
            { time: '18:00', temp: 28, emoji: '🌤️' },
            { time: '19:00', temp: 27, emoji: '🌅' },
            { time: '20:00', temp: 26, emoji: '🌙' }
        ],
        advice: {
            clothing: 'Thời tiết đẹp, phù hợp với trang phục lịch sự. Nên mang theo áo khoác nhẹ cho buổi tối.'
        }
    };

    // Initialize weather widget
    function initWeatherWidget() {
        updateWeatherDisplay();
        startWeatherAnimations();
        
        // Try to fetch real weather data (optional)
        // fetchRealWeatherData();
    }

    function updateWeatherDisplay() {
        // Update main weather info
        document.getElementById('currentTemp').textContent = weatherData.current.temp;
        document.getElementById('weatherDesc').textContent = weatherData.current.desc;
        document.getElementById('weatherEmoji').textContent = weatherData.current.emoji;
        
        // Update details
        document.getElementById('tempRange').textContent = weatherData.current.tempRange;
        document.getElementById('humidity').textContent = weatherData.current.humidity + '%';
        document.getElementById('windSpeed').textContent = weatherData.current.wind + ' km/h';
        document.getElementById('rainChance').textContent = weatherData.current.rain + '%';
        
        // Update clothing advice
        document.getElementById('clothingAdvice').textContent = weatherData.advice.clothing;
        
        // Update hourly forecast
        updateHourlyForecast();
    }

    function updateHourlyForecast() {
        const hourlyItems = document.querySelectorAll('.hourly-item');
        weatherData.hourly.forEach((hour, index) => {
            if (hourlyItems[index]) {
                const item = hourlyItems[index];
                item.querySelector('.hour').textContent = hour.time;
                item.querySelector('.hour-icon').textContent = hour.emoji;
                item.querySelector('.hour-temp').textContent = hour.temp + '°C';
            }
        });
    }

    function startWeatherAnimations() {
        // Animate weather details on hover
        const weatherDetails = document.querySelectorAll('.weather-detail');
        weatherDetails.forEach(detail => {
            detail.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.detail-icon');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            detail.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.detail-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Animate hourly items
        const hourlyItems = document.querySelectorAll('.hourly-item');
        hourlyItems.forEach((item, index) => {
            item.style.animationDelay = (index * 0.1) + 's';
            item.style.animation = 'slideInUp 0.6s ease-out forwards';
        });
    }

    // Simulate weather changes (for demo purposes)
    function simulateWeatherChanges() {
        const weatherConditions = [
            { temp: 28, desc: 'Nắng đẹp', emoji: '☀️', advice: 'Thời tiết đẹp, phù hợp với trang phục lịch sự. Nên mang theo áo khoác nhẹ cho buổi tối.' },
            { temp: 26, desc: 'Có mây', emoji: '⛅', advice: 'Thời tiết mát mẻ, có thể có mây che. Trang phục vẫn thoải mái nhưng nên chuẩn bị áo khoác.' },
            { temp: 30, desc: 'Nắng gắt', emoji: '🌞', advice: 'Trời nắng nóng, nên chọn trang phục thoáng mát và mang dù che nắng.' },
            { temp: 24, desc: 'Mát mẻ', emoji: '🌤️', advice: 'Thời tiết mát mẻ dễ chịu, phù hợp với mọi loại trang phục. Có thể cần áo khoác nhẹ.' }
        ];

        let currentIndex = 0;
        
        setInterval(() => {
            const condition = weatherConditions[currentIndex];
            
            // Animate weather change
            const weatherWidget = document.getElementById('weatherWidget');
            weatherWidget.style.transform = 'scale(0.95)';
            weatherWidget.style.opacity = '0.7';
            
            setTimeout(() => {
                // Update data
                weatherData.current.temp = condition.temp;
                weatherData.current.desc = condition.desc;
                weatherData.current.emoji = condition.emoji;
                weatherData.advice.clothing = condition.advice;
                
                // Update display
                updateWeatherDisplay();
                
                // Animate back
                weatherWidget.style.transform = 'scale(1)';
                weatherWidget.style.opacity = '1';
                
                // Create weather particles
                createWeatherParticles(condition.emoji);
                
            }, 300);
            
            currentIndex = (currentIndex + 1) % weatherConditions.length;
        }, 10000); // Change every 10 seconds for demo
    }

    function createWeatherParticles(emoji) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = emoji;
                particle.style.cssText = `
                    position: fixed;
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 999;
                    animation: weatherParticleFloat 3s ease-out forwards;
                `;
                
                // Random position around weather widget
                const weatherWidget = document.getElementById('weatherWidget');
                if (weatherWidget) {
                    const rect = weatherWidget.getBoundingClientRect();
                    particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                }
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, i * 200);
        }
    }

    // Add weather particle animation
    const weatherParticleStyle = document.createElement('style');
    weatherParticleStyle.textContent = `
        @keyframes weatherParticleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            50% {
                opacity: 1;
                transform: translate(${Math.random() * 100 - 50}px, -30px) scale(1.2);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, -60px) scale(0.8);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(weatherParticleStyle);

    // Temperature color coding
    function updateTemperatureColor(temp) {
        const tempElement = document.getElementById('currentTemp');
        if (temp >= 30) {
            tempElement.style.color = '#ff6b35'; // Hot - orange/red
        } else if (temp >= 25) {
            tempElement.style.color = '#8B4513'; // Normal - brown
        } else {
            tempElement.style.color = '#4a90e2'; // Cool - blue
        }
    }

    // Initialize weather widget
    initWeatherWidget();
    
    // Start weather simulation (for demo)
    setTimeout(() => {
        simulateWeatherChanges();
    }, 5000);

    // Add click interaction to weather widget
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        weatherWidget.addEventListener('click', function() {
            // Create burst of weather particles
            createWeatherParticles(weatherData.current.emoji);
            
            // Add pulse effect
            this.style.animation = 'weatherPulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }

    // Add touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add tap effects for mobile
        const tappableElements = document.querySelectorAll('.color-dot, .timeline-dot, .main-photo');
        tappableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
});