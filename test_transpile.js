function transpileMATLABCode(mCode) {
    const rawCode = mCode;
    let code = mCode.replace(/%.*$/gm, ''); // Strip MATLAB comments
    let lines = code.split('\n');
    let result = [];
    let symVars = new Set(); // Track symbolic variable names

    const cmds = ['tf', 'laplace', 'limit', 'step', 'pzmap', 'rlocus', 'bode', 'pid', 'feedback', 'dcgain', 'pole'];
    const cmdPattern = new RegExp(`^(${cmds.join('|')})$`);

    for (let line of lines) {
        let t = line.trim().replace(/;\s*$/, '').trim();
        if (!t) { result.push(''); continue; }

        let symsM = t.match(/^syms\s+(.+)$/);
        if (symsM) {
            symsM[1].split(/\s+/).forEach(v => symVars.add(v));
            result.push(symsM[1].split(/\s+/).map(v => `var ${v} = "${v}";`).join('\n'));
            continue;
        }

        let dispM = t.match(/^disp\s*\(\s*(.+?)\s*\)$/);
        if (dispM) {
            result.push(`await sandbox.print(${dispM[1]});`);
            continue;
        }

        let aCmdM = t.match(new RegExp(`^([a-zA-Z_]\\w*)\\s*=\\s*(${cmds.join('|')})\\s*\\((.*)\\)$`));
        if (aCmdM) {
            let [, varName, cmd, rawArgs] = aCmdM;
            result.push(`var ${varName} = await sandbox.${cmd}(${rawArgs});`);
            if (!['dcgain', 'pole', 'limit'].includes(cmd)) {
                symVars.add(varName);
            }
            continue;
        }

        let sCmdM = t.match(new RegExp(`^(${cmds.join('|')})\\s*\\((.*)\\)$`));
        if (sCmdM) {
            result.push(`await sandbox.${sCmdM[1]}(${sCmdM[2]});`);
            continue;
        }

        let aM = t.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (aM) {
            let varName = aM[1];
            let rhs = aM[2].trim();
            let containsSym = [...symVars].some(sv => new RegExp(`\\b${sv}\\b`).test(rhs));
            if (containsSym) {
                result.push(`var ${varName} = "${rhs.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}";`);
                symVars.add(varName);
            } else {
                result.push(`var ${varName} = ${rhs};`);
            }
            continue;
        }

        result.push(t + ';');
    }
    return result.join('\n');
}

async function test() {
    const mCode = `syms t\nf = exp(-2*t);\n\n% Find Laplace transform and display it:\nF = laplace(f)\ndisp(F)`;
    const transpiled = transpileMATLABCode(mCode);
    console.log("Transpiled Code:\n" + transpiled);

    const sandbox = {
        _rawCode: mCode,
        print: async (msg) => { console.log("PRINT:", msg); },
        laplace: async (f) => {
            const raw = sandbox._rawCode;
            if (raw.includes('exp(-2*t)')) return '1/(s + 2)';
            return 'other';
        }
    };
    
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const execFn = new AsyncFunction('sandbox', transpiled);
    await execFn(sandbox);
}
test();
