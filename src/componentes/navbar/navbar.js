import { auth } from '../../firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import kodiLogo from '../../../assets/images/kodicode-logo.png';
import './style.css';

let authListenerAttached = false;

export default function mostrarNavbar() {
    let navbar = document.getElementById("navbar");

    if (!navbar) {
        navbar = document.createElement("div");
        navbar.id = "navbar";
        document.body.prepend(navbar);
    }

    const usuario = auth.currentUser;
    const nombreUsuario = usuario
        ? (usuario.displayName || (usuario.email ? usuario.email.split('@')[0] : 'Perfil'))
        : '';

    navbar.innerHTML = `
        <nav class="navbar">
            <div class="navbar-logo" id="navLogo" title="KodiCode">
                <img src="${kodiLogo}" alt="KodiCode" class="navbar-brand-img">
            </div>

            <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="navbar-links" id="navbarLinks">
                <button class="nav-btn" data-nav="inicio" id="btnInicio">
                    <span>🏠</span> Inicio
                </button>

                <button class="nav-btn" data-nav="lecciones" id="btnLecciones">
                    <span>📚</span> Lecciones
                </button>

                <button class="nav-btn" data-nav="cursos" id="btnCursos">
                    <span>🔍</span> Cursos
                </button>

                <button class="nav-btn" data-nav="ranking" id="btnLeaderboard">
                    <span>🏆</span> Ranking
                </button>

                ${
                    usuario
                        ? `
                    <button class="profile-btn" data-nav="usuario" id="btnUsuario">
                        <span>👤</span> ${nombreUsuario}
                    </button>

                    <button id="btnCerrarSesion">
                        <span>🚪</span> Cerrar sesión
                    </button>
                    `
                        : `
                    <button class="nav-btn" data-nav="login" id="btnNavLogin">
                        Iniciar sesión
                    </button>

                    <button class="nav-btn" data-nav="registro" id="btnRegistro">
                        Registrarse
                    </button>
                    `
                }
            </div>
        </nav>

        <!-- BARRA DE NAVEGACIÓN MÓVIL (COMPONENTE INTEGRADO) -->
        <nav class="bottom-nav" id="bottomNav">
            <button data-nav="inicio" id="bottomBtnInicio">
                <span>🏠</span>
                <span>Inicio</span>
            </button>

            <button data-nav="lecciones" id="bottomBtnLecciones">
                <span>📚</span>
                <span>Lecciones</span>
            </button>

            <button data-nav="cursos" id="bottomBtnCursos">
                <span>🔍</span>
                <span>Cursos</span>
            </button>

            <button data-nav="ranking" id="bottomBtnLeaderboard">
                <span>🏆</span>
                <span>Ranking</span>
            </button>

            <button data-nav="usuario" id="bottomBtnUsuario">
                <span>👤</span>
                <span>${usuario ? 'Perfil' : 'Entrar'}</span>
            </button>
        </nav>
    `;

    // --------------------------------------------------------
    // NAVEGACIÓN UNIVERSAL (SPA + MULTIPÁGINA)
    // --------------------------------------------------------
    function navegar(destino) {
        const path = window.location.pathname.toLowerCase();
        const isApp = path.endsWith("kodicode.html") || path.endsWith("duoprog.html");

        // Cerrar menú móvil al navegar
        const navbarLinks = document.getElementById("navbarLinks");
        const menuToggle = document.getElementById("menuToggle");
        if (navbarLinks) navbarLinks.classList.remove("show");
        if (menuToggle) menuToggle.classList.remove("open");

        if (destino.startsWith("#")) {
            if (isApp) {
                window.location.hash = destino;
            } else {
                window.location.href = `kodicode.html${destino}`;
            }
        } else {
            if (!path.endsWith(destino.toLowerCase())) {
                window.location.href = destino;
            }
        }
    }

    // Logo Click
    const navLogo = document.getElementById("navLogo");
    if (navLogo) {
        navLogo.onclick = () => navegar("#inicio");
    }

    // Enlaces Top Navbar
    const btnInicio = document.getElementById("btnInicio");
    if (btnInicio) btnInicio.onclick = () => navegar("#inicio");

    const btnLecciones = document.getElementById("btnLecciones");
    if (btnLecciones) btnLecciones.onclick = () => navegar("/python.html");

    const btnCursos = document.getElementById("btnCursos");
    if (btnCursos) btnCursos.onclick = () => navegar("courses.html");

    const btnLeaderboard = document.getElementById("btnLeaderboard");
    if (btnLeaderboard) btnLeaderboard.onclick = () => navegar("#leaderboard");

    // Enlaces Bottom Nav (Móvil)
    const bottomBtnInicio = document.getElementById("bottomBtnInicio");
    if (bottomBtnInicio) bottomBtnInicio.onclick = () => navegar("#inicio");

    const bottomBtnLecciones = document.getElementById("bottomBtnLecciones");
    if (bottomBtnLecciones) bottomBtnLecciones.onclick = () => navegar("/python.html");

    const bottomBtnCursos = document.getElementById("bottomBtnCursos");
    if (bottomBtnCursos) bottomBtnCursos.onclick = () => navegar("courses.html");

    const bottomBtnLeaderboard = document.getElementById("bottomBtnLeaderboard");
    if (bottomBtnLeaderboard) bottomBtnLeaderboard.onclick = () => navegar("#leaderboard");

    const bottomBtnUsuario = document.getElementById("bottomBtnUsuario");
    if (bottomBtnUsuario) {
        bottomBtnUsuario.onclick = () => navegar(usuario ? "#usuario" : "#login");
    }

    // Usuario / Autenticación
    if (usuario) {
        const btnUsuario = document.getElementById("btnUsuario");
        if (btnUsuario) btnUsuario.onclick = () => navegar("#usuario");

        const btnCerrarSesion = document.getElementById("btnCerrarSesion");
        if (btnCerrarSesion) {
            btnCerrarSesion.onclick = async () => {
                await auth.signOut();
                const path = window.location.pathname.toLowerCase();
                if (path.endsWith("kodicode.html") || path.endsWith("duoprog.html")) {
                    window.location.hash = "#login";
                }
                window.location.reload();
            };
        }
    } else {
        const btnNavLogin = document.getElementById("btnNavLogin");
        if (btnNavLogin) btnNavLogin.onclick = () => navegar("#login");

        const btnRegistro = document.getElementById("btnRegistro");
        if (btnRegistro) btnRegistro.onclick = () => navegar("#registro");
    }

    // Menú Hamburguesa Móvil
    const menuToggle = document.getElementById("menuToggle");
    const navbarLinks = document.getElementById("navbarLinks");
    if (menuToggle && navbarLinks) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            navbarLinks.classList.toggle("show");
            menuToggle.classList.toggle("open");
        };

        // Cerrar al hacer clic afuera
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target)) {
                navbarLinks.classList.remove("show");
                menuToggle.classList.remove("open");
            }
        });
    }

    // --------------------------------------------------------
    // PESTAÑA ACTIVA
    // --------------------------------------------------------
    function actualizarActivo() {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();

        let activo = "inicio";

        if (path.endsWith("courses.html")) {
            activo = "cursos";
        } else if (path.endsWith("python.html")) {
            activo = "lecciones";
        } else {
            // En app (kodicode.html o duoprog.html)
            if (hash === "#leaderboard") activo = "ranking";
            else if (hash === "#usuario") activo = "usuario";
            else if (hash === "#login") activo = "login";
            else if (hash === "#registro") activo = "registro";
            else activo = "inicio";
        }

        document.querySelectorAll("[data-nav]").forEach((elem) => {
            if (elem.dataset.nav === activo) {
                elem.classList.add("active");
            } else {
                elem.classList.remove("active");
            }
        });
    }

    actualizarActivo();

    window.addEventListener("hashchange", actualizarActivo);

    // Escuchador de autenticación para recargar la barra reactivamente
    if (!authListenerAttached) {
        authListenerAttached = true;
        onAuthStateChanged(auth, () => {
            mostrarNavbar();
        });
    }
}
