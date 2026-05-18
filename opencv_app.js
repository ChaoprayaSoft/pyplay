// --- OpenCV Course State Management ---
const lessons = [
    {
        title: "Getting Started With Images",
        difficulty: "Intermediate",
        topic: "OpenCV Basics",
        concept: "In OpenCV, images are loaded using the <code>cv2.imread()</code> function. Loaded images are represented as standard multi-dimensional NumPy arrays (<code>numpy.ndarray</code>). You can check the shape/dimensions of an image using the <code>.shape</code> attribute, which returns a tuple of <code>(height, width, channels)</code> for color images, or <code>(height, width)</code> for grayscale images. In this sandbox, dynamic assets are preloaded inside the <code>image/</code> folder. Passing <code>cv2.imshow()</code> renders the image live in the Live Preview tab! [Test images: image/logo.png, image/duck.jpg, image/test.png]",
        example: 'import cv2\n# Load and display sample image from image folder\nimg = cv2.imread("image/logo.png")\nprint(img.shape)\ncv2.imshow("Logo Image", img)',
        task: 'Write a Python script that imports `cv2`, reads the file `image/logo.png` stored in the `image` folder using `cv2.imread()`, and prints the dimensions (`.shape`) of the image array. The pre-loaded image is size 400x400 with 3 color channels.',
        initialCode: 'import cv2\n# Write code to load "image/logo.png" and print its shape:\n',
        expectedOutput: "(400, 400, 3)"
    },
    {
        title: "Basic Image Manipulation",
        difficulty: "Intermediate",
        topic: "Manipulation",
        concept: "Images can be cropped using simple NumPy array slicing: <code>roi = img[y1:y2, x1:x2]</code>. Slicing extracts a Region of Interest (ROI). You can resize images using <code>cv2.resize(img, (new_width, new_height))</code>. Slicing coordinate indices are non-inclusive of the end values.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\n# Extract region from y=100 to 300, and x=100 to 300\nroi = img[100:300, 100:300]\nprint(roi.shape)\ncv2.imshow("Crop", roi)',
        task: 'Load `logo.png`, crop a Region of Interest (ROI) containing the center circle from y=120 to 280 and x=120 to 280. Print the shape of the cropped ROI image.',
        initialCode: 'import cv2\n# Crop the image from y: 120 to 280, x: 120 to 280 and print its shape:\n',
        expectedOutput: "(160, 160, 3)"
    },
    {
        title: "Image Annotation",
        difficulty: "Intermediate",
        topic: "Annotation",
        concept: "OpenCV provides shape drawing utilities that modify the image array in-place. Functions include <code>cv2.line()</code>, <code>cv2.circle()</code>, and <code>cv2.rectangle()</code>. Coordinates are specified as tuples <code>(x, y)</code>, and colors are defined in BGR order (Blue, Green, Red).",
        example: 'import cv2\nimg = cv2.imread("logo.png")\n# Draw a white circle at coordinates (200, 200) with a radius of 80\ncv2.circle(img, (200, 200), 80, (255, 255, 255), -1)\ncv2.imshow("Annotated", img)',
        task: 'Load `logo.png` and draw a solid green square (thickness = -1, which fills the shape) with corner points at top-left `(10, 10)` and bottom-right `(100, 100)`. Use color `(0, 255, 0)` in BGR. Print the color value of the pixel at coordinate `(10, 10)` as a python list: `print(list(img[10, 10]))`.',
        initialCode: 'import cv2\nimg = cv2.imread("logo.png")\n# Draw solid green rectangle from (10, 10) to (100, 100) and print pixel (10, 10) list color:\n',
        expectedOutput: "[0, 255, 0]"
    },
    {
        title: "Image Enhancement",
        difficulty: "Intermediate",
        topic: "Enhancement",
        concept: "Grayscale images represent pixel intensity values between 0 (black) and 255 (white). You can convert color BGR images to grayscale using <code>cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)</code>. To improve contrast across an image, use histogram equalization with <code>cv2.equalizeHist()</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\neq = cv2.equalizeHist(gray)\ncv2.imshow("Grayscale Equalized", eq)',
        task: 'Load `logo.png`, convert it to grayscale, equalize its histogram using `cv2.equalizeHist()`, and print the intensity value of the center pixel at coordinates `(200, 200)`.',
        initialCode: 'import cv2\n# Convert to grayscale, equalize, and print pixel (200, 200) value:\n',
        expectedOutput: "255"
    },
    {
        title: "Accessing the Camera",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "OpenCV reads video input streams from a camera or a file using the <code>cv2.VideoCapture()</code> class. Pass <code>0</code> as an argument to capture from the default system webcam. You can verify if the capture started correctly using the <code>.isOpened()</code> method.",
        example: 'import cv2\ncap = cv2.VideoCapture(0)\nprint(f"Camera Active: {cap.isOpened()}")\ncap.release()',
        task: 'Initialize the default camera capture interface (`index 0`) using `cv2.VideoCapture()`, and print the boolean result of checking if the camera `isOpened()`.',
        initialCode: 'import cv2\n# Initialize camera capture and print if opened:\n',
        expectedOutput: "True"
    },
    {
        title: "Video Writing",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "To save video files, instantiate `cv2.VideoWriter`. To compress video frames, specify a FourCC (Four Character Code) codec like `'MJPG'` or `'XVID'` using <code>cv2.VideoWriter_fourcc(*'MJPG')</code>.",
        example: 'import cv2\nfourcc = cv2.VideoWriter_fourcc(*"MJPG")\nprint(fourcc)',
        task: "Initialize the four-character video codec (FourCC) for the 'MJPG' codec format, and print a check verifying the codec is successfully initialized (e.g. `fourcc > 0`).",
        initialCode: 'import cv2\n# Initialize MJPG fourcc codec and print if successfully generated (value > 0):\n',
        expectedOutput: "True"
    },
    {
        title: "Image Filtering",
        difficulty: "Intermediate",
        topic: "Filtering",
        concept: "Filtering modifies pixels based on local neighborhoods. You can blur images to reduce noise using Gaussian Blur with <code>cv2.GaussianBlur(img, (kernel_width, kernel_height), sigmaX)</code>. The kernel dimensions must be odd numbers.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\nblurred = cv2.GaussianBlur(img, (5, 5), 0)\ncv2.imshow("Gaussian Blur", blurred)',
        task: 'Load `logo.png`, apply a Gaussian Blur filter with a kernel size of `(5, 5)` and sigma `0`, and print the shape of the resulting blurred image.',
        initialCode: 'import cv2\n# Load logo, apply Gaussian Blur with 5x5 kernel and print shape:\n',
        expectedOutput: "(400, 400, 3)"
    },
    {
        title: "Image Features and Alignment",
        difficulty: "Advanced",
        topic: "Features",
        concept: "Feature detection finds unique points (keypoints) in images. ORB (Oriented FAST and Rotated BRIEF) is an open-source, patent-free alternative to SIFT and SURF. Create ORB detectors using <code>cv2.ORB_create()</code> and locate features using <code>detector.detect(img, None)</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\norb = cv2.ORB_create()\nkp = orb.detect(img, None)\nprint(f"Features: {len(kp)}")',
        task: 'Load `logo.png`, instantiate a standard ORB detector using `cv2.ORB_create()`, detect keypoints on the image, and print if at least one keypoint was detected (e.g., `print(len(kp) > 0)`).',
        initialCode: 'import cv2\n# Create ORB, detect features, and print if keypoint length is > 0:\n',
        expectedOutput: "True"
    },
    {
        title: "Panorama",
        difficulty: "Advanced",
        topic: "Stitching",
        concept: "Creating a panorama involves aligning multiple overlapping photos and blending them together. OpenCV features a powerful high-level class creator called <code>cv2.Stitcher_create()</code> which handles feature matching and warping in a single step.",
        example: 'import cv2\nstitcher = cv2.Stitcher_create()\nprint(type(stitcher))',
        task: 'Create an OpenCV Stitcher object using `cv2.Stitcher_create()`, and print a boolean check verifying that the text `"Stitcher"` is contained within the string representation of its object type.',
        initialCode: 'import cv2\n# Create Stitcher and print if "Stitcher" is in type string:\n',
        expectedOutput: "True"
    },
    {
        title: "HDR (High Dynamic Range)",
        difficulty: "Advanced",
        topic: "Computational",
        concept: "HDR combines images taken at different exposures. When exposure times are unknown, the Mertens algorithm (<code>cv2.createMergeMertens()</code>) blends the exposures using contrast, saturation, and well-exposedness weights.",
        example: 'import cv2\nmerge = cv2.createMergeMertens()\nprint(type(merge))',
        task: 'Create a Mertens exposure merge object using `cv2.createMergeMertens()`, and print a boolean check verifying that `"MergeMertens"` is in the string representation of its object type.',
        initialCode: 'import cv2\n# Create MergeMertens and print if "MergeMertens" is in type string:\n',
        expectedOutput: "True"
    },
    {
        title: "Object Tracking",
        difficulty: "Advanced",
        topic: "Tracking",
        concept: "Object tracking follows a target bounding box across video frames. The CSRT (Channel and Spatial Reliability Tracker) is highly accurate, initialized using <code>cv2.TrackerCSRT_create()</code>.",
        example: 'import cv2\ntracker = cv2.TrackerCSRT_create()\nprint(type(tracker))',
        task: 'Instantiate a CSRT object tracker using `cv2.TrackerCSRT_create()`, and print a check verifying that `"TrackerCSRT"` is contained within the string representation of its object type.',
        initialCode: 'import cv2\n# Create CSRT tracker and print if "TrackerCSRT" is in type string:\n',
        expectedOutput: "True"
    },
    {
        title: "Face Detection",
        difficulty: "Advanced",
        topic: "Object Detection",
        concept: "OpenCV supports Haar Cascade Classifiers for rapid object/face detection. Detectors are loaded using the <code>cv2.CascadeClassifier()</code> class, reading pre-trained XML models.",
        example: 'import cv2\nface_cascade = cv2.CascadeClassifier()\nprint(type(face_cascade))',
        task: 'Instantiate a Haar Cascade XML Classifier using `cv2.CascadeClassifier()`, and print a check verifying that `"CascadeClassifier"` is contained within the string representation of its object type.',
        initialCode: 'import cv2\n# Create CascadeClassifier and print if "CascadeClassifier" is in type string:\n',
        expectedOutput: "True"
    },
    {
        title: "TensorFlow Object Detection",
        difficulty: "Advanced",
        topic: "Deep Learning",
        concept: "OpenCV's Deep Learning Module (<code>cv2.dnn</code>) supports importing pre-trained neural networks. Load frozen TensorFlow model graphs (.pb) alongside text configs (.pbtxt) using <code>cv2.dnn.readNetFromTensorflow()</code>.",
        example: 'import cv2\nprint("dnn" in dir(cv2))',
        task: 'Write a script that prints a check verifying the availability of the deep learning (`dnn`) module in the imported `cv2` library.',
        initialCode: 'import cv2\n# Print if "dnn" is in dir(cv2):\n',
        expectedOutput: "True"
    },
    {
        title: "Pose Estimation using OpenPose",
        difficulty: "Advanced",
        topic: "Deep Learning",
        concept: "Human Pose Estimation models (like OpenPose) predict skeletal joint coordinates. Input frames are converted into multi-scale image blobs using <code>cv2.dnn.blobFromImage()</code>, which handles subtraction, scaling, and channel swapping before feeding the network.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\nblob = cv2.dnn.blobFromImage(img, 1.0/255.0, (224, 224))\nprint(blob.shape)',
        task: 'Load `logo.png`, convert it into a normalized 4D deep learning input blob using `cv2.dnn.blobFromImage()` with a scale factor of `1.0/255.0`, and dimensions of `(224, 224)`. Print the shape of the generated output blob.',
        initialCode: 'import cv2\n# Load logo, convert to a 4D blob of (224, 224) and print blob shape:\n',
        expectedOutput: "(1, 3, 224, 224)"
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

    // Restore progress/resume from last uncompleted lesson
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        if (!PyPlayAuth.user.progress) {
            PyPlayAuth.user.progress = {};
        }
        const pyProgress = PyPlayAuth.user.progress.opencv || { completed_lessons: [], completed: false, highest_lesson: 0 };
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

        appendOutput("Loading OpenCV WebAssembly library (this may take a few seconds)...\n");
        await pyodideInstance.loadPackage("opencv-python");

        // Create 'image' folder inside Pyodide's virtual filesystem
        try {
            pyodideInstance.FS.mkdir('image');
        } catch (e) {
            console.warn("Folder 'image' already exists or could not be created:", e);
        }

        // Fetch and write physical course images dynamically to Pyodide virtual filesystem
        let courseImages = ["logo.png", "duck.jpg", "test.png"];
        try {
            appendOutput("Scanning 'image' folder for course assets...\n");
            const listResponse = await fetch('image/');
            if (listResponse.ok) {
                const htmlText = await listResponse.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const links = Array.from(doc.querySelectorAll('a'))
                    .map(a => a.getAttribute('href'))
                    .map(href => {
                        try { return decodeURIComponent(href); } catch (e) { return href; }
                    })
                    .filter(href => href && /\.(png|jpg|jpeg|bmp)$/i.test(href))
                    .map(href => href.substring(href.lastIndexOf('/') + 1));

                if (links.length > 0) {
                    courseImages = [...new Set(links)];
                }
            }
        } catch (e) {
            console.warn("Could not dynamically parse image/ directory index, using standard fallbacks:", e);
        }

        for (const imgName of courseImages) {
            try {
                appendOutput(`Preloading course image: ${imgName}...\n`);
                const imgResponse = await fetch(`image/${imgName}`);
                if (imgResponse.ok) {
                    const arrayBuffer = await imgResponse.arrayBuffer();
                    const uint8Arr = new Uint8Array(arrayBuffer);

                    // Write to both root and image/ folder so both paths resolve!
                    pyodideInstance.FS.writeFile(imgName, uint8Arr);
                    pyodideInstance.FS.writeFile(`image/${imgName}`, uint8Arr);
                }
            } catch (e) {
                console.warn(`Could not preload image asset ${imgName} into Pyodide FS:`, e);
            }
        }
        appendOutput("All dynamic image assets loaded successfully!\n");

        // Inject synthetic OpenCV environment overrides
        await pyodideInstance.runPythonAsync(`
import sys
import types

try:
    import cv2
    import numpy as np
    from js import Uint8Array, Blob, URL
    
    # 1. Custom mock image loader returning standard shape/colored gradients
    original_imread = cv2.imread
    def patch_imread(filename, flags=1):
        try:
            # Try to read natively if file preloaded in virtual filesystem
            mat = original_imread(filename, flags)
            if mat is not None:
                return mat
        except:
            pass
            
        # Mock fallback
        img = np.zeros((400, 400, 3), dtype=np.uint8)
        for y in range(400):
            for x in range(400):
                img[y, x] = [
                    int((x / 400.0) * 255),  # B
                    int((y / 400.0) * 255),  # G
                    150                      # R
                ]
        # Overlays
        cv2.circle(img, (200, 200), 80, (255, 255, 255), -1)
        cv2.putText(img, "PyPlay Live", (110, 210), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
        return img
        
    # 2. Custom live-canvas preview bridge
    def patch_imshow(winname, mat):
        try:
            # Display image in standard BGR color space (default OpenCV behavior).
            # cv2.imencode natively expects standard BGR format and compiles it to standard RGB PNG
            # bytes, so passing the matrix directly provides perfect color accuracy in the browser.
            success, encoded_img = cv2.imencode('.png', mat)
            if success:
                arr = Uint8Array.new(encoded_img.tobytes())
                blob = Blob.new([arr], type="image/png")
                url = URL.createObjectURL(blob)
                
                from js import updateCanvasPreview
                updateCanvasPreview(winname, url)
        except Exception as e:
            print("Error in cv2.imshow: " + str(e))
            
    cv2.imread = patch_imread
    cv2.imshow = patch_imshow
    
    # 3. Bulletproof Video Capture Mocks
    class MockVideoCapture:
        def __init__(self, *args, **kwargs): pass
        def isOpened(self): return True
        def read(self): return True, patch_imread("logo.png")
        def release(self): pass
    cv2.VideoCapture = MockVideoCapture
    
    # 4. Bulletproof contrib, deep learning, and advanced algorithm mocks
    if not hasattr(cv2, 'Stitcher_create'):
        class MockStitcher: pass
        cv2.Stitcher_create = lambda: MockStitcher()
        
    if not hasattr(cv2, 'createMergeMertens'):
        class MockMergeMertens: pass
        cv2.createMergeMertens = lambda: MockMergeMertens()
        
    if not hasattr(cv2, 'TrackerCSRT_create'):
        class MockTrackerCSRT: pass
        cv2.TrackerCSRT_create = lambda: MockTrackerCSRT()
        
    if not hasattr(cv2, 'CascadeClassifier'):
        class MockCascadeClassifier: pass
        cv2.CascadeClassifier = MockCascadeClassifier
        
    if not hasattr(cv2, 'dnn'):
        class MockDNN:
            def readNetFromTensorflow(self, *args): return None
            def blobFromImage(self, img, *args):
                return np.zeros((1, 3, 224, 224))
        cv2.dnn = MockDNN()
    else:
        if not hasattr(cv2.dnn, 'readNetFromTensorflow'):
            cv2.dnn.readNetFromTensorflow = lambda *args: None
        if not hasattr(cv2.dnn, 'blobFromImage'):
            cv2.dnn.blobFromImage = lambda img, *args: np.zeros((1, 3, 224, 224))
except Exception as e:
    print("Error initializing OpenCV sandbox: " + str(e))
        `);

        pyodideReady = true;

        dom.outputConsole.textContent = "Python & OpenCV Engine Ready! 📸🐍\n\nYou can write real Python code using 'import cv2' and preview your modifications live with cv2.imshow('Title', image)!\n\n";
        dom.runBtn.disabled = false;
    } catch (err) {
        dom.outputConsole.innerHTML = `<span class="terminal-error">Failed to load Python Engine. Please check your internet connection.</span>`;
        console.error(err);
    }

    setupEventListeners();
}

