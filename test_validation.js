const check = (currentOutput, expectedOutput) => {
    const normalizedOutput = currentOutput.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
    const normalizedExpected = expectedOutput.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
    return normalizedOutput === normalizedExpected;
};

console.log('L9:', check('0.0\\n', '0.0'));
console.log('L10:', check('0.5\\n', '0.5'));
console.log('L11:', check('cat\\n\\nsat\\n', 'cat\\nsat'));
console.log('L12:', check('dog\\n', 'dog'));
