const fs = require('fs');

const appFiles = fs.readdirSync('.').filter(f => f.endsWith('_app.js') && f !== 'admin_app.js');

appFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    try {
        // Find the lessons array text.
        const match = content.match(/const\s+lessons\s*=\s*(\[[\s\S]*?\n\]);/);
        if (!match) {
            console.log(`[${file}] Could not find 'const lessons = [...];'`);
            return;
        }
        
        let lessonsText = match[1];
        
        // This is extremely hacky but evaluating it directly might throw ReferenceErrors if there are un-evaluable things.
        // We can just wrap it in a function.
        // We will mock validate parameters.
        const evalFunc = new Function(`
            let logicState = {};
            let simState = {};
            let simCanvas = {width: 800, height: 600};
            return ${lessonsText};
        `);
        
        const lessons = evalFunc();
        
        console.log(`\n--- [${file}] ${lessons.length} lessons ---`);
        let hasError = false;
        lessons.forEach((l, i) => {
            const hasValidate = typeof l.validate === 'function';
            const hasExpectedOutput = l.expectedOutput !== undefined && l.expectedOutput !== null;
            
            if (!hasValidate && !hasExpectedOutput) {
                console.log(`  Lesson ${i+1} (${l.title}) has NO validate function AND NO expectedOutput!`);
                hasError = true;
            }
            
            // Check if validate function blindly returns false
            if (hasValidate) {
                const valStr = l.validate.toString();
                if (valStr.includes('return false') && !valStr.includes('return true') && valStr.length < 50) {
                    // console.log(`  Lesson ${i+1} might blindly return false: ${valStr}`);
                }
            }
        });
        
        if (!hasError) {
            console.log(`  All lessons have a way to be validated.`);
        }
        
    } catch (e) {
        console.log(`\n--- [${file}] ---`);
        console.log(`  Error parsing:`, e.message);
    }
});
