/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      start_datetime
      end_datetime
      image_url
      avatar {
        bucket
        region
        key
      }
      public
      description
      participants
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
        avatar {
          bucket
          region
          key
        }
        pushToken
        events {
          nextToken
        }
        invited_events {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      start_datetime
      end_datetime
      image_url
      avatar {
        bucket
        region
        key
      }
      public
      description
      participants
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
        avatar {
          bucket
          region
          key
        }
        pushToken
        events {
          nextToken
        }
        invited_events {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      start_datetime
      end_datetime
      image_url
      avatar {
        bucket
        region
        key
      }
      public
      description
      participants
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
        avatar {
          bucket
          region
          key
        }
        pushToken
        events {
          nextToken
        }
        invited_events {
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
export const onCreateInvite = /* GraphQL */ `
  subscription OnCreateInvite {
    onCreateInvite {
      id
      userID
      eventID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
export const onUpdateInvite = /* GraphQL */ `
  subscription OnUpdateInvite {
    onUpdateInvite {
      id
      userID
      eventID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
export const onDeleteInvite = /* GraphQL */ `
  subscription OnDeleteInvite {
    onDeleteInvite {
      id
      userID
      eventID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship {
    onCreateFriendship {
      id
      userID
      friendID
      user {
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
          nextToken
        }
        invited_events {
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
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship {
    onUpdateFriendship {
      id
      userID
      friendID
      user {
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
          nextToken
        }
        invited_events {
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
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship {
    onDeleteFriendship {
      id
      userID
      friendID
      user {
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
          nextToken
        }
        invited_events {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest {
    onCreateFriendRequest {
      id
      userID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest {
    onUpdateFriendRequest {
      id
      userID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest {
    onDeleteFriendRequest {
      id
      userID
      senderID
      user {
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
          nextToken
        }
        invited_events {
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
