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
    .map((token) => token.replace(/ bags?\.?$/, "")); // [ 'light red', '1 bright white', '2 muted yellow' ]

  const parent = colors[0];
  const children = {};
  colors
    .slice(1)
    .filter((child) => child !== "no other")
    .forEach((child) => {
      // sample value of child: '1 bright white'
      const [
        countStr, // '1'
        ...colorNames // ['bright', 'white']
      ] = child.split(/\s+/);
      children[colorNames.join(" ")] = parseInt(countStr);
    });
  contains[parent] = children;
});

rl.on("close", () => {
  const count = (color) => {
    const children = contains[color];
    if (children === {}) {
      return 1;
    }
    let descendantCount = 0;
    for (const [childColor, childCount] of Object.entries(children)) {
      descendantCount += childCount + childCount * count(childColor);
    }
    return descendantCount;
  };

  console.log(count("shiny gold"));
});
