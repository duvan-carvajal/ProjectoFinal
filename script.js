import { auth, db } from './src/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let lives = 3;
let userXP = 0;

let completedLessons = [];
let currentUser = null;
let progressLoaded = false;

let currentActivityIndex = 0;
let selectedAnswer = null;
let currentQuestion = null;


// ============================================================
// LESSON DATA
// ============================================================

const lessons = {

    introduction: {

        title: "Introducción a Python",

        activities: [

            {
                type: "info",

                title: "¿Qué es la Programación?",

                text:
                    "Una computadora es una máquina muy rápida y potente, pero no puede pensar por sí misma. Programar consiste en darle una serie de instrucciones claras y ordenadas para que realice tareas o resuelva problemas. Python es uno de los lenguajes de programación más populares y fáciles de aprender del mundo gracias a su sintaxis clara, parecida al idioma humano."
            },

            {
                type: "multiple-choice",

                question: "¿Qué es programar en el contexto de la computación?",

                answers: [
                    "Darle instrucciones a una computadora para realizar tareas",
                    "Armar las piezas físicas y circuitos de una computadora",
                    "Navegar por diferentes páginas en internet",
                    "Instalar videojuegos y aplicaciones"
                ],

                correct: 0
            },

            {
                type: "info",

                title: "Tu primera instrucción: print()",

                text:
                    "En Python usamos la función print() para mostrar texto o resultados en la pantalla. Lo que deseamos mostrar se coloca entre paréntesis. Cuando se trata de texto, siempre debe ir envuelto entre comillas (por ejemplo: \"Hola\" o 'Hola'). Ejemplo:\n\nprint(\"¡Hola, mundo!\")"
            },

            {
                type: "multiple-choice",

                question: "¿Qué mostrará en la pantalla la siguiente línea de código?",

                code: 'print("Bienvenido a Python")',

                answers: [
                    "Nada, solo guarda el texto en silencio",
                    "Bienvenido a Python",
                    'print("Bienvenido a Python")',
                    "Un error de sintaxis"
                ],

                correct: 1
            },

            {
                type: "multiple-choice",

                question: "¿Por qué el siguiente código produce un error en Python?",

                code: "print(Hola mundo)",

                answers: [
                    "Porque le faltan las comillas alrededor del texto",
                    "Porque la palabra print debe ir en mayúsculas",
                    "Porque no se puede mostrar texto en Python",
                    "Porque le falta un punto y coma al final"
                ],

                correct: 0
            },

            {
                type: "info",

                title: "Comentarios y orden de ejecución",

                text:
                    "Python lee y ejecuta las instrucciones en orden: de arriba hacia abajo, una línea a la vez. Si deseas dejar notas explicativas en tu código, usas el símbolo numeral (#). Todo lo que escribas después de # es un comentario que Python ignorará por completo al ejecutar el programa."
            },

            {
                type: "multiple-choice",

                question: "¿Qué símbolo se utiliza en Python para escribir un comentario de una sola línea?",

                code: '# Esta línea es un comentario y no se ejecuta\nprint("Esta línea sí se ejecuta")',

                answers: [
                    "//",
                    "#",
                    "/*",
                    "--"
                ],

                correct: 1
            },

            {
                type: "matching",

                question: "Relaciona cada concepto con su función en Python:",

                pairs: [

                    {
                        left: "print()",
                        right: "Muestra mensajes o datos en pantalla"
                    },

                    {
                        left: 'Comillas (" ")',
                        right: "Indican que el contenido es texto"
                    },

                    {
                        left: "# (Numeral)",
                        right: "Inicia un comentario que Python ignora"
                    },

                    {
                        left: "Python",
                        right: "Lenguaje que interpreta las instrucciones"
                    }

                ]
            },

            {
                type: "code",

                question:
                    'Escribe el código para mostrar en pantalla exactamente: "Hola, mundo!" (recuerda usar print y comillas dobles).',

                expected: [
                    'print("Hola, mundo!")',
                    "print('Hola, mundo!')",
                    'print("Hola, mundo! ")',
                    'print("Hola mundo!")',
                    "print('Hola mundo!')"
                ]
            }

        ]
    },


    variables: {

        title: "Variables en Python",

        activities: [

            {
                type: "info",

                title: "¿Qué es una Variable?",

                text:
                    "Imagina una variable como una caja etiquetada en la memoria de la computadora donde puedes guardar datos para usarlos más adelante. El nombre de la etiqueta es el nombre de la variable, y lo que guardas dentro es su valor. Por ejemplo, puedes guardar el nombre de un usuario, su puntuación o sus vidas restantes."
            },

            {
                type: "multiple-choice",

                question: "¿Cuál es el propósito principal de una variable?",

                answers: [
                    "Guardar y recordar información en memoria durante el programa",
                    "Acelerar la conexión a internet de la computadora",
                    "Apagar la pantalla al terminar el código",
                    "Crear un nuevo archivo de texto en el disco duro"
                ],

                correct: 0
            },

            {
                type: "info",

                title: "Asignación con el signo =",

                text:
                    "Para guardar un valor en una variable usamos el signo igual (=), conocido como el operador de asignación. A la izquierda escribes el nombre de la variable y a la derecha el valor que deseas guardarle:\n\npuntos = 100\njugador = \"Carlos\"\n\n¡Importante! En programación, el signo = no significa igualdad matemática, significa 'asigna o guarda el valor de la derecha en la variable de la izquierda'."
            },

            {
                type: "multiple-choice",

                question: "¿Cuál de las siguientes líneas crea correctamente una variable llamada 'energia' con el valor 100?",

                answers: [
                    "energia = 100",
                    "100 = energia",
                    "guardar 100 en energia",
                    "energia == 100"
                ],

                correct: 0
            },

            {
                type: "multiple-choice",

                question: "¿Qué valor tendrá la variable 'vidas' al final de la ejecución?",

                code: "vidas = 3\nvidas = vidas - 1\nprint(vidas)",

                answers: [
                    "3",
                    "2",
                    "vidas",
                    "1"
                ],

                correct: 1
            },

            {
                type: "multiple-choice",

                question: "¿Cuál es la diferencia entre print(nombre) y print(\"nombre\")?",

                code: 'nombre = "Sara"\nprint(nombre)\nprint("nombre")',

                answers: [
                    'print(nombre) muestra el valor "Sara" y print("nombre") muestra la palabra literal "nombre"',
                    'Ambas instrucciones muestran exactamente la palabra "Sara"',
                    'Ambas instrucciones muestran exactamente la palabra "nombre"',
                    "print(nombre) produce un error porque le faltan comillas"
                ],

                correct: 0
            },

            {
                type: "info",

                title: "Reglas para nombrar variables",

                text:
                    "En Python los nombres de variables deben ser claros y seguir reglas:\n1. No pueden contener espacios (usa guiones bajos: mi_puntaje).\n2. No pueden empezar con un número (correcto: nivel1, incorrecto: 1nivel).\n3. Distinguen mayúsculas de minúsculas (Edad y edad son dos variables diferentes)."
            },

            {
                type: "matching",

                question: "Relaciona cada concepto sobre variables con su definición:",

                pairs: [

                    {
                        left: "Variable",
                        right: "Espacio con nombre para guardar un dato"
                    },

                    {
                        left: "Operador =",
                        right: "Asigna un valor a la variable"
                    },

                    {
                        left: "Reasignación",
                        right: "Cambiar el valor previo por uno nuevo"
                    },

                    {
                        left: "snake_case",
                        right: "Estilo con guión bajo para nombres (mi_dato)"
                    }

                ]
            },

            {
                type: "code",

                question:
                    'Crea una variable llamada nombre y asígnale el texto "Alex" (usa comillas dobles y el operador =).',

                expected: [
                    'nombre = "Alex"',
                    "nombre = 'Alex'",
                    'nombre="Alex"',
                    "nombre='Alex'"
                ]
            }

        ]
    },


    dataTypes: {

        title: "Tipos de Datos",

        activities: [

            {
                type: "info",

                title: "Los Tipos de Datos Fundamentales",

                text:
                    "En Python, cada dato pertenece a una categoría llamada tipo de dato. Esto le indica a Python qué operaciones puede realizar con él. Los 4 tipos primitivos esenciales son:\n\n• str (String): Texto entre comillas, ej: \"Hola\"\n• int (Integer): Números enteros sin decimales, ej: 42 o -5\n• float: Números con punto decimal, ej: 3.14 o 0.5\n• bool (Boolean): Valores lógicos, únicamente True o False"
            },

            {
                type: "multiple-choice",

                question: "¿Qué tipo de dato representa el texto \"Aprender Python\"?",

                answers: [
                    "str (String / Cadena de texto)",
                    "int (Entero)",
                    "float (Decimal)",
                    "bool (Booleano)"
                ],

                correct: 0
            },

            {
                type: "multiple-choice",

                question: "¿Qué tipo de dato representa el número 42 (sin comillas y sin punto decimal)?",

                answers: [
                    "float (Decimal)",
                    "int (Entero)",
                    "str (Texto)",
                    "bool (Booleano)"
                ],

                correct: 1
            },

            {
                type: "multiple-choice",

                question: "¿Qué tipo de dato es la variable precio en este código?",

                code: "precio = 19.99",

                answers: [
                    "int (Entero)",
                    "float (Número decimal)",
                    "str (Texto)",
                    "bool (Booleano)"
                ],

                correct: 1
            },

            {
                type: "multiple-choice",

                question: "¿Cuáles son los únicos dos valores válidos para el tipo bool (Booleano) en Python?",

                answers: [
                    "True y False (con la primera letra mayúscula)",
                    "true y false (todo en minúsculas)",
                    "1 y 0 únicamente",
                    '"Verdadero" y "Falso"'
                ],

                correct: 0
            },

            {
                type: "info",

                title: "Operaciones y el tipo de dato",

                text:
                    "El operador de suma (+) se comporta de forma diferente según el tipo de dato:\n\n• Con números (int o float): Suma matemáticamente -> 10 + 20 da 30\n• Con textos (str): Concatena o une los textos -> \"10\" + \"20\" da \"1020\"\n\n¡Por eso es fundamental conocer el tipo de dato de cada variable!"
            },

            {
                type: "multiple-choice",

                question: "¿Cuál es el resultado de ejecutar este código en Python?",

                code: 'a = "10"\nb = "20"\nprint(a + b)',

                answers: [
                    "30",
                    '"1020"',
                    "Error de tipos",
                    '"a + b"'
                ],

                correct: 1
            },

            {
                type: "matching",

                question: "Relaciona cada tipo de dato con su ejemplo exacto:",

                pairs: [

                    {
                        left: "str",
                        right: '"Hola mundo"'
                    },

                    {
                        left: "int",
                        right: "42"
                    },

                    {
                        left: "float",
                        right: "3.14"
                    },

                    {
                        left: "bool",
                        right: "True"
                    }

                ]
            },

            {
                type: "code",

                question:
                    'Crea una variable llamada edad y asígnale el número entero 19 (sin comillas).',

                expected: [
                    "edad = 19",
                    "edad=19"
                ]
            }

        ]
    }

};


