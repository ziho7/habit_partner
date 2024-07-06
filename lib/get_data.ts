import { getCalendars } from 'expo-localization';
import { dateToDash } from './utils';
import { Habit, getAllHabits, HabitType } from './storage';

export const getHabitsByHabitType = async (habitType: HabitType) => {
    if (habitType === HabitType.Daily) {
        return getTodayHabits();
    }
    if (habitType === HabitType.Weekly) {
        return getWeekHabits();
    }
    if (habitType === HabitType.Monthly) {
        return getMonthHabits();
    }
}

export const getTodayHabits = async () => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = sortHabits(habits);

    return sortedHabits;
}

export const getWeekHabits = async () => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = sortHabits(habits);
    return sortedHabits;
}

export const getMonthHabits = async () => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = sortHabits(habits);
    return sortedHabits;
}

const sortHabits = function (habits: Habit[]) {
    const { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    let unfinishedList: Habit[] = []
    let finishedList: Habit[] = []
    for (let habit of habits) {

        // 不在制定日期内的habit不显示
        if (habit.startDate > currentDate || habit.endDate < currentDate) {
            continue
        }

        if ((habit.records.get(currentDate) ?? { clickCount: 0 }).clickCount < habit.everyCount) {
            unfinishedList.push(habit)
        } else {
            finishedList.push(habit)
        }
    }
    let res = [{
        "title": "unfinished",
        "data": unfinishedList,
    },
    {
        "title": "finished",
        "data": finishedList
    }]

    return res
}


new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(Date.now())

// todo 传值
export const getCurrentDateAndDayOfWeekInTimeZone = () => {
    const { timeZone } = getCalendars()[0];
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short', // "Monday", "Tuesday", etc.
        year: 'numeric',
        month: '2-digit', // "01", "02", etc.
        day: '2-digit', // "01", "02", etc.
        timeZone: timeZone || "", // Specify the timezone
    });

    const formattedDate = formatter.format(now).split(', ');
    const dayOfWeek = formattedDate[0]; // The day of the week
    const currentDate = dateToDash(formattedDate[1]);

    return { currentDate, dayOfWeek };
};


export const getTimeZone = () => {
    return getCalendars()[0].timeZone
}



// 一些工具函数
export const calTotalClickCount = (habit: Habit) => {
    if (habit.records === undefined) {
        return 0
    }
    const recordArray = Array.from(habit.records.values());
    return recordArray.reduce((acc, record) => acc + record.clickCount, 0);
}

export const calDaysLeft = (habit: Habit) => {
    const { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    const days = (new Date(habit.endDate).getTime() - new Date(currentDate).getTime()) / (1000 * 60 * 60 * 24)
    return Math.ceil(days)
}

export const currentStreak = (habit: Habit) => {
    let { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    let currentStreak = 0
    if (habit.records === undefined) {
        return 0
    }

    while (habit.records.has(dateToDash(currentDate))) {
        if (isHabitDone(habit, currentDate)) {
            currentStreak++
        } else {
            break
        }
        const currentDateYesterDay = new Date(currentDate).setDate(new Date(currentDate).getDate() - 1)
        currentDate = new Date(currentDateYesterDay).toISOString().slice(0, 10)
    }

    return currentStreak
}

export const bestStreak = (habit: Habit) => {
    if (habit.records === undefined) {
        return 0
    }
    let currentStrak = 0
    let bestStreak = 0
    let habitRecordsArray = Array.from(habit.records.keys());
    for (let i = 0; i < habitRecordsArray.length; i++) {
        if (isHabitDone(habit, habitRecordsArray[i])) {
            currentStrak++
        } else {
            bestStreak = Math.max(currentStrak, bestStreak)
            currentStrak = 0
        }
    }

    bestStreak = Math.max(currentStrak, bestStreak)

    return bestStreak
}

export const isHabitDone = (habit: Habit, date: string) => {
    if (habit.records === undefined) {
        return false
    }

    return habit.records.get(date)?.clickCount === habit.everyCount
}