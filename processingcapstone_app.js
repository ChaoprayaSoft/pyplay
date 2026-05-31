// --- Processing / p5.js Lesson Database ---
const lessons = [
    {
        title: "Mouse Following Easing",
        difficulty: "Advanced",
        topic: "Mouse Following",
        concept: "To make an object follow the mouse smoothly, we can use <code>lerp()</code> (Linear Interpolation). It calculates a number between two numbers at a specific increment.",
        example: "x = lerp(x, mouseX, 0.05);\ny = lerp(y, mouseY, 0.05);",
        task: "Create an ellipse at <code>(x, y)</code> that smoothly follows the cursor. Inside <code>draw()</code>, update <code>x</code> and <code>y</code> using <code>lerp(x, mouseX, 0.1)</code> and <code>lerp(y, mouseY, 0.1)</code> before drawing.",
        hint: "Don't forget to declare <code>let x = 200, y = 200;</code> outside setup, and use <code>x = lerp(x, mouseX, 0.1);</code> inside draw.",
        initialCode: "let x = 200;\nlet y = 200;\n\nfunction setup() {\n  createCanvas(400, 400);\n  noStroke();\n  fill(255, 100, 100);\n}\n\nfunction draw() {\n  background(220);\n  \n  // Update x and y with lerp, then draw ellipse(x, y, 30, 30)\n  \n}\n",
        validate: (state, logs, code) => {
            return /lerp\s*\(\s*x\s*,\s*mouseX/.test(code) && /lerp\s*\(\s*y\s*,\s*mouseY/.test(code) && /ellipse\s*\(\s*x\s*,\s*y/.test(code);
        }
    },
    {
        title: "Physics: Gravity & Bouncing",
        difficulty: "Advanced",
        topic: "Physic",
        concept: "A simple physics engine tracks position (y), velocity (vy), and applies gravity (acceleration). When the ball hits the floor, velocity reverses and dampens.",
        example: "vy += gravity;\ny += vy;\nif (y > height) { y = height; vy *= -0.8; }",
        task: "Implement gravity! Update <code>vy += gravity</code> and <code>y += vy</code>. Add a check: if <code>y > 380</code>, set <code>y = 380</code> and reverse/dampen velocity <code>vy *= -0.8</code>.",
        hint: "Add the gravity to velocity, then velocity to position. Make sure your if statement uses <code>y > 380</code> to account for the ball's radius.",
        initialCode: "let y = 50;\nlet vy = 0;\nlet gravity = 0.5;\n\nfunction setup() {\n  createCanvas(400, 400);\n  fill(50, 150, 255);\n}\n\nfunction draw() {\n  background(220);\n  \n  // Apply physics here\n  \n  \n  ellipse(200, y, 40, 40);\n}\n",
        validate: (state, logs, code) => {
            return /vy\s*\+=\s*gravity/.test(code) && /y\s*\+=\s*vy/.test(code) && /vy\s*\*\=\s*-?0\.8/.test(code);
        }
    },
    {
        title: "Articulated Robot Arm",
        difficulty: "Advanced",
        topic: "Robot",
        concept: "To draw a connected robot arm, we use <code>translate()</code> and <code>rotate()</code>. This moves and rotates the entire coordinate system, making it easy to draw connected joints.",
        example: "translate(200, 200);\nrotate(angle);\nrect(0, 0, 100, 20);",
        task: "Draw a robot arm. Use <code>translate(200, 200)</code>, then <code>rotate(mouseX * 0.01)</code>, and draw a <code>rect(0, -10, 150, 20)</code>. (The canvas state is automatically isolated in p5!).",
        hint: "Call <code>translate</code>, then <code>rotate</code>, then <code>rect</code> in that exact order inside <code>draw()</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  fill(100);\n}\n\nfunction draw() {\n  background(220);\n  \n  // Translate, rotate by mouseX * 0.01, and draw rectangle\n  \n}\n",
        validate: (state, logs, code) => {
            return /translate\s*\(\s*200\s*,\s*200\s*\)/.test(code) && /rotate\s*\(\s*mouseX/.test(code) && /rect\s*\(\s*0\s*,\s*-10\s*,\s*150\s*,\s*20\s*\)/.test(code);
        }
    },
    {
        title: "Sine Wave Animation",
        difficulty: "Advanced",
        topic: "Animation",
        concept: "The <code>sin()</code> function produces a smooth oscillation between -1 and 1. We can use this to create perfectly smooth, looping animations.",
        example: "let y = 200 + sin(frameCount * 0.05) * 50;\nellipse(200, y, 40, 40);",
        task: "Animate a floating orb! Calculate <code>let y = 200 + sin(frameCount * 0.05) * 100;</code> and draw an <code>ellipse(200, y, 50, 50)</code>.",
        hint: "Use the built-in <code>frameCount</code> variable inside the <code>sin()</code> function.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  noStroke();\n  fill(255, 200, 50);\n}\n\nfunction draw() {\n  background(50, 50, 80);\n  \n  // Calculate y using sin() and draw ellipse\n  \n}\n",
        validate: (state, logs, code) => {
            return /sin\s*\(\s*frameCount/.test(code) && /ellipse\s*\(\s*200\s*,\s*y/.test(code);
        }
    },
    {
        title: "Canvas-Drawn GUI Slider",
        difficulty: "Advanced",
        topic: "Gui",
        concept: "Real GUI development means building controls from scratch! We can draw a slider track with <code>rect()</code>, a draggable handle with <code>ellipse()</code>, and convert the handle's x-position to a value using <code>map(handleX, trackLeft, trackRight, minVal, maxVal)</code>.",
        example: "// map() converts a range to another range:\nlet val = map(handleX, 50, 350, 10, 200);\n\n// mouseDragged() fires while dragging:\nfunction mouseDragged() {\n  handleX = constrain(mouseX, 50, 350);\n}",
        task: "Complete the <code>mouseDragged()</code> function: set <code>handleX = constrain(mouseX, 50, 350);</code>. In <code>draw()</code>, calculate <code>let sz = map(handleX, 50, 350, 10, 200);</code> and draw <code>ellipse(200, 180, sz, sz)</code>.",
        hint: "<code>constrain()</code> keeps handleX between 50 and 350 so the handle stays on the track. <code>map()</code> converts that range to 10-200 for the ellipse size.",
        initialCode: "let handleX = 200;\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(230);\n  \n  // Draw slider track\n  fill(180);\n  noStroke();\n  rect(50, 360, 300, 8, 4);\n  \n  // Draw handle\n  fill(50, 130, 240);\n  ellipse(handleX, 364, 22, 22);\n  \n  // Map handleX to a size value and draw ellipse\n  // let sz = map(handleX, 50, 350, 10, 200);\n  // ellipse(200, 180, sz, sz);\n  \n}\n\nfunction mouseDragged() {\n  // Set handleX = constrain(mouseX, 50, 350);\n  \n}\n",
        validate: (state, logs, code) => {
            return /constrain\s*\(\s*mouseX\s*,\s*50\s*,\s*350\s*\)/.test(code) && /map\s*\(\s*handleX\s*,\s*50\s*,\s*350\s*,\s*10\s*,\s*200\s*\)/.test(code) && /ellipse\s*\(\s*200\s*,\s*180/.test(code);
        }
    },
    {
        title: "Particle System Emitter",
        difficulty: "Advanced",
        topic: "Particle System",
        concept: "A particle system uses an array to track many objects at once. By pushing new objects into the array and looping through it, we can create effects like fire or smoke.",
        example: "particles.push({x: 200, y: 200});\nfor(let p of particles) { p.y--; rect(p.x, p.y, 5, 5); }",
        task: "Create a spark emitter! Inside <code>draw()</code>, push a new particle: <code>particles.push({x: mouseX, y: mouseY});</code>. Then loop through <code>particles</code>, subtract 2 from <code>p.y</code>, and draw a <code>circle(p.x, p.y, 10)</code>.",
        hint: "Use a <code>for (let p of particles)</code> loop. Remember to do <code>p.y -= 2;</code> before drawing the circle.",
        initialCode: "let particles = [];\n\nfunction setup() {\n  createCanvas(400, 400);\n  noStroke();\n  fill(255, 150, 0, 150);\n}\n\nfunction draw() {\n  background(30);\n  \n  // Push new particle at mouse location\n  \n  \n  // Loop through particles, update y, draw circle\n  \n}\n",
        validate: (state, logs, code) => {
            return /particles\.push/.test(code) && /for\s*\(\s*let\s+p\s+of\s+particles/.test(code) && /circle\s*\(\s*p\.x\s*,\s*p\.y\s*,\s*10\s*\)/.test(code);
        }
    },
    {
        title: "Generative Art: Recursive Tree",
        difficulty: "Advanced",
        topic: "Generative Art",
        concept: "Recursion is when a function calls itself. It's fantastic for generating natural fractal patterns, like the branches of a tree.",
        example: "function branch(len) {\n  line(0, 0, 0, -len);\n  translate(0, -len);\n  if (len > 4) { branch(len * 0.67); }\n}",
        task: "Complete the <code>branch(len)</code> function. Draw a line from <code>(0,0)</code> to <code>(0, -len)</code>, then <code>translate(0, -len)</code>. If <code>len > 10</code>, call <code>branch(len * 0.7)</code>.",
        hint: "Be sure to put the recursive <code>branch()</code> call inside the <code>if (len > 10)</code> check, otherwise it will run forever and crash your browser!",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  stroke(255);\n}\n\nfunction draw() {\n  background(0);\n  translate(200, 400);\n  branch(100);\n  noLoop(); // stop draw loop to save CPU\n}\n\nfunction branch(len) {\n  // Draw line, translate, and recurse if len > 10\n  \n}\n",
        validate: (state, logs, code) => {
            return /line\s*\(\s*0\s*,\s*0\s*,\s*0\s*,\s*-len\s*\)/.test(code) && /translate\s*\(\s*0\s*,\s*-len\s*\)/.test(code) && /if\s*\(\s*len\s*>\s*10\s*\)/.test(code) && /branch\s*\(\s*len\s*\*\s*0\.7/.test(code);
        }
    }
];

// --- Application Logic ---
let editor;
let currentLessonIndex = 0;
let highestLessonIndex = 0;
let userLogs = [];
let validationInterval = null;

// Preserve original console to allow logging correctly
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize CodeMirror Editor
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        viewportMargin: Infinity
    });

    // Check user progress
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.processingcapstone) {
        const prog = PyPlayAuth.user.progress.processingcapstone;
        if (prog.highest_lesson && prog.highest_lesson > 0) {
            highestLessonIndex = prog.highest_lesson;
            currentLessonIndex = prog.highest_lesson;
        }
    }

    loadLesson(currentLessonIndex);
    
    // UI Events
    document.getElementById('run-btn').addEventListener('click', runCode);
    
    // Dock Toggles
    const dock = document.getElementById('output-dock');
    const overlay = document.getElementById('dock-overlay');
    
    const openDock = () => {
        if (dock && overlay) {
            dock.classList.add('open');
            overlay.classList.add('open');
        }
    };
    
    const closeDock = () => {
        if (dock && overlay) {
            dock.classList.remove('open');
            overlay.classList.remove('open');
        }
    };

    const toggleBtn = document.getElementById('toggle-dock-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', openDock);
    
    const closeBtn = document.getElementById('close-dock-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeDock);
    
    if (overlay) overlay.addEventListener('click', closeDock);
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(currentLessonIndex);
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else if (currentLessonIndex === lessons.length - 1) {
            // Completed the course!
            PyPlayAuth.updateProgress("processingcapstone", currentLessonIndex, true).then(() => {
                window.location.href = 'dashboard.html';
            });
        }
    });
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('output-console').textContent = '';
        if (window.p5Instance) {
            window.p5Instance.remove();
            window.p5Instance = null;
        }
        document.getElementById('canvas-container').innerHTML = '';
        userLogs = [];
    });
});

function loadLesson(index) {
    if (validationInterval) {
        clearInterval(validationInterval);
        validationInterval = null;
    }

    const lesson = lessons[index];
    
    document.getElementById('current-lesson-num').textContent = index + 1;
    document.getElementById('total-lessons').textContent = lessons.length;
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-difficulty').textContent = lesson.difficulty;
    document.getElementById('lesson-topic').textContent = lesson.topic;
    document.getElementById('lesson-concept').innerHTML = lesson.concept;
    document.getElementById('lesson-example').textContent = lesson.example;
    document.getElementById('lesson-task').innerHTML = lesson.task;
    
    // Hint Logic
    const hintBtn = document.getElementById('show-hint-btn');
    const hintText = document.getElementById('lesson-hint');
    if (lesson.hint) {
        hintBtn.style.display = 'inline-block';
        hintText.style.display = 'none';
        hintText.innerHTML = lesson.hint;
        hintBtn.onclick = () => {
            hintBtn.style.display = 'none';
            hintText.style.display = 'block';
        };
    } else {
        hintBtn.style.display = 'none';
        hintText.style.display = 'none';
    }
    
    editor.setValue(lesson.initialCode);
    
    document.getElementById('output-console').textContent = 'Ready to execute Processing sketch...\n';
    document.getElementById('success-message').classList.add('hidden');
    
    if (window.p5Instance) {
        window.p5Instance.remove();
        window.p5Instance = null;
    }
    document.getElementById('canvas-container').innerHTML = ''; 
    userLogs = [];
    
    document.getElementById('prev-btn').disabled = (index === 0);
    document.getElementById('next-btn').disabled = true; // wait for success
    
    updateProgressSteps();
    
    // If they already completed it, enable Next
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) 
        ? (PyPlayAuth.user.progress || {}) 
        : {};
    const prog = progressObj.processingcapstone || { completed_lessons: [] };
    let completed = prog.completed_lessons;
    if (!Array.isArray(completed)) {
        completed = [];
    }
    
    if (completed.includes(index) || index < highestLessonIndex) {
        document.getElementById('next-btn').disabled = false;
        if (index === lessons.length - 1) {
            document.getElementById('next-btn').textContent = "Finish Course";
        } else {
            document.getElementById('next-btn').textContent = "Next Lesson";
        }
    } else {
        document.getElementById('next-btn').disabled = true;
        document.getElementById('next-btn').textContent = "Next Lesson";
    }
}

