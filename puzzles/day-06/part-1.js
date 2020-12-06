const InputReader = require('../../helpers/input-reader');

function getAnswerCount (answers) {
    let answerCount = 0;
    let currentAnswerGroup = {}

    for (let i = 0; i < answers.length; i++) {
        // end of credential fields or EOF
        if (answers[i] === '') {
            currentAnswerGroup = {};
            continue;
        }

        for (let j = 0; j < answers[i].length; j++) {
            if (!(answers[i][j] in currentAnswerGroup)) {
                answerCount = answerCount + 1;
                currentAnswerGroup[answers[i][j]] = true;
            }
        }
    }

    return answerCount;
}

const input = InputReader.getDayReader('6').read();

console.log(getAnswerCount(input));