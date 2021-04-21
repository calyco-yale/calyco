export const deleteFriendRequestById = /* GraphQL */ `
  mutation DeleteFriendRequest($id: ID!) {
    deleteFriendRequest(input: {id: $id}) {
      id
    }
  }
`;

export const deleteFriendshipById = /* GraphQL */ `
  mutation DeleteFriendship($id: ID!) {
    deleteFriendship(input: {id: $id}) {
      id
    }
  }
`;

export const createSimpleFriendship = /* GraphQL */ `
  mutation CreateFriendship($friendId: ID!, $userId: ID!) {
    createFriendship(input: {friendID: $friendId, userID: $userId}) {
      id
    }
  }
`;

export const createSimpleFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest($userId: ID!, $senderId: ID!) {
    createFriendRequest(input: {userID: $userId, senderID: $senderId}) {
      id
    }
  }
`;

export const createEvent = /* GraphQL */ `
  mutation CreateEvent($userId: ID!, $public: Boolean!, $image_url: String, $end_datetime: String!, $start_datetime: String!, $name: String!, $description: String!, $participants: [String]) {
    createEvent(input: {userID: $userId, public: $public, image_url: $image_url, end_datetime: $end_datetime, start_datetime: $start_datetime, name: $name, description: $description, participants: $participants}) {
      id
    }
  }
`;

export const deleteEvent = /* GraphQL */ `
mutation DeleteEvent($id: ID!) {
  deleteEvent(input: {id: $id}) {
    id
  }
}
`;

export const createInvite = /* GraphQL */ `
  mutation CreateInvite($userId: ID!, $eventId: ID!, $senderId: ID!) {
    createInvite(input: {userID: $userId, eventID: $eventId, senderID: $senderId}) {
      id
    }
  }
`;

export const updateUser = /* GraphQL */ `
mutation UpdateUser($id: ID!, $image_url: String!) {
  updateUser(input: {id: $id, image_url: $image_url}) {
    id
  }
}
`;