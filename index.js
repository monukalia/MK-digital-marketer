// ==========================================
// Mobile Menu Toggle
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const pages = document.querySelector('.pages');
if (menuToggle && pages) {
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !pages.contains(e.target)) {
            pages.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}
// ==========================================
// WhatsApp Contact Form Submission
// =========================================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    // 👇 STOP if form not on this page (no error)
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const service = document.querySelector('select[name="service"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        const number = "971528661420";

        const url = "https://wa.me/" + number + "?text="
            + "New Inquiry%0a%0a"
            + "Name: " + name + "%0a"
            + "Email: " + email + "%0a"
            + "Service: " + service + "%0a"
            + "Message: " + message;

        window.open(url, "_blank");
    });
});
// ==========================================
// Smooth Scrolling for Internal Links
// ==========================================
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

// ==========================================
// Scroll-based Header Background
// ==========================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add solid background on scroll
    if (currentScroll > 100) {
        header.style.background = 'rgba(125, 122, 122, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(125, 122, 122, 0.1)';
        header.style.boxShadow = 'none';
    }
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ==========================================
// Animate Elements on Scroll (Intersection Observer)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .step-card, .tool-card, .feature-grid > *, .stat-item').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Contact Form Validation & Submission
// ==========================================
const contactForm = document.querySelector('.contact-form-container form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput && !isValidEmail(emailInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.style.borderColor = '#e74c3c';
            return;
        }

        // Submit animation
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = '#27ae60';

            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// ==========================================
// Helper Functions
// ==========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// Counter Animation for Stats
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            if (statNumber && !statNumber.classList.contains('counted')) {
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
                statNumber.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id], .hero, .services, .about-hero');
const navLinks = document.querySelectorAll('.pages a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || section.className;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Lazy Loading for Images
// ==========================================
const lazyImages = document.querySelectorAll('img[data-src]');
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

lazyImages.forEach(img => imageObserver.observe(img));

// ==========================================
// Loading Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// Add necessary CSS animations
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    header {
        transition: all 0.3s ease;
    }

    .pages.active {
        display: flex !important;
    }

    .back-to-top:hover {
        transform: translateY(-3px);
        background: #2980b9;
    }

    .pages a.active {
        color: var(--primary);
        font-weight: 600;
    }

    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }

        .pages {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(31, 41, 55, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .pages.active {
            display: flex;
        }
    }
`;

document.head.appendChild(style);

console.log('Website JavaScript loaded successfully! 🚀');
/**
 * MK Digital Marketing - Blog Logic
 * Handles Search, Category Filtering, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blog-search');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const posts = document.querySelectorAll('.blog-post');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    // 1. Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // 2. Real-time Search Filter
      document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('#searchInput');
    const posts = document.querySelectorAll('.post');

    if (!searchInput || posts.length === 0) return;

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();

        posts.forEach(post => {
            const titleEl = post.querySelector('h2');
            const excerptEl = post.querySelector('p:not(.post-meta)');

            const title = titleEl ? titleEl.innerText.toLowerCase() : '';
            const excerpt = excerptEl ? excerptEl.innerText.toLowerCase() : '';

            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
                post.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

    // 3. Category Filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedCategory = link.getAttribute('data-category');

            // Update active link style (optional)
            categoryLinks.forEach(l => l.style.color = 'var(--text-dim)');
            link.style.color = 'var(--primary)';

            posts.forEach(post => {
                const postCategory = post.getAttribute('data-category');

                if (selectedCategory === 'all' || postCategory === selectedCategory) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});

/* blog 2026seotrending-specific styles */
// Simple script to animate elements as they scroll into view
document.addEventListener("DOMContentLoaded", function () {

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.content-body p, .content-body h2, .featured-image, .cta-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    // Apply initial styles for animation
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Smooth Scroll for Anchor Links (if you ever change hrefs to #ids)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});