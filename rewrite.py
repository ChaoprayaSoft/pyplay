import re

with open('arduino_app.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_pin_coords = """const pinCoordinates = {
    "pin-13": { x: 217, y: 89 },
    "pin-12": { x: 226, y: 89 },
    "pin-11": { x: 235, y: 89 },
    "pin-10": { x: 244, y: 89 },
    "pin-9": { x: 253, y: 89 },
    "pin-8": { x: 263, y: 89 },
    "pin-7": { x: 272, y: 89 },
    "pin-6": { x: 281, y: 89 },
    "pin-5": { x: 290, y: 89 },
    "pin-4": { x: 300, y: 89 },
    "pin-3": { x: 309, y: 89 },
    "pin-2": { x: 318, y: 89 },
    "gnd-top": { x: 208, y: 89 },
    
    "5v-bottom": { x: 235, y: 251 },
    "gnd-bottom1": { x: 246, y: 251 },
    "gnd-bottom2": { x: 256, y: 251 },
    "pin-a0": { x: 278, y: 251 },
    "pin-a1": { x: 289, y: 251 }
};"""

content = re.sub(r'const pinCoordinates = \{[\s\S]*?\};', new_pin_coords, content)

new_render = """function renderWiresAndComponents(lesson) {
    dom.componentsOverlay.innerHTML = '';
    dom.wiresLayer.innerHTML = '';
    
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
        
        if (comp.ports) {
            content += `<div style="display: flex; gap: 12px; margin-top: 8px; width: 100%; justify-content: center;">`;
            comp.ports.forEach(port => {
                content += `<div id="${comp.id}-${port}" style="width: 8px; height: 8px; border-radius: 50%; background: #0f172a; border: 1px solid #334155; box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);"></div>`;
            });
            content += `</div>`;
        }
        
        div.innerHTML = content;
        dom.componentsOverlay.appendChild(div);
        
        setupComponentListeners(comp);
    });
    
    setTimeout(() => {
        const wires = lesson.wires || [];
        const canvasRect = dom.wiresLayer.getBoundingClientRect();
        
        wires.forEach(wire => {
            const startPin = pinCoordinates[wire.from];
            const endEl = document.getElementById(wire.to);
            if (!startPin || !endEl) return;
            
            const endRect = endEl.getBoundingClientRect();
            const endX = endRect.left - canvasRect.left + endRect.width / 2;
            const endY = endRect.top - canvasRect.top + endRect.height / 2;
            
            const startX = startPin.x;
            const startY = startPin.y;
            
            let cp1y = startY - 40; 
            if (startY > 170) cp1y = startY + 40; 
            
            let cp2y = endY + 40;
            if (endY > startY) cp2y = endY - 40;
            
            const d = `M ${startX},${startY} C ${startX},${cp1y} ${endX},${cp2y} ${endX},${endY}`;
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("class", "wire-line");
            path.setAttribute("stroke", wire.color);
            path.setAttribute("stroke-width", "4");
            path.style.fill = "none";
            path.style.strokeLinecap = "round";
            path.style.filter = `drop-shadow(0 0 3px ${wire.color}) drop-shadow(0 3px 5px rgba(0,0,0,0.5))`;
            dom.wiresLayer.appendChild(path);
        });
    }, 50);
}"""

content = re.sub(r'function renderWiresAndComponents\(lesson\) \{.*?\}(?=\n\n// Set up event interactions)', new_render, content, flags=re.DOTALL)

l2 = """wires: [
            { from: "pin-9", to: "ext-led-box-anode", color: "#10b981" },
            { from: "gnd-top", to: "ext-led-box-cathode", color: "#64748b" }
        ],
        components: [
            { id: "ext-led-box", type: "led", label: "Green LED", style: "top: 15px; left: 200px;", pin: 9, color: "green", ports: ["cathode", "anode"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-9"[\s\S]*?\],\s*components: \[[^\]]*\]', l2, content)

l3 = """wires: [
            { from: "pin-2", to: "pushbutton-box-sig", color: "#fbbf24" },
            { from: "gnd-top", to: "pushbutton-box-gnd", color: "#64748b" }
        ],
        components: [
            { id: "pushbutton-box", type: "button", label: "Pushbutton", style: "top: 10px; left: 260px;", pin: 2, ports: ["gnd", "sig"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-2"[\s\S]*?\],\s*components: \[[^\]]*\]', l3, content)

l5 = """wires: [
            { from: "pin-a0", to: "potentiometer-box-sig", color: "#3b82f6" },
            { from: "5v-bottom", to: "potentiometer-box-vcc", color: "#ef4444" },
            { from: "gnd-bottom1", to: "potentiometer-box-gnd", color: "#64748b" }
        ],
        components: [
            { id: "potentiometer-box", type: "pot", label: "Pot (A0)", style: "top: 210px; left: 50px;", pin: "A0", ports: ["gnd", "sig", "vcc"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-a0"[\s\S]*?\],\s*components: \[[^\]]*\]', l5, content)

l6 = """wires: [
            { from: "pin-a1", to: "ldr-box-sig", color: "#fbbf24" },
            { from: "gnd-bottom2", to: "ldr-box-gnd", color: "#64748b" },
            { from: "pin-8", to: "night-led-box-anode", color: "#ef4444" },
            { from: "gnd-top", to: "night-led-box-cathode", color: "#64748b" }
        ],
        components: [
            { id: "ldr-box", type: "ldr", label: "Light Sensor", style: "top: 200px; left: 340px;", pin: "A1", ports: ["gnd", "sig"] },
            { id: "night-led-box", type: "led", label: "Night LED", style: "top: 15px; left: 160px;", pin: 8, color: "red", ports: ["cathode", "anode"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-a1"[\s\S]*?\],\s*components: \[[^\]]*\]', l6, content)

l7 = """wires: [
            { from: "pin-7", to: "buzzer-box-pos", color: "#fbbf24" },
            { from: "gnd-top", to: "buzzer-box-neg", color: "#64748b" }
        ],
        components: [
            { id: "buzzer-box", type: "buzzer", label: "Buzzer (7)", style: "top: 10px; left: 120px;", pin: 7, ports: ["neg", "pos"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-7"[\s\S]*?\],\s*components: \[[^\]]*\]', l7, content)

l8 = """wires: [
            { from: "pin-6", to: "servo-box-sig", color: "#f97316" },
            { from: "5v-bottom", to: "servo-box-vcc", color: "#ef4444" },
            { from: "gnd-bottom1", to: "servo-box-gnd", color: "#64748b" }
        ],
        components: [
            { id: "servo-box", type: "servo", label: "Servo (6)", style: "top: 150px; left: 10px;", pin: 6, ports: ["gnd", "vcc", "sig"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-6"[\s\S]*?\],\s*components: \[[^\]]*\]', l8, content)

l9 = """wires: [
            { from: "pin-4", to: "sonar-box-sig", color: "#3b82f6" },
            { from: "5v-bottom", to: "sonar-box-vcc", color: "#ef4444" },
            { from: "gnd-bottom1", to: "sonar-box-gnd", color: "#64748b" },
            { from: "pin-3", to: "warn-led-box-anode", color: "#ef4444" },
            { from: "gnd-top", to: "warn-led-box-cathode", color: "#64748b" }
        ],
        components: [
            { id: "sonar-box", type: "sonar", label: "Sonar HC-SR04", style: "top: 190px; left: 20px;", pin: 4, ports: ["vcc", "sig", "gnd"] },
            { id: "warn-led-box", type: "led", label: "Warning", style: "top: 10px; left: 320px;", pin: 3, color: "red", ports: ["cathode", "anode"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-4"[\s\S]*?\],\s*components: \[[^\]]*\]', l9, content)

l10 = """wires: [
            { from: "pin-12", to: "lcd-box-rs", color: "#3b82f6" },
            { from: "pin-11", to: "lcd-box-en", color: "#fbbf24" },
            { from: "pin-5", to: "lcd-box-d4", color: "#10b981" },
            { from: "pin-4", to: "lcd-box-d5", color: "#ec4899" },
            { from: "pin-3", to: "lcd-box-d6", color: "#a855f7" },
            { from: "pin-2", to: "lcd-box-d7", color: "#f97316" }
        ],
        components: [
            { id: "lcd-box", type: "lcd", label: "LCD Screen 16x2", style: "top: 5px; left: 50px;", ports: ["rs", "en", "d4", "d5", "d6", "d7"] }
        ]"""
content = re.sub(r'wires: \[\s*\{\s*from: "pin-12"[\s\S]*?\],\s*components: \[[^\]]*\]', l10, content)

with open('arduino_app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Rewrite done")
