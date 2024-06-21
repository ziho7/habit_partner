import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Type, Expose, Transform, plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import "reflect-metadata";

export class Habit {
    id: string // uuid
    userId: string
    name: string
    startDate: string
    endDate: string
    creatorId: string
    everyCount: number
    type: number // 0 daily 1 weekly 2 monthly
    showsDays: number[]

    @Transform(value => {
        let map = new Map<string, Record>();
        for (let entry of Object.entries(value.value))
            map.set(entry[0], plainToClass(Record, entry[1]));
        return map;
    }, { toClassOnly: true })
    records: Map<string, Record>
    createTime: Date
}

export class Record {
    @Expose()
    clickCount: number
}

// user to all habits key
const userHabitsKey = 'userHabits12'

export const addHabit = async (habit: Habit) => {
    let habitId = uuid.v4('string')
    if (typeof habitId === 'string') {
        habit.id = habitId
    }

    try {
        // 将habit存入单独的文件， key是habitId
        let habitJson = JSON.stringify(instanceToPlain(habit))
        await setData(habit.id.toString(), habitJson)

        // 将habitId存入userHabits
        let allhabitsId = await getData(userHabitsKey)
        let userHabits = allhabitsId ? JSON.parse(allhabitsId) : []
        userHabits.push(habitId)
        await setData(userHabitsKey, JSON.stringify(userHabits))
    } catch (error) {
        throw error
    }
}

export const getHabit = async function (habitId: string) {
    return getData(habitId).then((habitJson) => {
        let jsonData = JSON.parse(habitJson || "")
        let habit: Habit = plainToInstance(Habit, jsonData)

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

export const updateHabit = async (habit: Habit) => {
    try {
        let habitJson = JSON.stringify(instanceToPlain(habit))
        await setData(habit.id.toString(), habitJson)
    } catch (error) {
        throw error
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


export const calculateCompletedDays = (habit: Habit) => {
    if (habit.records === undefined) {
        return 0
    }
    const recordArray = Array.from(habit.records.values());
    return recordArray.filter((record) => record.clickCount > 0).length;
}