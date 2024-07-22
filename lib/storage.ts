import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Type, Expose, Transform, plainToClass, plainToInstance, instanceToPlain } from 'class-transformer';
import "reflect-metadata";
import { getCurrentDateAndDayOfWeekInTimeZone } from './get_data';
import { Alert } from 'react-native';
import { getLanguageCode } from './languageHandler'


export enum HabitType {
    Daily,
    Weekly,
    Monthly
}

export enum HabitDisplay {
    Show, // 0
    Hide, // 1
    All // 2
}

export const habitTypeIntToString = (type: number) => {
    switch (type) {
        case 0:
            return 'daily'
        case 1:
            return 'weekly'
        case 2:
            return 'monthly'
        default:
            return 'daily'
    }
}

export const habitDisplayIntToString = (display: number) => {
    switch (display) {
        case 0:
            return 'show'
        case 1:
            return 'hide'
        case 2:
            return 'all'
        default:
            return 'show'
    }

}


export const habitTypeStringToInt = (type: string) => {
    switch (type) {
        case 'daily':
            return 0
        case 'weekly':
            return 1
        case 'monthly':
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

    constructor(clickCount: number) {
        this.clickCount = clickCount
    }
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
    try {
        habitCheck(habit)

        let habitId = uuid.v4('string')
        if (typeof habitId === 'string') {
            habit.id = habitId
        }

        // 将habit存入单独的文件， key是habitId
        let habitJson = JSON.stringify(instanceToPlain(habit))
        await setData(habit.id.toString(), habitJson)

        // 将habitId存入userHabits
        let allhabitsId = await getData(userHabitsKey)
        let userHabits = allhabitsId ? JSON.parse(allhabitsId) : []
        userHabits.push(habitId)
        await setData(userHabitsKey, JSON.stringify(userHabits))
    } catch (error) {
        Alert.alert('Error', 'Failed to add habit' + error)
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
    try {
        habitCheck(habit)
        let habitJson = JSON.stringify(instanceToPlain(habit))
        await setData(habit.id.toString(), habitJson)
    } catch (error) {
        Alert.alert('Error', 'Failed to update habit' + error) //todo 翻译成中文
        throw error
    }
}

// setting
const settingKey = 'setting1'

export class Setting {
    language: string
}

export const getSetting = async () => {
    try {
        let settingJson = await getData(settingKey)

        if (settingJson === null) {
            let setting = new Setting()
            setting.language = getLanguageCode('English')
            await updateSetting(setting)
            return setting
        }

        let setting: Setting = plainToInstance(Setting, JSON.parse(settingJson || ""))
        return setting
    } catch (e) {
        console.log(e);
        throw e
    }
}

export const getSettingLanguageCode = async () => {
    try {
        const setting = await getSetting();
        return setting.language
    } catch (e) {
        console.log(e);
        return 'en'
    }
}

export const updateSetting = async (setting: Setting) => {
    try {
        let settingJson = JSON.stringify(instanceToPlain(setting))
        await setData(settingKey, settingJson)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const updateSettingLanguage = async (language: string) => {
    try {
        let setting = await getSetting()
        setting.language = language
        await updateSetting(setting)
    } catch (e) {
        console.log(e)
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


export const calculateCompletedDays = (habit: Habit) => {
    if (habit.records === undefined) {
        return 0
    }
    const recordArray = Array.from(habit.records.values());
    return recordArray.filter((record) => record.clickCount >= habit.everyCount).length;
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
