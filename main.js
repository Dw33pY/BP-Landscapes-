// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// Preloader – hide after minimum 1 second
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
});

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
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

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            setTimeout(() => {
                element.classList.add('animate__animated', `animate__${animation}`);
                element.style.opacity = 1;
            }, delay);
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact form
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            location: document.getElementById('location').value,
            message: document.getElementById('message').value
        };
        const whatsappMessage = `Hello BP Landscapes!%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0ALocation: ${formData.location}%0AMessage: ${formData.message}`;
        window.open(`https://wa.me/254708832478?text=${whatsappMessage}`, '_blank');
        contactForm.reset();
        alert('Thank you! We have opened WhatsApp for you.');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animation]').forEach(el => el.style.opacity = '0');
    animateOnScroll();
});

// Swiper for testimonials
const swiper = new Swiper('.testimonialSwiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 5000 }
});

// Credit line (optional)
document.addEventListener('DOMContentLoaded', () => {
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom && !footerBottom.querySelector('a[href*="Dw33pY"]')) {
        const creditLine = document.createElement('p');
        creditLine.innerHTML = 'Made by <a href="https://github.com/Dw33pY" target="_blank" style="color: var(--primary-light); text-decoration: underline;">Dw33pY</a>';
        footerBottom.appendChild(creditLine);
    }
});

// ---------- Services HORIZONTAL Carousel ----------
const carousel = document.getElementById('servicesCarousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 320; // Approx card width + gap
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// ---------- Service Modals ----------
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalClose = document.querySelector('.modal-close');
const modalContact = document.querySelector('.modal-contact');

// Generic service details (customise as needed)
document.querySelectorAll('.service-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceKey = e.currentTarget.getAttribute('data-service');
        const serviceName = e.currentTarget.closest('.service-overlay').querySelector('h3').textContent;
        
        modalTitle.textContent = serviceName;
        modalDescription.textContent = `BP Landscapes offers professional ${serviceName.toLowerCase()} services. Our experienced team delivers high-quality workmanship tailored to your needs. Contact us for a free consultation.`;
        modalFeatures.innerHTML = `
            <li><i class="fas fa-check-circle"></i> Free consultation</li>
            <li><i class="fas fa-check-circle"></i> Experienced professionals</li>
            <li><i class="fas fa-check-circle"></i> Quality materials</li>
            <li><i class="fas fa-check-circle"></i> Satisfaction guaranteed</li>
        `;
        modal.style.display = 'block';
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Modal contact button – pre‑fill service in contact form
modalContact.addEventListener('click', () => {
    const service = modalTitle.textContent;
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        // Most services will map to 'other', but you can expand mapping
        serviceSelect.value = 'other';
    }
    modal.style.display = 'none';
});

// ---------- AI Chatbot ----------
const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatButton.addEventListener('click', () => {
    chatWindow.classList.add('active');
});
chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.textContent = '...';
    chatMessages.appendChild(typingDiv);
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        typingDiv.remove();
        
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'message bot-message';
        botMsgDiv.textContent = data.reply || 'Sorry, I could not process that.';
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        typingDiv.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message bot-message';
        errorDiv.textContent = 'Sorry, I am having trouble connecting. Please try again later.';
        chatMessages.appendChild(errorDiv);
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});