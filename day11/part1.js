// https://adventofcode.com/2020/day/11
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
  if (row > 0 && col > 0 && isOccupied(row - 1, col - 1)) {
    numOccupied++;
  }
  if (row > 0 && isOccupied(row - 1, col)) {
    numOccupied++;
  }
  if (row > 0 && col < seats[0].length - 1 && isOccupied(row - 1, col + 1)) {
    numOccupied++;
  }
  if (col < seats[0].length - 1 && isOccupied(row, col + 1)) {
    numOccupied++;
  }
  if (
    row < seats.length - 1 &&
    col < seats[0].length - 1 &&
    isOccupied(row + 1, col + 1)
  ) {
    numOccupied++;
  }
  if (row < seats.length - 1 && isOccupied(row + 1, col)) {
    numOccupied++;
  }
  if (row < seats.length - 1 && col > 0 && isOccupied(row + 1, col - 1)) {
    numOccupied++;
  }
  if (col > 0 && isOccupied(row, col - 1)) {
    numOccupied++;
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
            if (countAdjacentOccupiedSeats(row, col) >= 4) {
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
