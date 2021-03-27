import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/graphql/queries';

// Helper function to get user's friends given a user object
export const getFriends = async(friendships) => {
  let friends = []
  for (let i = 0; i < friendships.length; i++) {
    try {
      const friendData = await API.graphql(graphqlOperation(getUser, { id: friendships[i].friendID}))
      friends.push(friendData.data.getUser)
    } catch (e) {
      console.log(e);
    }
  }
  return friends
};
