// https://adventofcode.com/2020/day/9
const readline = require("readline");
const { basename } = require("path");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// how many previous numbers we're considering?
// this is coming from first line of input so the code
// can handle both previous 5 and 25
const N = process.argv[2];
if (N === undefined) {
  console.error(
    `Usage: node ${basename(
      __filename
    )} N\nN is how many previous number to consider`
  );
  process.exit(1);
}

// [25,20,15,..]
let numbersArray = [];

// {15:true, 20:true, 25:true}
// contains same data as numbers Array but in a set (map) data structure for fast access
// still need to keep both array and set because we need the insertion order in array, the set
// does not preserve this
const numbersSet = {};

rl.on("line", (line) => {
  const num = parseInt(line);

  if (numbersArray.length >= N) {
    // Find the two numbers (fst + snd) that adds up to num in the previous N numbers
    let found = false;
    for (let i = 0; i < numbersArray.length && !found; i++) {
      const fst = numbersArray[i];
      const snd = num - fst;
      if (fst !== snd && numbersSet[snd] === true) {
        found = true;
      }
    }

    if (!found) {
      console.log(num);
      process.exit(0);
    } else {
      // Remove the top most number to keep the count exactly N
      const firstNumInArray = numbersArray.shift();
      delete numbersSet[firstNumInArray];
    }
  }

  numbersArray.push(num);
  numbersSet[num] = true;
});

rl.on("close", () => {});
