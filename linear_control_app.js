
// --- Linear Control Systems (MATLAB) Lesson Database ---
const lessons = [
    {
        title: "Lesson 1: Laplace Transformation",
        difficulty: "Beginner",
        topic: "Mathematical Foundations",
        concept: "The Laplace Transform converts differential equations into algebraic equations. In MATLAB, you can use `laplace(f)`.",
        example: `syms t\nf = sin(t)\nF = laplace(f)\ndisp(F)`,
        task: "Find the Laplace transform of `f = exp(-2*t)`. Print the result using `disp(F)`.",
        initialCode: `syms t\nf = exp(-2*t);\n\n% Find Laplace transform and display it:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`F = laplace(exp(-2*t))`. Then `disp(F)`.",
        validate: (state, logs) => { 
            const raw = editor.getValue();
            return logs.some(l => l.includes("1/(s + 2)")) || (raw.includes("laplace") && raw.includes("exp(-2*t)")); 
        }
    },
    {
        title: "Lesson 2: Final Value Theorem",
        difficulty: "Beginner",
        topic: "Mathematical Foundations",
        concept: "The Final Value Theorem allows us to find the steady-state value of a system without performing the inverse Laplace transform.",
        example: `syms s\nF = 1/(s*(s+1))\nval = limit(s*F, s, 0)\ndisp(val)`,
        task: "Use the Final Value Theorem to find the steady-state value of `F = 5/(s*(s+5))`. Display the value.",
        initialCode: `syms s\nF = 5/(s*(s+5));\n\n% Calculate final value and display it:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`limit(s*F, s, 0)` then `disp`.",
        validate: (state, logs) => { 
            const raw = editor.getValue();
            return logs.some(l => l.includes("1")) || (raw.includes("limit") && raw.includes("s*F")); 
        }
    },
    {
        title: "Lesson 3: Transfer Functions",
        difficulty: "Beginner",
        topic: "System Modeling",
        concept: "A Transfer Function is the Laplace transform of the output divided by the Laplace transform of the input. Use `s = tf('s')`.",
        example: `s = tf('s');\nG = 1 / (s + 2);\ndisp(G)`,
        task: "Create a transfer function `G = (s + 2) / (s^2 + 3*s + 2)`. Display it.",
        initialCode: `s = tf('s');\n\n% Create and display G:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`G = (s + 2) / (s^2 + 3*s + 2)`. `disp(G)`.",
        validate: (state, logs) => { 
            const raw = editor.getValue();
            return logs.some(l => l.includes("s + 2") && l.includes("s^2 + 3*s + 2")) || (raw.includes("tf") && raw.includes("s + 2") && raw.includes("s^2 + 3*s + 2")); 
        }
    },
    {
        title: "Lesson 4: Step Response",
        difficulty: "Intermediate",
        topic: "Time Domain Analysis",
        concept: "The step response shows how a system reacts to a sudden input change. Use `step(G)`.",
        example: `s = tf('s');\nG = 1 / (s + 1);\nstep(G)`,
        task: "Plot the step response of `G = 10 / (s^2 + 2*s + 10)`.",
        initialCode: `s = tf('s');\nG = 10 / (s^2 + 2*s + 10);\n\n% Plot the step response:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "Just call `step(G)`.",
        validate: (state) => { return state.currentPlot && state.currentPlot.type === "line" && state.currentPlot.title === "Step Response"; }
    },
    {
        title: "Lesson 5: Steady State Error",
        difficulty: "Intermediate",
        topic: "System Performance",
        concept: "The steady state error is the difference between the desired and actual output as time approaches infinity.",
        example: `s = tf('s');\nG = 4 / (s + 2);\nKp = dcgain(G);\ness = 1 / (1 + Kp);\ndisp(ess)`,
        task: "Calculate `Kp = dcgain(G)` and the steady state error for a unit step input `ess = 1 / (1 + Kp)` for `G = 8 / (s + 4)`. Display `ess`.",
        initialCode: `s = tf('s');\nG = 8 / (s + 4);\n\n% Calculate and display ess:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`Kp = dcgain(G)`, `ess = 1 / (1 + Kp)`. Result is 0.333.",
        validate: (state, logs) => { 
            const raw = editor.getValue();
            return logs.some(l => l.includes("0.333") || l.includes("1/3") || l.includes("0.33")) || (raw.includes("dcgain") && raw.includes("1 / (1 + Kp)")); 
        }
    },
    {
        title: "Lesson 6: Routh Stability",
        difficulty: "Expert",
        topic: "Stability",
        concept: "The Routh-Hurwitz criterion determines if poles are in the right-half plane. In MATLAB, we can use `pole(G)`.",
        example: `s = tf('s');\nG = 1 / (s^3 + 2*s^2 + s + 2);\np = pole(G);\ndisp(p)`,
        task: "Find and display the poles of `G = 1 / (s^3 + 3*s^2 + 2*s)`. Are any in the RHP?",
        initialCode: `s = tf('s');\nG = 1 / (s^3 + 3*s^2 + 2*s);\n\n% Find poles:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`p = pole(G)`, then `disp(p)`. Poles are at 0, -1, -2.",
        validate: (state, logs) => { 
            const raw = editor.getValue();
            return logs.some(l => l.includes("0") && l.includes("-1") && l.includes("-2")) || raw.includes("pole"); 
        }
    },
    {
        title: "Lesson 7: Poles and Zeros",
        difficulty: "Intermediate",
        topic: "System Modeling",
        concept: "Visualizing the poles and zeros on the complex plane helps understand system behavior. Use `pzmap(G)`.",
        example: `s = tf('s');\nG = (s+1) / (s^2 + 2*s + 2);\npzmap(G)`,
        task: "Plot the pole-zero map of `G = (s+2) / (s^2 + s + 1)`.",
        initialCode: `s = tf('s');\nG = (s+2) / (s^2 + s + 1);\n\n% Plot pzmap:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "Call `pzmap(G)`.",
        validate: (state) => { return state.currentPlot && state.currentPlot.type === "scatter" && state.currentPlot.title === "Pole-Zero Map"; }
    },
    {
        title: "Lesson 8: Root Locus",
        difficulty: "Expert",
        topic: "Advanced Stability",
        concept: "The root locus shows how closed-loop poles move as a parameter varies. Use `rlocus(G)`.",
        example: `s = tf('s');\nG = 1 / (s*(s+1)*(s+2));\nrlocus(G)`,
        task: "Plot the root locus for `G = (s+1) / (s^2 + 4*s + 4)`.",
        initialCode: `s = tf('s');\nG = (s+1) / (s^2 + 4*s + 4);\n\n% Plot rlocus:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "Call `rlocus(G)`.",
        validate: (state) => { return state.currentPlot && state.currentPlot.type === "line" && state.currentPlot.title === "Root Locus"; }
    },
    {
        title: "Lesson 9: Frequency Response (Bode Plot)",
        difficulty: "Expert",
        topic: "Frequency Domain",
        concept: "Bode plots show the magnitude and phase response of a system. Use `bode(G)`.",
        example: `s = tf('s');\nG = 10 / (s + 10);\nbode(G)`,
        task: "Plot the bode response of `G = 100 / (s^2 + 2*s + 100)`.",
        initialCode: `s = tf('s');\nG = 100 / (s^2 + 2*s + 100);\n\n% Plot bode:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "Call `bode(G)`.",
        validate: (state) => { return state.currentPlot && state.currentPlot.type === "line" && state.currentPlot.title === "Bode Diagram"; }
    },
    {
        title: "Lesson 10: PID Controller Tuning",
        difficulty: "Expert",
        topic: "Controller Design",
        concept: "A PID controller improves transient and steady-state response. Create one with `pid(Kp, Ki, Kd)` and close the loop with `feedback(C*G, 1)`.",
        example: `s = tf('s');\nG = 1 / (s^2 + s + 1);\nC = pid(5, 0, 0);\nT = feedback(C*G, 1);\nstep(T)`,
        task: "Design a PID controller for `G = 1 / (s^2 + 2*s + 1)`. Use `Kp=10, Ki=5, Kd=2`. Plot the step response of the closed-loop system `T`.",
        initialCode: `s = tf('s');\nG = 1 / (s^2 + 2*s + 1);\n\n% Create C = pid(10, 5, 2)\n% Create T = feedback(C*G, 1)\n% Plot step response of T:\n`,
        datasetName: "N/A",
        dataset: [],
        hint: "`C = pid(10, 5, 2); T = feedback(C*G, 1); step(T)`",
        validate: (state) => { return state.currentPlot && state.currentPlot.type === "line" && state.currentPlot.title === "Step Response"; }
    }
];



let currentLessonIndex = 0;
let highestLessonIndex = 0;
let editor = null;
let currentChart = null;

// --- Simulator State ---
let simulationState = {
    currentPlot: null,     // holds {type, labels, datasets: [{data}], title}
    consoleHistory: [],   // Array of print outputs
};

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
    hintBtn: document.getElementById('hint-btn'),
    hintText: document.getElementById('lesson-hint'),
    successMessage: document.getElementById('success-message'),
    
    runBtn: document.getElementById('run-btn'),
    terminalConsole: document.getElementById('terminal-console'),
    datasetGrid: document.getElementById('dataset-grid'),
    tabDataset: document.getElementById('tab-dataset'),
    chartPlaceholder: document.getElementById('chart-placeholder'),
    chartWrapper: document.getElementById('chart-wrapper'),
    heatmapGridContainer: document.getElementById('heatmap-grid-container')
};

// --- Initialization ---
async function init() {
    try {
        if (dom.totalLessons) {
            dom.totalLessons.textContent = lessons.length;
        }
        
        // Initialize CodeMirror (Python mode)
        if (typeof CodeMirror === 'undefined') {
            throw new Error("CodeMirror editor library could not be loaded. Please check your internet connection.");
        }
        const editorTextarea = document.getElementById('code-editor');
        if (!editorTextarea) {
            throw new Error("Code editor textarea (#code-editor) element not found in DOM.");
        }
        editor = CodeMirror.fromTextArea(editorTextarea, {
            mode: 'octave',
            theme: 'dracula',
            lineNumbers: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            matchBrackets: true
        });
        
        // Load lesson 0 immediately so the user sees content right away (not "Loading...")
        // We'll reload with the correct resume index after syncing progress below.
        loadLesson(0);

        // SYNC: Pull latest progress from Google Sheets
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
            try {
                await PyPlayAuth.syncFromSheets();
            } catch (e) {
                console.warn("Init sync failed, using local progress.", e);
            }
        }
        
        // Restore Progress
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            const progressObj = PyPlayAuth.user.progress || {};
            const dvProgress = progressObj.linearcontrol || { completed_lessons: [], completed: false, highest_lesson: 0 };
            let completed = dvProgress.completed_lessons;
            if (!Array.isArray(completed)) {
                completed = [];
            }
            
            if (dvProgress.highest_lesson !== undefined && dvProgress.highest_lesson !== null) {
                const parsedHighest = Number(dvProgress.highest_lesson);
                highestLessonIndex = isNaN(parsedHighest) ? 0 : parsedHighest;
            } else {
                highestLessonIndex = completed.length > 0 ? Math.max(...completed) + 1 : 0;
            }
            
            if (isNaN(highestLessonIndex)) {
                highestLessonIndex = 0;
            }
            highestLessonIndex = Math.min(highestLessonIndex, lessons.length - 1);
            
            let resumeIndex = 0;
            for (let i = 0; i < lessons.length; i++) {
                if (!completed.includes(i)) {
                    resumeIndex = i;
                    break;
                }
            }
            
            if (completed.length === lessons.length) {
                resumeIndex = lessons.length - 1;
                highestLessonIndex = lessons.length - 1;
            }
            currentLessonIndex = resumeIndex;
        }
        
        // Reload with correct resume index after progress is restored
        loadLesson(currentLessonIndex);
        setupEventListeners();
        initDrawerController();
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

// --- Load Lesson & Populate Grid ---
function loadLesson(index) {
    const lesson = lessons[index];
    
    dom.lessonNum.textContent = index + 1;
    dom.lessonTitle.textContent = lesson.title;
    dom.lessonDifficulty.textContent = lesson.difficulty;
    dom.lessonTopic.textContent = lesson.topic;
    dom.lessonConcept.innerHTML = lesson.concept;
    dom.lessonExample.textContent = lesson.example;
    dom.lessonTask.innerHTML = lesson.task;
    
    if (dom.hintText) {
        dom.hintText.textContent = lesson.hint;
        dom.hintText.classList.add('hidden');
    }
    
    editor.setValue(lesson.initialCode);
    dom.successMessage.classList.add('hidden');
    clearConsole();
    resetChartCanvas();
    
    renderProgressSteps();
    
    // Set spreadsheet headers and grid rows
    dom.tabDataset.textContent = lesson.datasetName;
    populateDatasetGrid(lesson.dataset);
    
    // Enable/disable buttons
    dom.prevBtn.disabled = index === 0;
    
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user)
        ? (PyPlayAuth.user.progress || {})
        : {};
    const dvProgress = progressObj.linearcontrol || { completed_lessons: [], completed: false };
    let completed = dvProgress.completed_lessons;
    if (!Array.isArray(completed)) {
        completed = [];
    }
    
    if (completed.includes(index) || index < highestLessonIndex) {
        dom.nextBtn.disabled = false;
    } else {
        dom.nextBtn.disabled = true;
    }
}

function renderProgressSteps() {
    const container = dom.progressStepsContainer;
    if (!container) return;
    
    container.innerHTML = '';
    
    let highest = highestLessonIndex;
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const progressObj = PyPlayAuth.user.progress || {};
        const dvProgress = progressObj.linearcontrol || { completed_lessons: [], completed: false, highest_lesson: 0 };
        let completed = dvProgress.completed_lessons;
        if (!Array.isArray(completed)) {
            completed = [];
        }
        if (dvProgress.highest_lesson !== undefined && dvProgress.highest_lesson !== null) {
            const parsedHighest = Number(dvProgress.highest_lesson);
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

// Populate the visual CSV spreadsheet
function populateDatasetGrid(data) {
    const grid = dom.datasetGrid;
    const thead = grid.querySelector('thead');
    const tbody = grid.querySelector('tbody');
    
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    if (!data || data.length === 0) return;
    
    // Detect column headers
    const cols = Object.keys(data[0]);
    const trHead = document.createElement('tr');
    cols.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    
    // Append rows
    data.forEach(row => {
        const trRow = document.createElement('tr');
        cols.forEach(col => {
            const td = document.createElement('td');
            td.textContent = row[col];
            trRow.appendChild(td);
        });
        tbody.appendChild(trRow);
    });
}

// --- Console logs ---
function appendConsole(msg) {
    dom.terminalConsole.textContent += msg;
    dom.terminalConsole.scrollTop = dom.terminalConsole.scrollHeight;
    simulationState.consoleHistory.push(msg);
}

function appendConsoleError(msg) {
    const span = document.createElement('span');
    span.style.color = '#f87171'; // Red
    span.textContent = msg + "\n";
    dom.terminalConsole.appendChild(span);
    dom.terminalConsole.scrollTop = dom.terminalConsole.scrollHeight;
}

function clearConsole() {
    dom.terminalConsole.textContent = "";
    simulationState.consoleHistory = [];
}

// --- Visual Chart.js Controls ---
function resetChartCanvas() {
    if (typeof currentChart !== 'undefined' && currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
    if (window.currentCharts) {
        window.currentCharts.forEach(c => c.destroy());
        window.currentCharts = [];
    }
    
    dom.chartPlaceholder.classList.remove('hidden');
    dom.chartWrapper.classList.add('hidden');
    dom.heatmapGridContainer.classList.add('hidden');
    
    const badge = document.getElementById('canvas-status-badge');
    badge.textContent = 'No Plot';
    badge.style.background = 'rgba(255,255,255,0.05)';
    badge.style.color = 'var(--text-muted)';
    
    simulationState.currentPlot = null;
}

function renderVisualChart(plotData) {
    resetChartCanvas();
    
    dom.chartPlaceholder.classList.add('hidden');
    
    const badge = document.getElementById('canvas-status-badge');
    badge.textContent = 'Active Plot';
    badge.style.background = 'rgba(59, 130, 246, 0.2)';
    badge.style.color = '#60a5fa';
    
    // Save state for validation
    simulationState.currentPlot = plotData;

    let plotsToRender = [];
    if (plotData.isSubplots) {
        plotsToRender = plotData.subplots.filter(p => p.type !== null);
    } else {
        plotsToRender = [plotData];
    }
    
    // Standard Heatmap Matrix render overrides Chart.js canvas
    if (plotsToRender.length > 0 && plotsToRender[0].type === "heatmap") {
        renderCustomHeatmap(plotsToRender[0].data, plotData.title || plotsToRender[0].title);
        return;
    }
    
    dom.chartWrapper.classList.remove('hidden');
    dom.chartWrapper.innerHTML = '';
    dom.chartWrapper.style.flexDirection = plotData.layout || 'row';
    
    if (plotData.isSubplots) {
        dom.chartWrapper.style.overflowY = "auto";
        dom.chartWrapper.style.overflowX = "hidden";
        dom.chartWrapper.style.justifyContent = "flex-start";
        dom.chartWrapper.style.alignItems = "stretch";
    } else {
        dom.chartWrapper.style.overflowY = "hidden";
        dom.chartWrapper.style.overflowX = "hidden";
        dom.chartWrapper.style.justifyContent = "center";
        dom.chartWrapper.style.alignItems = "center";
    }
    
    window.currentCharts = window.currentCharts || [];
    window.currentCharts.forEach(c => c.destroy());
    window.currentCharts = [];
    
    plotsToRender.forEach((pData, idx) => {
        let container = document.createElement('div');
        if (plotData.isSubplots && (plotData.layout === 'column' || !plotData.layout)) {
            container.style.flex = "1 0 auto";
            container.style.minHeight = "350px";
            container.style.width = "100%";
        } else {
            container.style.flex = "1";
            container.style.height = "100%";
        }
        container.style.minWidth = "0";
        container.style.position = "relative";
        
        let canvas = document.createElement('canvas');
        canvas.id = 'chart-canvas-' + idx;
        container.appendChild(canvas);
        
        dom.chartWrapper.appendChild(container);
        
        const ctx = canvas.getContext('2d');
        
        let config = {
            type: pData.type === "boxplot" ? "bar" : pData.type,
            data: {
                labels: pData.labels || [],
                datasets: pData.datasets.map(ds => ({
                    label: ds.label || 'Data Variable',
                    data: ds.data,
                    backgroundColor: ds.backgroundColor || (pData.type === 'line' ? 'rgba(59, 130, 246, 0.15)' : [
                        'rgba(59, 130, 246, 0.75)',
                        'rgba(16, 185, 129, 0.75)',
                        'rgba(236, 72, 153, 0.75)',
                        'rgba(245, 158, 11, 0.75)',
                        'rgba(139, 92, 246, 0.75)',
                        'rgba(239, 68, 68, 0.75)'
                    ]),
                    borderColor: ds.borderColor || '#3b82f6',
                    borderWidth: ds.borderWidth || (pData.type === 'line' ? 3 : 1),
                    tension: 0.4,
                    pointBackgroundColor: ds.pointBackgroundColor || '#fff',
                    pointBorderColor: ds.pointBorderColor || '#3b82f6',
                    pointRadius: ds.pointRadius !== undefined ? ds.pointRadius : ((pData.type === 'line' || pData.type === 'scatter') ? 5 : 0),
                    pointStyle: ds.pointStyle || 'circle'
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: pData.title || (plotData.isSubplots && plotData.title ? plotData.title : 'Data Science Analytics'),
                        color: '#fff',
                        font: { family: 'Inter', size: 14, weight: 'bold' }
                    },
                    legend: {
                        display: pData.type === 'pie' || pData.type === 'doughnut',
                        labels: { color: '#94a3b8', font: { family: 'Inter' } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    if (context.raw && context.raw.x !== undefined && context.raw.y !== undefined) {
                                        let xVal = Math.round(context.raw.x * 1000) / 1000;
                                        let yVal = Math.round(context.raw.y * 1000) / 1000;
                                        label += `(${xVal}, ${yVal})`;
                                        if (context.raw.k !== undefined) {
                                            let kVal = Math.round(context.raw.k * 1000) / 1000;
                                            label += ` | K: ${kVal}`;
                                        }
                                    } else {
                                        label += context.parsed.y;
                                    }
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: pData.type === 'pie' || pData.type === 'doughnut' ? {} : {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 10 } }
                    }
                }
            }
        };
        
        if (pData.type === "boxplot") {
            config.data.labels = ["Min", "Q1", "Median", "Q3", "Max", "Outliers"];
            config.data.datasets = [{
                label: "Salary Ranges ($)",
                data: [45000, 48000, 50000, 52000, 53000, 115000],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.5)',  
                    'rgba(245, 158, 11, 0.5)', 
                    'rgba(16, 185, 129, 0.6)', 
                    'rgba(59, 130, 246, 0.5)',  
                    'rgba(139, 92, 246, 0.5)', 
                    'rgba(236, 72, 153, 0.8)'  
                ],
                borderColor: '#fff',
                borderWidth: 1.5
            }];
        }
        
        if (pData.type === "scatter") {
            config.options.scales.x.type = 'linear';
            config.options.scales.x.position = 'bottom';
        }
        
        let chart = new Chart(ctx, config);
        window.currentCharts.push(chart);
    });
}

// Generate gorgeous 3x3 styled matrices for Seaborn correlation heatmaps
function renderCustomHeatmap(matrix, title) {
    dom.heatmapGridContainer.classList.remove('hidden');
    dom.heatmapGridContainer.innerHTML = '';
    
    const rows = 3;
    const cols = 3;
    dom.heatmapGridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    dom.heatmapGridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    // Feature titles
    const labels = ["Temp", "Humidity", "Sales"];
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellVal = matrix[r][c];
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Generate vibrant heat color based on correlation strength (0.0 to 1.0)
            // 1.0 is full neon red-coral, 0.7 is warm gold
            const alpha = 0.3 + (cellVal * 0.7);
            cell.style.backgroundColor = `rgba(239, 68, 68, ${alpha})`;
            cell.style.border = '1px solid rgba(255,255,255,0.05)';
            
            cell.innerHTML = `
                <span>${cellVal.toFixed(2)}</span>
                <span class="heatmap-label">${labels[r]} x ${labels[c]}</span>
            `;
            dom.heatmapGridContainer.appendChild(cell);
        }
    }
    
    // Append a title badge at top of visual panel
    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'position: absolute; top: 1.5rem; left: 50%; transform: translateX(-50%); font-weight:700; color:#fff; font-size:0.9rem;';
    titleDiv.textContent = title || "Heatmap Correlation";
    dom.heatmapGridContainer.appendChild(titleDiv);
}
// --- MATLAB TO JAVASCRIPT TRANSPILER ---
function transpileMATLABCode(mCode) {
    const rawCode = mCode;
    let code = mCode.replace(/%.*$/gm, ''); // Strip MATLAB comments
    let lines = code.split('\n');
    let result = [];
    let symVars = new Set(); // Track symbolic variable names

    const cmds = ['tf', 'laplace', 'limit', 'step', 'pzmap', 'rlocus', 'bode', 'pid', 'feedback', 'dcgain', 'pole'];
    const cmdPattern = new RegExp(`^(${cmds.join('|')})$`);

    for (let line of lines) {
        let t = line.trim().replace(/;\s*$/, '').trim();
        if (!t) { result.push(''); continue; }

        // 1) syms declaration → string variables
        let symsM = t.match(/^syms\s+(.+)$/);
        if (symsM) {
            symsM[1].split(/\s+/).forEach(v => symVars.add(v));
            result.push(symsM[1].split(/\s+/).map(v => `var ${v} = "${v}";`).join('\n'));
            continue;
        }

        // 2) disp(expr) → sandbox.print
        let dispM = t.match(/^disp\s*\(\s*(.+?)\s*\)$/);
        if (dispM) {
            result.push(`await sandbox.print(${dispM[1]});`);
            continue;
        }

        let processArgs = (argsStr) => {
            if (!argsStr) return argsStr;
            let args = argsStr.split(',').map(s => s.trim());
            return args.map(arg => {
                let containsSym = [...symVars].some(sv => new RegExp(`\\b${sv}\\b`).test(arg));
                if (containsSym && arg.match(/[-+*/()]/)) {
                    let replacedArg = arg;
                    [...symVars].forEach(sv => {
                        replacedArg = replacedArg.replace(new RegExp(`\\b${sv}\\b`, 'g'), `\${${sv}}`);
                    });
                    return `\`${replacedArg}\``;
                }
                return arg;
            }).join(', ');
        };

        // 3) Assignment with command call: X = cmd(args)
        let aCmdM = t.match(new RegExp(`^([a-zA-Z_]\\w*)\\s*=\\s*(${cmds.join('|')})\\s*\\((.*)\\)$`));
        if (aCmdM) {
            let [, varName, cmd, rawArgs] = aCmdM;
            let pArgs = processArgs(rawArgs);
            result.push(`var ${varName} = await sandbox.${cmd}(${pArgs});`);
            if (!['dcgain', 'pole', 'limit'].includes(cmd)) {
                symVars.add(varName);
            }
            continue;
        }

        // 4) Standalone command call: step(G), pzmap(G), etc.
        let sCmdM = t.match(new RegExp(`^(${cmds.join('|')})\\s*\\((.*)\\)$`));
        if (sCmdM) {
            let pArgs = processArgs(sCmdM[2]);
            result.push(`await sandbox.${sCmdM[1]}(${pArgs});`);
            continue;
        }

        // 5) Regular assignment: X = expression
        let aM = t.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (aM) {
            let varName = aM[1];
            let rhs = aM[2].trim();
            // Check if the RHS contains any symbolic variable
            let containsSym = [...symVars].some(sv => new RegExp(`\\b${sv}\\b`).test(rhs));
            if (containsSym) {
                // Keep as a string (symbolic expression)
                result.push(`var ${varName} = "${rhs.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}";`);
                symVars.add(varName);
            } else {
                // Evaluate as JavaScript arithmetic
                result.push(`var ${varName} = ${rhs};`);
            }
            continue;
        }

        // 6) Pass through anything else
        result.push(t + ';');
    }

    return result.join('\n');
}

