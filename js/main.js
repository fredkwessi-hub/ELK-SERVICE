// ============================================
// MENU BURGER POUR MOBILE
// ============================================
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');

        // Changer l'icône
        const icon = burgerMenu.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Gérer les dropdowns sur mobile (clic au lieu de hover)
if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Fermer les autres dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            if (burgerMenu) {
                const icon = burgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-card, .contact-form');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (elementPosition < screenPosition - 100) {
            if (element.classList.contains('service-card')) {
                element.style.animation = 'fadeInUp 0.8s forwards';
            } else if (element.classList.contains('about-card')) {
                element.style.animation = 'fadeInLeft 0.8s forwards';
            } else if (element.classList.contains('contact-form')) {
                element.style.animation = 'fadeInRight 0.8s forwards';
            }
        }
    });
};

// Appliquer les animations au chargement et au scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const sendBtn = document.getElementById('sendBtn');
const feedbackDiv = document.getElementById('formFeedback');

if (sendBtn) {
    sendBtn.addEventListener('click', function(e) {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const service = document.getElementById('serviceSelect')?.value;
        const message = document.getElementById('message')?.value.trim();

        // Animation du bouton
        sendBtn.style.transform = 'scale(0.98)';
        setTimeout(() => {
            if (sendBtn) sendBtn.style.transform = '';
        }, 200);

        // Validation
        if (!name || !email) {
            showFeedback('❌ Merci de renseigner votre nom et email.', '#dc2626');
            shakeElement(feedbackDiv);
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showFeedback('❌ Email invalide (ex: prenom@domaine.com)', '#dc2626');
            return;
        }

        // Succès
        showFeedback(
            `✨ Merci ${name} ! Votre demande concernant "${service}" a été transmise avec succès. Un conseiller ELK SERVICE vous recontactera sous 24h. ✨`,
            '#16a34a'
        );

        // Optionnel: reset du formulaire après succès
        // document.getElementById('name').value = '';
        // document.getElementById('email').value = '';
        // document.getElementById('message').value = '';

        // Log dans la console
        console.log(`Demande de ${name} (${email}) - Service: ${service} - Message: ${message}`);

        // Effacer le feedback après 6 secondes
        setTimeout(() => {
            if (feedbackDiv && feedbackDiv.innerHTML.includes('Merci')) {
                // Optionnel: garder le message
            }
        }, 6000);
    });
}

function showFeedback(message, color) {
    if (feedbackDiv) {
        feedbackDiv.innerHTML = message;
        feedbackDiv.style.color = color;
        feedbackDiv.style.padding = '0.5rem';
    }
}

function shakeElement(element) {
    if (element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            if (element) element.style.animation = '';
        }, 500);
    }
}

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARTICULES DANS LE HERO (effet visuel)
// ============================================
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.backgroundColor = '#ffd966';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '5%';
        particle.style.opacity = '0.6';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = 'float 3s ease-out forwards';
        hero.appendChild(particle);

        setTimeout(() => particle.remove(), 3000);
    }, 1000);
}

// ============================================
// AJOUTER L'ANIMATION SHAKE SI NÉCESSAIRE
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);