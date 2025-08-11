// proceso de autenticación

const activarPanelAutenticacion = () => {
    // Selectores de elementos
    const botonAbrirAuth = document.getElementById('btnRegistro');
    const botonCerrarAuth = document.getElementById('botonCerrarAuth');
    const panelAuth = document.getElementById('panelAutenticacion');
    const tituloPanel = document.getElementById('tituloPanel');
    
    const formLogin = document.getElementById('formularioLogin');
    const formRegistro = document.getElementById('formularioRegistro');

    const enlaceRegistro = document.getElementById('enlaceRegistro');
    const enlaceLogin = document.getElementById('enlaceLogin');

// Panel del login
    const mostrarLogin = () => {
        tituloPanel.textContent = 'Iniciar Sesión';
        formLogin.style.display = 'flex';
        formRegistro.style.display = 'none';
    };

// panel del registro
    const mostrarRegistro = () => {
        tituloPanel.textContent = 'Crear Cuenta';
        formLogin.style.display = 'none';
        formRegistro.style.display = 'flex';
    };

// logica para abrir y cerrar la ventana de registro
    botonAbrirAuth.addEventListener('click', (e) => {
        e.preventDefault();
        panelAuth.classList.add('estaAbierto');
        mostrarLogin();
    });

    botonCerrarAuth.addEventListener('click', () => panelAuth.classList.remove('estaAbierto'));


    enlaceRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarRegistro();
    });

    enlaceLogin.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarLogin();
    });

    // Uso del LS
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Obtención de users existentes o creación de array vacía
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Validación si existe correo ya en BD
        const usuarioExistente = usuarios.find(usuario => usuario.email === email);
        if (usuarioExistente) {
            return alert('El correo electrónico ya está registrado.');
        }

        // Guardado del nombre del usuario
        usuarios.push({ nombre, email, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        mostrarLogin();
    });

    // Uso del LS
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Validación para confirmar si es user existente
        const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.password === password);

        if (!usuarioValido) {
            return alert('Correo o contraseña incorrectos.');
        }

        // Guardado del usuario en el LS
        sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));

        alert(`¡Bienvenido, ${usuarioValido.nombre}!`);
        window.location.reload(); // recargado de página
    });
};

// Sección UI tras logueo de usuario
const actualizarUIUsuario = () => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    const seccionDerecha = document.querySelector('.seccionDerecha');

    if (usuarioLogueado && seccionDerecha) {

        seccionDerecha.innerHTML = `

            <span class="saludoUsuario">Hola, ${usuarioLogueado.nombre}</span>
            <a href="#" id="enlaceLogout" class="enlaceNavegacion"> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg> </a>
            
            <a href="/carrito" id="btnCarrito" class="enlaceNavegacion" aria-label="Carrito de compras">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
            </a>
        `;

        
        document.getElementById('enlaceLogout').addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('usuarioLogueado');
            alert('Has cerrado sesión.');
            window.location.reload();
        });
    }
};

const activarScrollNavbar = () => {
    const headerContenedor = document.getElementById('divNavbar'); 
    
    // Altura fija para realizar el cambio de scroll
    const umbralScroll = 10; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > umbralScroll) {
            
            headerContenedor.classList.add('headerFijo'); 
        } else {
            
            headerContenedor.classList.remove('headerFijo'); 
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

export const crearBarraNavegacion = (contenedor) => {
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

                <a href="/carrito" id="btnCarrito" class="enlaceNavegacion" aria-label="Carrito de compras">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
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

        <div id="panelAutenticacion" class="panelLateral">
            <div class="panelLateralEncabezado">
                <h3 id="tituloPanel">Iniciar Sesión</h3>
                <button id="botonCerrarAuth" class="iconoNavegacion">✕</button>
            </div>

            <form id="formularioLogin" class="formularioAuth">
                <input type="email" name="email" placeholder="Correo electrónico" required>
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit">Ingresar</button>
                <p>¿No tienes cuenta? <a href="#" id="enlaceRegistro">Regístrate</a></p>
            </form>

            <form id="formularioRegistro" class="formularioAuth" style="display: none;">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="email" name="email" placeholder="Correo electrónico" required>
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit">Crear Cuenta</button>
                <p>¿Ya tienes cuenta? <a href="#" id="enlaceLogin">Inicia sesión</a></p>
            </form>
        </div>
    `;

    contenedor.innerHTML = plantillaHtml;
    activarScrollNavbar();
    activarBotonesNavbar();
    activarPanelAutenticacion();
    actualizarUIUsuario();
};