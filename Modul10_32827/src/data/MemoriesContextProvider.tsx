import { ReactNode, useState } from 'react';
import MemoriesContext, { Memory } from './memories-context';

const MemoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  const addMemory = (
    path: string,
    base64Url: string,
    title: string,
    type: 'good' | 'bad',
    lat: number,
    lng: number
  ) => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      title,
      type,
      imagePath: path,
      base64Url: base64Url,
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
