const InputReader = require('../../helpers/input-reader')

class Grid {
  constructor (grid = {}) {
    this.grid = grid
    this.gridBounds = {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 },
      z: { min: 0, max: 0 }
    }
  }

  iterate () {
    const newGrid = new Grid(this.cloneGrid())

    for (let i = this.gridBounds.x.min - 1; i <= this.gridBounds.x.max + 1; i++) {
      for (let j = this.gridBounds.y.min - 1; j <= this.gridBounds.y.max + 1; j++) {
        for (let k = this.gridBounds.z.min - 1; k <= this.gridBounds.z.max + 1; k++) {
          const currentCell = this.getValue(i, j, k)
          const neighbours = this.getNeighbours(i, j, k)
          const activeNeighbours = neighbours.reduce((acc, cur) => {
            if (cur === '#') {
              return acc + 1
            }

            return acc
          }, 0)

          if (currentCell === '#') {
            if (activeNeighbours !== 2 && activeNeighbours !== 3) {
              newGrid.setValue(i, j, k, '.')
              continue
            }
          } else {
            if (activeNeighbours === 3) {
              newGrid.setValue(i, j, k, '#')
              continue
            }
          }

          newGrid.setValue(i, j, k, currentCell)
        }
      }
    }

    this.grid = newGrid.grid
    this.gridBounds = newGrid.gridBounds
  }

  getValue (x, y, z, fallback = '.') {
    return ((this.grid[x] || {})[y] || {})[z] || fallback
  }

  forEach (callback) {
    for (let i = this.gridBounds.x.min; i <= this.gridBounds.x.max; i++) {
      for (let j = this.gridBounds.y.min; j <= this.gridBounds.y.max; j++) {
        for (let k = this.gridBounds.z.min; k <= this.gridBounds.z.max; k++) {
          callback(this.getValue(i, j, k), i, j, k)
        }
      }
    }
  }

  countActiveCells () {
    let activeCells = 0

    this.forEach((val) => {
      if (val === '#') {
        activeCells = activeCells + 1
      }
    })

    return activeCells
  }

  getNeighbours (x, y, z) {
    const neighbours = []

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (i === 0 && j === 0 && k === 0) {
            // skip self
            continue
          }

          neighbours.push(this.getValue(x + i, y + j, z + k))
        }
      }
    }

    return neighbours
  }

  setValue (x, y, z, val) {
    if (!(x in this.grid)) {
      this.grid[x] = {}
    }

    if (!(y in this.grid[x])) {
      this.grid[x][y] = {}
    }

    this.grid[x][y][z] = val
    this.updateGridBounds(x, y, z)
  }

  updateGridBounds (x, y, z) {
    this.gridBounds.x.min = Math.min(this.gridBounds.x.min, x)
    this.gridBounds.y.min = Math.min(this.gridBounds.y.min, y)
    this.gridBounds.z.min = Math.min(this.gridBounds.z.min, z)
    this.gridBounds.x.max = Math.max(this.gridBounds.x.max, x)
    this.gridBounds.y.max = Math.max(this.gridBounds.y.max, y)
    this.gridBounds.z.max = Math.max(this.gridBounds.z.max, z)
  }

  parseInitialState (initialState) {
    initialState.forEach((row, j) => {
      row.split('').forEach((cell, i) => {
        this.setValue(i, j, 0, cell)
      })
    })

    return this
  }

  cloneGrid () {
    const newGrid = {
      ...this.grid
    }

    for (const y in newGrid) {
      newGrid[y] = { ...this.grid[y] }

      for (const z in newGrid[y]) {
        newGrid[y][z] = { ...this.grid[y][z] }
      }
    }

    return newGrid
  }
}

function countActiveCubes (initialState, iterations) {
  const grid = new Grid().parseInitialState(initialState)

  for (let i = 0; i < iterations; i++) {
    grid.iterate()
  }

  return grid.countActiveCells()
}

const input = InputReader.getDayReader('17').read()

const ITERATIONS = 6
console.log(countActiveCubes(input, ITERATIONS))
