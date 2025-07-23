// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.innerHTML = `
        <div class="mobile-menu-content">
            <div class="mobile-menu-header">
                <span class="brand-name">Bento Delights</span>
                <button class="mobile-menu-close">&times;</button>
            </div>
            <ul class="mobile-menu-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#video">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    `;
    document.body.appendChild(mobileMenuOverlay);
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    const closeBtn = mobileMenuOverlay.querySelector('.mobile-menu-close');
    const menuLinks = mobileMenuOverlay.querySelectorAll('.mobile-menu-list a');
    
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll('.product-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });
                
                // If image is already cached and loaded
                if (img.complete) {
                    img.classList.add('loaded');
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // WhatsApp order tracking
    const orderButtons = document.querySelectorAll('.btn-order');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Optional: Track order analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'order_click', {
                    'product_name': productName,
                    'event_category': 'ecommerce',
                    'event_label': 'whatsapp_order'
                });
            }
        });
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Add reveal animation to elements
    const revealElements = document.querySelectorAll('.product-card, .section-header, .contact-item');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Form validation for contact (if added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll handler
    const debouncedScrollHandler = debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
});

// Add CSS for mobile menu and animations
const additionalStyles = `
    .mobile-menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .mobile-menu-content {
        position: absolute;
        top: 0;
        right: 0;
        width: 280px;
        height: 100%;
        background: white;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-overlay.active .mobile-menu-content {
        transform: translateX(0);
    }
    
    .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .mobile-menu-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: #6B46C1;
        cursor: pointer;
    }
    
    .mobile-menu-list {
        list-style: none;
        padding: 2rem 0;
    }
    
    .mobile-menu-list li {
        margin-bottom: 0.5rem;
    }
    
    .mobile-menu-list a {
        display: block;
        padding: 1rem 1.5rem;
        text-decoration: none;
        color: #1F2937;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-list a:hover {
        background: #F3F4F6;
        color: #6B46C1;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (min-width: 768px) {
        .mobile-menu-overlay {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);