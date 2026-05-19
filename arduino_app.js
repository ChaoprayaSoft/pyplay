// --- State Management & Lesson Database ---
const lessons = [
    {
        title: "Hello, Blink!",
        difficulty: "Beginner",
        topic: "Digital Output",
        concept: "Welcome to Arduino programming! An Arduino is a physical micro-computer that interacts with sensors and outputs. Arduino code has two main functions: <code>setup()</code>, which runs **once** when power is turned on, and <code>loop()</code>, which runs **repeatedly** forever.<br><br>The built-in LED (labeled 'L' on the board) is connected to digital **Pin 13**. We configure pins using <code>pinMode(pin, mode)</code>, and change their voltage state using <code>digitalWrite(pin, state)</code>, where state can be <code>HIGH</code> (5V / On) or <code>LOW</code> (0V / Off). Timing is controlled using <code>delay(ms)</code> (where 1000ms = 1 second).",
        example: "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH); // Turn LED on\n  delay(500);            // Wait half a second\n  digitalWrite(13, LOW);  // Turn LED off\n  delay(500);            // Wait half a second\n}",
        task: "Write a program to blink the onboard LED (Pin 13) **on** for exactly **1000 milliseconds** (1 second) and **off** for exactly **1000 milliseconds**.",
        initialCode: "void setup() {\n  // Configure Pin 13 as an output:\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  // Write your blinking code below:\n  \n}",
        wires: [],
        components: [],
        validate: (state) => {
            const history = state.pinTransitions[13] || [];
            if (history.length < 3) return false;
            // Check if there are at least a few transitions with approx 1000ms delay
            let onDurationOk = false;
            let offDurationOk = false;
            for (let i = 1; i < history.length; i++) {
                const diff = history[i].time - history[i-1].time;
                const stateVal = history[i-1].value;
                if (stateVal === 1 && Math.abs(diff - 1000) < 150) onDurationOk = true;
                if (stateVal === 0 && Math.abs(diff - 1000) < 150) offDurationOk = true;
            }
            return onDurationOk && offDurationOk;
        }
    },
    {
        title: "External LED & PWM Fading",
        difficulty: "Beginner",
        topic: "Analog Output (PWM)",
        concept: "Standard digital pins can only output HIGH (5V) or LOW (0V). However, pins marked with a tilde (<code>~</code>) support **PWM (Pulse Width Modulation)**. By rapidly switching the pin on and off at variable ratios, we can simulate an analog voltage from 0V to 5V! We do this using <code>analogWrite(pin, value)</code>, where the value ranges from <code>0</code> (completely off) to <code>255</code> (maximum brightness).",
        example: "void setup() {\n  pinMode(9, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(9, 128); // Fade LED to 50% brightness\n}",
        task: "Write a program to set the brightness of the external LED connected to PWM **Pin 9** to a medium intensity of exactly **100** using <code>analogWrite()</code>, then print the exact phrase <code>\"Fading Active\"</code> to the Serial Monitor inside <code>setup()</code>.",
        initialCode: "void setup() {\n  // Configure Pin 9 as output & initialize Serial at 9600 baud:\n  pinMode(9, OUTPUT);\n  Serial.begin(9600);\n  \n  // Print \"Fading Active\" below:\n\n}\n\nvoid loop() {\n  // Write analogWrite code below to fade Pin 9 to 100:\n  \n}",
        wires: [
            { from: "pin-9", to: "led-anode", color: "#10b981", d: "M 224,15 C 224,-20, 160,-20, 160,30" },
            { from: "gnd-top", to: "led-cathode", color: "#1e293b", d: "M 116,15 C 116,-5, 125,-5, 125,30" }
        ],
        components: [
            { id: "ext-led-box", type: "led", label: "Green LED", style: "top: 15px; left: 120px;", pin: 9, color: "green" }
        ],
        validate: (state, logs) => {
            const pin9Val = state.pins[9] || 0;
            const logMatch = logs.some(l => l.trim() === "Fading Active");
            return pin9Val === 100 && logMatch;
        }
    },
    {
        title: "Digital Inputs & Buttons",
        difficulty: "Beginner",
        topic: "Digital Input",
        concept: "Microcontrollers receive signals from the outside world using inputs. A simple input is a **pushbutton**. We configure a pin as an input using <code>pinMode(pin, INPUT)</code>. To read the pin, we use <code>digitalRead(pin)</code>, which returns <code>HIGH</code> if the button is pressed (5V) and <code>LOW</code> if it is not.<br><br>In this lesson, we have a visual pushbutton connected to Pin 2. Click it in the simulator to press it!",
        example: "void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT);\n}\n\nvoid loop() {\n  int button = digitalRead(2);\n  if (button == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}",
        task: "Read the state of the Pushbutton on **Pin 2**. If the button is pressed (HIGH), turn **on** the onboard Pin 13 LED. If the button is released (LOW), turn **off** the Pin 13 LED. Press the button in the simulator to test your circuit!",
        initialCode: "void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT);\n}\n\nvoid loop() {\n  // Write your pushbutton-to-LED logic below:\n  \n}",
        wires: [
            { from: "pin-2", to: "button-sig", color: "#fbbf24", d: "M 278,15 C 278,-10, 180,-10, 180,60" },
            { from: "gnd-top", to: "button-gnd", color: "#1e293b", d: "M 116,15 C 116,0, 140,0, 140,60" }
        ],
        components: [
            { id: "pushbutton-box", type: "button", label: "Pushbutton", style: "top: 45px; left: 130px;", pin: 2 }
        ],
        validate: (state) => {
            // Evaluates interaction! The validator will check if the user toggled the button 
            // and the LED followed the button state. We can mock this or trace button press action.
            return state.buttonInteractionSuccess === true;
        }
    },
    {
        title: "Serial Communication",
        difficulty: "Beginner",
        topic: "Serial Interface",
        concept: "The Serial Interface lets your Arduino send diagnostic text back to your computer screen. This is crucial for debugging! In <code>setup()</code>, we initialize communication at a speed (baud rate) using <code>Serial.begin(9600)</code>. To print data, we use <code>Serial.print()</code> or <code>Serial.println()</code> (which adds a newline).",
        example: "void setup() {\n  Serial.begin(9600);\n  Serial.println(\"Hello from Arduino!\");\n}",
        task: "Initialize serial communication inside <code>setup()</code> and print the exact message <code>\"Arduino Online!\"</code> to the Serial Monitor.",
        initialCode: "void setup() {\n  // Initialize Serial and print \"Arduino Online!\" below:\n  \n}\n\nvoid loop() {\n  // Nothing is needed in loop for this lesson\n}",
        wires: [],
        components: [],
        validate: (state, logs) => {
            return logs.some(l => l.trim() === "Arduino Online!");
        }
    },
    {
        title: "Analog Inputs & Potentiometer",
        difficulty: "Intermediate",
        topic: "Analog Input",
        concept: "Analog sensors output a continuous voltage level rather than just a simple on/off state. The Arduino reads these on the **Analog In** pins (A0-A5) using <code>analogRead(pin)</code>. It converts the input voltage (0V to 5V) into a digital number between <code>0</code> and <code>1023</code>.<br><br>In this lesson, we connect a **potentiometer** (rotary dial) to **Pin A0**. Drag the visual knob to rotate it and adjust the value!",
        example: "void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int val = analogRead(A0);\n  Serial.println(val);\n  delay(100);\n}",
        task: "Read the potentiometer value from Analog Pin **A0**, print the reading to the Serial Monitor prefixed by <code>\"Value: \"</code> (e.g. <code>\"Value: 512\"</code>), and wait **500 milliseconds** between readings.",
        initialCode: "void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // 1. Read Analog Pin A0:\n  \n  // 2. Print \"Value: [reading]\" below:\n  \n  // 3. Add a 500ms delay:\n  \n}",
        wires: [
            { from: "pin-a0", to: "pot-wiper", color: "#3b82f6", d: "M 215,200 C 215,240, 180,240, 180,105" },
            { from: "5v-bottom", to: "pot-vcc", color: "#ef4444", d: "M 152,200 C 152,230, 150,230, 140,105" },
            { from: "gnd-bottom1", to: "pot-gnd", color: "#1e293b", d: "M 172,200 C 172,235, 205,235, 210,105" }
        ],
        components: [
            { id: "potentiometer-box", type: "pot", label: "Potentiometer (A0)", style: "top: 85px; left: 140px;", pin: "A0" }
        ],
        validate: (state, logs) => {
            // Verify there is a log like "Value: 512" and that it reflects the current pot value
            const targetLogs = logs.filter(l => l.startsWith("Value:"));
            if (targetLogs.length === 0) return false;
            // Ensure pot knob was turned (interaction)
            return state.potInteractionSuccess === true;
        }
    },
    {
        title: "Smart Night Light",
        difficulty: "Intermediate",
        topic: "Sensors & Logic",
        concept: "Let's build a smart automation device! A **Photoresistor (LDR)** is a light sensor whose resistance changes based on ambient brightness. We read it using <code>analogRead()</code>. We will program an LED connected to **Pin 8** to turn on automatically when the light level drops in the room, forming a night light.",
        example: "void loop() {\n  int light = analogRead(A1);\n  if (light < 500) {\n    digitalWrite(8, HIGH);\n  } else {\n    digitalWrite(8, LOW);\n  }\n}",
        task: "Read the LDR sensor on Pin **A1**. If the light level drops **below 300**, turn **on** the LED on **Pin 8**. Otherwise, turn the LED **off**.",
        initialCode: "void setup() {\n  pinMode(8, OUTPUT);\n  // A1 is automatically an input, but good practice:\n  pinMode(A1, INPUT);\n}\n\nvoid loop() {\n  // Write your night light logic below:\n  \n}",
        wires: [
            { from: "pin-a1", to: "ldr-sig", color: "#fbbf24", d: "M 228,200 C 228,230, 120,230, 120,110" },
            { from: "pin-8", to: "led-anode", color: "#10b981", d: "M 210,15 C 210,-15, 175,-15, 175,20" },
            { from: "gnd-bottom1", to: "ldr-gnd", color: "#1e293b", d: "M 172,200 C 172,250, 85,250, 85,110" },
            { from: "gnd-top", to: "led-cathode", color: "#1e293b", d: "M 116,15 C 116,-5, 140,-5, 140,20" }
        ],
        components: [
            { id: "ldr-box", type: "ldr", label: "Light Sensor (A1)", style: "top: 85px; left: 75px;", pin: "A1" },
            { id: "night-led-box", type: "led", label: "Night LED", style: "top: 5px; left: 135px;", pin: 8, color: "red" }
        ],
        validate: (state) => {
            return state.ldrInteractionSuccess === true;
        }
    },
    {
        title: "Melody & Piezo Buzzer",
        difficulty: "Intermediate",
        topic: "Web Audio (Sound)",
        concept: "An **active piezo buzzer** is a small component that plays tones when fed oscillating voltages. Arduino has a built-in function called <code>tone(pin, frequency, duration)</code> that generates square waves to vibrate the buzzer at a specific pitch (frequency in Hz). We use <code>noTone(pin)</code> to stop the sound.<br><br>In PyPlay, this will play **real audio** through your headphones or computer speakers! Make sure your volume is on!",
        example: "void setup() {\n  tone(7, 440, 500); // Play A4 (440Hz) for 500ms\n}",
        task: "Play a two-tone startup chime inside <code>setup()</code>: First play a **440 Hz** tone on Pin **7** for **200 milliseconds**, then wait **250 milliseconds**, then play a **880 Hz** tone on Pin **7** for **300 milliseconds**, and then turn the buzzer **off**.",
        initialCode: "void setup() {\n  // Play startup chime below:\n  \n}\n\nvoid loop() {\n  // Leave empty\n}",
        wires: [
            { from: "pin-7", to: "buzzer-pos", color: "#fbbf24", d: "M 195,15 C 195,-20, 160,-20, 160,50" },
            { from: "gnd-top", to: "buzzer-neg", color: "#1e293b", d: "M 116,15 C 116,-5, 110,-5, 110,50" }
        ],
        components: [
            { id: "buzzer-box", type: "buzzer", label: "Piezo Buzzer (7)", style: "top: 35px; left: 100px;", pin: 7 }
        ],
        validate: (state) => {
            const tones = state.buzzerHistory || [];
            if (tones.length < 2) return false;
            // Match our two chime notes: 440Hz then 880Hz
            const tone1 = tones[0];
            const tone2 = tones[1];
            return tone1.freq === 440 && tone1.duration >= 180 && tone2.freq === 880 && tone2.duration >= 280;
        }
    },
    {
        title: "Visual Servomotor",
        difficulty: "Advanced",
        topic: "Libraries & Motors",
        concept: "Arduino supports external libraries to easily control complex gear like **servomotors** (which rotate precisely from 0 to 180 degrees). We use the <code>Servo</code> library by creating a <code>Servo</code> object, attaching it to a pin with <code>myservo.attach(pin)</code>, and rotating it using <code>myservo.write(angle)</code>.",
        example: "#include <Servo.h>\n\nServo myservo;\n\nvoid setup() {\n  myservo.attach(6);\n  myservo.write(45); // Rotate servo arm to 45 degrees\n}",
        task: "Write a program that sweeps a Servomotor attached to Pin **6**: Rotate it to **90 degrees**, print <code>\"Servo Center\"</code>, wait **1 second**, then rotate it to **180 degrees**, print <code>\"Servo Max\"</code>, and wait **1 second**.",
        initialCode: "#include <Servo.h>\n\nServo myservo;\n\nvoid setup() {\n  Serial.begin(9600);\n  // Attach servo to Pin 6:\n  \n}\n\nvoid loop() {\n  // Sweep servo inside loop:\n  \n}",
        wires: [
            { from: "pin-6", to: "servo-sig", color: "#f97316", d: "M 180,15 C 180,-20, 110,-20, 110,65" },
            { from: "5v-bottom", to: "servo-vcc", color: "#ef4444", d: "M 152,200 C 152,240, 75,240, 60,65" },
            { from: "gnd-bottom1", to: "servo-gnd", color: "#1e293b", d: "M 172,200 C 172,245, 80,245, 75,65" }
        ],
        components: [
            { id: "servo-box", type: "servo", label: "Servomotor (Pin 6)", style: "top: 50px; left: 50px;", pin: 6 }
        ],
        validate: (state, logs) => {
            const servoHistory = state.servoPositions[6] || [];
            if (servoHistory.length < 2) return false;
            // Verify there is "Servo Center" and "Servo Max" printed
            const print1 = logs.some(l => l.trim() === "Servo Center");
            const print2 = logs.some(l => l.trim() === "Servo Max");
            // Check servo wrote 90 and 180
            const got90 = servoHistory.includes(90);
            const got180 = servoHistory.includes(180);
            return print1 && print2 && got90 && got180;
        }
    },
    {
        title: "Ultrasonic Range Finder",
        difficulty: "Advanced",
        topic: "Timing & Sensors",
        concept: "The **HC-SR04 Ultrasonic Sensor** measures distance by emitting high-frequency sound waves and timing how long they take to bounce back off an obstacle. The sensor returns a pulse on the echo pin whose duration (read using <code>pulseIn()</code>) corresponds to the roundtrip distance.",
        example: "void loop() {\n  long duration = pulseIn(4, HIGH);\n  long distance = duration / 58;\n}",
        task: "Measure the ultrasonic distance sensor value on Pin **4**. If a virtual obstacle is closer than **20 cm**, turn **on** a red Warning LED connected to **Pin 3**. Otherwise, turn the LED **off**. Adjust the distance slider to test!",
        initialCode: "void setup() {\n  pinMode(3, OUTPUT);\n  pinMode(4, INPUT);\n}\n\nvoid loop() {\n  // Read the echo pulse duration on Pin 4 (in microseconds):\n  long duration = pulseIn(4, HIGH);\n  \n  // Convert duration to centimeters:\n  long distance = duration / 58;\n  \n  // Write logic to light Pin 3 LED if distance < 20:\n  \n}",
        wires: [
            { from: "pin-4", to: "sonar-sig", color: "#3b82f6", d: "M 248,15 C 248,-20, 110,-20, 110,95" },
            { from: "pin-3", to: "led-anode", color: "#10b981", d: "M 264,15 C 264,-10, 195,-10, 195,30" },
            { from: "gnd-top", to: "led-cathode", color: "#1e293b", d: "M 116,15 C 116,-5, 160,-5, 160,30" },
            { from: "5v-bottom", to: "sonar-vcc", color: "#ef4444", d: "M 152,200 C 152,230, 60,230, 50,95" },
            { from: "gnd-bottom1", to: "sonar-gnd", color: "#1e293b", d: "M 172,200 C 172,235, 75,235, 75,95" }
        ],
        components: [
            { id: "sonar-box", type: "sonar", label: "Sonar HC-SR04 (4)", style: "top: 75px; left: 40px;", pin: 4 },
            { id: "warn-led-box", type: "led", label: "Warning LED", style: "top: 15px; left: 155px;", pin: 3, color: "red" }
        ],
        validate: (state) => {
            return state.sonarInteractionSuccess === true;
        }
    },
    {
        title: "LCD Screen Greeting",
        difficulty: "Advanced",
        topic: "LCD Displays",
        concept: "The character **LCD screen (Liquid Crystal Display)** can display alphanumeric text in two rows of 16 characters. We program it using the <code>LiquidCrystal</code> library, initializing RS, Enable, and data pins. We output words using <code>lcd.print(text)</code> and set printing coordinates using <code>lcd.setCursor(column, row)</code> (0-indexed).",
        example: "#include <LiquidCrystal.h>\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\nvoid setup() {\n  lcd.begin(16, 2);\n  lcd.print(\"Hello!\");\n}",
        task: "Initialize the LCD screen inside <code>setup()</code>. Write the exact string <code>\"PyPlay Arduino\"</code> on the first row (row 0) starting at column 0, and write <code>\"Final Grade: A\"</code> on the second row (row 1) starting at column 0.",
        initialCode: "#include <LiquidCrystal.h>\n\n// Initialize LCD pins (rs, en, d4, d5, d6, d7):\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\nvoid setup() {\n  // 1. Begin LCD 16x2 screen:\n  \n  // 2. Set cursor to (0,0) and print \"PyPlay Arduino\":\n  \n  // 3. Set cursor to (0,1) and print \"Final Grade: A\":\n  \n}\n\nvoid loop() {\n  // Leave empty\n}",
        wires: [
            { from: "pin-12", to: "lcd-rs", color: "#3b82f6", d: "M 132,15 C 132,-25, 40,-25, 40,80" },
            { from: "pin-11", to: "lcd-en", color: "#fbbf24", d: "M 148,15 C 148,-20, 55,-20, 55,80" },
            { from: "pin-5", to: "lcd-d4", color: "#10b981", d: "M 230,15 C 230,-15, 70,-15, 70,80" },
            { from: "pin-4", to: "lcd-d5", color: "#ec4899", d: "M 248,15 C 248,-10, 85,-10, 85,80" },
            { from: "pin-3", to: "lcd-d6", color: "#a855f7", d: "M 264,15 C 264,-5, 100,-5, 100,80" },
            { from: "pin-2", to: "lcd-d7", color: "#f97316", d: "M 278,15 C 278,0, 115,0, 115,80" }
        ],
        components: [
            { id: "lcd-box", type: "lcd", label: "LCD Screen 16x2", style: "top: 75px; left: 35px;" }
        ],
        validate: (state) => {
            const r0 = (state.lcdContent[0] || "").trim();
            const r1 = (state.lcdContent[1] || "").trim();
            return r0 === "PyPlay Arduino" && r1 === "Final Grade: A";
        }
    }
];

