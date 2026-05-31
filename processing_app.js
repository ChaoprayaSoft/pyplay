// --- Processing / p5.js Lesson Database ---
const lessons = [
    {
        title: "Hello Canvas",
        difficulty: "Beginner",
        topic: "Setup & Canvas",
        concept: "Welcome to Processing! In p5.js, we use the <code>setup()</code> function to initialize our sketch. This function runs only once. Inside it, we use <code>createCanvas(width, height)</code> to create our drawing area.",
        example: "function setup() {\n  createCanvas(400, 400);\n}",
        task: "Define a <code>setup()</code> function and inside it, create a canvas that is 400 pixels wide and 400 pixels high.",
        hint: "Make sure you have exactly <code>function setup() { createCanvas(400, 400); }</code>",
        initialCode: "function setup() {\n  // Create a 400x400 canvas here\n  \n}\n",
        validate: (state, logs, code) => {
            return /function\s+setup\s*\(/.test(code) && /createCanvas\s*\(\s*400\s*,\s*400\s*\)/.test(code);
        }
    },
    {
        title: "Background Color",
        difficulty: "Beginner",
        topic: "Colors",
        concept: "You can change the background color of your canvas using the <code>background(color)</code> function. You can pass a grayscale value (0-255), RGB values (r, g, b), or a color string like <code>'red'</code>.",
        example: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n}",
        task: "Create a 400x400 canvas and set its background color to <code>'lightblue'</code>.",
        hint: "Add <code>background('lightblue');</code> right after your createCanvas function.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  // Set the background to 'lightblue'\n  \n}\n",
        validate: (state, logs, code) => {
            return /background\s*\(\s*['"]lightblue['"]\s*\)/.test(code);
        }
    },
    {
        title: "Drawing Rectangles",
        difficulty: "Beginner",
        topic: "Shapes",
        concept: "You can draw rectangles using the <code>rect(x, y, width, height)</code> function. The <code>x</code> and <code>y</code> coordinates define the top-left corner of the rectangle.",
        example: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  rect(100, 100, 200, 100);\n}",
        task: "Draw a rectangle at x=50, y=50, with a width of 150 and a height of 100.",
        hint: "The function is <code>rect(x, y, w, h)</code>. For this task, it's <code>rect(50, 50, 150, 100);</code>",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  // Draw your rectangle below\n  \n}\n",
        validate: (state, logs, code) => {
            return /rect\s*\(\s*50\s*,\s*50\s*,\s*150\s*,\s*100\s*\)/.test(code);
        }
    },
    {
        title: "Drawing Ellipses",
        difficulty: "Beginner",
        topic: "Shapes",
        concept: "You can draw circles and ovals using <code>ellipse(x, y, width, height)</code>. Unlike rectangles, the <code>x</code> and <code>y</code> coordinates specify the <b>center</b> of the ellipse.",
        example: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  ellipse(200, 200, 100, 100);\n}",
        task: "Draw a perfect circle exactly in the middle of your 400x400 canvas. Give it a width and height of 120.",
        hint: "The function is <code>ellipse(x, y, w, h)</code>. Center is at <code>200, 200</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  // Draw an ellipse at the center (200, 200) with size 120, 120\n  \n}\n",
        validate: (state, logs, code) => {
            return /ellipse\s*\(\s*200\s*,\s*200\s*,\s*120\s*,\s*120\s*\)/.test(code);
        }
    },
    {
        title: "Fill and Stroke",
        difficulty: "Intermediate",
        topic: "Styling",
        concept: "You can color shapes using <code>fill(color)</code> for the inside, and <code>stroke(color)</code> for the outline. You must call these functions <b>before</b> drawing the shape!",
        example: "fill('red');\nstroke('blue');\nrect(50, 50, 100, 100);",
        task: "Set the fill color to <code>'yellow'</code> and the stroke color to <code>'red'</code>, then draw an ellipse at (200, 200) with size 100.",
        hint: "Remember the order matters: <code>fill('yellow');</code>, then <code>stroke('red');</code>, then draw the <code>ellipse(200, 200, 100, 100)</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  \n  // Set fill and stroke, then draw ellipse\n  \n}\n",
        validate: (state, logs, code) => {
            return /fill\s*\(\s*['"]yellow['"]\s*\)/.test(code) && 
                   /stroke\s*\(\s*['"]red['"]\s*\)/.test(code) && 
                   /ellipse\s*\(\s*200\s*,\s*200\s*,\s*100\s*(,\s*100)?\s*\)/.test(code);
        }
    },
    {
        title: "Lines and Stroke Weight",
        difficulty: "Intermediate",
        topic: "Lines",
        concept: "You can draw a line connecting two points using <code>line(x1, y1, x2, y2)</code>. You can change the thickness of lines (and shape outlines) using <code>strokeWeight(weight)</code>.",
        example: "strokeWeight(5);\nline(0, 0, 400, 400);",
        task: "Set the <code>strokeWeight</code> to 10, then draw a <code>line</code> from the top-left corner (0, 0) to the bottom-right corner (400, 400).",
        hint: "Use <code>strokeWeight(10);</code> before <code>line(0, 0, 400, 400);</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n  background(220);\n  \n  // Set stroke weight to 10 and draw a diagonal line\n  \n}\n",
        validate: (state, logs, code) => {
            return /strokeWeight\s*\(\s*10\s*\)/.test(code) && /line\s*\(\s*0\s*,\s*0\s*,\s*400\s*,\s*400\s*\)/.test(code);
        }
    },
    {
        title: "The Draw Loop",
        difficulty: "Intermediate",
        topic: "Animation Basics",
        concept: "While <code>setup()</code> runs once, the <code>draw()</code> function runs continuously, 60 times per second. This loop is the secret to creating animation and interaction in Processing!",
        example: "function draw() {\n  // this runs forever!\n  console.log('Drawing...');\n}",
        task: "Define a <code>draw()</code> function. Inside it, move the <code>background(220)</code> call, and draw a random circle using <code>ellipse(random(400), random(400), 20, 20)</code>.",
        hint: "Define <code>function draw() { ... }</code> and place your <code>background(220)</code> and <code>ellipse(random(400), random(400), 20, 20)</code> inside.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n}\n\n// Create the draw() function here\n",
        validate: (state, logs, code) => {
            return /function\s+draw\s*\(/.test(code) && /random\s*\(\s*400\s*\)/.test(code) && /ellipse/.test(code) && /background/.test(code);
        }
    },
    {
        title: "Mouse Interactivity",
        difficulty: "Intermediate",
        topic: "Interaction",
        concept: "Processing provides built-in variables like <code>mouseX</code> and <code>mouseY</code> that track the exact pixel coordinates of your cursor on the canvas.",
        example: "function draw() {\n  background(220);\n  ellipse(mouseX, mouseY, 50, 50);\n}",
        task: "Create a sketch with <code>setup()</code> and <code>draw()</code>. Inside <code>draw()</code>, clear the background and draw a rectangle at <code>mouseX</code> and <code>mouseY</code> with a size of 50x50.",
        hint: "Pass <code>mouseX</code> and <code>mouseY</code> as the first two arguments to <code>rect()</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background('teal');\n  // Draw a rectangle at mouseX, mouseY\n  \n}\n",
        validate: (state, logs, code) => {
            return /rect\s*\(\s*mouseX\s*,\s*mouseY\s*,\s*50\s*,\s*50\s*\)/.test(code);
        }
    },
    {
        title: "Conditionals: Mouse Clicks",
        difficulty: "Intermediate",
        topic: "Logic",
        concept: "You can use <code>if</code> statements to add logic! The boolean variable <code>mouseIsPressed</code> is <code>true</code> if the mouse button is held down, and <code>false</code> otherwise.",
        example: "if (mouseIsPressed) {\n  fill('black');\n} else {\n  fill('white');\n}",
        task: "Inside <code>draw()</code>, write an if-else statement. If <code>mouseIsPressed</code> is true, fill the circle with <code>'red'</code>. Otherwise, fill it with <code>'blue'</code>. Then draw an ellipse at mouseX, mouseY.",
        hint: "Check <code>if (mouseIsPressed)</code> and call <code>fill('red')</code> inside the block, else <code>fill('blue')</code>.",
        initialCode: "function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  \n  // Add if-else logic here\n  \n  \n  ellipse(mouseX, mouseY, 80, 80);\n}\n",
        validate: (state, logs, code) => {
            return /if\s*\(\s*mouseIsPressed\s*\)/.test(code) && 
                   /fill\s*\(\s*['"]red['"]\s*\)/.test(code) && 
                   /fill\s*\(\s*['"]blue['"]\s*\)/.test(code);
        }
    },
    {
        title: "Bouncing Ball",
        difficulty: "Intermediate",
        topic: "Animation",
        concept: "By declaring variables outside of any function, we can keep track of state (like position or speed) across frames in the <code>draw()</code> loop to create autonomous animation.",
        example: "let x = 0;\nfunction draw() {\n  x = x + 1;\n  rect(x, 50, 20, 20);\n}",
        task: "Create a moving ball! Declare a variable <code>let x = 0;</code> at the top. Inside <code>draw()</code>, increase <code>x</code> by 5 (<code>x = x + 5;</code>) and draw an ellipse at <code>(x, 200)</code>.",
        hint: "Update x with <code>x = x + 5;</code> inside the draw loop before drawing the ellipse.",
        initialCode: "// Declare let x = 0; here\n\nfunction setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  background(220);\n  \n  // Increase x by 5 and draw an ellipse at (x, 200)\n  \n}\n",
        validate: (state, logs, code) => {
            return /let\s+x\s*=\s*0\s*;?/.test(code) && 
                   /x\s*=\s*x\s*\+\s*5\s*;?|x\s*\+=\s*5\s*;?/.test(code) && 
                   /ellipse\s*\(\s*x\s*,\s*200/.test(code);
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
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.processing) {
        const prog = PyPlayAuth.user.progress.processing;
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
            PyPlayAuth.updateProgress("processing", currentLessonIndex, true).then(() => {
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
    const prog = progressObj.processing || { completed_lessons: [] };
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
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.processing) {
        const prog = PyPlayAuth.user.progress.processing;
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
        // We override setup/draw locally in the script if they exist globally.
        script.textContent = `
            try {
                // clear old global setup/draw
                window.setup = undefined;
                window.draw = undefined;
                
                ${code}
                
                // If user defined setup or draw, p5 instance will pick it up automatically
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
            PyPlayAuth.updateProgress("processing", currentLessonIndex, true);
            updateProgressSteps();
        }
    }
}
