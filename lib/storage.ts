import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Type, Expose, Transform, plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import "reflect-metadata";
import { getCurrentDateAndDayOfWeekInTimeZone } from './get_data';

export enum HabitType {
    Daily,
    Weekly,
    Monthly
}

export const habitTypeIntToString = (type: number) => {
    switch (type) {
        case 0:
            return 'Daily'
        case 1:
            return 'Weekly'
        case 2:
            return 'Monthly'
        default:
            return 'Daily'
    }
}

export const habitTypeStringToInt = (type: string) => {
    switch (type) {
        case 'Daily':
            return 0
        case 'Weekly':
            return 1
        case 'Monthly':
            return 2
        default:
            return 0
    }

}

export class Habit {
    id: string // uuid
    userId: string
    name: string
    startDate: string
    endDate: string
    creatorId: string
    everyCount: number
    type: number // 0 daily 1 weekly 2 monthly
    showsDays: number[] // 0 星期天 1 星期一 2 星期二 3 星期三 4 星期四 5 星期五 6 星期六

    @Transform(value => {
        let map = new Map<string, Record>();
        for (let entry of Object.entries(value.value))
            map.set(entry[0], plainToClass(Record, entry[1]));
        return map;
    }, { toClassOnly: true })
    records: Map<string, Record>
    createTime: Date
    icon: string
    states: number // 0 active 1 inactive 2 pause
}

export class Record {
    @Expose()
    clickCount: number
}

// user to all habits key
const userHabitsKey = 'userHabits12'


const habitCheck = (habit: Habit) => {
    if (habit.startDate > habit.endDate) {
        throw new Error('startDate should be less than endDate')
    }
    if (habit.name === '' || habit.name === undefined) {
        throw new Error('name should not be empty')
    }
    if (habit.everyCount <= 0) {
        throw new Error('everyCount should be greater than 0')
    }
    if (habit.showsDays.length > 7) {
        throw new Error('showsDays should be less than 7')
    }
    if (habit.type < 0 || habit.type > 2) {
        throw new Error('type should be 0, 1 or 2')
    }
    if (habit.icon === '' || habit.icon === undefined) {
        throw new Error('icon should not be empty')
    }
}

export const addHabit = async (habit: Habit) => {
    habitCheck(habit)
    

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

        // sort
        habits.sort((a, b) => {
            return a.createTime > b.createTime ? 1 : -1
        })

        return habits
    } catch (e) {
        console.log(e);
        throw e
    }
}

export const updateHabit = async (habit: Habit) => {
    habitCheck(habit)
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

export const transRecordToCommitsData = (habit: Habit) => {
    let data = []
    if (habit.records === undefined) {
        data.push({ date: '2024-06-08', count: 1 })
        return data
    }
    for (let [key, value] of habit.records) {
        data.push({ date: key, count: value.clickCount })
    }
    
    return data
}
