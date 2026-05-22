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
        expectedOutput: "(400, 400, 3)",
        hint: "Use cv2.imread('image/logo.png') to read the image, store it in a variable (e.g., img), and print its dimensions using print(img.shape)."
    },
    {
        title: "Basic Image Manipulation",
        difficulty: "Intermediate",
        topic: "Manipulation",
        concept: "Images can be cropped using simple NumPy array slicing: <code>roi = img[y1:y2, x1:x2]</code>. Slicing extracts a Region of Interest (ROI). You can resize images using <code>cv2.resize(img, (new_width, new_height))</code>. Slicing coordinate indices are non-inclusive of the end values.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\n# Extract region from y=100 to 300, and x=100 to 300\nroi = img[100:300, 100:300]\nprint(roi.shape)\ncv2.imshow("Crop", roi)',
        task: 'Load `logo.png`, crop a Region of Interest (ROI) containing the center circle from y=120 to 280 and x=120 to 280. Print the shape of the cropped ROI image.',
        initialCode: 'import cv2\n# Crop the image from y: 120 to 280, x: 120 to 280 and print its shape:\n',
        expectedOutput: "(160, 160, 3)",
        hint: "Make sure to load the image first: img = cv2.imread('logo.png'). Crop the region using NumPy array slicing: roi = img[120:280, 120:280] (y range first, then x range). Finally, print(roi.shape)."
    },
    {
        title: "Image Annotation",
        difficulty: "Intermediate",
        topic: "Annotation",
        concept: "OpenCV provides shape drawing utilities that modify the image array in-place. Functions include <code>cv2.line()</code>, <code>cv2.circle()</code>, and <code>cv2.rectangle()</code>. Coordinates are specified as tuples <code>(x, y)</code>, and colors are defined in BGR order (Blue, Green, Red).",
        example: 'import cv2\nimg = cv2.imread("logo.png")\n# Draw a white circle at coordinates (200, 200) with a radius of 80\ncv2.circle(img, (200, 200), 80, (255, 255, 255), -1)\ncv2.imshow("Annotated", img)',
        task: 'Load `logo.png` and draw a solid green square (thickness = -1, which fills the shape) with corner points at top-left `(10, 10)` and bottom-right `(100, 100)`. Use color `(0, 255, 0)` in BGR. Print the color value of the pixel at coordinate `(10, 10)` as a python list: `print(list(img[10, 10]))`.',
        initialCode: 'import cv2\nimg = cv2.imread("logo.png")\n# Draw solid green rectangle from (10, 10) to (100, 100) and print pixel (10, 10) list color:\n',
        expectedOutput: ["[0, 255, 0]", "[np.uint8(0), np.uint8(255), np.uint8(0)]"],
        hint: "Draw the green square on the loaded image using cv2.rectangle(img, (10, 10), (100, 100), (0, 255, 0), -1). Then, print the pixel color list at (10, 10): print(list(img[10, 10]))."
    },
    {
        title: "Image Enhancement",
        difficulty: "Intermediate",
        topic: "Enhancement",
        concept: "Grayscale images represent pixel intensity values between 0 (black) and 255 (white). You can convert color BGR images to grayscale using <code>cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)</code>. To improve contrast across an image, use histogram equalization with <code>cv2.equalizeHist()</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\neq = cv2.equalizeHist(gray)\ncv2.imshow("Grayscale Equalized", eq)',
        task: 'Load `logo.png`, convert it to grayscale, equalize its histogram using `cv2.equalizeHist()`, and print the intensity value of the center pixel at coordinates `(200, 200)`.',
        initialCode: 'import cv2\n# Convert to grayscale, equalize, and print pixel (200, 200) value:\n',
        expectedOutput: ["251", "250"],
        hint: "Convert the loaded image to grayscale using cv2.cvtColor(img, cv2.COLOR_BGR2GRAY). Equalize the grayscale image with eq = cv2.equalizeHist(gray), and print the center value using print(eq[200, 200])."
    },
    {
        title: "Accessing the Camera",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "OpenCV reads video input streams from a camera or a file using the <code>cv2.VideoCapture()</code> class. Pass <code>0</code> as an argument to capture from the default system webcam. You can verify if the capture started correctly using the <code>.isOpened()</code> method.",
        example: 'import cv2\ncap = cv2.VideoCapture(0)\nprint(f"Camera Active: {cap.isOpened()}")\ncap.release()',
        task: 'Initialize the default camera capture interface (`index 0`) using `cv2.VideoCapture()`, and print the boolean result of checking if the camera `isOpened()`.',
        initialCode: 'import cv2\n# Initialize camera capture and print if opened:\n',
        expectedOutput: "True",
        hint: "Initialize the camera capture object using cap = cv2.VideoCapture(0). Then print the status using print(cap.isOpened())."
    },
    {
        title: "Video Writing",
        difficulty: "Intermediate",
        topic: "Video I/O",
        concept: "To save video files, instantiate `cv2.VideoWriter`. To compress video frames, specify a FourCC (Four Character Code) codec like `'MJPG'` or `'XVID'` using <code>cv2.VideoWriter_fourcc(*'MJPG')</code>.",
        example: 'import cv2\nfourcc = cv2.VideoWriter_fourcc(*"MJPG")\nprint(fourcc)',
        task: "Initialize the four-character video codec (FourCC) for the 'MJPG' codec format, and print a check verifying the codec is successfully initialized (e.g. `fourcc > 0`).",
        initialCode: 'import cv2\n# Initialize MJPG fourcc codec and print if successfully generated (value > 0):\n',
        expectedOutput: "True",
        hint: "Use fourcc = cv2.VideoWriter_fourcc(*'MJPG') to initialize the codec. Then print a comparison to check if the value is greater than 0: print(fourcc > 0)."
    },
    {
        title: "Image Filtering",
        difficulty: "Intermediate",
        topic: "Filtering",
        concept: "Filtering modifies pixels based on local neighborhoods. You can blur images to reduce noise using Gaussian Blur with <code>cv2.GaussianBlur(img, (kernel_width, kernel_height), sigmaX)</code>. The kernel dimensions must be odd numbers.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\nblurred = cv2.GaussianBlur(img, (5, 5), 0)\ncv2.imshow("Gaussian Blur", blurred)',
        task: 'Load `logo.png`, apply a Gaussian Blur filter with a kernel size of `(5, 5)` and sigma `0`, and print the shape of the resulting blurred image.',
        initialCode: 'import cv2\n# Load logo, apply Gaussian Blur with 5x5 kernel and print shape:\n',
        expectedOutput: "(400, 400, 3)",
        hint: "Apply the blur with blurred = cv2.GaussianBlur(img, (5, 5), 0) on the loaded image. Then print its shape using print(blurred.shape)."
    },
    {
        title: "Image Features and Alignment",
        difficulty: "Advanced",
        topic: "Features",
        concept: "Feature detection finds unique points (keypoints) in images. ORB (Oriented FAST and Rotated BRIEF) is an open-source, patent-free alternative to SIFT and SURF. Create ORB detectors using <code>cv2.ORB_create()</code> and locate features using <code>detector.detect(img, None)</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\norb = cv2.ORB_create()\nkp = orb.detect(img, None)\nprint(f"Features: {len(kp)}")',
        task: 'Load `logo.png`, instantiate a standard ORB detector using `cv2.ORB_create()`, detect keypoints on the image, and print if at least one keypoint was detected (e.g., `print(len(kp) > 0)`).',
        initialCode: 'import cv2\n# Create ORB, detect features, and print if keypoint length is > 0:\n',
        expectedOutput: "True",
        hint: "Instantiate ORB using orb = cv2.ORB_create() and detect keypoints with kp = orb.detect(img, None). Then check the keypoints list length and print the result: print(len(kp) > 0)."
    },
    {
        title: "Canny Edge Detection",
        difficulty: "Advanced",
        topic: "Edge Detection",
        concept: "Edge detection highlights boundaries in an image by analyzing intensity gradients. The Canny edge detector is a popular multi-stage algorithm. In OpenCV, use <code>cv2.Canny(gray, threshold1, threshold2)</code>. Smoothing the image first with a Gaussian Blur helps reduce high-frequency noise and prevents false edges.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nblurred = cv2.GaussianBlur(gray, (5, 5), 0)\nedges = cv2.Canny(blurred, 50, 150)\ncv2.imshow("Edges", edges)',
        task: 'Load `logo.png`, convert it to grayscale, and apply a Gaussian Blur filter with a kernel size of `(5, 5)` and sigma `0`. Run Canny edge detection with threshold parameters `100` and `200`. Count the total number of white edge pixels using `cv2.countNonZero(edges)`. Divide the count by `100` and print the resulting integer value using integer division (`// 100`).',
        initialCode: 'import cv2\n# Load logo.png, grayscale, blur, Canny (100, 200), and print (non-zero count // 100):\n',
        expectedOutput: ["59", "58", "60"],
        hint: "Convert to grayscale: gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY). Apply Gaussian Blur: blurred = cv2.GaussianBlur(gray, (5, 5), 0). Run Canny: edges = cv2.Canny(blurred, 100, 200). Print: print(cv2.countNonZero(edges) // 100)."
    },
    {
        title: "Image Thresholding and Contour Detection",
        difficulty: "Advanced",
        topic: "Contours",
        concept: "Contours are curves joining all continuous points along a boundary with the same color or intensity. To find contours, we first convert the image to binary (thresholding) using <code>cv2.threshold()</code>. Then we find contours using <code>cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)\ncontours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\nprint(len(contours))',
        task: 'Load `logo.png`, convert it to grayscale, and apply binary thresholding using `cv2.threshold()` with a threshold value of `127` and a max value of `255` (use `cv2.THRESH_BINARY`). Find the contours using `cv2.RETR_EXTERNAL` retrieval mode and `cv2.CHAIN_APPROX_SIMPLE` approximation method, and print the number of outer contours detected.',
        initialCode: 'import cv2\n# Load logo.png, grayscale, threshold at 127, find RETR_EXTERNAL contours, and print their count:\n',
        expectedOutput: "1",
        hint: "Load, grayscale, and threshold: _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY). Find contours: contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE). Print count: print(len(contours))."
    },
    {
        title: "Color Space Segmentation (HSV Masking)",
        difficulty: "Advanced",
        topic: "Color Segmentation",
        concept: "In RGB/BGR color spaces, color values depend on illumination. The HSV (Hue, Saturation, Value) color space is much better for color segmentation. We convert using <code>cv2.cvtColor(img, cv2.COLOR_BGR2HSV)</code> and create a binary mask for pixels within a range using <code>cv2.inRange(hsv, lower_bound, upper_bound)</code>.",
        example: 'import cv2\nimport numpy as np\nimg = cv2.imread("logo.png")\nhsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)\nmask = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))\ncv2.imshow("Red Color Mask", mask)',
        task: 'Load `logo.png`, convert it to the HSV color space, and create a mask segmenting dark/shadow pixels. Use lower bound `np.array([0, 0, 0])` and upper bound `np.array([180, 255, 100])` to isolate these pixels. Count the non-zero pixels in the binary mask, divide it by `100`, and print the resulting integer using integer division (`// 100`).',
        initialCode: 'import cv2\nimport numpy as np\n# Load logo.png, convert to HSV, apply inRange mask, and print (non-zero count // 100):\n',
        expectedOutput: ["110", "109", "111"],
        hint: "Convert using hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV). Create the mask: mask = cv2.inRange(hsv, np.array([0, 0, 0]), np.array([180, 255, 100])). Print: print(cv2.countNonZero(mask) // 100)."
    },
    {
        title: "Morphological Operations (Dilation and Erosion)",
        difficulty: "Advanced",
        topic: "Morphology",
        concept: "Morphological operations are simple operations based on image shape, applied to binary images. Erosion shrinks white regions (removes white noise), and dilation expands them. We define a kernel using <code>np.ones((height, width), np.uint8)</code> and apply them using <code>cv2.erode(img, kernel, iterations)</code> or <code>cv2.dilate(img, kernel, iterations)</code>.",
        example: 'import cv2\nimport numpy as np\nimg = cv2.imread("logo.png")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)\nkernel = np.ones((5, 5), np.uint8)\neroded = cv2.erode(thresh, kernel, iterations=1)\ncv2.imshow("Eroded", eroded)',
        task: 'Load `logo.png`, convert it to grayscale, and perform binary thresholding with threshold value `127` and max value `255`. Define a `5x5` rectangular structuring kernel of type `np.uint8` using `np.ones((5, 5), np.uint8)`. Apply an erosion operation followed by a dilation operation with `1` iteration each. Print the total number of non-zero pixels in the final image divided by `1000` using integer division (`// 1000`).',
        initialCode: 'import cv2\nimport numpy as np\n# Load, threshold at 127, define a 5x5 np.uint8 kernel, erode then dilate, and print (non-zero count // 1000):\n',
        expectedOutput: ["137", "136", "138"],
        hint: "Perform erosion and dilation with kernel = np.ones((5, 5), np.uint8). Run: eroded = cv2.erode(thresh, kernel, iterations=1) then dilated = cv2.dilate(eroded, kernel, iterations=1). Print: print(cv2.countNonZero(dilated) // 1000)."
    },
    {
        title: "Geometric Transformations (Image Rotation)",
        difficulty: "Advanced",
        topic: "Transformations",
        concept: "Affine transformations preserve parallel lines. Image rotation is achieved by generating a 2D rotation matrix using <code>cv2.getRotationMatrix2D(center, angle, scale)</code> and applying it with <code>cv2.warpAffine(img, M, (width, height))</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\n(h, w) = img.shape[:2]\nM = cv2.getRotationMatrix2D((w//2, h//2), 30, 1.0)\nrotated = cv2.warpAffine(img, M, (w, h))\ncv2.imshow("Rotated", rotated)',
        task: 'Load `logo.png` and calculate the center of the image. Compute the rotation matrix to rotate the image by `45` degrees counter-clockwise around its center point with a scale factor of `1.0`. Apply the rotation using `cv2.warpAffine` keeping the original size. Print the rotated center pixel BGR color value as a list of integers: `print([int(x) for x in rotated[200, 200]])`.',
        initialCode: 'import cv2\n# Load logo.png, rotate around center by 45 degrees, warp, and print BGR pixel list at (200, 200):\n',
        expectedOutput: "[126, 237, 255]",
        requiredCodeSubstrings: ["M = cv2.getRotationMatrix2D((w//2, h//2), 45, 1.0)"],
        hint: "Get image shape to compute center (w//2, h//2). Compute rotation matrix: M = cv2.getRotationMatrix2D(center, 45, 1.0). Apply warp: rotated = cv2.warpAffine(img, M, (w, h)). Print the color at index [200, 200]: print([int(x) for x in rotated[200, 200]])."
    },
    {
        title: "Template Matching",
        difficulty: "Advanced",
        topic: "Template Matching",
        concept: "Template matching searches for a template image inside a larger source image. We slide the template over the source and compare them using <code>cv2.matchTemplate(source, template, method)</code>. We get the location of the best match using <code>cv2.minMaxLoc(result)</code>.",
        example: 'import cv2\nimg = cv2.imread("logo.png")\ntemplate = img[100:200, 100:200]\nres = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)\nmin_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)\nprint(max_loc)',
        task: 'Load the source image `logo.png`. Crop a template region representing a portion of the logo from y=`150` to `250` and x=`150` to `250`. Run `cv2.matchTemplate` with the source image, the cropped template, and the `cv2.TM_CCOEFF_NORMED` method. Locate the maximum coefficient position using `cv2.minMaxLoc()`, and print the top-left coordinate `(x, y)` of the best matching location.',
        initialCode: 'import cv2\n# Load logo.png, crop template from y:150-250, x:150-250, run matchTemplate, find best match, and print (x, y) location:\n',
        expectedOutput: ["(150, 150)", "(150,150)"],
        hint: "Crop the template: template = img[150:250, 150:250]. Match template: res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED). Find location: min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res). Print max_loc: print(max_loc)."
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

        // --- Step 1: Restore progress from LOCAL STORAGE immediately (no network) ---
        function restoreProgressAndLoad() {
            if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
                if (!PyPlayAuth.user.progress) {
                    PyPlayAuth.user.progress = {};
                }
                const progressObj = PyPlayAuth.user.progress || {};
                const pyProgress = progressObj.opencv || { completed_lessons: [], completed: false, highest_lesson: 0 };
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

        // Load lesson from local progress immediately
        restoreProgressAndLoad();

        // Set up event listeners right away so buttons work
        setupEventListeners();

        // --- Step 2: Start Pyodide loading in background ---
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
                            .map(href => { try { return decodeURIComponent(href); } catch (e) { return href; } })
                            .filter(href => href && /\.(png|jpg|jpeg|bmp)$/i.test(href))
                            .map(href => href.substring(href.lastIndexOf('/') + 1));
                        if (links.length > 0) courseImages = [...new Set(links)];
                    }
                } catch (e) {
                    console.warn("Could not dynamically parse image/ directory index, using Fallbacks:", e);
                }

                for (const imgName of courseImages) {
                    try {
                        appendOutput(`Preloading course image: ${imgName}...\n`);
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
        cv2.putText(img, "PyPlay Live", (110, 210), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
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
    
    class MockVideoCapture:
        def __init__(self, *args, **kwargs): pass
        def isOpened(self): return True
        def read(self): return True, patch_imread("logo.png")
        def release(self): pass
    cv2.VideoCapture = MockVideoCapture
    
    if not hasattr(cv2, 'Stitcher_create'):
        cv2.Stitcher_create = lambda: type('MockStitcher', (), {})()
    if not hasattr(cv2, 'createMergeMertens'):
        cv2.createMergeMertens = lambda: type('MockMergeMertens', (), {})()
    if not hasattr(cv2, 'TrackerCSRT_create'):
        cv2.TrackerCSRT_create = lambda: type('MockTrackerCSRT', (), {})()
    if not hasattr(cv2, 'CascadeClassifier'):
        cv2.CascadeClassifier = type('MockCascadeClassifier', (), {})
    if not hasattr(cv2, 'dnn'):
        class MockDNN:
            def readNetFromTensorflow(self, *args): return None
            def blobFromImage(self, img, *args): return np.zeros((1, 3, 224, 224))
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
                console.error("Pyodide load error:", err);
            }
        })();

        // --- Step 3: Sync from Google Sheets in background, then refresh lesson/progress ---
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
        const progressObj = PyPlayAuth.user.progress || {};
        const cvProgress = progressObj.opencv || { completed_lessons: [], completed: false, highest_lesson: 0 };
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

    // Populate and reset hint element
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

    // Update progress steps UI
    renderProgressSteps();

    // Update buttons
    dom.prevBtn.disabled = index === 0;

    // Enable "Next" button if lesson has already been completed/passed in the past
    const progressObj = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) 
        ? (PyPlayAuth.user.progress || {}) 
        : {};
    const cvProgress = progressObj.opencv || { completed_lessons: [], completed: false };
    let completed = cvProgress.completed_lessons;
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

    const expectedList = Array.isArray(lesson.expectedOutput) ? lesson.expectedOutput : [lesson.expectedOutput];
    const match = expectedList.some(expected => {
        const normalizedExpected = expected.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
        return normalizedOutput === normalizedExpected;
    });

    if (match) {
        // Check code requirements if specified (case & space insensitive check)
        if (lesson.requiredCodeSubstrings) {
            const studentCode = editor.getValue();
            const normalizeCode = (c) => c.replace(/\s+/g, '');
            const missing = lesson.requiredCodeSubstrings.filter(sub => {
                return !normalizeCode(studentCode).includes(normalizeCode(sub));
            });
            if (missing.length > 0) {
                dom.outputConsole.innerHTML += `\n<span class="terminal-error" style="color: #f87171; font-weight: bold;">[Code Requirement Failed]: Your code must contain exactly: "${missing.join('", "')}"</span>`;
                return;
            }
        }

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

    // Toggle Hint Button
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

    // Command/Ctrl + Enter to run
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runCode();
        }
    });
}

// Start the app
window.addEventListener('DOMContentLoaded', init);
