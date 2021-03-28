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
