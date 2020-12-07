// https://adventofcode.com/2020/day/7
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// map of contain relationship
// for example:
// {
//   "light red": { "bright white": true, "muted yellow": true },
//   "faded blue": {}, // empty obj means contains no other bag
// };
const contains = {};

rl.on("line", (line) => {
  const colors = line // 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    .split(/ contain |, /) // [ 'light red bags', '1 bright white bag', '2 muted yellow bags.' ]
    .map((token) => token.replace(/ bags?\.?$/, "")) // [ 'light red', '1 bright white', '2 muted yellow' ]
    .map((token) => token.replace(/^\d+ /, "")); // [ 'light red', 'bright white', 'muted yellow' ]

  const parent = colors[0];
  const children = {};
  colors
    .slice(1)
    .filter((color) => color !== "no other")
    .forEach((color) => (children[color] = true));
  contains[parent] = children;
});

rl.on("close", () => {
  // bag colour that can contain shiny gold bag
  // for example: { "muted yellow": true };
  const canContainCache = {};

  // Can the given color contain 'shiny gold' ?
  const canContain = (color) => {
    if (color === "shiny gold" || canContainCache[color] === true) {
      return true;
    }
    const children = contains[color]; // { "bright white": true, "muted yellow": true }
    const childrenKeys = Object.keys(children); // [ "bright white", "muted yellow" ]
    for (let i = 0; i < childrenKeys.length; i++) {
      const child = childrenKeys[i];
      if (canContain(child)) {
        canContainCache[color] = true;
        return true;
      }
    }
    return false;
  };

  Object.keys(contains).forEach((color) => {
    if (color !== "shiny gold" && canContain(color)) {
      canContainCache[color] = true;
    }
  });

  console.log(Object.keys(canContainCache).length);
});
