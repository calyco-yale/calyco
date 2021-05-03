export const getStringFromDate = date => {
  const iso = date.toISOString();
  return iso.substring(0, 10) + " " + iso.substring(11, 16);
};

export const getDateFromString = datetimeString => {
  return new Date(
    Date.UTC(
      datetimeString.substring(0, 4),
      datetimeString.substring(5, 7) - 1,
      datetimeString.substring(8, 10),
      datetimeString.substring(11, 13),
      datetimeString.substring(14, 16)
    )
  );
};

export const getDateFromDatetime = datetime => {
  let arr = datetime.split(" ");
  return arr[0];
};

export const getUserSchedule = (user, startDatetime, endDatetime) => {
  // UTC Date objects
  const startDate = getDateFromString(startDatetime);
  const endDate = getDateFromString(endDatetime);

  let dateArray = [];
  var currentDate = new Date(startDate);
  currentDate.setUTCHours(0, 0);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const userEvents = user.events.items.filter(
    event =>
      dateArray.includes(getDateFromDatetime(event.start_datetime)) ||
      dateArray.includes(getDateFromDatetime(event.end_datetime))
  );
  let busyTimes = [];
  userEvents.forEach(event => {
    let startString = getStringFromDate(startDate);
    let endString = getStringFromDate(endDate);
    if (
      event.start_datetime.localeCompare(endString) < 0 &&
      event.end_datetime.localeCompare(startString) > 0
    ) {
      busyTimes.push([
        event.start_datetime.localeCompare(startString) > 0
          ? event.start_datetime
          : startString,
        event.end_datetime.localeCompare(endString) < 0
          ? event.end_datetime
          : endString
      ]);
    }
  });
  return busyTimes;
};

export const suggestTimes = (users, startDatetime, endDatetime) => {
  let allTimes = [];
  for (let i = 0; i < users.length; i++) {
    allTimes = allTimes.concat(
      getUserSchedule(users[i], startDatetime, endDatetime)
    );
  }
  allTimes.sort((a, b) => {
    return a.toString().localeCompare(b.toString());
  });

  let mergedTimes = [];
  while (allTimes.length > 0) {
    let lastIndex = mergedTimes.length - 1;
    let slot = allTimes.shift(); // Get first time slot
    if (mergedTimes.length > 0 && mergedTimes[lastIndex][1] >= slot[0]) {
      //If last time slot in merged ends after next slot starts
      mergedTimes[lastIndex][1] = Math.max(slot[1], mergedTimes[lastIndex][1]); //Merge slots
    } else {
      mergedTimes.push(slot);
    }
  }
  let freeTimes = [];
  if (mergedTimes.length > 0) {
    if (startDatetime != mergedTimes[0][0]) {
      freeTimes.push([startDatetime, mergedTimes[0][0]]);
    }
    for (var i = 0; i < mergedTimes.length - 1; i++) {
      freeTimes.push([mergedTimes[i][1], mergedTimes[i + 1][0]]);
    }
    if (mergedTimes[mergedTimes.length - 1][1] != endDatetime) {
      freeTimes.push([mergedTimes[mergedTimes.length - 1][1], endDatetime]);
    }
  } else {
    freeTimes.push([startDatetime, endDatetime]);
  }
  return freeTimes;
};


describe("Test for getUserSchedule", () => {
  it("retrieves the user's schedule", () => {

    let testUser = { data: {
        "email": "testuser@yahoo.com",
        "events": {
          "items": [
            {
              "id": "1",
              "end_datetime": "2021-04-26 01:00",
              "start_datetime": "2021-04-26 00:00"
            },
          ]
        }
      }};
    
    let busyTimes = getUserSchedule(testUser.data, "2021-04-26 00:00", "2021-04-26 23:59")
    expect(busyTimes[0]).toEqual(['2021-04-26 00:00', '2021-04-26 01:00']);
  });
});


describe("Test for suggestTimes", () => {
  it("returns available times for all users", () => {

    let testUser = { data: {
        "email": "testuser@yahoo.com",
        "events": {
          "items": [
            {
              "id": "1",
              "end_datetime": "2021-04-26 01:00",
              "start_datetime": "2021-04-26 00:00"
            },
          ]
        }
      }};

      let participant = { data: {
        "email": "participant@yahoo.com",
        "events": {
          "items": [
            {
              "id": "2",
              "end_datetime": "2021-04-26 14:00",
              "start_datetime": "2021-04-26 12:00"
            },
          ]
        }
      }};
    
    let suggested = suggestTimes([testUser.data, participant.data], "2021-04-26 00:00", "2021-04-26 23:59")
    expect(suggested).toEqual([['2021-04-26 01:00', '2021-04-26 12:00'],
                              ['2021-04-26 14:00', '2021-04-26 23:59']]);
  });
});

