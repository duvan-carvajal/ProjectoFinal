import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import './style.css';


export default function mostrarLogin() {


    const main = document.querySelector("main");


    main.innerHTML = `

        <div class="login-page">


            <div class="login-card">


                <h2>
                    Iniciar Sesión
                </h2>



                <input
                    type="email"
                    id="correo"
                    placeholder="Correo electrónico"
                />



                <input
                    type="password"
                    id="contrasena"
                    placeholder="Contraseña"
                />



                <button 
                    id="btnLogin"
                    type="button"
                >

                    Ingresar

                </button>



            </div>


        </div>

    `;




    const boton = document.getElementById("btnLogin");



    boton.addEventListener("click", async () => {



        const correo =
            document.getElementById("correo").value;



        const contrasena =
            document.getElementById("contrasena").value;





        console.log("Correo:", correo);



        try {



            const credencial =
                await signInWithEmailAndPassword(
                    auth,
                    correo,
                    contrasena
                );



            console.log(
                "Usuario:",
                credencial.user
            );



            window.location.reload();



        } catch(error) {



            console.error(error);



            console.error(
                "Código:",
                error.code
            );



            console.error(
                "Mensaje:",
                error.message
            );



            alert(
                "Error al iniciar sesión: "
                + error.message
            );


        }



    });


}