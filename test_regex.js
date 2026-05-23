const funcName = 'setup';
const regex = new RegExp(`void\\\\s+${funcName}\\\\s*\\\\(\\\\s*\\\\)\\\\s*\\\\{`);
console.log(regex);

const src = "void setup() {";
console.log("Match:", regex.exec(src));
