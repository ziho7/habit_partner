export const dateToSlash = (dateStr: string) =>  {
    if (!dateStr.includes("-")) {
        return dateStr
    }
    var dArr = dateStr.split("-");  // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/2010"
}

export const dateToDash = (dateStr: string) => {
    if (!dateStr.includes("/")) {
        return dateStr
    }
    var dArr = dateStr.split("/"); // ex input: "18/01/2010"
    return dArr[2] + "-" + dArr[0] + "-" + dArr[1]; //ex output: "2010-01-18"
}

export const dateTypeToSlash = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

export const dateTypeToDash = (date: Date) => {
    let d = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).split('/').reverse().join('-')
    let dArry = d.split('-')
    return dArry[0] + '-' + dArry[2] + '-' + dArry[1]
}

export const getDatesOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // 获取当前日期所在周的第一天(周日)
    const firstDayOfWeek = new Date(year, month, day - date.getDay());

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(firstDayOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
        dates.push(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`);
    }

    return dates;
}

export const getDatesOfMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // 获取当月的天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const dates: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      dates.push(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`);
    }
  
    return dates;
  }