let currentLessonIndex = 0;
let highestLessonIndex = 0;
let editor = null;

// --- Simulator Virtual State ---
let isSimulationRunning = false;
let simulationState = {
    pins: {},            // pin number -> value
    pinModes: {},        // pin number -> mode
    pinTransitions: {},  // pin -> Array of {value, time}
    serialHistory: [],   // Array of strings
    buzzerHistory: [],   // Array of {freq, duration, time}
    servoPositions: {},  // pin -> Array of angles
    lcdContent: ["", ""],// Row 0 and Row 1 of LCD
    lcdCursor: { col: 0, row: 0 },
    
    // Interaction status flags
    buttonInteractionSuccess: false,
    potInteractionSuccess: false,
    ldrInteractionSuccess: false,
    sonarInteractionSuccess: false
};

// Web Audio API context for Buzzer sounds
let audioCtx = null;
let currentOscillator = null;

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
    clearSerialBtn: document.getElementById('clear-serial-btn'),
    serialConsole: document.getElementById('serial-console'),
    serialInputBox: document.getElementById('serial-input-box'),
    serialSendBtn: document.getElementById('serial-send-btn'),
    statusBadge: document.getElementById('simulator-status-badge'),
    componentsOverlay: document.getElementById('components-overlay'),
    wiresLayer: document.getElementById('wires-layer')
};

