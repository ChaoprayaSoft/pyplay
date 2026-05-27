// --- State Management ---
const lessons = [
    // Module 1: 2D Differential Drive Robot
    {
        title: "Hello Robot",
        difficulty: "Beginner",
        topic: "Differential Drive",
        concept: "Welcome to the PyPlay Robotics Simulator! Let's start with basic movement. The `robot` object allows you to control a differential drive robot.",
        example: "robot.move_forward(50)\nrobot.stop()",
        task: "Make the robot move forward by 100 units.",
        initialCode: "import robot\n\n# Move the robot forward by 100 units\n",
        expectedOutput: "Robot moved forward by 100\n",
        simType: "diff-drive",
        validate: (simState) => simState.x >= 150 // assuming starts at 50, moved 100
    },
    {
        title: "Turning and Rotation",
        difficulty: "Beginner",
        topic: "Differential Drive",
        concept: "A differential drive robot turns by changing the speeds of its left and right wheels. We simplified this into a `turn(angle)` command.",
        example: "robot.turn(90)",
        task: "Move forward 50 units, turn right by 90 degrees, and move forward another 50 units.",
        initialCode: "import robot\n\n# write your sequence here\n",
        expectedOutput: "Robot moved forward by 50\nRobot turned by 90 degrees\nRobot moved forward by 50\n",
        simType: "diff-drive",
        validate: (simState) => simState.y >= 100 && simState.x >= 100
    },
    {
        title: "Sensor Feedback",
        difficulty: "Intermediate",
        topic: "Sensors",
        concept: "Robots use sensors to perceive the world. Let's use `robot.get_distance()` to detect obstacles.",
        example: "dist = robot.get_distance()\nprint('Distance:', dist)",
        task: "Write a `while` loop that keeps moving forward by 10 units as long as the distance to the obstacle is greater than 20.",
        initialCode: "import robot\n\nwhile robot.get_distance() > 20:\n    robot.move_forward(10)\n",
        expectedOutput: "",
        simType: "diff-drive-obstacle",
        validate: (simState) => simState.distanceToObstacle <= 20
    },
    {
        title: "Wall Following",
        difficulty: "Intermediate",
        topic: "Control Systems",
        concept: "By reading sensors continuously, a robot can follow a wall. A simple proportional controller can help maintain a constant distance to the wall.",
        example: "error = target_distance - current_distance\nsteering = kp * error",
        task: "Just run the example code to see the robot follow the wall using a basic controller.",
        initialCode: "import robot\n\nfor _ in range(50):\n    dist = robot.get_distance(sensor='left')\n    error = 30 - dist\n    robot.turn(error * 0.5)\n    robot.move_forward(5)\n",
        expectedOutput: "",
        simType: "wall-following",
        validate: (simState) => simState.steps >= 40
    },

    // Module 2: Grid-Based Pathfinding
    {
        title: "Exploring the Grid",
        difficulty: "Intermediate",
        topic: "Pathfinding",
        concept: "Many pathfinding algorithms represent the world as a grid. Let's move the robot cell-by-cell in a grid environment.",
        example: "robot.grid_move('right')\nrobot.grid_move('down')",
        task: "Move the robot to the goal located at grid (3, 2). The robot starts at (0,0).",
        initialCode: "import robot\n\n# Move to (3, 2)\n",
        expectedOutput: "",
        simType: "grid",
        validate: (simState) => simState.gridX === 3 && simState.gridY === 2
    },
    {
        title: "Obstacle Avoidance (Random Walk)",
        difficulty: "Intermediate",
        topic: "Pathfinding",
        concept: "If we don't know the map, we can randomly walk and avoid obstacles. Use `robot.is_free(direction)` to check.",
        example: "if robot.is_free('right'):\n    robot.grid_move('right')",
        task: "Use a loop to randomly move the robot until it reaches the goal. (Provided as an example)",
        initialCode: "import robot\nimport random\n\nwhile not robot.at_goal():\n    dirs = ['up', 'down', 'left', 'right']\n    d = random.choice(dirs)\n    if robot.is_free(d):\n        robot.grid_move(d)\n",
        expectedOutput: "",
        simType: "grid-maze",
        validate: (simState) => simState.atGoal
    },
    {
        title: "Breadth-First Search (BFS)",
        difficulty: "Expert",
        topic: "Pathfinding Algorithms",
        concept: "BFS guarantees the shortest path in an unweighted grid. It explores all neighbors layer by layer.",
        example: "queue = [(start_x, start_y)]",
        task: "Execute the provided BFS pathfinding script and watch the grid simulation animate the path.",
        initialCode: "import robot\n\n# A simple hardcoded path for the maze for demonstration\npath = ['right', 'right', 'down', 'down', 'right']\nfor p in path:\n    robot.grid_move(p)\n",
        expectedOutput: "",
        simType: "grid-maze",
        validate: (simState) => simState.atGoal
    },

    // Module 3: Robotic Arm Simulation
    {
        title: "The Robotic Arm (Forward Kinematics)",
        difficulty: "Intermediate",
        topic: "Robotic Arms",
        concept: "A robotic arm is made of joints and links. By setting the angles of each joint, we control the position of the end-effector.",
        example: "arm.set_joints(45, -45)",
        task: "Set the base joint to 90 degrees and the elbow joint to 0 degrees.",
        initialCode: "import arm\n\narm.set_joints(90, 0)\n",
        expectedOutput: "",
        simType: "arm",
        validate: (simState) => simState.joint1 === 90 && simState.joint2 === 0
    },
    {
        title: "Pick and Place",
        difficulty: "Expert",
        topic: "Robotic Arms",
        concept: "Robotic arms are often used to pick and place objects. You must sequence movements and gripper states.",
        example: "arm.open_gripper()\narm.close_gripper()",
        task: "Move to the object at (45, -45), close the gripper, move to (135, -45), and open the gripper.",
        initialCode: "import arm\n\narm.open_gripper()\narm.set_joints(45, -45)\narm.close_gripper()\narm.set_joints(135, -45)\narm.open_gripper()\n",
        expectedOutput: "",
        simType: "arm",
        validate: (simState) => simState.objectDroppedAtTarget
    },
    {
        title: "Trajectory Interpolation",
        difficulty: "Expert",
        topic: "Robotic Arms",
        concept: "Real robots don't jump instantly to joint angles; they move smoothly. Linear interpolation (Lerp) smooths the path.",
        example: "arm.move_smooth(90, 90, duration=2.0)",
        task: "Run the smooth movement command to watch the arm interpolate its path.",
        initialCode: "import arm\n\narm.move_smooth(90, 0, 1.0)\narm.move_smooth(45, -45, 1.0)\n",
        expectedOutput: "",
        simType: "arm",
        validate: (simState) => simState.steps >= 2
    }
];

