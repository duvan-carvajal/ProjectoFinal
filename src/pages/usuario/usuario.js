import { signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig.js';
import cloud from '../../../assets/images/cloud.svg';
import './style.css';

const decoraciones = `
    <div class="stars">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
    </div>
`;

// Envuelve el contenido en la tarjeta de usuario
function tarjeta(contenido) {
    return `
        ${decoraciones}
        <div class="inicio">
            <div class="user-card">
                ${contenido}
            </div>
        </div>
    `;
}

// Después de cerrar sesión o borrar la cuenta se vuelve a la pantalla de login
function irALogin() {
    window.location.hash = '#login';
    window.location.reload();
}

export default async function mostrarUsuario() {
    const app = document.getElementById('app');
    const user = auth.currentUser;

    if (!user) {
        app.innerHTML = tarjeta(`
            <h2>No has iniciado sesión</h2>
            <p>Debes iniciar sesión para ver tu información.</p>
        `);
        return;
    }

    const usuarioRef = doc(db, 'usuarios', user.uid);

    try {
        const usuarioSnap = await getDoc(usuarioRef);

        if (!usuarioSnap.exists()) {
            app.innerHTML = tarjeta(`
                <h2>Usuario</h2>
                <p>No se encontraron los datos de tu perfil.</p>
            `);
            return;
        }

        const datos = usuarioSnap.data();

        app.innerHTML = tarjeta(`
            <h2>Mi Usuario</h2>

            <div class="user-info">
                <p><strong>Nombre:</strong> ${datos.nombre}</p>
                <p><strong>Correo:</strong> ${datos.email}</p>
                <p><strong>UID:</strong> ${user.uid}</p>
            </div>

            <div class="user-buttons">
                <button class="primary-btn" id="btnModificar">
                    Modificar datos
                </button>

                <button class="secondary-btn" id="btnCerrarSesionPerfil">
                    Cerrar sesión
                </button>

                <button class="danger-btn" id="btnEliminarCuenta">
                    Eliminar cuenta
                </button>
            </div>
        `);

        // --- Modificar datos ---
        document.getElementById('btnModificar').addEventListener('click', () => {
            app.innerHTML = tarjeta(`
                <h2>Modificar datos</h2>

                <label>Nombre:</label>
                <input class="user-input" type="text" id="nombre" value="${datos.nombre || ''}">

                <div class="user-buttons">
                    <button class="primary-btn" id="btnGuardar">
                        Guardar cambios
                    </button>

                    <button class="secondary-btn" id="btnCancelar">
                        Cancelar
                    </button>
                </div>
            `);

            document.getElementById('btnGuardar').addEventListener('click', async () => {
                const nuevoNombre = document.getElementById('nombre').value;

                try {
                    await updateDoc(usuarioRef, { nombre: nuevoNombre });
                    alert('Datos actualizados correctamente');
                    mostrarUsuario();
                } catch (error) {
                    console.error('Error actualizando datos:', error);
                    alert('Error al actualizar datos: ' + error.message);
                }
            });

            document.getElementById('btnCancelar').addEventListener('click', () => {
                mostrarUsuario();
            });
        });

        // --- Cerrar sesión ---
        document.getElementById('btnCerrarSesionPerfil').addEventListener('click', async () => {
            try {
                await signOut(auth);
                irALogin();
            } catch (error) {
                alert('Error al cerrar sesión: ' + error.message);
            }
        });

        // --- Eliminar cuenta ---
        document.getElementById('btnEliminarCuenta').addEventListener('click', async () => {
            const confirmar = confirm('¿Estás seguro de que quieres eliminar tu cuenta?');
            if (!confirmar) return;

            try {
                const password = prompt('Confirma tu contraseña para eliminar la cuenta:');
                if (!password) return;

                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);

                await deleteDoc(usuarioRef);
                await deleteUser(user);

                alert('Cuenta eliminada correctamente');
                irALogin();
            } catch (error) {
                console.error('Error eliminando cuenta:', error);
                alert('Error al eliminar cuenta: ' + error.message);
            }
        });
    } catch (error) {
        console.error('Error obteniendo datos:', error);

        app.innerHTML = tarjeta(`
            <h2>Error</h2>
            <p>No se pudieron cargar los datos del usuario.</p>
        `);
    }
}