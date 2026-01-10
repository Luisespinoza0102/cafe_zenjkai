document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

// LOGICA DEL CARRUSEL
let currentIdx = 0;
const carousel = document.getElementById('carousel');
const sildes = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// FUNCION PARA ACTUALIZAR LA POSICION Y LOS PUNTOS
window.updateCarousel = () => {
    if (!carousel) return;
    carousel.style.transform = `translateX(-${currentIdx * 100}%)`;

    // ACTUALIZAR PUNTOS (DOTS)
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIdx);
    });
};

// FUNCION PARA FLECHAS (SIGUIENTE/ANTERIOR)
window.changeSlide = (direction) => {
    currentIdx = (currentIdx + direction + sildes.length) % sildes.length;
    updateCarousel();
};

//FUNCION PARA SALTAR A UNA IMAGEN ESPECIFICA DESDE LOS PUNTOS
window.currentSlide = (index) => {
    currentIdx = index;
    updateCarousel();
};

setInterval(() => {
    changeSlide(1);
}, 5000);

// EFECTO NAVBAR AL HACER SCROLL
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.activateCard = (element) => {
    document.querySelectorAll('.info-card').forEach(card => {
        card.classList.remove('active');
    });
    element.classList.add('active');
};

//MANEJO DE FORMULARIOS (CONTACTO Y RESERVA)
const forms = ['reservationForm', 'contactForm'];
forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias! Tu mensaje ha sido enviado. Nos contactaremos pronto.');
            form.reset();
        });
    }
});

});

function openFlyer(imageSrc) {
    const modal = document.getElementById('flyerModal');
    const modalImg = document.getElementById('flyerImg');
    
    if(modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquea el scroll
    }
}

function closeModal() {
    const modal = document.getElementById('flyerModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Habilita el scroll
    }
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});
