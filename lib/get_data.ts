import { getCalendars } from 'expo-localization';
import { dateToDash } from './utils';

export interface Habit {
    id: number
    user_id: string
    name: string
    startDate: string
    endDate: string
    creatorId: string
    everycount: number
    type: number // 0 daily 1 weekly 2 monthly
    showsDays: number[]
    records: Map<string, Record>
    createTime: string
}

export interface Record {
    done: number
}

const habits: Habit[] = [
    {
        id: 1,
        user_id: "123",
        name: 'Study',

        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 10,
        type: 0,
        showsDays: [1, 2, 3],
        createTime: "2024-05-07",
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 12 }],
            ["2024-03-09", { done: 11 }],
            ["2024-06-16", { done: 11 }],
        ])
    },
    {
        id: 2,
        user_id: "123",
        name: 'Jump Roll',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 10,
        type: 0,
        showsDays: [1, 2, 3],
        createTime: "2024-05-07",
        records: new Map<string, Record>([
            ["2024-03-07", { done: 1 }],
            ["2024-03-08", { done: 5 }],
            ["2024-03-09", { done: 2 }],
        ])
    },
    {
        id: 3,
        user_id: "123",
        name: 'Sport',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 5,
        type: 0,
        showsDays: [4, 5, 6, 7],
        createTime: "2024-05-07",
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 8 }],
            ["2024-03-09", { done: 1 }],
        ])
    },
    {
        id: 4,
        user_id: "123",
        name: 'Swim',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 5,
        type: 0,
        showsDays: [4, 5, 6, 7],
        createTime: "2024-05-07",
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 8 }],
            ["2024-03-09", { done: 1 }],
        ])
    }
]


export const getTodayHabits = function () {
    return sortHabits(habits)
}

export const getWeekHabits = function () {
    return sortHabits(habits)
}

export const getMonthHabits = function () {
    return sortHabits(habits)
}

const sortHabits = function (habits: Habit[]) {
    const { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    let unfinishedList = habits.filter(habit => {
        return habit.startDate <= currentDate &&
            habit.endDate >= currentDate &&
            (habit.records.get(currentDate) ?? { done: 0 }).done < habit.everycount
    })

    let finishedList = habits.filter(habit => {
        return habit.startDate <= currentDate &&
            habit.endDate >= currentDate &&
            (habit.records.get(currentDate) ?? { done: 0 }).done > habit.everycount
    })


    return [{
        "title": "unfinished",
        "data": unfinishedList,
    },
    {
        "title": "finished",
        "data": finishedList
    }
    ]
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

