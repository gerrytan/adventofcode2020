// https://adventofcode.com/2020/day/3
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let lineNum = 0;
let numTrees = 0;
let x = 0;

rl.on("line", (line) => {
  if (lineNum >= 1) {
    switch (line[x]) {
      case "#":
        numTrees++;
        break;
      case ".":
        break;
      default:
        console.error(
          `Invalid character '${line[x]}' found on the map, line ${lineNum} column ${x}`
        );
        process.exit(1);
    }
  }

  lineNum++;
  x = (x + 3) % line.length;
});

rl.on("close", () => {
  console.log(numTrees);
});
