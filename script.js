// This file will process the supplied input (if valid path is given), and console log the output of the three questions
const { prepareUserArray } = require("./utils");

const parsedFile = require("yargs").coerce("file", function (arg) {
  return require("fs").readFileSync(arg, "utf8");
}).argv;

const userArray = prepareUserArray(parsedFile.file);
console.log(userArray);