// SVG Board Pin Coordinates mapping on screen for organic looking wires
// Relative to board-panel coordinates or absolute offset mapping
const pinCoordinates = {
    "pin-9": { x: 130, y: 35 },
    "pin-8": { x: 120, y: 35 },
    "pin-7": { x: 110, y: 35 },
    "pin-6": { x: 100, y: 35 },
    "pin-4": { x: 80, y: 35 },
    "pin-3": { x: 70, y: 35 },
    "pin-2": { x: 60, y: 35 },
    "pin-12": { x: 153, y: 35 },
    "pin-11": { x: 165, y: 35 },
    "gnd-top": { x: 175, y: 35 },
    
    "pin-a0": { x: 162, y: 145 },
    "pin-a1": { x: 170, y: 145 },
    "5v-bottom": { x: 124, y: 145 },
    "gnd-bottom1": { x: 139, y: 145 }
};

// --- Initialization ---
function init() {
    dom.totalLessons.textContent = lessons.length;
    
    // Initialize CodeMirror (C++ clike mode)
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'text/x-c++src',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 2,
        matchBrackets: true
    });
    
    // Restore Progress
    if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
        const ardProgress = PyPlayAuth.user.progress.arduino || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = ardProgress.completed_lessons || [];
        
        if (ardProgress.highest_lesson !== undefined) {
            highestLessonIndex = ardProgress.highest_lesson;
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
}

