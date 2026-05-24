// --- State Management ---
const lessons = [
    {
        title: "What is Machine Learning?",
        difficulty: "Beginner",
        topic: "AI Basics",
        concept: "Traditional programming uses rules and data to get answers. Machine learning uses data and answers to discover rules! Let's start by exploring a basic heuristic approach before we learn.",
        example: "def is_spam(text):\n    return 'win' in text.lower()\n\nprint(is_spam('You WIN a prize!'))",
        task: "Write a function `is_hot(temp)` that returns `True` if `temp` is greater than 30, and `False` otherwise. Call it with `35` and print the result.",
        initialCode: "def is_hot(temp):\n    # write code here\n    pass\n\n# call and print here\n",
        expectedOutput: "True"
    },
    {
        title: "Vectors & Matrices",
        difficulty: "Beginner",
        topic: "Data",
        concept: "AI models process numbers. A single number is a scalar. A list of numbers is a vector. A grid is a matrix. In Python, we can represent vectors as lists.",
        example: "vector_a = [1, 2, 3]\nvector_b = [4, 5, 6]\nprint(vector_a[0] + vector_b[0])",
        task: "Create two vectors (lists): `v1 = [10, 20]` and `v2 = [5, 5]`. Calculate a new list `v3` where each element is the sum of the corresponding elements in `v1` and `v2`. Print `v3`.",
        initialCode: "v1 = [10, 20]\nv2 = [5, 5]\nv3 = []\n# calculate sums and append to v3\n\nprint(v3)\n",
        expectedOutput: "[15, 25]"
    },
    {
        title: "Basic Statistics",
        difficulty: "Beginner",
        topic: "Math",
        concept: "To understand data, we need basic statistics. The mean (average) is the sum of all elements divided by the total number of elements.",
        example: "data = [2, 4, 6]\nmean = sum(data) / len(data)\nprint(mean)",
        task: "Given the list `ages = [22, 25, 28, 21, 24]`, calculate the `mean` age and print it.",
        initialCode: "ages = [22, 25, 28, 21, 24]\n# calculate mean and print\n",
        expectedOutput: "24.0"
    },
    {
        title: "Linear Regression (The Math)",
        difficulty: "Intermediate",
        topic: "Regression",
        concept: "Linear regression tries to draw a straight line through data points. A line is defined by `y = mx + b` where `m` is the slope (weight) and `b` is the y-intercept (bias).",
        example: "m = 2\nb = 1\nx = 3\ny = m * x + b\nprint(y)",
        task: "A house price model is `price = 150 * size + 50000`. Predict the price for a house with `size = 1200` and print the `price`.",
        initialCode: "size = 1200\n# calculate price and print\n",
        expectedOutput: "230000"
    },
    {
        title: "Classification Basics",
        difficulty: "Intermediate",
        topic: "Classification",
        concept: "Classification groups data into classes. Let's do a simple 1D K-Nearest Neighbor (KNN) approach: classify a point based on which known center it is closer to.",
        example: "centers = {'cat': 5.0, 'dog': 15.0}\nx = 8.0\n# 8 is closer to 5 than 15, so it's a cat!",
        task: "We have two cluster centers: `spam = 100` and `ham = 10`. We get a new email with score `x = 75`. Calculate its absolute distance to both, and print `'spam'` if it's closer to spam, else `'ham'`.",
        initialCode: "spam_center = 100\nham_center = 10\nx = 75\n# write logic here and print result\n",
        expectedOutput: "spam"
    },
    {
        title: "Heuristics & Decision Trees",
        difficulty: "Intermediate",
        topic: "Logic",
        concept: "Decision Trees split data using `if/else` rules. By combining multiple rules, we can classify more complex data.",
        example: "def classify(weight, color):\n    if weight > 10:\n        return 'watermelon'\n    return 'apple'",
        task: "Write a function `predict_fruit(weight, color)` that returns `'banana'` if color is `'yellow'`, otherwise `'apple'`. Call `predict_fruit(150, 'yellow')` and print the result.",
        initialCode: "def predict_fruit(weight, color):\n    # your logic here\n    pass\n\n# call and print\n",
        expectedOutput: "banana"
    },
    {
        title: "The Perceptron (Artificial Neuron)",
        difficulty: "Advanced",
        topic: "Neural Networks",
        concept: "A perceptron takes inputs, multiplies them by weights, sums them up, and adds a bias: `z = (x1 * w1) + (x2 * w2) + bias`.",
        example: "inputs = [1.0, 0.5]\nweights = [0.5, -0.5]\nbias = 0.1\nz = (inputs[0]*weights[0]) + (inputs[1]*weights[1]) + bias\nprint(z)",
        task: "Given `inputs = [2.0, 3.0]`, `weights = [0.8, 0.4]`, and `bias = -1.0`, calculate `z` (the weighted sum) and print it.",
        initialCode: "inputs = [2.0, 3.0]\nweights = [0.8, 0.4]\nbias = -1.0\n# calculate z and print\n",
        expectedOutput: ["1.8", "1.8000000000000003"]
    },
    {
        title: "Activation Functions",
        difficulty: "Advanced",
        topic: "Neural Networks",
        concept: "Activation functions decide whether a neuron should 'fire'. The ReLU (Rectified Linear Unit) is popular: it returns `x` if `x > 0`, else `0`.",
        example: "def relu(x):\n    return max(0.0, x)\nprint(relu(-5))",
        task: "Write a `relu(x)` function. Test it by passing `-2.5` and then `4.0`, printing both results on separate lines.",
        initialCode: "def relu(x):\n    # implement ReLU\n    pass\n\n# print relu(-2.5) and relu(4.0)\n",
        expectedOutput: "0.0\n4.0"
    },
    {
        title: "Forward Propagation",
        difficulty: "Advanced",
        topic: "Neural Networks",
        concept: "Forward propagation is passing data through the network. We combine the perceptron and the activation function to get a final output.",
        example: "z = (input * weight) + bias\noutput = relu(z)",
        task: "Given `input = 5.0`, `weight = -1.0`, `bias = 2.0`. Calculate `z`, pass `z` through `relu(z)`, and print the final output.",
        initialCode: "def relu(x):\n    return max(0.0, x)\n\ninput_val = 5.0\nweight = -1.0\nbias = 2.0\n# Calculate and print final output\n",
        expectedOutput: ["0.0", "0"]
    },
    {
        title: "Loss & Error",
        difficulty: "Advanced",
        topic: "Training",
        concept: "To learn, a model needs to know how wrong it is. Mean Squared Error (MSE) is a common loss function: `error = (prediction - target) ** 2`.",
        example: "pred = 2.5\ntarget = 3.0\nerror = (pred - target) ** 2\nprint(error)",
        task: "Your model predicted `[2.0, 4.0]` but the targets were `[3.0, 4.0]`. Calculate the MSE for both elements, average them, and print the `mean_error`.",
        initialCode: "preds = [2.0, 4.0]\ntargets = [3.0, 4.0]\n# calculate mean squared error and print it\n",
        expectedOutput: ["0.5", "0.50", "1/2"]
    },
    {
        title: "Generative AI (Markov Chains)",
        difficulty: "Advanced",
        topic: "Gen AI",
        concept: "Markov Chains predict the next state based ONLY on the current state. They can be used for basic text generation!",
        example: "transitions = {'I': ['am', 'love'], 'am': ['happy']}\nprint(transitions['I'][0])",
        task: "Create a dictionary `model` where `'The'` maps to `['cat', 'dog']` and `'cat'` maps to `['sat']`. Print the next word after `'The'` (index 0), and then the word after that word.",
        initialCode: "model = {}\n# populate model and print 'cat' and 'sat' using the dictionary\n",
        expectedOutput: ["cat\nsat", "cat sat", "'cat'\n'sat'"]
    },
    {
        title: "Connecting to an AI API",
        difficulty: "Advanced",
        topic: "APIs",
        concept: "Real world AI often runs on remote servers. We can use Python's `json` and `urllib` to fetch data from APIs.",
        example: "import json\ndata = '{\"result\": \"success\"}'\nparsed = json.loads(data)\nprint(parsed['result'])",
        task: "Import the `json` module. Parse the string `response = '{\"prediction\": 0.95, \"label\": \"dog\"}'` into a dictionary, and print the `label`.",
        initialCode: "response = '{\"prediction\": 0.95, \"label\": \"dog\"}'\n# Import json, parse, and print label\n",
        expectedOutput: ["dog", "'dog'", "\"dog\""]
    }
];

