const fs = require("fs");

const readFromFile = (pathToFile) => {
  return fs.readFileSync(pathToFile, "utf8");
};

module.exports = { readFromFile };
