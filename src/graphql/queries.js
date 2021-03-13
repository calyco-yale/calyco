/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
