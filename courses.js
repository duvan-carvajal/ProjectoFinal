import mostrarNavbar from './src/componentes/navbar/navbar.js';

// Inicializar barra de navegación unificada
mostrarNavbar();

const searchInput = document.getElementById("course-search");
const courseCards = document.querySelectorAll(".course-card");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const search = searchInput.value.toLowerCase();

        courseCards.forEach(card => {
            const text = card.textContent.toLowerCase();

            if (text.includes(search)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}
