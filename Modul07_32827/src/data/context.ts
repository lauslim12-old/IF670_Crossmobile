import { createContext } from 'react';

export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface Context {
  friends: Friend[];
  addFriend: (friendName: string, friendAvatar: string) => void;
  updateFriend: (id: string, name: string) => void;
  deleteFriend: (id: string) => void;
}

const FriendContext = createContext<Context>({
  friends: [],
  addFriend: () => {},
  updateFriend: () => {},
  deleteFriend: () => {},
});

export default FriendContext;
