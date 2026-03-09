// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Sticky nav on scroll
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => observer.observe(el));

// ========================================
// Animated Stat Counters
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCount(entry.target, target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

function animateCount(element, target) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(eased * target);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// Contact Form (Formspree)
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const data = new FormData(contactForm);

    try {
        const response = await fetch('https://formspree.io/f/xreyewgb', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            contactForm.reset();
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 4000);
        } else {
            submitBtn.textContent = 'Something went wrong — try again';
            submitBtn.disabled = false;
        }
    } catch (err) {
        submitBtn.textContent = 'Something went wrong — try again';
        submitBtn.disabled = false;
    }
});

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
