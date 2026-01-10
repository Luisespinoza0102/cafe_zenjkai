// --- FUNCIONES GLOBALES (Deben estar fuera para que el onclick del HTML las vea) ---

// Modal de Información (Flyer)
window.openFlyer = function(imageSrc) {
    const modal = document.getElementById('flyerModal');
    const modalImg = document.getElementById('flyerImg');
    if(modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};


// Función forzada de apertura
window.openEnroll = function(course) {
    const modal = document.getElementById('enrollModal');
    const courseText = document.getElementById('courseName');
    
    if (modal) {
        modal.style.display = 'flex'; // Fuerza el display antes de la clase
        if (courseText) {
            courseText.textContent = course;
        }
        // Un pequeño delay para que la transición de CSS se note
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        alert("Error: No se encontró el elemento enrollModal");
    }
};

window.closeEnrollModal = function() {
    const modal = document.getElementById('enrollModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
};

// --- INICIO DEL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- LÓGICA DEL CARRUSEL ---
    let currentIdx = 0;
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.slide'); // Corregido: slides
    const dots = document.querySelectorAll('.dot');

    if (carousel && slides.length > 0) {
        window.updateCarousel = () => {
            carousel.style.transform = `translateX(-${currentIdx * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIdx);
            });
        };

        window.changeSlide = (direction) => {
            currentIdx = (currentIdx + direction + slides.length) % slides.length;
            updateCarousel();
        };

        window.currentSlide = (index) => {
            currentIdx = index;
            updateCarousel();
        };

        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    // --- MENÚ HAMBURGUESA ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- NAVBAR SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- FORMULARIOS ---
    const forms = ['reservationForm', 'contactForm', 'quickEnrollForm'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('¡Gracias! Tu mensaje ha sido enviado.');
                form.reset();
                if(formId === 'quickEnrollForm') closeEnrollModal();
            });
        }
    });
});

// Cerrar con Escape (Global)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
        closeEnrollModal();
    }
});