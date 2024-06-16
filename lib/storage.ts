import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('my-key', value);
    } catch (e) {
        // saving error
    }
};

const storeData2 = async (value: string) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
        // saving error
    }
};
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('my-key');
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
};

const getData2 = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};