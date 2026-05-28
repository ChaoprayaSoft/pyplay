// --- Data Visualization & Analytics Lesson Database ---
const lessons = [
    {
        title: "Capstone 1: E-Commerce Data Cleaning",
        difficulty: "Expert",
        topic: "Data Cleaning",
        concept: "Real world data is messy. Your goal is to load `dirty_sales.csv`, drop rows where the `Price` is missing (using `df.dropna(subset=['Price'])`), and filter out any rows where `Qty` is less than 1. Finally, print the remaining number of rows using `len(df)`.",
        example: `import pandas as pd
df = pd.read_csv('data.csv')
df = df.dropna(subset=['Col'])
df = df[df['Value'] > 0]
print(len(df))`,
        task: "Clean `dirty_sales.csv`: Drop rows with missing `Price`, filter for `Qty >= 1`, and print the final row count.",
        initialCode: `import pandas as pd

# Load dirty_sales.csv, clean it, and print row count:
`,
        datasetName: "dirty_sales.csv",
        dataset: [
            { Order: "101", Product: "Mouse", Price: 25, Qty: 2 },
            { Order: "102", Product: "Keyboard", Price: null, Qty: 1 },
            { Order: "103", Product: "Monitor", Price: 150, Qty: 0 },
            { Order: "104", Product: "Headset", Price: 45, Qty: 3 },
            { Order: "105", Product: "Webcam", Price: null, Qty: 5 }
        ],
        hint: "Use `df.dropna(subset=['Price'])` to remove nulls. Then `df = df[df['Qty'] >= 1]`. Then print `len(df)`.",
        validate: (state, logs) => {
            return logs.some(l => l.includes("2"));
        }
    },
    {
        title: "Capstone 2: Cohort Sales Analysis",
        difficulty: "Expert",
        topic: "Grouping & Bar Charts",
        concept: "You need to analyze revenue per user cohort. Load `cohorts.csv`, calculate revenue for each row (`Price * Qty`), group by `Cohort`, sum the revenue, and plot it as a Bar chart with title `Cohort Revenue`.",
        example: `df['Revenue'] = df['Price'] * df['Qty']
grouped = df.groupby('Group')['Revenue'].sum()
plt.bar(grouped.index.tolist(), grouped.tolist())
plt.title('My Title')`,
        task: "Load `cohorts.csv`, calculate a new `Revenue` column, group by `Cohort` and sum Revenue, and plot a Bar chart titled `Cohort Revenue`.",
        initialCode: `import pandas as pd
import matplotlib.pyplot as plt

# Load cohorts.csv, calculate revenue, group by Cohort, and plot Bar chart:
`,
        datasetName: "cohorts.csv",
        dataset: [
            { Cohort: "Q1-Acquired", Price: 50, Qty: 2 },
            { Cohort: "Q1-Acquired", Price: 30, Qty: 1 },
            { Cohort: "Q2-Acquired", Price: 100, Qty: 3 },
            { Cohort: "Q2-Acquired", Price: 80, Qty: 2 },
            { Cohort: "Q3-Acquired", Price: 200, Qty: 1 }
        ],
        hint: "`df['Revenue'] = df['Price'] * df['Qty']`. `rev_by_cohort = df.groupby('Cohort')['Revenue'].sum()`. `plt.bar(rev_by_cohort.index.tolist(), rev_by_cohort.tolist())`. `plt.title('Cohort Revenue')`. `plt.show()`.",
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.type === "bar" && c.title === "Cohort Revenue";
        }
    },
    {
        title: "Capstone 3: Customer Churn Correlation",
        difficulty: "Expert",
        topic: "Heatmaps",
        concept: "To prevent customers from leaving, we must find what factors correlate with churn. You have a matrix representing correlations between SupportTickets, LoginFrequency, and ChurnRate. Plot a Heatmap titled `Churn Heatmap`.",
        example: `import seaborn as sns
matrix = [[1.0, 0.5], [0.5, 1.0]]
sns.heatmap(matrix)
plt.title('Matrix Heatmap')`,
        task: "Create a 3x3 correlation matrix `[[1.0, -0.6, 0.8], [-0.6, 1.0, -0.9], [0.8, -0.9, 1.0]]` and plot a Heatmap with title `Churn Heatmap`.",
        initialCode: `import seaborn as sns
import matplotlib.pyplot as plt

# Define matrix and plot Heatmap titled 'Churn Heatmap':
`,
        datasetName: "churn_matrix.csv",
        dataset: [
            { Factor: "SupportTickets", Tickets: 1.0, Logins: -0.6, Churn: 0.8 },
            { Factor: "LoginFrequency", Tickets: -0.6, Logins: 1.0, Churn: -0.9 },
            { Factor: "ChurnRate", Tickets: 0.8, Logins: -0.9, Churn: 1.0 }
        ],
        hint: "Define `matrix = [[1.0, -0.6, 0.8], [-0.6, 1.0, -0.9], [0.8, -0.9, 1.0]]`. Use `sns.heatmap(matrix)`. `plt.title('Churn Heatmap')`. `plt.show()`.",
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.type === "heatmap" && c.title === "Churn Heatmap";
        }
    },
    {
        title: "Capstone 4: Marketing Spend Optimization",
        difficulty: "Expert",
        topic: "Scatter Plots",
        concept: "Plotting a scatter helps visually spot clusters or anomalies. You need to map AdSpend against NewCustomers. If it looks linear, the spend is effective.",
        example: `plt.scatter(x_list, y_list)
plt.title('Scatter Example')`,
        task: "Plot a Scatter Chart comparing AdSpend `[500, 1000, 1500, 2000]` on X to NewCustomers `[50, 120, 140, 220]` on Y. Title it `Ad Spend ROI`.",
        initialCode: `import matplotlib.pyplot as plt

# Plot Scatter of AdSpend vs NewCustomers with title 'Ad Spend ROI':
`,
        datasetName: "marketing.csv",
        dataset: [
            { AdSpend: 500, NewCustomers: 50 },
            { AdSpend: 1000, NewCustomers: 120 },
            { AdSpend: 1500, NewCustomers: 140 },
            { AdSpend: 2000, NewCustomers: 220 }
        ],
        hint: "`plt.scatter([500, 1000, 1500, 2000], [50, 120, 140, 220])`. `plt.title('Ad Spend ROI')`. `plt.show()`.",
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.type === "scatter" && c.title === "Ad Spend ROI";
        }
    },
    {
        title: "Capstone 5: Executive Dashboard",
        difficulty: "Expert",
        topic: "Multi-Panel Dashboard",
        concept: "Dashboards combine multiple visualizations. Create a Dashboard combining a Line Trend of quarterly revenue with a Pie chart of product shares.",
        example: `plt.plot(trend)
plt.title('Dashboard')
plt.show()`,
        task: "Generate a multi-panel dashboard. Just create any plot (like a line plot of `[1, 2, 3]`) and set the title to `Executive Summary Dashboard`. Then call `plt.show()`.",
        initialCode: `import matplotlib.pyplot as plt

# Plot a trend and set title to 'Executive Summary Dashboard':
`,
        datasetName: "executive_data.csv",
        dataset: [
            { Quarter: "Q1", Revenue: "1M", Target: "0.9M" },
            { Quarter: "Q2", Revenue: "1.2M", Target: "1.1M" }
        ],
        hint: "`plt.plot([1, 2, 3])`. `plt.title('Executive Summary Dashboard')`. `plt.show()`.",
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.title === "Executive Summary Dashboard";
        }
    },
    {
        title: "Final Challenge: The Ultimate Data Audit",
        difficulty: "Expert",
        topic: "Box Plots & Outliers",
        concept: "No guidance this time. You need to analyze the `audit_logs.csv` dataset, extract the `DelayMs` values as a list, and plot a Box Plot titled `Latency Audit` to spot the outliers.",
        example: ``,
        task: "Plot a Box Plot using the data `[12, 15, 14, 13, 85, 16]`. Set the title to `Latency Audit` and render it.",
        initialCode: `import matplotlib.pyplot as plt

# Your code here:
`,
        datasetName: "audit_logs.csv",
        dataset: [
            { RequestID: "Req1", DelayMs: 12 },
            { RequestID: "Req2", DelayMs: 15 },
            { RequestID: "Req3", DelayMs: 14 },
            { RequestID: "Req4", DelayMs: 13 },
            { RequestID: "Req5", DelayMs: 85 },
            { RequestID: "Req6", DelayMs: 16 }
        ],
        hint: "`plt.boxplot([12, 15, 14, 13, 85, 16])`. `plt.title('Latency Audit')`. `plt.show()`.",
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.type === "boxplot" && c.title === "Latency Audit";
        }
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
            mode: { name: 'python', version: 3, singleLineStringErrors: false },
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
            const dvProgress = progressObj.dataviscapstone || { completed_lessons: [], completed: false, highest_lesson: 0 };
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
    
    editor.setValue(lesson.initialCode);
    dom.successMessage.classList.add('hidden');
    clearConsole();
    resetChartCanvas();
    
    renderProgressSteps();
    
    // Set spreadsheet headers and grid rows
    dom.tabDataset.textContent = lesson.datasetName;
    populateDatasetGrid(lesson.dataset);
    

    const hintBtn = document.getElementById('hint-btn');
    const hintContainer = document.getElementById('hint-container');
    const hintTextText = document.getElementById('lesson-hint-text');
    if (hintBtn && hintContainer && hintTextText) {
        if (lesson.hint) {
            hintBtn.style.display = 'block';
            hintTextText.textContent = lesson.hint;
        } else {
            hintBtn.style.display = 'none';
        }
        hintContainer.classList.add('hidden');
        hintBtn.innerHTML = '💡 Show Hint';
    }

    // Enable/disable buttons

    dom.prevBtn.disabled = index === 0;
    
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user)
        ? (PyPlayAuth.user.progress || {})
        : {};
    const dvProgress = progressObj.dataviscapstone || { completed_lessons: [], completed: false };
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
        const dvProgress = progressObj.dataviscapstone || { completed_lessons: [], completed: false, highest_lesson: 0 };
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
    
    window.currentCharts = window.currentCharts || [];
    window.currentCharts.forEach(c => c.destroy());
    window.currentCharts = [];
    
    plotsToRender.forEach((pData, idx) => {
        let container = document.createElement('div');
        container.style.flex = "1";
        container.style.minWidth = "0";
        container.style.height = "100%";
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
                    backgroundColor: pData.type === 'line' ? 'rgba(59, 130, 246, 0.15)' : [
                        'rgba(59, 130, 246, 0.75)',
                        'rgba(16, 185, 129, 0.75)',
                        'rgba(236, 72, 153, 0.75)',
                        'rgba(245, 158, 11, 0.75)',
                        'rgba(139, 92, 246, 0.75)',
                        'rgba(239, 68, 68, 0.75)'
                    ],
                    borderColor: '#3b82f6',
                    borderWidth: pData.type === 'line' ? 3 : 1,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#3b82f6',
                    pointRadius: (pData.type === 'line' || pData.type === 'scatter') ? 5 : 0
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

// --- PYTHON TO JAVASCRIPT TRANSPILER ---
function transpilePythonCode(pyCode) {
    // 1. Strip comments (Python # -> JS //)
    // Replace lines starting with or containing # (except inside strings)
    let code = pyCode.replace(/#.*$/gm, '');
    
    // 2. Remove typical python library imports
    code = code.replace(/import\s+pandas\s+as\s+pd/g, '// Import pandas');
    code = code.replace(/import\s+matplotlib\.pyplot\s+as\s+plt/g, '// Import pyplot');
    code = code.replace(/import\s+seaborn\s+as\s+sns/g, '// Import seaborn');
    
    // 3. Translate Python booleans and values
    code = code.replace(/\bTrue\b/g, 'true');
    code = code.replace(/\bFalse\b/g, 'false');
    code = code.replace(/\bNone\b/g, 'null');
    
    // Support boolean filters: df = df[df['Qty'] >= 1] -> df = df.filter('Qty', '>=', 1)
    code = code.replace(/(\w+)\s*\[\s*\1\s*\[\s*['"]([^'"]+)['"]\s*\]\s*([><=!]+)\s*(.+?)\s*\]/g, '$1.filter("$2", "$3", $4)');
    code = code.replace(/(\w+)\s*\[\s*\1\s*\.(\w+)\s*([><=!]+)\s*(.+?)\s*\]/g, '$1.filter("$2", "$3", $4)');
    
    // Support columns math calculations: df['Revenue'] = df['Price'] * df['Qty'] or df['Revenue'] = df.Price * df.Qty
    code = code.replace(/(\w+)\s*\[\s*['"]([^'"]+)['"]\s*\]\s*=\s*\1\s*(?:\[\s*['"]([^'"]+)['"]\s*\]|\.(\w+))\s*([\+\-\*\/])\s*\1\s*(?:\[\s*['"]([^'"]+)['"]\s*\]|\.(\w+))/g, (match, dfName, targetCol, colA1, colA2, op, colB1, colB2) => {
        const a = colA1 || colA2;
        const b = colB1 || colB2;
        return `${dfName}.calculateColumn("${targetCol}", "${a}", "${op}", "${b}")`;
    });

    // 4. Translate variable assignments to global var declarations
    // Matches expressions like: "df = pd.read_csv('sales.csv')" or "avg_price = df['Price'].mean()"
    // Avoid double var declaring and skip within functions
    code = code.replace(/^\s*(\w+)\s*=\s*(.+)/gm, 'var $1 = $2');
    
    // 5. Transpile python standard print calls
    code = code.replace(/\bprint\s*\(/g, 'await print(');
    
    // 6. Matplotlib and Seaborn plotting calls
    code = code.replace(/plt\.bar\s*\(/g, 'await plt_bar(');
    code = code.replace(/plt\.plot\s*\(/g, 'await plt_plot(');
    code = code.replace(/plt\.pie\s*\(/g, 'await plt_pie(');
    code = code.replace(/plt\.scatter\s*\(/g, 'await plt_scatter(');
    code = code.replace(/plt\.boxplot\s*\(/g, 'await plt_boxplot(');
    code = code.replace(/sns\.heatmap\s*\(/g, 'await sns_heatmap(');
    code = code.replace(/plt\.subplot\s*\(/g, 'await plt_subplot(');
    
    code = code.replace(/plt\.title\s*\(/g, 'await plt_title(');
    code = code.replace(/plt\.show\s*\(/g, 'await plt_show(');
    
    return code;
}

// --- SANDBOXED ANALYTICS EXECUTION ---
async function runPythonCode() {
    const pyCode = editor.getValue();
    clearConsole();
    resetChartCanvas();
    
    try {
        const transpiled = transpilePythonCode(pyCode);
        
        // Load active lesson dataset context
        const currentData = lessons[currentLessonIndex].dataset;
        
        // Define sandboxed Pandas and Matplotlib structures
        const sandbox = {
            print: async (...args) => {
                const msg = args.map(arg => {
                    if (typeof arg === 'object' && arg !== null) {
                        return JSON.stringify(arg, null, 2);
                    }
                    return String(arg);
                }).join(' ');
                appendConsole(msg + "\n");
            },
            
            // Python Built-ins
            str: (x) => String(x),
            int: (x) => parseInt(x),
            float: (x) => parseFloat(x),
            len: (x) => x.length,
            sum: (x) => x.reduce((a, b) => a + Number(b), 0),
            round: (x, n = 0) => Number(x.toFixed(n)),
            
            // Pandas Emulation
            pd: {
                read_csv: (filename) => {
                    appendConsole(`Pandas: Loaded dataset '${filename}' successfully.\n`);
                    return new DataFrame(currentData, filename);
                }
            },
            
            // Matplotlib Emulation
            getActivePlot: () => {
                if (!sandbox.pltState.isSubplots) {
                    return sandbox.pltState;
                }
                return sandbox.pltState.subplots[sandbox.pltState.activePlotIndex];
            },
            
            plt_bar: async (x, y, title = "") => {
                let p = sandbox.getActivePlot();
                p.type = "bar";
                if (typeof y === "undefined" || typeof y === "string") {
                    p.labels = x.map((_, i) => i);
                    p.datasets = [{ data: x }];
                } else {
                    p.labels = x;
                    p.datasets = [{ data: y }];
                }
            },
            
            plt_plot: async (x, y, title = "") => {
                let p = sandbox.getActivePlot();
                p.type = "line";
                if (typeof y === "undefined" || typeof y === "string") {
                    p.labels = x.map((_, i) => i);
                    p.datasets = [{ data: x }];
                } else {
                    p.labels = x;
                    p.datasets = [{ data: y }];
                }
            },
            
            plt_pie: async (data, labels = null) => {
                let p = sandbox.getActivePlot();
                p.type = "pie";
                p.labels = labels || data.map((d, i) => `Col ${i + 1}`);
                p.datasets = [{ data: data }];
            },
            
            plt_scatter: async (x, y) => {
                let p = sandbox.getActivePlot();
                p.type = "scatter";
                p.datasets = [{
                    data: x.map((xv, i) => ({ x: xv, y: y[i] }))
                }];
            },
            
            plt_boxplot: async (data) => {
                let p = sandbox.getActivePlot();
                p.type = "boxplot";
                p.data = data;
                p.datasets = [{ data: data }];
            },
            
            sns_heatmap: async (matrix, annot = true) => {
                let p = sandbox.getActivePlot();
                p.type = "heatmap";
                p.data = matrix;
            },
            
            plt_subplot: async (...args) => {
                sandbox.pltState.isSubplots = true;
                const idx = args[2] - 1;
                while (sandbox.pltState.subplots.length <= idx) {
                    sandbox.pltState.subplots.push({
                        type: null,
                        labels: null,
                        datasets: [],
                        title: null,
                        data: null
                    });
                }
                sandbox.pltState.activePlotIndex = idx;
            },
            
            plt_title: async (titleText) => {
                let p = sandbox.getActivePlot();
                p.title = titleText;
                sandbox.pltState.title = titleText;
            },
            
            plt_show: async () => {
                renderVisualChart(sandbox.pltState);
            },
            
            // Current matplotlib canvas parameters
            pltState: {
                type: null,
                labels: null,
                datasets: [],
                title: "Analytics Chart",
                data: null,
                isSubplots: false,
                subplots: [],
                activePlotIndex: 0
            }
        };
        
        // Define Local JavaScript DataFrame emulator
        class DataFrame {
            constructor(data, name = "dataset.csv") {
                this.data = data;
                this.name = name;
                
                // Emulate bracket row lookup
                this.columns = Object.keys(data[0] || {});
            }
            
            // Emulate df.head()
            head(n = 5) {
                return new DataFrame(this.data.slice(0, n), this.name);
            }
            
            // Emulate df.info() summary print
            info() {
                let colInfo = this.columns.map(c => `  ${c}    non-null  object`).join("\n");
                let summary = `<class 'pandas.core.frame.DataFrame'>\nRangeIndex: ${this.data.length} entries, 0 to ${this.data.length - 1}\nData columns (total ${this.columns.length} columns):\n${colInfo}\ndtypes: float64(1), int64(2), object(3)\nmemory usage: 280.0 bytes\nSummary successfully loaded for '${this.name}'.\n`;
                appendConsole(summary);
            }
            
            // Emulate df.groupby("Category")
            groupby(col) {
                return createDataFrameProxy(new GroupedDataFrame(this.data, col));
            }
            
            // Dynamic column indexing df['Price']
            columnSelector(colName) {
                const vals = this.data.map(d => d[colName]).filter(v => v !== undefined);
                return {
                    data: vals,
                    mean: () => {
                        const sum = vals.reduce((a, b) => a + Number(b), 0);
                        return vals.length > 0 ? (sum / vals.length) : 0;
                    },
                    sum: () => {
                        return vals.reduce((a, b) => a + Number(b), 0);
                    },
                    max: () => {
                        return Math.max(...vals.map(Number));
                    },
                    min: () => {
                        return Math.min(...vals.map(Number));
                    }
                };
            }

            get length() {
                return this.data.length;
            }

            dropna(options) {
                let subset = options && options.subset ? options.subset : [];
                let filteredData = this.data.filter(row => {
                    for (let col of subset) {
                        if (row[col] === null || row[col] === undefined) {
                            return false;
                        }
                    }
                    return true;
                });
                return createDataFrameProxy(new DataFrame(filteredData, this.name));
            }

            filter(colName, operator, value) {
                let filteredData = this.data.filter(row => {
                    let val = row[colName];
                    let compareVal = Number(value);
                    if (isNaN(compareVal)) {
                        compareVal = value;
                    }
                    let rowVal = Number(val);
                    if (isNaN(rowVal)) {
                        rowVal = val;
                    }
                    if (operator === '>=') return rowVal >= compareVal;
                    if (operator === '<=') return rowVal <= compareVal;
                    if (operator === '>') return rowVal > compareVal;
                    if (operator === '<') return rowVal < compareVal;
                    if (operator === '==') return rowVal == compareVal;
                    if (operator === '!=') return rowVal != compareVal;
                    return true;
                });
                return createDataFrameProxy(new DataFrame(filteredData, this.name));
            }

            calculateColumn(targetCol, colA, op, colB) {
                this.data.forEach(row => {
                    let valA = Number(row[colA]) || 0;
                    let valB = Number(row[colB]) || 0;
                    if (op === '*') row[targetCol] = valA * valB;
                    else if (op === '+') row[targetCol] = valA + valB;
                    else if (op === '-') row[targetCol] = valA - valB;
                    else if (op === '/') row[targetCol] = valA / (valB || 1);
                });
                if (!this.columns.includes(targetCol)) {
                    this.columns.push(targetCol);
                }
                return this;
            }
        }
        
        // Helper Grouped DataFrame class
        class GroupedDataFrame {
            constructor(data, groupCol) {
                this.data = data;
                this.groupCol = groupCol;
            }
            // Emulate groupby sum
            columnSelector(colName) {
                // Return aggregated group totals object
                const groups = {};
                this.data.forEach(d => {
                    const g = d[this.groupCol];
                    const v = Number(d[colName]) || 0;
                    groups[g] = (groups[g] || 0) + v;
                });
                return {
                    sum: () => {
                        return {
                            index: {
                                tolist: () => Object.keys(groups),
                                toList: () => Object.keys(groups)
                            },
                            tolist: () => Object.values(groups),
                            toList: () => Object.values(groups),
                            toString: () => {
                                let str = `Category Grouped sums by ${colName}:\n`;
                                Object.keys(groups).forEach(g => {
                                    str += `${g.padEnd(15)} ${groups[g]}\n`;
                                });
                                return str;
                            }
                        };
                    }
                };
            }
        }
        
        // Create custom bracket Proxy to support df['Price'] syntax in JS!
        // This makes JavaScript look exactly like Python Pandas!
        const createDataFrameProxy = (dfInstance) => {
            return new Proxy(dfInstance, {
                get(target, prop) {
                    if (prop in target) {
                        return target[prop];
                    }
                    // If not standard property, return column selector
                    return target.columnSelector(prop);
                }
            });
        };
        
        // Wrap original read_csv to return a Proxy instance
        const originalReadCsv = sandbox.pd.read_csv;
        sandbox.pd.read_csv = (filename) => {
            const df = originalReadCsv(filename);
            return createDataFrameProxy(df);
        };
        
        // Execute the sandbox async function in the background
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runner = new AsyncFunction('sandbox', `
            with (sandbox) {
                ${transpiled}
            }
        `);
        
        await runner(sandbox);
        
        // Trigger verification
        checkLessonCompletion();
        
        // Auto-slide drawer depending on execution results
        const hasPlot = /plt\.(bar|plot|pie|scatter|boxplot|show)|sns\.heatmap/.test(pyCode);
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
        appendConsoleError("Python Runtime Error:\n" + e.message);
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
            PyPlayAuth.updateProgress("dataviscapstone", currentLessonIndex, true);
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
    
    // Next Button Navigation
    dom.nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else {
            alert("Congratulations! You have completed the Data Analytic Capstone! 🏆📈");
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

    const hintBtn = document.getElementById('hint-btn');
    const hintContainer = document.getElementById('hint-container');
    if (hintBtn && hintContainer) {
        hintBtn.addEventListener('click', () => {
            if (hintContainer.classList.contains('hidden')) {
                hintContainer.classList.remove('hidden');
                hintBtn.innerHTML = '👁️ Hide Hint';
            } else {
                hintContainer.classList.add('hidden');
                hintBtn.innerHTML = '💡 Show Hint';
            }
        });
    }
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
