// https://adventofcode.com/2020/day/5
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let highestSeatId = Number.MIN_SAFE_INTEGER;

// map of seatId to boolean, (eg: 567: true)
// entries are populated as boarding pass of other passengers are viewed
const filledSeatIdsMap = {};

// map of candidate of my seatId to boolean, populated if there's a +1 / -1 gap
// of visited boarding pass. Removed as soon as the seatId
// is filled by other passenger
const mySeatIdCandidateMap = {};

rl.on("line", (line) => {
  if (line.startsWith("#")) {
    // ignore comments
    return;
  }

  if (line.length !== 10) {
    throw new Error(`Invalid line ${line}`);
  }

  const findRowOrCol = (chars, lowKey, highKey, range) => {
    let [low, high] = [0, range];
    for (let i = 0; i < chars.length - 1; i++) {
      switch (chars[i]) {
        case lowKey:
          high = high - (high - low + 1) / 2;
          break;
        case highKey:
          low = low + (high - low + 1) / 2;
          break;
        default:
          throw new Error(`Invalid character ${chars[i]} (pos ${i})`);
      }
    }
    switch (chars[chars.length - 1]) {
      case lowKey:
        return low;
      case highKey:
        return high;
      default:
        throw new Error(
          `Invalid character ${chars[chars.length - 1]} (pos ${
            chars.length - 1
          })`
        );
    }
  };

  const row = findRowOrCol(line.substring(0, 7), "F", "B", 127);
  const column = findRowOrCol(line.substring(7, 10), "L", "R", 7);
  const seatId = row * 8 + column;

  // maintain maximum seatId
  if (seatId > highestSeatId) {
    highestSeatId = seatId;
  }

  filledSeatIdsMap[seatId] = true;
  delete mySeatIdCandidateMap[seatId];

  if (
    filledSeatIdsMap[seatId + 1] !== true &&
    filledSeatIdsMap[seatId + 2] === true
  ) {
    mySeatIdCandidateMap[seatId + 1] = true;
  }

  if (
    filledSeatIdsMap[seatId - 1] !== true &&
    filledSeatIdsMap[seatId - 2] === true
  ) {
    mySeatIdCandidateMap[seatId - 1] = true;
  }

  console.log(
    `visited boarding pass: row ${row} column ${column} seat ID ${seatId}`
  );
});

rl.on("close", () => {
  console.log(`highest seat ID ${highestSeatId}`);

  console.log(`my seat ID ${Object.keys(mySeatIdCandidateMap)}`);
});
