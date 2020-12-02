// https://adventofcode.com/2020/day/2
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let validCount = 0;

rl.on("line", (line) => {
  const [
    positions, // 1-3, 2-9
    letterRaw, // a:, b:
    password,
  ] = line.split(" ");
  const [leftPos, rightPos] = positions.split("-").map((num) => parseInt(num));
  const [letter] = letterRaw.split(":");

  // how many time `letter` appears in `password` at `leftPos` or `rightPos`
  let numAppearances = 0;
  [leftPos, rightPos].forEach((pos) => {
    if (password[pos - 1] === letter) {
      numAppearances++;
    }
  });

  // this password is valid if `letter` appears exactly once either at `leftPost` or `rightPos`
  if (numAppearances === 1) {
    validCount++;
  }
});

rl.on("close", () => {
  console.log(validCount);
});
