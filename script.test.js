// This file will run the tests as supplied by the code challenge against the file 'testInputs.txt'
const fs = require("fs");
const {
  prepareUserArray,
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
  supplyArrayOfWorkerOverlappingHours,
} = require("./utils");
const stringConstants = require("./constants");

describe("Can correctly answer the following questions:", () => {
  let userArray;
  beforeAll(() => {
    const parsedFile = fs.readFileSync("testInput.txt", "utf8");
    userArray = prepareUserArray(parsedFile);
  });
  test(stringConstants.QUESTION_ONE, () => {
    expect(startOfEarliestIntervalInUTCString(userArray)).toBe(
      "2020-01-01T00:15:00.000Z"
    );
  });
  test(stringConstants.QUESTION_TWO, () => {
    expect(endOfLatestIntervalInUTCString(userArray)).toBe(
      "2020-01-01T04:45:00.000Z"
    );
  });
  test(stringConstants.QUESTION_THREE, () => {
    // without specific guidance I have chosen to store the expected output as an array.
    // arrays have been converted to strings for simplicity of test comparison
    expect(supplyArrayOfWorkerOverlappingHours(userArray).toString()).toBe(
      [
        "2020-01-01T00:15:00.000Z/2020-01-01T01:30:00.000Z",
        "2020-01-01T02:00:00.000Z/2020-01-01T03:30:00.000Z",
        "2020-01-01T04:00:00.000Z/2020-01-01T04:30:00.000Z",
      ].toString()
    );
  });
});
