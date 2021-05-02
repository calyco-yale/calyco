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

export const getFriends = async friendships => {
  let friends = [];
  for (let i = 0; i < friendships.length; i++) {
    try {
      const friendData = await API.graphql(
        graphqlOperation(getUser, { id: friendships[i].friendID })
      );
      friends.push(friendData.data.getUser);
    } catch (e) {
      console.log(e);
    }
  }
  return friends;
};