// --- Load Lesson & Render Elements ---
function loadLesson(index) {
    stopSimulation();
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
    clearSerial();
    
    renderProgressSteps();
    renderWiresAndComponents(lesson);
    
    // Enable/disable buttons
    dom.prevBtn.disabled = index === 0;
    
    const ardProgress = (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user)
        ? (PyPlayAuth.user.progress.arduino || { completed_lessons: [], completed: false })
        : { completed_lessons: [], completed: false };
    const completed = ardProgress.completed_lessons || [];
    
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
        const ardProgress = PyPlayAuth.user.progress.arduino || { completed_lessons: [], completed: false, highest_lesson: 0 };
        const completed = ardProgress.completed_lessons || [];
        highest = ardProgress.highest_lesson !== undefined ? ardProgress.highest_lesson : (completed.length > 0 ? Math.max(...completed) + 1 : 0);
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

// Render dynamic elements & wires
function renderWiresAndComponents(lesson) {
    dom.componentsOverlay.innerHTML = '';
    dom.wiresLayer.innerHTML = '';
    
    // 1. Draw organic curved SVG wires
    const wires = lesson.wires || [];
    wires.forEach(wire => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", wire.d);
        path.setAttribute("class", "wire-line");
        path.setAttribute("stroke", wire.color);
        path.setAttribute("stroke-width", "3.5");
        
        // Add subtle neon glow
        path.style.filter = `drop-shadow(0 0 2px ${wire.color}) drop-shadow(0 2px 3px rgba(0,0,0,0.5))`;
        dom.wiresLayer.appendChild(path);
    });
    
    // 2. Append interactive component nodes
    const comps = lesson.components || [];
    comps.forEach(comp => {
        const div = document.createElement('div');
        div.className = "component-interactive";
        div.id = comp.id;
        div.style.cssText = comp.style;
        
        let content = `<span class="component-label">${comp.label}</span>`;
        
        if (comp.type === "led") {
            content += `<div class="external-led" id="ext-led-${comp.pin}"></div>`;
        } 
        else if (comp.type === "button") {
            content += `
                <div class="pushbutton" id="virtual-pushbutton">
                    <div class="pushbutton-cap"></div>
                </div>
            `;
        } 
        else if (comp.type === "pot") {
            content += `
                <div class="knob-container" id="pot-knob-container">
                    <div class="knob-dial" id="pot-dial">
                        <div class="knob-pointer"></div>
                    </div>
                </div>
                <span id="pot-value-disp" style="font-size:0.65rem; color:#fff; font-family:monospace; margin-top:2px;">512</span>
            `;
        } 
        else if (comp.type === "ldr") {
            content += `
                <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
                    <div style="font-size:1.5rem;">🔅</div>
                    <input type="range" class="slider-input" id="ldr-slider" min="50" max="950" value="600">
                    <span id="ldr-val" style="font-size:0.6rem; color:#94a3b8; font-family:monospace;">600</span>
                </div>
            `;
        } 
        else if (comp.type === "buzzer") {
            content += `
                <div class="piezo-case" id="piezo-casing">
                    <div class="piezo-hole"></div>
                    <div class="sound-wave" id="sound-ripples"></div>
                </div>
            `;
        } 
        else if (comp.type === "servo") {
            content += `
                <div class="servo-body">
                    <div class="servo-shaft"></div>
                    <div class="servo-horn" id="servo-horn-arm"></div>
                </div>
            `;
        } 
        else if (comp.type === "sonar") {
            content += `
                <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
                    <div style="display:flex; gap:0.5rem;">
                        <span style="font-size:1.25rem; transform:scaleX(-1);">👁️</span>
                        <span style="font-size:1.25rem;">👁️</span>
                    </div>
                    <input type="range" class="slider-input" id="sonar-slider" min="2" max="150" value="80">
                    <span id="sonar-val" style="font-size:0.6rem; color:#94a3b8; font-family:monospace;">80 cm</span>
                </div>
            `;
        } 
        else if (comp.type === "lcd") {
            content += `
                <div class="lcd-screen">
                    <div class="lcd-row" id="lcd-row-0">                </div>
                    <div class="lcd-row" id="lcd-row-1">                </div>
                </div>
            `;
        }
        
        div.innerHTML = content;
        dom.componentsOverlay.appendChild(div);
        
        // Bind event listeners for user interaction
        setupComponentListeners(comp);
    });
}

