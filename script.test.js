// This file will run the tests as supplied by the code challenge against the file 'testInputs.txt'
const fs = require("fs");
const {
  prepareUserArray,
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
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
});
