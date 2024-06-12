export const getDayData = function getDayData() {
    return [
        {
            name: 'Sport',
            startDate: '2024-03-07',
            endDate: '2024-09-07',
            frequency: '每天一次',
            days: '30'
        }
    ];
}

const getOneData = function getOneData(id: number) {
    return
}

export const getCurrentDateAndDayOfWeekInTimeZone = (timeZone: string) => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', // "Monday", "Tuesday", etc.
        year: 'numeric',
        month: '2-digit', // "01", "02", etc.
        day: '2-digit', // "01", "02", etc.
        timeZone: timeZone, // Specify the timezone
    });

    const formattedDate = formatter.format(now).split(', ');
    const dayOfWeek = formattedDate[0]; // The day of the week
    const currentDate = `${formattedDate[3]}-${formattedDate[1]}-${formattedDate[2]}`; // Format: YYYY-MM-DD

    return { currentDate, dayOfWeek };
};