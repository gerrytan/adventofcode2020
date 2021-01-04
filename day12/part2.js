const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let ewPos = 0;
let nsPos = 0;
let wayptEW = 10;
let wayptNS = 1;

rl.on("line", (line) => {
  const [action, value] = [line[0], parseInt(line.slice(1))];

  if (value < 0) {
    throw new Error(`Why you shove me negative value ${value} 😡`);
  }

  const turnWayptLeft90 = () => {
    [wayptEW, wayptNS] = [-wayptNS, wayptEW];
  };
  const turnWaypt180 = () => {
    turnWayptLeft90();
    turnWayptLeft90();
  };
  const turnWayptRight90 = () => {
    [wayptEW, wayptNS] = [wayptNS, -wayptEW];
  };

  switch (action) {
    case "N":
      wayptNS += value;
      break;
    case "S":
      wayptNS -= value;
      break;
    case "E":
      wayptEW += value;
      break;
    case "W":
      wayptEW -= value;
      break;
    case "L":
      if (value < 0) {
        throw Error(`Hey L degree is less than 0: ${value}`);
      }
      switch (value % 360) {
        case 0:
          break;
        case 90:
          turnWayptLeft90();
          break;
        case 180:
          turnWaypt180();
          break;
        case 270:
          turnWayptRight90();
          break;
        default:
          throw Error(`L turn: I gave up, don't know what to do 😢`);
      }
      break;
    case "R":
      if (value < 0) {
        throw Error(`Hey R degree is less than 0: ${value}`);
      }
      switch (value % 360) {
        case 0:
          break;
        case 90:
          turnWayptRight90();
          break;
        case 180:
          turnWaypt180();
          break;
        case 270:
          turnWayptLeft90();
          break;
        default:
          throw Error(`R turn: I gave up, don't know what to do 😢`);
      }
      break;
    case "F":
      ewPos += value * wayptEW;
      nsPos += value * wayptNS;
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