// ============================================================
// LOAD USER PROGRESS
// ============================================================

async function loadProgress(user) {

    currentUser = user;

    if (user) {

        try {

            const progresoRef =
                doc(db, "progreso", user.uid);

            const snap =
                await getDoc(progresoRef);

            if (snap.exists()) {

                const data = snap.data();

                userXP =
                    Number(data.xp) || 0;

                completedLessons =
                    data.cursos?.python?.completedLessons || [];

                // Save progress to cache

                localStorage.setItem(
                    `duoprog_completed_${user.uid}`,
                    JSON.stringify(completedLessons)
                );

                localStorage.setItem(
                    `duoprog_xp_${user.uid}`,
                    userXP.toString()
                );
            }

        } catch (err) {

            console.warn(
                "No se pudo conectar a Firestore, usando caché local:",
                err
            );

            const cached =
                localStorage.getItem(
                    `duoprog_completed_${user.uid}`
                );

            if (cached) {

                completedLessons =
                    JSON.parse(cached);
            }

            const cachedXP =
                localStorage.getItem(
                    `duoprog_xp_${user.uid}`
                );

            if (cachedXP) {

                userXP =
                    Number(cachedXP) || 0;
            }
        }

    } else {

        // Guest progress

        const cached =
            localStorage.getItem(
                "duoprog_completed_guest"
            );

        if (cached) {

            completedLessons =
                JSON.parse(cached);
        }

        const cachedXP =
            localStorage.getItem(
                "duoprog_xp_guest"
            );

        if (cachedXP) {

            userXP =
                Number(cachedXP) || 0;
        }
    }

    progressLoaded = true;

    updateCourseMapUI();
}


