import React from "react";
import AppBase from "./base_components/AppBase";
import UserComponent from "./components/User";
import global from './global';
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { getUser, getusersByEmail, getEvent } from "../src/graphql/queries";
import { createSimpleFriendship, deleteFriendshipById } from "../src/graphql/custom_mutations";
import { getUsersByEmail } from "../src/graphql/custom_queries";

export const retrieveOffset = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  // console.log(date);
  // console.log(offset);
  global.offset = offset;
  return offset;
}

//sign for whether the user is recieving or sending time requests
export const getCorrectTime = (date, sign) => {
  const offset = global.offset;
  var currDate = new Date(date);
  currDate.setMinutes(currDate.getMinutes() + (sign)*offset);
  return new Date(currDate);
}

import * as Notifications from 'expo-notifications';

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
  for (let i = 0; i < invitedEventIds.length; i++) {
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

// Helper function to get a user's busy times for a date
export const getUserSchedule = (user, date) => {
  const userEvents = user.events.items.filter(event => event.date == date);
  let busyTimes = [];
  userEvents.forEach(event => {
    busyTimes.push([event.start_time, event.end_time]);
  });
  return busyTimes;
};

//  Helper function to suggest user available times for a date
export const suggestTimes = (users, date) => {
  let allTimes = []; //Merge all users' busy times together
  users.forEach(user => {
    allTimes = allTimes.concat(getUserSchedule(user, date));
  });
  allTimes.sort((a, b) => {
    return a.toString().localeCompare(b.toString());
  }); //Sort time intervals by starting time
  let mergedTimes = [];
  while (allTimes.length > 0) {
    let lastIndex = mergedTimes.length - 1;
    let slot = allTimes.shift(); // Get first time slot
    if (mergedTimes.length > 0 && mergedTimes[lastIndex][1] >= slot[0]) {
      //If last time slot in merged ends after next slot starts
      mergedTimes[lastIndex][1] = max(slot[1], mergedTimes[lastIndex][1]); //Merge slots
    } else {
      mergedTimes.push(slot);
    }
  }
  //Get free time intervals
  let freeTimes = [];
  for (var i = 0; i < mergedTimes.length - 1; i++) {
    freeTimes.push([mergedTimes[i][1], mergedTimes[i + 1][0]]);
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
