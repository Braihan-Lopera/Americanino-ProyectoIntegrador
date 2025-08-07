
/**
 * Añade o quita la clase '.scrolled' del navbar según la posición del scroll.
 */
export function setupNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const triggerHeight = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > triggerHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}