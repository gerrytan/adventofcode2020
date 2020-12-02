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
    range, // 1-3, 2-9
    letterRaw, // a:, b:
    password,
  ] = line.split(" ");
  const [low, high] = range.split("-").map((num) => parseInt(num));
  const [letter] = letterRaw.split(":");

  // count of `letter` in this `password`
  let letterCount = 0;
  for (const c of password) {
    if (
      c === letter &&
      // stop iterating the rest of password if it already breaches `high`
      letterCount <= high
    ) {
      letterCount++;
    }
  }

  if (letterCount >= low && letterCount <= high) {
    validCount++;
  }
});

rl.on("close", () => {
  console.log(validCount);
});