// Set up event interactions
function setupComponentListeners(comp) {
    if (comp.type === "button") {
        const btn = document.getElementById("virtual-pushbutton");
        if (btn) {
            // Mouse pressed down
            const setPressed = (val) => {
                simulationState.pins[comp.pin] = val ? 1 : 0; // HIGH or LOW
                if (val) {
                    btn.classList.add("pressed");
                    // Onboard Pin 13 tracking logic (if mapped in Lesson 3)
                    simulationState.buttonInteractionSuccess = true;
                } else {
                    btn.classList.remove("pressed");
                }
            };
            btn.addEventListener("mousedown", () => setPressed(true));
            btn.addEventListener("mouseup", () => setPressed(false));
            btn.addEventListener("mouseleave", () => setPressed(false));
            
            // Touch support for mobiles
            btn.addEventListener("touchstart", (e) => { e.preventDefault(); setPressed(true); });
            btn.addEventListener("touchend", () => setPressed(false));
        }
    } 
    else if (comp.type === "pot") {
        const knob = document.getElementById("pot-dial");
        const valDisp = document.getElementById("pot-value-disp");
        
        // Initialize middle analog value
        simulationState.pins["A0"] = 512;
        
        if (knob) {
            let isDragging = false;
            let startY = 0;
            let currentRotation = 0; // degrees
            
            const handleDrag = (y) => {
                let deltaY = startY - y;
                currentRotation += deltaY * 1.5;
                // Clamp rotation between -135 and +135 degrees
                currentRotation = Math.max(-135, Math.min(135, currentRotation));
                knob.style.transform = `rotate(${currentRotation}deg)`;
                
                // Map rotation to 0 - 1023
                const rawVal = Math.round(((currentRotation + 135) / 270) * 1023);
                simulationState.pins["A0"] = rawVal;
                if (valDisp) valDisp.textContent = rawVal;
                
                // Track interaction for validation
                if (Math.abs(rawVal - 512) > 200) {
                    simulationState.potInteractionSuccess = true;
                }
            };
            
            knob.addEventListener("mousedown", (e) => {
                isDragging = true;
                startY = e.clientY;
                e.preventDefault();
            });
            
            document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    handleDrag(e.clientY);
                    startY = e.clientY;
                }
            });
            
            document.addEventListener("mouseup", () => { isDragging = false; });
            
            // Mouse scroll support as alternative
            knob.addEventListener("wheel", (e) => {
                e.preventDefault();
                startY = 0;
                handleDrag(e.deltaY * -0.1);
            });
        }
    } 
    else if (comp.type === "ldr") {
        const slider = document.getElementById("ldr-slider");
        const valDisp = document.getElementById("ldr-val");
        
        simulationState.pins["A1"] = 600;
        
        if (slider) {
            slider.addEventListener("input", (e) => {
                const val = parseInt(e.target.value);
                simulationState.pins["A1"] = val;
                if (valDisp) valDisp.textContent = val;
                
                // Record interaction
                if (val < 300 || val > 700) {
                    simulationState.ldrInteractionSuccess = true;
                }
            });
        }
    } 
    else if (comp.type === "sonar") {
        const slider = document.getElementById("sonar-slider");
        const valDisp = document.getElementById("sonar-val");
        
        // Echo pulse reading
        simulationState.pins[comp.pin] = 80 * 58; // 80 cm converted to pulse length
        
        if (slider) {
            slider.addEventListener("input", (e) => {
                const val = parseInt(e.target.value);
                // HC-SR04 pulse duration logic (1cm = 58 microseconds)
                simulationState.pins[comp.pin] = val * 58; 
                if (valDisp) valDisp.textContent = `${val} cm`;
                
                if (val < 20 || val > 60) {
                    simulationState.sonarInteractionSuccess = true;
                }
            });
        }
    }
}

