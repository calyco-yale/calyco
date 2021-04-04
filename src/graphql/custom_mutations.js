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
  mutation CreateEvent($userId: ID!, $public: Boolean!, $image_url: String, $location: String, $end_time: AWSTime!, $start_time: AWSTime!, $date: AWSDate!, $name: String!) {
    CreateEvent($userId: ID!, $public: Boolean!, $image_url: String, $location: String, $end_time: AWSTime!, $start_time: AWSTime!, $date: AWSDate!, $name: String!) {
      id
    }
  }
`;