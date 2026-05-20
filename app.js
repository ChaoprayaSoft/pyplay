// --- State Management ---
const lessons = [
    {
        title: "Hello, World!",
        difficulty: "Beginner",
        topic: "Basics",
        concept: "The `print()` function is used to output text (or any data) directly to the console. In Python, string literals are enclosed in single `'` or double `\"` quotes. In PyPlay, your code runs inside a real, live Python engine directly in your browser!",
        example: 'print("Hello, World!")',
        task: 'Use the `print()` function to output the exact phrase: `Hello, Python!`',
        initialCode: '# Write your code below:\n',
        expectedOutput: "Hello, Python!"
    },
    {
        title: "Variables and Types",
        difficulty: "Beginner",
        topic: "Variables",
        concept: "Python is completely object-oriented, and not statically typed. You do not need to declare variables before using them, or declare their type. Simply assign a value using `=`. PyPlay supports numbers (integers `int` and floats `float`) and text strings (`str`).",
        example: 'myint = 7\nmyfloat = 7.0\nmystring = "hello"\nprint(myint)\nprint(myfloat)\nprint(mystring)',
        task: 'Create three variables: an integer named `myint` with the value `10`, a float named `myfloat` with the value `20.5`, and a string named `mystring` with the value `"interactive"`. Print all three on separate lines.',
        initialCode: '# Create and print your variables below:\n',
        expectedOutput: "10\n20.5\ninteractive"
    },
    {
        title: "Lists",
        difficulty: "Beginner",
        topic: "Lists",
        concept: "Lists are ordered collections of items, and are very similar to arrays. They can contain any type of variable, and as many variables as you wish. You can define a list with square brackets `[]` and add items using the `.append()` method.",
        example: 'mylist = []\nmylist.append(1)\nmylist.append(2)\nprint(mylist)',
        task: 'Create a list called `colors`. Add the strings `"red"`, `"green"`, and `"blue"` to it in that order using `.append()`. Finally, print the `colors` list.',
        initialCode: 'colors = []\n# Append elements and print below:\n',
        expectedOutput: "['red', 'green', 'blue']"
    },
    {
        title: "Basic Operators",
        difficulty: "Beginner",
        topic: "Operators",
        concept: "Python supports standard arithmetic operators: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), `%` (modulo - returns remainder), and `**` (exponentiation). You can also use operators with strings (e.g. `\"hello\" + \" \" + \"world\"` or `\"hello\" * 3`).",
        example: 'remainder = 11 % 3\nsquared = 5 ** 2\nprint(remainder)\nprint(squared)',
        task: 'Calculate the remainder of `25` divided by `4`, store it in a variable called `result`, and print it.',
        initialCode: '# Calculate remainder and print:\n',
        expectedOutput: "1"
    },
    {
        title: "String Formatting",
        difficulty: "Beginner",
        topic: "Strings",
        concept: "Modern Python uses **f-strings** (formatted string literals) to format strings elegantly. Simply prefix the string with `f` or `F` and place variables or expressions inside curly braces `{}`.",
        example: 'name = "John"\nage = 30\nprint(f"My name is {name} and I am {age} years old.")',
        task: 'Using f-strings, format the variables `course = "Python"` and `rating = 5` into the exact sentence: `I rate the Python course 5 stars!` and print it.',
        initialCode: 'course = "Python"\nrating = 5\n# Format and print below:\n',
        expectedOutput: "I rate the Python course 5 stars!"
    },
    {
        title: "Basic String Operations",
        difficulty: "Beginner",
        topic: "Strings",
        concept: "Strings can be manipulated in various ways. You can find the length of a string using `len()`, find the index of a character, count occurrences, or slice substrings using `string[start:end]` (non-inclusive of `end`).",
        example: 's = "Hello World!"\nprint(len(s))\nprint(s[0:5]) # prints Hello',
        task: 'Given the string `msg = "Coding Sandbox"`, print its length on the first line, and its first word `"Coding"` (sliced from index 0 to 6) on the second line.',
        initialCode: 'msg = "Coding Sandbox"\n# Print length and the sliced word below:\n',
        expectedOutput: "14\nCoding"
    },
    {
        title: "Conditions",
        difficulty: "Intermediate",
        topic: "Logic",
        concept: "Python uses boolean logic to evaluate conditions. The boolean operators are `and`, `or`, and `not`. Python uses indentation (usually 4 spaces) to define code blocks instead of curly braces.",
        example: 'name = "John"\nage = 23\nif name == "John" and age > 20:\n    print("Welcome John!")',
        task: 'Write an `if` condition that checks if `score` is greater than or equal to `50` AND `is_active` is `True`. If both are true, print `"Access Granted"`.',
        initialCode: 'score = 75\nis_active = True\n# Write your condition below:\n',
        expectedOutput: "Access Granted"
    },
    {
        title: "Loops",
        difficulty: "Intermediate",
        topic: "Loops",
        concept: "There are two types of loops in Python: `for` and `while`. A `for` loop iterates over a given sequence (like lists or a range of numbers generated by `range(start, end)`). You can skip iterations using `continue`.",
        example: 'for i in range(1, 4):\n    print(i)',
        task: 'Write a `for` loop to print all **even** numbers between `1` and `10` (inclusive) using a loop over `range(1, 11)`. (Hint: check if `i % 2 == 0`).',
        initialCode: '# Print even numbers from 1 to 10 below:\n',
        expectedOutput: "2\n4\n6\n8\n10"
    },
    {
        title: "Functions",
        difficulty: "Intermediate",
        topic: "Functions",
        concept: "Functions are convenient ways to divide your code into useful blocks, making it readable, reusable, and structured. They are defined using the `def` keyword, followed by the function name, arguments, and a colon `:`. Use `return` to send a value back.",
        example: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Bob"))',
        task: 'Define a function called `square(num)` that returns the square of the given number. Call the function with the argument `9` and print the returned value.',
        initialCode: '# Define your function and call it below:\n',
        expectedOutput: "81"
    },
    {
        title: "Classes and Objects",
        difficulty: "Intermediate",
        topic: "OOP",
        concept: "Objects are an encapsulation of variables and functions into a single entity. Objects get their variables and functions from classes. Classes are blueprints. The `self` parameter represents the instance of the object.",
        example: 'class Dog:\n    def bark(self):\n        print("Woof!")\n\nmy_dog = Dog()\nmy_dog.bark()',
        task: 'Create a class called `Student` with a variable attribute `grade = "A"` and a method called `report(self)` that prints `"Grade is A"`. Instantiate an object of `Student` named `student1`, and call its `report()` method.',
        initialCode: '# Create Student class and run method:\n',
        expectedOutput: "Grade is A"
    },
    {
        title: "Dictionaries",
        difficulty: "Intermediate",
        topic: "Data Structures",
        concept: "A dictionary is a database-like data structure that stores data as key-value pairs. Dictionaries are indexed by keys, which can be any immutable type (like strings or integers). Define them using curly braces `{}` and colons `:`.",
        example: 'phonebook = {\n    "Alice": 5551234,\n    "Bob": 5555678\n}\nprint(phonebook["Alice"])',
        task: 'Create a dictionary named `inventory` containing two pairs: `"apples"` with value `15`, and `"bananas"` with value `24`. Print the `inventory` dictionary.',
        initialCode: 'inventory = {}\n# Populate inventory and print below:\n',
        expectedOutput: "{'apples': 15, 'bananas': 24}"
    },
    {
        title: "Modules and Packages",
        difficulty: "Advanced",
        topic: "Imports",
        concept: "Modules in Python are simply files with the `.py` extension. You can import modules and use functions defined in them using the `import` command. For example, Python's built-in `math` module has math functions, and `random` has random-number generation functions.",
        example: 'import math\nprint(math.cos(0)) # prints 1.0',
        task: 'Import the `random` module, then use `random.randint(10, 10)` to generate a number (which will always be `10`), and print it. (Hint: run `print(random.randint(10, 10))`).',
        initialCode: '# Import and print below:\n',
        expectedOutput: "10"
    },
    {
        title: "Input and Output",
        difficulty: "Advanced",
        topic: "File I/O",
        concept: "Python uses the built-in `open()` function to write and read files. Use `'w'` mode to write (overwriting existing content) and `'r'` mode to read. Don't forget to `.close()` files to release resources, or use a `with open(...) as f` block, which auto-closes them.",
        example: 'with open("test.txt", "w") as f:\n    f.write("Hello File")\nwith open("test.txt", "r") as f:\n    print(f.read())',
        task: 'Open a file called `log.txt` in write mode (`"w"`), write the string `"PyPlay Log Active"` to it, and close it. Then open the same file in read mode (`"r"`), read its content, and print it to standard output.',
        initialCode: '# Perform File I/O below:\n',
        expectedOutput: "PyPlay Log Active"
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
    dom.totalLessons.textContent = lessons.length;
    
    // Initialize CodeMirror
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'python',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        matchBrackets: true
    });
    
    // SYNC FIRST: Pull latest progress from Google Sheets before reading progress
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
        await PyPlayAuth.syncFromSheets();
    }
    
    // Restore progress/resume from last uncompleted lesson
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const pyProgress = PyPlayAuth.user.progress.python || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = pyProgress.completed_lessons || [];
        
        // Find highest lesson unlocked
        if (pyProgress.highest_lesson !== undefined) {
            highestLessonIndex = pyProgress.highest_lesson;
        } else {
            // Fallback to max completed lesson index + 1 or 0
            highestLessonIndex = completed.length > 0 ? Math.max(...completed) + 1 : 0;
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
    
    // Load lesson
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

// --- Functions ---

function renderProgressSteps() {
    const container = dom.progressStepsContainer;
    if (!container) return;
    
    container.innerHTML = '';
    
    // Retrieve highest lesson index from user progress
    let highest = highestLessonIndex;
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const pyProgress = PyPlayAuth.user.progress.python || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = pyProgress.completed_lessons || [];
        if (pyProgress.highest_lesson !== undefined) {
            highest = pyProgress.highest_lesson;
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
    const pyProgress = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user)
        ? (PyPlayAuth.user.progress.python || { completed_lessons: [], completed: false })
        : { completed_lessons: [], completed: false };
    const completed = pyProgress.completed_lessons || [];
    
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
    const normalizedExpected = lesson.expectedOutput.trim().replace(/\s+/g, ' ').replace(/"/g, "'");

    if (normalizedOutput === normalizedExpected) {
        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;
        
        // Add celebration animation
        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight; // trigger reflow
        dom.successMessage.style.animation = null;
        
        // Save progress to localStorage & Google Sheets
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("python", currentLessonIndex, true);
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
