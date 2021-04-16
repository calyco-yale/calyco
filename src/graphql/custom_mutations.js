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
  mutation CreateEvent($userId: ID!, $public: Boolean!, $image_url: String, $location: String, $end_datetime: AWSTime!, $start_datetime: AWSTime!, $date: AWSDate!, $name: String!) {
    createEvent(input: {userID: $userId, public: $public, image_url: $image_url, location: $location, end_datetime: $end_datetime, start_datetime: $start_datetime, name: $name}) {
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