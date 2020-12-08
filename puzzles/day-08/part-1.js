const InputReader = require('../../helpers/input-reader');

function  getBeforeLoopValue(instructions) {
    let accumulatedValue = 0;
    let currentLine = 0;
    let visitedLines = new Set();

    do {
        let currentInstruction = instructions[currentLine];

        visitedLines.add(currentLine)

        if (currentInstruction[0] === 'jmp') {
            currentLine = currentLine + currentInstruction[1]
        } else {
            if (currentInstruction[0] === 'acc') {
                    accumulatedValue = accumulatedValue + currentInstruction[1]
            }

            currentLine = currentLine + 1;
        }

    } while (!visitedLines.has(currentLine));

    return accumulatedValue;
}

const input = InputReader.getDayReader('8').read((val) => {
    let tokens = val.split(' ');

    return [tokens[0], parseInt(tokens[1])];
});

console.log(getBeforeLoopValue(input));