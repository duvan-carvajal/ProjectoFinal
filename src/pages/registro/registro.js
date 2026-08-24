import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig.js';
import './style.css';


export default function mostrarRegistro() {


    const main = document.querySelector("main");


    if (!main) {

        console.error("No se encontró <main>");

        return;

    }



    main.innerHTML = `

        <div class="registro-container">


            <section class="registro">


                <h1>
                    Crear cuenta
                </h1>




                <form id="registroForm">


                    <label for="nombre">
                        Nombre
                    </label>


                    <input
                        type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        required
                    >




                    <label for="email">
                        Correo
                    </label>


                    <input
                        type="email"
                        id="email"
                        placeholder="correo@ejemplo.com"
                        required
                    >




                    <label for="password">
                        Contraseña
                    </label>


                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        required
                    >




                    <button type="submit">
                        Registrarse
                    </button>


                </form>




                <p id="mensajeRegistro"></p>



            </section>


        </div>

    `;



    const form = document.querySelector("#registroForm");

    const mensaje = document.querySelector("#mensajeRegistro");




    form.addEventListener("submit", async (e) => {


        e.preventDefault();



        const nombre =
            document.querySelector("#nombre")
            .value
            .trim();



        const email =
            document.querySelector("#email")
            .value
            .trim();



        const password =
            document.querySelector("#password")
            .value;



        mensaje.textContent =
            "Creando cuenta...";



        try {



            const credencial =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );



            const usuario =
                credencial.user;




            await setDoc(
                doc(db, "usuarios", usuario.uid),
                {

                    nombre: nombre,

                    email: email,

                    uid: usuario.uid,

                    fechaRegistro: new Date()

                }
            );





            await setDoc(
                doc(db, "progreso", usuario.uid),
                {

                    xp: 0,

                    cursos: {

                        python: {

                            completedLessons: []

                        }

                    }

                }
            );





            console.log(
                "Usuario registrado:",
                usuario.uid
            );



            mensaje.textContent =
                "¡Cuenta creada correctamente!";



            form.reset();




        } catch(error) {


            console.error(
                "Error al registrar:",
                error
            );



            mensaje.textContent =
                obtenerMensajeError(error);



        }


    });






    function obtenerMensajeError(error) {


        switch(error.code) {


            case "auth/email-already-in-use":

                return "Ese correo ya está registrado.";



            case "auth/invalid-email":

                return "El correo no es válido.";



            case "auth/weak-password":

                return "La contraseña es demasiado débil.";



            case "auth/missing-password":

                return "Debes escribir una contraseña.";



            default:

                return "No se pudo crear la cuenta.";

        }


    }


}