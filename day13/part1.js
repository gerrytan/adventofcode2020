const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let earliestTimestamp;
let lineNum = 1;

rl.on("line", (line) => {
  switch (lineNum) {
    case 1:
      earliestTimestamp = parseInt(line);
      break;
    case 2:
      findEarliestBus(line);
      break;
  }
  lineNum++;
});

const findEarliestBus = (line) => {
  let earliestBusId;
  let minWaitTime = Number.MAX_SAFE_INTEGER;

  const tokens = line.split(","); // splits '7,13,x,x,59,x,31,19' into tokens

  // loops each busId, calculating its waitTime and updates minWaitTime & earliestBusId
  // this loop stops if we find waitTime === 0 since we never going to find a lower value
  for (let i = 0; i < tokens.length && minWaitTime > 0; i++) {
    const token = tokens[i];

    if (token === "x") {
      continue;
    }

    const busId = parseInt(token);
    const waitTime = busId - (earliestTimestamp % busId);

    if (waitTime < minWaitTime) {
      minWaitTime = waitTime;
      earliestBusId = busId;
    }
  }

  console.log(
    `earliestBusId: ${earliestBusId} * minWaitTime: ${minWaitTime} = ${
      earliestBusId * minWaitTime
    }`
  );
};
