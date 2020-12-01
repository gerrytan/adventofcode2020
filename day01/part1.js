// https://adventofcode.com/2020/day/1

const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// map of number to boolean, for example: { 1721: true, 979: true }
// numbers are added to this map as they are iterated on the per-line loop below
const numbersMap = {};

// per-line loop, reads input one line at a time as the variable `line`
rl.on("line", (line) => {
  const A = parseInt(line);

  // B is the difference between A and 2020
  const B = 2020 - A;

  // if B exists in numbersMap, answer is found
  if (numbersMap[B]) {
    console.log(`A: ${A}, B: ${B}, A * B = ${A * B}`);
    process.exit(0);
    return;
  }

  // store A in numbersMap and evaluate next line of input
  numbersMap[A] = true;
});

rl.on("close", () => {
  console.error("Invalid input. did not find two numbers that sums to 2020");
  process.exit(1);
});