let currentLessonIndex = 0;
let highestLessonIndex = 0;
let pyodideReady = false;
let pyodideInstance = null;

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

// --- Initialization ---
let editor;

async function init() {
    try {
        if (dom.totalLessons) {
            dom.totalLessons.textContent = lessons.length;
        }
        
        // Initialize CodeMirror
        if (typeof CodeMirror === 'undefined') {
            throw new Error("CodeMirror editor library could not be loaded. Please check your internet connection.");
        }
        const editorTextarea = document.getElementById('code-editor');
        if (!editorTextarea) {
            throw new Error("Code editor textarea (#code-editor) element not found in DOM.");
        }
        editor = CodeMirror.fromTextArea(editorTextarea, {
            mode: 'python',
            theme: 'dracula',
            lineNumbers: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            matchBrackets: true
        });
        
        // Load lesson 0 immediately so the user sees content right away (not "Loading...")
        // We'll reload with the correct resume index after syncing progress below.
        loadLesson(0);

        // SYNC: Pull latest progress from Google Sheets before reading progress
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
            try {
                await PyPlayAuth.syncFromSheets();
            } catch (e) {
                console.warn("Init sync failed, using local progress.", e);
            }
        }
        
        // Restore progress/resume from last uncompleted lesson
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            const progressObj = PyPlayAuth.user.progress || {};
            const pyProgress = progressObj.ai || { completed_lessons: [], completed: false, highest_lesson: 0 };
            let completed = pyProgress.completed_lessons;
            if (!Array.isArray(completed)) {
                completed = [];
            }
            
            // Find highest lesson unlocked
            if (pyProgress.highest_lesson !== undefined && pyProgress.highest_lesson !== null) {
                const parsedHighest = Number(pyProgress.highest_lesson);
                highestLessonIndex = isNaN(parsedHighest) ? 0 : parsedHighest;
            } else {
                // Fallback to max completed lesson index + 1 or 0
                highestLessonIndex = completed.length > 0 ? Math.max(...completed) + 1 : 0;
            }
            
            if (isNaN(highestLessonIndex)) {
                highestLessonIndex = 0;
            }
            
            // Cap highestLessonIndex to lessons.length - 1
            highestLessonIndex = Math.min(highestLessonIndex, lessons.length - 1);
            
            // Find first lesson index not in completed lessons list
            let resumeIndex = 0;
            for (let i = 0; i < lessons.length; i++) {
                if (!completed.includes(i)) {
                    resumeIndex = i;
                    break;
                }
            }
            // If all are completed, set to last lesson
            if (completed.length === lessons.length) {
                resumeIndex = lessons.length - 1;
                highestLessonIndex = lessons.length - 1;
            }
            currentLessonIndex = resumeIndex;
        }
        
        // Reload with correct resume index after progress is restored
        loadLesson(currentLessonIndex);
        
        // Load Pyodide
        try {
            dom.outputConsole.textContent = "Initializing Python Engine (Pyodide)...\nThis may take a moment on first load.";
            pyodideInstance = await loadPyodide({
                stdout: (text) => appendOutput(text + "\n"),
                stderr: (text) => appendError(text + "\n")
            });
            pyodideReady = true;
            
            dom.outputConsole.textContent = "Python Engine Ready! 🐍\n\n";
            dom.runBtn.disabled = false;
        } catch (err) {
            dom.outputConsole.innerHTML = `<span class="terminal-error">Failed to load Python Engine. Please check your internet connection.</span>`;
            console.error(err);
        }
        
        setupEventListeners();
    } catch (err) {
        console.error("Initialization failed:", err);
        const conceptEl = document.getElementById('lesson-concept') || (dom && dom.lessonConcept);
        if (conceptEl) {
            conceptEl.innerHTML = `<div class="terminal-error" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2); font-family: 'Inter', sans-serif;">
                <strong>⚠️ App Initialization Failed</strong><br>
                ${err.message || err}<br><br>
                Please ensure you are connected to the internet (or that CDN resources loaded correctly) and refresh the page.
            </div>`;
        }
    }
}

