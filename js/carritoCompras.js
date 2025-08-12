export function mostrarCarrito() {
    const btnCarrito = document.getElementById('btnCarrito');

    btnCarrito.addEventListener('click', () => {
        let divCarrito = document.querySelector('.divCarrito');

        // Si no existe, lo creamos con el diseño final
        if (!divCarrito) {
            divCarrito = document.createElement('div');
            divCarrito.className = 'divCarrito';
            divCarrito.id = 'cartDrawer';

            divCarrito.innerHTML = `
                <button class="btn-cerrar" id="cerrarCarrito">×</button>
                <h2>Tu carrito de compras</h2>
                <div class="icono-carrito">🛒</div>
                <p>Tu carrito está vacía</p>
                <a href="#">Ver todo</a>
            `;

            document.body.appendChild(divCarrito);

            // Evento para cerrar
            document.getElementById('cerrarCarrito').addEventListener('click', () => {
                divCarrito.classList.remove('mostrar');
            });
        }

        // Mostrar carrito (deslizar desde la derecha)
        divCarrito.classList.add('mostrar');
    });
}
