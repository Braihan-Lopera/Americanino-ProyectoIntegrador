// js/main.js

import { loadComponent, crearPanel } from './componentes.js';
import { setupNavbarScroll } from './navbar.js';
import { setupCarousel } from './carousel.js';
import { mostrarProductos } from './funcionesFiltrado.js';
import { setupAuthPanel, updateUserStatus } from './auth.js';

// 1. Añadimos "async" para poder usar "await" dentro.
document.addEventListener('DOMContentLoaded', async () => {
    
    // 2. Usamos Promise.all y "await" para esperar a que TODOS los componentes se carguen.
    await Promise.all([
        loadComponent('/html/navbar.html', 'main-navbar'),
        loadComponent('/html/footer.html', 'main-footer'),
        loadComponent('/html/panelRegistro.html', 'body')
    ]);

    // 3. AHORA que el HTML existe, ejecutamos las funciones que dependen de él.
    setupNavbarScroll();
    setupAuthPanel();
    updateUserStatus();

    // --- Lógica que no depende de los componentes cargados ---
    setupCarousel();
    crearPanel(
        ['/imagenes/hombre.webp','/imagenes/mujer.webp'],
        [`/html/paginaProductos.html?categoria=hombre`, `/html/paginaProductos.html?categoria=mujer`],
        "hombreMujer"
    );
    crearPanel(
        ["/imagenes/foto4x1_1.webp", "/imagenes/foto4x1_2.webp", "/imagenes/foto4x1_3.webp", "/imagenes/foto4x1_4.webp"],
        [`/html/paginaProductos.html?categoria=jeans`, `/html/paginaProductos.html?categoria=camisas`, `/html/paginaProductos.html?categoria=camisetas`, `/html/paginaProductos.html?categoria=bermudas`],
        "panel4x1",
        ["JEANS PARA MUJER", "CAMISAS PARA HOMBRE", "CAMISAS PARA MUJER", "BERMUDAS PARA HOMBRE"]
    );
    crearPanel(["/imagenes/imagenNewDrop.webp"], ["#"], "newDropLink");
    mostrarProductos('contenedorProductos', '/data/muestraProductos.json');
});