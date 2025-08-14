export function mostrarCarrito() {
    const btnCarrito = document.getElementById('btnCarrito');

    // Crear contador
    let contador = document.createElement("span");
    contador.id = "contadorCarrito";
    contador.classList.add("contadorCarrito");
    btnCarrito.appendChild(contador);
    actualizarContadorCarrito();

    btnCarrito.addEventListener('click', async () => {
        let divCarrito = document.querySelector('.divCarrito');

        if (!divCarrito) {
            divCarrito = document.createElement('div');
            divCarrito.className = 'divCarrito';
            divCarrito.id = 'cartDrawer';
            document.body.appendChild(divCarrito);
        }

        divCarrito.classList.add('mostrar');
        await mostrarProductosEnCarrito(divCarrito);
    });

    // Actualizar si agregan producto
    window.addEventListener("productoAgregado", () => {
        const carritoAbierto = document.querySelector('.divCarrito.mostrar');
        actualizarContadorCarrito();
        if (carritoAbierto) {
            mostrarProductosEnCarrito(carritoAbierto);
        }
    });
}

async function mostrarProductosEnCarrito(divCarrito) {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Vista carrito vacío
    if (productosGuardados.length === 0) {
        divCarrito.innerHTML = `
            <button class="btn-cerrar" id="cerrarCarrito">×</button>
            <h2>Tu carrito de compras</h2>
            <svg class="iconoCarritoComprasSvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Tu carrito está vacía</p>
            <a href="#seccion-destacada">Ver todo</a>
        `;
        document.getElementById('cerrarCarrito').addEventListener('click', () => {
            divCarrito.classList.remove('mostrar');
        });
        return;
    }

    try {
        const respuesta = await fetch('../data/muestraProductos.json');
        const data = await respuesta.json();

        let total = 0;

        // Vista carrito lleno
        divCarrito.innerHTML = `
            <button class="btn-cerrar" id="cerrarCarrito">×</button>
            <h2>Tu carrito de compras</h2>
            <div id="listaCarrito" class="listaCarrito"></div>
            <div class="totalCarrito">
                <h3>Total: <span id="totalCarritoPrecio">$0</span></h3>
            </div>
        `;

        const listaCarrito = document.getElementById('listaCarrito');
        const totalCarritoPrecio = document.getElementById('totalCarritoPrecio');

        productosGuardados.forEach(({ id, talla, cantidad }, index) => {
            const producto = data.find(item => item.id == id);
            if (producto) {
                // Convertir precio con separador de miles a número
                let precio = Number(producto.precio.replace(/\./g, "")) || 0;
                let precioFinal = precio;
                if (producto.descuento && producto.descuento > 0) {
                    precioFinal = precio - (precio * (producto.descuento / 100));
                }

                total += precioFinal * cantidad;

                const imagen = "../imagenes/fotosProductos/" + producto.elementos[0].fotosProducto[0];

                // Opciones de cantidad
                let opcionesCantidad = "";
                for (let i = 1; i <= 20; i++) {
                    opcionesCantidad += `<option value="${i}" ${i === cantidad ? "selected" : ""}>${i}</option>`;
                }

                const itemCarrito = document.createElement('div');
                itemCarrito.className = 'itemCarrito';
                itemCarrito.innerHTML = `
                    <img src="${imagen}" alt="${producto.nombre}" class="imagenCarrito">
                    <div class="infoCarrito">
                        <h3 class="nombreCarrito">${producto.nombre}</h3>
                        <p class="tallaCarrito">Talla: ${talla || 'No seleccionada'}</p>
                        <label>Cantidad: 
                            <select class="selectCantidad" data-index="${index}">
                                ${opcionesCantidad}
                            </select>
                        </label>
                        ${producto.descuento > 0
                        ? `<p class="precioOriginal">Precio: $${precio.toLocaleString("es-CO")}</p>
                               <p class="descuentoCarrito">Descuento: ${producto.descuento}%</p>
                               <p class="precioFinal"><strong>Subtotal: $${(precioFinal * cantidad).toLocaleString("es-CO")}</strong></p>`
                        : `<p class="precioFinal"><strong>Subtotal: $${(precio * cantidad).toLocaleString("es-CO")}</strong></p>`}
                    </div>
                    <button class="btnEliminar" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </button>
                `;
                listaCarrito.appendChild(itemCarrito);
            }
        });

        totalCarritoPrecio.textContent = `$${total.toLocaleString("es-CO")}`;

        // Eventos eliminar producto
        document.querySelectorAll(".btnEliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                eliminarProducto(index);
            });
        });

        // Eventos cambiar cantidad
        document.querySelectorAll(".selectCantidad").forEach(select => {
            select.addEventListener("change", (e) => {
                let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
                let idx = e.target.getAttribute("data-index");
                productosGuardados[idx].cantidad = Number(e.target.value);
                localStorage.setItem('productos', JSON.stringify(productosGuardados));
                mostrarProductosEnCarrito(document.querySelector('.divCarrito')); // refrescar
            });
        });

        document.getElementById('cerrarCarrito').addEventListener('click', () => {
            divCarrito.classList.remove('mostrar');
        });

    } catch (error) {
        console.error('Error al cargar productos en carrito:', error);
    }
}

function eliminarProducto(index) {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    actualizarContadorCarrito();
    mostrarProductosEnCarrito(document.querySelector('.divCarrito'));
}

function actualizarContadorCarrito() {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const contador = document.getElementById("contadorCarrito");
    if (productosGuardados.length > 0) {
        const totalUnidades = productosGuardados.reduce((acum, prod) => acum + prod.cantidad, 0);
        contador.textContent = totalUnidades;
        contador.style.display = "flex";
    } else {
        contador.style.display = "none";
    }
}
