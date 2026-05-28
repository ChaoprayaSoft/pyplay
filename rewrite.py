import re

with open('datavis_capstone_app.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_lessons = '''const lessons = [
    {
        title: "Capstone 1: E-Commerce Data Cleaning",
        difficulty: "Expert",
        topic: "Data Cleaning",
        concept: "Real world data is messy. Your goal is to load `dirty_sales.csv`, drop rows where the `Price` is missing (using `df.dropna(subset=['Price'])`), and filter out any rows where `Qty` is less than 1. Finally, print the remaining number of rows using `len(df)`.",
        example: "import pandas as pd\\ndf = pd.read_csv('data.csv')\\ndf = df.dropna(subset=['Col'])\\ndf = df[df['Value'] > 0]\\nprint(len(df))",
        task: "Clean `dirty_sales.csv`: Drop rows with missing `Price`, filter for `Qty >= 1`, and print the final row count.",
        initialCode: "import pandas as pd\\n\\n# Load dirty_sales.csv, clean it, and print row count:\\n",
        datasetName: "dirty_sales.csv",
        dataset: [
            { Order: "101", Product: "Mouse", Price: 25, Qty: 2 },
            { Order: "102", Product: "Keyboard", Price: None, Qty: 1 },
            { Order: "103", Product: "Monitor", Price: 150, Qty: 0 },
            { Order: "104", Product: "Headset", Price: 45, Qty: 3 },
            { Order: "105", Product: "Webcam", Price: None, Qty: 5 }
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
        example: "df['Revenue'] = df['Price'] * df['Qty']\\ngrouped = df.groupby('Group')['Revenue'].sum()\\nplt.bar(grouped.index.tolist(), grouped.tolist())\\nplt.title('My Title')",
        task: "Load `cohorts.csv`, calculate a new `Revenue` column, group by `Cohort` and sum Revenue, and plot a Bar chart titled `Cohort Revenue`.",
        initialCode: "import pandas as pd\\nimport matplotlib.pyplot as plt\\n\\n# Load cohorts.csv, calculate revenue, group by Cohort, and plot Bar chart:\\n",
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
        example: "import seaborn as sns\\nmatrix = [[1.0, 0.5], [0.5, 1.0]]\\nsns.heatmap(matrix)\\nplt.title('Matrix Heatmap')",
        task: "Create a 3x3 correlation matrix `[[1.0, -0.6, 0.8], [-0.6, 1.0, -0.9], [0.8, -0.9, 1.0]]` and plot a Heatmap with title `Churn Heatmap`.",
        initialCode: "import seaborn as sns\\nimport matplotlib.pyplot as plt\\n\\n# Define matrix and plot Heatmap titled 'Churn Heatmap':\\n",
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
        example: "plt.scatter(x_list, y_list)\\nplt.title('Scatter Example')",
        task: "Plot a Scatter Chart comparing AdSpend `[500, 1000, 1500, 2000]` on X to NewCustomers `[50, 120, 140, 220]` on Y. Title it `Ad Spend ROI`.",
        initialCode: "import matplotlib.pyplot as plt\\n\\n# Plot Scatter of AdSpend vs NewCustomers with title 'Ad Spend ROI':\\n",
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
        example: "plt.plot(trend)\\nplt.title('Dashboard')\\nplt.show()",
        task: "Generate a multi-panel dashboard. Just create any plot (like a line plot of `[1, 2, 3]`) and set the title to `Executive Summary Dashboard`. Then call `plt.show()`.",
        initialCode: "import matplotlib.pyplot as plt\\n\\n# Plot a trend and set title to 'Executive Summary Dashboard':\\n",
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
        example: "",
        task: "Plot a Box Plot using the data `[12, 15, 14, 13, 85, 16]`. Set the title to `Latency Audit` and render it.",
        initialCode: "import matplotlib.pyplot as plt\\n\\n# Your code here:\\n",
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
];'''

content = re.sub(r'const lessons = \[.*?\n\];', new_lessons, content, flags=re.DOTALL)

content = content.replace("progressObj.datavis ||", "progressObj.dataviscapstone ||")
content = content.replace("progressObj.datavis ", "progressObj.dataviscapstone ")
content = content.replace('PyPlayAuth.updateProgress("datavis"', 'PyPlayAuth.updateProgress("dataviscapstone"')

load_lesson_hint = '''
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
'''
content = content.replace('    // Enable/disable buttons', load_lesson_hint)

setup_listeners_hint = '''
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
'''

content = re.sub(r'}\s*// Start the app', setup_listeners_hint + '\\n// Start the app', content)

with open('datavis_capstone_app.js', 'w', encoding='utf-8') as f:
    f.write(content)