function updateProgressSteps() {
    const container = document.getElementById('progress-steps-container');
    if (!container) return;
    container.innerHTML = '';
    
    let highest = highestLessonIndex;
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.processingcapstone) {
        const prog = PyPlayAuth.user.progress.processingcapstone;
        if (prog.highest_lesson !== undefined && prog.highest_lesson !== null) {
            highest = Number(prog.highest_lesson);
        } else if (prog.completed_lessons && prog.completed_lessons.length > 0) {
            highest = Math.max(...prog.completed_lessons) + 1;
        }
        highest = Math.min(highest, lessons.length - 1);
        highestLessonIndex = highest;
    }
                   
    for (let i = 0; i < lessons.length; i++) {
        const pill = document.createElement('div');
        pill.className = 'progress-step-pill';
        pill.setAttribute('data-tooltip', `${i + 1}. ${lessons[i].title}`);
        
        if (i === currentLessonIndex) {
            pill.classList.add('active');
        } else if (i <= highest) {
            pill.classList.add('completed');
            pill.addEventListener('click', () => {
                currentLessonIndex = i;
                loadLesson(i);
            });
        } else {
            pill.classList.add('locked');
        }
        
        container.appendChild(pill);
    }
}

async function runCode() {
    const code = editor.getValue();
    const consoleEl = document.getElementById('output-console');
    const container = document.getElementById('canvas-container');
    
    // Auto-open dock when code runs
    const dock = document.getElementById('output-dock');
    const overlay = document.getElementById('dock-overlay');
    if (dock && overlay) {
        dock.classList.add('open');
        overlay.classList.add('open');
    }
    
    consoleEl.textContent = 'Running Sketch...\n';
    userLogs = [];
    
    if (window.p5Instance) {
        window.p5Instance.remove();
        window.p5Instance = null;
    }
    container.innerHTML = '';
    
    if (validationInterval) {
        clearInterval(validationInterval);
    }
    
    console.log = function(...args) {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        userLogs.push(msg);
        consoleEl.textContent += msg + '\n';
        originalConsoleLog.apply(console, args);
    };
    
    console.error = function(...args) {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        if (!msg.includes("p5.js says")) { // ignore some p5 warnings
            userLogs.push("Error: " + msg);
            consoleEl.textContent += "Error: " + msg + '\n';
        }
        originalConsoleError.apply(console, args);
    };

    try {
        const script = document.createElement('script');
        script.id = 'p5-user-script';
        
        // Wrap the user's code to evaluate it globally, and instantiate p5.
        script.textContent = `
            try {
                // clear old global setup/draw
                window.setup = undefined;
                window.draw = undefined;
                
                ${code}
                
                // p5 global mode with canvas inside canvas-container
                window.p5Instance = new p5(null, 'canvas-container');
            } catch(e) {
                console.error(e.message);
            }
        `;
        
        const oldScript = document.getElementById('p5-user-script');
        if (oldScript) oldScript.remove();
        
        document.body.appendChild(script);
        
        // Validate immediately and then poll just in case
        checkValidation(code);
        let checkCount = 0;
        validationInterval = setInterval(() => {
            checkValidation(code);
            checkCount++;
            if (checkCount > 10 || !document.getElementById('next-btn').disabled) {
                clearInterval(validationInterval);
            }
        }, 500);
        
    } catch(err) {
        console.error(err.message);
    }
}

function checkValidation(code) {
    const lesson = lessons[currentLessonIndex];
    const state = {};
    
    if (lesson.validate(state, userLogs, code)) {
        document.getElementById('success-message').classList.remove('hidden');
        document.getElementById('next-btn').disabled = false;
        if (currentLessonIndex === lessons.length - 1) {
            document.getElementById('next-btn').textContent = "Finish Course";
        }
        
        if (PyPlayAuth.user) {
            highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
            PyPlayAuth.updateProgress("processingcapstone", currentLessonIndex, true);
            updateProgressSteps();
        }
    }
}
