document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
  
    // Alternar clase "active" para mostrar/ocultar el menú
    hamburgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  });
  