let currentLessonIndex = 0;
let highestLessonIndex = 0;
let pyodideReady = false;
let pyodideInstance = null;

// Simulation State
let simState = {};
let simCanvas, ctx;

// --- DOM Elements ---
const dom = {
    lessonNum: document.getElementById('current-lesson-num'),
    totalLessons: document.getElementById('total-lessons'),
    progressStepsContainer: document.getElementById('progress-steps-container'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    
    lessonTitle: document.getElementById('lesson-title'),
    lessonDifficulty: document.getElementById('lesson-difficulty'),
    lessonTopic: document.getElementById('lesson-topic'),
    lessonConcept: document.getElementById('lesson-concept'),
    lessonExample: document.getElementById('lesson-example'),
    lessonTask: document.getElementById('lesson-task'),
    successMessage: document.getElementById('success-message'),
    
    runBtn: document.getElementById('run-btn'),
    clearBtn: document.getElementById('clear-btn'),
    outputConsole: document.getElementById('output-console'),
};

let editor;

// --- Canvas Drawing Logic ---
function initSimulation() {
    simCanvas = document.getElementById('sim-canvas');
    if(simCanvas) {
        ctx = simCanvas.getContext('2d');
    }
    resetSimulation();
}

function resetSimulation() {
    const lesson = lessons[currentLessonIndex];
    if(lesson.simType.startsWith('diff-drive')) {
        simState = { x: 50, y: 150, angle: 0, distanceToObstacle: 150, steps: 0 };
    } else if (lesson.simType.startsWith('grid')) {
        simState = { gridX: 0, gridY: 0, atGoal: false };
    } else if (lesson.simType.startsWith('arm')) {
        simState = { joint1: 0, joint2: 0, gripperClosed: false, objectDroppedAtTarget: false, steps: 0 };
    }
    drawSimulation();
}

function drawSimulation() {
    if (!ctx) return;
    const lesson = lessons[currentLessonIndex];
    
    // Clear canvas
    ctx.fillStyle = '#282a36';
    ctx.fillRect(0, 0, simCanvas.width, simCanvas.height);
    
    if (lesson.simType.startsWith('diff-drive')) {
        drawDiffDrive();
    } else if (lesson.simType.startsWith('grid')) {
        drawGrid();
    } else if (lesson.simType.startsWith('arm')) {
        drawArm();
    }
}

function drawDiffDrive() {
    ctx.save();
    ctx.translate(simState.x, simState.y);
    ctx.rotate(simState.angle * Math.PI / 180);
    
    // Draw robot body
    ctx.fillStyle = '#f1fa8c'; // Yellow body
    ctx.fillRect(-15, -15, 30, 30);
    
    // Draw direction indicator
    ctx.fillStyle = '#ff5555';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(5, -5);
    ctx.lineTo(5, 5);
    ctx.fill();
    ctx.restore();

    // Draw obstacle if applicable
    if (lessons[currentLessonIndex].simType === 'diff-drive-obstacle') {
        ctx.fillStyle = '#ffb86c';
        ctx.fillRect(simState.x + simState.distanceToObstacle, simState.y - 20, 20, 40);
    }
}

function drawGrid() {
    const cellSize = 50;
    const rows = 6;
    const cols = 10;
    
    // Draw Grid
    ctx.strokeStyle = '#44475a';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
    }
    
    // Goal
    ctx.fillStyle = '#50fa7b';
    ctx.fillRect(3 * cellSize + 5, 2 * cellSize + 5, cellSize - 10, cellSize - 10);
    
    // Obstacles for maze
    if (lessons[currentLessonIndex].simType === 'grid-maze') {
        ctx.fillStyle = '#ff5555';
        ctx.fillRect(1 * cellSize, 0 * cellSize, cellSize, cellSize);
        ctx.fillRect(1 * cellSize, 1 * cellSize, cellSize, cellSize);
        ctx.fillRect(1 * cellSize, 2 * cellSize, cellSize, cellSize);
        ctx.fillRect(2 * cellSize, 4 * cellSize, cellSize, cellSize);
    }

    // Robot
    ctx.fillStyle = '#8be9fd';
    ctx.beginPath();
    ctx.arc(simState.gridX * cellSize + cellSize/2, simState.gridY * cellSize + cellSize/2, cellSize/3, 0, Math.PI*2);
    ctx.fill();
}