// ============================================================
// FIREBASE AUTH LISTENER
// ============================================================

onAuthStateChanged(auth, async (user) => {

    await loadProgress(user);

});


// ============================================================
// UPDATE COURSE MAP
// ============================================================

function updateCourseMapUI() {
    const introNode = document.getElementById("lesson-introduction");
    const varsNode = document.getElementById("lesson-variables");
    const typesNode = document.getElementById("lesson-dataTypes");
    const path1 = document.getElementById("path-1");
    const path2 = document.getElementById("path-2");

    if (!introNode && !varsNode && !typesNode) {
        return;
    }

    const setNodeStatus = (node, status) => {
        if (!node) return;
        node.classList.remove("completed", "available", "locked");
        node.classList.add(status);
    };

    // --------------------------------------------------------
    // 1. Introduction (Green if completed, Yellow if available)
    // --------------------------------------------------------
    if (completedLessons.includes("introduction")) {
        setNodeStatus(introNode, "completed");
        if (path1) path1.classList.add("completed");
    } else {
        setNodeStatus(introNode, "available");
        if (path1) path1.classList.remove("completed");
    }

    // --------------------------------------------------------
    // 2. Variables (Green if completed, Yellow if available, Red if locked)
    // --------------------------------------------------------
    if (completedLessons.includes("variables")) {
        setNodeStatus(varsNode, "completed");
        if (path2) path2.classList.add("completed");
    } else if (completedLessons.includes("introduction")) {
        setNodeStatus(varsNode, "available");
        if (path2) path2.classList.remove("completed");
    } else {
        setNodeStatus(varsNode, "locked");
        if (path2) path2.classList.remove("completed");
    }

    // --------------------------------------------------------
    // 3. Data Types (Green if completed, Yellow if available, Red if locked)
    // --------------------------------------------------------
    if (completedLessons.includes("dataTypes")) {
        setNodeStatus(typesNode, "completed");
    } else if (completedLessons.includes("variables")) {
        setNodeStatus(typesNode, "available");
    } else {
        setNodeStatus(typesNode, "locked");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateCourseMapUI);
} else {
    updateCourseMapUI();
}


