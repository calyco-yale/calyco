/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      name
      dob
      location
      events {
        items {
          id
          name
          date
          start_time
          end_time
          location
          public
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendships {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendRequests {
        items {
          id
          userID
          senderID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      name
      dob
      location
      events {
        items {
          id
          name
          date
          start_time
          end_time
          location
          public
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendships {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendRequests {
        items {
          id
          userID
          senderID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      name
      dob
      location
      events {
        items {
          id
          name
          date
          start_time
          end_time
          location
          public
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendships {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      friendRequests {
        items {
          id
          userID
          senderID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      date
      start_time
      end_time
      location
      public
      userID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      name
      date
      start_time
      end_time
      location
      public
      userID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      name
      date
      start_time
      end_time
      location
      public
      userID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFriendship = /* GraphQL */ `
  mutation CreateFriendship(
    $input: CreateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    createFriendship(input: $input, condition: $condition) {
      id
      userID
      friendID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFriendship = /* GraphQL */ `
  mutation UpdateFriendship(
    $input: UpdateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    updateFriendship(input: $input, condition: $condition) {
      id
      userID
      friendID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriendship = /* GraphQL */ `
  mutation DeleteFriendship(
    $input: DeleteFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    deleteFriendship(input: $input, condition: $condition) {
      id
      userID
      friendID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
      id
      userID
      senderID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
      id
      userID
      senderID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
      id
      userID
      senderID
      user {
        id
        email
        name
        dob
        location
        events {
          nextToken
        }
        friendships {
          nextToken
        }
        friendRequests {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