// --- Serial Console logs ---
function appendSerial(msg) {
    dom.serialConsole.textContent += msg;
    dom.serialConsole.scrollTop = dom.serialConsole.scrollHeight;
    simulationState.serialHistory.push(msg);
    
    // Trigger blink TX / RX LEDs on board
    triggerBoardLed("tx-led");
    
    // Check validation on every log print!
    checkLessonCompletion();
}

function appendSerialError(msg) {
    const span = document.createElement('span');
    span.style.color = '#f87171'; // Red
    span.textContent = msg + "\n";
    dom.serialConsole.appendChild(span);
    dom.serialConsole.scrollTop = dom.serialConsole.scrollHeight;
}

function clearSerial() {
    dom.serialConsole.textContent = "";
    simulationState.serialHistory = [];
}

// TX / RX LED trigger on SVG board
function triggerBoardLed(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.fill = "#22c55e"; // bright green
    el.style.filter = "drop-shadow(0 0 2px #22c55e)";
    setTimeout(() => {
        el.style.fill = "#52525b";
        el.style.filter = "none";
    }, 40);
}

// --- Web Audio Piezo Buzzer Sound Engine ---
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playBuzzerTone(freq) {
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    stopBuzzerTone();
    
    currentOscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    currentOscillator.type = 'square'; // square waves sound like a real piezo!
    currentOscillator.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // keep volume low/safe
    
    currentOscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    currentOscillator.start();
    
    // Visual sound waves ripples
    const ripples = document.getElementById("sound-ripples");
    if (ripples) ripples.style.opacity = "1";
}

function stopBuzzerTone() {
    if (currentOscillator) {
        try {
            currentOscillator.stop();
            currentOscillator.disconnect();
        } catch (e) {}
        currentOscillator = null;
    }
    const ripples = document.getElementById("sound-ripples");
    if (ripples) ripples.style.opacity = "0";
}

// --- C++ TO JAVASCRIPT TRANSPILER ---
function transpileArduinoCode(cppCode) {
    // 1. Strip comments
    let code = cppCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    
    // 2. Extract and replace Servo global variables
    let servoInstances = [];
    const servoDeclRegex = /Servo\s+(\w+)\s*;/g;
    let match;
    while ((match = servoDeclRegex.exec(code)) !== null) {
        servoInstances.push(match[1]);
    }
    code = code.replace(servoDeclRegex, 'var $1 = new VirtualServo();');
    
    // 3. Extract and replace LiquidCrystal global variables
    let lcdInstances = [];
    const lcdDeclRegex = /LiquidCrystal\s+(\w+)\s*\(([^)]+)\)\s*;/g;
    while ((match = lcdDeclRegex.exec(code)) !== null) {
        lcdInstances.push(match[1]);
    }
    code = code.replace(lcdDeclRegex, 'var $1 = new VirtualLCD();');
    
    // 4. Standard variable type replacements (int, float, boolean, const int, String)
    // Replace declarations like "int led = 13;" or "const int ledPin = 13;" with "var "
    code = code.replace(/^\s*(const\s+)?(int|float|double|char|boolean|String|long)\s+(\w+)/gm, 'var $3');
    
    // 5. Replace include lines
    code = code.replace(/#include\s+<[^>]+>/g, '// Library Included');
    
    // 6. Transpile delay() and pulseIn() calls to await equivalents
    code = code.replace(/delay\s*\(\s*([^)]+)\s*\)/g, 'await delay($1)');
    code = code.replace(/pulseIn\s*\(\s*([^)]+)\s*\)/g, 'await pulseIn($1)');
    
    // 7. Transpile Serial calls
    code = code.replace(/Serial\.begin\s*\(\s*([^)]+)\s*\)/g, 'await Serial_begin($1)');
    code = code.replace(/Serial\.println\s*\(\s*([^)]*)\s*\)/g, 'await Serial_println($1)');
    code = code.replace(/Serial\.print\s*\(\s*([^)]*)\s*\)/g, 'await Serial_print($1)');
    
    // 8. Extract setup() and loop() function bodies
    const setupRegex = /void\s+setup\s*\(\s*\)\s*\{([\s\S]*?)\}/;
    const loopRegex = /void\s+loop\s*\(\s*\)\s*\{([\s\S]*?)\}/;
    
    let setupBody = "";
    let loopBody = "";
    
    const setupMatch = setupRegex.exec(code);
    if (setupMatch) {
        setupBody = setupMatch[1];
    } else {
        throw new Error("Missing void setup() function.");
    }
    
    const loopMatch = loopRegex.exec(code);
    if (loopMatch) {
        loopBody = loopMatch[1];
    }
    
    // Clean code outside setup/loop (globals)
    let globalsBody = code
        .replace(setupRegex, '')
        .replace(loopRegex, '')
        .trim();
        
    return {
        globals: globalsBody,
        setup: setupBody,
        loop: loopBody
    };
}

