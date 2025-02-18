import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ChatDB extends DBSchema {
  messages: {
    key: string;
    value: ChatMessage;
    indexes: { 'by-timestamp': Date };
  };
}

const initDB = async () => {
  const db = await openDB<ChatDB>('chat-db', 1, {
    upgrade(db) {
      const messageStore = db.createObjectStore('messages', {
        keyPath: 'id'
      });
      messageStore.createIndex('by-timestamp', 'timestamp');
    },
  });
  return db;
};

export const saveMessage = async (message: ChatMessage) => {
  const db = await initDB();
  await db.add('messages', message);
};

export const getMessages = async () => {
  const db = await initDB();
  return db.getAllFromIndex('messages', 'by-timestamp');
}; 