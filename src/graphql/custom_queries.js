export const getUsersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: AWSEmail
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        username
        first_name
        last_name
        dob
        location
        image_url
        avatar {
          bucket
          region
          key
        }
        pushToken
        events {
          items {
            id
            name
            start_datetime
            end_datetime
            image_url
            public
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        invited_events {
          items {
            eventID
            id
            senderID
          }
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
      nextToken
    }
  }
`;

export const listUsersShortened = /* GraphQL */ `
  query ListUsersShortened {
    listUsers {
      nextToken
      items {
        id
        username
        first_name
        last_name
      }
    }
  }
`;

export const listUsersWithEvents = /* GraphQL */ `
query ListUsersShortened {
  listUsers {
    nextToken
    items {
      id
      username
      first_name
      last_name
      events {
        items {
          id
          name
          start_datetime
          end_datetime
          image_url
          public
          description
          participants
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      invited_events {
        items {
          id
          userID
          eventID
          senderID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
}
`;

export const getUserFriendRequests = /* GraphQL */ `
query getUserFriendRequests($id: ID!) {
  getUser(id: $id) {
    friendRequests {
      items {
        id
        senderID
      }
    }
  }
}
`;

export const listEventsShortened = /* GraphQL */ `
  query ListEventsShortened {
    listEvents {
      nextToken
      items {
        id
        name
        date
        start_time
        end_time
        location
        image_url
        public
        userID
        user {
          id
          email
          username
          first_name
          last_name
          dob
          location
          image_url
        }
      }
    }
  }
`;

export const listEventsUpcoming = /* GraphQL */ `
  query ListEventsUpcoming {
    listEvents {
      nextToken
      items {
        id
        name
        date
        start_time
        end_time
        location
      }
    }
  }
`;