import{C as e,S as t,_ as n,a as r,b as i,d as a,f as o,g as s,h as c,i as l,l as u,m as d,n as f,o as p,r as m,s as h,t as g,u as _,w as v,x as y,y as b}from"./firebaseConfig-CcrSE6B8.js";var x=v((()=>{}));function S(){let e=document.getElementById(`navbar`);if(!e){console.error(`No se encontró el elemento #navbar`);return}let t=g.currentUser;e.innerHTML=`


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



                <button id="btnLeaderboard">

                    Leaderboard

                </button>





                ${t?`

                    <button
                        class="profile-btn"
                        id="btnUsuario">


                        Usuario


                    </button>





                    <button
                        id="btnCerrarSesion">


                        Cerrar sesión


                    </button>


                    `:`


                    <button id="btnNavLogin">


                        Iniciar sesión


                    </button>





                    <button id="btnRegistro">


                        Registrarse


                    </button>


                    `}



            </div>



        </nav>



    `,document.getElementById(`btnInicio`).addEventListener(`click`,()=>{window.location.hash=`#inicio`});let n=document.getElementById(`btnLeaderboard`);n&&n.addEventListener(`click`,()=>{window.location.hash=`#leaderboard`}),t||(document.getElementById(`btnNavLogin`).addEventListener(`click`,()=>{window.location.hash=`#login`}),document.getElementById(`btnRegistro`).addEventListener(`click`,()=>{window.location.hash=`#registro`})),t&&(document.getElementById(`btnUsuario`).addEventListener(`click`,()=>{window.location.hash=`#usuario`}),document.getElementById(`btnCerrarSesion`).addEventListener(`click`,async()=>{await g.signOut(),window.location.reload()}));let r=document.getElementById(`menuToggle`),i=document.getElementById(`navbarLinks`);r.addEventListener(`click`,()=>{i.classList.toggle(`show`)}),i.querySelectorAll(`button`).forEach(e=>{e.addEventListener(`click`,()=>{i.classList.remove(`show`)})});let a={"#inicio":document.getElementById(`btnInicio`),"#leaderboard":document.getElementById(`btnLeaderboard`),"#usuario":document.getElementById(`btnUsuario`),"#login":document.getElementById(`btnNavLogin`),"#registro":document.getElementById(`btnRegistro`)};function o(){Object.values(a).forEach(e=>{e&&e.classList.remove(`active`)});let e=window.location.hash||`#inicio`;a[e]&&a[e].classList.add(`active`)}o(),window.addEventListener(`hashchange`,o)}var C=v((()=>{m(),x()})),w,T=v((()=>{w=`data:image/svg+xml,%3csvg%20width='200'%20height='100'%20viewBox='0%200%20200%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='%20M60%2080%20H150%20C175%2080%20190%2065%20190%2045%20C190%2020%20165%205%20140%2015%20C130%20-5%2090%20-5%2075%2020%20C50%2010%2020%2030%2025%2055%20C30%2070%2040%2080%2060%2080Z%20'%20fill='%23F4F7F8'%3e%3c/path%3e%3c/svg%3e`})),E=v((()=>{}));async function D(){let e=document.getElementById(`app`);if(!e){console.error(`❌ No se encontró #app`);return}let t=g.currentUser;if(!t){window.location.hash=`#login`;return}e.innerHTML=`

        <img src="${w}" class="cloud cloud-1">

        <img src="${w}" class="cloud cloud-2">


        <div class="inicio">


            <section class="welcome-card">


                <h1>
                    Cargando...
                </h1>


            </section>


        </div>

    `;try{let n=o(f,`usuarios`,t.uid),r=await p(n),i=t.email;if(r.exists()){let e=r.data();e.nombre&&(i=e.nombre)}let a=o(f,`progreso`,t.uid),s=await p(a),c=0;s.exists()&&(c=s.data().xp||0),e.innerHTML=`


            <img src="${w}" class="cloud cloud-1">


            <img src="${w}" class="cloud cloud-2">

            
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
                        ¡Hola, ${i}! 👋
                    </h1>



                    <p>
                        Continúa aprendiendo donde lo dejaste.
                    </p>



                    <div class="xp-mini">

                        ⭐ ${c} XP

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


        `,document.getElementById(`btnPython`).addEventListener(`click`,()=>{window.location.href=`index.html`})}catch(t){console.error(`❌ Error cargando inicio:`,t),e.innerHTML=`


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


        `}}var O=v((()=>{m(),l(),T(),E()})),k=v((()=>{}));function A(){let e=document.querySelector(`main`);e.innerHTML=`

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

    `,document.getElementById(`btnLogin`).addEventListener(`click`,async()=>{let e=document.getElementById(`correo`).value,t=document.getElementById(`contrasena`).value;console.log(`Correo:`,e);try{let n=await y(g,e,t);console.log(`Usuario:`,n.user),window.location.reload()}catch(e){console.error(e),console.error(`Código:`,e.code),console.error(`Mensaje:`,e.message),alert(`Error al iniciar sesión: `+e.message)}})}var j=v((()=>{d(),m(),k()})),M=v((()=>{}));function N(){let e=document.querySelector(`main`);if(!e){console.error(`No se encontró <main>`);return}e.innerHTML=`

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

    `;let t=document.querySelector(`#registroForm`),n=document.querySelector(`#mensajeRegistro`);t.addEventListener(`submit`,async e=>{e.preventDefault();let i=document.querySelector(`#nombre`).value.trim(),a=document.querySelector(`#email`).value.trim(),c=document.querySelector(`#password`).value;n.textContent=`Creando cuenta...`;try{let e=(await s(g,a,c)).user;await u(o(f,`usuarios`,e.uid),{nombre:i,email:a,uid:e.uid,fechaRegistro:new Date}),await u(o(f,`progreso`,e.uid),{xp:0,cursos:{python:{completedLessons:[]}}}),console.log(`Usuario registrado:`,e.uid),n.textContent=`¡Cuenta creada correctamente!`,t.reset()}catch(e){console.error(`Error al registrar:`,e),n.textContent=r(e)}});function r(e){switch(e.code){case`auth/email-already-in-use`:return`Ese correo ya está registrado.`;case`auth/invalid-email`:return`El correo no es válido.`;case`auth/weak-password`:return`La contraseña es demasiado débil.`;case`auth/missing-password`:return`Debes escribir una contraseña.`;default:return`No se pudo crear la cuenta.`}}}var P=v((()=>{d(),l(),m(),M()})),F=v((()=>{}));async function I(){let e=document.getElementById(`app`),a=g.currentUser,s=`

        <img src="${w}" class="cloud cloud-1">

        <img src="${w}" class="cloud cloud-2">


        <div class="stars">

            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>

        </div>

    `;if(!a){e.innerHTML=`

            ${s}


            <div class="inicio">


                <div class="user-card">


                    <h2>
                        No has iniciado sesión
                    </h2>


                    <p>
                        Debes iniciar sesión para ver tu información.
                    </p>


                </div>


            </div>

        `;return}let l=o(f,`usuarios`,a.uid);try{let o=await p(l);if(!o.exists()){e.innerHTML=`


                ${s}


                <div class="inicio">


                    <div class="user-card">


                        <h2>
                            Usuario
                        </h2>


                        <p>
                            No se encontraron los datos de tu perfil.
                        </p>


                    </div>


                </div>


            `;return}let u=o.data();e.innerHTML=`


            ${s}



            <div class="inicio">



                <div class="user-card">



                    <h2>
                        Mi Usuario
                    </h2>




                    <div class="user-info">



                        <p>
                            <strong>
                                Nombre:
                            </strong>

                            ${u.nombre}
                        </p>




                        <p>
                            <strong>
                                Correo:
                            </strong>

                            ${u.email}
                        </p>




                        <p>
                            <strong>
                                UID:
                            </strong>

                            ${a.uid}
                        </p>



                    </div>





                    <div class="user-buttons">



                        <button 
                            class="primary-btn"
                            id="btnModificar">

                            Modificar datos

                        </button>



                        <button 
                            class="danger-btn"
                            id="btnEliminarCuenta">

                            Eliminar cuenta

                        </button>



                    </div>




                </div>



            </div>



        `,document.getElementById(`btnModificar`).addEventListener(`click`,()=>{e.innerHTML=`



                    ${s}




                    <div class="inicio">



                        <div class="user-card">



                            <h2>
                                Modificar datos
                            </h2>





                            <label>
                                Nombre:
                            </label>




                            <input

                                class="user-input"

                                type="text"

                                id="nombre"

                                value="${u.nombre||``}"

                            >






                            <div class="user-buttons">



                                <button

                                    class="primary-btn"

                                    id="btnGuardar">

                                    Guardar cambios

                                </button>





                                <button

                                    class="secondary-btn"

                                    id="btnCancelar">

                                    Cancelar

                                </button>



                            </div>





                        </div>



                    </div>




                `,document.getElementById(`btnGuardar`).addEventListener(`click`,async()=>{let e=document.getElementById(`nombre`).value;try{await _(l,{nombre:e}),alert(`Datos actualizados correctamente`),I()}catch(e){console.error(`Error actualizando datos:`,e),alert(`Error al actualizar datos: `+e.message)}}),document.getElementById(`btnCancelar`).addEventListener(`click`,()=>{I()})}),document.getElementById(`btnCerrarSesion`).addEventListener(`click`,async()=>{try{await t(g),alert(`Sesión cerrada correctamente`),window.location.reload()}catch(e){alert(`Error al cerrar sesión: `+e.message)}}),document.getElementById(`btnEliminarCuenta`).addEventListener(`click`,async()=>{if(confirm(`¿Estás seguro de que quieres eliminar tu cuenta?`))try{let e=prompt(`Confirma tu contraseña para eliminar la cuenta:`);if(!e)return;let t=c.credential(a.email,e);await i(a,t),await r(l),await n(a),alert(`Cuenta eliminada correctamente`),window.location.reload()}catch(e){console.error(`Error eliminando cuenta:`,e),alert(`Error al eliminar cuenta: `+e.message)}})}catch(t){console.error(`Error obteniendo datos:`,t),e.innerHTML=`



            ${s}




            <div class="inicio">


                <div class="user-card">


                    <h2>
                        Error
                    </h2>


                    <p>
                        No se pudieron cargar los datos del usuario.
                    </p>



                </div>


            </div>



        `}}var L=v((()=>{d(),l(),m(),T(),F()})),R=v((()=>{}));async function z(){let e=document.getElementById(`app`);if(!e){console.error(`❌ No se encontró #app`);return}let t=`
        <img src="${w}" class="cloud cloud-1" alt="Nube decorativa">
        <img src="${w}" class="cloud cloud-2" alt="Nube decorativa">
        <div class="stars">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
        </div>
    `;e.innerHTML=`
        ${t}
        <div class="leaderboard-page">
            <header class="leaderboard-header">
                <div class="badge-tag">🏆 Ranking Semanal</div>
                <h1>Tabla de Clasificación</h1>
                <p>Compite con otros estudiantes y sube en el podio esta semana.</p>
            </header>
            <div class="leaderboard-loading">
                <div class="spinner"></div>
                <p>Cargando posiciones...</p>
            </div>
        </div>
    `;try{let n=await h(a(f,`usuarios`)),r=await h(a(f,`progreso`)),i={};r.forEach(e=>{i[e.id]=e.data()});let o=[];n.forEach(e=>{let t=e.data(),n=i[e.id]||{},r=n.weeklyXP===void 0?n.xp||0:n.weeklyXP;o.push({uid:e.id,nombre:t.nombre||(t.email?t.email.split(`@`)[0]:`Programador`),email:t.email||``,weeklyXP:Number(r)||0,totalXP:Number(n.xp)||0})}),o.sort((e,t)=>t.weeklyXP-e.weeklyXP);let s=g.currentUser,c=s?s.uid:null,l=c?o.findIndex(e=>e.uid===c):-1,u=l===-1?null:l+1,d=l===-1?null:o[l],p=o.slice(0,10);if(p.length===0){e.innerHTML=`
                ${t}
                <div class="leaderboard-page">
                    <header class="leaderboard-header">
                        <div class="badge-tag">🏆 Ranking Semanal</div>
                        <h1>Tabla de Clasificación</h1>
                        <p>Los 10 usuarios con más experiencia acumulada esta semana.</p>
                    </header>
                    <div class="leaderboard-loading">
                        <p>Aún no hay usuarios con XP acumulado. ¡Completa lecciones para aparecer aquí!</p>
                    </div>
                </div>
            `;return}let m=e=>{if(!e)return`U`;let t=e.trim().split(` `);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.substring(0,2).toUpperCase()};e.innerHTML=`
            ${t}
            <div class="leaderboard-page">
                <header class="leaderboard-header">
                    <div class="badge-tag">🏆 Ranking Semanal</div>
                    <h1>Tabla de Clasificación</h1>
                    <p>Los 10 usuarios con más experiencia acumulada esta semana.</p>
                </header>

                ${(()=>{let e=p[0],t=p[1],n=p[2],r=`<div class="podium-container">`;if(t){let e=c&&t.uid===c;r+=`
                    <div class="podium-card second ${e?`is-current-user`:``}">
                        <div class="podium-badge">🥈</div>
                        <div class="podium-avatar">${m(t.nombre)}</div>
                        <div class="podium-name" title="${t.nombre}">
                            ${t.nombre} ${e?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${t.weeklyXP} XP</div>
                    </div>
                `}if(e){let t=c&&e.uid===c;r+=`
                    <div class="podium-card first ${t?`is-current-user`:``}">
                        <div class="podium-badge">👑</div>
                        <div class="podium-avatar">${m(e.nombre)}</div>
                        <div class="podium-name" title="${e.nombre}">
                            ${e.nombre} ${t?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${e.weeklyXP} XP</div>
                    </div>
                `}if(n){let e=c&&n.uid===c;r+=`
                    <div class="podium-card third ${e?`is-current-user`:``}">
                        <div class="podium-badge">🥉</div>
                        <div class="podium-avatar">${m(n.nombre)}</div>
                        <div class="podium-name" title="${n.nombre}">
                            ${n.nombre} ${e?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${n.weeklyXP} XP</div>
                    </div>
                `}return r+=`</div>`,r})()}
                ${(()=>{let e=p.slice(3);if(e.length===0)return``;let t=`<div class="ranking-list">`;return e.forEach((e,n)=>{let r=n+4,i=c&&e.uid===c;t+=`
                    <div class="ranking-item ${i?`is-current-user`:``}">
                        <div class="ranking-left">
                            <span class="ranking-pos">#${r}</span>
                            <div class="ranking-avatar">${m(e.nombre)}</div>
                            <div class="ranking-info">
                                <span class="ranking-name">
                                    ${e.nombre}
                                    ${i?`<span class="you-badge">Tú</span>`:``}
                                </span>
                            </div>
                        </div>
                        <div class="ranking-xp">
                            ⚡ ${e.weeklyXP} XP
                        </div>
                    </div>
                `}),t+=`</div>`,t})()}
                ${(()=>{if(!c||!d||u<=10)return``;let e=p[9]?Math.max(0,p[9].weeklyXP-d.weeklyXP+1):0;return`
                <div class="current-user-banner">
                    <div class="user-rank-status">
                        <div class="rank-circle">#${u}</div>
                        <div class="user-meta">
                            <h4>Tu posición semanal: #${u}</h4>
                            <p>${d.weeklyXP} XP acumulados esta semana ${e>0?`• ¡Te faltan ${e} XP para entrar al Top 10!`:``}</p>
                        </div>
                    </div>
                    <div class="ranking-xp">
                        ⚡ ${d.weeklyXP} XP
                    </div>
                </div>
            `})()}
            </div>
        `}catch(n){console.error(`❌ Error cargando leaderboard:`,n),e.innerHTML=`
            ${t}
            <div class="leaderboard-page">
                <header class="leaderboard-header">
                    <div class="badge-tag">🏆 Ranking Semanal</div>
                    <h1>Tabla de Clasificación</h1>
                </header>
                <div class="leaderboard-loading">
                    <p>No se pudo cargar la tabla de clasificación en este momento.</p>
                    <button class="primary-btn" onclick="window.location.reload()" style="background:#2778FF;color:#fff;border:none;padding:10px 20px;border-radius:12px;font-family:inherit;font-weight:600;cursor:pointer;margin-top:10px;">
                        Reintentar
                    </button>
                </div>
            </div>
        `}}var B=v((()=>{m(),l(),T(),R()}));e((()=>{d(),m(),C(),O(),j(),P(),L(),B();async function e(e){if(S(),!e)switch(window.location.hash){case`#login`:A();return;case`#registro`:N();return;case`#leaderboard`:await z();return;default:window.location.hash=`#login`;return}switch(window.location.hash){case`#usuario`:await I();break;case`#leaderboard`:await z();break;default:await D()}}b(g,async t=>{console.log(t?`Usuario conectado: ${t.uid}`:`No hay usuario conectado`),await e(t)}),window.addEventListener(`hashchange`,async()=>{await e(g.currentUser)})}))();