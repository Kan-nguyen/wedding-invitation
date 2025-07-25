/**
 * Wedding Invitation - Optimized Version
 * Clean & Performance Focused
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Management
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const invitationContainer = document.getElementById('invitationContainer');
        
        setTimeout(() => {
            loadingScreen?.classList.add('hidden');
            invitationContainer?.classList.add('loaded');
            
            // Start music after loading screen disappears
            setTimeout(() => {
                initSectionAnimations();
                attemptAutoplay();
                
                // Show music prompt after a brief delay if autoplay failed
                setTimeout(() => {
                    if (!isMusicPlaying && !musicInitialized) {
                        console.log('🎵 Autoplay failed, showing music prompt popup');
                        showMusicEnablePopup();
                    }
                }, 1500);
            }, 300);
        }, 2500);
    }

    // Simple section animations
    function initSectionAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    if (entry.target.classList.contains('countdown-section')) {
                        sectionObserver.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all main sections
        const sections = document.querySelectorAll('.hero-section, .countdown-section, .wedding-details, .gallery-section, .timeline-section, .rsvp-section, .weather-section, .qr-section');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

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

            // Update countdown display
            updateTimeUnit('days', days);
            updateTimeUnit('hours', hours);
            updateTimeUnit('minutes', minutes);
            updateTimeUnit('seconds', seconds);
        } else {
            // Wedding day has arrived!
            const titleElement = document.querySelector('.countdown-title');
            const timerElement = document.querySelector('.countdown-timer');
            if (titleElement) titleElement.innerHTML = '🎉 Ngày cưới đã đến! 🎉';
            if (timerElement) timerElement.innerHTML = '<div class="celebration">Chúc mừng cô dâu chú rể!</div>';
        }
    }

    function updateTimeUnit(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element) {
            const formattedValue = String(newValue).padStart(2, '0');
            if (element.textContent !== formattedValue) {
                element.textContent = formattedValue;
            }
        }
    }

    // Music Player System
    let currentTrackIndex = 0;
    let isMusicPlaying = false;
    let musicInitialized = false;
    // Music files - supports both MP3 and MP4 formats
    // Try MP4 first (since it was working before), then fallback to MP3
    const musicFiles = [
        {
            mp4: 'music/a-thousand-years.mp4',
            mp3: 'music/a-thousand-years.mp3',
            name: 'A Thousand Years'
        },
        {
            mp4: 'music/Hon-ca-yeu.mp4', 
            mp3: 'music/Hon-ca-yeu.mp3',
            name: 'Hơn Cả Yêu'
        }
    ];
    
    // Auto-detect music files in folder (supports MP3, MP4, WAV, OGG)
    // Add new files to the array above or they'll be auto-detected


    // Function to get the best audio source for current track
    function getCurrentAudioSource() {
        const track = musicFiles[currentTrackIndex];
        // Try MP4 first (was working before), then MP3
        return track.mp4;
    }

    function initMusicPlayer() {
        console.log('🎵 Initializing music player...');
        console.log('🎵 Available tracks:', musicFiles.map(t => t.name));
        
        const audio = document.getElementById('backgroundAudio');
        if (!audio) {
            console.log('❌ No audio element found');
            return;
        }

        // Set up audio with first track - use MP4 since it was working before
        const firstTrackSrc = getCurrentAudioSource();
        audio.src = firstTrackSrc;
        audio.volume = 0.3;
        audio.loop = false;
        
        console.log('🎵 Audio source set to:', audio.src);

        // Setup event listeners
        audio.addEventListener('loadeddata', () => {
            console.log('🎵 Audio loaded successfully');
        });

        audio.addEventListener('canplay', () => {
            console.log('🎵 Audio can play');
        });

        audio.addEventListener('play', () => {
            console.log('🎵 Audio play event fired');
            isMusicPlaying = true;
            musicInitialized = true;
            updateMusicButton(true);
        });

        audio.addEventListener('pause', () => {
            console.log('🎵 Audio pause event fired');
            isMusicPlaying = false;
            updateMusicButton(false);
        });

        audio.addEventListener('ended', () => {
            console.log('🎵 Track ended, switching to next...');
            currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
            const nextSrc = getCurrentAudioSource();
            audio.src = nextSrc;
            console.log('🎵 Loading next track:', nextSrc);
            audio.load();
            if (isMusicPlaying) {
                setTimeout(() => {
                    audio.play().catch(console.error);
                }, 500);
            }
        });

        audio.addEventListener('error', (e) => {
            console.log('🎵 Audio error:', e.target.error);
            const currentTrack = musicFiles[currentTrackIndex];
            
            // If MP4 failed, try MP3
            if (audio.src.includes('.mp4') && currentTrack.mp3) {
                console.log('🎵 MP4 failed, trying MP3:', currentTrack.mp3);
                audio.src = currentTrack.mp3;
                audio.load();
            } else {
                // Try next track
                console.log('🎵 Trying next track...');
                currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
                if (currentTrackIndex < musicFiles.length) {
                    audio.src = getCurrentAudioSource();
                    audio.load();
                }
            }
        });

        // Load the audio
        audio.load();
        
        // Multiple autoplay attempts with different timing
        audio.addEventListener('canplaythrough', () => {
            setTimeout(attemptAutoplay, 100);
        });
        
        // Additional fallback attempts
        setTimeout(() => attemptAutoplay(), 3000);
        setTimeout(() => attemptAutoplay(), 5000);
        
        console.log('🎵 Music player initialized - ready for user interaction');
        updateMusicButton(false);
        
        // Periodic state sync to prevent UI desync
        setInterval(() => {
            const realState = checkRealAudioState();
            if (realState !== isMusicPlaying) {
                console.log('🎵 Syncing state - real:', realState, 'tracked:', isMusicPlaying);
                isMusicPlaying = realState;
                updateMusicButton(realState);
            }
        }, 1000);
    }

    function attemptAutoplay() {
        if (musicInitialized) return;
        
        console.log('🎵 Attempting autoplay...');
        const audio = document.getElementById('backgroundAudio');
        if (!audio) return;
        
        // Multiple strategies for autoplay
        const strategies = [
            // Strategy 1: Silent start then fade in
            () => {
                audio.volume = 0;
                audio.muted = true;
                return audio.play().then(() => {
                    audio.muted = false;
                    return fadeInMusic(audio);
                });
            },
            // Strategy 2: Very low volume start
            () => {
                audio.volume = 0.01;
                return audio.play().then(() => {
                    return fadeInMusic(audio);
                });
            },
            // Strategy 3: Normal play (last resort)
            () => {
                audio.volume = 0.3;
                return audio.play();
            }
        ];
        
        // Try strategies one by one
        async function tryStrategies() {
            for (let i = 0; i < strategies.length; i++) {
                try {
                    console.log(`🎵 Trying autoplay strategy ${i + 1}...`);
                    await strategies[i]();
                    console.log(`✅ Autoplay successful with strategy ${i + 1}!`);
                    musicInitialized = true;
                    isMusicPlaying = true;
                    updateMusicButton(true);
                    return;
                } catch (error) {
                    console.log(`❌ Strategy ${i + 1} failed:`, error.message);
                    if (i === strategies.length - 1) {
                        // All strategies failed
                        throw error;
                    }
                }
            }
        }
        
        tryStrategies().catch((error) => {
            console.log('🎵 All autoplay strategies failed:', error.message);
            musicInitialized = false;
            isMusicPlaying = false;
            audio.volume = 0.3;
            audio.muted = false;
            updateMusicButton(false);
            showMusicPrompt();
        });
    }
    
    function fadeInMusic(audio) {
        return new Promise((resolve) => {
            let volume = 0;
            audio.volume = 0;
            const fadeInterval = setInterval(() => {
                if (volume < 0.3) {
                    volume += 0.02;
                    audio.volume = Math.min(volume, 0.3);
                } else {
                    clearInterval(fadeInterval);
                    console.log('🎵 Fade-in completed');
                    resolve();
                }
            }, 100);
        });
    }

    function showMusicPrompt() {
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            musicToggle.style.animation = 'pulse 2s infinite';
            musicToggle.title = 'Nhấn để phát nhạc nền';
        }
        
        // Show a nice popup prompt
        showMusicEnablePopup();
    }
    
    function showMusicEnablePopup() {
        // Don't show if already shown or music is playing
        if (document.getElementById('musicPromptPopup') || isMusicPlaying) return;
        
        const popup = document.createElement('div');
        popup.id = 'musicPromptPopup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 25px 35px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                text-align: center;
                z-index: 10000;
                font-family: 'Playfair Display', serif;
                border: 2px solid #d4af37;
                max-width: 300px;
                animation: fadeInScale 0.5s ease-out;
            ">
                <div style="font-size: 24px; margin-bottom: 10px;">🎵</div>
                <div style="font-size: 18px; color: #333; margin-bottom: 15px; font-weight: 600;">
                    Bật nhạc nền?
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 20px; line-height: 1.4;">
                    Để trải nghiệm thiệp cưới trọn vẹn với nhạc nền lãng mạn
                </div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button id="enableMusicBtn" style="
                        background: linear-gradient(135deg, #d4af37, #f7e98e);
                        color: #333;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                        🎶 Bật nhạc
                    </button>
                    <button id="skipMusicBtn" style="
                        background: transparent;
                        color: #666;
                        border: 1px solid #ddd;
                        padding: 10px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                        Bỏ qua
                    </button>
                </div>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.3);
                z-index: 9999;
            "></div>
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            #enableMusicBtn:hover {
                background: linear-gradient(135deg, #e5c047, #f8ed99) !important;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }
            #skipMusicBtn:hover {
                background: #f5f5f5 !important;
                border-color: #ccc !important;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(popup);
        
        // Handle buttons
        document.getElementById('enableMusicBtn').addEventListener('click', () => {
            console.log('🎵 User chose to enable music');
            popup.remove();
            // Force play music
            const audio = document.getElementById('backgroundAudio');
            if (audio) {
                audio.volume = 0.3;
                audio.play().then(() => {
                    console.log('🎵 Music started from popup!');
                    isMusicPlaying = true;
                    musicInitialized = true;
                    updateMusicButton(true);
                }).catch(console.error);
            }
        });
        
        document.getElementById('skipMusicBtn').addEventListener('click', () => {
            console.log('🎵 User chose to skip music');
            popup.remove();
        });
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (document.getElementById('musicPromptPopup')) {
                popup.remove();
            }
        }, 10000);
    }

    function checkRealAudioState() {
        const audio = document.getElementById('backgroundAudio');
        if (!audio) return false;
        
        const isActuallyPlaying = !audio.paused && !audio.ended && audio.currentTime > 0 && audio.readyState > 2;
        console.log('🎵 Real audio state check:', {
            paused: audio.paused,
            ended: audio.ended,
            currentTime: audio.currentTime,
            readyState: audio.readyState,
            actuallyPlaying: isActuallyPlaying
        });
        
        return isActuallyPlaying;
    }

    function updateMusicButton(playing) {
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            // Double check with real audio state
            const realState = checkRealAudioState();
            const actuallyPlaying = playing && realState;
            
            if (actuallyPlaying) {
                musicToggle.innerHTML = '<span class="music-icon">⏸️</span><span class="music-text">Tạm dừng</span>';
                musicToggle.style.animation = 'none';
            } else {
                musicToggle.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Nhạc nền</span>';
            }
            
            console.log('🎵 Button updated - showing playing:', actuallyPlaying);
        }
    }

    // Gallery System
    let slideIndex = 1;
    let autoplayInterval;

    function initGallery() {
        showSlide(slideIndex);
        startAutoplay();
    }

    function showSlide(n) {
        const slides = document.getElementsByClassName('slide');
        const indicators = document.getElementsByClassName('indicator');
        const thumbnails = document.getElementsByClassName('thumbnail');
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        // Remove active from indicators
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
        }
        
        // Remove active from thumbnails
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].classList.remove('active');
        }
        
        // Show current slide
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        
        if (indicators[slideIndex - 1]) {
            indicators[slideIndex - 1].classList.add('active');
        }
        
        if (thumbnails[slideIndex - 1]) {
            thumbnails[slideIndex - 1].classList.add('active');
        }
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Global functions for HTML onclick
    window.changeSlide = function(n) {
        slideIndex += n;
        showSlide(slideIndex);
        restartAutoplay();
    };

    window.currentSlide = function(n) {
        slideIndex = n;
        showSlide(slideIndex);
        restartAutoplay();
    };

    // RSVP Form with Enhanced Database Tracking
    function initRSVPForm() {
        const rsvpForm = document.getElementById('rsvpForm');
        const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
        const guestCountGroup = document.getElementById('guestCountGroup');
        const mealPreferenceGroup = document.getElementById('mealPreferenceGroup');
        const rsvpSuccess = document.getElementById('rsvpSuccess');

        // Check for success parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            showSuccessMessage();
        }

        // Set submission timestamp on page load
        const submissionTimeField = document.getElementById('submissionTime');
        if (submissionTimeField) {
            submissionTimeField.value = new Date().toISOString();
        }

        // Show/hide form sections based on attendance choice
        attendanceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'yes') {
                    if (guestCountGroup) guestCountGroup.style.display = 'block';
                    if (mealPreferenceGroup) mealPreferenceGroup.style.display = 'block';
                    
                    document.querySelectorAll('input[name="mealPreference"]').forEach(input => {
                        input.required = true;
                    });
                } else {
                    if (guestCountGroup) guestCountGroup.style.display = 'none';
                    if (mealPreferenceGroup) mealPreferenceGroup.style.display = 'none';
                    
                    document.querySelectorAll('input[name="mealPreference"]').forEach(input => {
                        input.required = false;
                        input.checked = false;
                    });
                }
            });
        });

        // Handle form submission with database tracking
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', function(e) {
                // Update submission time right before submit
                if (submissionTimeField) {
                    submissionTimeField.value = new Date().toISOString();
                }
                
                // Collect form data for logging
                const formData = new FormData(rsvpForm);
                const rsvpData = {
                    name: formData.get('guestName'),
                    phone: formData.get('guestPhone'),
                    email: formData.get('guestEmail'),
                    relationship: formData.get('relationship'),
                    attendance: formData.get('attendance'),
                    guestCount: formData.get('guestCount'),
                    mealPreference: formData.get('mealPreference'),
                    specialRequests: formData.get('specialRequests'),
                    message: formData.get('message'),
                    submissionTime: formData.get('submission-time'),
                    source: 'wedding-website'
                };
                
                console.log('📝 RSVP Submitted:', rsvpData);
                
                // Store in localStorage for backup
                const existingRSVPs = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
                existingRSVPs.push(rsvpData);
                localStorage.setItem('weddingRSVPs', JSON.stringify(existingRSVPs));
                
                // Show loading state
                const submitBtn = rsvpForm.querySelector('.rsvp-submit-btn');
                if (submitBtn) {
                    submitBtn.innerHTML = '<span class="btn-text">Đang gửi...</span><span class="btn-icon">⏳</span>';
                    submitBtn.disabled = true;
                }
                
                // Let form submit naturally to external service
                // Success handling will be done by the external service or page redirect
            });
        }
    }
    
    function showSuccessMessage() {
        // Create success overlay
        const successOverlay = document.createElement('div');
        successOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(139, 69, 19, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        successOverlay.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
                box-shadow: 0 20px 60px rgba(139, 69, 19, 0.3);
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    color: #8B4513;
                    margin-bottom: 15px;
                    font-size: 24px;
                ">Cảm ơn bạn!</h3>
                <p style="
                    color: #B8956A;
                    margin-bottom: 25px;
                    line-height: 1.6;
                    font-family: 'Inter', sans-serif;
                ">RSVP của bạn đã được gửi thành công. Chúng tôi rất mong được gặp bạn trong ngày trọng đại!</p>
                <button onclick="this.parentElement.parentElement.remove(); window.history.replaceState({}, '', window.location.pathname);" style="
                    background: linear-gradient(135deg, #D4A574 0%, #B8956A 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    Đóng
                </button>
            </div>
        `;
        
        document.body.appendChild(successOverlay);
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (successOverlay.parentElement) {
                successOverlay.remove();
                window.history.replaceState({}, '', window.location.pathname);
            }
        }, 10000);
    }
    
    // RSVP Analytics Dashboard (for admin use)
    function createRSVPDashboard() {
        // Only show dashboard if admin query parameter is present
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('admin')) return;
        
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        if (rsvps.length === 0) return;
        
        // Create dashboard
        const dashboard = document.createElement('div');
        dashboard.id = 'rsvpDashboard';
        dashboard.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                max-width: 400px;
                max-height: 400px;
                overflow-y: auto;
                z-index: 10001;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
            ">
                <h3 style="margin: 0 0 15px 0; color: #8B4513;">📊 RSVP Dashboard</h3>
                <div id="rsvpStats"></div>
                <div id="rsvpList" style="margin-top: 15px;"></div>
                <button onclick="exportRSVPs()" style="
                    background: #D4A574;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    margin: 10px 5px 0 0;
                    cursor: pointer;
                ">Export CSV</button>
                <button onclick="clearRSVPs()" style="
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Clear Data</button>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // Populate dashboard
        updateDashboard();
    }
    
    function updateDashboard() {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        const attending = rsvps.filter(r => r.attendance === 'yes');
        const notAttending = rsvps.filter(r => r.attendance === 'no');
        const totalGuests = attending.reduce((sum, r) => sum + parseInt(r.guestCount || 1), 0);
        
        // Update stats
        const statsDiv = document.getElementById('rsvpStats');
        if (statsDiv) {
            statsDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <div style="font-size: 24px; font-weight: bold; color: #28a745;">${attending.length}</div>
                        <div style="color: #666;">Tham dự</div>
                    </div>
                    <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <div style="font-size: 24px; font-weight: bold; color: #dc3545;">${notAttending.length}</div>
                        <div style="color: #666;">Không tham dự</div>
                    </div>
                </div>
                <div style="text-align: center; padding: 10px; background: #e3f2fd; border-radius: 5px;">
                    <div style="font-size: 18px; font-weight: bold; color: #1976d2;">${totalGuests}</div>
                    <div style="color: #666;">Tổng số khách</div>
                </div>
            `;
        }
        
        // Update list
        const listDiv = document.getElementById('rsvpList');
        if (listDiv) {
            listDiv.innerHTML = rsvps.slice(-5).reverse().map(rsvp => `
                <div style="
                    padding: 8px;
                    margin: 5px 0;
                    border-left: 3px solid ${rsvp.attendance === 'yes' ? '#28a745' : '#dc3545'};
                    background: #f8f9fa;
                    border-radius: 3px;
                ">
                    <strong>${rsvp.name}</strong> 
                    <span style="color: ${rsvp.attendance === 'yes' ? '#28a745' : '#dc3545'};">
                        ${rsvp.attendance === 'yes' ? '✅ Có' : '❌ Không'}
                    </span>
                    ${rsvp.attendance === 'yes' && rsvp.guestCount ? `<br><small>Số khách: ${rsvp.guestCount}</small>` : ''}
                </div>
            `).join('');
        }
    }
    
    // Global functions for dashboard
    window.exportRSVPs = function() {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        if (rsvps.length === 0) {
            alert('Không có dữ liệu để export');
            return;
        }
        
        // Create CSV content
        const headers = ['Tên', 'Điện thoại', 'Email', 'Mối quan hệ', 'Tham dự', 'Số khách', 'Món ăn', 'Yêu cầu đặc biệt', 'Lời chúc', 'Thời gian'];
        const csvContent = [
            headers.join(','),
            ...rsvps.map(rsvp => [
                rsvp.name || '',
                rsvp.phone || '',
                rsvp.email || '',
                rsvp.relationship || '',
                rsvp.attendance === 'yes' ? 'Có' : 'Không',
                rsvp.guestCount || '1',
                rsvp.mealPreference || '',
                rsvp.specialRequests || '',
                rsvp.message || '',
                new Date(rsvp.submissionTime).toLocaleString('vi-VN')
            ].map(field => `"${field.replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `wedding-rsvp-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };
    
    window.clearRSVPs = function() {
        if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu RSVP?')) {
            localStorage.removeItem('weddingRSVPs');
            updateDashboard();
            alert('Đã xóa tất cả dữ liệu');
        }
    };

    // Initialize music controls
    function initMusicControls() {
        const musicToggle = document.getElementById('musicToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        const musicMinimize = document.getElementById('musicMinimize');

        if (musicToggle) {
            musicToggle.addEventListener('click', function() {
                console.log('🎵 Music toggle clicked');
                
                const audio = document.getElementById('backgroundAudio');
                if (!audio) {
                    console.log('❌ No audio element for toggle');
                    return;
                }

                // Check real audio state first
                const reallyPlaying = checkRealAudioState();
                isMusicPlaying = reallyPlaying; // Sync our state
                
                console.log('🎵 Toggle clicked - real state:', reallyPlaying, 'tracked state:', isMusicPlaying);

                if (reallyPlaying) {
                    // Pause music
                    console.log('🎵 Pausing music');
                    audio.pause();
                    isMusicPlaying = false;
                    updateMusicButton(false);
                } else {
                    // Play music
                    console.log('🎵 Starting music playback');
                    
                    // Ensure audio source is set
                    const expectedSrc = getCurrentAudioSource();
                    if (!audio.src || audio.src.indexOf(expectedSrc) === -1) {
                        console.log('🎵 Setting audio source to:', expectedSrc);
                        audio.src = expectedSrc;
                        audio.load();
                    }
                    
                    // Wait a moment for loading, then play
                    setTimeout(() => {
                        audio.play().then(() => {
                            console.log('✅ Music started successfully!');
                            isMusicPlaying = true;
                            updateMusicButton(true);
                        }).catch((error) => {
                            console.log('❌ Play failed:', error);
                            console.log('🎵 Trying with volume adjustment...');
                            
                            // Try with lower volume
                            audio.volume = 0.1;
                            audio.play().then(() => {
                                console.log('✅ Music started with lower volume!');
                                isMusicPlaying = true;
                                updateMusicButton(true);
                                // Gradually increase volume
                                let vol = 0.1;
                                const fadeIn = setInterval(() => {
                                    vol += 0.05;
                                    if (vol >= 0.3) {
                                        audio.volume = 0.3;
                                        clearInterval(fadeIn);
                                    } else {
                                        audio.volume = vol;
                                    }
                                }, 200);
                            }).catch((finalError) => {
                                console.log('❌ Final play attempt failed:', finalError);
                                alert('Không thể phát nhạc. Vui lòng thử lại hoặc kiểm tra cài đặt trình duyệt.');
                            });
                        });
                    }, 300);
                }
                
                // Remove animation
                this.style.animation = 'none';
            });
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                const audio = document.getElementById('backgroundAudio');
                if (audio) {
                    audio.volume = this.value / 100;
                }
                
                const volumeIcon = document.querySelector('.volume-icon');
                if (volumeIcon) {
                    if (this.value == 0) {
                        volumeIcon.textContent = '🔇';
                    } else if (this.value < 50) {
                        volumeIcon.textContent = '🔉';
                    } else {
                        volumeIcon.textContent = '🔊';
                    }
                }
            });
        }

        if (musicMinimize) {
            musicMinimize.addEventListener('click', function() {
                const musicPlayer = document.getElementById('musicPlayer');
                if (musicPlayer) {
                    const isMinimized = musicPlayer.classList.contains('minimized');
                    musicPlayer.classList.toggle('minimized');
                    this.textContent = isMinimized ? '−' : '+';
                    
                    // Save minimize state to localStorage
                    localStorage.setItem('musicPlayerMinimized', !isMinimized);
                }
            });
        }
        
        // Auto-minimize on mobile devices and restore saved state
        function handleMusicPlayerResponsive() {
            const musicPlayer = document.getElementById('musicPlayer');
            const musicMinimizeBtn = document.getElementById('musicMinimize');
            
            if (musicPlayer && musicMinimizeBtn) {
                const isMobile = window.innerWidth <= 768;
                const savedState = localStorage.getItem('musicPlayerMinimized');
                
                // Auto-minimize on first load for mobile, or restore saved state
                if (savedState === null && isMobile) {
                    // First time on mobile - auto minimize
                    musicPlayer.classList.add('minimized');
                    musicMinimizeBtn.textContent = '+';
                    localStorage.setItem('musicPlayerMinimized', 'true');
                } else if (savedState === 'true') {
                    // Restore minimized state
                    musicPlayer.classList.add('minimized');
                    musicMinimizeBtn.textContent = '+';
                } else {
                    // Restore expanded state
                    musicPlayer.classList.remove('minimized');
                    musicMinimizeBtn.textContent = '−';
                }
            }
        }
        
        // Call responsive handler on load and resize
        handleMusicPlayerResponsive();
        window.addEventListener('resize', handleMusicPlayerResponsive);
        
        // Make minimized player clickable to expand (better UX)
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) {
            musicPlayer.addEventListener('click', function(e) {
                // Only trigger if clicking on the minimized player itself, not buttons inside
                if (this.classList.contains('minimized') && e.target === this) {
                    const musicMinimizeBtn = document.getElementById('musicMinimize');
                    if (musicMinimizeBtn) {
                        musicMinimizeBtn.click();
                    }
                }
            });
        }
    }

    // Touch optimizations
    function initTouchOptimizations() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            const touchElements = document.querySelectorAll('button, .main-photo, .thumbnail, .time-unit');
            touchElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                }, { passive: true });
                
                element.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }, { passive: true });
            });
        }

        // Fix viewport height
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }

    // Advanced autoplay with multiple triggers
    function enableAutoplayOnInteraction() {
        let interactionDetected = false;
        
        const enableAutoplay = (eventType) => {
            if (!musicInitialized && !interactionDetected) {
                interactionDetected = true;
                console.log(`🎵 User interaction detected (${eventType}) - enabling autoplay`);
                
                // Small delay to ensure interaction is processed
                setTimeout(() => {
                    attemptAutoplay();
                }, 100);
            }
        };
        
        // Multiple interaction triggers
        const events = ['click', 'touchstart', 'touchend', 'keydown', 'mousemove', 'scroll'];
        events.forEach(event => {
            document.addEventListener(event, () => enableAutoplay(event), { 
                once: true, 
                passive: true 
            });
        });
        
        // Also try on page visibility change (when user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !musicInitialized) {
                console.log('🎵 Page became visible - trying autoplay');
                setTimeout(attemptAutoplay, 200);
            }
        });
    }
    
    // Try autoplay immediately when audio context allows
    function tryImmediateAutoplay() {
        // Check if AudioContext is allowed (indicates user interaction)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'running') {
                console.log('🎵 Audio context already running - trying immediate autoplay');
                setTimeout(attemptAutoplay, 500);
            } else {
                audioContext.resume().then(() => {
                    console.log('🎵 Audio context resumed - trying autoplay');
                    setTimeout(attemptAutoplay, 200);
                }).catch(() => {
                    console.log('🎵 Audio context resume failed - waiting for interaction');
                });
            }
        } catch (error) {
            console.log('🎵 AudioContext not available:', error.message);
        }
    }

    // Message Wall System
    let messageWallData = {
        messages: [],
        lastUpdate: null,
        isLoading: false,
        updateInterval: null
    };

    function initMessageWall() {
        console.log('💌 Initializing Message Wall...');
        
        // Setup event listeners
        const refreshBtn = document.getElementById('refreshMessages');
        const scrollToRSVPBtn = document.getElementById('scrollToRSVP');
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadMessages(true);
            });
        }
        
        if (scrollToRSVPBtn) {
            scrollToRSVPBtn.addEventListener('click', () => {
                const rsvpSection = document.querySelector('.rsvp-section');
                if (rsvpSection) {
                    rsvpSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on message textarea
                    setTimeout(() => {
                        const messageField = document.getElementById('message');
                        if (messageField) {
                            messageField.focus();
                        }
                    }, 800);
                }
            });
        }
        
        // Load initial messages
        loadMessages();
        
        // Setup auto-refresh every 30 seconds
        messageWallData.updateInterval = setInterval(() => {
            loadMessages(false, true);
        }, 30000);
        
        console.log('✅ Message Wall initialized');
    }
    
    function loadMessages(forceRefresh = false, silent = false) {
        if (messageWallData.isLoading && !forceRefresh) return;
        
        messageWallData.isLoading = true;
        
        if (!silent) {
            showLoadingState();
        }
        
        const refreshBtn = document.getElementById('refreshMessages');
        if (refreshBtn && !silent) {
            refreshBtn.classList.add('loading');
        }
        
        console.log('📥 Loading messages...');
        
        // For demo, we'll use multiple data sources
        Promise.all([
            loadMessagesFromLocalStorage(),
            loadMessagesFromGoogleSheets(),
            loadSampleMessages() // Fallback sample data
        ]).then(([localMessages, sheetsMessages, sampleMessages]) => {
            
            // Combine and deduplicate messages
            const allMessages = [...localMessages, ...sheetsMessages];
            const uniqueMessages = deduplicateMessages(allMessages);
            
            // Use sample messages if no real messages
            const finalMessages = uniqueMessages.length > 0 ? uniqueMessages : sampleMessages;
            
            messageWallData.messages = finalMessages;
            messageWallData.lastUpdate = new Date();
            
            displayMessages(finalMessages);
            
            if (!silent && finalMessages.length > messageWallData.messages.length) {
                showNewMessageNotification();
            }
            
        }).catch(error => {
            console.log('❌ Error loading messages:', error);
            // Show sample messages on error
            loadSampleMessages().then(sampleMessages => {
                displayMessages(sampleMessages);
            });
        }).finally(() => {
            messageWallData.isLoading = false;
            
            if (refreshBtn) {
                refreshBtn.classList.remove('loading');
            }
        });
    }
    
    function loadMessagesFromLocalStorage() {
        return new Promise(resolve => {
            try {
                const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
                const messages = rsvps
                    .filter(rsvp => rsvp.message && rsvp.message.trim().length > 0)
                    .map(rsvp => ({
                        id: `local_${rsvp.name}_${rsvp.submissionTime}`,
                        name: rsvp.name,
                        message: rsvp.message,
                        timestamp: new Date(rsvp.submissionTime),
                        source: 'local'
                    }));
                resolve(messages);
            } catch (error) {
                console.log('❌ Error loading local messages:', error);
                resolve([]);
            }
        });
    }
    
    function loadMessagesFromGoogleSheets() {
        return new Promise(resolve => {
            // This would connect to Google Sheets API
            // For now, return empty array
            // TODO: Implement Google Sheets integration
            resolve([]);
        });
    }
    
    function loadSampleMessages() {
        return new Promise(resolve => {
            const sampleMessages = [
                {
                    id: 'sample_1',
                    name: 'Gia đình Nguyễn',
                    message: 'Chúc hai bạn trăm năm hạnh phúc, sớm có em bé! Cả gia đình rất mong đợi ngày vui của hai bạn.',
                    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                    source: 'sample'
                },
                {
                    id: 'sample_2', 
                    name: 'Minh An',
                    message: 'Chúc mừng Minh Nguyệt và Anh Khoa! Tình yêu của hai bạn thật đẹp, chúc hạnh phúc mãi mãi! 💕',
                    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
                    source: 'sample'
                },
                {
                    id: 'sample_3',
                    name: 'Cô Lan Anh',
                    message: 'Cô chúc hai con luôn hạnh phúc, yêu thương và che chở cho nhau. Gia đình nhỏ của các con sẽ luôn tràn đầy tiếng cười!',
                    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
                    source: 'sample'
                }
            ];
            resolve(sampleMessages);
        });
    }
    
    function deduplicateMessages(messages) {
        const seen = new Set();
        return messages.filter(message => {
            const key = `${message.name}_${message.message}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }
    
    function displayMessages(messages) {
        const loadingEl = document.querySelector('.message-loading');
        const containerEl = document.getElementById('messagesContainer');
        const noMessagesEl = document.getElementById('noMessages');
        
        // Hide loading
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
        
        if (messages.length === 0) {
            // Show empty state
            if (containerEl) containerEl.style.display = 'none';
            if (noMessagesEl) noMessagesEl.style.display = 'flex';
            return;
        }
        
        // Show messages
        if (noMessagesEl) noMessagesEl.style.display = 'none';
        if (containerEl) {
            containerEl.style.display = 'grid';
            containerEl.innerHTML = '';
            
            // Sort messages by timestamp (newest first)
            const sortedMessages = messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            sortedMessages.forEach((message, index) => {
                const messageEl = createMessageElement(message);
                containerEl.appendChild(messageEl);
                
                // Stagger animations
                setTimeout(() => {
                    messageEl.style.opacity = '1';
                    messageEl.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    function createMessageElement(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message-card';
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(20px)';
        messageEl.style.transition = 'all 0.5s ease-out';
        
        const timeAgo = getTimeAgo(new Date(message.timestamp));
        
        messageEl.innerHTML = `
            <div class="message-content">
                <div class="message-text">"${escapeHtml(message.message)}"</div>
                <div class="message-author">
                    <span class="author-name">${escapeHtml(message.name)}</span>
                    <span class="message-time">${timeAgo}</span>
                </div>
            </div>
            <div class="message-heart">💕</div>
        `;
        
        return messageEl;
    }
    
    function getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return 'Vừa xong';
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showLoadingState() {
        const loadingEl = document.querySelector('.message-loading');
        const containerEl = document.getElementById('messagesContainer');
        const noMessagesEl = document.getElementById('noMessages');
        
        if (loadingEl) loadingEl.style.display = 'flex';
        if (containerEl) containerEl.style.display = 'none';
        if (noMessagesEl) noMessagesEl.style.display = 'none';
    }
    
    function showNewMessageNotification() {
        // Remove existing notification
        const existing = document.querySelector('.new-message-notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'new-message-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px;">💌</span>
                <div>
                    <div style="font-weight: 600;">Lời chúc mới!</div>
                    <div style="font-size: 12px; opacity: 0.9;">Click để xem</div>
                </div>
            </div>
        `;
        
        notification.addEventListener('click', () => {
            const messageWallSection = document.querySelector('.message-wall-section');
            if (messageWallSection) {
                messageWallSection.scrollIntoView({ behavior: 'smooth' });
            }
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Cleanup function
    function cleanupMessageWall() {
        if (messageWallData.updateInterval) {
            clearInterval(messageWallData.updateInterval);
            messageWallData.updateInterval = null;
        }
    }
    
    // Listen for page unload to cleanup
    window.addEventListener('beforeunload', cleanupMessageWall);

    // QR Code System
    function initQRCode() {
        const currentUrl = window.location.href;
        
        console.log('🔗 QR Code URL:', currentUrl);
        
        // Simple QR code generation using current URL
        const qrContainer = document.getElementById('qrcode');
        if (qrContainer) {
            // Use a simple QR service with better error correction
            qrContainer.innerHTML = `
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data=${encodeURIComponent(currentUrl)}" 
                     alt="Wedding Invitation QR Code" 
                     style="width: 180px; height: 180px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
                     loading="lazy">
            `;
        }
        
        // Copy URL button
        const copyBtn = document.getElementById('copyUrlBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentUrl).then(() => {
                    // Visual feedback
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span>✅</span> Đã copy!';
                    copyBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                        copyBtn.style.background = '';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = currentUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    copyBtn.innerHTML = '<span>✅</span> Đã copy!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<span>📋</span> Copy Link';
                    }, 2000);
                });
            });
        }
        
        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const shareData = {
                    title: 'Thiệp cưới Anh Khoa & Minh Nguyệt',
                    text: '💕 Chúng tôi trân trọng mời bạn dự lễ cưới của chúng tôi!',
                    url: currentUrl
                };
                
                if (navigator.share) {
                    navigator.share(shareData).catch(console.error);
                } else {
                    // Fallback: copy to clipboard
                    const shareText = `${shareData.text}\n${shareData.url}`;
                    navigator.clipboard.writeText(shareText).then(() => {
                        shareBtn.innerHTML = '<span>✅</span> Đã copy!';
                        setTimeout(() => {
                            shareBtn.innerHTML = '<span>📤</span> Share';
                        }, 2000);
                    });
                }
            });
        }
    }

    // Initialize everything
    function initAll() {
        showLoadingScreen();
        initGallery();
        initMusicPlayer();
        initMusicControls();
        initRSVPForm();
        initQRCode();
        initTouchOptimizations();
        enableAutoplayOnInteraction();
        
        // Initialize RSVP dashboard for admin
        createRSVPDashboard();
        
        // Advanced autoplay attempts
        tryImmediateAutoplay();
        
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        console.log('✅ Wedding app initialized successfully');
    }

    // Start the app
    initAll();
});

// Additional utility functions
window.openGoogleMaps = function() {
    const url = 'https://www.google.com/maps/search/?api=1&query=JW+Marriott+Hotel+Saigon';
    window.open(url, '_blank');
};

window.getDirections = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const url = `https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/10.7886,106.7024`;
                window.open(url, '_blank');
            },
            () => {
                const url = 'https://www.google.com/maps/dir//10.7886,106.7024';
                window.open(url, '_blank');
            }
        );
    }
};

window.shareLocation = function() {
    const shareData = {
        title: 'JW Marriott Hotel & Suites Saigon',
        text: 'Địa điểm đám cưới: JW Marriott Hotel & Suites Saigon',
        url: 'https://www.google.com/maps/search/?api=1&query=JW+Marriott+Hotel+Saigon'
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    }
};