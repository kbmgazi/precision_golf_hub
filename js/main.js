
/**
 * Precision Golf Hub - Main JavaScript
 * Features: Sticky nav, back to top, active nav links, scroll animations
 */


// 1. STICKY NAVIGATION
function initStickyNav() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const scrollThreshold = 80;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            if (nav) nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            if (nav) nav.classList.remove('scrolled');
        }
    });
}


// 2. BACK TO TOP BUTTON
function initBackToTop() {
    const scrollThreshold = 300;
    let backToTopBtn = document.getElementById('back-to-top');

    // Create button if it doesn't exist
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.innerHTML = '↑ Top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
    }

    // Toggle visibility based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// 3. AUTO ACTIVE NAV LINK
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a');
    
    if (navLinks.length === 0) return;

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        // Extract filename from href
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();

        // Remove active class first
        link.classList.remove('active');

        // Add active class to matching link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}


// 4. SCROLL-TRIGGERED ANIMATIONS
function initScrollAnimations() {
    // Elements to animate
    const animateSelectors = [
        '.card',
        '.product',
        '.offer',
        '.tip',
        '.partner',
        '.hero',
        'section > h2',
        'section > h3'
    ];

    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate-in');
                
                // Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements
    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    });
}


// 5. ACCORDION FUNCTIONALITY
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;

            // Close other accordions in the same accordion group
            const accordion = header.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-header').forEach(otherHeader => {
                    if (otherHeader !== header) {
                        otherHeader.setAttribute('aria-expanded', 'false');
                        const otherContent = otherHeader.nextElementSibling;
                        if (otherContent) {
                            otherContent.classList.remove('show');
                        }
                    }
                });
            }

            // Toggle current accordion
            header.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.classList.toggle('show');
            }
        });

        // Handle keyboard navigation
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
}


// 6. LIGHTBOX GALLERY
function initLightbox() {
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    let lightbox = document.getElementById('lightbox');

    // Create lightbox if it doesn't exist
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
                <img class="lightbox-image" src="" alt="">
                <button class="lightbox-next" aria-label="Next image">&#10095;</button>
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    let currentIndex = 0;
    let images = [];

    // Populate images from triggers
    function populateImages() {
        images = Array.from(lightboxTriggers).map(trigger => ({
            src: trigger.dataset.lightbox,
            alt: trigger.dataset.caption || 'Product image',
            title: trigger.dataset.caption || ''
        }));
    }

    // Open lightbox
    function openLightbox(index) {
        populateImages();
        currentIndex = Math.max(0, Math.min(index, images.length - 1));
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Update lightbox display
    function updateLightbox() {
        if (images.length === 0) return;
        
        const image = images[currentIndex];
        const imgElement = lightbox.querySelector('.lightbox-image');
        const captionElement = lightbox.querySelector('.lightbox-caption');
        
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        captionElement.textContent = image.title;

        // Update navigation buttons
        lightbox.querySelector('.lightbox-prev').style.display = currentIndex > 0 ? 'block' : 'none';
        lightbox.querySelector('.lightbox-next').style.display = currentIndex < images.length - 1 ? 'block' : 'none';
    }

    // Click handlers
    lightboxTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Navigation
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateLightbox();
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIndex = Math.min(images.length - 1, currentIndex + 1);
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
        if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
    });
}

// 7. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initBackToTop();
    initActiveNavLink();
    initScrollAnimations();
    initAccordion();
    initLightbox();
});
