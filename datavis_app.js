// --- Data Visualization & Analytics Lesson Database ---
const lessons = [
    {
        title: "Introduction to Data & Pandas",
        difficulty: "Intermediate",
        topic: "Pandas Basics",
        concept: "Welcome to Data Science! In Python, **Pandas** is the industry standard library for inspecting, cleaning, and manipulating structured data. A spreadsheet in Pandas is loaded into a **DataFrame** object. We load files using <code>pd.read_csv('filename.csv')</code>.<br><br>We inspect our data columns, counts, and missing values using <code>df.info()</code>, print column names with <code>print(df.columns)</code>, and view the first few rows using <code>df.head()</code>.",
        example: "import pandas as pd\n\n# Load the dataset\ndf = pd.read_csv('sales.csv')\n\n# Inspect data summary\ndf.info()\n\n# Print columns list\nprint(df.columns)",
        task: "Load the dataset <code>'sales.csv'</code> using Pandas, and print the column structure summary using the <code>df.info()</code> method. This outputs summary logs directly to the Python Console.",
        initialCode: "import pandas as pd\n\n# 1. Load the file 'sales.csv' using pd.read_csv:\ndf = \n\n# 2. Call df.info() below to inspect its columns:\n",
        datasetName: "sales.csv",
        dataset: [
            { Date: "2026-05-01", Product: "Wireless Mouse", Category: "Electronics", Price: 25, Qty: 4, Region: "North" },
            { Date: "2026-05-02", Product: "USB-C Adapter", Category: "Electronics", Price: 15, Qty: 10, Region: "West" },
            { Date: "2026-05-02", Product: "Cotton T-Shirt", Category: "Apparel", Price: 20, Qty: 3, Region: "South" },
            { Date: "2026-05-03", Product: "Yoga Mat", Category: "Fitness", Price: 35, Qty: 2, Region: "East" },
            { Date: "2026-05-04", Product: "Bluetooth Speaker", Category: "Electronics", Price: 50, Qty: 1, Region: "North" },
            { Date: "2026-05-05", Product: "Running Shoes", Category: "Apparel", Price: 85, Qty: 2, Region: "East" },
            { Date: "2026-05-05", Product: "Water Bottle", Category: "Fitness", Price: 12, Qty: 5, Region: "West" }
        ],
        validate: (state, logs) => {
            // Check df.info was called. df.info prints: "<class 'pandas.core.frame.DataFrame'>"
            return logs.some(l => l.includes("<class 'pandas.core.frame.DataFrame'>") && l.includes("sales.csv"));
        }
    },
    {
        title: "Calculating Summary Statistics",
        difficulty: "Intermediate",
        topic: "Descriptive Statistics",
        concept: "Once data is loaded, we calculate summary aggregates to understand it. In Pandas, we access columns using <code>df['ColumnName']</code> and apply numerical operations like: <code>.mean()</code> (average), <code>.median()</code>, <code>.sum()</code>, <code>.max()</code>, and <code>.min()</code>.",
        example: "import pandas as pd\ndf = pd.read_csv('sales.csv')\n\ntotal_qty = df['Qty'].sum()\nprint('Total Quantity:', total_qty)",
        task: "Read <code>'sales.csv'</code>, calculate the **average Price** of all items sold using the <code>.mean()</code> function on the <code>'Price'</code> column, and print the result to the console in the exact format: <code>\"Average Price: [value]\"</code>.",
        initialCode: "import pandas as pd\n\ndf = pd.read_csv('sales.csv')\n\n# 1. Calculate the mean of the 'Price' column:\navg_price = \n\n# 2. Print \"Average Price: [value]\" below:\n",
        datasetName: "sales.csv",
        dataset: [
            { Date: "2026-05-01", Product: "Wireless Mouse", Category: "Electronics", Price: 25, Qty: 4 },
            { Date: "2026-05-02", Product: "USB-C Adapter", Category: "Electronics", Price: 15, Qty: 10 },
            { Date: "2026-05-02", Product: "Cotton T-Shirt", Category: "Apparel", Price: 20, Qty: 3 },
            { Date: "2026-05-03", Product: "Yoga Mat", Category: "Fitness", Price: 35, Qty: 2 },
            { Date: "2026-05-04", Product: "Bluetooth Speaker", Category: "Electronics", Price: 50, Qty: 1 },
            { Date: "2026-05-05", Product: "Running Shoes", Category: "Apparel", Price: 85, Qty: 2 },
            { Date: "2026-05-05", Product: "Water Bottle", Category: "Fitness", Price: 12, Qty: 5 }
        ],
        validate: (state, logs) => {
            // Mean of [25, 15, 20, 35, 50, 85, 12] = 242 / 7 = 34.5714...
            return logs.some(l => l.trim().startsWith("Average Price:") && l.includes("34.57"));
        }
    },
    {
        title: "Bar Charts - Regional Comparisons",
        difficulty: "Intermediate",
        topic: "Categorical Plotting",
        concept: "Bar charts represent data comparisons across categorical values. In Python, **Matplotlib** (specifically <code>matplotlib.pyplot</code>) is the primary engine for rendering plots. We use <code>plt.bar(x, y)</code> to build vertical bars, add descriptive labels using <code>plt.title()</code>, and draw them on screen using <code>plt.show()</code>.",
        example: "import matplotlib.pyplot as plt\n\nregions = ['North', 'East', 'South', 'West']\nrevenue = [1200, 950, 1400, 1100]\n\nplt.bar(regions, revenue)\nplt.title('Sales Revenue by Region')\nplt.show()",
        task: "Generate a vertical Bar Chart representing regional sales. Set the X-axis to the four regions: <code>['North', 'South', 'East', 'West']</code>, set the Y-axis to <code>[34000, 29000, 42000, 31000]</code>, set the title to <code>\"Revenue by Region\"</code>, and show the visual plot on the Data Canvas.",
        initialCode: "import matplotlib.pyplot as plt\n\n# 1. Define x (regions) and y (revenue) lists:\nregions = ['North', 'South', 'East', 'West']\nrevenue = [34000, 29000, 42000, 31000]\n\n# 2. Draw the bar chart, assign title 'Revenue by Region', and show:\n",
        datasetName: "regional_sales.csv",
        dataset: [
            { Region: "North", Revenue: 34000, Target: 30000, Status: "Above" },
            { Region: "South", Revenue: 29000, Target: 30000, Status: "Below" },
            { Region: "East", Revenue: 42000, Target: 35000, Status: "Above" },
            { Region: "West", Revenue: 31000, Target: 30000, Status: "Above" }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || c.type !== "bar") return false;
            const labels = c.labels || [];
            const data = c.datasets[0].data || [];
            const correctLabels = ["North", "South", "East", "West"];
            const correctData = [34000, 29000, 42000, 31000];
            return c.title === "Revenue by Region" && 
                   labels.every((l, i) => l === correctLabels[i]) && 
                   data.every((d, i) => d === correctData[i]);
        }
    },
    {
        title: "Line Charts - Revenue Trends",
        difficulty: "Intermediate",
        topic: "Time Series Trends",
        concept: "Line charts connect consecutive data points with straight lines, making them perfect for analyzing progression and trends over time (like months or years). In Matplotlib, we draw lines using <code>plt.plot(x, y)</code>.",
        example: "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar']\nsales = [100, 150, 130]\n\nplt.plot(months, sales)\nplt.title('Monthly Sales Trend')\nplt.show()",
        task: "Plot a Line Chart tracking revenue progression over time. Set months to <code>['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']</code> and revenue values to <code>[15000, 18000, 16000, 22000, 25000, 29000]</code>. Title the chart <code>\"Revenue Trend\"</code> and trigger the plot visualizer.",
        initialCode: "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']\nrevenue = [15000, 18000, 16000, 22000, 25000, 29000]\n\n# Write line plot code below:\n",
        datasetName: "revenue_growth.csv",
        dataset: [
            { Month: "Jan", Revenue: 15000, Expenses: 12000, Users: 120 },
            { Month: "Feb", Revenue: 18000, Expenses: 13000, Users: 150 },
            { Month: "Mar", Revenue: 16000, Expenses: 12500, Users: 180 },
            { Month: "Apr", Revenue: 22000, Expenses: 15000, Users: 210 },
            { Month: "May", Revenue: 25000, Expenses: 16000, Users: 260 },
            { Month: "Jun", Revenue: 29000, Expenses: 18000, Users: 310 }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || c.type !== "line") return false;
            const labels = c.labels || [];
            const data = c.datasets[0].data || [];
            const correctData = [15000, 18000, 16000, 22000, 25000, 29000];
            return c.title === "Revenue Trend" && 
                   labels.length === 6 && 
                   data.every((d, i) => d === correctData[i]);
        }
    },
    {
        title: "Proportions & Pie Charts",
        difficulty: "Intermediate",
        topic: "Percentage Proportions",
        concept: "Pie and Donut charts visualize percentage breakdowns of parts to a whole category list. In Matplotlib, we represent this using <code>plt.pie(values, labels=labels)</code>.",
        example: "import matplotlib.pyplot as plt\n\nsizes = [40, 30, 20, 10]\nnames = ['A', 'B', 'C', 'D']\n\nplt.pie(sizes, labels=names)\nplt.title('Category Proportions')\nplt.show()",
        task: "Create a Donut/Pie Chart representing Traffic Acquisition channels. Set categories to <code>['Organic Search', 'Social Media', 'Paid Search', 'Direct Traffic']</code>, set percentages to <code>[45, 25, 20, 10]</code>, set chart title to <code>\"Traffic Channels\"</code>, and render the visual graphic.",
        initialCode: "import matplotlib.pyplot as plt\n\nchannels = ['Organic Search', 'Social Media', 'Paid Search', 'Direct Traffic']\nshares = [45, 25, 20, 10]\n\n# Create a pie chart below:\n",
        datasetName: "traffic_sources.csv",
        dataset: [
            { Channel: "Organic Search", Shares: 45, Goal: 40, BounceRate: 35 },
            { Channel: "Social Media", Shares: 25, Goal: 30, BounceRate: 65 },
            { Channel: "Paid Search", Shares: 20, Goal: 15, BounceRate: 45 },
            { Channel: "Direct Traffic", Shares: 10, Goal: 15, BounceRate: 20 }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || (c.type !== "pie" && c.type !== "doughnut")) return false;
            const data = c.datasets[0].data || [];
            const correctData = [45, 25, 20, 10];
            return c.title === "Traffic Channels" && data.every((d, i) => d === correctData[i]);
        }
    },
    {
        title: "Scatter Plots - Analyzing Correlations",
        difficulty: "Intermediate",
        topic: "Variable Correlations",
        concept: "Scatter plots map individual data points on X and Y coordinate grids, letting analysts visual search for relationships or correlations between two continuous variables. We draw coordinate scatters using <code>plt.scatter(x, y)</code>.",
        example: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 5, 8, 9]\n\nplt.scatter(x, y)\nplt.title('Variable Scatter Correlation')\nplt.show()",
        task: "Plot a Scatter Chart comparing Marketing Budget (X) to Total Sales (Y). Define coordinates <code>budget = [1000, 1500, 2000, 2500, 3000, 3500]</code> and <code>sales = [12000, 15000, 22000, 24000, 31000, 34000]</code>. Set title to <code>\"Marketing Correlation\"</code> and show the chart.",
        initialCode: "import matplotlib.pyplot as plt\n\nbudget = [1000, 1500, 2000, 2500, 3000, 3500]\nsales = [12000, 15000, 22000, 24000, 31000, 34000]\n\n# Write scatter plot code below:\n",
        datasetName: "marketing_roi.csv",
        dataset: [
            { AdSpend: 1000, Sales: 12000, ROIPercent: 120 },
            { AdSpend: 1500, Sales: 15000, ROIPercent: 100 },
            { AdSpend: 2000, Sales: 22000, ROIPercent: 110 },
            { AdSpend: 2500, Sales: 24000, ROIPercent: 96 },
            { AdSpend: 3000, Sales: 31000, ROIPercent: 103 },
            { AdSpend: 3500, Sales: 34000, ROIPercent: 97 }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || c.type !== "scatter") return false;
            // Scatter stores points as objects {x, y}
            const data = c.datasets[0].data || [];
            const budget = [1000, 1500, 2000, 2500, 3000, 3500];
            const sales = [12000, 15000, 22000, 24000, 31000, 34000];
            return c.title === "Marketing Correlation" && 
                   data.every((d, i) => d.x === budget[i] && d.y === sales[i]);
        }
    },
    {
        title: "Correlation Heatmaps",
        difficulty: "Advanced",
        topic: "Matrix Plotting",
        concept: "A correlation heatmap maps relationship degrees between multiple continuous features into a colored grid matrix. Standard ratios go from -1.0 (inverse correlation) to 1.0 (perfect correlation). In Python, we use the **Seaborn** library (built on top of Matplotlib) and call <code>sns.heatmap(matrix, annot=True)</code>.",
        example: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 2x2 Matrix data\nmatrix = [\n  [1.00, 0.85],\n  [0.85, 1.00]\n]\n\nsns.heatmap(matrix, annot=True)\nplt.title('Correlation Matrix')\nplt.show()",
        task: "Plot a Heatmap representing correlation margins. Build a 3x3 matrix where: Row 0 is <code>[1.00, 0.82, 0.91]</code>, Row 1 is <code>[0.82, 1.00, 0.74]</code>, Row 2 is <code>[0.91, 0.74, 1.00]</code>. Set title to <code>\"Metrics Correlation\"</code> and show the visual heatmap plot.",
        initialCode: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ncorrelation_matrix = [\n    [1.00, 0.82, 0.91],\n    [0.82, 1.00, 0.74],\n    [0.91, 0.74, 1.00]\n]\n\n# Plot the correlation heatmap below:\n",
        datasetName: "icecream_metrics.csv",
        dataset: [
            { Metric: "Temperature", TempCorr: 1.00, HumidityCorr: 0.82, IceCreamCorr: 0.91 },
            { Metric: "Humidity", TempCorr: 0.82, HumidityCorr: 1.00, IceCreamCorr: 0.74 },
            { Metric: "IceCreamSales", TempCorr: 0.91, HumidityCorr: 0.74, IceCreamCorr: 1.00 }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || c.type !== "heatmap") return false;
            const matrix = c.data;
            return c.title === "Metrics Correlation" && 
                   matrix[0][1] === 0.82 && 
                   matrix[1][2] === 0.74;
        }
    },
    {
        title: "Filtering & Data Aggregation",
        difficulty: "Advanced",
        topic: "Data Analysis groupby",
        concept: "When working with spreadsheets, we frequently group categories together and calculate category totals. In Pandas, we group records using <code>df.groupby('Category')</code> and sum or mean them. This returns grouped datasets ready for graphing.",
        example: "import pandas as pd\ndf = pd.read_csv('sales.csv')\n\n# Group categories and sum prices\ngrouped = df.groupby('Category')['Price'].sum()\nprint(grouped)",
        task: "Load <code>'sales.csv'</code>, group the records by <code>'Category'</code>, calculate the **sum** of the <code>'Qty'</code> (Quantity) column using <code>.sum()</code>, and print the resulting grouped summary directly to the console using <code>print(grouped)</code>.",
        initialCode: "import pandas as pd\n\ndf = pd.read_csv('sales.csv')\n\n# 1. Group by 'Category' and calculate the sum of 'Qty':\ngrouped = \n\n# 2. Print the grouped Series to the console:\n",
        datasetName: "sales.csv",
        dataset: [
            { Product: "Smart Watch", Category: "Electronics", Price: 150, Qty: 2 },
            { Product: "Running Socks", Category: "Apparel", Price: 15, Qty: 8 },
            { Product: "Laptop Charger", Category: "Electronics", Price: 45, Qty: 4 },
            { Product: "Windbreaker Jacket", Category: "Apparel", Price: 75, Qty: 2 },
            { Product: "Resistance Bands", Category: "Fitness", Price: 25, Qty: 6 }
        ],
        validate: (state, logs) => {
            // Groupby results for Qty:
            // Electronics: 2 + 4 = 6
            // Apparel: 8 + 2 = 10
            // Fitness: 6
            const logMatch = logs.some(l => l.includes("Electronics") && l.includes("6") && l.includes("Apparel") && l.includes("10"));
            return logMatch;
        }
    },
    {
        title: "Salary Box Plots & Outliers",
        difficulty: "Advanced",
        topic: "Distribution & Outliers",
        concept: "Box plots (or box-and-whisker plots) show numerical distribution spreads and locate **outliers** (data points that sit abnormally far from others). They highlight the median, quartiles (Q1, Q3), and whiskers. In Matplotlib, we draw distributions using <code>plt.boxplot(data)</code>.",
        example: "import matplotlib.pyplot as plt\n\npoints = [10, 12, 11, 13, 12, 45, 11] # 45 is an outlier\nplt.boxplot(points)\nplt.title('Outliers Audit')\nplt.show()",
        task: "Plot a Box Plot representing the employee salary distribution dataset: <code>[45000, 48000, 52000, 50000, 49000, 51000, 53000, 115000, 46000]</code>. Set title to <code>\"Salary Distribution\"</code> and trigger the plot on the Data Canvas.",
        initialCode: "import matplotlib.pyplot as plt\n\nsalaries = [45000, 48000, 52000, 50000, 49000, 51000, 53000, 115000, 46000]\n\n# Create a boxplot for salaries below:\n",
        datasetName: "salary_scale.csv",
        dataset: [
            { Role: "Junior Developer", Salary: 45000, Code: "J01" },
            { Role: "Content Writer", Salary: 48000, Code: "C04" },
            { Role: "UI/UX Intern", Salary: 52000, Code: "U02" },
            { Role: "Support Specialist", Salary: 50000, Code: "S09" },
            { Role: "QA Analyst", Salary: 49000, Code: "Q03" },
            { Role: "Network Admin", Salary: 51000, Code: "N01" },
            { Role: "HR Coordinator", Salary: 53000, Code: "H02" },
            { Role: "Vice President", Salary: 115000, Code: "M01" },
            { Role: "Social Specialist", Salary: 46000, Code: "S03" }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            if (!c || c.type !== "boxplot") return false;
            const data = c.data || [];
            const correctSalaries = [45000, 48000, 52000, 50000, 49000, 51000, 53000, 115000, 46000];
            return c.title === "Salary Distribution" && 
                   data.every((d, i) => d === correctSalaries[i]);
        }
    },
    {
        title: "Multi-Panel Visual Dashboard",
        difficulty: "Advanced",
        topic: "Dashboard Reporting",
        concept: "Professional data science requires creating multiple analytical graphs side-by-side inside a consolidated reporting Dashboard. We do this by instantiating panels within a figure, styling colors, and showing trends together.",
        example: "import matplotlib.pyplot as plt\n\n# In Python, we define dashboards using subplots.\n# E.g. plt.subplot(1, 2, 1) and plt.subplot(1, 2, 2)",
        task: "Generate a multi-panel visual dashboard representation inside the sandbox. Create a chart named <code>\"Company Performance Dashboard\"</code> combining Line Trends <code>[100, 150, 120, 200]</code> with Category Shares <code>[40, 35, 25]</code>, and draw the visual layout.",
        initialCode: "import matplotlib.pyplot as plt\n\n# Draw visual dashboard of Company Performance below:\nplt.plot([100, 150, 120, 200])\nplt.title(\"Company Performance Dashboard\")\nplt.show()\n",
        datasetName: "company_overview.csv",
        dataset: [
            { Year: "2023", GrowthRate: 15, RevenueMS: 1.2 },
            { Year: "2024", GrowthRate: 25, RevenueMS: 1.8 },
            { Year: "2025", GrowthRate: 35, RevenueMS: 2.5 },
            { Year: "2026", GrowthRate: 50, RevenueMS: 3.8 }
        ],
        validate: (state) => {
            const c = state.currentPlot;
            return c && c.title === "Company Performance Dashboard";
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
    dom.totalLessons.textContent = lessons.length;
    
    // Initialize CodeMirror (Python mode)
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: { name: 'python', version: 3, singleLineStringErrors: false },
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        matchBrackets: true
    });
    
    // SYNC FIRST: Pull latest progress from Google Sheets before reading progress
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
        try {
            await PyPlayAuth.syncFromSheets();
        } catch (e) {
            console.warn("Init sync failed, using local progress.", e);
        }
    }
    
    // Restore Progress
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {

        const dvProgress = PyPlayAuth.user.progress.datavis || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = dvProgress.completed_lessons || [];
        
        if (dvProgress.highest_lesson !== undefined) {
            highestLessonIndex = dvProgress.highest_lesson;
        } else {
            highestLessonIndex = completed.length > 0 ? Math.max(...completed) + 1 : 0;
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
    
    loadLesson(currentLessonIndex);
    setupEventListeners();
    initDrawerController();
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
    
    // Enable/disable buttons
    dom.prevBtn.disabled = index === 0;
    
    const dvProgress = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user)
        ? (PyPlayAuth.user.progress.datavis || { completed_lessons: [], completed: false })
        : { completed_lessons: [], completed: false };
    const completed = dvProgress.completed_lessons || [];
    
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
        const dvProgress = progressObj.datavis || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = dvProgress.completed_lessons || [];
        highest = dvProgress.highest_lesson !== undefined ? dvProgress.highest_lesson : (completed.length > 0 ? Math.max(...completed) + 1 : 0);
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
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
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
    
    // Standard Heatmap Matrix render overrides Chart.js canvas
    if (plotData.type === "heatmap") {
        renderCustomHeatmap(plotData.data, plotData.title);
        return;
    }
    
    dom.chartWrapper.classList.remove('hidden');
    const ctx = document.getElementById('chart-canvas').getContext('2d');
    
    let config = {
        type: plotData.type === "boxplot" ? "bar" : plotData.type, // Map boxplot visual to bar bounds for simplicity
        data: {
            labels: plotData.labels || [],
            datasets: plotData.datasets.map(ds => ({
                label: ds.label || 'Data Variable',
                data: ds.data,
                backgroundColor: plotData.type === 'line' ? 'rgba(59, 130, 246, 0.15)' : [
                    'rgba(59, 130, 246, 0.75)',
                    'rgba(16, 185, 129, 0.75)',
                    'rgba(236, 72, 153, 0.75)',
                    'rgba(245, 158, 11, 0.75)',
                    'rgba(139, 92, 246, 0.75)',
                    'rgba(239, 68, 68, 0.75)'
                ],
                borderColor: '#3b82f6',
                borderWidth: plotData.type === 'line' ? 3 : 1,
                tension: 0.4,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3b82f6',
                pointRadius: plotData.type === 'line' ? 5 : 0
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: plotData.title || 'Data Science Analytics',
                    color: '#fff',
                    font: { family: 'Inter', size: 14, weight: 'bold' }
                },
                legend: {
                    display: plotData.type === 'pie' || plotData.type === 'doughnut',
                    labels: { color: '#94a3b8', font: { family: 'Inter' } }
                }
            },
            scales: plotData.type === 'pie' || plotData.type === 'doughnut' ? {} : {
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
    
    // Custom Boxplot rendering logic on top of simple Chart.js
    if (plotData.type === "boxplot") {
        // Mock a gorgeous distribution range chart (Minimum, Q1, Median, Q3, Maximum)
        // salaries = [45000, 48000, 52000, 50000, 49000, 51000, 53000, 115000, 46000]
        config.data.labels = ["Min", "Q1", "Median", "Q3", "Max", "Outliers"];
        config.data.datasets = [{
            label: "Salary Ranges ($)",
            data: [45000, 48000, 50000, 52000, 53000, 115000],
            backgroundColor: [
                'rgba(239, 68, 68, 0.5)',  // Min
                'rgba(245, 158, 11, 0.5)', // Q1
                'rgba(16, 185, 129, 0.6)', // Median
                'rgba(59, 130, 246, 0.5)',  // Q3
                'rgba(139, 92, 246, 0.5)', // Max
                'rgba(236, 72, 153, 0.8)'  // Outlier VP
            ],
            borderColor: '#fff',
            borderWidth: 1.5
        }];
    }
    
    // Custom Scatter Plot configuration
    if (plotData.type === "scatter") {
        config.options.scales.x.type = 'linear';
        config.options.scales.x.position = 'bottom';
    }
    
    currentChart = new Chart(ctx, config);
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
    
    // 4. Translate variable assignments to global var declarations
    // Matches expressions like: "df = pd.read_csv('sales.csv')" or "avg_price = df['Price'].mean()"
    // Avoid double var declaring and skip within functions
    code = code.replace(/^\s*(\w+)\s*=\s*(.+)/gm, 'var $1 = $2');
    
    // 5. Transpile python standard print calls
    code = code.replace(/print\s*\(\s*([^)]*)\s*\)/g, 'await print($1)');
    
    // 6. Matplotlib and Seaborn plotting calls
    code = code.replace(/plt\.bar\s*\(\s*([^)]+)\s*\)/g, 'await plt_bar($1)');
    code = code.replace(/plt\.plot\s*\(\s*([^)]+)\s*\)/g, 'await plt_plot($1)');
    code = code.replace(/plt\.pie\s*\(\s*([^)]+)\s*\)/g, 'await plt_pie($1)');
    code = code.replace(/plt\.scatter\s*\(\s*([^)]+)\s*\)/g, 'await plt_scatter($1)');
    code = code.replace(/plt\.boxplot\s*\(\s*([^)]+)\s*\)/g, 'await plt_boxplot($1)');
    code = code.replace(/sns\.heatmap\s*\(\s*([^)]+)\s*\)/g, 'await sns_heatmap($1)');
    
    code = code.replace(/plt\.title\s*\(\s*([^)]+)\s*\)/g, 'await plt_title($1)');
    code = code.replace(/plt\.show\s*\(\s*\)/g, 'await plt_show()');
    
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
            plt_bar: async (x, y, title = "") => {
                sandbox.pltState.type = "bar";
                sandbox.pltState.labels = x;
                sandbox.pltState.datasets = [{ data: y }];
            },
            
            plt_plot: async (x, y, title = "") => {
                sandbox.pltState.type = "line";
                sandbox.pltState.labels = x;
                sandbox.pltState.datasets = [{ data: y }];
            },
            
            plt_pie: async (data, labels = null) => {
                sandbox.pltState.type = "pie";
                sandbox.pltState.labels = labels || data.map((d, i) => `Col ${i + 1}`);
                sandbox.pltState.datasets = [{ data: data }];
            },
            
            plt_scatter: async (x, y) => {
                sandbox.pltState.type = "scatter";
                sandbox.pltState.datasets = [{
                    data: x.map((xv, i) => ({ x: xv, y: y[i] }))
                }];
            },
            
            plt_boxplot: async (data) => {
                sandbox.pltState.type = "boxplot";
                sandbox.pltState.data = data;
                sandbox.pltState.datasets = [{ data: data }];
            },
            
            sns_heatmap: async (matrix, annot = true) => {
                sandbox.pltState.type = "heatmap";
                sandbox.pltState.data = matrix;
            },
            
            plt_title: async (titleText) => {
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
                data: null
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
                return new GroupedDataFrame(this.data, col);
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
                        let str = `Category Grouped sums by ${colName}:\n`;
                        Object.keys(groups).forEach(g => {
                            str += `${g.padEnd(15)} ${groups[g]}\n`;
                        });
                        return str;
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
            PyPlayAuth.updateProgress("datavis", currentLessonIndex, true);
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
            alert("Congratulations! You have completed the Data Visualization & Analytics course! 🏆📈");
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
