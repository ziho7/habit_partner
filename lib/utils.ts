export const dateToSlash = function (dateStr: string) {
    if (!dateStr.includes("-")) {
        return dateStr
    }
    var dArr = dateStr.split("-");  // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/2010"
}

export const dateToDash = function (dateStr: string) {
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