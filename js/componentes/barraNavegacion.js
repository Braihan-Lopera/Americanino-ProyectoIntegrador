

const activarScrollNavbar = (idBody) => {
    // Apuntamos al contenedor principal del header
    const headerContenedor = document.getElementById('divNavbar'); 
    
    // Altura fija para realizar el cambio de scroll
    const umbralScroll = 10; 

    window.addEventListener("DOMContentLoaded", () => {
        if (window.scrollY < umbralScroll && idBody == "index") {
                headerContenedor.classList.remove('headerFijo'); 
        } else {
            
            headerContenedor.classList.add('headerFijo'); 
        }
    });


    window.addEventListener('scroll', () => {
        if (window.scrollY < umbralScroll && idBody == "index") {
                headerContenedor.classList.remove('headerFijo'); 
        } else {
            
            headerContenedor.classList.add('headerFijo'); 
        }
    });
};

const activarBotonesNavbar = () => {
    const botonAbrir = document.getElementById('botonMenuHamburguesa');
    const botonCerrar = document.getElementById('botonCerrarMenu');
    const panel = document.getElementById('panelMenuMovil');

    if (botonAbrir && botonCerrar && panel) {
        botonAbrir.addEventListener('click', () => {
            panel.classList.add('estaAbierto');
        });
        botonCerrar.addEventListener('click', () => {
            panel.classList.remove('estaAbierto');
        });
    }
};

export const crearBarraNavegacion = (contenedor, idBody) => {
    const plantillaHtml = `
        <nav class="navegacionPrincipal">
            <div class="seccionIzquierda">
                <button id="botonMenuHamburguesa" class="iconoNavegacion">☰</button>
                <button id="botonBusqueda" class="iconoNavegacion">🔍</button>
            </div>
            <div class="seccionCentro">
                <a href="/" id="logoPrincipal">
                    <img src="../imagenes/logoAmericanino.png" alt="Logo Americanino">
                </a>
            </div>


            <div class="seccionDerecha">


                <a href="/login"  id="btnRegistro" class="enlaceNavegacion" aria-label="Iniciar Sesión">
                    <svg class="iconoNavbarSvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </a>

                <a id="btnCarrito" class="enlaceNavegacion" aria-label="Carrito de compras">
                    <svg class="iconoNavbarSvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </a>
            </div>
        </nav>
        <div class="navegacionCategorias">
            <a href="html/paginaProductos.html?categoria=hombre" class="enlaceCategoria">HOMBRE</a>
            <a href="html/paginaProductos.html?categoria=mujer" class="enlaceCategoria">MUJER</a>
            <a href="html/paginaProductos.html?categoria=marcas" class="enlaceCategoria">MARCAS</a>
            <a href="html/paginaProductos.html?categoria=sale" class="enlaceCategoria categoriaSale">SALE</a>
        </div>
        <div id="panelMenuMovil" class="panelLateral">
            <div class="panelLateralEncabezado">
                <h3>Menú</h3>
                <button id="botonCerrarMenu" class="iconoNavegacion">✕</button>
            </div>
            <ul class="panelLateralLista">
                <li><a href="html/paginaProductos.html?categoria=nuevo">NUEVO</a></li>
                <li><a href="html/paginaProductos.html?categoria=hombre">HOMBRE</a></li>
                <li><a href="html/paginaProductos.html?categoria=mujer">MUJER</a></li>
                <li><a href="html/paginaProductos.html?categoria=descuento">DESCUENTO</a></li>
            </ul>
        </div>
    `;

    contenedor.innerHTML = plantillaHtml;
    activarScrollNavbar(idBody);
    activarBotonesNavbar();
};