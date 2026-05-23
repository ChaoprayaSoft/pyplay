// --- JavaScript Essentials Lesson Database ---
const lessons = [
    {
        title: "Hello JavaScript",
        difficulty: "Beginner",
        topic: "Console & Variables",
        concept: "Welcome to JavaScript! JS is the scripting language of the web. We use <code>console.log()</code> to print messages. Variables are declared using <code>let</code> (for values that change) and <code>const</code> (for values that don't change).",
        example: "const greeting = 'Hello World';\nconsole.log(greeting);",
        task: "Declare a <code>const</code> variable named <code>course</code> and assign it the string <code>'JavaScript'</code>. Print it using <code>console.log()</code>.",
        initialCode: "// 1. Declare a const variable named 'course' with value 'JavaScript'\n\n// 2. Print it using console.log()\n",
        validate: (state, logs) => {
            return logs.some(l => l.includes("JavaScript"));
        }
    },
    {
        title: "Arrays & Objects",
        difficulty: "Beginner",
        topic: "Data Structures",
        concept: "Arrays hold ordered lists of items, and Objects hold key-value pairs. You can access array items by index, e.g. <code>arr[0]</code>, and object properties by dot notation, e.g. <code>obj.name</code>.",
        example: "const user = { name: 'Alice', age: 25 };\nconst colors = ['red', 'blue'];\nconsole.log(user.name);",
        task: "Create an object <code>robot</code> with a property <code>name</code> set to <code>'Botty'</code>. Print the robot's name.",
        initialCode: "// 1. Create a robot object with a name property\n\n// 2. Print its name\n",
        validate: (state, logs) => {
            return logs.some(l => l.includes("Botty"));
        }
    },
    {
        title: "Array Methods: map()",
        difficulty: "Intermediate",
        topic: "Array Transformations",
        concept: "The <code>.map()</code> method creates a new array populated with the results of calling a provided function on every element in the calling array. It's heavily used in modern web development.",
        example: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);",
        task: "Use <code>.map()</code> to multiply every number in the <code>prices</code> array by 10. Print the resulting array.",
        initialCode: "const prices = [5, 10, 15];\n// Map the prices array to multiply by 10:\nconst newPrices = \n\nconsole.log(newPrices);",
        validate: (state, logs) => {
            return logs.some(l => l.includes("[50,100,150]") || l.replace(/\s/g, '').includes("[50,100,150]"));
        }
    },
    {
        title: "Array Methods: filter()",
        difficulty: "Intermediate",
        topic: "Array Filtering",
        concept: "The <code>.filter()</code> method creates a new array with all elements that pass the test implemented by the provided function. It returns elements when the callback function evaluates to <code>true</code>.",
        example: "const ages = [12, 18, 25, 8];\nconst adults = ages.filter(age => age >= 18);\nconsole.log(adults);",
        task: "Filter the <code>scores</code> array to only keep numbers greater than 50. Print the filtered array.",
        initialCode: "const scores = [45, 80, 20, 95, 50, 60];\n// Use .filter() to keep scores > 50\nconst highScores = \n\nconsole.log(highScores);",
        validate: (state, logs) => {
            return logs.some(l => l.replace(/\s/g, '').includes("[80,95,60]"));
        }
    },
    {
        title: "Array Methods: reduce()",
        difficulty: "Intermediate",
        topic: "Array Aggregation",
        concept: "The <code>.reduce()</code> method executes a reducer callback function on each element of the array, passing in the return value from the calculation on the preceding element. It results in a single output value.",
        example: "const nums = [1, 2, 3, 4];\nconst sum = nums.reduce((total, num) => total + num, 0);\nconsole.log(sum);",
        task: "Use <code>.reduce()</code> to sum up all the numbers in the <code>expenses</code> array. Print the total sum.",
        initialCode: "const expenses = [10, 25, 15, 50];\n// Use reduce to find the total\nconst total = \n\nconsole.log('Total: ' + total);",
        validate: (state, logs) => {
            return logs.some(l => l.includes("100"));
        }
    },
    {
        title: "Introduction to DOM",
        difficulty: "Beginner",
        topic: "DOM Basics",
        concept: "The Document Object Model (DOM) is an interface that represents HTML documents as objects. In our sandbox, we expose a special DOM container named <code>DOM</code>. You can manipulate its <code>innerHTML</code> directly.",
        example: "DOM.innerHTML = '<h1>Hello Web</h1>';",
        task: "Set the <code>innerHTML</code> of the <code>DOM</code> container to an <code>&lt;h2&gt;</code> element with the text <code>'Welcome to the Sandbox'</code>.",
        initialCode: "// Set DOM.innerHTML below:\n",
        validate: (state, logs) => {
            return state.dom.innerHTML.includes("Welcome to the Sandbox") && state.dom.innerHTML.includes("h2");
        }
    },
    {
        title: "Modifying DOM Styles",
        difficulty: "Intermediate",
        topic: "DOM Manipulation",
        concept: "You can change inline CSS styles of an element using the <code>style</code> property. E.g., <code>element.style.color = 'red'</code>.",
        example: "DOM.innerHTML = '<p id=\"text\">Color me!</p>';\ndocument.getElementById('text').style.color = 'blue';",
        task: "Create a <code>&lt;div id=\"box\"&gt;Box&lt;/div&gt;</code> inside the DOM. Then, select it using <code>document.getElementById('box')</code> and set its <code>style.backgroundColor</code> to <code>'red'</code>.",
        initialCode: "// 1. Add HTML to DOM:\nDOM.innerHTML = '<div id=\"box\">Box</div>';\n\n// 2. Change the background color to red:\n",
        validate: (state, logs) => {
            const box = state.dom.querySelector('#box');
            return box && (box.style.backgroundColor === 'red' || box.style.backgroundColor === 'rgb(255, 0, 0)');
        }
    },
    {
        title: "Creating DOM Elements",
        difficulty: "Intermediate",
        topic: "DOM Elements",
        concept: "Instead of injecting HTML strings, you can securely build elements using <code>document.createElement('tag')</code> and add them to the page with <code>.appendChild(element)</code>.",
        example: "const btn = document.createElement('button');\nbtn.textContent = 'Click me';\nDOM.appendChild(btn);",
        task: "Create a new <code>&lt;p&gt;</code> element, set its <code>textContent</code> to <code>'Dynamically Created'</code>, and append it to the <code>DOM</code> container.",
        initialCode: "// 1. Create a 'p' element\n\n// 2. Set textContent\n\n// 3. Append to DOM\n",
        validate: (state, logs) => {
            const pTags = state.dom.querySelectorAll('p');
            return Array.from(pTags).some(p => p.textContent === 'Dynamically Created');
        }
    },
    {
        title: "Event Listeners",
        difficulty: "Intermediate",
        topic: "User Interaction",
        concept: "Web pages are interactive. We listen for user interactions using <code>element.addEventListener('click', callback)</code>.",
        example: "const btn = document.createElement('button');\nbtn.textContent = 'Click me';\nbtn.addEventListener('click', () => console.log('Clicked!'));\nDOM.appendChild(btn);",
        task: "A button has been provided. Add a click event listener to <code>myBtn</code> that prints <code>'Button Clicked!'</code> to the console. <b>Hint:</b> You will need to click the button in the Web Preview to pass!",
        initialCode: "DOM.innerHTML = '<button id=\"myBtn\">Click To Test</button>';\nconst myBtn = document.getElementById('myBtn');\n\n// Add a click event listener to myBtn:\n",
        validate: (state, logs) => {
            return logs.some(l => l.includes("Button Clicked!"));
        }
    },
    {
        title: "Asynchronous setTimeout",
        difficulty: "Advanced",
        topic: "Asynchronous Logic",
        concept: "JavaScript runs synchronously, but APIs like <code>setTimeout()</code> allow code execution to be delayed asynchronously. The code doesn't stop and wait; it schedules the callback for the future.",
        example: "console.log('First');\nsetTimeout(() => console.log('Third'), 1000);\nconsole.log('Second');",
        task: "Use <code>setTimeout()</code> to print <code>'Delayed Message'</code> to the console after 500 milliseconds. Note: The validator will wait for it!",
        initialCode: "// Print 'Delayed Message' after 500ms using setTimeout:\n",
        validate: (state, logs) => {
            return logs.some(l => l.includes("Delayed Message"));
        }
    },
    {
        title: "Promises & Async/Await",
        difficulty: "Advanced",
        topic: "Async Execution",
        concept: "Promises represent values that are not yet available. The <code>async/await</code> syntax makes working with Promises look synchronous, making it easier to read.",
        example: "const wait = (ms) => new Promise(res => setTimeout(res, ms));\nawait wait(500);\nconsole.log('Waited!');",
        task: "An async function <code>fetchMockData()</code> is provided which returns a Promise resolving to <code>'Secret Data'</code>. Use <code>await</code> to wait for it, and then print the result.",
        initialCode: "const fetchMockData = () => new Promise(r => setTimeout(() => r('Secret Data'), 500));\n\n// Use await to call fetchMockData() and print its result:\n",
        validate: (state, logs) => {
            return logs.some(l => l.includes("Secret Data"));
        }
    },
    {
        title: "APIs: Fetching Data",
        difficulty: "Advanced",
        topic: "Fetch API",
        concept: "We use the <code>fetch(url)</code> API to request data over the network. It returns a Promise. We use <code>await response.json()</code> to parse the JSON data.",
        example: "const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\nconst data = await res.json();\nconsole.log(data.name);",
        task: "Fetch data from <code>'https://jsonplaceholder.typicode.com/todos/1'</code>, parse it as JSON, and print the <code>title</code> property of the returned object.",
        initialCode: "// 1. fetch from 'https://jsonplaceholder.typicode.com/todos/1'\n\n// 2. parse as json\n\n// 3. console.log the .title property\n",
        validate: (state, logs) => {
            return logs.some(l => typeof l === 'string' && l.toLowerCase().includes("delectus aut autem"));
        }
    },
    {
        title: "Building a Dynamic App",
        difficulty: "Advanced",
        topic: "DOM + APIs",
        concept: "Let's put it all together! You can fetch data from an API, loop through the arrays with <code>forEach</code> or <code>map</code>, and dynamically generate DOM elements for each item.",
        example: "const res = await fetch('https://jsonplaceholder.typicode.com/users');\nconst users = await res.json();\nusers.forEach(u => {\n  const p = document.createElement('p');\n  p.textContent = u.name;\n  DOM.appendChild(p);\n});",
        task: "Fetch the list of users from <code>'https://jsonplaceholder.typicode.com/users'</code>. Parse the JSON array. For the first 3 users, create an <code>&lt;h3&gt;</code> element with their <code>name</code> property, and append it to the <code>DOM</code> container.",
        initialCode: "// Fetch users\nconst res = await fetch('https://jsonplaceholder.typicode.com/users');\nconst users = await res.json();\n\n// Loop over the first 3 users (e.g. users.slice(0,3))\n// Create an <h3> for each and append to DOM\n",
        validate: (state, logs) => {
            const h3Tags = state.dom.querySelectorAll('h3');
            return h3Tags.length >= 3 && Array.from(h3Tags).some(h => h.textContent.includes('Leanne Graham'));
        }
    }
];

