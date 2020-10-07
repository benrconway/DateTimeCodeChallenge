const fs = require("fs");

const readFromFile = (pathToFile) => {
  if (!pathToFile) return "No path supplied";
  return fs.readFileSync(pathToFile, "utf8");
};

module.exports = { readFromFile };
