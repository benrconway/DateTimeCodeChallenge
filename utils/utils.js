const { DateTime, Interval } = require("luxon");

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

const startOfEarliestIntervalInUTCString = (userArray) => {
  let earliestStart = DateTime.utc();
  userArray.forEach((user) => {
    user.intervals.forEach((interval) => {
      if (interval.start < earliestStart) {
        earliestStart = interval.start;
      }
    });
  });
  return earliestStart.toUTC().toString();
};

const endOfLatestIntervalInUTCString = (userArray) => {
  let latestEnd = DateTime.fromMillis(0);
  userArray.forEach((user) => {
    user.intervals.forEach((interval) => {
      if (interval.end > latestEnd) {
        latestEnd = interval.end;
      }
    });
  });
  return latestEnd.toUTC().toString();
};

const itemsHaveBeenPreviouslyMatched = (itemIds, arrayOfTestedIds) => {
  const { a, b } = itemIds;
  let hasMatch = false;
  arrayOfTestedIds.forEach((item) => {
    item.includes(a) && item.includes(b) ? (hasMatch = true) : null;
  });
  return hasMatch;
};

const removeEngulfedBy = (originalArray) => {
  const duplicateIndices = [];
  const newArray = [...originalArray];
  const arrayLength = originalArray.length - 1;
  originalArray.forEach((intervalA, indexA) => {
    originalArray.forEach((intervalB, indexB) => {
      // Any items that are duplicates, remove from newArray
      if (
        indexA === indexB ||
        itemsHaveBeenPreviouslyMatched(
          { a: indexA, b: indexB },
          duplicateIndices
        )
      )
        return;

      if (intervalA.engulfs(intervalB)) {
        // replace old value with null to maintain array positions
        newArray.splice(indexB, 1, null);
        duplicateIndices.push(`${indexA}-${indexB}`);
      }
      if (indexB === arrayLength) {
        duplicateIndices.push(`${indexA}-${indexB}`);
      }
    });
  });
  return newArray.filter((item) => item !== null);
};

const intervalArrayToUTCString = (originalArray) => {
  return originalArray.map((interval) => {
    return Interval.fromISO(interval.toISO(), { zone: "utc" }).toISO();
  });
};

const formatResults = (originalArray) => {
  const sortedResults = [...originalArray].sort();
  return intervalArrayToUTCString(sortedResults);
};

const tightenResults = (resultsArray) => {
  // This could be much improved to include Interval.equals and Interval.overlaps.
  return removeEngulfedBy(resultsArray);
};

const supplyArrayOfWorkerOverlappingHours = (userArray) => {
  const userMatchingsComplete = [];
  const arrayOfReturnIntervals = [];

  userArray.forEach((userA) => {
    userArray.forEach((userB) => {
      // skip loop if id matches or pair of ids have been tested
      if (
        userA.id === userB.id ||
        itemsHaveBeenPreviouslyMatched(
          { a: userA.id, b: userB.id },
          userMatchingsComplete
        )
      )
        return;
      const arrayLength = userB.intervals.length - 1;
      userA.intervals.forEach((intervalA) => {
        userB.intervals.forEach((intervalB, index) => {
          // 1) Check to see if Interval A overlaps with Interval B
          if (
            intervalA.overlaps(intervalB) ||
            intervalA.equals(intervalB) ||
            intervalA.engulfs(intervalB)
          ) {
            const intersection = intervalA.intersection(intervalB);
            arrayOfReturnIntervals.push(intersection);
          }
          if (index === arrayLength) {
            // if the index is the last index, put the ids of tested users
            // into the array to stop re-test of these users.
            userMatchingsComplete.push(`${userA.id}-${userB.id}`);
          }
        });
      });
    });
  });
  // tighten results to remove those engulfed by other results
  const arrayToReturn = tightenResults(arrayOfReturnIntervals);
  // return in desired format
  return formatResults(arrayToReturn);
};

module.exports = {
  startOfEarliestIntervalInUTCString,
  endOfLatestIntervalInUTCString,
  prepareUserArray,
  supplyArrayOfWorkerOverlappingHours,
};
