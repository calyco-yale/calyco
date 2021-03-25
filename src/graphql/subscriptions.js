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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendships {
        items {
          id
          userID
          friendID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendRequests {
        items {
          id
          userID
          senderID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendships {
        items {
          id
          userID
          friendID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendRequests {
        items {
          id
          userID
          senderID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendships {
        items {
          id
          userID
          friendID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      friendRequests {
        items {
          id
          userID
          senderID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
      date
      start_time
      end_time
      location
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
      date
      start_time
      end_time
      location
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
      date
      start_time
      end_time
      location
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        events {
          nextToken
          startedAt
        }
        friendships {
          nextToken
          startedAt
        }
        friendRequests {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
