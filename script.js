// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = '#FF9D00';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = '#FF9D00';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero section animations
const heroText = document.querySelector('.hero-text');
const heroImage = document.querySelector('.hero-image');
    
if (heroText) {
    heroText.classList.add('slide-in-left');
    setTimeout(() => {
        heroText.classList.add('visible');
    }, 100);
}
    
if (heroImage) {
    heroImage.classList.add('slide-in-right');
    setTimeout(() => {
        heroImage.classList.add('visible');
    }, 100);
}

// Typing effect for hero name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 80);
        }, 500);
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Project card hover effects and screenshot loading
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Handle screenshot loading
        const screenshot = card.querySelector('.project-screenshot');
        const fallback = card.querySelector('.project-icon-fallback');
        
        if (screenshot && fallback) {
            // Set up screenshot loading with multiple fallback options
            screenshot.onload = function() {
                screenshot.style.display = 'block';
                fallback.style.display = 'none';
            };
            
            screenshot.onerror = function() {
                // Try alternative screenshot service
                const originalUrl = screenshot.src;
                const siteUrl = originalUrl.match(/url=([^&]+)/);
                if (siteUrl && siteUrl[1]) {
                    const decodedUrl = decodeURIComponent(siteUrl[1]);
                    // Try screenshotlayer API as backup
                    screenshot.src = `https://api.screenshotlayer.com/api/capture?access_key=your-key&url=${encodeURIComponent(decodedUrl)}&viewport=1440x900&width=400&height=200`;
                    
                    // If backup also fails, show icon
                    setTimeout(() => {
                        if (!screenshot.complete || screenshot.naturalHeight === 0) {
                            screenshot.style.display = 'none';
                            fallback.style.display = 'flex';
                        }
                    }, 5000);
                } else {
                    screenshot.style.display = 'none';
                    fallback.style.display = 'flex';
                }
            };
            
            // Fallback timeout
            setTimeout(() => {
                if (!screenshot.complete || screenshot.naturalHeight === 0) {
                    screenshot.style.display = 'none';
                    fallback.style.display = 'flex';
                }
            }, 8000);
        }
    });
    
    // Profile image handling
    const profileImg = document.querySelector('.profile-image img');
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    
    if (profileImg && profilePlaceholder) {
        profileImg.onload = function() {
            profileImg.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        };
        
        profileImg.onerror = function() {
            profileImg.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        };
    }
});

// Scroll animations and smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Galaxy Particle System
    function createGalaxyParticles() {
        const container = document.getElementById('galaxyParticles');
        if (!container) return;
        
        const particleCount = 80; // High density of particles
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
        const animations = ['particleFloat1', 'particleFloat2', 'particleFloat3', 'particleFloat4', 'particleFloat5', 'particleFloat6'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'galaxy-particle';
            
            // Random size
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            particle.classList.add(`size-${size}`);
            
            // Random animation
            const animation = animations[Math.floor(Math.random() * animations.length)];
            const duration = 15 + Math.random() * 25; // 15-40 seconds for slow, calming effect
            const delay = Math.random() * 20; // Staggered start times
            
            particle.style.animation = `${animation} ${duration}s ease-in-out ${delay}s infinite`;
            
            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            container.appendChild(particle);
        }
    }
    
    // Initialize galaxy particles
    createGalaxyParticles();

    // Loading animation
    setTimeout(function() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(function() {
                loading.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const bubbles = document.querySelectorAll('.bubble');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.5 + (index * 0.1);
            bubble.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add animation classes to elements
    function addAnimationClasses() {
        // Hero section animations
        document.querySelector('.hero-title')?.classList.add('fade-in', 'stagger-1');
        document.querySelector('.hero-subtitle')?.classList.add('fade-in', 'stagger-2');
        document.querySelector('.hero-tagline')?.classList.add('fade-in', 'stagger-3');
        document.querySelectorAll('.banner-btn').forEach((btn, index) => {
            btn.classList.add('fade-in', `stagger-${index + 4}`);
        });
        
        // Section headers
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('slide-in-left');
        });
        
        document.querySelectorAll('.section-subtitle').forEach(el => {
            el.classList.add('slide-in-right');
        });
        
        // Cards
        document.querySelectorAll('.project-card, .skill-item').forEach((el, index) => {
            el.classList.add('scale-in', `stagger-${(index % 4) + 1}`);
        });
        
        // About section
        document.querySelector('.about-me-image')?.classList.add('slide-in-left');
        document.querySelector('.about-me-content')?.classList.add('slide-in-right');
        
        // No contact section animations needed
    }

    addAnimationClasses();
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Skills animation (if you add a skills section later)
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = targetWidth;
        }, 200);
    });
}

// Initialize particles background (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add floating animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Function to fetch website thumbnails
function fetchWebsiteThumbnails() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const screenshot = card.querySelector('.project-screenshot');
        const fallback = card.querySelector('.project-icon-fallback');
        const projectLink = card.querySelector('.project-link');
        
        if (screenshot && fallback && projectLink) {
            const siteUrl = projectLink.href;
            
            // Use a free screenshot API service
            const thumbnailUrl = `https://api.thumbnail.ws/api/thumbnail/get?url=${encodeURIComponent(siteUrl)}&width=400&height=200`;
            
            // Try to load the thumbnail
            const testImg = new Image();
            testImg.onload = function() {
                screenshot.src = thumbnailUrl;
                screenshot.style.display = 'block';
                fallback.style.display = 'none';
            };
            
            testImg.onerror = function() {
                // Try alternative service
                const altThumbnailUrl = `https://www.apis.io/thumbnail?url=${encodeURIComponent(siteUrl)}&width=400&height=200`;
                const altImg = new Image();
                
                altImg.onload = function() {
                    screenshot.src = altThumbnailUrl;
                    screenshot.style.display = 'block';
                    fallback.style.display = 'none';
                };
                
                altImg.onerror = function() {
                    // Final fallback to icon
                    screenshot.style.display = 'none';
                    fallback.style.display = 'flex';
                };
                
                altImg.src = altThumbnailUrl;
            };
            
            testImg.src = thumbnailUrl;
        }
    });
}

// Initialize thumbnail fetching when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Delay thumbnail fetching to allow page to load first
    setTimeout(fetchWebsiteThumbnails, 1000);
});

// Console welcome message
console.log('%c Welcome to Abhishek Yadav\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion and modern web technologies ', 'background: #f0f0f0; color: #333; font-size: 12px; padding: 5px; border-radius: 3px;');


