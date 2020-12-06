const InputReader = require('../../helpers/input-reader');

function isValidCredential (requiredFields, credential) {
    // returns false if any required field is not a key in credential
    return !requiredFields.some((field) => {
        return !(field in credential)
    })
}

function countValidCredentials (requiredFields, credentials) {
    let validCredentials = 0;
    let currentCredential = {}

    for (let i = 0; i < credentials.length; i++) {
        // end of credential fields or EOF
        if (credentials[i] === '') {
            if (isValidCredential(requiredFields, currentCredential)) {
                validCredentials = validCredentials + 1;
            }

            currentCredential = {}
            continue;
        }

        credentials[i].split(' ').forEach((field) => {
            const [key, value] = field.split(':')

            currentCredential[key] = value
        });
    }

    return validCredentials;
}

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const input = InputReader.getDayReader('4').read();

console.log(countValidCredentials(REQUIRED_FIELDS, input));