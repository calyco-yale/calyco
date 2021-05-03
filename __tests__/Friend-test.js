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


describe("Test for isFriend", () => {
  it("checks if user is friend of loggedInUser", () => {
    let loggedInUser = {
      "id": "1",
      "username": "loggedInTest",
      "friendships": {
        "items": [
          {
            "id": "1",
            "friendID": "2"
          }
        ]
      }
    };

    let user = {
      "id": "2"
    };

    let res = isFriend(loggedInUser, user)
    expect(res).toEqual("1");
  });
});

describe("Test for sentFriendRequest", () => {
  it("checks if friend request sent to user from loggedInUser", () => {
    let user = {
      "id": "1",
      "username": "userTest",
      "friendRequests": {
        "items": [
          {
            "id": "1",
            "senderID": "2"
          }
        ]
      }
    };

    let loggedInUser = {
      "id": "2"
    };

    let res = sentFriendRequest(loggedInUser, user)
    expect(res).toEqual("1");

  });
});

describe("Test for receivedFriendRequest", () => {
  it("checks if friend request sent to user from loggedInUser", () => {
    let loggedInUser = {
      "id": "1",
      "username": "loggedInTest",
      "friendRequests": {
        "items": [
          {
            "id": "1",
            "senderID": "2"
          }
        ]
      }
    };

    let user = {
      "id": "2"
    };

    let res = receivedFriendRequest(loggedInUser, user)
    expect(res).toEqual("1");
  });
});