// ============================================================
// URL / CURRENT LESSON
// ============================================================

const urlParams =
    new URLSearchParams(window.location.search);

const lessonId =
    urlParams.get("lesson");

const currentLesson =
    lessons[lessonId];


// ============================================================
// OPEN LESSON
// ============================================================

function openLesson(lesson) {

    if (
        lesson === "variables" &&
        !completedLessons.includes("introduction")
    ) {

        alert(
            "Debes completar la lección de 'Introducción a Python' primero para desbloquear esta."
        );

        return;
    }


    if (
        lesson === "dataTypes" &&
        !completedLessons.includes("variables")
    ) {

        alert(
            "Debes completar la lección de 'Variables en Python' primero para desbloquear esta."
        );

        return;
    }


    window.location.href =
        "lesson.html?lesson=" + lesson;
}


// ============================================================
// HEARTS / LIVES
// ============================================================

function resetLives() {

    lives = 3;

    const l1 =
        document.getElementById("life-1");

    const l2 =
        document.getElementById("life-2");

    const l3 =
        document.getElementById("life-3");


    if (l1) {
        l1.src = "assets/ui/heart-full.png";
    }

    if (l2) {
        l2.src = "assets/ui/heart-full.png";
    }

    if (l3) {
        l3.src = "assets/ui/heart-full.png";
    }
}


function loseLife() {

    if (lives <= 0) {
        return;
    }


    const heart =
        document.getElementById("life-" + lives);


    console.log("Heart:", heart);


    if (heart) {

        heart.src =
            "assets/ui/heart-empty.png";
    }


    lives--;


    console.log(
        "Lives remaining:",
        lives
    );


    if (lives === 0) {

        showGameOver();
    }
}


// ============================================================
// GAME OVER
// ============================================================

function showGameOver() {

    // Hide current question

    const question =
        document.querySelector(".question");

    if (question) {
        question.style.display = "none";
    }


    // Hide CHECK button

    const checkButton =
        document.querySelector(".check-button");

    if (checkButton) {
        checkButton.style.display = "none";
    }


    // Hide matching activity

    const matchingContainer =
        document.getElementById(
            "matching-container"
        );

    if (matchingContainer) {
        matchingContainer.style.display = "none";
    }


    // Hide code editor

    const codeEditor =
        document.getElementById(
            "code-editor"
        );

    if (codeEditor) {
        codeEditor.style.display = "none";
    }


    // Show game over

    const gameOverScreen =
        document.getElementById(
            "game-over-screen"
        );

    if (gameOverScreen) {

        gameOverScreen.style.display =
            "flex";
    }
}


// ============================================================
// START LESSON
// ============================================================

function startLesson() {

    if (!currentLesson) {

        console.error(
            "Lesson not found:",
            lessonId
        );

        return;
    }

    if (currentLesson.title) {
        document.title = `${currentLesson.title} - DuoProg`;
    }

    currentActivityIndex = 0;

    resetLives();

    showActivity();
}


// ============================================================
// SHOW CURRENT ACTIVITY
// ============================================================

