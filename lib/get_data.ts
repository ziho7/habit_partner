import { getCalendars } from 'expo-localization';
import { dateToDash } from './utils';
import { Habit, getAllHabits } from './storage';


export const getTodayHabits = async () => {
    let res = await getAllHabits();
    let habits: Habit[] = res;    
    let sortedHabits = sortHabits(habits);
    console.log('sortedHabits',sortedHabits);
    
    return sortedHabits;
}

export const getWeekHabits = async () => {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = sortHabits(habits);
    return sortedHabits;
}

export const getMonthHabits =async () => {
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

        if ((habit.records.get(currentDate) ?? { done: 0 }).done < habit.everyCount) {
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



