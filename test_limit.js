async function test() {
    const sandbox = {
        _rawCode: "syms s\nF = 15 / (s * (s + 5));\n% Calculate final value using the limit theorem\nans = limit(s*F, s, 0);\ndisp(ans)"
    };
    
    let expr = NaN;
    let v = "s";
    let val = 0;
    
    let sVal = (val == 0) ? '1e-8' : String(val); // Approximate limit
    let raw = sandbox._rawCode;
    
    // Extract the exact expression passed to limit() from the raw code
    let m = raw.match(/limit\s*\(\s*(.*?)\s*,/);
    let targetExpr = m ? m[1] : (typeof expr === 'string' ? expr : '');
    
    console.log("targetExpr before:", targetExpr);
    
    if (!targetExpr) {
        console.log("no targetExpr, returning 1");
        return 1;
    }
    
    // Resolve any variables (like F or G) that were defined earlier in the code
    let lines = raw.split('\n');
    for (let line of lines) {
        let aMatch = line.trim().match(/^([a-zA-Z_]\w*)\s*=\s*(.+?);?$/);
        if (aMatch && targetExpr.includes(aMatch[1])) {
            // Replace variable with its definition wrapped in parens
            let regex = new RegExp(`\\b${aMatch[1]}\\b`, 'g');
            targetExpr = targetExpr.replace(regex, `(${aMatch[2]})`);
        }
    }
    
    console.log("targetExpr after:", targetExpr);
    
    try {
        let toEval = targetExpr.replace(/\bs\b/g, sVal).replace(/\^/g, '**');
        console.log("toEval:", toEval);
        let res = eval(toEval);
        console.log("result:", Math.round(res * 1000) / 1000);
        return Math.round(res * 1000) / 1000;
    } catch(e) {
        console.log("Error:", e);
        return 1;
    }
}
test();
