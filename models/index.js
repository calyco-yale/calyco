// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Event, Friendship, FriendRequest } = initSchema(schema);

export {
  User,
  Event,
  Friendship,
  FriendRequest
};