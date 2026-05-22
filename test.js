const cppCode = `void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT);
}
void loop() {
  // Write your pushbutton-to-LED logic below:
  void loop() {
  int button = digitalRead(2);
  if (button == HIGH) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}`;

function transpileArduinoCode(cppCode) {
    let code = cppCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    
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

console.log("Transpiled:");
const t = transpileArduinoCode(cppCode);
console.log(t);

try {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const runner = new AsyncFunction('sandbox', `
        with (sandbox) {
            ${t.globals}
            
            async function setup() {
                ${t.setup}
            }
            
            async function loop() {
                ${t.loop}
            }
        }
    `);
    console.log("AsyncFunction created successfully");
} catch(e) {
    console.log("Error creating AsyncFunction:");
    console.log(e.toString());
}
