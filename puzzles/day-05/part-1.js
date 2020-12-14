const InputReader = require('../../helpers/input-reader')

function parseBinaryId (trully, id) {
  /* iterate over the letters of the id accumulating the value
     * provided by the bitwise operation, such as:
     * F - F - F - F - B
     * 0 - 0 - 0 - 0 - 1 <<<<< 1
     *
     * F - F - B - F - B
     * 0 - 0 - 4 - 0 - 1 <<<<< 5
     */
  return id.split('').reduce((acc, cur, i) => {
    // skip letters that are not active bit positions
    if (cur !== trully) {
      return acc
    }

    // bitwise move 1 by i - 1 positions to the left
    return acc + (1 << (id.length - i - 1))
  }, 0)
}

function getSeatId (rowDigits, colDigits, id) {
  const rowId = parseBinaryId('B', id.substring(0, rowDigits))
  const colId = parseBinaryId('R', id.substring(rowDigits, rowDigits + colDigits))

  return rowId * 8 + colId
}

function getHighestSeatId (rowDigits, colDigits, ids) {
  return ids.reduce((acc, cur) => {
    return Math.max(acc, getSeatId(rowDigits, colDigits, cur))
  }, -1)
}

const ROW_DIGITS = Math.log2(128)
const COL_DIGITS = Math.log2(8)
const input = InputReader.getDayReader('5').read()

console.log(getHighestSeatId(ROW_DIGITS, COL_DIGITS, input))