function showActivity() {

    const activity =
        currentLesson.activities[
            currentActivityIndex
        ];


    if (!activity) {

        finishLesson();

        return;
    }


    // Make sure game-over screen is hidden

    const gameOverScreen =
        document.getElementById(
            "game-over-screen"
        );

    if (gameOverScreen) {

        gameOverScreen.style.display =
            "none";
    }


    // Update activity counter
    const qNum =
        document.getElementById(
            "question-number"
        );

    if (qNum && currentLesson) {
        qNum.textContent =
            `Paso ${currentActivityIndex + 1} de ${currentLesson.activities.length}`;
    }


    // Hide matching and code editor containers by default
    const matchingContainer =
        document.getElementById(
            "matching-container"
        );

    if (matchingContainer) {
        matchingContainer.style.display =
            "none";
    }

    const editor =
        document.getElementById(
            "code-editor"
        );

    if (editor) {
        editor.style.display =
            "none";
    }


    // Choose activity type

    if (activity.type === "info") {

        showInfo(activity);

    }

    else if (
        activity.type === "multiple-choice"
    ) {

        createQuestion(activity);

    }

    else if (
        activity.type === "matching"
    ) {

        showMatching(activity);

    }

    else if (
        activity.type === "code"
    ) {

        showCodeExercise(activity);

    }

    else if (
        activity.type === "debug"
    ) {

        showDebugExercise(activity);

    }

    else {

        console.error(
            "Unknown activity type:",
            activity.type
        );
    }
}


// ============================================================
// INFO ACTIVITY
// ============================================================

function showInfo(activity) {

    const infoScreen =
        document.getElementById(
            "info-screen"
        );

    const questionScreen =
        document.querySelector(
            ".question"
        );


    if (infoScreen) {

        infoScreen.style.display =
            "block";
    }


    if (questionScreen) {

        questionScreen.style.display =
            "none";
    }


    const title =
        document.getElementById(
            "info-title"
        );

    const text =
        document.getElementById(
            "info-text"
        );


    if (title) {
        title.textContent =
            activity.title;
    }


    if (text) {
        text.textContent =
            activity.text;
    }


    const nextButton =
        document.getElementById(
            "info-next"
        );


    if (nextButton) {

        nextButton.onclick =
            function () {

                if (infoScreen) {
                    infoScreen.style.display =
                        "none";
                }

                if (questionScreen) {
                    questionScreen.style.display =
                        "block";
                }

                nextActivity();
            };
    }
}


// ============================================================
// MULTIPLE CHOICE
// ============================================================

function createQuestion(questionData) {

    currentQuestion =
        questionData;

    selectedAnswer = null;

    const matchingContainer =
        document.getElementById(
            "matching-container"
        );

    if (matchingContainer) {
        matchingContainer.style.display =
            "none";
    }

    const editor =
        document.getElementById(
            "code-editor"
        );

    if (editor) {
        editor.style.display =
            "none";
    }

    const checkButton =
        document.querySelector(
            ".check-button"
        );

    const answersContainer =
        document.querySelector(
            ".answers"
        );


    if (checkButton) {
        checkButton.style.display =
            "block";
    }


    if (answersContainer) {
        answersContainer.style.display =
            "flex";
    }


    // Question text

    const questionText =
        document.getElementById(
            "question-text"
        );

    if (questionText) {

        questionText.textContent =
            questionData.question;
    }


    // Optional code block

    const codeBlock =
        document.getElementById(
            "question-code"
        );

    if (codeBlock) {

        if (questionData.code) {

            codeBlock.textContent =
                questionData.code;

            codeBlock.style.display =
                "block";

        } else {

            codeBlock.style.display =
                "none";
        }
    }


    // Answer buttons

    const answers =
        document.querySelectorAll(
            ".answer"
        );


    answers.forEach(
        (button, index) => {

            // Hide buttons if there are
            // fewer answers than buttons

            if (
                questionData.answers[index] ===
                undefined
            ) {

                button.style.display =
                    "none";

                return;
            }


            button.style.display =
                "block";

            button.textContent =
                questionData.answers[index];

            button.classList.remove(
                "selected"
            );


            button.onclick =
                function () {

                    selectedAnswer =
                        index;


                    answers.forEach(
                        answer => {

                            answer.classList.remove(
                                "selected"
                            );
                        }
                    );


                    button.classList.add(
                        "selected"
                    );
                };
        }
    );


    // CHECK button

    if (checkButton) {

        checkButton.onclick =
            checkAnswer;
    }
}


// ============================================================
// CHECK MULTIPLE CHOICE ANSWER
// ============================================================

function checkAnswer() {

    if (selectedAnswer === null) {

        return;
    }


    if (
        selectedAnswer ===
        currentQuestion.correct
    ) {

        console.log("Correct!");

        nextActivity();

    } else {

        console.log("Wrong!");

        loseLife();
    }
}


