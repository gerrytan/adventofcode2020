// https://adventofcode.com/2020/day/4 part1
const readline = require("readline");

// https://nodejs.org/docs/latest-v14.x/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let passportLines = [];
let validPassportCount = 0;

const validatePassport = () => {
  // map of field name to boolean, eg: eyr: true, true means the field exist in this line
  const fields = {};

  passportLines.forEach((line) => {
    // line is something like ecl:gry pid:860033327 eyr:2020 hcl:#fffffd

    line.split(" ").forEach((token) => {
      // token is something like ecl:gry
      const fieldName = token.split(":")[0];
      fields[fieldName] = true;
    });
  });

  if (
    fields["byr"] &&
    fields["iyr"] &&
    fields["iyr"] &&
    fields["eyr"] &&
    fields["hgt"] &&
    fields["hcl"] &&
    fields["ecl"] &&
    fields["pid"]
  ) {
    validPassportCount++;
  }
};

rl.on("line", (line) => {
  if (line.length === 0) {
    validatePassport();

    // reset
    passportLines = [];
  } else {
    passportLines.push(line);
  }
});

rl.on("close", () => {
  validatePassport();
  console.log(validPassportCount);
});
