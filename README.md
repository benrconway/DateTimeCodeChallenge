# DateTime and Interval Code Challence

I have been given a challenge to sort through a given array of users with intervals written in ISO8601, and discover the answer to the following questions:

1. What is the start of the earliest interval supplied for any user?
2. What is the end of the latest interval supplied for any user?
3. Return an array of intervals that represent when two or more users have matching time available.

## What I have done

With my first run through of this, I went for the most straight forward manner of approaching this problem. I used nested loops, which quickly got out of hand. I understand that it isn't the most optimal solution, but for the test data I was given it was a neglible noticed speed difference.

Upon running it against the given input data, it ran incredibly slowly and also did not properly deal with the intersecting intervals to reduce to a list that represented only the responses required.

I have since done a bit more research into the topic and it appears that instead of the nested loops I have, I should be running over the times and putting the answers into some manner of hash keyed new object structure (Experiments to follow).

## What I have learnt

I have deepened my undertanding of the luxon package, which I have added to handle the date time conversions and comparisons.

I have learnt how to properly read an interval in its ISO string format quite easily and calculate it out to a UTC time without issue. (Some of the inputs seemed very strange that they would have offsets that were different within a single interval, but I could imagine a few reasons that would occur in the real world).

I have learnt more about iterating over large data sets and read some of the more popular ideas around it.

Confidence in use of file system reading in Javascript

How to read and organise command line arguements in Node.js

## How to Run

## Requirements:

Node.js and an internet connection. You will need to run the standard _npm install_ after cloning the project down from github, and then the following will be available.

### Scripts available:

1. **npm run dev** - Will run the functions tested upon the _input.txt_
2. **npm run dev-test** - Will run a small number of tests on the supplied _testInput.txt_ file also present.
3. **npm start** - Can be run against any supplied text file, simply append the following flags to have your source read _`-- --file=<path_to_file>`_. At present this will simply console log the resulting array of users and their array of luxon intervals.

If you have any questions, comments, bugs, improvements, please contact **benrconway84@gmail.com** and I will be happy to chat about what I completed.
