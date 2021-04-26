import React from "react";
import AppBase from "./base_components/AppBase";
import UserComponent from "./components/User";
import global from './global';
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { getUser, getEvent, listEvents } from "../src/graphql/queries";
import { createSimpleFriendship, deleteFriendshipById, deleteEvent, updateUser } from "../src/graphql/custom_mutations";
import { getUsersByEmail, listUsersShortened } from "../src/graphql/custom_queries";
import * as Notifications from 'expo-notifications';

export const retrieveOffset = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  global.offset = offset;
  return offset;
}

//sign for whether the user is receiving or sending time requests
export const getUTCTime = (date) => {
  const offset = global.offset;
  var new_string = date.substring(0, 10) + "T" + date.substring(11, 16) + ":00";
  var currDate = new Date(new_string);
  var curr_string = currDate.toISOString();
  var new_string = curr_string.substring(0, 10) + " " + curr_string.substring(11, 16);
  return new_string;
}

export const convertLocalTime = (date) => {
  const offset = global.offset;
  var new_string = date.substring(0, 10) + "T" + date.substring(11, 16) + ":00";
  var currDate = new Date(new_string);
  currDate.setMinutes(currDate.getMinutes() - offset);
  var curr_month = currDate.getMonth() + 1;
  var curr_date = currDate.getDate();
  var curr_year = currDate.getFullYear();
  var curr_hour = currDate.getHours();
  var curr_minute = currDate.getMinutes();
  var temp_curr_date = curr_date;
  var temp_curr_month = curr_month;
  var temp_curr_hour = curr_hour;
  var temp_curr_minute = curr_minute;
  if (curr_date < 10) {
    temp_curr_date = "0" + curr_date.toString();
  }

  if (curr_month < 10) {
    temp_curr_month = "0" + curr_month.toString();
  }

  if (curr_hour < 10) {
    temp_curr_hour = "0" + curr_hour.toString();
  }

  if (curr_minute < 10) {
    temp_curr_minute = "0" + curr_minute.toString();
  }
  var new_string = curr_year + "-" + temp_curr_month + "-" + temp_curr_date + " " + temp_curr_hour + ":" + temp_curr_minute;
  return new_string;
}

