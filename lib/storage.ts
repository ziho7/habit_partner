import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from './get_data';
import uuid from 'react-native-uuid';
import {randomUUID} from 'crypto'

// user to all habits key
const userHabitsKey = 'userHabits'

export const addHabit = function (habit: Habit) {
    let habitId = uuid.v4('string')
    if (typeof habitId === 'string') {
        habit.id = habitId
    }
    
    // 将habit存入单独的文件， key是habitId
    let habitJson = JSON.stringify(habit)
    setData(habit.id.toString(), habitJson)

    // 将habitId存入userHabits
    getData(userHabitsKey).then((allhabitsId) => {
        let userHabits = allhabitsId ? JSON.parse(allhabitsId) : []
        userHabits.push(habitId)
        setData(userHabitsKey, JSON.stringify(userHabits))
    }).catch((e) => {
        console.log(e);
        throw e
    })
}




const setData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        throw e
    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value
    } catch (e) {
        throw e
    }
};
