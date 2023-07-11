import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeKeyData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`<<store>> ${key} --- ${value}`);
  } catch (e) {
    // saving error
    console.log('Storing local data error!');
    return null;
  }
};

export const getKeyData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`<<get>> ${key} --- ${value}`);
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('Reading local data error!');
    return null;
  }
};
