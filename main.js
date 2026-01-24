// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    // Navbar style on scroll
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' :
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero slider functionality
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    // Reset all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrap-around
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Previous slide
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide change
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto slide on hover
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

hero.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animation]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            const animation = element.getAttribute('data-animation');
            const delay = element.getAttribute('data-animation-delay') || 0;
            
            // Apply delay if specified
            setTimeout(() => {
                element.classList.add('animate__animated', `animate__${animation}`);
                element.style.opacity = 1;
            }, delay);
        }
    });
}

// Initial call and on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            location: document.getElementById('location').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the form data to a server
        // For this example, we'll just show a success message
        
        // Create WhatsApp message
        const whatsappMessage = `Hello BP Landscapes!%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0ALocation: ${formData.location}%0AMessage: ${formData.message}`;
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/254708832478?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show confirmation message
        alert('Thank you for your message! We have opened WhatsApp for you to send your inquiry directly to our team.');
    });
}

// Form 
function validateForm() {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial animation state
    document.querySelectorAll('[data-animation]').forEach(el => {
        el.style.opacity = '0';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});
// Add credit line to footer
document.addEventListener('DOMContentLoaded', () => {
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        const creditLine = document.createElement('p');
        creditLine.innerHTML = 'Made by <a href="https://github.com/Dw33pY" target="_blank" style="color: var(--primary-light); text-decoration: underline;">Dw33pY</a>';
        footerBottom.appendChild(creditLine);
    }
});
