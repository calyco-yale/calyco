import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly dob?: string;
  readonly location?: string;
  readonly events?: (Event | null)[];
  readonly friendships?: (Friendship | null)[];
  readonly friendRequests?: (FriendRequest | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Event {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly start_time: string;
  readonly end_time: string;
  readonly location?: string;
  readonly public: boolean;
  readonly user: User;
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

export declare class Friendship {
  readonly id: string;
  readonly friendID: string;
  readonly user: User;
  constructor(init: ModelInit<Friendship>);
  static copyOf(source: Friendship, mutator: (draft: MutableModel<Friendship>) => MutableModel<Friendship> | void): Friendship;
}

export declare class FriendRequest {
  readonly id: string;
  readonly senderID: string;
  readonly user: User;
  constructor(init: ModelInit<FriendRequest>);
  static copyOf(source: FriendRequest, mutator: (draft: MutableModel<FriendRequest>) => MutableModel<FriendRequest> | void): FriendRequest;
}