// logica para el efecto del scroll
const activarScrollNavbar = () => {
    const navPrincipal = document.querySelector('.navegacionPrincipal');
    const navCategorias = document.querySelector('.navegacionCategorias');
    const alturaCategorias = navCategorias.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > alturaCategorias) {
            navPrincipal.classList.add('navegacionFija');
        } else {
            navPrincipal.classList.remove('navegacionFija');
        }
    });
};

// logica para los botones

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

// exportación del componente
export const crearBarraNaveagcion = () => {
    // El HTML 
    const plantillaHtml = document.createElement("div") 
    plantillaHtml.innerHTML = `
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

                <a href="/login" class="enlaceNavegacion">INICIAR SESIÓN</a>
                <a href="/carrito" id="enlaceCarrito" class="enlaceNavegacion">CARRITO (0)</a>
            </div>
        </nav>

        <div class="navegacionCategorias">
            <a href="/hombre" class="enlaceCategoria">HOMBRE</a>
            <a href="/mujer" class="enlaceCategoria">MUJER</a>
            <a href="/jeans" class="enlaceCategoria">JEANS</a>
            <a href="/marcas" class="enlaceCategoria">MARCAS</a>
            <a href="/sale" class="enlaceCategoria categoriaSale">SALE</a>
        </div>

        <div id="panelMenuMovil" class="panelLateral">
            <div class="panelLateralEncabezado">
                <h3>Menú</h3>
                <button id="botonCerrarMenu" class="iconoNavegacion">✕</button>
            </div>
            <ul class="panelLateralLista">
                <li><a href="/nuevo">NUEVO</a></li>
                <li><a href="/hombre">HOMBRE</a></li>
                <li><a href="/mujer">MUJER</a></li>
                <li><a href="/descuento">DESCUENTO</a></li>
            </ul>
        </div>
    `;

    // 1. Construye el HTML dentro del contenedor
    document.getElementById("divNavbar").appendChild(plantillaHtml);

    // 2. Activa toda la interactividad de JavaScript
    activarScrollNavbar();
    activarBotonesNavbar();
};