import { createContext } from 'react';

export interface Memory {
  id: string;
  imageUrl?: string;
  title: string;
  type: 'good' | 'bad';
  lat: number;
  lng: number;
}

const MemoriesContext = createContext<{
  memories: Memory[];
  addMemory: (
    imageUrl: string,
    title: string,
    type: 'good' | 'bad',
    lat: number,
    lng: number
  ) => void;
}>({
  memories: [],
  addMemory: () => {},
});

export default MemoriesContext;
