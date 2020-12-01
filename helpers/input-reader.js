const fs = require('fs')
const path = require('path')

class InputReader {
    constructor (path) {
        this.path = path;
        this.data = null;
        this.lines = [];
    }

    static getDayReader (day, fileName = 'input') {
        return new InputReader(path.join(__dirname, `../puzzles/day-${day}/${fileName}`))
    }

    read (parser) {
        try {
            this.data = fs.readFileSync(this.path, 'UTF-8');
            this.lines = this.data.split("\r\n");

            if (parser) {
                this.lines = this.lines.map((l) => parser(l))
            }
        } catch (err) {
            console.error(err)
        }

        return this.lines
    }
}

module.exports = InputReader