// ============================================================
// MATCHING ACTIVITY
// ============================================================

function showMatching(activity) {

    const editor =
        document.getElementById(
            "code-editor"
        );

    if (editor) {
        editor.style.display =
            "none";
    }

    const codeBlock =
        document.getElementById(
            "question-code"
        );

    if (codeBlock) {
        codeBlock.style.display =
            "none";
    }


    const questionScreen =
        document.querySelector(
            ".question"
        );

    if (questionScreen) {

        questionScreen.style.display =
            "block";
    }


    // Hide multiple-choice answers

    const answersContainer =
        document.querySelector(
            ".answers"
        );

    if (answersContainer) {

        answersContainer.style.display =
            "none";
    }


    // Hide CHECK button

    const checkButton =
        document.querySelector(
            ".check-button"
        );

    if (checkButton) {

        checkButton.style.display =
            "none";
    }


    // Question text

    const questionText =
        document.getElementById(
            "question-text"
        );

    if (questionText) {

        questionText.textContent =
            activity.question;
    }


    // Create / reuse matching container

    let matchingContainer =
        document.getElementById(
            "matching-container"
        );


    if (!matchingContainer) {

        matchingContainer =
            document.createElement(
                "div"
            );

        matchingContainer.id =
            "matching-container";


        if (questionScreen) {

            questionScreen.appendChild(
                matchingContainer
            );
        }
    }


    matchingContainer.innerHTML = "";

    matchingContainer.style.display =
        "flex";


    let selectedLeft = null;

    let matchedPairs = 0;


    // --------------------------------------------------------
    // Columns
    // --------------------------------------------------------

    const leftColumn =
        document.createElement(
            "div"
        );

    const rightColumn =
        document.createElement(
            "div"
        );


    leftColumn.className =
        "matching-column";

    rightColumn.className =
        "matching-column";


    // --------------------------------------------------------
    // LEFT SIDE
    // --------------------------------------------------------

    activity.pairs.forEach(
        (pair, index) => {

            const leftButton =
                document.createElement(
                    "button"
                );


            leftButton.className =
                "matching-option left-option";


            leftButton.textContent =
                pair.left;


            leftButton.dataset.index =
                index;


            leftButton.onclick =
                function () {

                    if (
                        leftButton.classList.contains(
                            "matched"
                        )
                    ) {

                        return;
                    }


                    document
                        .querySelectorAll(
                            ".left-option"
                        )
                        .forEach(
                            button => {

                                button.classList.remove(
                                    "selected"
                                );
                            }
                        );


                    selectedLeft =
                        index;


                    leftButton.classList.add(
                        "selected"
                    );
                };


            leftColumn.appendChild(
                leftButton
            );
        }
    );


    // --------------------------------------------------------
    // RIGHT SIDE
    // --------------------------------------------------------

    const shuffledPairs =
        [...activity.pairs];


    shuffledPairs.sort(
        () => Math.random() - 0.5
    );


    shuffledPairs.forEach(
        pair => {

            const rightButton =
                document.createElement(
                    "button"
                );


            rightButton.className =
                "matching-option right-option";


            rightButton.textContent =
                pair.right;


            const originalIndex =
                activity.pairs.indexOf(
                    pair
                );


            rightButton.dataset.index =
                originalIndex;


            rightButton.onclick =
                function () {

                    if (
                        rightButton.classList.contains(
                            "matched"
                        )
                    ) {

                        return;
                    }


                    if (
                        selectedLeft === null
                    ) {

                        return;
                    }


                    // Correct match

                    if (
                        selectedLeft ===
                        originalIndex
                    ) {

                        const leftButton =
                            document.querySelector(
                                `.left-option[data-index="${originalIndex}"]`
                            );


                        if (leftButton) {

                            leftButton.classList.remove(
                                "selected"
                            );

                            leftButton.classList.add(
                                "matched"
                            );
                        }


                        rightButton.classList.add(
                            "matched"
                        );


                        matchedPairs++;

                        selectedLeft =
                            null;


                        // All pairs completed

                        if (
                            matchedPairs ===
                            activity.pairs.length
                        ) {

                            console.log(
                                "Matching complete!"
                            );


                            setTimeout(
                                () => {

                                    nextActivity();

                                },
                                500
                            );
                        }

                    }

                    // Wrong match

                    else {

                        console.log(
                            "Wrong match!"
                        );


                        loseLife();


                        selectedLeft =
                            null;


                        document
                            .querySelectorAll(
                                ".left-option"
                            )
                            .forEach(
                                button => {

                                    button.classList.remove(
                                        "selected"
                                    );
                                }
                            );
                    }
                };


            rightColumn.appendChild(
                rightButton
            );
        }
    );


    // Add columns

    matchingContainer.appendChild(
        leftColumn
    );

    matchingContainer.appendChild(
        rightColumn
    );
}


