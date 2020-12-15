// https://adventofcode.com/2020/day/11#part2
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// ["L.LL.LL.LL", "LLLLLLL.LL", ...]
let seats = [];

rl.on("line", (line) => {
  seats.push(line);
});

const isOccupied = (row, col) => {
  return seats[row][col] === "#";
};

const countAdjacentOccupiedSeats = (row, col) => {
  let numOccupied = 0;
  // Clockwise checking of occupied seat from top left

  // 1. Top left
  for (let [r, c] = [row - 1, col - 1]; r >= 0 && c >= 0; r--, c--) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 2. Top
  for (let [r, c] = [row - 1, col]; r >= 0; r--) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 3. Top right
  for (
    let [r, c] = [row - 1, col + 1];
    r >= 0 && c < seats[0].length;
    r--, c++
  ) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 4. Right
  for (let [r, c] = [row, col + 1]; c < seats[0].length; c++) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 5. Bottom right
  for (
    let [r, c] = [row + 1, col + 1];
    r < seats.length && c < seats[0].length;
    r++, c++
  ) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 6. Bottom
  for (let [r, c] = [row + 1, col]; r < seats.length; r++) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 7. Bottom left
  for (let [r, c] = [row + 1, col - 1]; r < seats.length && c >= 0; r++, c--) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  // 8. Left
  for (let [r, c] = [row, col - 1]; c >= 0; c--) {
    if (seats[r][c] === ".") {
      continue;
    }
    if (isOccupied(r, c)) {
      numOccupied++;
    }
    break;
  }

  return numOccupied;
};

rl.on("close", () => {
  while (true) {
    let changed = false;
    let occupiedSeats = 0;
    let newSeats = [];

    for (let row = 0; row < seats.length; row++) {
      const rowSeats = seats[row];
      const newRowSeats = [];
      for (let col = 0; col < rowSeats.length; col++) {
        const seat = rowSeats[col];
        let newSeat = seat;
        switch (seat) {
          case "L":
            if (countAdjacentOccupiedSeats(row, col) === 0) {
              newSeat = "#";
              changed = true;
            }
            break;
          case "#":
            occupiedSeats++;
            if (countAdjacentOccupiedSeats(row, col) >= 5) {
              newSeat = "L";
              changed = true;
            }
            break;
          case ".":
            break;
          default:
            throw Error(`WTF, you gave me a ${seat} tile 😡 ?!`);
        }
        newRowSeats.push(newSeat);
      }
      newSeats.push(newRowSeats.join(""));
    }

    if (!changed) {
      console.log(occupiedSeats);
      process.exit(0);
    }

    seats = newSeats;
  }
});
