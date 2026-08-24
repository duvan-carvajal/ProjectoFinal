import { auth, db } from '../../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import cloud from '../../../assets/images/cloud.svg';
import './style.css';


export default async function mostrarInicio() {


    const app = document.getElementById("app");


    if (!app) {

        console.error("❌ No se encontró #app");

        return;

    }


    const usuario = auth.currentUser;



    if (!usuario) {

        window.location.hash = "#login";

        return;

    }


    app.innerHTML = `

        <img src="${cloud}" class="cloud cloud-1">

        <img src="${cloud}" class="cloud cloud-2">


        <div class="inicio">


            <section class="welcome-card">


                <h1>
                    Cargando...
                </h1>


            </section>


        </div>

    `;



    try {


        const usuarioRef = doc(
            db,
            "usuarios",
            usuario.uid
        );


        const usuarioSnap = await getDoc(usuarioRef);



        let nombre = usuario.email;



        if (usuarioSnap.exists()) {


            const datos = usuarioSnap.data();



            if (datos.nombre) {

                nombre = datos.nombre;

            }

        }




        const progresoRef = doc(
            db,
            "progreso",
            usuario.uid
        );


        const progresoSnap = await getDoc(progresoRef);



        let xp = 0;



        if (progresoSnap.exists()) {


            const progreso = progresoSnap.data();


            xp = progreso.xp || 0;


        }





        app.innerHTML = `


            <img src="${cloud}" class="cloud cloud-1">


            <img src="${cloud}" class="cloud cloud-2">

            
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
                        ¡Hola, ${nombre}! 👋
                    </h1>



                    <p>
                        Continúa aprendiendo donde lo dejaste.
                    </p>



                    <div class="xp-mini">

                        ⭐ ${xp} XP

                    </div>



                </section>






                <section class="mis-cursos">


                    <h2>
                        Mis cursos
                    </h2>





                    <div class="curso-card">



                        <div class="curso-icon">

                            🐍

                        </div>




                        <div class="curso-info">



                            <h3>
                                Python Fundamentals
                            </h3>



                            <p>
                                Aprende los fundamentos de Python.
                            </p>




                            <button 
                                id="btnPython"
                                class="curso-btn"
                            >

                                CONTINUAR

                            </button>




                        </div>



                    </div>




                </section>





            </div>


        `;





        document
            .getElementById("btnPython")
            .addEventListener("click", () => {


                window.location.href = "index.html";


            });





    } catch(error) {


        console.error(
            "❌ Error cargando inicio:",
            error
        );



        app.innerHTML = `


            <div class="inicio">


                <section class="welcome-card">


                    <h1>
                        ¡Hola! 👋
                    </h1>


                    <p>
                        No pudimos cargar tu progreso.
                    </p>


                </section>


            </div>


        `;


    }


}