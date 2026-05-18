// --- OpenCV Course State Management ---
const lessons = [
    {
        title: "Getting Started With Images",
        difficulty: "Intermediate",
        topic: "OpenCV Basics",
        concept: "In OpenCV, images are loaded using the <code>cv2.imread()</code> function. Loaded images are represented as standard multi-dimensional NumPy arrays (<code>numpy.ndarray</code>). You can check the shape/dimensions of an image using the <code>.shape</code> attribute, which returns a tuple of <code>(height, width, channels)</code> for color images, or <code>(height, width)</code> for grayscale images.",
        example: 'import cv2\n# Load an image (mock representation)\nimg_shape = (1080, 1920, 3)\nprint(img_shape)',
        task: 'Write a Python script that prints the shape of a loaded RGB image with a height of 1080 pixels and a width of 1920 pixels in the exact format: `(1080, 1920, 3)`',
        initialCode: '# Print the exact tuple shape below:\n',
        expectedOutput: "(1080, 1920, 3)"
    },
    {
        title: "Basic Image Manipulation",
        difficulty: "Intermediate",
        topic: "Manipulation",
        concept: "Images can be cropped using simple NumPy array slicing: <code>roi = img[y1:y2, x1:x2]</code>. Slicing extracts a Region of Interest (ROI). You can resize images using <code>cv2.resize(img, (new_width, new_height))</code>. In Python, slicing is non-inclusive of the end indices.",
        example: '# Slicing coordinates for a Region of Interest\ny_coords = "y[100:300]"\nx_coords = "x[150:350]"\nprint(f"{y_coords}, {x_coords}")',
        task: 'Define slicing coordinates starting from y=100 to y=300, and x=150 to x=350. Print them in the exact format: `y[100:300], x[150:350]`',
        initialCode: '# Print the coordinates below:\n',
        expectedOutput: "y[100:300], x[150:350]"
    },
    {
        title: "Image Annotation",
        difficulty: "Intermediate",
        topic: "Annotation",
        concept: "OpenCV provides basic shape and text drawing utilities. Drawing modifications are applied directly to the image array (in-place). Main functions include <code>cv2.line()</code>, <code>cv2.circle()</code>, <code>cv2.rectangle()</code>, and <code>cv2.putText()</code> for applying text overlay.",
        example: 'import cv2\n# Function for text drawing\nprint("cv2.putText")',
        task: 'Print the name of the exact OpenCV drawing function used to overlay text on top of an image. (Hint: print `cv2.putText`)',
        initialCode: '# Print function name:\n',
        expectedOutput: "cv2.putText"
    },
    {
        title: "Image Enhancement",
        difficulty: "Intermediate",
        topic: "Enhancement",
        concept: "Enhancing images involves adjusting brightness, contrast, or color distributions. A common method for grayscale images is Histogram Equalization using <code>cv2.equalizeHist()</code>, which spreads out the intensity distribution to improve contrast.",
        example: 'import cv2\nprint("cv2.equalizeHist")',
        task: 'Print the name of the OpenCV function used to perform histogram equalization on a grayscale image. (Hint: print `cv2.equalizeHist`)',
        initialCode: '# Print function name:\n',
        expectedOutput: "cv2.equalizeHist"
    },
    {
        title: "Accessing the Camera",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "To capture real-time camera streams or read video files, OpenCV uses the <code>cv2.VideoCapture()</code> class. Pass <code>0</code> as an argument to initialize the primary webcam interface.",
        example: 'import cv2\nprint("cv2.VideoCapture")',
        task: 'Print the name of the OpenCV class used to handle camera capture and video file decoding. (Hint: print `cv2.VideoCapture`)',
        initialCode: '# Print class name:\n',
        expectedOutput: "cv2.VideoCapture"
    },
    {
        title: "Video Writing",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "To save processed video frames to a file, use the <code>cv2.VideoWriter()</code> class. You must define a four-character code (FourCC) for video compression codecs using <code>cv2.VideoWriter_fourcc()</code> (e.g., *'MJPG').",
        example: 'import cv2\nprint("cv2.VideoWriter_fourcc")',
        task: 'Print the exact name of the OpenCV function used to declare the four-character codec (FourCC) for video writers. (Hint: print `cv2.VideoWriter_fourcc`)',
        initialCode: '# Print function name:\n',
        expectedOutput: "cv2.VideoWriter_fourcc"
    },
    {
        title: "Image Filtering",
        difficulty: "Intermediate",
        topic: "Filtering",
        concept: "Filters modify pixel neighborhoods to achieve blurring, sharpening, or edge highlighting. The Canny Edge Detector (<code>cv2.Canny()</code>) is a popular multi-stage algorithm used to detect a wide range of edges in images.",
        example: 'import cv2\nprint("cv2.Canny")',
        task: 'Print the name of the OpenCV function used to perform Canny Edge Detection. (Hint: print `cv2.Canny`)',
        initialCode: '# Print function name:\n',
        expectedOutput: "cv2.Canny"
    },
    {
        title: "Image Features and Alignment",
        difficulty: "Advanced",
        topic: "Features",
        concept: "Feature detection finds unique points (keypoints) in images. ORB (Oriented FAST and Rotated BRIEF) is an open-source, patent-free alternative to SIFT and SURF. Create ORB detectors using <code>cv2.ORB_create()</code>.",
        example: 'print("ORB")',
        task: 'Print the name of the patent-free keypoint detection and matching framework built into OpenCV. (Hint: print `ORB`)',
        initialCode: '# Print ORB:\n',
        expectedOutput: "ORB"
    },
    {
        title: "Panorama",
        difficulty: "Advanced",
        topic: "Stitching",
        concept: "Creating a panorama involves aligning multiple overlapping photos and blending them together. OpenCV features a powerful high-level class creator called <code>cv2.Stitcher_create()</code> which handles feature matching and warping in a single step.",
        example: 'import cv2\nprint("cv2.Stitcher_create")',
        task: 'Print the name of the high-level Stitcher class factory function in OpenCV used to align and join overlapping photos. (Hint: print `cv2.Stitcher_create`)',
        initialCode: '# Print Stitcher creator:\n',
        expectedOutput: "cv2.Stitcher_create"
    },
    {
        title: "HDR (High Dynamic Range)",
        difficulty: "Advanced",
        topic: "Computational",
        concept: "HDR combines images taken at different exposures. When exposure times are unknown, the Mertens algorithm (<code>cv2.createMergeMertens()</code>) blends the exposures using contrast, saturation, and well-exposedness weights.",
        example: 'import cv2\nprint("cv2.createMergeMertens")',
        task: 'Print the OpenCV factory function name for creating a Mertens-based exposure merge object. (Hint: print `cv2.createMergeMertens`)',
        initialCode: '# Print function name:\n',
        expectedOutput: "cv2.createMergeMertens"
    },
    {
        title: "Object Tracking",
        difficulty: "Advanced",
        topic: "Tracking",
        concept: "Object tracking follows a target bounding box across video frames. The CSRT (Channel and Spatial Reliability Tracker) is highly accurate, initialized using <code>cv2.TrackerCSRT_create()</code>.",
        example: 'import cv2\nprint("cv2.TrackerCSRT_create")',
        task: 'Print the creator function for the accurate CSRT bounding-box object tracker in OpenCV. (Hint: print `cv2.TrackerCSRT_create`)',
        initialCode: '# Print CSRT creator:\n',
        expectedOutput: "cv2.TrackerCSRT_create"
    },
    {
        title: "Face Detection",
        difficulty: "Advanced",
        topic: "Object Detection",
        concept: "OpenCV supports Haar Cascade Classifiers for rapid object/face detection. Detectors are loaded using the <code>cv2.CascadeClassifier()</code> class, reading pre-trained XML models.",
        example: 'import cv2\nprint("cv2.CascadeClassifier")',
        task: 'Print the class name in OpenCV used to load Haar Cascade XML classifier models. (Hint: print `cv2.CascadeClassifier`)',
        initialCode: '# Print CascadeClassifier:\n',
        expectedOutput: "cv2.CascadeClassifier"
    },
    {
        title: "TensorFlow Object Detection",
        difficulty: "Advanced",
        topic: "Deep Learning",
        concept: "OpenCV's Deep Learning Module (<code>cv2.dnn</code>) supports importing pre-trained neural networks. Load frozen TensorFlow model graphs (.pb) alongside text configs (.pbtxt) using <code>cv2.dnn.readNetFromTensorflow()</code>.",
        example: 'import cv2\nprint("cv2.dnn.readNetFromTensorflow")',
        task: 'Print the function name inside OpenCV\'s dnn module used to import a pre-trained TensorFlow network. (Hint: print `cv2.dnn.readNetFromTensorflow`)',
        initialCode: '# Print DNN function:\n',
        expectedOutput: "cv2.dnn.readNetFromTensorflow"
    },
    {
        title: "Pose Estimation using OpenPose",
        difficulty: "Advanced",
        topic: "Deep Learning",
        concept: "Human Pose Estimation models (like OpenPose) predict skeletal joint coordinates. Input frames are converted into multi-scale image blobs using <code>cv2.dnn.blobFromImage()</code>, which handles subtraction, scaling, and channel swapping before feeding the network.",
        example: 'import cv2\nprint("cv2.dnn.blobFromImage")',
        task: 'Print the name of the dnn function used to construct a normalized, preprocessed 4D blob from an input image. (Hint: print `cv2.dnn.blobFromImage`)',
        initialCode: '# Print blob generator function:\n',
        expectedOutput: "cv2.dnn.blobFromImage"
    }
];

let currentLessonIndex = 0;
let pyodideReady = false;
let pyodideInstance = null;

// --- DOM Elements ---
const dom = {
    lessonNum: document.getElementById('current-lesson-num'),
    totalLessons: document.getElementById('total-lessons'),
    progressBar: document.getElementById('progress-bar'),
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
    
    // Restore progress/resume from last uncompleted lesson
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        if (!PyPlayAuth.user.progress) {
            PyPlayAuth.user.progress = {};
        }
        const pyProgress = PyPlayAuth.user.progress.opencv || { completed_lessons: [], completed: false };
        const completed = pyProgress.completed_lessons || [];
        
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
}

// --- Functions ---
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
    
    // Update progress bar
    const progress = ((index) / lessons.length) * 100;
    dom.progressBar.style.width = `${progress}%`;
    
    // Update buttons
    dom.prevBtn.disabled = index === 0;
    dom.nextBtn.disabled = true; // Disabled until task is passed
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
    
    // Normalize spaces and quotes to ensure robust validation
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
            PyPlayAuth.updateProgress("opencv", currentLessonIndex, true);
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
            alert("Congratulations! You've completed the PyPlay OpenCV with Python course! 📷🎉");
            dom.progressBar.style.width = '100%';
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
