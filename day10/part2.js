// https://adventofcode.com/2020/day/10
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// {1:true, 4:true, ...}
const adaptersMap = {};

rl.on("line", (line) => {
  const joltage = parseInt(line);
  adaptersMap[joltage] = true;
});

rl.on("close", () => {
  // [1, 4, ...]
  const adapters = Object.keys(adaptersMap).map((a) => parseInt(a));

  // Store the possible number of arrangement for adapter j so we don't have
  // to recompute again
  const cache = {};

  // Number of possible arrangements for adapter with joltage j
  const calculate = (j) => {
    if (cache[j] !== undefined) {
      return cache[j];
    }

    if (adaptersMap[j] !== true) {
      cache[j] = 0;
      return 0;
    }

    if (j === adapters[adapters.length - 1]) {
      cache[j] = 1;
      return 1;
    }

    const result = calculate(j + 1) + calculate(j + 2) + calculate(j + 3);
    cache[j] = result;
    return result;
  };

  // we start from 0, sum up number of possible arrangements starting with 1, 2 & 3
  const numArrangements = calculate(1) + calculate(2) + calculate(3);

  console.log(numArrangements);
});
