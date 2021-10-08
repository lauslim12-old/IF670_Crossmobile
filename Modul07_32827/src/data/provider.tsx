import { ReactNode, useState } from 'react';
import FriendContext, { Friend } from './context';

const FriendProviderContext = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 'f1',
      name: 'John Thor',
      avatar:
        'https://static.wikia.nocookie.net/swordartonline/images/d/d4/Alice_Synthesis_Thirty.png',
    },
    {
      id: 'f2',
      name: 'John Ness',
      avatar: 'https://i.pinimg.com/originals/4d/91/8f/4d918fa11977eced737ed20a191ad4cb.jpg',
    },
    {
      id: 'f3',
      name: 'John Doe',
      avatar: 'https://avatarfiles.alphacoders.com/258/thumb-1920-258123.jpg',
    },
  ]);

  const addFriend = (name: string, avatar: string) => {
    const newFriend: Friend = {
      id: Math.random().toString(),
      name,
      avatar,
    };

    setFriends([...friends, newFriend]);
  };

  const updateFriend = (id: string, name: string) => {
    const friendIdx = friends.findIndex((friend) => friend.id === id);
    const newFriends = [...friends];

    newFriends[friendIdx].name = name;
    setFriends(newFriends);
  };

  const deleteFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <FriendContext.Provider value={{ friends, addFriend, updateFriend, deleteFriend }}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendProviderContext;