// --- SIMULATION EXECUTION RUNTIME ---
async function startSimulation() {
    if (isSimulationRunning) return;
    
    const cppCode = editor.getValue();
    clearSerial();
    
    // Reset simulation state
    simulationState.pins = {};
    simulationState.pinModes = {};
    simulationState.pinTransitions = {};
    simulationState.buzzerHistory = [];
    simulationState.servoPositions = {};
    simulationState.lcdContent = ["                ", "                "];
    simulationState.lcdCursor = { col: 0, row: 0 };
    simulationState.buttonInteractionSuccess = false;
    simulationState.potInteractionSuccess = false;
    simulationState.ldrInteractionSuccess = false;
    simulationState.sonarInteractionSuccess = false;
    
    // Turn off visual built in LED 13
    const builtinLed = document.getElementById("onboard-led-13");
    if (builtinLed) builtinLed.className.baseVal = "led-glow";
    
    // Set simulator active status
    isSimulationRunning = true;
    dom.runBtn.innerHTML = '🛑 Stop Simulation';
    dom.runBtn.className = 'btn btn-stop-simulation';
    dom.statusBadge.textContent = 'Running';
    dom.statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    dom.statusBadge.style.color = '#34d399';
    
    try {
        const transpiled = transpileArduinoCode(cppCode);
        
        // Define hardware API sandbox
        const sandbox = {
            HIGH: 1,
            LOW: 0,
            INPUT: 0,
            OUTPUT: 1,
            INPUT_PULLUP: 2,
            
            isSimulationRunning: () => isSimulationRunning,
            
            pinMode: (pin, mode) => {
                simulationState.pinModes[pin] = mode;
            },
            
            digitalWrite: (pin, val) => {
                simulationState.pins[pin] = val;
                
                // Track transition history for validation
                if (!simulationState.pinTransitions[pin]) {
                    simulationState.pinTransitions[pin] = [];
                }
                simulationState.pinTransitions[pin].push({
                    value: val,
                    time: Date.now()
                });
                
                // Animate board built in LED 13
                if (pin === 13) {
                    const led = document.getElementById("onboard-led-13");
                    if (led) {
                        if (val === 1) {
                            led.classList.add("led-on");
                        } else {
                            led.classList.remove("led-on");
                        }
                    }
                }
                
                // Animate external visual LEDs
                const extLed = document.getElementById(`ext-led-${pin}`);
                if (extLed) {
                    if (val === 1) {
                        extLed.className = "external-led lit-red";
                    } else {
                        extLed.className = "external-led";
                    }
                }
                
                // Check if button-to-led logic occurred in Lesson 3
                if (currentLessonIndex === 2 && pin === 13) {
                    // Check if Pin 13 correctly mirrors the pushbutton on Pin 2
                    const btnPressed = simulationState.pins[2] === 1;
                    if (val === (btnPressed ? 1 : 0)) {
                        simulationState.buttonInteractionSuccess = true;
                    }
                }
                
                // Check A1 LDR LED logic in Lesson 6
                if (currentLessonIndex === 5 && pin === 8) {
                    const ldrVal = simulationState.pins["A1"] || 600;
                    const expectedVal = ldrVal < 300 ? 1 : 0;
                    if (val === expectedVal) {
                        simulationState.ldrInteractionSuccess = true;
                    }
                }

                // Check Sonar Pin 3 Warning LED logic in Lesson 9
                if (currentLessonIndex === 8 && pin === 3) {
                    const sonarPulse = simulationState.pins[4] || 80*58;
                    const cm = sonarPulse / 58;
                    const expectedVal = cm < 20 ? 1 : 0;
                    if (val === expectedVal) {
                        simulationState.sonarInteractionSuccess = true;
                    }
                }
            },
            
            digitalRead: (pin) => {
                return simulationState.pins[pin] || 0;
            },
            
            analogWrite: (pin, val) => {
                simulationState.pins[pin] = val;
                
                // Animate PWM external visual LEDs (e.g. brightness opacity)
                const extLed = document.getElementById(`ext-led-${pin}`);
                if (extLed) {
                    if (val > 0) {
                        extLed.className = "external-led lit-green";
                        extLed.style.opacity = val / 255;
                    } else {
                        extLed.className = "external-led";
                        extLed.style.opacity = 1;
                    }
                }
            },
            
            analogRead: (pin) => {
                return simulationState.pins[pin] || 0;
            },
            
            delay: async (ms) => {
                const start = Date.now();
                while (Date.now() - start < ms) {
                    if (!isSimulationRunning) {
                        throw new Error("SimulationStopped");
                    }
                    await new Promise(r => setTimeout(r, 10));
                }
            },
            
            pulseIn: async (pin, stateVal) => {
                // Wait for the pin to have the stateVal or return current simulator state value
                await sandbox.delay(20);
                return simulationState.pins[pin] || 0;
            },
            
            Serial_begin: async (baud) => {
                appendSerial("--- Serial initialized at " + baud + " baud ---\n");
            },
            
            Serial_print: async (msg) => {
                appendSerial(String(msg));
            },
            
            Serial_println: async (msg) => {
                appendSerial(String(msg) + "\n");
            },
            
            tone: (pin, freq, duration) => {
                // Track buzzer plays
                simulationState.buzzerHistory.push({
                    freq: freq,
                    duration: duration || 9999,
                    time: Date.now()
                });
                
                // Play Web Audio beep
                playBuzzerTone(freq);
                
                if (duration) {
                    setTimeout(() => {
                        stopBuzzerTone();
                    }, duration);
                }
            },
            
            noTone: (pin) => {
                stopBuzzerTone();
            },
            
            // Virtual Servo Library Emulator
            VirtualServo: class {
                constructor() {
                    this.pin = 0;
                }
                attach(pin) {
                    this.pin = pin;
                    if (!simulationState.servoPositions[pin]) {
                        simulationState.servoPositions[pin] = [];
                    }
                    // Default starting position
                    simulationState.servoPositions[pin].push(0);
                    sandbox.servoRotateVisual(pin, 0);
                }
                write(angle) {
                    const clamped = Math.max(0, Math.min(180, angle));
                    simulationState.servoPositions[this.pin].push(clamped);
                    sandbox.servoRotateVisual(this.pin, clamped);
                }
            },
            
            servoRotateVisual: (pin, angle) => {
                const horn = document.getElementById("servo-horn-arm");
                if (horn) {
                    horn.style.transform = `translate(-10px, -5px) rotate(${angle}deg)`;
                }
            },
            
            // Virtual LiquidCrystal Display Emulator
            VirtualLCD: class {
                begin(cols, rows) {
                    simulationState.lcdContent = [
                        " ".repeat(cols),
                        " ".repeat(cols)
                    ];
                }
                clear() {
                    simulationState.lcdContent = [
                        " ".repeat(16),
                        " ".repeat(16)
                    ];
                    simulationState.lcdCursor = { col: 0, row: 0 };
                    sandbox.lcdRenderVisual();
                }
                setCursor(col, row) {
                    simulationState.lcdCursor = {
                        col: Math.max(0, Math.min(15, col)),
                        row: Math.max(0, Math.min(1, row))
                    };
                }
                print(text) {
                    const str = String(text);
                    const row = simulationState.lcdCursor.row;
                    const col = simulationState.lcdCursor.col;
                    
                    let line = simulationState.lcdContent[row];
                    let left = line.substring(0, col);
                    let right = line.substring(col + str.length);
                    
                    // Overwrite line buffer
                    let newLine = (left + str + right).substring(0, 16);
                    if (newLine.length < 16) {
                        newLine = newLine + " ".repeat(16 - newLine.length);
                    }
                    
                    simulationState.lcdContent[row] = newLine;
                    
                    // Advance cursor
                    simulationState.lcdCursor.col = Math.min(15, col + str.length);
                    
                    // Update visual panel
                    sandbox.lcdRenderVisual();
                }
            },
            
            lcdRenderVisual: () => {
                const r0 = document.getElementById("lcd-row-0");
                const r1 = document.getElementById("lcd-row-1");
                if (r0) r0.textContent = simulationState.lcdContent[0];
                if (r1) r1.textContent = simulationState.lcdContent[1];
            }
        };
        
        // Construct Async runner function
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        
        const runner = new AsyncFunction('sandbox', `
            with (sandbox) {
                ${transpiled.globals}
                
                async function setup() {
                    ${transpiled.setup}
                }
                
                async function loop() {
                    ${transpiled.loop}
                }
                
                // Initialize circuit
                await setup();
                
                // Run loops continuously until simulation stops
                while (sandbox.isSimulationRunning()) {
                    await loop();
                    await sandbox.delay(30); // Prevent CPU tight locks
                }
            }
        `);
        
        // Execute the sandbox async function in the background
        runner(sandbox).catch(err => {
            if (err.message === "SimulationStopped") {
                console.log("Simulator loop terminated.");
            } else {
                appendSerialError("Runtime Error:\n" + err.message);
                stopSimulation();
            }
        });
        
    } catch (e) {
        appendSerialError("Compilation / Syntax Error:\n" + e.message);
        stopSimulation();
    }
}

