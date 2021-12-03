import path from 'path';

import { initializeApp } from 'firebase/app';
import { doc, collection, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { Memory } from '../data/memories-context';

const getApp = () =>
  initializeApp({
    apiKey: 'AIzaSyDHsNG1jImfb2uc_5daQ7tJxI2tPnpTMcE',
    authDomain: 'if670-m11.firebaseapp.com',
    projectId: 'if670-m11',
    storageBucket: 'if670-m11.appspot.com',
    messagingSenderId: '407508499747',
    appId: '1:407508499747:web:3cbda881e3057fb8e1a096',
  });

const firestore = () => getFirestore(getApp());

const storage = () => getStorage(getApp());

export const getMemories = async () => {
  const memories: Memory[] = [];

  try {
    const q = query(collection(firestore(), 'memories'));
    const snapshots = await getDocs(q);
    snapshots.forEach((doc) => memories.push(doc.data() as Memory));
  } catch (err) {
    throw err;
  }

  return memories;
};

export const createMemory = async (newMenu: Memory, file: File): Promise<Memory> => {
  const filename = `${Math.random()}.${path.extname(file.name)}`;

  // upload memory picture
  try {
    await uploadBytes(ref(storage(), `memories/${filename}`), file);
  } catch (err) {
    throw err;
  }

  // get upload url
  try {
    newMenu.imageUrl = await getDownloadURL(ref(storage(), `memories/${filename}`));
  } catch (err) {
    throw err;
  }

  // upload memory data
  try {
    await setDoc(doc(firestore(), 'memories', newMenu.id), newMenu);
  } catch (err) {
    throw err;
  }

  return newMenu;
};