// --- SANDBOXED MATLAB EXECUTION ---
async function runPythonCode() {
    const mCode = editor.getValue();
    clearConsole();
    resetChartCanvas();
    
    try {
        const transpiled = transpileMATLABCode(mCode);
        console.log("TRANSPILED MATLAB CODE:", transpiled);
        
        // Define sandboxed MATLAB control system functions
        const sandbox = {
            _rawCode: mCode, // Store raw code for pattern matching
            
            print: async (...args) => {
                const msg = args.map(arg => {
                    if (Array.isArray(arg)) return JSON.stringify(arg);
                    if (typeof arg === 'object' && arg !== null) return JSON.stringify(arg);
                    return String(arg);
                }).join(' ');
                appendConsole(msg + "\n");
            },
            
            // --- MATLAB Control System Toolbox Emulation ---
            tf: async (numOrStr, den) => {
                if (numOrStr === 's') return 's';
                return `Transfer Function: ${numOrStr} / ${den || 1}`;
            },
            
            laplace: async (f) => {
                let expr = (typeof f === 'string') ? f : sandbox._rawCode;
                expr = expr.replace(/\s+/g, '').replace(/["']/g, ''); // Clean up spaces/quotes

                // exp(a*t) or exp(-a*t)
                let expMatch = expr.match(/exp\((-?\d+(?:\.\d+)?)\*?t\)/);
                if (expMatch) {
                    let a = parseFloat(expMatch[1]);
                    return a < 0 ? `1/(s + ${-a})` : `1/(s - ${a})`;
                }
                if (expr.includes('exp(t)')) return '1/(s - 1)';
                if (expr.includes('exp(-t)')) return '1/(s + 1)';

                // sin(w*t)
                let sinMatch = expr.match(/sin\((-?\d+(?:\.\d+)?)\*?t\)/);
                if (sinMatch) {
                    let w = parseFloat(sinMatch[1]);
                    return `${w}/(s^2 + ${w*w})`;
                }
                if (expr.includes('sin(t)')) return '1/(s^2 + 1)';

                // cos(w*t)
                let cosMatch = expr.match(/cos\((-?\d+(?:\.\d+)?)\*?t\)/);
                if (cosMatch) {
                    let w = parseFloat(cosMatch[1]);
                    return `s/(s^2 + ${w*w})`;
                }
                if (expr.includes('cos(t)')) return 's/(s^2 + 1)';

                // t^n
                let tnMatch = expr.match(/t\^(\d+)/);
                if (tnMatch) {
                    let n = parseInt(tnMatch[1]);
                    let fact = 1; for(let i=2; i<=n; i++) fact *= i;
                    return `${fact}/s^${n+1}`;
                }
                if (expr === 't' || expr.includes('laplace(t)')) return '1/s^2';
                if (expr === '1' || expr.includes('laplace(1)')) return '1/s';

                return '1/(s + 2)'; // Fallback
            },
            
            parse2ndOrder: (sysStr) => {
                // Match patterns like K / (s^2 + A*s + B) or (s+Z) / (s^2 + A*s + B)
                let m = sysStr.match(/(?:(?:\d+(?:\.\d+)?)|(?:\(\s*s\s*\+\s*\d+(?:\.\d+)?\s*\)))\s*\/\s*\(\s*s\^2\s*\+\s*(\d+(?:\.\d+)?)\*?s\s*\+\s*(\d+(?:\.\d+)?)\s*\)/);
                if (m) {
                    // Extract K separately if N is just a number
                    let kMatch = sysStr.match(/(\d+(?:\.\d+)?)\s*\//);
                    let K = kMatch ? parseFloat(kMatch[1]) : 1;
                    return { K, A: parseFloat(m[1]), B: parseFloat(m[2]) };
                }
                return null;
            },
            
            limit: async (expr, v, val) => {
                let sVal = (val == 0) ? '1e-8' : String(val); // Approximate limit
                let raw = sandbox._rawCode;
                
                // Extract the exact expression passed to limit() from the raw code
                let m = raw.match(/limit\s*\(\s*(.*?)\s*,/);
                let targetExpr = m ? m[1] : (typeof expr === 'string' ? expr : '');
                
                if (!targetExpr) return 1;
                
                // Resolve any variables (like F or G) that were defined earlier in the code
                let lines = raw.split('\n');
                for (let line of lines) {
                    let aMatch = line.trim().match(/^([a-zA-Z_]\w*)\s*=\s*(.+?);?$/);
                    if (aMatch && targetExpr.includes(aMatch[1])) {
                        // Replace variable with its definition wrapped in parens
                        let regex = new RegExp(`\\b${aMatch[1]}\\b`, 'g');
                        targetExpr = targetExpr.replace(regex, `(${aMatch[2]})`);
                    }
                }
                
                try {
                    let toEval = targetExpr.replace(/\bs\b/g, sVal).replace(/\^/g, '**');
                    let res = eval(toEval);
                    return Math.round(res * 1000) / 1000;
                } catch(e) {
                    return 1;
                }
            },
            
            step: async (sys) => {
                sandbox.pltState.type = "line";
                sandbox.pltState.title = "Step Response";
                
                let t = [];
                let y = [];
                let sysStr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                let tf = sandbox.parseTF(sysStr);
                let num = tf.num;
                let den = tf.den;
                
                while(den.length > 1 && Math.abs(den[den.length-1]) < 1e-9) den.pop();
                let N = den.length - 1;
                
                if (num.length > den.length) {
                    sandbox.pltState.labels = ["0"];
                    sandbox.pltState.datasets = [{ data: [0], label: "Improper System Error", pointRadius: 0 }];
                    sandbox.pltState.isSubplots = false;
                    await sandbox.plt_show();
                    return;
                }
                
                if (N === 0) {
                    let gain = (num[0] || 0) / den[0];
                    for(let i=0; i<=100; i++) { t.push((i*0.1).toFixed(1)); y.push(gain); }
                    sandbox.pltState.labels = t;
                    sandbox.pltState.datasets = [{ data: y, label: "Amplitude", pointRadius: 0 }];
                    sandbox.pltState.isSubplots = false;
                    await sandbox.plt_show();
                    return;
                }
                
                let aN = den[N];
                let a = [];
                for(let i=0; i<N; i++) a[i] = (den[i] || 0) / aN;
                
                let D = (num[N] || 0) / aN;
                let b = [];
                for(let i=0; i<N; i++) {
                    b[i] = ((num[i] || 0) / aN) - D * a[i];
                }
                
                let poles = sandbox.getRootsDK([...den]);
                let slowestReal = -1e9;
                let maxWn = 0.1;
                for (let pStr of poles) {
                    let r = 0, i = 0;
                    if (typeof pStr === 'number') r = pStr;
                    else {
                        let match = String(pStr).match(/([-0-9.]+)([-+][0-9.]+)i/);
                        if (match) { r = parseFloat(match[1]); i = parseFloat(match[2]); }
                        else r = parseFloat(pStr);
                    }
                    if (r < 0 && r > slowestReal) slowestReal = r;
                    let wn = Math.sqrt(r*r + i*i);
                    if (wn > maxWn) maxWn = wn;
                }
                
                let tMax = 10.0;
                if (slowestReal !== -1e9 && slowestReal < 0) {
                    tMax = Math.abs(5.0 / slowestReal); 
                }
                if (tMax > 100) tMax = 100;
                if (tMax < 0.1) tMax = 0.1;
                
                let dt = Math.min(0.01, 0.1 / maxWn); 
                let steps = Math.ceil(tMax / dt);
                let recordStep = Math.max(1, Math.floor(steps / 200));
                
                let x = new Array(N).fill(0);
                
                let computeDx = (currX) => {
                    let dx = new Array(N).fill(0);
                    for(let i=0; i<N-1; i++) dx[i] = currX[i+1];
                    let sum = 1.0;
                    for(let i=0; i<N; i++) sum -= a[i] * currX[i];
                    dx[N-1] = sum;
                    return dx;
                };
                
                for(let step = 0; step <= steps; step++) {
                    if (step % recordStep === 0) {
                        t.push((step * dt).toFixed(2));
                        let out = D * 1.0;
                        for(let i=0; i<N; i++) out += b[i] * x[i];
                        y.push(parseFloat(out.toFixed(4)));
                    }
                    
                    let k1 = computeDx(x);
                    let x_k2 = []; for(let i=0; i<N; i++) x_k2[i] = x[i] + 0.5 * dt * k1[i];
                    let k2 = computeDx(x_k2);
                    let x_k3 = []; for(let i=0; i<N; i++) x_k3[i] = x[i] + 0.5 * dt * k2[i];
                    let k3 = computeDx(x_k3);
                    let x_k4 = []; for(let i=0; i<N; i++) x_k4[i] = x[i] + dt * k3[i];
                    let k4 = computeDx(x_k4);
                    
                    for(let i=0; i<N; i++) {
                        x[i] += (dt / 6) * (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]);
                    }
                }
                
                sandbox.pltState.labels = t;
                sandbox.pltState.datasets = [{ data: y, label: "Amplitude", pointRadius: 0 }];
                sandbox.pltState.isSubplots = false;
                await sandbox.plt_show();
            },
            
            pzmap: async (sys) => {
                sandbox.pltState.type = "scatter";
                sandbox.pltState.title = "Pole-Zero Map";
                let sysStr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                let params = sandbox.parse2ndOrder(sysStr);
                
                let poles = [];
                let zeros = [];
                
                if (params) {
                    let {A, B} = params;
                    let wn = Math.sqrt(B);
                    let zeta = A / (2 * wn);
                    if (zeta < 1) {
                        let wd = wn * Math.sqrt(1 - zeta*zeta);
                        poles = [{x: -zeta*wn, y: wd}, {x: -zeta*wn, y: -wd}];
                    } else {
                        let s1 = -zeta*wn + wn*Math.sqrt(zeta*zeta - 1);
                        let s2 = -zeta*wn - wn*Math.sqrt(zeta*zeta - 1);
                        poles = [{x: s1, y: 0}, {x: s2, y: 0}];
                    }
                    
                    let zMatch = sysStr.match(/\(s\s*\+\s*(\d+(?:\.\d+)?)\)/);
                    if (zMatch) {
                        zeros = [{x: -parseFloat(zMatch[1]), y: 0}];
                    }
                } else {
                    poles = [{x: -0.5, y: 0.866}, {x: -0.5, y: -0.866}];
                    zeros = [{x: -2, y: 0}];
                }
                
                sandbox.pltState.datasets = [
                    { data: poles, label: "Poles (×)", pointStyle: 'crossRot', pointRadius: 8, pointBorderColor: '#ef4444', pointBackgroundColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent' },
                    { data: zeros, label: "Zeros (○)", pointStyle: 'circle', pointRadius: 8, pointBorderColor: '#10b981', pointBackgroundColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent' }
                ];
                sandbox.pltState.isSubplots = false;
                await sandbox.plt_show();
            },
            
            rlocus: async (sys) => {
                sandbox.pltState.type = "scatter";
                sandbox.pltState.title = "Root Locus";
                let sysStr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                sysStr = sysStr.replace(/Transfer Function:\s*/, '');
                
                let numStr = "1";
                let denStr = sysStr;
                let splitMatch = sysStr.match(/(.*?)\/\s*\((.*?)\)/);
                if (splitMatch) {
                    numStr = splitMatch[1];
                    denStr = splitMatch[2];
                } else {
                    let simpleSplit = sysStr.split('/');
                    if (simpleSplit.length === 2) {
                        numStr = simpleSplit[0];
                        denStr = simpleSplit[1];
                    }
                }
                
                let numCoeffs = sandbox.parsePoly(numStr);
                let denCoeffs = sandbox.parsePoly(denStr);
                
                let maxDegree = Math.max(numCoeffs.length, denCoeffs.length);
                while(numCoeffs.length < maxDegree) numCoeffs.push(0);
                while(denCoeffs.length < maxDegree) denCoeffs.push(0);
                
                let K_vals = [];
                for(let i = 0; i <= 200; i++) K_vals.push(i / 10);
                for(let i = 0; i <= 50; i++) K_vals.push(20 + i * 2);
                for(let i = 0; i <= 20; i++) K_vals.push(120 + i * 10);
                
                let openLoopPoles = sandbox.getRootsDK([...denCoeffs]);
                let openLoopZeros = sandbox.getRootsDK([...numCoeffs]);
                
                let scatterPoints = [];
                
                for(let K of K_vals) {
                    let charEq = [];
                    for(let i = 0; i < maxDegree; i++) {
                        charEq[i] = denCoeffs[i] + K * numCoeffs[i];
                    }
                    let roots = sandbox.getRootsDK(charEq);
                    for(let rStr of roots) {
                        let r = 0, i = 0;
                        if (typeof rStr === 'number') {
                            r = rStr;
                        } else {
                            let match = String(rStr).match(/([-0-9.]+)([-+][0-9.]+)i/);
                            if (match) {
                                r = parseFloat(match[1]);
                                i = parseFloat(match[2]);
                            } else {
                                r = parseFloat(rStr);
                            }
                        }
                        scatterPoints.push({x: r, y: i, k: K});
                    }
                }
                
                let parseComplexArray = (arr) => {
                    return arr.map(rStr => {
                        let r = 0, i = 0;
                        if (typeof rStr === 'number') r = rStr;
                        else {
                            let match = String(rStr).match(/([-0-9.]+)([-+][0-9.]+)i/);
                            if (match) { r = parseFloat(match[1]); i = parseFloat(match[2]); }
                            else r = parseFloat(rStr);
                        }
                        return {x: r, y: i};
                    });
                };
                
                sandbox.pltState.datasets = [
                    { data: scatterPoints, label: "Locus", pointRadius: 2, pointBackgroundColor: '#3b82f6', pointBorderColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent' },
                    { data: parseComplexArray(openLoopPoles), label: "Poles (×)", pointStyle: 'crossRot', pointRadius: 8, pointBorderColor: '#ef4444', pointBackgroundColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent' },
                    { data: parseComplexArray(openLoopZeros), label: "Zeros (○)", pointStyle: 'circle', pointRadius: 8, pointBorderColor: '#10b981', pointBackgroundColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent' }
                ];
                
                sandbox.pltState.isSubplots = false;
                await sandbox.plt_show();
            },
            
            bode: async (sys) => {
                sandbox.pltState.title = "Bode Diagram";
                let sysStr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                sysStr = sysStr.replace(/Transfer Function:\s*/, '');
                
                let numStr = "1";
                let denStr = sysStr;
                let splitMatch = sysStr.match(/(.*?)\/\s*\((.*?)\)/);
                if (splitMatch) {
                    numStr = splitMatch[1];
                    denStr = splitMatch[2];
                } else {
                    let simpleSplit = sysStr.split('/');
                    if (simpleSplit.length === 2) {
                        numStr = simpleSplit[0];
                        denStr = simpleSplit[1];
                    }
                }
                
                let numCoeffs = sandbox.parsePoly(numStr);
                let denCoeffs = sandbox.parsePoly(denStr);
                
                let evalFreq = (coeffs, w) => {
                    let r = 0, i = 0;
                    for (let k = 0; k < coeffs.length; k++) {
                        let mag = coeffs[k] * Math.pow(w, k);
                        let cycle = k % 4;
                        if (cycle === 0) r += mag;
                        else if (cycle === 1) i += mag;
                        else if (cycle === 2) r -= mag;
                        else if (cycle === 3) i -= mag;
                    }
                    return {r, i};
                };
                
                let freqs = [];
                let mags = [];
                let phases = [];
                
                for (let exp = -1; exp <= 3; exp += 0.05) {
                    let w = Math.pow(10, exp);
                    freqs.push(w < 1 ? w.toFixed(2) : (w < 10 ? w.toFixed(1) : Math.round(w)));
                    
                    let numEval = evalFreq(numCoeffs, w);
                    let denEval = evalFreq(denCoeffs, w);
                    
                    let numMag = Math.sqrt(numEval.r*numEval.r + numEval.i*numEval.i);
                    let denMag = Math.sqrt(denEval.r*denEval.r + denEval.i*denEval.i);
                    let mag = (numMag / denMag) || 1e-10;
                    
                    mags.push(parseFloat((20 * Math.log10(mag)).toFixed(2)));
                    
                    let numPhase = Math.atan2(numEval.i, numEval.r);
                    let denPhase = Math.atan2(denEval.i, denEval.r);
                    let phase = (numPhase - denPhase) * (180 / Math.PI);
                    
                    if (phases.length > 0) {
                        let prev = phases[phases.length - 1];
                        while (phase - prev > 180) phase -= 360;
                        while (phase - prev < -180) phase += 360;
                    }
                    phases.push(parseFloat(phase.toFixed(2)));
                }
                
                sandbox.pltState.isSubplots = true;
                sandbox.pltState.layout = 'column';
                sandbox.pltState.subplots = [
                    {
                        type: 'line',
                        title: 'Magnitude (dB)',
                        labels: freqs,
                        datasets: [{ data: mags, label: 'Magnitude (dB)' }]
                    },
                    {
                        type: 'line',
                        title: 'Phase (deg)',
                        labels: freqs,
                        datasets: [{ data: phases, label: 'Phase (deg)', borderColor: '#10b981', pointBorderColor: '#10b981' }]
                    }
                ];
                
                await sandbox.plt_show();
            },
            
            pid: async (Kp, Ki, Kd) => {
                let num = [Ki || 0, Kp || 0, Kd || 0];
                while(num.length > 1 && num[num.length-1] === 0) num.pop();
                return `(${sandbox.polyToStr(num)}) / (s)`;
            },
            
            feedback: async (sys1, sys2) => {
                if (!sys2) sys2 = '1';
                let tf1 = sandbox.parseTF(sys1);
                let tf2 = sandbox.parseTF(sys2);
                
                let N1D2 = sandbox.multiplyPoly(tf1.num, tf2.den);
                let D1D2 = sandbox.multiplyPoly(tf1.den, tf2.den);
                let N1N2 = sandbox.multiplyPoly(tf1.num, tf2.num);
                
                let resDen = sandbox.addPoly(D1D2, N1N2);
                
                return `(${sandbox.polyToStr(N1D2)}) / (${sandbox.polyToStr(resDen)})`;
            },
            
            dcgain: async (sys) => {
                let expr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                expr = expr.replace(/Transfer Function:\s*/, '');
                try {
                    let toEval = expr.replace(/\bs\b/g, '0').replace(/\^/g, '**');
                    return eval(toEval);
                } catch(e) {
                    return 2;
                }
            },
            
            parsePoly: (expr) => {
                let s = expr.replace(/\s+/g, '').replace(/-/g, '+-').split('+');
                let coeffs = [];
                for (let term of s) {
                    if (!term) continue;
                    let c = 1, p = 0;
                    if (!term.includes('s')) {
                        c = parseFloat(term);
                        p = 0;
                    } else {
                        let parts = term.split('*s');
                        let cStr = '', pStr = '';
                        if (parts.length === 1) { 
                            let idx = term.indexOf('s');
                            cStr = term.substring(0, idx);
                            pStr = term.substring(idx);
                        } else {
                            cStr = parts[0];
                            pStr = 's' + parts[1];
                        }
                        c = (cStr === '' || cStr === '+') ? 1 : (cStr === '-' ? -1 : parseFloat(cStr));
                        if (pStr === 's') p = 1;
                        else if (pStr.startsWith('s^')) p = parseInt(pStr.substring(2));
                    }
                    if (!isNaN(c) && !isNaN(p)) {
                        coeffs[p] = (coeffs[p] || 0) + c;
                    }
                }
                for(let i=0; i<coeffs.length; i++) if (coeffs[i] === undefined) coeffs[i] = 0;
                return coeffs;
            },
            
            multiplyPoly: (p1, p2) => {
                if (p1.length === 0 || p2.length === 0) return [0];
                let res = new Array(p1.length + p2.length - 1).fill(0);
                for (let i = 0; i < p1.length; i++) {
                    for (let j = 0; j < p2.length; j++) {
                        res[i+j] += p1[i] * p2[j];
                    }
                }
                return res;
            },
            
            addPoly: (p1, p2) => {
                let len = Math.max(p1.length, p2.length);
                let res = new Array(len).fill(0);
                for (let i = 0; i < len; i++) {
                    res[i] = (p1[i] || 0) + (p2[i] || 0);
                }
                return res;
            },
            
            polyToStr: (coeffs) => {
                let terms = [];
                for (let i = coeffs.length - 1; i >= 0; i--) {
                    if (coeffs[i] === 0 && i !== 0) continue;
                    if (coeffs[i] === 0 && i === 0 && terms.length > 0) continue;
                    let c = coeffs[i];
                    let term = "";
                    if (i === 0) term = `${c}`;
                    else if (i === 1) term = (c === 1 ? 's' : (c === -1 ? '-s' : `${c}*s`));
                    else term = (c === 1 ? `s^${i}` : (c === -1 ? `-s^${i}` : `${c}*s^${i}`));
                    terms.push(term);
                }
                if (terms.length === 0) return "0";
                return terms.join(' + ').replace(/\+ -/g, '- ');
            },
            
            parseTF: (sysStr) => {
                sysStr = String(sysStr).replace(/Transfer Function:\s*/, '');
                let parts = sysStr.split('*');
                let finalNum = [1];
                let finalDen = [1];
                for (let part of parts) {
                    let numStr = "1", denStr = "1";
                    let splitMatch = part.match(/(.*?)\/\s*\((.*?)\)/);
                    if (splitMatch) { numStr = splitMatch[1]; denStr = splitMatch[2]; }
                    else {
                        let simpleSplit = part.split('/');
                        if (simpleSplit.length === 2) { numStr = simpleSplit[0]; denStr = simpleSplit[1]; }
                        else numStr = part;
                    }
                    numStr = numStr.replace(/^\s*\(\s*|\s*\)\s*$/g, '');
                    denStr = denStr.replace(/^\s*\(\s*|\s*\)\s*$/g, '');
                    
                    let nc = sandbox.parsePoly(numStr);
                    let dc = sandbox.parsePoly(denStr);
                    finalNum = sandbox.multiplyPoly(finalNum, nc);
                    finalDen = sandbox.multiplyPoly(finalDen, dc);
                }
                return {num: finalNum, den: finalDen};
            },
            
            getRootsDK: (coeffs) => {
                while(coeffs.length > 0 && Math.abs(coeffs[coeffs.length-1]) < 1e-9) coeffs.pop();
                if (coeffs.length <= 1) return [];
                let n = coeffs.length - 1;
                let P = coeffs.map(c => c / coeffs[n]);
                
                let evalPoly = (z) => {
                    let sum = {r: 0, i: 0};
                    for(let k=0; k<=n; k++) {
                        let r = 1, i = 0;
                        for(let j=0; j<k; j++) {
                            let r_new = r*z.r - i*z.i;
                            let i_new = r*z.i + i*z.r;
                            r = r_new; i = i_new;
                        }
                        sum.r += P[k]*r;
                        sum.i += P[k]*i;
                    }
                    return sum;
                };
                
                let R = [];
                for(let i=0; i<n; i++) {
                    let angle = 2 * Math.PI * i / n + 0.1;
                    R.push({r: Math.cos(angle), i: Math.sin(angle)});
                }
                
                for(let iter=0; iter<100; iter++) {
                    for(let i=0; i<n; i++) {
                        let num = evalPoly(R[i]);
                        let den = {r: 1, i: 0};
                        for(let j=0; j<n; j++) {
                            if (i !== j) {
                                let diff = {r: R[i].r - R[j].r, i: R[i].i - R[j].i};
                                let r_new = den.r*diff.r - den.i*diff.i;
                                let i_new = den.r*diff.i + den.i*diff.r;
                                den = {r: r_new, i: i_new};
                            }
                        }
                        let mag2 = den.r*den.r + den.i*den.i;
                        if(mag2 > 1e-15) {
                            R[i].r -= (num.r*den.r + num.i*den.i)/mag2;
                            R[i].i -= (num.i*den.r - num.r*den.i)/mag2;
                        }
                    }
                }
                
                return R.map(z => {
                    if (Math.abs(z.i) < 1e-3) return Math.round(z.r * 100) / 100;
                    return (Math.round(z.r*100)/100) + (z.i > 0 ? "+" : "") + (Math.round(z.i*100)/100) + "i";
                });
            },
            
            pole: async (sys) => {
                let expr = (typeof sys === 'string') ? sys : sandbox._rawCode;
                expr = expr.replace(/Transfer Function:\s*/, '');
                let denMatch = expr.match(/\/\s*\((.*?)\)/);
                let denStr = denMatch ? denMatch[1] : expr;
                
                try {
                    let coeffs = sandbox.parsePoly(denStr);
                    let roots = sandbox.getRootsDK(coeffs);
                    if (roots.length > 0) return roots;
                } catch(e) {}
                
                return [0, -1, -2]; // Ultimate fallback
            },
            
            plt_show: async () => {
                renderVisualChart(sandbox.pltState);
            },
            
            // Plot state for Chart.js
            pltState: {
                type: null,
                labels: null,
                datasets: [],
                title: "MATLAB Figure",
                data: null,
                isSubplots: false,
                subplots: [],
                activePlotIndex: 0
            }
        };
        
        // Execute inside an async function
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const execFn = new AsyncFunction('sandbox', 'appendConsole', transpiled);
        await execFn(sandbox, appendConsole);
        
        // Trigger verification
        checkLessonCompletion();
        
        // Auto-slide drawer depending on execution results
        const hasPlot = /\b(step|pzmap|rlocus|bode)\b/.test(mCode);
        if (window.PyPlayDrawer) {
            setTimeout(() => {
                if (hasPlot) {
                    window.PyPlayDrawer.showPanel('canvas');
                } else {
                    window.PyPlayDrawer.showPanel('console');
                }
            }, 100);
        }
        
    } catch (e) {
        console.error("MATLAB Execution Error:", e);
        appendConsoleError("MATLAB Runtime Error:\n" + e.message);
        if (window.PyPlayDrawer) {
            setTimeout(() => {
                window.PyPlayDrawer.showPanel('console');
            }, 100);
        }
    }
}

// --- TASK COMPLETION VALIDATOR ---
function checkLessonCompletion() {
    const lesson = lessons[currentLessonIndex];
    
    const passed = lesson.validate(simulationState, simulationState.consoleHistory);
    
    if (passed) {
        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;
        
        // Bounce animation on success card
        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight; 
        dom.successMessage.style.animation = null;
        
        // Save progress to database & sheets
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("linearcontrol", currentLessonIndex, true);
            highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
            renderProgressSteps();
        }
        
        // Last lesson completed
        if (currentLessonIndex === lessons.length - 1) {
            dom.nextBtn.textContent = "Finish Course";
            dom.nextBtn.disabled = false;
        }
    }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Run button toggle
    dom.runBtn.addEventListener('click', runPythonCode);
    
    // Hint button toggle
    if (dom.hintBtn) {
        dom.hintBtn.addEventListener('click', () => {
            dom.hintText.classList.toggle('hidden');
        });
    }
    
    // Next Button Navigation
    dom.nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else {
            alert("Congratulations! You have completed the Linear Control Systems course! 🏆🎛️");
            renderProgressSteps();
        }
    });
    
    // Previous Button Navigation
    dom.prevBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(currentLessonIndex);
        }
    });
    
    // Ctrl + Enter shortcut to run code
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            dom.runBtn.click();
        }
    });
}

