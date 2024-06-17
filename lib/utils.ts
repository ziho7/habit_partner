export const dateToSlash = function (dateStr: string) {
    var dArr = dateStr.split("-");  // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/2010"
}

export const dateToDash = function (dateStr: string) {
    var dArr = dateStr.split("/");  // ex input: "18/01/2010"
    return dArr[2] + "-" + dArr[0] + "-" + dArr[1]; //ex output: "2010-01-18"
}