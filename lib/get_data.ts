import { getCalendars } from 'expo-localization';
import { dateToDash, getDatesOfMonth, getDatesOfWeek } from './utils';
import { Habit, getAllHabits, HabitType, HabitDisplay } from './storage';
import i18n from './i18n';


export const getClickCount = (habit: Habit, currentDate: string) => {
    if (habit.type === HabitType.Daily) {
        return getClickCountDaily(habit, currentDate)
    }
    if (habit.type === HabitType.Weekly) {
        return getClickCountWeekly(habit, currentDate)
    }
    if (habit.type === HabitType.Monthly) {
        return getClickCountMonthly(habit, currentDate)
    }

    return 0
}

const getClickCountDaily = (habit: Habit, currentDate: string) => {
    return Number(habit.records.get(dateToDash(currentDate))?.clickCount.toString() || '0')
}

const getClickCountWeekly = (habit: Habit, currentDate: string) => {
    let clickCount = 0
    getDatesOfWeek(currentDate).forEach((date: string) => {
        clickCount += Number(habit.records.get(dateToDash(date))?.clickCount.toString() || '0')
    })
    return clickCount
}

const getClickCountMonthly = (habit: Habit, currentDate: string) => {
    let clickCount = 0
    getDatesOfMonth(currentDate).forEach((date: string) => {
        clickCount += Number(habit.records.get(dateToDash(date))?.clickCount.toString() || '0')
    })
    return clickCount
}


export const getHabitsByHabitType = async (habitType: HabitType, habitDisplay: HabitDisplay) => {
    if (habitType === HabitType.Daily) {
        let res = await getTodayHabits(habitDisplay);
        return res
    }
    if (habitType === HabitType.Weekly) {
        let res = await getWeekHabits(habitDisplay);
        return res
    }
    if (habitType === HabitType.Monthly) {
        let res = await getMonthHabits(habitDisplay);
        return res
    }
}

export const getTodayHabits = async (habitDisplay: HabitDisplay) => {
    let res = await getAllHabits()
    let habits: Habit[] = res
    let sortedHabits = filterHabits(habits, HabitType.Daily, habitDisplay)

    return sortedHabits;
}

export const getWeekHabits = async (habitDisplay: HabitDisplay) => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = filterHabits(habits, HabitType.Weekly, habitDisplay);
    return sortedHabits;
}

export const getMonthHabits = async (habitDisplay: HabitDisplay) => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let filteredHabits = filterHabits(habits, HabitType.Monthly, habitDisplay);
    return filteredHabits;
}

const filterHabits = (habits: Habit[], habitType: HabitType = HabitType.Daily, habitDisplay: HabitDisplay) => {
    const { currentDate, dayOfWeek } = getCurrentDateAndDayOfWeekInTimeZone()
    let unfinishedList: Habit[] = []
    let finishedList: Habit[] = []
    for (let habit of habits) {
        // 不是这个类型的不显示
        if (habit.type !== habitType) {
            continue
        }

        // 不显示的星期不显示
        if (!needShow(habit, dayOfWeek, habitDisplay, currentDate)) {
            continue
        }

        // 不活跃的不显示
        if (habit.states != 0) {
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

    if (unfinishedList.length === 0 && finishedList.length === 0) {
        return []
    }

    return res
}

const needShow = (habit: Habit, dayOfWeek: string, habitDisplay: HabitDisplay, currentDate: string) => {
    // 不在制定日期内的habit
    if (!dateValid(habit, currentDate)) {
        if (habitDisplay === HabitDisplay.Expired) {
            return true
        }
        return false
    }

    if (habitDisplay === HabitDisplay.All) {
        return true
    }

    let hitShowPolicy = habit.showsDays.length !== 0 && habit.showsDays.includes(dayStringToNumber(dayOfWeek))
    if (habitDisplay === HabitDisplay.Show) {
        return hitShowPolicy
    }

    if (habitDisplay === HabitDisplay.Hide) {
        return !hitShowPolicy
    }

    return false
}

const dateValid = (habit: Habit, currentDate: string) => {
    return habit.startDate <= currentDate && habit.endDate >= currentDate
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
}


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

export const currentStreakClicked = (habit: Habit) => {
    let { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    let currentStreak = 0
    if (habit.records === undefined) {
        return 0
    }

    while (habit.records.has(dateToDash(currentDate))) {
        if (isHabitClicked2(habit, currentDate)) {
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
    let habitRecordsArray = Array.from(habit.records.keys()).sort()
    for (let i = 0; i < habitRecordsArray.length; i++) {
        if (isHabitDone(habit, habitRecordsArray[i]) && (i === 0 || currentStrak === 0 || daysDifference(habitRecordsArray[i - 1], habitRecordsArray[i]) === 1)) {
            currentStrak++
        } else {
            bestStreak = Math.max(currentStrak, bestStreak)
            currentStrak = 0
        }
    }

    bestStreak = Math.max(currentStrak, bestStreak)

    return bestStreak
}

export const bestStreakClicked = (habit: Habit) => {
    if (habit.records === undefined) {
        return 0
    }
    let currentStrak = 0
    let bestStreak = 0
    let habitRecordsArray = Array.from(habit.records.keys()).sort()
    for (let i = 0; i < habitRecordsArray.length; i++) {
        if (isHabitClicked2(habit, habitRecordsArray[i]) && (i === 0 || currentStrak === 0 || daysDifference(habitRecordsArray[i - 1], habitRecordsArray[i]) === 1)) {
            currentStrak++
        } else {
            bestStreak = Math.max(currentStrak, bestStreak)
            currentStrak = 0
        }
    }

    bestStreak = Math.max(currentStrak, bestStreak)

    return bestStreak
}

// date1 = '2024-07-12' date2 = '2024-07-15' res = 3
const daysDifference = (date1: string, date2: string) => {
    return Math.floor((new Date(date2).getTime() - new Date(date1).getTime()) / (1000 * 60 * 60 * 24))
}

export const isHabitDone = (habit: Habit, date: string) => {
    if (habit.records === undefined || habit.records.get(date) === undefined) {
        return false
    }

    return habit.records.get(date)!.clickCount >= habit.everyCount
}


export const isHabitClicked = (habit: Habit, date: string) => {
    if (habit.records === undefined || habit.records.get(date) === undefined) {
        return false
    }

    return habit.records.get(date)!.clickCount > 0 && habit.records.get(date)!.clickCount < habit.everyCount
}

const isHabitClicked2 = (habit: Habit, date: string) => {
    if (habit.records === undefined || habit.records.get(date) === undefined) {
        return false
    }

    return habit.records.get(date)!.clickCount > 0
}



const daysUpper = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysLower = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const dayStringToNumber = (daysString: string) => {
    for (let i = 0; i < daysUpper.length; i++) {
        if (daysString === daysUpper[i]) {
            return i
        }
    }

    console.log('error in dayStringToNumber daysString:', daysString);
    return 7 // 兜底
}

export const getShowdaysStr = (showsDays: number[]) => {
    if (showsDays.length === 7) {
        return i18n.t('everyday')
    }
    if (showsDays.length === 2 && showsDays.includes(0) && showsDays.includes(6)) {
        return i18n.t('weekends')
    }
    if (showsDays.length === 5 && !showsDays.includes(0) && !showsDays.includes(6)) {
        return i18n.t('weekdays')
    }

    let res = ''
    for (let i = 0; i < showsDays.length; i++) {
        res += i18n.t(daysLower[showsDays[i]]) + ' '
    }
    return res
}