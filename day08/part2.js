// https://adventofcode.com/2020/day/8
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Command array, for example
// [{cmd: "nop", val: 0}, ...]
const commands = [];

rl.on("line", (line) => {
  const [cmd, valStr] = line.split(/\s+/);
  const val = parseInt(valStr);
  commands.push({ cmd, val });
});

// Return { canTerminate: true, accumulator: 345 } if program can terminate when the nop / jmp command
// at swappedIndex is swapped
const lookAhead = ({ swappedIndex, accumulator }) => {
  const visited = {};
  let i = swappedIndex;

  while (i < commands.length) {
    let { cmd, val } = commands[i];
    if (i === swappedIndex) {
      if (cmd !== "jmp" && cmd !== "nop") {
        throw Error(`Hey you can't swap ${cmd}!`);
      }
      cmd = cmd === "jmp" ? "nop" : "jmp";
    }
    if (visited[i]) {
      return { canTerminate: false };
    }
    visited[i] = true;
    switch (cmd) {
      case "acc":
        accumulator += val;
      case "nop":
        i++;
        break;
      case "jmp":
        i += val;
        break;
      default:
        throw Error(`(1) Invalid command ${cmd}`);
    }
  }

  return { canTerminate: true, accumulator };
};

rl.on("close", () => {
  let accumulator = 0;
  let i = 0;
  while (i < commands.length) {
    let { cmd, val } = commands[i];

    if (cmd === "jmp" || cmd === "nop") {
      // Look ahead if i is the correct index to swap the jmp / nop command
      const { canTerminate, accumulator: finalAccumulator } = lookAhead({
        swappedIndex: i,
        accumulator,
      });
      if (canTerminate) {
        console.log(finalAccumulator);
        return;
      }
    }

    switch (cmd) {
      case "acc":
        accumulator += val;
      case "nop":
        i++;
        break;
      case "jmp":
        i += val;
        break;
      default:
        throw Error(`(2) Invalid command ${cmd}`);
    }
  }
  throw Error("No swap position found");
});
