let currentIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

// Función para cambiar automáticamente el slide
function changeSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
}

// Cambiar de slide manualmente
function changeSlideManually(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSlidePosition();
}

// Actualizar posición del slider
function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Cambia de slide
setInterval(changeSlide, 5000);
