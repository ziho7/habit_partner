import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from './get_data';
import uuid from 'react-native-uuid';

// user to all habits key
const userHabitsKey = 'userHabits2'

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

export const getHabit = function (habitId: string) {
    return getData(habitId).then((habitJson) => {
        let habit: Habit = JSON.parse(habitJson || "")    
        return habit
    }).catch((e) => {
        console.log(e);
        throw e
    })
}

export const getAllHabits = async function () {
    try {
        let allhabitsId = await getData(userHabitsKey)
        let userHabits = allhabitsId ? JSON.parse(allhabitsId) : []
        let habits: Habit[] = []
        for (let habitId of userHabits) {
            let habit = await getHabit(habitId)
            habits.push(habit)
        }
        return habits
    } catch (e) {
        console.log(e);
        throw e
    }
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
