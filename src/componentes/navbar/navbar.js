import { auth } from '../../firebaseConfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import kodiLogo from '../../../assets/images/kodicode-logo.png';
import iconLogin from '../../../assets/images/icon-login.svg';
import iconLogout from '../../../assets/images/icon-logout.svg';
import iconHome from '../../../assets/images/icon-home.svg';
import iconLessons from '../../../assets/images/icon-lessons.svg';
import iconCourses from '../../../assets/images/icon-courses.svg';
import iconRanking from '../../../assets/images/icon-ranking.svg';
import iconProfile from '../../../assets/images/icon-profile.svg';
import './style.css';

let authListenerAttached = false;
let authResuelta = false; // evita el "parpadeo" de Iniciar sesión mientras Firebase restaura la sesión

// Icono de la barra inferior
const icono = (src) => `<img src="${src}" alt="" width="26" height="26">`;

const DESTINOS = {
    inicio: '#inicio',
    lecciones: 'python.html',
    cursos: 'courses.html',
    ranking: '#leaderboard',
    usuario: '#usuario',
    login: '#login',
    registro: '#registro'
};

function esPaginaApp() {
    const path = window.location.pathname.toLowerCase();
    return path.endsWith('kodicode.html') || path.endsWith('duoprog.html');
}

// Navegación universal (SPA + multipágina)
function navegar(destino) {
    const path = window.location.pathname.toLowerCase();

    if (!authResuelta) return;
    
    if (
        !auth.currentUser &&
        destino !== '#login' &&
        destino !== '#registro'
    ) {
        destino = '#login';
    }

    if (destino.startsWith('#')) {
        if (esPaginaApp()) {
            window.location.hash = destino;
        } else {
            window.location.href = `kodicode.html${destino}`;
        }
    } else if (!path.endsWith(destino.toLowerCase())) {
        window.location.href = destino;
    }
}

async function cerrarSesion() {
    try {
        await signOut(auth);

        if (esPaginaApp()) {
            window.location.hash = '#login';
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Pestaña activa (se resalta en la barra inferior y en los botones de cuenta)


export default function mostrarNavbar() {
    let navbar = document.getElementById('navbar');

    if (!navbar) {
        navbar = document.createElement('div');
        navbar.id = 'navbar';
        document.body.prepend(navbar);
    }

    const usuario = auth.currentUser;

    // Barra superior: solo cuenta (iniciar sesión / registrarse / cerrar sesión)
    let acciones = '';
    if (authResuelta) {
        acciones = usuario
            ? `
                <button class="nav-btn" id="btnCerrarSesion">
                    <img src="${iconLogout}" alt="" width="22" height="22"> Cerrar sesión
                </button>
            `
            : `
                <button class="nav-btn" data-nav="login" id="btnNavLogin">
                    <img src="${iconLogin}" alt="" width="22" height="22"> Iniciar sesión
                </button>
                <button class="nav-btn" data-nav="registro" id="btnRegistro">
                    Registrarse
                </button>
            `;
    }

    // Si no hay sesión, el botón de perfil lleva a iniciar sesión
    const navPerfil = usuario ? 'usuario' : 'login';
    const etiquetaPerfil = usuario || !authResuelta ? 'Perfil' : 'Entrar';

    navbar.innerHTML = `
        <nav class="navbar">
            <div class="navbar-logo" id="navLogo" title="KodiCode">
                <img src="${kodiLogo}" alt="KodiCode" class="navbar-brand-img">
            </div>

            <div class="navbar-actions">
                ${acciones}
            </div>
        </nav>

        <!-- Barra inferior: navegación de la app -->
        <nav class="bottom-nav" id="bottomNav">
            <button data-nav="inicio">
                ${icono(iconHome)}
                <span>Inicio</span>
            </button>

            <button data-nav="lecciones">
                ${icono(iconLessons)}
                <span>Lecciones</span>
            </button>

            <button data-nav="cursos">
                ${icono(iconCourses)}
                <span>Cursos</span>
            </button>

            <button data-nav="ranking">
                ${icono(iconRanking)}
                <span>Ranking</span>
            </button>

            <button data-nav="${navPerfil}">
                ${icono(iconProfile)}
                <span>${etiquetaPerfil}</span>
            </button>
        </nav>
    `;

    // Logo -> inicio
    document.getElementById('navLogo').onclick = () => navegar(DESTINOS.inicio);

    // Todos los botones con data-nav navegan a su destino
    navbar.querySelectorAll('[data-nav]').forEach((btn) => {
        btn.onclick = () => navegar(DESTINOS[btn.dataset.nav]);
    });

    

    // Logo Click
    
    // Usuario / Autenticación
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

if (btnCerrarSesion) {
    btnCerrarSesion.onclick = cerrarSesion;
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

        navbar.querySelectorAll("[data-nav]").forEach((elem) => {
            if (elem.dataset.nav === activo) {
                elem.classList.add("active");
            } else {
                elem.classList.remove("active");
            }
        });
    }

    actualizarActivo();

    // Estos listeners se registran una sola vez (antes se acumulaban en cada re-render)
    if (!authListenerAttached) {
        authListenerAttached = true;
        window.addEventListener('hashchange', actualizarActivo);
        onAuthStateChanged(auth, () => {
            authResuelta = true;
            mostrarNavbar();
        });
    }
}