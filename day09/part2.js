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
const N = parseInt(process.argv[2]);
if (N === undefined) {
  console.error(
    `Usage: node ${basename(
      __filename
    )} N\nN is the invalid number being searched`
  );
  process.exit(1);
}

// [25,20,15,..]
// We'll shift or push numbers to this array depending on the current sum
let numbersArray = [];

// {15:true, 20:true, 25:true, ...}
// This contains same information as array, but sorted from smallest to largest, useful to quickly calculate min and max
let numbersSet = {};

// Sum of all number in the array
let sum = 0;

// To be called when we found the answer
const wohoo = () => {
  console.log(`contiguous numbers: ${numbersArray}`);
  const numbersSorted = Object.keys(numbersSet);
  const [min, max] = [
    parseInt(numbersSorted[0]),
    parseInt(numbersSorted[numbersSorted.length - 1]),
  ];
  console.log(`min: ${min}, max: ${max}, min + max: ${min + max}`);
  process.exit(0);
};

rl.on("line", (line) => {
  const num = parseInt(line);

  numbersArray.push(num);
  numbersSet[num] = true;
  sum += num;

  if (numbersArray.length >= 2) {
    if (sum === N) {
      wohoo();
    }

    // Remove numbers from the beginning of array until sum goes below N
    while (sum > N && numbersArray.length >= 3) {
      const removed = numbersArray.shift();
      delete numbersSet[removed];
      sum -= removed;

      // If we found N, party!!
      if (sum === N) {
        wohoo();
      }
    }
  }
});

rl.on("close", () => {
  console.error(
    "Well.. input is 💩 or there's a bug in the code.. ¯\\_(ツ)_/¯"
  );
});
