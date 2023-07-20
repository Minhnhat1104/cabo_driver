import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeKeyData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`<<store>> ${key} --- ${value}`);
  } catch (e) {
    // saving error
    console.log('Storing local data error!');
    return null;
  }
};

export const deleteKeyData = async (key: string, callback?: () => void) => {
  try {
    await AsyncStorage.removeItem(key, callback);
    console.log(`<<delete>> ${key}`);
  } catch (e) {
    // saving error
    console.log('Delete local data error!');
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

export const moneyFormat = (amount: number = 0) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
