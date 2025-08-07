// js/auth.js

function showRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('Este correo electrónico ya está registrado.');
    } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        showLoginForm();
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`¡Bienvenido, ${user.name}!`);
        window.location.href = '/index.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.reload(); // Recarga la página para restaurar el estado original
}

// Revisa si hay un usuario logueado y actualiza la UI del navbar
export function updateUserStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // 👇 CAMBIO CLAVE: Apunta al contenedor específico del usuario 👇
    const userAuthSection = document.getElementById('user-auth-section');

    if (!userAuthSection) return;

    if (currentUser) {
        // Si hay un usuario, reemplaza el contenido del contenedor con el saludo y logout
        userAuthSection.innerHTML = `
            <div class="user-greeting">Hola, ${currentUser.name}</div>
            <a href="#" id="logout-btn">Cerrar Sesión</a>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    }
    // Si no hay usuario, no hace nada y deja el ícono de login que se cargó con el navbar.
}

// Configura los listeners para abrir/cerrar el panel y manejar los formularios.
export function setupAuthPanel() {
    const authPanel = document.getElementById('auth-panel');
    const openBtn = document.getElementById('user-icon-link');

    if (!authPanel) return;

    // Solo añade el listener para abrir si el botón existe (si el usuario no está logueado)
    if (openBtn) {
        const authOverlay = document.getElementById('auth-overlay');
        const closeBtn = document.getElementById('close-auth-panel-btn');

        const openPanel = () => {
            authPanel.classList.add('is-open');
            authOverlay.classList.add('is-visible');
        };
        const closePanel = () => {
            authPanel.classList.remove('is-open');
            authOverlay.classList.remove('is-visible');
        };

        openBtn.addEventListener('click', (e) => { e.preventDefault(); openPanel(); });
        closeBtn.addEventListener('click', closePanel);
        authOverlay.addEventListener('click', closePanel);
    }

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegister);
        showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showRegisterForm(); });
        showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });
    }
}