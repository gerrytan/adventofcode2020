// https://adventofcode.com/2020/day/10
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// {1:true, 4:true, ...}
const adapters = {};

rl.on("line", (line) => {
  const joltage = parseInt(line);
  adapters[joltage] = true;
});

rl.on("close", () => {
  let oneJoltDiffs = 0;
  let threeJoltDiffs = 1;

  let current = 0;
  Object.keys(adapters).forEach((joltageStr) => {
    const joltage = parseInt(joltageStr);
    const diff = joltage - current;

    switch (diff) {
      case 1:
        oneJoltDiffs++;
        break;
      case 3:
        threeJoltDiffs++;
        break;
      default:
        throw Error(`💩💩💩💩 input, current: ${current}, joltage: ${joltage}`);
    }

    current = joltage;
  });

  console.log(
    `oneJoltDiffs: ${oneJoltDiffs}, threeJoltDiffs: ${threeJoltDiffs}, multiplied: ${
      oneJoltDiffs * threeJoltDiffs
    }`
  );
});
