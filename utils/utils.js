const { Interval } = require("luxon");

const prepareIntervalfromISO = (intervalISOString) => {
  // format the interval to be returned
  return Interval.fromISO(intervalISOString);
};

const prepareUserArray = (userInformation) => {
  // split user information into lines
  const initialSplit = userInformation.split(/[\n]/);

  // map over array of lines to prepare an array of individual users
  return initialSplit.map((line) => {
    const intervals = [];
    // seperate the id from the intervals
    const seperatedIdAndIntervals = line.split("@");
    // check there are no undefined results from stray lines etc
    if (seperatedIdAndIntervals[1] !== undefined) {
      // seperate individual intervals
      const intervalsStrings = seperatedIdAndIntervals[1].split(/([\\[\\,\]])/);
      intervalsStrings.forEach((interval) => {
        if (interval.length > 1) {
          intervals.push(prepareIntervalfromISO(interval));
        }
      });
    }

    return {
      id: seperatedIdAndIntervals[0],
      intervals,
    };
  });
};

module.exports = { prepareUserArray };