// --- Application Logic ---
let editor;
let currentLessonIndex = 0;
let highestLessonIndex = 0;
let userLogs = [];
let validationInterval = null;

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
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.javascript) {
        const jsProg = PyPlayAuth.user.progress.javascript;
        if (jsProg.highest_lesson && jsProg.highest_lesson > 0) {
            highestLessonIndex = jsProg.highest_lesson;
            currentLessonIndex = jsProg.highest_lesson;
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
            PyPlayAuth.updateProgress("javascript", currentLessonIndex, true).then(() => {
                window.location.href = 'dashboard.html';
            });
        }
    });
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('output-console').textContent = '';
        document.getElementById('dom-viewport').innerHTML = '';
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
    
    editor.setValue(lesson.initialCode);
    
    document.getElementById('output-console').textContent = 'Ready to execute JavaScript...\n';
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('dom-viewport').innerHTML = ''; // Reset DOM Viewport
    userLogs = [];
    
    document.getElementById('prev-btn').disabled = (index === 0);
    document.getElementById('next-btn').disabled = true; // wait for success
    
    updateProgressSteps();
    
    // If they already completed it, enable Next
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) 
        ? (PyPlayAuth.user.progress || {}) 
        : {};
    const jsProg = progressObj.javascript || { completed_lessons: [] };
    let completed = jsProg.completed_lessons;
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
    if (PyPlayAuth.user && PyPlayAuth.user.progress && PyPlayAuth.user.progress.javascript) {
        const jsProg = PyPlayAuth.user.progress.javascript;
        if (jsProg.highest_lesson !== undefined && jsProg.highest_lesson !== null) {
            highest = Number(jsProg.highest_lesson);
        } else if (jsProg.completed_lessons && jsProg.completed_lessons.length > 0) {
            highest = Math.max(...jsProg.completed_lessons) + 1;
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
    const viewport = document.getElementById('dom-viewport');
    
    // Auto-open dock when code runs
    const dock = document.getElementById('output-dock');
    const overlay = document.getElementById('dock-overlay');
    if (dock && overlay) {
        dock.classList.add('open');
        overlay.classList.add('open');
    }
    
    consoleEl.textContent = 'Running...\n';
    userLogs = [];
    viewport.innerHTML = ''; // Reset DOM output
    
    if (validationInterval) {
        clearInterval(validationInterval);
    }
    
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    console.log = function(...args) {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        userLogs.push(msg);
        consoleEl.textContent += msg + '\n';
        originalConsoleLog.apply(console, args);
    };
    
    console.error = function(...args) {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        userLogs.push("Error: " + msg);
        consoleEl.textContent += "Error: " + msg + '\n';
        originalConsoleError.apply(console, args);
    };

    try {
        // Evaluate the code in an async context, providing DOM
        const wrapCode = `
            return (async function() {
                const DOM = document.getElementById('dom-viewport');
                ${code}
            })();
        `;
        
        const func = new Function(wrapCode);
        await func();
        
        // Polling validation logic for async updates (like setTimeout or clicks)
        let checkCount = 0;
        validationInterval = setInterval(() => {
            checkValidation();
            checkCount++;
            // Stop checking after 5 seconds
            if (checkCount > 10 || !document.getElementById('next-btn').disabled) {
                clearInterval(validationInterval);
            }
        }, 500);
        
        checkValidation();
    } catch(err) {
        console.error(err.message);
    } finally {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    }
}

function checkValidation() {
    const lesson = lessons[currentLessonIndex];
    const state = { dom: document.getElementById('dom-viewport') };
    
    if (lesson.validate(state, userLogs)) {
        document.getElementById('success-message').classList.remove('hidden');
        document.getElementById('next-btn').disabled = false;
        if (currentLessonIndex === lessons.length - 1) {
            document.getElementById('next-btn').textContent = "Finish Course";
        }
        
        if (PyPlayAuth.user) {
            highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
            PyPlayAuth.updateProgress("javascript", currentLessonIndex, true);
            updateProgressSteps();
        }
    }
}