// --- Functions ---

function renderProgressSteps() {
    const container = dom.progressStepsContainer;
    if (!container) return;
    
    container.innerHTML = '';
    
    // Retrieve highest lesson index from user progress
    let highest = highestLessonIndex;
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const progressObj = PyPlayAuth.user.progress || {};
        const pyProgress = progressObj.ai || { completed_lessons: [], completed: false, highest_lesson: 0 };
        let completed = pyProgress.completed_lessons;
        if (!Array.isArray(completed)) {
            completed = [];
        }
        if (pyProgress.highest_lesson !== undefined && pyProgress.highest_lesson !== null) {
            const parsedHighest = Number(pyProgress.highest_lesson);
            highest = isNaN(parsedHighest) ? 0 : parsedHighest;
        } else {
            highest = completed.length > 0 ? Math.max(...completed) + 1 : 0;
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
    
    // Update progress steps UI
    renderProgressSteps();
    
    // Update buttons
    dom.prevBtn.disabled = index === 0;
    
    // Enable "Next" button if lesson has already been completed/passed in the past
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) 
        ? (PyPlayAuth.user.progress || {}) 
        : {};
    const pyProgress = progressObj.ai || { completed_lessons: [], completed: false };
    let completed = pyProgress.completed_lessons;
    if (!Array.isArray(completed)) {
        completed = [];
    }
    
    if (completed.includes(index) || index < highestLessonIndex) {
        dom.nextBtn.disabled = false;
    } else {
        dom.nextBtn.disabled = true; // Disabled until task is passed
    }
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

function clearConsole() {
    dom.outputConsole.textContent = "";
}

async function runCode() {
    if (!pyodideReady) return;
    
    const code = editor.getValue();
    clearConsole();
    dom.runBtn.disabled = true;
    dom.runBtn.innerHTML = 'Running...';
    
    try {
        // Run the python code
        await pyodideInstance.runPythonAsync(code);
        
        // After running, check if output matches expected output
        checkLessonCompletion();
        
    } catch (err) {
        // Extract just the Python error message, not the full JS stack trace
        const errorMsg = err.toString().split('PythonError:').pop().trim();
        appendError("Error:\n" + errorMsg + "\n");
    } finally {
        dom.runBtn.disabled = false;
        dom.runBtn.innerHTML = '<span class="run-icon">▶</span> Run Code';
    }
}

function checkLessonCompletion() {
    const lesson = lessons[currentLessonIndex];
    const currentOutput = dom.outputConsole.textContent;
    
    // Normalize spaces and quotes to ensure robust validation for dictionaries, lists, etc.
    const normalizedOutput = currentOutput.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
    
    let expectedArray = Array.isArray(lesson.expectedOutput) ? lesson.expectedOutput : [lesson.expectedOutput];
    let isMatch = expectedArray.some(expected => {
        const normalizedExpected = expected.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
        return normalizedOutput === normalizedExpected;
    });

    if (isMatch) {
        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;
        
        // Add celebration animation
        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight; // trigger reflow
        dom.successMessage.style.animation = null;
        
        // Save progress to localStorage & Google Sheets
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("ai", currentLessonIndex, true);
            highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
            renderProgressSteps();
        }
        
        // If it's the last lesson
        if (currentLessonIndex === lessons.length - 1) {
            dom.nextBtn.textContent = "Finish Course";
            dom.nextBtn.disabled = false;
        }
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    dom.runBtn.addEventListener('click', runCode);
    dom.clearBtn.addEventListener('click', clearConsole);
    
    dom.nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else {
            alert("Congratulations! You've completed the PyPlay beginner course! 🎉");
            renderProgressSteps();
        }
    });
    
    dom.prevBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(currentLessonIndex);
        }
    });
    
    // Command/Ctrl + Enter to run
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runCode();
        }
    });
}

// Start the app
window.addEventListener('DOMContentLoaded', init);
