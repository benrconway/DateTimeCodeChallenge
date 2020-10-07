const { readFromFile } = require("./utils");

describe("readFromFile tests", () => {
  test("Can read from testInput and return a string", () => {
    expect(readFromFile("testInput.txt")).toBeTruthy();
  });
  test("returns a string if no path supplied", () => {
    expect(readFromFile(null)).toBe("No path supplied");
  });
});
