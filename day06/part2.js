const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Questions with yes answers for the current group, value is number of people answering
// yes for the question (eg: {a:1,c:2})
// This map is reset when we visit the next group / reach end of file
let yesAnswers = {};

let numPeopleInGroup = 0;

let finalCount = 0;

const accumulateCount = () => {
  let count = 0;
  for (const [key, value] of Object.entries(yesAnswers)) {
    if (value === numPeopleInGroup) {
      count++;
    }
  }
  console.log(`${count} questions with yes answers by everyone in the group`);
  finalCount += count;
};

rl.on("line", (line) => {
  if (line.startsWith("#")) {
    // ignore comments
    return;
  }

  if (line.length !== 0) {
    numPeopleInGroup++;
    for (let i = 0; i < line.length; i++) {
      const question = line[i];
      if (yesAnswers[question] === undefined) {
        yesAnswers[question] = 1;
      } else {
        yesAnswers[question]++;
      }
    }
  } else {
    accumulateCount();
    yesAnswers = {};
    numPeopleInGroup = 0;
  }
});

rl.on("close", () => {
  accumulateCount();
  console.log(finalCount);
});
