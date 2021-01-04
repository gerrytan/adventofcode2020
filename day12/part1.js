const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let ewPos = 0;
let nsPos = 0;
let dir = 0;

rl.on("line", (line) => {
  const [action, value] = [line[0], parseInt(line.slice(1))];
  switch (action) {
    case "N":
      nsPos += value;
      break;
    case "S":
      nsPos -= value;
      break;
    case "E":
      ewPos += value;
      break;
    case "W":
      ewPos -= value;
      break;
    case "L":
      if (value % 90 !== 0) {
        throw Error(`Hey L degree is not 90 multiples: ${value}`);
      }
      dir = (dir - value) % 360;
      break;
    case "R":
      if (value % 90 !== 0) {
        throw Error(`Hey R degree is not 90 multiples: ${value}`);
      }
      dir = (dir + value) % 360;
      break;
    case "F":
      switch (dir) {
        // east
        case 0:
          ewPos += value;
          break;
        // south
        case 90:
        case -270:
          nsPos -= value;
          break;
        // west
        case 180:
        case -180:
          ewPos -= value;
          break;
        // north
        case 270:
        case -90:
          nsPos += value;
          break;
        default:
          throw Error(`I don't know what to do with dir ${dir}`);
      }
      break;
    default:
      throw Error(`Wow unknown action ${action} ❌ !`);
  }
});

rl.on("close", () => {
  const [ewPosAbs, nsPosAbs] = [Math.abs(ewPos), Math.abs(nsPos)];
  console.log(
    `ewPos: ${ewPos}, nsPos: ${nsPos}, manhattanDist: ${ewPosAbs + nsPosAbs}`
  );
});
