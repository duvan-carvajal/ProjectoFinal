import { auth, db } from './src/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

let lives = 3;
let userXP = 0;
document.getElementById("retry-button").onclick = function() {
let completedLessons = [];
let currentUser = null;
let progressLoaded = false;

    lives = 3;
// Cargar progreso del usuario desde Firestore y caché local
async function loadProgress(user) {
    currentUser = user;
    if (user) {
        try {
            const progresoRef = doc(db, "progreso", user.uid);
            const snap = await getDoc(progresoRef);
            if (snap.exists()) {
                const data = snap.data();
                userXP = Number(data.xp) || 0;
                completedLessons = data.cursos?.python?.completedLessons || [];
                localStorage.setItem(`duoprog_completed_${user.uid}`, JSON.stringify(completedLessons));
                localStorage.setItem(`duoprog_xp_${user.uid}`, userXP.toString());
            }
        } catch (err) {
            console.warn("No se pudo conectar a Firestore, usando caché local:", err);
            const cached = localStorage.getItem(`duoprog_completed_${user.uid}`);
            if (cached) completedLessons = JSON.parse(cached);
            const cachedXP = localStorage.getItem(`duoprog_xp_${user.uid}`);
            if (cachedXP) userXP = Number(cachedXP) || 0;
        }
    } else {
        const cached = localStorage.getItem('duoprog_completed_guest');
        if (cached) completedLessons = JSON.parse(cached);
        const cachedXP = localStorage.getItem('duoprog_xp_guest');
        if (cachedXP) userXP = Number(cachedXP) || 0;
    }
    progressLoaded = true;
    updateCourseMapUI();
}

onAuthStateChanged(auth, async (user) => {
    await loadProgress(user);
});

    // Restore hearts
    document.getElementById("life-1").src =
        "assets/ui/heart-full.png";
// Actualizar el mapa de cursos en index.html dinámicamente según el progreso
function updateCourseMapUI() {
    const introNode = document.getElementById("lesson-introduction");
    const varsNode = document.getElementById("lesson-variables");
    const typesNode = document.getElementById("lesson-dataTypes");

    document.getElementById("life-2").src =
        "assets/ui/heart-full.png";
    if (!introNode && !varsNode && !typesNode) return;

    document.getElementById("life-3").src =
        "assets/ui/heart-full.png";
    // Introducción
    if (completedLessons.includes("introduction")) {
        introNode?.classList.add("completed");
        varsNode?.classList.remove("locked");
    } else {
        introNode?.classList.remove("completed");
        varsNode?.classList.add("locked");
    }

    // Variables
    if (completedLessons.includes("variables")) {
        varsNode?.classList.add("completed");
        typesNode?.classList.remove("locked");
    } else {
        varsNode?.classList.remove("completed");
        typesNode?.classList.add("locked");
    }

    // Hide game over
    document.getElementById("game-over-screen").style.display =
        "none";
    // Data Types
    if (completedLessons.includes("dataTypes")) {
        typesNode?.classList.add("completed");
    }
}

// Inicialización segura de botones (solo si existen en el DOM)
const retryBtn = document.getElementById("retry-button");
if (retryBtn) {
    retryBtn.onclick = function() {
        lives = 3;
        const l1 = document.getElementById("life-1");
        if (l1) l1.src = "assets/ui/heart-full.png";
        const l2 = document.getElementById("life-2");
        if (l2) l2.src = "assets/ui/heart-full.png";
        const l3 = document.getElementById("life-3");
        if (l3) l3.src = "assets/ui/heart-full.png";

    // Start lesson again
    startLesson();
        const gameOverScreen = document.getElementById("game-over-screen");
        if (gameOverScreen) gameOverScreen.style.display = "none";

};
document.getElementById("exit-button").onclick = function() {
        startLesson();
    };
}

    window.location.href = "index.html";
const exitBtn = document.getElementById("exit-button");
if (exitBtn) {
    exitBtn.onclick = function() {
        window.location.href = "index.html";
    };
}

};