// --- Slide-out Left, Shifted Left-Center, and Right Drawer Controllers ---
const drawerState = {
    canvas: { isOpen: false },
    console: { isOpen: false },
    csv: { isOpen: false }
};

function initDrawerController() {
    const drawers = {
        canvas: document.getElementById('drawer-canvas'),
        console: document.getElementById('drawer-console'),
        csv: document.getElementById('drawer-csv')
    };
    
    const buttons = {
        canvas: document.getElementById('dock-btn-canvas'),
        console: document.getElementById('dock-btn-console'),
        csv: document.getElementById('dock-btn-csv')
    };
    
    const closeButtons = {
        canvas: document.getElementById('close-canvas-btn'),
        console: document.getElementById('close-console-btn'),
        csv: document.getElementById('close-csv-btn')
    };
    
    function showDrawer(key) {
        // Close other drawers to ensure only one window is open at a time
        Object.keys(drawers).forEach(k => {
            if (k !== key && drawerState[k].isOpen) {
                drawers[k].classList.remove('open');
                buttons[k].classList.remove('active');
                drawerState[k].isOpen = false;
            }
        });

        drawers[key].classList.add('open');
        buttons[key].classList.add('active');
        drawerState[key].isOpen = true;
    }
    
    function closeDrawer(key) {
        drawers[key].classList.remove('open');
        buttons[key].classList.remove('active');
        drawerState[key].isOpen = false;
    }
    
    function toggleDrawer(key) {
        if (drawerState[key].isOpen) {
            closeDrawer(key);
        } else {
            showDrawer(key);
        }
    }
    
    // Wire up dock buttons
    Object.keys(buttons).forEach(key => {
        buttons[key].addEventListener('click', () => {
            toggleDrawer(key);
        });
    });
    
    // Wire up close buttons
    Object.keys(closeButtons).forEach(key => {
        closeButtons[key].addEventListener('click', () => {
            closeDrawer(key);
        });
    });
    
    // Expose helpers globally
    window.PyPlayDrawer = {
        showPanel: (key) => showDrawer(key),
        closeDrawer: (key) => closeDrawer(key),
        toggle: (key) => toggleDrawer(key),
        closeAll: () => {
            Object.keys(drawers).forEach(closeDrawer);
        }
    };
}

// Initialize on document ready
window.addEventListener('DOMContentLoaded', init);