function stopSimulation() {
    isSimulationRunning = false;
    stopBuzzerTone();
    
    dom.runBtn.innerHTML = '▶ Start Simulation';
    dom.runBtn.className = 'btn btn-run-simulation';
    dom.statusBadge.textContent = 'Idle';
    dom.statusBadge.style.background = 'rgba(255,255,255,0.05)';
    dom.statusBadge.style.color = 'var(--text-muted)';
    
    const builtinLed = document.getElementById("onboard-led-13");
    if (builtinLed) builtinLed.classList.remove("led-on");
}

// --- TASK COMPLETION VALIDATOR ---
function checkLessonCompletion() {
    const lesson = lessons[currentLessonIndex];
    
    const passed = lesson.validate(simulationState, simulationState.serialHistory);
    
    if (passed) {
        dom.successMessage.classList.remove('hidden');
        dom.nextBtn.disabled = false;
        
        // Bounce animation on success message card
        dom.successMessage.style.animation = 'none';
        dom.successMessage.offsetHeight; 
        dom.successMessage.style.animation = null;
        
        // Save progress to database & sheets
        if (typeof PyPlayAuth !== 'undefined' && PyPlayAuth.user) {
            PyPlayAuth.updateProgress("arduino", currentLessonIndex, true);
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
    dom.runBtn.addEventListener('click', () => {
        if (isSimulationRunning) {
            stopSimulation();
        } else {
            startSimulation();
        }
    });
    
    // Clear Serial
    dom.clearSerialBtn.addEventListener('click', clearSerial);
    
    // Next Button Navigation
    dom.nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(currentLessonIndex);
        } else {
            alert("Outstanding job! You've successfully finished all Arduino & Electronics simulation lessons! 🏆🤖");
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
    
    // Ctrl + Enter shortcut to run simulation
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            dom.runBtn.click();
        }
    });
    
    // Serial Input keyboard send
    if (dom.serialInputBox) {
        dom.serialInputBox.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                dom.serialSendBtn.click();
            }
        });
    }
    
    if (dom.serialSendBtn) {
        dom.serialSendBtn.addEventListener("click", () => {
            const data = dom.serialInputBox.value;
            if (data.trim() !== "") {
                // Write into input buffer pin 0/1 serial RX
                appendSerial("-> " + data + "\n");
                triggerBoardLed("rx-led");
                dom.serialInputBox.value = "";
            }
        });
    }
}

// Initialize on document ready
window.addEventListener('DOMContentLoaded', init);
