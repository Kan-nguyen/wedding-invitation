// Wedding Invitation Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
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

    // Add countdown timer (optional)
    function updateCountdown() {
        const weddingDate = new Date('2025-07-27T17:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // You can add a countdown display element if needed
            console.log(`Còn ${days} ngày ${hours} giờ ${minutes} phút nữa đến đám cưới!`);
        }
    }

    // Update countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);

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