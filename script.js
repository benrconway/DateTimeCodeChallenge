// This file will process the supplied input (if valid path is given), and console log the output of the three questions
const {
  prepareUserArray,
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
  supplyArrayOfWorkerOverlappingHours,
} = require("./utils");
const stringConstants = require("./constants");

const parsedFile = require("yargs").coerce("file", function (arg) {
  return require("fs").readFileSync(arg, "utf8");
}).argv;

const userArray = prepareUserArray(parsedFile.file);

console.log("------------------------------------------------");
console.log(stringConstants.QUESTION_ONE);
console.log(startOfEarliestIntervalInUTCString(userArray));
console.log("------------------------------------------------");
console.log(stringConstants.QUESTION_TWO);
console.log(endOfLatestIntervalInUTCString(userArray));
console.log("------------------------------------------------");
console.log(stringConstants.QUESTION_THREE);
console.log(supplyArrayOfWorkerOverlappingHours(userArray));
console.log("------------------------------------------------");