// ============================================================
// CODE EXERCISE
// ============================================================

function showCodeExercise(activity) {

    const matchingContainer =
        document.getElementById(
            "matching-container"
        );


    if (matchingContainer) {

        matchingContainer.style.display =
            "none";
    }


    const questionScreen =
        document.querySelector(
            ".question"
        );


    if (questionScreen) {

        questionScreen.style.display =
            "block";
    }


    // Hide multiple choice

    const answersContainer =
        document.querySelector(
            ".answers"
        );


    if (answersContainer) {

        answersContainer.style.display =
            "none";
    }


    // Hide question code block

    const codeBlock =
        document.getElementById(
            "question-code"
        );


    if (codeBlock) {

        codeBlock.style.display =
            "none";
    }


    // Show CHECK

    const checkButton =
        document.querySelector(
            ".check-button"
        );


    if (checkButton) {

        checkButton.style.display =
            "block";
    }


    // Question

    const questionText =
        document.getElementById(
            "question-text"
        );


    if (questionText) {

        questionText.textContent =
            activity.question;
    }


    // Editor

    const editor =
        document.getElementById(
            "code-editor"
        );


    if (!editor) {
        return;
    }


    editor.style.display =
        "block";

    editor.value = "";


    // CHECK code

    if (checkButton) {

        checkButton.onclick =
            function () {

                const userCode =
                    editor.value.trim();

                let isMatch = false;

                if (Array.isArray(activity.expected)) {
                    isMatch = activity.expected.some(
                        exp => exp.trim() === userCode
                    );
                } else if (typeof activity.expected === "string") {
                    isMatch =
                        userCode === activity.expected.trim();
                }

                if (isMatch) {

                    console.log(
                        "Correct!"
                    );

                    nextActivity();

                } else {

                    console.log(
                        "Wrong!"
                    );

                    loseLife();
                }
            };
    }
}


// ============================================================
// DEBUG EXERCISE
// ============================================================

function showDebugExercise(activity) {

    console.log(
        "Debug exercise:",
        activity
    );

    // Debug activities can be implemented here later.
}


// ============================================================
// COMPLETE LESSON
// ============================================================

