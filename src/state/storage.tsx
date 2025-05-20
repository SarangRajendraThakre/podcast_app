import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'my-app-storage',
  encryptionKey: 'some_secret_key', // Be cautious with this in production!
});

export const mmkvStorage = {
  setItem: (key: string, value: string): void => {
    storage.set(key, value);
  },
  getItem: (key: string): string | null => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string): void => {
    storage.delete(key);
  },
};
