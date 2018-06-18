import { AsyncStorage } from 'react-native';

export default class StorageService {
  constructor () {
  }

  set (key, value) {
    return AsyncStorage.setItem(key, value);
  }

  async get (key) {
    return AsyncStorage.getItem(key);
  }

  remove (key) {
    return AsyncStorage.removeItem(key);
  }

  async multiGet (keys) {
    return AsyncStorage.multiGet(keys);
  }

  clear () {
    return AsyncStorage.getAllKeys()
    .then((keys) => {
      for (let i = 0; i < keys.length; i++) {
        this.remove(keys[i]);
      }
    });
  }
}