const lessons = {

    introduction: {

        title: "Introduction",

        activities: [

            {
                type: "info",

                title: "What is Programming?",

                text: "Programming is the process of giving a computer instructions to perform tasks. These instructions are written using programming languages such as Python, JavaScript, Java, and C++."
            },

            {
                type: "multiple-choice",

                question: "What is programming?",

                answers: [
                    "Designing computer hardware",
                    "Giving a computer instructions to perform tasks",
                    "Using the internet",
                    "Installing applications"
                ],

                correct: 1
            },

            {
                type: "multiple-choice",

                question: "What does this code do?",

                code: 'print("Hello!")',

                answers: [
                    "It stores Hello! in a variable",
                    "It displays Hello!",
                    "It creates a new program",
                    "It deletes text"
                ],

                correct: 1
            },

            {
                type: "matching",

                question: "Match each concept with its description.",

                pairs: [
                    {
                        left: "Program",
                        right: "A set of instructions"
                    },
                    {
                        left: "Programming",
                        right: "Creating instructions for a computer"
                    },
                    {
                        left: "Python",
                        right: "A programming language"
                    }
                ]
            },

            {
                type: "code",

                question: 'Write code that displays "Hello, world!"',

                expected: 'print("Hello, world!")'
            }

        ]
    },


    variables: {

    title: "Variables",

    activities: [

        {
            type: "info",

            title: "What are Variables?",

            text: "Variables are used to store information in a program. Each variable has a name and a value, and that value can be used or changed while the program runs."
        },

        {
            type: "multiple-choice",

            question: "Which line creates a variable called age?",

            answers: [
                "age = 18",
                "print(age)",
                "age == 18",
                "variable age"
            ],

            correct: 0
        },

        {
            type: "multiple-choice",

            question: "What value is stored in the variable score?",

            code: "score = 100",

            answers: [
                "score",
                "100",
                "0",
                "It has no value"
            ],

            correct: 1
        },

        {
            type: "matching",

            question: "Match each concept with its description.",

            pairs: [
                {
                    left: "Variable",
                    right: "A named place for storing information"
                },
                {
                    left: "Value",
                    right: "The information stored in a variable"
                },
                {
                    left: "Assignment",
                    right: "Giving a value to a variable"
                }
            ]
        },

        {
            type: "code",

            question: 'Create a variable called "name" and give it the value "Alex".',

            expected: 'name = "Alex"'
        }

    ]

    },
    dataTypes: {

    title: "Data Types",

    activities: [

        {
            type: "info",

            title: "What are Data Types?",

            text: "A data type describes what kind of information a value represents. Python has several built-in data types, including strings for text, integers for whole numbers, floats for decimal numbers, and booleans for true or false values."
        },

        {
            type: "multiple-choice",

            question: "Which data type is used to store text?",

            answers: [
                "int",
                "float",
                "str",
                "bool"
            ],

            correct: 2
        },

        {
            type: "multiple-choice",

            question: "What data type is the value 42?",

            answers: [
                "str",
                "int",
                "float",
                "bool"
            ],

            correct: 1
        },

        {
            type: "multiple-choice",

            question: "What data type is the value 3.14?",

            answers: [
                "int",
                "str",
                "float",
                "bool"
            ],

            correct: 2
        },

        {
            type: "matching",

            question: "Match each data type with an example.",

            pairs: [
                {
                    left: "str",
                    right: '"Hello"'
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

            question: 'Create a variable called "age" and give it the integer value 19.',

            expected: "age = 19"
        }

    ]
}

};
function loseLife() {

    if (lives <= 0) {
        return;
    }

    const heart = document.getElementById("life-" + lives);
    console.log("Heart:", heart);
    console.log("Image path:", heart.src);

    if (heart) {
        heart.src = "assets/ui/heart-empty.png";
    }

    lives--;

    console.log("Lives remaining:", lives);

    if (lives === 0) {

        showGameOver();

    }

}
function showGameOver() {

    // Hide the current activity
    document.querySelector(".question").style.display = "none";

    document.querySelector(".check-button").style.display = "none";


    // Hide matching activity if it exists
    const matchingContainer =
        document.getElementById("matching-container");

    if (matchingContainer) {
        matchingContainer.style.display = "none";
    }


    // Hide code editor
    const codeEditor =
        document.getElementById("code-editor");

    if (codeEditor) {
        codeEditor.style.display = "none";
    }


    // Show game over screen
    const gameOverScreen =
        document.getElementById("game-over-screen");

    gameOverScreen.style.display = "flex";

}
function openLesson(lesson) {

    if (lesson === 'variables' && !completedLessons.includes('introduction')) {
        alert("Debes completar la lección de 'Introduction' primero para desbloquear esta.");
        return;
    }
    if (lesson === 'dataTypes' && !completedLessons.includes('variables')) {
        alert("Debes completar la lección de 'Variables' primero para desbloquear esta.");
        return;
    }
    window.location.href = "lesson.html?lesson=" + lesson;

}



const urlParams = new URLSearchParams(window.location.search);

const lessonId = urlParams.get("lesson");

const currentLesson = lessons[lessonId];




let currentActivityIndex = 0;

let selectedAnswer = null;

let currentQuestion = null;




function startLesson() {

    if (!currentLesson) {

        console.error("Lesson not found:", lessonId);

        return;
    }

    currentActivityIndex = 0;

    showActivity();

}




function showActivity() {

    const activity = currentLesson.activities[currentActivityIndex];

    if (!activity) {

        finishLesson();

        return;
    }


    if (activity.type === "info") {

        showInfo(activity);

    }

    else if (activity.type === "multiple-choice") {

        createQuestion(activity);

    }

    else if (activity.type === "matching") {

        showMatching(activity);

    }

    else if (activity.type === "code") {

        showCodeExercise(activity);

    }

    else if (activity.type === "debug") {

        showDebugExercise(activity);

    }

    else {

        console.error("Unknown activity type:", activity.type);

    }

}




function showInfo(activity) {

    const infoScreen = document.getElementById("info-screen");

    const questionScreen = document.querySelector(".question");

    infoScreen.style.display = "block";

    questionScreen.style.display = "none";

    document.getElementById("info-title").textContent = activity.title;

    document.getElementById("info-text").textContent = activity.text;

    document.getElementById("info-next").onclick = function() {

        infoScreen.style.display = "none";

        questionScreen.style.display = "block";

        nextActivity();

    };

}

// Preguntas

function createQuestion(questionData) {
    document.querySelector(".check-button").style.display = "block";
    document.querySelector(".answers").style.display = "flex";

    currentQuestion = questionData;

    selectedAnswer = null;


    document.getElementById("question-text").textContent =
        questionData.question;

    const codeBlock = document.getElementById("question-code");

    if (questionData.code) {
       codeBlock.textContent = questionData.code;
       codeBlock.style.display = "block";
    } else {
       codeBlock.style.display = "none";
    }
    const answers = document.querySelectorAll(".answer");


    answers.forEach((button, index) => {

        button.textContent = questionData.answers[index];

        button.classList.remove("selected");


        button.onclick = function() {

            selectedAnswer = index;


            answers.forEach(answer => {

                answer.classList.remove("selected");

            });


            button.classList.add("selected");

        };

    });

}




function checkAnswer() {

    if (selectedAnswer === null) {

        return;
    }


    if (selectedAnswer === currentQuestion.correct) {

        console.log("Correct!");

        nextActivity();

    }

    else {

        console.log("Wrong!");
        loseLife();

    }

}


 // Matching
function showMatching(activity) {
    
    const codeBlock = document.getElementById("question-code");

    if (codeBlock) {
        codeBlock.style.display = "none";
    }

    const questionScreen = document.querySelector(".question");

    questionScreen.style.display = "block";


    // Hide multiple-choice answers
    const answersContainer = document.querySelector(".answers");

    answersContainer.style.display = "none";


    // Hide CHECK
    document.querySelector(".check-button").style.display = "none";


    // Question text
    document.getElementById("question-text").textContent = activity.question;


    // Create matching container
    let matchingContainer = document.getElementById("matching-container");

    if (!matchingContainer) {

        matchingContainer = document.createElement("div");

        matchingContainer.id = "matching-container";

        questionScreen.appendChild(matchingContainer);

    }


    matchingContainer.innerHTML = "";
    matchingContainer.style.display = "flex";



    let selectedLeft = null;

    let matchedPairs = 0;


    // Create columns
    const leftColumn = document.createElement("div");

    const rightColumn = document.createElement("div");

    leftColumn.className = "matching-column";

    rightColumn.className = "matching-column";


    // ==========================
    // LEFT SIDE
    // ==========================

    activity.pairs.forEach((pair, index) => {

        const leftButton = document.createElement("button");

        leftButton.className = "matching-option left-option";

        leftButton.textContent = pair.left;


        // Store which pair this belongs to
        leftButton.dataset.index = index;


        leftButton.onclick = function() {

            if (leftButton.classList.contains("matched")) {
                return;
            }


            // Remove previous selection
            document
                .querySelectorAll(".left-option")
                .forEach(button => {
                    button.classList.remove("selected");
                });


            selectedLeft = index;

            leftButton.classList.add("selected");

        };


        leftColumn.appendChild(leftButton);

    });


    // ==========================
    // RIGHT SIDE
    // ==========================

    // Make a copy so we DON'T modify activity.pairs
    const shuffledPairs = [...activity.pairs];


    // Shuffle the copy
    shuffledPairs.sort(() => Math.random() - 0.5);


    shuffledPairs.forEach(pair => {

        const rightButton = document.createElement("button");

        rightButton.className = "matching-option right-option";

        rightButton.textContent = pair.right;


        // Find the original pair this belongs to
        const originalIndex = activity.pairs.indexOf(pair);

        rightButton.dataset.index = originalIndex;


        rightButton.onclick = function() {

            if (rightButton.classList.contains("matched")) {
                return;
            }


            if (selectedLeft === null) {
                return;
            }


            // Check if the selected left item
            // belongs to this right item
            if (selectedLeft === originalIndex) {

                const leftButton = document.querySelector(
                    `.left-option[data-index="${originalIndex}"]`
                );


                // Correct match
                leftButton.classList.remove("selected");

                leftButton.classList.add("matched");

                rightButton.classList.add("matched");


                matchedPairs++;

                selectedLeft = null;


                // Finished all pairs
                if (matchedPairs === activity.pairs.length) {

                    console.log("Matching complete!");


                    setTimeout(() => {

                        nextActivity();

                    }, 500);

                }

            }

            else {

                // Wrong match
                console.log("Wrong match!");
                
                loseLife();

                selectedLeft = null;
                


                document
                    .querySelectorAll(".left-option")
                    .forEach(button => {
                        button.classList.remove("selected");
                    });

            }

        };


        rightColumn.appendChild(rightButton);

    });


    matchingContainer.appendChild(leftColumn);

    matchingContainer.appendChild(rightColumn);

}



function showCodeExercise(activity) {
    const matchingContainer = document.getElementById("matching-container");

    if (matchingContainer) {
        matchingContainer.style.display = "none";
    }

    const questionScreen = document.querySelector(".question");

    questionScreen.style.display = "block";


    // Hide multiple-choice stuff
    const answersContainer = document.querySelector(".answers");

    answersContainer.style.display = "none";


    // Hide code display from "what does this code do?"
    const codeBlock = document.getElementById("question-code");

    if (codeBlock) {
        codeBlock.style.display = "none";
    }


    // Show CHECK
    document.querySelector(".check-button").style.display = "block";


    // Show question
    document.getElementById("question-text").textContent =
        activity.question;


    // Show editor
    const editor = document.getElementById("code-editor");

    editor.style.display = "block";

    editor.value = "";


    // Make CHECK check this code
    document.querySelector(".check-button").onclick = function() {

        const userCode = editor.value.trim();

        const expectedCode = activity.expected.trim();


        if (userCode === expectedCode) {

            console.log("Correct!");

            nextActivity();

        }

        else {

            console.log("Wrong!");
            loseLife();

        }

    };

}



function showDebugExercise(activity) {

    console.log("Debug exercise:", activity);


}

function completeLesson() {
    userXP += 25;
async function completeLesson() {
    const infoScreen = document.getElementById("info-screen");
    if (infoScreen) infoScreen.style.display = "none";
    const questionEl = document.querySelector(".question");
    if (questionEl) questionEl.style.display = "none";
    const checkBtn = document.querySelector(".check-button");
    if (checkBtn) checkBtn.style.display = "none";

    document.getElementById("info-screen").style.display = "none";
    document.querySelector(".question").style.display = "none";
    document.querySelector(".check-button").style.display = "none";
    const completionScreen = document.getElementById("completion-screen");
    const xpRewardElem = document.querySelector(".xp-reward");
    let subtitleElem = document.getElementById("completion-subtitle");
    if (!subtitleElem) {
        subtitleElem = document.createElement("p");
        subtitleElem.id = "completion-subtitle";
        subtitleElem.style.color = "#969baa";
        subtitleElem.style.fontSize = "14px";
        subtitleElem.style.marginTop = "-15px";
        subtitleElem.style.marginBottom = "25px";
        if (xpRewardElem && xpRewardElem.parentNode) {
            xpRewardElem.parentNode.insertBefore(subtitleElem, xpRewardElem.nextSibling);
        }
    }

    document.getElementById("completion-screen").style.display = "flex";
    const currentKey = lessonId;
    const isFirstTime = currentKey && !completedLessons.includes(currentKey);

    console.log("XP:", userXP);
}
    if (isFirstTime) {
        // SOLO SE GANA XP LA PRIMERA VEZ
        userXP += 25;
        completedLessons.push(currentKey);

function goBackToCourse() {
    history.back();
}
        if (xpRewardElem) {
            xpRewardElem.textContent = "+25 XP";
            xpRewardElem.style.color = "var(--accent)";
        }
        if (subtitleElem) {
            subtitleElem.textContent = "¡Felicidades! Ganaste 25 XP por completar esta lección por primera vez.";
        }

        // Guardar progreso en Firestore si hay usuario conectado
        if (currentUser) {
            try {
                const progresoRef = doc(db, "progreso", currentUser.uid);
                const snap = await getDoc(progresoRef);
                let currentXP = 0;
                let currentWeeklyXP = 0;
                let existingCompleted = [];

                if (snap.exists()) {
                    const d = snap.data();
                    currentXP = Number(d.xp) || 0;
                    currentWeeklyXP = Number(d.weeklyXP !== undefined ? d.weeklyXP : d.xp) || 0;
                    existingCompleted = d.cursos?.python?.completedLessons || [];
                }

function nextActivity() {
                if (!existingCompleted.includes(currentKey)) {
                    existingCompleted.push(currentKey);
                }

    currentActivityIndex++;
                await updateDoc(progresoRef, {
                    xp: currentXP + 25,
                    weeklyXP: currentWeeklyXP + 25,
                    "cursos.python.completedLessons": existingCompleted
                });

    showActivity();
                localStorage.setItem(`duoprog_completed_${currentUser.uid}`, JSON.stringify(existingCompleted));
                localStorage.setItem(`duoprog_xp_${currentUser.uid}`, (currentXP + 25).toString());
            } catch (err) {
                console.error("Error guardando progreso en Firestore:", err);
            }
        } else {
            localStorage.setItem('duoprog_completed_guest', JSON.stringify(completedLessons));
            localStorage.setItem('duoprog_xp_guest', userXP.toString());
        }
    } else {
        // LECCIÓN REPETIDA: NUNCA VUELVE A GANAR XP
        if (xpRewardElem) {
            xpRewardElem.textContent = "+0 XP";
            xpRewardElem.style.color = "#969baa";
        }
        if (subtitleElem) {
            subtitleElem.textContent = "Lección ya completada anteriormente. Solo ganas experiencia la primera vez.";
        }
    }

    if (completionScreen) {
        completionScreen.style.display = "flex";
    }

    console.log("XP actual:", userXP, "¿Primera vez completada?:", isFirstTime);
}

function goBackToCourse() {
    window.location.href = "index.html";
}

function nextActivity() {
    currentActivityIndex++;
    showActivity();
}

function finishLesson() {

    completeLesson();

}

// Exportar funciones al objeto global window para botones inline onclick
window.openLesson = openLesson;
window.checkAnswer = checkAnswer;
window.goBackToCourse = goBackToCourse;
window.nextActivity = nextActivity;
window.finishLesson = finishLesson;
window.completeLesson = completeLesson;


if (currentLesson) {

    startLesson();

}