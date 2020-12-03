// https://adventofcode.com/2020/day/3#part2
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let lineNum = 0;

let numTreesR1D1 = 0;
let i = 0; // cursor for right 1 down 1
let numTreesR3D1 = 0;
let j = 0; // and so on...
let numTreesR5D1 = 0;
let k = 0;
let numTreesR7D1 = 0;
let l = 0;
let numTreesR1D2 = 0;
let m = 0;

const isTree = (c) => {
  switch (c) {
    case "#":
      return true;
    case ".":
      return false;
    default:
      console.error(`Invalid character '${c}' found on the map`);
      process.exit(1);
  }
};

rl.on("line", (line) => {
  if (lineNum >= 1) {
    i = (i + 1) % line.length;
    j = (j + 3) % line.length;
    k = (k + 5) % line.length;
    l = (l + 7) % line.length;

    if (isTree(line[i])) {
      numTreesR1D1++;
    }
    if (isTree(line[j])) {
      numTreesR3D1++;
    }
    if (isTree(line[k])) {
      numTreesR5D1++;
    }
    if (isTree(line[l])) {
      numTreesR7D1++;
    }
  }

  if (lineNum >= 2 && lineNum % 2 === 0) {
    m = (m + 1) % line.length;
    if (isTree(line[m])) {
      numTreesR1D2++;
    }
  }

  lineNum++;
});

rl.on("close", () => {
  console.log(
    `numTreesR1D1: ${numTreesR1D1}, numTreesR3D1: ${numTreesR3D1}, numTreesR5D1: ${numTreesR5D1}, numTreesR7D1: ${numTreesR7D1}, numTreesR1D2: ${numTreesR1D2}`
  );
  console.log(
    `All multiplied: ${
      numTreesR1D1 * numTreesR3D1 * numTreesR5D1 * numTreesR7D1 * numTreesR1D2
    }`
  );
});
