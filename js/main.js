
import { loadComponent, crearPanel } from './componentes.js';
import { setupNavbarScroll } from './navbar.js';
import { setupCarousel } from './carousel.js';
import { mostrarProductos } from './funcionesFiltrado.js';

// Punto de entrada principal
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica que se ejecuta en TODAS las páginas ---
    loadComponent('/html/navbar.html', 'main-navbar');
    loadComponent('/html/footer.html', 'main-footer');
    setupNavbarScroll();

    // --- Lógica que solo se ejecuta si los elementos existen ---

    // Para la página de inicio (index.html)
    setupCarousel();
    crearPanel(
        ['/imagenes/indexMujer1.webp','/imagenes/indexHombre1.webp'],
        ["/html/paginaProductos.html?categoria=mujer", "/html/paginaProductos.html?categoria=hombre"],
        "hombreMujer"
    );
    crearPanel(
        ["/imagenes/foto4x1_1.webp","/imagenes/foto4x1_2.webp","/imagenes/foto4x1_3.webp","/imagenes/foto4x1_4.webp"],
        ["/html/paginaProductos.html?categoria=jeans", "/html/paginaProductos.html?categoria=camisas", "/html/paginaProductos.html?categoria=camisetas", "/html/paginaProductos.html?categoria=bermudas"],
        "panel4x1",
        ["JEANS PARA MUJER", "CAMISAS PARA HOMBRE", "CAMISETAS PARA MUJER", "BERMUDAS PARA HOMBRE"]
    );
    crearPanel(["/imagenes/imagenNewDrop.webp"],["#"],"newDropLink");

    // Para la página de productos (paginaProductos.html)
    mostrarProductos('contenedorProductos', '/data/muestraProductos.json');
});