// Get currently logged in user
export const getloggedInUser = async () => {
  const { attributes } = await Auth.currentAuthenticatedUser();
  // Get user with attributes.email
  const res = await API.graphql(graphqlOperation(getUsersByEmail, { email: attributes.email }))
  try {
    const loggedInUser = res.data.usersByEmail.items[0];
    return loggedInUser;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// Helper function to get user's invited events
export const getInvitedEvents = async(user) => {
  let invitedEventData = user.invited_events.items
  let events = [];
  for (let i = 0; i < invitedEventData.length; i++) {
    try {
      const eventData = await API.graphql(
        graphqlOperation(getEvent, { id: invitedEventData[i].eventID })
      );
      events.push(eventData.data.getEvent);
    } catch (e) {
      console.log(e);
    }
  }
  return events;
};


export const getDateFromDatetime = (datetime) => {
  let arr = datetime.split(' ')
  return arr[0]
};

export const getDateFromString = (datetimeString) => {
  return new Date(Date.UTC(datetimeString.substring(0, 4), datetimeString.substring(5, 7)-1, datetimeString.substring(8, 10), datetimeString.substring(11, 13), datetimeString.substring(14, 16)))
}

export const getStringFromDate = (date) => {
  const iso = date.toISOString()
  return iso.substring(0, 10) + " " + iso.substring(11, 16)
}

// Helper function to get a user's busy times during a given interval
export const getUserSchedule = (user, startDatetime, endDatetime) => {
  // UTC Date objects
  const startDate = getDateFromString(startDatetime)
  const endDate = getDateFromString(endDatetime)

  let dateArray = []
  var currentDate = new Date(startDate);
  currentDate.setUTCHours(0, 0)

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().substring(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const userEvents = user.events.items.filter(event => dateArray.includes(getDateFromDatetime(event.start_datetime)) || dateArray.includes(getDateFromDatetime(event.end_datetime)));
  let busyTimes = [];
  userEvents.forEach(event => {
    let startString = getStringFromDate(startDate)
    let endString = getStringFromDate(endDate)
    if (event.start_datetime.localeCompare(endString) < 0 && event.end_datetime.localeCompare(startString) > 0) {
      busyTimes.push([((event.start_datetime.localeCompare(startString) > 0) ? event.start_datetime : startString), ((event.end_datetime.localeCompare(endString) < 0) ? event.end_datetime : endString)]);
    }
  });
  return busyTimes;
};

//  Helper function to suggest user available times for a date
export const suggestTimes = (users, startDatetime, endDatetime) => {
  let allTimes = []; 
  //Merge all users' busy times together
  for (let i = 0; i < users.length; i++) {
    allTimes = allTimes.concat(getUserSchedule(users[i], startDatetime, endDatetime));
  }
  //Sort time intervals by starting time
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
  //Get free time intervals
  let freeTimes = [];
  if (mergedTimes.length > 0){
    if (startDatetime != mergedTimes[0][0]) {freeTimes.push([startDatetime, mergedTimes[0][0]])}
    for (var i = 0; i < mergedTimes.length - 1; i++) {
      freeTimes.push([mergedTimes[i][1], mergedTimes[i + 1][0]]);
    }
    if (mergedTimes[mergedTimes.length-1][1] != endDatetime) {freeTimes.push([mergedTimes[mergedTimes.length-1][1], endDatetime])}
  } else {
    freeTimes.push([startDatetime, endDatetime])
  }
  return freeTimes;
};

// Helper function to get user's friends given friendships object
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

// Helper function to get user's friend requests given user's friendRequests object
export const getFriendRequests = async friendRequests => {
  let requests = [];
  for (let i = 0; i < friendRequests.length; i++) {
    try {
      const requestData = await API.graphql(
        graphqlOperation(getUser, { id: friendRequests[i].senderID })
      );
      requests.push({
        requestId: friendRequests[i].id,
        sender: requestData.data.getUser
      });
    } catch (e) {
      console.log(e);
    }
  }
  return requests;
};

// Create friendship (two friendship objects) for users with given ids
export const createMutualFriendship = async (user1Id, user2Id) => {
  try {
    await API.graphql(
      graphqlOperation(createSimpleFriendship, {
        friendId: user1Id,
        userId: user2Id
      })
    );
    await API.graphql(
      graphqlOperation(createSimpleFriendship, {
        friendId: user2Id,
        userId: user1Id
      })
    );
  } catch (e) {
    console.log(e);
  }
};

// Delete friendship (two friendship objects) for users with given ids
export const deleteMutualFriendship = async (user1, user2) => {
  try {
    const friendship1 = isFriend(user1, user2);
    await API.graphql(
      graphqlOperation(deleteFriendshipById, { id: friendship1 })
    );
    const friendship2 = isFriend(user2, user1);
    await API.graphql(
      graphqlOperation(deleteFriendshipById, { id: friendship2 })
    );
  } catch (e) {
    console.log(e);
  }
};

// Check if given user is friend of logged in user
// Return friendship id if friend, null otherwise
export const isFriend = (loggedInUser, user) => {
  const friendships = loggedInUser.friendships.items;
  for (let i = 0; i < friendships.length; i++) {
    if (friendships[i].friendID == user.id) {
      return friendships[i].id;
    }
  }
  return null;
};

// Check if logged in user has sent friend request to given user
// Return friend request id if requested, null otherwise
export const sentFriendRequest = (loggedInUser, user) => {
  const requests = user.friendRequests.items;
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].senderID == loggedInUser.id) {
      return requests[i].id;
    }
  }
  return null;
};

// Check if logged in user has sent friend request to given user
// Return friend request id if requested, null otherwise
export const receivedFriendRequest = (loggedInUser, user) => {
  const requests = loggedInUser.friendRequests.items;
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].senderID == user.id) {
      return requests[i].id;
    }
  }
  return null;
};

// Helper functions for flatlist when displaying users
export const renderUserItem = ({ item }) =>
  <UserComponent key={item.id} userItem={item} />;

export const userItemSeparator = () => {
  return (
    <AppBase
      style={{
        height: 10,
        width: "100%"
      }}
    />
  );
};

// Sends a friend notification to the device associated with expoPushToken
export const sendFriendNotification = async (expoPushToken) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Calyco',
    body: 'You have a pending friend request!',
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const deleteAllEvents = async() => {
  const events = await API.graphql(graphqlOperation(listEvents));
  console.log(events)
  const eventIds = events.data.listEvents.items.map(e => e.id)
  for (let i = 0; i < eventIds.length; i++){
    await API.graphql(graphqlOperation(deleteEvent, {id: eventIds[i] }))
  }
};

export const updateUserImages = async() => {
  const userData = await API.graphql(graphqlOperation(listUsersShortened));
  const users = userData.data.listUsers.items
  for (let i=0; i < users.length; i++){
    await API.graphql(graphqlOperation(updateUser, { id: users[i].id, image_url: "#54d05d" }))
  }
}
