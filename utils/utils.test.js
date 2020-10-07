const {
  prepareUserArray,
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
} = require("./utils");
const { Interval } = require("luxon");

const TEST_STRING =
  "1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]";

const testIntervals = [
  Interval.fromISO(
    "2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00"
  ),
  Interval.fromISO(
    "2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00"
  ),
  Interval.fromISO(
    "2020-01-01T16:15:00.000+12:00/2019-12-31T18:30:00.000-10:00"
  ),
  Interval.fromISO(
    "2020-01-01T02:15:00.000+02:00/2020-01-01T13:30:00.000+12:00"
  ),
];
const testArray = [
  {
    id: 1,
    intervals: [testIntervals[0], testIntervals[1]],
  },
  {
    id: 1,
    intervals: [testIntervals[2], testIntervals[3]],
  },
];

describe("prepareUserArray tests", () => {
  test("Can prepare user array from test string", () => {
    expect(prepareUserArray(TEST_STRING)).toStrictEqual([
      {
        id: "1",
        intervals: [testIntervals[0], testIntervals[1]],
      },
    ]);
  });
});

describe("startOfEarliestIntervalInUTCString tests", () => {
  test("Can find the start of the earliest interval from a given array of users with intervals", () => {
    expect(startOfEarliestIntervalInUTCString(testArray)).toBe(
      "2020-01-01T00:15:00.000Z"
    );
  });
});

describe("endOfLatestIntervalInUTCString tests", () => {
  test("Can find the end of the latest interval from of a given array of users with intervals", () => {
    expect(endOfLatestIntervalInUTCString(testArray)).toBe(
      "2020-01-01T04:30:00.000Z"
    );
  });
});