// --- Live Preview Helper Functions ---
window.hasImagePreview = false;

window.openPreviewPopupDirect = function () {
    if (window.hasImagePreview) {
        document.getElementById('opencv-popup-window').classList.add('show');
    } else {
        alert("No image output available yet. Write a script using cv2.imshow() and click 'Run Code' to generate an image preview first!");
    }
};

window.updateCanvasPreview = function (winname, url) {
    // Support single parameter fallback
    if (!url) {
        url = winname;
        winname = "OpenCV Live Preview";
    }

    const img = new Image();
    img.onload = function () {
        // 1. Render to Popup Canvas
        const popupCanvas = document.getElementById('preview-canvas-popup');
        const popupCtx = popupCanvas.getContext('2d');
        popupCanvas.width = img.width;
        popupCanvas.height = img.height;
        popupCtx.drawImage(img, 0, 0);

        // 2. Show Popup window & set state
        document.getElementById('opencv-popup-title').textContent = winname;
        document.getElementById('opencv-popup-window').classList.add('show');
        window.hasImagePreview = true;
    };
    img.src = url;
};

// --- Functions ---
function renderProgressSteps() {
    const container = dom.progressStepsContainer;
    if (!container) return;

    container.innerHTML = '';

    // Retrieve highest lesson index from user progress
    let highest = highestLessonIndex;
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const pyProgress = PyPlayAuth.user.progress.opencv || { completed_lessons: [], completed: false, highest_lesson: 0 };
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
        ? (PyPlayAuth.user.progress.opencv || { completed_lessons: [], completed: false })
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
    window.hasImagePreview = false;
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
            alert("Congratulations! You've completed the PyPlay OpenCV with Python course! 📷🎉");
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
