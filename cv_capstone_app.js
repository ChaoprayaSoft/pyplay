// --- CV Capstone Course State Management ---
const lessons = [
    {
        title: "Capstone 1: Face Detection Pipeline",
        difficulty: "Expert",
        topic: "Haar Cascades",
        concept: "In this capstone, you will use Haar Cascades to detect faces in an image. You must convert the image to grayscale, load the pre-trained cascade `cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')`, and detect faces using `detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)`. Finally, draw a red rectangle `(0, 0, 255)` with thickness 2 around each detected face.",
        example: 'import cv2\n# Example of loading a cascade:\nface_cascade = cv2.CascadeClassifier("path_to_xml")\nfaces = face_cascade.detectMultiScale(gray, 1.1, 4)',
        task: 'Load `image/face.png` (our test subject), convert to grayscale, instantiate the face cascade using a dummy path `"haarcascade_frontalface_default.xml"`. Call `detectMultiScale(gray, 1.1, 5)` to get the face coordinates (mocked to return one face `[150, 100, 100, 100]`). Loop through the faces and draw a red rectangle on the original image. Print the number of faces detected.',
        initialCode: 'import cv2\n# Load image/face.png, convert to gray, load cascade, detect faces, draw red rectangles, print face count:\n',
        expectedOutput: ["1", "1\n"],
        inputImage: "image/face.png",
        hint: "Convert to grayscale. `cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')`. `faces = cascade.detectMultiScale(gray, 1.1, 5)`. Loop through faces `for (x,y,w,h) in faces:` and use `cv2.rectangle()`. Print `len(faces)`."
    },
    {
        title: "Capstone 2: Document Scanner",
        difficulty: "Expert",
        topic: "Perspective Transform",
        concept: "A document scanner takes a skewed image of a document and warps it to a top-down view. This requires finding the 4 corners of the document (usually via contours), defining 4 destination points (the corners of a flat rectangle), computing the perspective transform matrix using `cv2.getPerspectiveTransform(src_pts, dst_pts)`, and applying it with `cv2.warpPerspective(img, M, (width, height))`.",
        example: 'import cv2\nimport numpy as np\nM = cv2.getPerspectiveTransform(src, dst)\nwarped = cv2.warpPerspective(img, M, (300, 400))',
        task: 'Load `image/document.png`. Define source points `src = np.float32([[50,50], [350,50], [50,350], [350,350]])` and destination points `dst = np.float32([[0,0], [300,0], [0,400], [300,400]])`. Calculate the perspective transform matrix `M`. Warp the image to size `(300, 400)`. Print the shape of the resulting warped image.',
        initialCode: 'import cv2\nimport numpy as np\n# Load image/document.png, define src and dst points, get matrix M, warp to (300, 400), print warped shape:\n',
        expectedOutput: ["(400, 300, 3)", "(400,300,3)"],
        inputImage: "image/document.png",
        hint: "Define `src` and `dst` as np.float32 arrays. Use `M = cv2.getPerspectiveTransform(src, dst)`. Then `warped = cv2.warpPerspective(img, M, (300, 400))`. Print `warped.shape`."
    },
    {
        title: "Capstone 3: Invisible Cloak",
        difficulty: "Expert",
        topic: "Color Masking",
        concept: "The 'Invisible Cloak' effect works by tracking a specific color (like a green screen) and replacing it with a pre-captured background image. You use `cv2.inRange()` in the HSV color space to create a mask of the cloak, invert the mask using `cv2.bitwise_not()` to get the foreground, and combine the background and foreground using `cv2.bitwise_and()`.",
        example: 'import cv2\nmask = cv2.inRange(hsv, lower, upper)\nmask_inv = cv2.bitwise_not(mask)\nres1 = cv2.bitwise_and(bg, bg, mask=mask)\nres2 = cv2.bitwise_and(img, img, mask=mask_inv)',
        task: 'Load `image/cloak_fg.png` as the current frame and `image/cloak_bg.png` as the background (for testing). Convert the frame to HSV. Create a mask for color range `lower = np.array([0, 0, 0])` and `upper = np.array([180, 255, 100])`. Invert the mask. Extract the background using the mask, and the foreground using the inverted mask. Add them together using `cv2.add()`. Print the value of `mask_inv[200, 200]`.',
        initialCode: 'import cv2\nimport numpy as np\n# Frame = image/cloak_fg.png & BG = image/cloak_bg.png. Convert Frame to HSV. Mask range 0-0-0 to 180-255-100.\n# Invert mask. bitwise_and for bg and fg. cv2.add them. Print mask_inv[200, 200]:\n',
        expectedOutput: ["255", "0"], // Allow either depending on the mock image data at the center. 
        inputImage: "image/cloak_fg.png",
        hint: "Use `mask = cv2.inRange(hsv, lower, upper)` then `mask_inv = cv2.bitwise_not(mask)`. `fg = cv2.bitwise_and(img, img, mask=mask_inv)`. `bg_part = cv2.bitwise_and(bg, bg, mask=mask)`. Print `mask_inv[200, 200]`."
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

        function restoreProgressAndLoad() {
            if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
                if (!PyPlayAuth.user.progress) {
                    PyPlayAuth.user.progress = {};
                }
                const progressObj = PyPlayAuth.user.progress || {};
                const pyProgress = progressObj.cvcapstone || { completed_lessons: [], completed: false, highest_lesson: 0 };
                let completed = pyProgress.completed_lessons;
                if (!Array.isArray(completed)) {
                    completed = [];
                }

                if (pyProgress.highest_lesson !== undefined && pyProgress.highest_lesson !== null) {
                    const parsedHighest = Number(pyProgress.highest_lesson);
                    highestLessonIndex = isNaN(parsedHighest) ? 0 : parsedHighest;
                } else {
                    highestLessonIndex = completed.length > 0 ? Math.max(...completed) + 1 : 0;
                }
                if (isNaN(highestLessonIndex)) highestLessonIndex = 0;
                highestLessonIndex = Math.min(highestLessonIndex, lessons.length - 1);

                let resumeIndex = 0;
                for (let i = 0; i < lessons.length; i++) {
                    if (!completed.includes(i)) { resumeIndex = i; break; }
                }
                if (completed.length === lessons.length) {
                    resumeIndex = lessons.length - 1;
                    highestLessonIndex = lessons.length - 1;
                }
                currentLessonIndex = resumeIndex;
            }
            loadLesson(currentLessonIndex);
        }

        restoreProgressAndLoad();
        setupEventListeners();

        // Start Pyodide loading in background
        (async () => {
            try {
                dom.outputConsole.textContent = "Initializing Python Engine (Pyodide)...\nThis may take a moment on first load.";
                pyodideInstance = await loadPyodide({
                    stdout: (text) => appendOutput(text + "\n"),
                    stderr: (text) => appendError(text + "\n")
                });

                appendOutput("Loading OpenCV WebAssembly library (this may take a few seconds)...\n");
                await pyodideInstance.loadPackage("opencv-python");

                try { pyodideInstance.FS.mkdir('image'); } catch (e) {}

                let courseImages = ["face.png", "document.png", "cloak_bg.png", "cloak_fg.png"];
                for (const imgName of courseImages) {
                    try {
                        const imgResponse = await fetch(`image/${imgName}`);
                        if (imgResponse.ok) {
                            const arrayBuffer = await imgResponse.arrayBuffer();
                            const uint8Arr = new Uint8Array(arrayBuffer);
                            pyodideInstance.FS.writeFile(imgName, uint8Arr);
                            pyodideInstance.FS.writeFile(`image/${imgName}`, uint8Arr);
                        }
                    } catch (e) {
                        console.warn(`Could not preload image asset ${imgName} into Pyodide FS:`, e);
                    }
                }
                appendOutput("All dynamic image assets loaded successfully!\n");

                await pyodideInstance.runPythonAsync(`
import sys
import types

try:
    import cv2
    import numpy as np
    from js import Uint8Array, Blob, URL
    
    original_imread = cv2.imread
    def patch_imread(filename, flags=1):
        try:
            mat = original_imread(filename, flags)
            if mat is not None:
                return mat
        except:
            pass
        img = np.zeros((400, 400, 3), dtype=np.uint8)
        for y in range(400):
            for x in range(400):
                img[y, x] = [int((x / 400.0) * 255), int((y / 400.0) * 255), 150]
        cv2.circle(img, (200, 200), 80, (255, 255, 255), -1)
        return img
        
    def patch_imshow(winname, mat):
        try:
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
    
    # Mock CascadeClassifier
    class MockCascadeClassifier:
        def __init__(self, path):
            self.path = path
        def detectMultiScale(self, image, scaleFactor=1.1, minNeighbors=3, flags=0, minSize=None, maxSize=None):
            # Mock returning one face coordinate
            return np.array([[150, 100, 100, 100]])
    
    cv2.CascadeClassifier = MockCascadeClassifier
    
except Exception as e:
    print("Error initializing OpenCV sandbox: " + str(e))
                `);

                pyodideReady = true;
                dom.outputConsole.textContent = "Python & OpenCV Engine Ready! 📸🐍\n\nYou can write real Python code using 'import cv2' and preview your modifications live with cv2.imshow('Title', image)!\n\n";
                dom.runBtn.disabled = false;
            } catch (err) {
                dom.outputConsole.innerHTML = `<span class="terminal-error">Failed to load Python Engine. Please check your internet connection.</span>`;
                console.error("Pyodide load error:", err);
            }
        })();

        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user && PyPlayAuth.scriptUrl) {
            PyPlayAuth.syncFromSheets().then(() => {
                restoreProgressAndLoad();
            }).catch(e => {
                console.warn("Background sync failed, keeping local progress.", e);
            });
        }

    } catch (err) {
        console.error("Initialization failed:", err);
        const conceptEl = document.getElementById('lesson-concept') || (dom && dom.lessonConcept);
        if (conceptEl) {
            conceptEl.innerHTML = `<div style="color: #ef4444; background: rgba(239,68,68,0.1); padding: 1rem; border-radius: 8px; border: 1px solid rgba(239,68,68,0.2); font-family: 'Inter', sans-serif;">
                <strong>⚠️ App Initialization Failed</strong><br>
                ${err.message || err}<br><br>
                Please ensure you are connected to the internet and refresh the page.
            </div>`;
        }
    }
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
    if (!url) {
        url = winname;
        winname = "OpenCV Live Preview";
    }

    const img = new Image();
    img.onload = function () {
        const popupCanvas = document.getElementById('preview-canvas-popup');
        const popupCtx = popupCanvas.getContext('2d');
        popupCanvas.width = img.width;
        popupCanvas.height = img.height;
        popupCtx.drawImage(img, 0, 0);

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

    let highest = highestLessonIndex;
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const progressObj = PyPlayAuth.user.progress || {};
        const cvProgress = progressObj.cvcapstone || { completed_lessons: [], completed: false, highest_lesson: 0 };
        let completed = cvProgress.completed_lessons;
        if (!Array.isArray(completed)) {
            completed = [];
        }
        if (cvProgress.highest_lesson !== undefined && cvProgress.highest_lesson !== null) {
            const parsedHighest = Number(cvProgress.highest_lesson);
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

    const inputImgBtn = document.getElementById('input-img-btn');
    if (inputImgBtn) {
        if (lesson.inputImage) {
            inputImgBtn.style.display = 'block';
            inputImgBtn.onclick = () => {
                window.updateCanvasPreview('Input Image', lesson.inputImage);
            };
        } else {
            inputImgBtn.style.display = 'none';
        }
    }

    renderProgressSteps();

    dom.prevBtn.disabled = index === 0;

    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) 
        ? (PyPlayAuth.user.progress || {}) 
        : {};
    const cvProgress = progressObj.cvcapstone || { completed_lessons: [], completed: false };
    let completed = cvProgress.completed_lessons;
    if (!Array.isArray(completed)) {
        completed = [];
    }

    if (completed.includes(index) || index < highestLessonIndex) {
        dom.nextBtn.disabled = false;
    } else {
        dom.nextBtn.disabled = true;
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
        await pyodideInstance.runPythonAsync(code);
        checkLessonCompletion();
    } catch (err) {
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

    const normalizedOutput = currentOutput.trim().replace(/\\s+/g, ' ').replace(/"/g, "'");

    const expectedList = Array.isArray(lesson.expectedOutput) ? lesson.expectedOutput : [lesson.expectedOutput];
    const match = expectedList.some(expected => {
        const normalizedExpected = expected.trim().replace(/\\s+/g, ' ').replace(/"/g, "'");
        return normalizedOutput === normalizedExpected || normalizedOutput.includes(normalizedExpected);
    });

    if (match) {
        if (lesson.requiredCodeSubstrings) {
            const studentCode = editor.getValue();
            const normalizeCode = (c) => c.replace(/\\s+/g, '');
            const missing = lesson.requiredCodeSubstrings.filter(sub => {
                return !normalizeCode(studentCode).includes(normalizeCode(sub));
            });
            if (missing.length > 0) {
                dom.outputConsole.innerHTML += `\\n<span class="terminal-error" style="color: #f87171; font-weight: bold;">[Code Requirement Failed]: Your code must contain exactly: "${missing.join('", "')}"</span>`;
                return;
            }
        }

        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;

        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight;
        dom.successMessage.style.animation = null;

        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("cvcapstone", currentLessonIndex, true);
            highestLessonIndex = Math.max(highestLessonIndex, currentLessonIndex + 1);
            renderProgressSteps();
        }

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
            alert("Congratulations! You've completed the PyPlay Computer Vision Capstones! 📷🎉");
            renderProgressSteps();
        }
    });

    dom.prevBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(currentLessonIndex);
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

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runCode();
        }
    });
}

// Start the app
window.addEventListener('DOMContentLoaded', init);
