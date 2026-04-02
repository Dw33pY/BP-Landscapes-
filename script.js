// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const navOverlay = document.getElementById('navOverlay');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// ===== PRELOADER =====
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.add('hidden');          // triggers CSS opacity fade
    document.body.classList.remove('loading'); // restore scroll
    setTimeout(() => { preloader.remove(); }, 500); // clean up DOM after fade
}

// Hide on load, but guarantee it hides even if load fires late
window.addEventListener('load', () => setTimeout(hidePreloader, 800));
// Safety net: if load never fires (e.g. slow video), hide after 4s
setTimeout(hidePreloader, 4000);

// ===== CURRENT YEAR =====
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ===== NAVBAR SCROLL + ACTIVE LINK =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link tracking
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 120;

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
}, { passive: true });

// ===== MOBILE MENU TOGGLE =====
function openNav() {
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
}

function closeNav() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener('click', () => {
    navLinks.classList.contains('active') ? closeNav() : openNav();
});

// UX FIX: Tap the backdrop to close mobile nav
navOverlay.addEventListener('click', closeNav);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeNav();
    });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animation]');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.15;
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
window.addEventListener('scroll', animateOnScroll, { passive: true });
window.addEventListener('load', animateOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animation]').forEach(el => el.style.opacity = '0');
    animateOnScroll();
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ===== CONTACT FORM – INLINE VALIDATION & SUCCESS MESSAGE =====
if (contactForm) {
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(`${fieldId}-error`);
        if (field) field.classList.add('has-error');
        if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(`${fieldId}-error`);
        if (field) field.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
    }

    // Real-time validation on blur
    ['name', 'phone', 'service', 'location'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => clearFieldError(id));
            el.addEventListener('change', () => clearFieldError(id));
        }
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value;
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        ['name', 'phone', 'service', 'location'].forEach(clearFieldError);

        if (!name) {
            showFieldError('name', 'Please enter your name.');
            valid = false;
        }
        if (!phone) {
            showFieldError('phone', 'Please enter your phone number.');
            valid = false;
        }
        if (!service) {
            showFieldError('service', 'Please select a service.');
            valid = false;
        }
        if (!location) {
            showFieldError('location', 'Please select your location.');
            valid = false;
        }

        if (!valid) return;

        // Disable button while processing
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';

        // Build WhatsApp message
        const waMessage =
            `Hello BP Landscapes! 🌿%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Phone:* ${encodeURIComponent(phone)}%0A` +
            (email ? `*Email:* ${encodeURIComponent(email)}%0A` : '') +
            `*Service:* ${encodeURIComponent(service)}%0A` +
            `*Location:* ${encodeURIComponent(location)}%0A` +
            (message ? `*Message:* ${encodeURIComponent(message)}` : '');

        window.open(`https://wa.me/254708832478?text=${waMessage}`, '_blank');

        // UX FIX: Show inline success message instead of alert()
        if (formSuccess) {
            formSuccess.style.display = 'flex';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.reset();

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send via WhatsApp</span>';
            if (formSuccess) {
                formSuccess.style.display = 'none';
            }
        }, 6000);
    });
}

// ===== SWIPER TESTIMONIALS =====
const swiper = new Swiper('.testimonialSwiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 1,
    spaceBetween: 20,
});

// ===== SERVICES HORIZONTAL CAROUSEL =====
const carousel = document.getElementById('servicesCarousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 324; // card width + gap

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Show/hide carousel arrows based on scroll position
    function updateCarouselBtns() {
        prevBtn.style.opacity = carousel.scrollLeft > 20 ? '1' : '0.5';
        nextBtn.style.opacity =
            carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 20 ? '1' : '0.5';
    }
    carousel.addEventListener('scroll', updateCarouselBtns, { passive: true });
    updateCarouselBtns();
}

// ===== SERVICE MODALS =====
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalClose = document.querySelector('.modal-close');
const modalContact = document.querySelector('.modal-contact');

document.querySelectorAll('.service-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceName = e.currentTarget.closest('.service-overlay').querySelector('h3').textContent;

        modalTitle.textContent = serviceName;
        modalDescription.textContent = `BP Landscapes offers professional ${serviceName.toLowerCase()} services across Kenya. Our experienced team delivers high-quality workmanship tailored to your specific needs and budget. Contact us today for a free consultation.`;
        modalFeatures.innerHTML = `
            <li><i class="fas fa-check-circle"></i> Free site consultation &amp; quote</li>
            <li><i class="fas fa-check-circle"></i> Experienced and certified professionals</li>
            <li><i class="fas fa-check-circle"></i> Premium quality materials</li>
            <li><i class="fas fa-check-circle"></i> 12-month workmanship warranty</li>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll behind modal
        modalTitle.focus();
    });
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') closeModal();
});

// Modal contact button
if (modalContact) {
    modalContact.addEventListener('click', () => {
        closeModal();
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            window.scrollTo({ top: contactSection.offsetTop - 80, behavior: 'smooth' });
        }
        // Pre-fill service if possible
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && modalTitle) {
            const serviceValue = modalTitle.textContent;
            // Try to match option
            for (let option of serviceSelect.options) {
                if (option.text.toLowerCase().includes(serviceValue.toLowerCase().split(' ')[0])) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
        }
    });
}

// ===== AI CHATBOT =====
const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatInput && chatInput.focus();
    });

    chatButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            chatWindow.classList.add('active');
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatButton && chatButton.focus();
    });
}

async function sendMessage() {
    if (!chatInput) return;
    const message = chatInput.value.trim();
    if (!message) return;

    // Append user message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.textContent = '...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

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
    } catch {
        typingDiv.textContent = 'Connection error. Please try WhatsApp or call us directly.';
    }
}

if (chatSend) chatSend.addEventListener('click', sendMessage);
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}
