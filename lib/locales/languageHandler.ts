const languageList: { [key: string]: string } = {
    "en": "English",
    "zh_CN": "中文"
}

export const getLanguageList = () => {
    // get the value of languageList
    let res: string[] = []
    for (let key in languageList) {
        res.push(languageList[key])
    }

    return res
}

export const getLanguageCode = (value: string) => {
    // get the key of the value
    for (let key in languageList) {
        if (languageList[key] === value) {
            return key
        }
    }

    return 'en'
}

export const getTheLanguageString = (key: string) => {
    return languageList[key]
}
