import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebaseConfig.js';

import mostrarNavbar from './componentes/navbar/navbar.js';

import mostrarInicio from './pages/inicio/inicio.js';
import mostrarLogin from './pages/login/login.js';
import mostrarRegistro from './pages/registro/registro.js';
import mostrarUsuario from './pages/usuario/usuario.js';


async function mostrarPagina(usuario) {

    mostrarNavbar();


    // Pages that don't require login
    if (!usuario) {

        switch (window.location.hash) {

            case '#login':
                mostrarLogin();
                return;

            case '#registro':
                mostrarRegistro();
                return;

            default:
                window.location.hash = "#login";
                return;
        }
    }


    // User IS logged in

    switch (window.location.hash) {

        case '#usuario':
            await mostrarUsuario();
            break;

        case '#inicio':
        default:
            await mostrarInicio();
            break;
    }
}


onAuthStateChanged(auth, async (usuario) => {

    console.log(
        usuario
            ? `Usuario conectado: ${usuario.uid}`
            : "No hay usuario conectado"
    );

    await mostrarPagina(usuario);

});


window.addEventListener("hashchange", async () => {

    await mostrarPagina(auth.currentUser);

});