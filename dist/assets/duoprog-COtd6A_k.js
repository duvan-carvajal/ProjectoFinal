import{C as e,E as t,S as n,T as r,_ as i,a,c as o,d as s,f as c,g as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,t as v,v as y,w as b,x,y as S}from"./navbar-DINmac7T.js";var C,w=t((()=>{C=`data:image/svg+xml,%3csvg%20width='200'%20height='100'%20viewBox='0%200%20200%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='%20M60%2080%20H150%20C175%2080%20190%2065%20190%2045%20C190%2020%20165%205%20140%2015%20C130%20-5%2090%20-5%2075%2020%20C50%2010%2020%2030%2025%2055%20C30%2070%2040%2080%2060%2080Z%20'%20fill='%23F4F7F8'%3e%3c/path%3e%3c/svg%3e`})),T,E=t((()=>{T=`/assets/python-logo-yw-cT82l.png`})),D=t((()=>{}));async function O(){let e=document.getElementById(`app`);if(!e){console.error(`❌ No se encontró #app`);return}let t=g.currentUser;if(!t){window.location.hash=`#login`;return}e.innerHTML=`

        <div class="inicio">


            <section class="welcome-card">


                <h1>
                    Cargando...
                </h1>


            </section>


        </div>

    `;try{let n=f(u,`usuarios`,t.uid),r=await o(n),i=t.email;if(r.exists()){let e=r.data();e.nombre&&(i=e.nombre)}let a=f(u,`progreso`,t.uid),s=await o(a),c=0;s.exists()&&(c=s.data().xp||0),e.innerHTML=`

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

                            <img src="${T}" alt="Python" class="curso-icon-img">

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


        `,document.getElementById(`btnPython`).addEventListener(`click`,()=>{window.location.href=`python.html`})}catch(t){console.error(`❌ Error cargando inicio:`,t),e.innerHTML=`


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


        `}}var k=t((()=>{a(),m(),E(),D()})),A=t((()=>{}));function j(){let t=document.querySelector(`main`);t.innerHTML=`

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

    `,document.getElementById(`btnLogin`).addEventListener(`click`,async()=>{let t=document.getElementById(`correo`).value,n=document.getElementById(`contrasena`).value;console.log(`Correo:`,t);try{let r=await e(g,t,n);console.log(`Usuario:`,r.user),window.location.reload()}catch(e){console.error(e),console.error(`Código:`,e.code),console.error(`Mensaje:`,e.message),alert(`Error al iniciar sesión: `+e.message)}})}var M=t((()=>{l(),a(),A()})),N=t((()=>{}));function P(){let e=document.querySelector(`main`);if(!e){console.error(`No se encontró <main>`);return}e.innerHTML=`

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

    `;let t=document.querySelector(`#registroForm`),n=document.querySelector(`#mensajeRegistro`);t.addEventListener(`submit`,async e=>{e.preventDefault();let i=document.querySelector(`#nombre`).value.trim(),a=document.querySelector(`#email`).value.trim(),o=document.querySelector(`#password`).value;n.textContent=`Creando cuenta...`;try{let e=(await y(g,a,o)).user;await s(f(u,`usuarios`,e.uid),{nombre:i,email:a,uid:e.uid,fechaRegistro:new Date}),await s(f(u,`progreso`,e.uid),{xp:0,cursos:{python:{completedLessons:[]}}}),console.log(`Usuario registrado:`,e.uid),n.textContent=`¡Cuenta creada correctamente!`,t.reset()}catch(e){console.error(`Error al registrar:`,e),n.textContent=r(e)}});function r(e){switch(e.code){case`auth/email-already-in-use`:return`Ese correo ya está registrado.`;case`auth/invalid-email`:return`El correo no es válido.`;case`auth/weak-password`:return`La contraseña es demasiado débil.`;case`auth/missing-password`:return`Debes escribir una contraseña.`;default:return`No se pudo crear la cuenta.`}}}var F=t((()=>{l(),m(),a(),N()})),I=t((()=>{}));async function L(){let e=document.getElementById(`app`),t=g.currentUser,r=`


        <div class="stars">

            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>

        </div>

    `;if(!t){e.innerHTML=`

            ${r}


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

        `;return}let a=f(u,`usuarios`,t.uid);try{let s=await o(a);if(!s.exists()){e.innerHTML=`


                ${r}


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


            `;return}let l=s.data();e.innerHTML=`


            ${r}



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

                            ${l.nombre}
                        </p>




                        <p>
                            <strong>
                                Correo:
                            </strong>

                            ${l.email}
                        </p>




                        <p>
                            <strong>
                                UID:
                            </strong>

                            ${t.uid}
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



                    ${r}




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

                                value="${l.nombre||``}"

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




                `,document.getElementById(`btnGuardar`).addEventListener(`click`,async()=>{let e=document.getElementById(`nombre`).value;try{await c(a,{nombre:e}),alert(`Datos actualizados correctamente`),L()}catch(e){console.error(`Error actualizando datos:`,e),alert(`Error al actualizar datos: `+e.message)}}),document.getElementById(`btnCancelar`).addEventListener(`click`,()=>{L()})}),document.getElementById(`btnCerrarSesion`).addEventListener(`click`,async()=>{try{await b(g),alert(`Sesión cerrada correctamente`),window.location.reload()}catch(e){alert(`Error al cerrar sesión: `+e.message)}}),document.getElementById(`btnEliminarCuenta`).addEventListener(`click`,async()=>{if(confirm(`¿Estás seguro de que quieres eliminar tu cuenta?`))try{let e=prompt(`Confirma tu contraseña para eliminar la cuenta:`);if(!e)return;let r=i.credential(t.email,e);await n(t,r),await _(a),await S(t),alert(`Cuenta eliminada correctamente`),window.location.reload()}catch(e){console.error(`Error eliminando cuenta:`,e),alert(`Error al eliminar cuenta: `+e.message)}})}catch(t){console.error(`Error obteniendo datos:`,t),e.innerHTML=`



            ${r}




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



        `}}var R=t((()=>{l(),m(),a(),I()})),z=t((()=>{}));async function B(){let e=document.getElementById(`app`);if(!e){console.error(`❌ No se encontró #app`);return}let t=`
        <img src="${C}" class="cloud cloud-1" alt="Nube decorativa">
        <img src="${C}" class="cloud cloud-2" alt="Nube decorativa">
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
    `;try{let n=await d(h(u,`usuarios`)),r=await d(h(u,`progreso`)),i={};r.forEach(e=>{i[e.id]=e.data()});let a=[];if(n.forEach(e=>{let t=e.data(),n=i[e.id]||{},r=n.weeklyXP===void 0?n.xp||0:n.weeklyXP;a.push({uid:e.id,nombre:t.nombre||(t.email?t.email.split(`@`)[0]:`Programador`),email:t.email||``,weeklyXP:Number(r)||0,totalXP:Number(n.xp)||0})}),a.length<10){let e=[{uid:`demo_1`,nombre:`Valentina Code`,weeklyXP:380,isDemo:!0},{uid:`demo_2`,nombre:`Carlos Py`,weeklyXP:320,isDemo:!0},{uid:`demo_3`,nombre:`Mateo Algoritmos`,weeklyXP:290,isDemo:!0},{uid:`demo_4`,nombre:`Sofía Dev`,weeklyXP:250,isDemo:!0},{uid:`demo_5`,nombre:`Sebastián Logic`,weeklyXP:210,isDemo:!0},{uid:`demo_6`,nombre:`Camila JS`,weeklyXP:180,isDemo:!0},{uid:`demo_7`,nombre:`Daniel Loops`,weeklyXP:140,isDemo:!0},{uid:`demo_8`,nombre:`Mariana Git`,weeklyXP:110,isDemo:!0},{uid:`demo_9`,nombre:`Alejandro Data`,weeklyXP:90,isDemo:!0}],t=new Set(a.map(e=>e.uid));for(let n of e)!t.has(n.uid)&&a.length<10&&a.push(n)}a.sort((e,t)=>t.weeklyXP-e.weeklyXP);let o=g.currentUser,s=o?o.uid:null,c=s?a.findIndex(e=>e.uid===s):-1,l=c===-1?null:c+1,f=c===-1?null:a[c],p=a.slice(0,10);if(p.length===0){e.innerHTML=`
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

                ${(()=>{let e=p[0],t=p[1],n=p[2],r=`<div class="podium-container">`;if(t){let e=s&&t.uid===s;r+=`
                    <div class="podium-card second ${e?`is-current-user`:``}">
                        <div class="podium-badge">🥈</div>
                        <div class="podium-avatar">${m(t.nombre)}</div>
                        <div class="podium-name" title="${t.nombre}">
                            ${t.nombre} ${e?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${t.weeklyXP} XP</div>
                    </div>
                `}if(e){let t=s&&e.uid===s;r+=`
                    <div class="podium-card first ${t?`is-current-user`:``}">
                        <div class="podium-badge">👑</div>
                        <div class="podium-avatar">${m(e.nombre)}</div>
                        <div class="podium-name" title="${e.nombre}">
                            ${e.nombre} ${t?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${e.weeklyXP} XP</div>
                    </div>
                `}if(n){let e=s&&n.uid===s;r+=`
                    <div class="podium-card third ${e?`is-current-user`:``}">
                        <div class="podium-badge">🥉</div>
                        <div class="podium-avatar">${m(n.nombre)}</div>
                        <div class="podium-name" title="${n.nombre}">
                            ${n.nombre} ${e?`<span class="you-badge">Tú</span>`:``}
                        </div>
                        <div class="podium-xp">⚡ ${n.weeklyXP} XP</div>
                    </div>
                `}return r+=`</div>`,r})()}
                ${(()=>{let e=p.slice(3);if(e.length===0)return``;let t=`<div class="ranking-list">`;return e.forEach((e,n)=>{let r=n+4,i=s&&e.uid===s;t+=`
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
                ${(()=>{if(!s||!f||l<=10)return``;let e=p[9]?Math.max(0,p[9].weeklyXP-f.weeklyXP+1):0;return`
                <div class="current-user-banner">
                    <div class="user-rank-status">
                        <div class="rank-circle">#${l}</div>
                        <div class="user-meta">
                            <h4>Tu posición semanal: #${l}</h4>
                            <p>${f.weeklyXP} XP acumulados esta semana ${e>0?`• ¡Te faltan ${e} XP para entrar al Top 10!`:``}</p>
                        </div>
                    </div>
                    <div class="ranking-xp">
                        ⚡ ${f.weeklyXP} XP
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
        `}}var V=t((()=>{a(),m(),w(),z()}));r((()=>{l(),a(),v(),k(),M(),F(),R(),V();async function e(e){if(p(),!e)switch(window.location.hash){case`#login`:j();return;case`#registro`:P();return;case`#leaderboard`:await B();return;default:window.location.hash=`#login`;return}switch(window.location.hash){case`#usuario`:await L();break;case`#leaderboard`:await B();break;default:await O()}}x(g,async t=>{console.log(t?`Usuario conectado: ${t.uid}`:`No hay usuario conectado`),await e(t)}),window.addEventListener(`hashchange`,async()=>{await e(g.currentUser)})}))();