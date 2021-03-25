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
