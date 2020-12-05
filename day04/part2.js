// https://adventofcode.com/2020/day/4 part2
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
      const [key, value] = token.split(":");
      fields[key] = value;
    });
  });

  const validNumRange = (str, start, end) => {
    const num = parseInt(str);
    if (num === NaN) {
      return false;
    }
    return num >= start && num <= end;
  };

  const validHgt = (hgtStr) => {
    if (!hgtStr || hgtStr.length < 2) {
      return false;
    }
    const unit = hgtStr.slice(-2);
    const num = parseInt(hgtStr.substring(0, hgtStr.length - 2));

    switch (unit) {
      case "cm":
        return num >= 150 && num <= 193;
      case "in":
        return num >= 59 && num <= 76;
      default:
        return false;
    }
  };

  const validHcl = (str) => {
    if (typeof str !== "string") {
      return false;
    }
    return str.match(/^#[0-9a-f]{6}$/) !== null;
  };

  const validEcl = (str) => {
    if (typeof str !== "string") {
      return false;
    }
    switch (str) {
      case "amb":
      case "blu":
      case "brn":
      case "gry":
      case "grn":
      case "hzl":
      case "oth":
        return true;
      default:
        return false;
    }
  };

  const validPid = (str) => {
    if (typeof str !== "string") {
      return false;
    }
    return str.match(/^[0-9]{9}$/) !== null;
  };
  if (
    fields["byr"] &&
    validNumRange(fields["byr"], 1920, 2002) &&
    fields["iyr"] &&
    validNumRange(fields["iyr"], 2010, 2020) &&
    fields["eyr"] &&
    validNumRange(fields["eyr"], 2020, 2030) &&
    fields["hgt"] &&
    validHgt(fields["hgt"]) &&
    fields["hcl"] &&
    validHcl(fields["hcl"]) &&
    fields["ecl"] &&
    validEcl(fields["ecl"]) &&
    fields["pid"] &&
    validPid(fields["pid"])
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