async function completeLesson() {

    // --------------------------------------------------------
    // Hide lesson UI
    // --------------------------------------------------------

    const infoScreen =
        document.getElementById(
            "info-screen"
        );

    if (infoScreen) {
        infoScreen.style.display =
            "none";
    }


    const questionEl =
        document.querySelector(
            ".question"
        );

    if (questionEl) {
        questionEl.style.display =
            "none";
    }


    const checkBtn =
        document.querySelector(
            ".check-button"
        );

    if (checkBtn) {
        checkBtn.style.display =
            "none";
    }


    const matchingContainer =
        document.getElementById(
            "matching-container"
        );

    if (matchingContainer) {
        matchingContainer.style.display =
            "none";
    }


    const codeEditor =
        document.getElementById(
            "code-editor"
        );

    if (codeEditor) {
        codeEditor.style.display =
            "none";
    }


    // --------------------------------------------------------
    // Completion screen
    // --------------------------------------------------------

    const completionScreen =
        document.getElementById(
            "completion-screen"
        );


    const xpRewardElem =
        document.querySelector(
            ".xp-reward"
        );


    let subtitleElem =
        document.getElementById(
            "completion-subtitle"
        );


    // Create subtitle if needed

    if (!subtitleElem) {

        subtitleElem =
            document.createElement(
                "p"
            );


        subtitleElem.id =
            "completion-subtitle";


        subtitleElem.style.color =
            "#969baa";


        subtitleElem.style.fontSize =
            "14px";


        subtitleElem.style.marginTop =
            "-15px";


        subtitleElem.style.marginBottom =
            "25px";


        if (
            xpRewardElem &&
            xpRewardElem.parentNode
        ) {

            xpRewardElem.parentNode.insertBefore(
                subtitleElem,
                xpRewardElem.nextSibling
            );
        }
    }


    const currentKey =
        lessonId;


    // --------------------------------------------------------
    // First completion?
    // --------------------------------------------------------

    const isFirstTime =
        currentKey &&
        !completedLessons.includes(
            currentKey
        );


    if (isFirstTime) {

        // Give XP

        userXP += 25;


        completedLessons.push(
            currentKey
        );


        // UI

        if (xpRewardElem) {

            xpRewardElem.textContent =
                "+25 XP";

            xpRewardElem.style.color =
                "var(--accent)";
        }


        if (subtitleElem) {

            subtitleElem.textContent =
                "¡Felicidades! Ganaste 25 XP por completar esta lección por primera vez.";
        }


        // ----------------------------------------------------
        // Logged-in user
        // ----------------------------------------------------

        if (currentUser) {

            try {

                const progresoRef =
                    doc(
                        db,
                        "progreso",
                        currentUser.uid
                    );


                const snap =
                    await getDoc(
                        progresoRef
                    );


                let currentXP = 0;

                let currentWeeklyXP = 0;

                let existingCompleted = [];


                if (snap.exists()) {

                    const data =
                        snap.data();


                    currentXP =
                        Number(data.xp) || 0;


                    currentWeeklyXP =
                        Number(
                            data.weeklyXP !== undefined
                                ? data.weeklyXP
                                : data.xp
                        ) || 0;


                    existingCompleted =
                        data.cursos?.python?.completedLessons || [];
                }


                // Avoid duplicates

                if (
                    !existingCompleted.includes(
                        currentKey
                    )
                ) {

                    existingCompleted.push(
                        currentKey
                    );
                }


                // Save to Firestore

                await updateDoc(
                    progresoRef,
                    {

                        xp:
                            currentXP + 25,

                        weeklyXP:
                            currentWeeklyXP + 25,

                        "cursos.python.completedLessons":
                            existingCompleted
                    }
                );


                // Update cache

                localStorage.setItem(
                    `duoprog_completed_${currentUser.uid}`,
                    JSON.stringify(
                        existingCompleted
                    )
                );


                localStorage.setItem(
                    `duoprog_xp_${currentUser.uid}`,
                    (
                        currentXP + 25
                    ).toString()
                );


            } catch (err) {

                console.error(
                    "Error guardando progreso en Firestore:",
                    err
                );
            }


        }

        // ----------------------------------------------------
        // Guest
        // ----------------------------------------------------

        else {

            localStorage.setItem(
                "duoprog_completed_guest",
                JSON.stringify(
                    completedLessons
                )
            );


            localStorage.setItem(
                "duoprog_xp_guest",
                userXP.toString()
            );
        }


    }

    // --------------------------------------------------------
    // Already completed
    // --------------------------------------------------------

    else {

        if (xpRewardElem) {

            xpRewardElem.textContent =
                "+0 XP";

            xpRewardElem.style.color =
                "#969baa";
        }


        if (subtitleElem) {

            subtitleElem.textContent =
                "Lección ya completada anteriormente. Solo ganas experiencia la primera vez.";
        }
    }


    // --------------------------------------------------------
    // Show completion screen
    // --------------------------------------------------------

    if (completionScreen) {

        completionScreen.style.display =
            "flex";
    }


    console.log(
        "XP actual:",
        userXP,

        "¿Primera vez completada?:",
        isFirstTime
    );
}


// ============================================================
// NEXT ACTIVITY
// ============================================================

function nextActivity() {

    currentActivityIndex++;

    showActivity();
}


// ============================================================
// FINISH LESSON
// ============================================================

function finishLesson() {

    completeLesson();
}


// ============================================================
// RETRY BUTTON
// ============================================================

const retryBtn =
    document.getElementById(
        "retry-button"
    );


if (retryBtn) {

    retryBtn.onclick =
        function () {

            resetLives();


            const gameOverScreen =
                document.getElementById(
                    "game-over-screen"
                );


            if (gameOverScreen) {

                gameOverScreen.style.display =
                    "none";
            }


            startLesson();
        };
}


// ============================================================
// EXIT BUTTON
// ============================================================

const exitBtn =
    document.getElementById(
        "exit-button"
    );


if (exitBtn) {

    exitBtn.onclick =
        function () {

            window.location.href =
                "index.html";
        };
}


// ============================================================
// GO BACK TO COURSE
// ============================================================

function goBackToCourse() {

    window.location.href =
        "index.html";
}


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

// Needed for inline onclick="" buttons

window.openLesson =
    openLesson;

window.checkAnswer =
    checkAnswer;

window.goBackToCourse =
    goBackToCourse;

window.nextActivity =
    nextActivity;

window.finishLesson =
    finishLesson;

window.completeLesson =
    completeLesson;


// ============================================================
// INITIALIZE LESSON
// ============================================================

if (currentLesson) {

    startLesson();
}

