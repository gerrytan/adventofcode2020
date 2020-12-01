// https://adventofcode.com/2020/day/1 (part two)

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

// Map of sum of two numbers appearing on the input to their multiples, for example: { 665: 109434 }.
// In this case 665 is result of a sum of 366 + 299, and the 109434 is result of 366 * 299
// Only sums that are 2020 or less are added here
const sumTwoNumsMap = {};

// per-line loop, reads input one line at a time as the variable `line`
rl.on("line", (line) => {
  const A = parseInt(line);

  // B is the sum of second and third number that made a total of 2020
  const B = 2020 - A;

  if (sumTwoNumsMap[B]) {
    const mulpTwoNums = sumTwoNumsMap[B];
    console.log(`A: ${A}, B: ${B}, mulpThreeNums: ${mulpTwoNums * A}`);
    process.exit(0);
    return;
  }

  for (const Cstr in numbersMap) {
    const C = parseInt(Cstr);
    if (A + C <= 2020) {
      sumTwoNumsMap[A + C] = A * C;
    }
  }

  numbersMap[A] = true;
});

rl.on("close", () => {
  console.error("Invalid input. did not find three numbers that sums to 2020");
  process.exit(1);
});
