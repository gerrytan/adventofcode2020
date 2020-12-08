// https://adventofcode.com/2020/day/8
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Command array, for example
// [{cmd: "nop", val: 0, run: false}, ...]
const commands = [];

rl.on("line", (line) => {
  const [cmd, valStr] = line.split(/\s+/);
  const val = parseInt(valStr);
  commands.push({ cmd, val, run: false });
});

let accumulator = 0;

rl.on("close", () => {
  let i = 0;
  while (i < commands.length) {
    const { cmd, val, run } = commands[i];

    if (run) {
      // Infinite loop detected
      console.log(accumulator);
      return;
    } else {
      commands[i] = { cmd, val, run: true };
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
        throw Error(`Invalid command ${cmd}`);
    }
  }
});
