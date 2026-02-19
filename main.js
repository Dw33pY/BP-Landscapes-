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

// ---------- Services VERTICAL Carousel ----------
const carousel = document.getElementById('servicesCarousel');
const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');

if (carousel && upBtn && downBtn) {
    const scrollAmount = 400; // Approx card height + gap
    upBtn.addEventListener('click', () => {
        carousel.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    });
    downBtn.addEventListener('click', () => {
        carousel.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    });
}

// ---------- Service Modals ----------
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalClose = document.querySelector('.modal-close');
const modalContact = document.querySelector('.modal-contact');

// Service details data (same as before – includes all services)
const serviceDetails = {
    design: {
        title: 'Landscape Design',
        description: 'We create custom landscape designs that blend aesthetics with functionality. Our detailed plans include plant selection, hardscaping, and outdoor lighting.',
        features: ['Custom garden design', '3D visualization', 'Plant selection', 'Outdoor lighting plans']
    },
    maintenance: {
        title: 'Garden Maintenance',
        description: 'Regular maintenance to keep your garden healthy and beautiful year-round. Our programs include pruning, weeding, mulching, and plant health care.',
        features: ['Lawn mowing & trimming', 'Fertilization & aeration', 'Weed & pest control', 'Seasonal cleanups']
    },
    irrigation: {
        title: 'Irrigation Systems',
        description: 'Efficient irrigation solutions including drip systems and smart controllers to conserve water while keeping your landscape lush.',
        features: ['Drip irrigation installation', 'Sprinkler systems', 'Smart controller setup', 'System maintenance']
    },
    lighting: {
        title: 'Outdoor Lighting',
        description: 'Enhance your outdoor spaces with custom lighting designs. We install energy-efficient LED systems for safety and ambiance.',
        features: ['Pathway lighting', 'Accent lighting', 'Security lighting', 'Smart controls']
    },
    hardscaping: {
        title: 'Hardscaping',
        description: 'Patios, walkways, retaining walls, and more. We use quality materials to create durable and attractive hardscape features.',
        features: ['Natural stone patios', 'Pavers & walkways', 'Retaining walls', 'Outdoor kitchens']
    },
    cleanup: {
        title: 'Seasonal Clean‑ups',
        description: 'Prepare your garden for every season with our thorough clean‑up services, including debris removal, pruning, and mulching.',
        features: ['Leaf removal', 'Pruning & trimming', 'Mulching', 'Bed edging']
    },
    pools: {
        title: 'Swimming Pools',
        description: 'Custom pool design and installation for relaxation and fun. We create stunning pools that complement your landscape.',
        features: ['Custom shapes & sizes', 'Infinity edges', 'Pool automation', 'Eco-friendly options']
    },
    kitchens: {
        title: 'Outdoor Kitchens',
        description: 'Complete outdoor cooking and entertainment areas. From built-in grills to full kitchens with counters and seating.',
        features: ['Built-in grills', 'Countertops', 'Refrigeration', 'Covered structures']
    },
    modpools: {
        title: 'Mod Pools',
        description: 'Modern, modular pool designs that fit any space. Quick installation and sleek aesthetics.',
        features: ['Prefabricated modules', 'Customizable sizes', 'Fast installation', 'Low maintenance']
    },
    backyard: {
        title: 'Backyard Studios',
        description: 'Custom standalone structures for work, play, or relaxation. Perfect for home offices, gyms, or art studios.',
        features: ['Insulated and finished', 'Electricity & lighting', 'HVAC ready', 'Permit assistance']
    },
    cabanas: {
        title: 'Cabanas',
        description: 'Elegant poolside shelters for shade and comfort. Add a touch of luxury to your pool area.',
        features: ['Custom designs', 'Integrated lighting', 'Weather-resistant materials', 'Optional screens']
    },
    courts: {
        title: 'Courts',
        description: 'Basketball, tennis, or multi‑use courts for your property. Professionally graded and surfaced.',
        features: ['Sport‑grade surfacing', 'Fencing & lighting', 'Custom markings', 'Shock‑absorbing options']
    },
    frontyard: {
        title: 'Front Yard',
        description: 'Complete front yard landscaping to boost curb appeal. Design, planting, and hardscaping.',
        features: ['Garden design', 'Walkways & edging', 'Planting & mulch', 'Irrigation integration']
    },
    heateddriveways: {
        title: 'Heated Driveways',
        description: 'Snow‑free driveways with integrated heating systems. No more shoveling!',
        features: ['Electric or hydronic systems', 'Thermostat control', 'Safe & slip‑free', 'Durable installation']
    },
    deck: {
        title: 'Deck Installation',
        description: 'Beautiful, durable decks for outdoor living. Choose from wood, composite, or PVC.',
        features: ['Custom design', 'Built‑in seating', 'Lighting options', 'Railings & stairs']
    },
    concrete: {
        title: 'Decorative Concrete',
        description: 'Stamped, stained, and polished concrete for patios, walkways, and driveways.',
        features: ['Wide pattern selection', 'Color customization', 'Sealed finish', 'Low maintenance']
    },
    fire: {
        title: 'Fire Features',
        description: 'Fire pits, fireplaces, and outdoor heaters for cozy evenings and year‑round enjoyment.',
        features: ['Gas or wood burning', 'Custom stonework', 'Seating integration', 'Safety features']
    },
    water: {
        title: 'Water Features',
        description: 'Fountains, ponds, and waterfalls to soothe the senses and enhance your landscape.',
        features: ['Pondless or pond', 'Recirculating pumps', 'LED lighting', 'Natural stone']
    },
    hottubs: {
        title: 'Hot Tubs',
        description: 'Relaxing hot tub and spa installations. Perfect for unwinding after a long day.',
        features: ['Energy‑efficient models', 'LED lighting', 'Water care systems', 'Custom surrounds']
    },
    gardens: {
        title: 'Gardens',
        description: 'Custom garden design and planting for year‑round beauty. From flower beds to vegetable plots.',
        features: ['Plant selection', 'Soil preparation', 'Mulching & edging', 'Seasonal color']
    },
    urban: {
        title: 'Urban Spaces',
        description: 'Innovative landscaping for small urban lots and rooftops. Maximize your outdoor area.',
        features: ['Vertical gardens', 'Container planting', 'Space‑saving design', 'Rooftop solutions']
    }
};

// Open modal
document.querySelectorAll('.service-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceKey = e.currentTarget.getAttribute('data-service');
        const details = serviceDetails[serviceKey];
        if (details) {
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalFeatures.innerHTML = details.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');
            modal.style.display = 'block';
        }
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
        const map = {
            'Landscape Design': 'design',
            'Garden Maintenance': 'lawn',
            'Irrigation Systems': 'irrigation',
            'Outdoor Lighting': 'other',
            'Hardscaping': 'other',
            'Seasonal Clean‑ups': 'other',
            'Swimming Pools': 'other',
            'Outdoor Kitchens': 'other',
            'Mod Pools': 'other',
            'Backyard Studios': 'other',
            'Cabanas': 'other',
            'Courts': 'other',
            'Front Yard': 'other',
            'Heated Driveways': 'other',
            'Deck Installation': 'other',
            'Decorative Concrete': 'other',
            'Fire Features': 'other',
            'Water Features': 'other',
            'Hot Tubs': 'other',
            'Gardens': 'other',
            'Urban Spaces': 'other'
        };
        const val = map[service] || 'other';
        serviceSelect.value = val;
    }
    modal.style.display = 'none';
});