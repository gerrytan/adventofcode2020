const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Questions with yes answers for the current group (eg: {a:true,c:true})
// This map is reset when we visit the next group / reach end of file
let yesAnswers = {};

let sumYesAnswers = 0;

rl.on("line", (line) => {
  if (line.startsWith("#")) {
    // ignore comments
    return;
  }

  if (line.length !== 0) {
    for (let i = 0; i < line.length; i++) {
      yesAnswers[line[i]] = true;
    }
  } else {
    sumYesAnswers += Object.keys(yesAnswers).length;
    yesAnswers = {};
  }
});

rl.on("close", () => {
  sumYesAnswers += Object.keys(yesAnswers).length;
  console.log(sumYesAnswers);
});
