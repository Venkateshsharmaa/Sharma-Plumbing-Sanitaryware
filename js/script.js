/**
 * Sharma Plumbing & Sanitaryware
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backToTopBtn = document.getElementById('backToTop');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const contactForm = document.getElementById('contactForm');
    
    let currentSlide = 0;
    
    // Header Scroll Effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
    }
    
    // Close mobile menu when clicking outside
    function closeMobileMenuOnClickOutside(event) {
        if (mobileMenu.classList.contains('active') && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-btn')) {
            mobileMenu.classList.remove('active');
        }
    }
    
    // Product Tabs Functionality
    function handleProductTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const target = btn.dataset.target;
                
                // Show/hide products based on selected tab
                productCards.forEach(card => {
                    if (target === 'all' || card.classList.contains(target)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial Slider Functionality
    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialCards.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Smooth Scrolling for Navigation Links
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Offset for header height
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Contact Form Handling
    function handleContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const message = document.getElementById('message').value;
                
                // Simple validation
                if (!name || !email || !phone || !message) {
                    alert('Please fill out all fields.');
                    return;
                }
                
                // In a real application, you would send this data to a server
                // For this demo, we'll just show a success message
                alert(`Thank you for your message, ${name}! We will get back to you soon.`);
                contactForm.reset();
            });
        }
    }
    
    // Initialize Back to Top Button
    function initBackToTop() {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update Navigation Active Link on Scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - header.offsetHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Auto Slider for Testimonials
    function startAutoSlider() {
        setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Initialize all functions
    function initApp() {
        // Event Listeners
        window.addEventListener('scroll', handleScroll);
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        document.addEventListener('click', closeMobileMenuOnClickOutside);
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Initial setup
        handleScroll();
        handleProductTabs();
        setupSmoothScrolling();
        handleContactForm();
        initBackToTop();
        updateActiveNavLink();
        startAutoSlider();
    }
    
    // Start the application
    initApp();
});
