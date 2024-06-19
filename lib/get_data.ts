import { getCalendars } from 'expo-localization';
import { dateToDash } from './utils';
import { getAllHabits } from './storage';
import { Type, Expose, Transform, plainToClass } from 'class-transformer';
import "reflect-metadata";

export class Habit {
    id: string // uuid
    user_id: string
    name: string
    startDate: string
    endDate: string
    creatorId: string
    everycount: number
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
    done: number
}

const habits: Habit[] = [
    {
        id: "1",
        user_id: "123",
        name: 'Study',

        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 10,
        type: 0,
        showsDays: [1, 2, 3],
        createTime: new Date(2024, 5, 7),
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 12 }],
            ["2024-03-09", { done: 11 }],
            ["2024-06-16", { done: 11 }],
        ])
    },
    {
        id: "2",
        user_id: "123",
        name: 'Jump Roll',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 10,
        type: 0,
        showsDays: [1, 2, 3],
        createTime: new Date(2024, 5, 7),
        records: new Map<string, Record>([
            ["2024-03-07", { done: 1 }],
            ["2024-03-08", { done: 5 }],
            ["2024-03-09", { done: 2 }],
        ])
    },
    {
        id: "3",
        user_id: "123",
        name: 'Sport',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 5,
        type: 0,
        showsDays: [4, 5, 6, 7],
        createTime: new Date(2024, 5, 7),
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 8 }],
            ["2024-03-09", { done: 1 }],
        ])
    },
    {
        id: "4",
        user_id: "",
        name: 'Swim',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: 5,
        type: 0,
        showsDays: [4, 5, 6, 7],
        createTime: new Date(2024, 5, 7),
        records: new Map<string, Record>([
            ["2024-03-07", { done: 0 }],
            ["2024-03-08", { done: 8 }],
            ["2024-03-09", { done: 1 }],
        ])
    }
]


export const getTodayHabits = async function () {
    let res = await getAllHabits();
    let habits: Habit[] = res;
    let sortedHabits = sortHabits(habits);
    return sortedHabits;
}

export const getWeekHabits = function () {
    return sortHabits(habits)
}

export const getMonthHabits = function () {
    return sortHabits(habits)
}

const sortHabits = function (habits: Habit[]) {
    const { currentDate } = getCurrentDateAndDayOfWeekInTimeZone()
    let unfinishedList: Habit[] = []
    let finishedList: Habit[] = []
    console.log('habit before sort',habits);
    for (let habit of habits) {
        console.log('records',habit.records);
        console.log('records res', habit.records.get(currentDate));
    
        // 不在制定日期内的habit不显示
        if (habit.startDate > currentDate || habit.endDate < currentDate) {
            continue
        }

        if ((habit.records.get(currentDate) ?? { done: 0 }).done < habit.everycount) {
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



