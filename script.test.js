// This file will run the tests as supplied by the code challenge against the file 'testInputs.txt'
const fs = require("fs");
const {
  prepareUserArray,
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
  supplyArrayOfWorkerOverlappingHours,
} = require("./utils");

describe("Can correctly answer the following questions:", () => {
  let userArray;
  beforeAll(() => {
    const parsedFile = fs.readFileSync("testInput.txt", "utf8");
    userArray = prepareUserArray(parsedFile);
  });
  test("What is the starting date and time (in UTC) of the earliest interval where any of the workers are free?", () => {
    expect(startOfEarliestIntervalInUTCString(userArray)).toBe(
      "2020-01-01T00:15:00.000Z"
    );
  });
  test("What is the ending date and time (in UTC) of the latest interval where any of the workers are free?", () => {
    expect(endOfLatestIntervalInUTCString(userArray)).toBe(
      "2020-01-01T04:45:00.000Z"
    );
  });
  test("What are the intervals of date and times (in UTC) where there are at least 2 workers free?", () => {
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
