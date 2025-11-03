// ===============================================
// Mobile Navigation Toggle
// ===============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===============================================
// Smooth Scrolling for Navigation Links
// ===============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// Navbar Background on Scroll
// ===============================================
const nav = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.5)';
        nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.3)';
        nav.style.boxShadow = 'none';
    }
});

// ===============================================
// Intersection Observer for Animations
// ===============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll('section, .glass-card, .project-card, .cert-card, .skill-category');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===============================================
// Dynamic Typing Effect for Hero Section
// ===============================================
const roles = [
    'Computer Science Student',
    'AI & DevOps Enthusiast',
    'Full Stack Developer',
    'Automation Expert',
    'Cloud Native Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroSubtitle = document.querySelector('.hero h2');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDelay = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentRole.substring(0, charIndex - 1) || '\u00A0';
        charIndex--;
    } else {
        heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
            isDeleting = true;
            typeRole();
        }, pauseDelay);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeRole, speed);
}

// Start typing effect after a short delay
setTimeout(() => {
    heroSubtitle.textContent = '';
    typeRole();
}, 1000);

// ===============================================
// Parallax Effect for Floating Shapes
// ===============================================
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===============================================
// Project Card Tilt Effect
// ===============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ===============================================
// Skill Tag Animation on Hover
// ===============================================
const skillTags = document.querySelectorAll('.skill-tags span');

skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ===============================================
// Add Active Link Highlighting
// ===============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===============================================
// Scroll Reveal Animation
// ===============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.glass-card, .project-card, .cert-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===============================================
// Add Cursor Trail Effect
// ===============================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

if (circles.length === 0) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }
}

const cursorCircles = document.querySelectorAll('.cursor-circle');

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCursor() {
    let x = coords.x;
    let y = coords.y;
    
    cursorCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 40;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===============================================
// Email Copy to Clipboard
// ===============================================
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(102, 126, 234, 0.95);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: fadeInOut 2s ease;
            `;
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
                window.location.href = emailLink.getAttribute('href');
            }, 1500);
        });
    });
}

// ===============================================
// Add Fade In/Out Animation CSS
// ===============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// ===============================================
// Performance Optimization - Lazy Load Images
// ===============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===============================================
// Dark Mode Toggle
// ===============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Set dark mode as default
html.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add rotation animation
    themeToggle.classList.add('rotating');
    setTimeout(() => {
        themeToggle.classList.remove('rotating');
    }, 500);
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===============================================
// Certificate Links Management
// ===============================================
// Certificate URLs - Update these with your actual certificate links
const certificateLinks = {
    'oci-gen-ai': 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=YOUR_CERT_ID',
    'oci-data-science': 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=YOUR_CERT_ID',
    'ccna': 'https://www.credly.com/badges/YOUR_BADGE_ID'
};

// Add click handlers to certificate links
document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const certId = link.getAttribute('data-cert');
        const certUrl = certificateLinks[certId];
        
        if (certUrl && !certUrl.includes('YOUR_')) {
            window.open(certUrl, '_blank');
        } else {
            // Show a tooltip if link not configured
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Certificate link not configured yet';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(168, 85, 247, 0.95);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: fadeInOut 2s ease;
            `;
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        }
    });
});

// ===============================================
// Console Easter Egg
// ===============================================
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cInterested in how this portfolio was built?', 'font-size: 14px; color: #546e7a;');
console.log('%cCheck out the code on GitHub: https://github.com/harshareddy-bathala', 'font-size: 14px; color: #42a5f5;');
console.log('%c✨ Built with love using vanilla JavaScript, CSS3, and HTML5', 'font-size: 12px; color: #ec407a;');