function drawArm() {
    const base = {x: 250, y: 250};
    const len1 = 80;
    const len2 = 70;
    
    const a1 = simState.joint1 * Math.PI / 180;
    const a2 = a1 + simState.joint2 * Math.PI / 180;
    
    const elbow = {
        x: base.x + len1 * Math.cos(a1),
        y: base.y - len1 * Math.sin(a1)
    };
    
    const end = {
        x: elbow.x + len2 * Math.cos(a2),
        y: elbow.y - len2 * Math.sin(a2)
    };
    
    // Draw target for pick and place
    if (lessons[currentLessonIndex].title === "Pick and Place") {
        ctx.fillStyle = simState.objectDroppedAtTarget ? '#50fa7b' : '#ffb86c';
        ctx.fillRect(350, 150, 20, 20); // target zone
        
        if(!simState.gripperClosed && !simState.objectDroppedAtTarget) {
            ctx.fillStyle = '#ff79c6';
            // Assuming object is initially at (45, -45) kinematic position
            const objX = base.x + len1 * Math.cos(45*Math.PI/180) + len2 * Math.cos(0);
            const objY = base.y - len1 * Math.sin(45*Math.PI/180) - len2 * Math.sin(0);
            ctx.fillRect(objX-5, objY-5, 10, 10);
        } else if (simState.gripperClosed) {
            ctx.fillStyle = '#ff79c6';
            ctx.fillRect(end.x-5, end.y-5, 10, 10);
        }
    }

    // Draw base
    ctx.fillStyle = '#6272a4';
    ctx.fillRect(base.x - 20, base.y, 40, 20);
    
    // Draw links
    ctx.strokeStyle = '#bd93f9';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(elbow.x, elbow.y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(elbow.x, elbow.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    
    // Draw joints
    ctx.fillStyle = '#f8f8f2';
    ctx.beginPath(); ctx.arc(base.x, base.y, 6, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(elbow.x, elbow.y, 6, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(end.x, end.y, 4, 0, Math.PI*2); ctx.fill();
}


// Expose functions to global scope so Pyodide can call them via `js` module
window.js_sim_move_forward = function(dist) {
    simState.x += dist * Math.cos(simState.angle * Math.PI/180);
    simState.y += dist * Math.sin(simState.angle * Math.PI/180);
    simState.distanceToObstacle = Math.max(0, simState.distanceToObstacle - dist);
    simState.steps++;
    drawSimulation();
};
window.js_sim_turn = function(angle) {
    simState.angle += angle;
    simState.steps++;
    drawSimulation();
};
window.js_sim_get_distance = function() {
    return simState.distanceToObstacle;
};

window.js_sim_grid_move = function(dir) {
    if (dir === 'up') simState.gridY--;
    if (dir === 'down') simState.gridY++;
    if (dir === 'left') simState.gridX--;
    if (dir === 'right') simState.gridX++;
    if (simState.gridX === 3 && simState.gridY === 2) simState.atGoal = true;
    drawSimulation();
};
window.js_sim_grid_free = function(dir) {
    // Simple mock
    return true; 
};
window.js_sim_grid_at_goal = function() {
    return simState.gridX === 3 && simState.gridY === 2;
};

window.js_sim_arm_joints = function(j1, j2) {
    simState.joint1 = j1;
    simState.joint2 = j2;
    simState.steps++;
    
    if (lessons[currentLessonIndex].title === "Pick and Place") {
        if (j1 === 135 && j2 === -45 && simState.gripperClosed) {
            simState.objectDroppedAtTarget = true;
        }
    }
    drawSimulation();
};
window.js_sim_arm_gripper = function(closed) {
    simState.gripperClosed = closed;
    drawSimulation();
};


// --- Initialization ---
async function init() {
    try {
        if (dom.totalLessons) dom.totalLessons.textContent = lessons.length;
        
        const editorTextarea = document.getElementById('code-editor');
        editor = CodeMirror.fromTextArea(editorTextarea, {
            mode: 'python',
            theme: 'dracula',
            lineNumbers: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            matchBrackets: true
        });
        
        initSimulation();
        loadLesson(0);

        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
            try { await PyPlayAuth.syncFromSheets(); } catch (e) {}
        }
        
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            const progressObj = PyPlayAuth.user.progress || {};
            const pyProgress = progressObj.robotics || { completed_lessons: [], completed: false, highest_lesson: 0 };
            let completed = pyProgress.completed_lessons;
            if (!Array.isArray(completed)) completed = [];
            
            highestLessonIndex = pyProgress.highest_lesson || (completed.length > 0 ? Math.max(...completed) + 1 : 0);
            highestLessonIndex = Math.min(highestLessonIndex, lessons.length - 1);
            
            let resumeIndex = 0;
            for (let i = 0; i < lessons.length; i++) {
                if (!completed.includes(i)) {
                    resumeIndex = i; break;
                }
            }
            if (completed.length === lessons.length) {
                resumeIndex = lessons.length - 1; highestLessonIndex = lessons.length - 1;
            }
            currentLessonIndex = resumeIndex;
        }
        
        loadLesson(currentLessonIndex);
        
        try {
            dom.outputConsole.textContent = "Initializing Python Engine (Pyodide)...\nThis may take a moment.";
            pyodideInstance = await loadPyodide({
                stdout: (text) => appendOutput(text + "\n"),
                stderr: (text) => appendError(text + "\n")
            });
            
            // Inject Python wrappers for our JS functions
            await pyodideInstance.runPythonAsync(`
import js
import sys

class Robot:
    def move_forward(self, dist):
        print("Robot moved forward by " + str(dist))
        js.js_sim_move_forward(dist)
    def turn(self, angle):
        print("Robot turned by " + str(angle) + " degrees")
        js.js_sim_turn(angle)
    def stop(self):
        print("Robot stopped")
    def get_distance(self, sensor='front'):
        return js.js_sim_get_distance()
    def grid_move(self, dir):
        js.js_sim_grid_move(dir)
    def is_free(self, dir):
        return js.js_sim_grid_free(dir)
    def at_goal(self):
        return js.js_sim_grid_at_goal()

class Arm:
    def set_joints(self, j1, j2):
        js.js_sim_arm_joints(j1, j2)
    def open_gripper(self):
        js.js_sim_arm_gripper(False)
    def close_gripper(self):
        js.js_sim_arm_gripper(True)
    def move_smooth(self, j1, j2, duration=1.0):
        js.js_sim_arm_joints(j1, j2) # Instant for simulation demo

sys.modules['robot'] = Robot()
sys.modules['arm'] = Arm()
            `);
            
            pyodideReady = true;
            dom.outputConsole.textContent = "Simulation Engine Ready! 🦾\n\n";
            dom.runBtn.disabled = false;
        } catch (err) {
            dom.outputConsole.innerHTML = `<span class="terminal-error">Failed to load Engine.</span>`;
            console.error(err);
        }
        
        setupEventListeners();
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

// --- Logic functions similar to AI ---
function renderProgressSteps() {
    const container = dom.progressStepsContainer;
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < lessons.length; i++) {
        const pill = document.createElement('div');
        pill.className = 'progress-step-pill';
        pill.setAttribute('data-tooltip', `${i + 1}. ${lessons[i].title}`);
        
        if (i === currentLessonIndex) pill.classList.add('active');
        else if (i <= highestLessonIndex) {
            pill.classList.add('completed');
            pill.addEventListener('click', () => { currentLessonIndex = i; loadLesson(i); });
        } else pill.classList.add('locked');
        
        container.appendChild(pill);
    }
}

function loadLesson(index) {
    const lesson = lessons[index];
    dom.lessonNum.textContent = index + 1;
    dom.lessonTitle.textContent = lesson.title;
    dom.lessonDifficulty.textContent = lesson.difficulty;
    dom.lessonTopic.textContent = lesson.topic;
    dom.lessonConcept.innerHTML = lesson.concept.replace(/`([^`]+)`/g, '<code>$1</code>');
    dom.lessonExample.textContent = lesson.example;
    dom.lessonTask.innerHTML = lesson.task.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    editor.setValue(lesson.initialCode);
    dom.successMessage.classList.add('hidden');
    
    resetSimulation();
    renderProgressSteps();
    
    dom.prevBtn.disabled = index === 0;
    dom.nextBtn.disabled = index >= highestLessonIndex;
}

function appendOutput(msg) {
    dom.outputConsole.textContent += msg;
    dom.outputConsole.scrollTop = dom.outputConsole.scrollHeight;
}
function appendError(msg) {
    const span = document.createElement('span');
    span.className = 'terminal-error';
    span.textContent = msg;
    dom.outputConsole.appendChild(span);
    dom.outputConsole.scrollTop = dom.outputConsole.scrollHeight;
}
function clearConsole() { dom.outputConsole.textContent = ""; }

async function runCode() {
    if (!pyodideReady) return;
    const code = editor.getValue();
    clearConsole();
    resetSimulation(); // Reset simulation before each run
    dom.runBtn.disabled = true;
    dom.runBtn.innerHTML = 'Running...';
    
    try {
        await pyodideInstance.runPythonAsync(code);
        checkLessonCompletion();
    } catch (err) {
        const errorMsg = err.toString().split('PythonError:').pop().trim();
        appendError("Error:\n" + errorMsg + "\n");
    } finally {
        dom.runBtn.disabled = false;
        dom.runBtn.innerHTML = '<span class="run-icon">▶</span> Run Simulation';
    }
}

function checkLessonCompletion() {
    const lesson = lessons[currentLessonIndex];
    let isMatch = false;
    
    if(lesson.validate && typeof lesson.validate === 'function') {
        isMatch = lesson.validate(simState);
    }
    
    // Also fallback to expected output check
    if(!isMatch && lesson.expectedOutput) {
        const normalizedOutput = dom.outputConsole.textContent.trim().replace(/\s+/g, ' ');
        const normalizedExpected = lesson.expectedOutput.trim().replace(/\s+/g, ' ');
        if(normalizedOutput === normalizedExpected && normalizedExpected !== '') {
            isMatch = true;
        }
    }

    if (isMatch) {
        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;
        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight; 
        dom.successMessage.style.animation = null;
        
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("robotics", currentLessonIndex, true);
        }
        highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
        renderProgressSteps();
        
        if (currentLessonIndex === lessons.length - 1) {
            dom.nextBtn.textContent = "Finish Course";
        }
    }
}

function setupEventListeners() {
    dom.runBtn.addEventListener('click', runCode);
    dom.clearBtn.addEventListener('click', clearConsole);
    dom.nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else {
            alert("Congratulations! You've completed the Robotics Course! 🎉");
            renderProgressSteps();
        }
    });
    dom.prevBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(currentLessonIndex);
        }
    });
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runCode();
    });
}

window.addEventListener('DOMContentLoaded', init);
