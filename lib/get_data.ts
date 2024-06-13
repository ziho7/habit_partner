import { getCalendars } from 'expo-localization';

const database = [
    {
        id: 1,
        user_id: "123",
        name: 'Sport',
        days: '30',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: '10',
        type: 0,
        showsDays: [1, 2, 3]
    },
    {
        id: 2,
        user_id: "123",
        name: 'Sport',
        days: '30',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: '10',
        type: 0,
        showsDays: [1, 2, 3]
    },
    {
        id: 3,
        user_id: "123",
        name: 'Sport',
        days: '30',
        startDate: '2024-03-07',
        endDate: '2024-09-07',
        creatorId: '1231239',
        everycount: '10',
        type: 0,
        showsDays: [1, 2, 3]
    },
]

export const getDayDataByUserId = function getDayData(user_id: number) {
    return database
}


// todo 传值
export const getCurrentDateAndDayOfWeekInTimeZone = () => {
    const { timeZone } = getCalendars()[0];
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', // "Monday", "Tuesday", etc.
        year: 'numeric',
        month: '2-digit', // "01", "02", etc.
        day: '2-digit', // "01", "02", etc.
        timeZone: timeZone || "", // Specify the timezone
    });

    const formattedDate = formatter.format(now).split(', ');
    const dayOfWeek = formattedDate[0]; // The day of the week
    const currentDate = `${formattedDate[1]}`;

    return { currentDate, dayOfWeek };
};