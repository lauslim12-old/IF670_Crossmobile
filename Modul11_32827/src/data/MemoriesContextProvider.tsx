import { ReactNode, useEffect, useState } from 'react';
import { getMemories } from '../firebase';

import MemoriesContext, { Memory } from './memories-context';

const MemoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    getMemories()
      .then((res) => setMemories(res))
      .catch((err) => console.error(err));
  }, []);

  const addMemory = (
    imageUrl: string,
    title: string,
    type: 'good' | 'bad',
    lat: number,
    lng: number
  ) => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      imageUrl,
      title,
      type,
      lat,
      lng,
    };

    setMemories((currMemories) => [...currMemories, newMemory]);
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>{children}</MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
