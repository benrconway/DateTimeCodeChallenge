const { Interval } = require("luxon");
const { prepareUserArray } = require("./utils");

describe("prepareUserArray tests", () => {
  const TEST_STRING =
    "1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]";

  test("Can prepare user array from test string", () => {
    expect(prepareUserArray(TEST_STRING)).toStrictEqual([
      {
        id: "1",
        intervals: [
          Interval.fromISO(
            "2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00"
          ),
          Interval.fromISO(
            "2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00"
          ),
        ],
      },
    ]);
  });
});
