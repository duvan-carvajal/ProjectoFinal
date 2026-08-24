import { auth } from '../../firebaseConfig.js';
import './style.css';


export default function mostrarNavbar() {


    const navbar = document.getElementById("navbar");


    if (!navbar) {

        console.error("No se encontró el elemento #navbar");

        return;

    }



    const usuario = auth.currentUser;



    navbar.innerHTML = `


        <nav class="navbar">


            <div class="navbar-logo">

                <h2>
                    DuoProg
                </h2>

            </div>





            <button
                class="menu-toggle"
                id="menuToggle">


                <span></span>
                <span></span>
                <span></span>


            </button>







            <div
                class="navbar-links"
                id="navbarLinks">



                <button id="btnInicio">

                    Inicio

                </button>





                ${
                    usuario
                    ?

                    `

                    <button
                        class="profile-btn"
                        id="btnUsuario">


                        Usuario


                    </button>





                    <button
                        id="btnCerrarSesion">


                        Cerrar sesión


                    </button>


                    `

                    :


                    `


                    <button id="btnNavLogin">


                        Iniciar sesión


                    </button>





                    <button id="btnRegistro">


                        Registrarse


                    </button>


                    `

                }



            </div>



        </nav>



    `;








    // =========================
    // NAVEGACIÓN
    // =========================



    document
    .getElementById("btnInicio")
    .addEventListener("click",()=>{


        window.location.hash="#inicio";


    });








    if(!usuario){



        document
        .getElementById("btnNavLogin")
        .addEventListener("click",()=>{


            window.location.hash="#login";


        });






        document
        .getElementById("btnRegistro")
        .addEventListener("click",()=>{


            window.location.hash="#registro";


        });



    }








    if(usuario){



        document
        .getElementById("btnUsuario")
        .addEventListener("click",()=>{


            window.location.hash="#usuario";


        });







        document
        .getElementById("btnCerrarSesion")
        .addEventListener("click",async()=>{


            await auth.signOut();


            window.location.reload();


        });



    }









    // =========================
    // MENU MOVIL
    // =========================


    const menuToggle =
        document.getElementById("menuToggle");



    const navbarLinks =
        document.getElementById("navbarLinks");





    menuToggle
    .addEventListener("click",()=>{


        navbarLinks
        .classList
        .toggle("show");



    });







    navbarLinks
    .querySelectorAll("button")
    .forEach(btn=>{


        btn.addEventListener("click",()=>{


            navbarLinks
            .classList
            .remove("show");


        });


    });









    // =========================
    // PESTAÑA ACTIVA
    // =========================


    const botones = {



        "#inicio":

        document.getElementById("btnInicio"),





        "#usuario":

        document.getElementById("btnUsuario"),





        "#login":

        document.getElementById("btnNavLogin"),





        "#registro":

        document.getElementById("btnRegistro")



    };








    function actualizarActivo(){



        Object.values(botones)
        .forEach(btn=>{



            if(btn){

                btn.classList.remove("active");

            }



        });







        const ruta =

        window.location.hash || "#inicio";








        if(botones[ruta]){


            botones[ruta]
            .classList
            .add("active");


        }



    }









    actualizarActivo();





    window.addEventListener(

        "hashchange",

        actualizarActivo

    );



}