import { auth, db } from '../../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import cloud from '../../../assets/images/cloud.svg';
import pythonLogo from '../../../assets/images/python-logo.png';
import kodiMascot from '../../../assets/images/kodicode-mascot.png';
import iconWave from '../../../assets/images/icon-wave.svg';
import iconStar from '../../../assets/images/icon-star.svg';
import { nombreSeguro, escaparHTML } from '../../utils/filtroPalabras.js';
import './style.css';

export default async function mostrarInicio() {
    const app = document.getElementById('app');

    if (!app) {
        console.error('❌ No se encontró #app');
        return;
    }

    const usuario = auth.currentUser;

    if (!usuario) {
        window.location.hash = '#login';
        return;
    }

    try {
        const usuarioSnap = await getDoc(doc(db, 'usuarios', usuario.uid));

        let nombre = usuario.email;

        if (usuarioSnap.exists()) {
            const datos = usuarioSnap.data();
            if (datos.nombre) {
                nombre = datos.nombre;
            }
        }

        // Si el nombre trae palabras no permitidas se muestra uno neutro; y se escapa porque viene de un usuario
        const nombreVisible = escaparHTML(nombreSeguro(nombre, 'Programador'));

        const progresoSnap = await getDoc(doc(db, 'progreso', usuario.uid));

        let xp = 0;

        if (progresoSnap.exists()) {
            xp = progresoSnap.data().xp || 0;
        }

        app.innerHTML = `
            <div class="stars">
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
            </div>

            <div class="inicio">
                <section class="welcome-card">
                    <h1>
                        ¡Hola, ${nombreVisible}!
                        <img src="${iconWave}" alt="" width="30" height="30" style="vertical-align:-7px">
                    </h1>

                    <p>Continúa aprendiendo donde lo dejaste.</p>

                    <div class="xp-mini">
                        <img src="${iconStar}" alt="" width="17" height="17" style="vertical-align:-3px">
                        ${xp} XP
                    </div>
                </section>

                <section class="mis-cursos">
                    <h2>Mis cursos</h2>

                    <div class="curso-card">
                        <div class="curso-icon">
                            <img src="${pythonLogo}" alt="Python" class="curso-icon-img">
                        </div>

                        <div class="curso-info">
                            <h3>Python Fundamentals</h3>

                            <p>Aprende los fundamentos de Python.</p>

                            <button id="btnPython" class="curso-btn">
                                CONTINUAR
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `;

        document.getElementById('btnPython').addEventListener('click', () => {
            window.location.href = 'python.html';
        });
    } catch (error) {
        console.error('❌ Error cargando inicio:', error);

        app.innerHTML = `
            <div class="inicio">
                <section class="welcome-card">
                    <h1>
                        ¡Hola!
                        <img src="${iconWave}" alt="" width="30" height="30" style="vertical-align:-7px">
                    </h1>

                    <p>No pudimos cargar tu progreso.</p>
                </section>
            </div>
        `;
    }
}