// This file will process the supplied input (if valid path is given), and console log the output of the three questions

const parsedFile = require("yargs").coerce("file", function (arg) {
  return require("fs").readFileSync(arg, "utf8");
}).argv;

console.log(parsedFile.file);
