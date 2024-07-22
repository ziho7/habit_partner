// import add from "../assets/images/buttons/plus.svg";
// import add from "../assets/images/buttons/plus.png";

// export default { add };


const images = {
    add: require('../assets/images/buttons/plus.png'),
    ball: require('../assets/images/habits/ball.png'),
    close: require('../assets/images/buttons/close.png'),
    ok: require('../assets/images/buttons/ok.png'),
    arrowRight : require('../assets/images/buttons/arrow-right.png'),
    arrowLeft: require('../assets/images/buttons/arrow-left.png'),
    pen: require('../assets/images/buttons/pen.png'),
    laurelWreath: require('../assets/images/laurel_wreath.png'),
    delete: require('../assets/images/buttons/delete.png'),
    // other images...
};

const habitIcons: { [key: string]: string } = {
  ball: require('../assets/images/habits/ball.png'),
  game: require('../assets/images/habits/game.png'),
  money: require('../assets/images/habits/money.png'),
  baseball: require('../assets/images/habits/baseball.png'),
  cooking: require('../assets/images/habits/cooking.png'),
  noSmoking: require('../assets/images/habits/no-smoking.png'),
  speed: require('../assets/images/habits/speed.png'),
  study: require('../assets/images/habits/study.png'),
  swimming: require('../assets/images/habits/swimming.png'),
  tennis: require('../assets/images/habits/tennis.png'),
  tourism: require('../assets/images/habits/tourism.png'),
  walkTheDog: require('../assets/images/habits/walk-the-pet.png'),
  waterGlass: require('../assets/images/habits/water-glass.png'),
  meditation: require('../assets/images/habits/meditation.png'),
  read: require('../assets/images/habits/read.png'),
  write: require('../assets/images/habits/write.png'),
  code: require('../assets/images/habits/code.png'),
  draw: require('../assets/images/habits/draw.png'),
  housework: require('../assets/images/habits/housework.png'),
  laundry: require('../assets/images/habits/laundry.png'),
  washhand: require('../assets/images/habits/wash-hand.png'),
  sleep: require('../assets/images/habits/sleep.png'),
  football: require('../assets/images/habits/football.png'),
  yoga: require('../assets/images/habits/yoga.png'),
}

export const habitList = ["ball", "game", "money", "baseball", "cooking", "noSmoking", "speed", "study", "swimming", "tennis", "tourism", "walkTheDog", "waterGlass", "meditation"]

// 1开头是运动 // 2开头是学习 // 3开头是生活 // 4开头是娱乐 // 5开头是健康 // 6开头是戒除 7开头是其他
let habitIconMap = new Map<number, string>([
  [101, "ball"],
  [102, "baseball"],
  [103, "football"],
  [104, "speed"],
  [105, "tennis"],
  [106, "swimming"],
  [201, "study"],
  [202, "read"],
  [203, "write"],
  [204, "code"],
  [205, "draw"],
  [301, "cooking"],
  [302, "housework"],
  [303, "laundry"],
  [304, "walkTheDog"],
  [305, "waterGlass"],
  [401, "game"],
  [402, "tourism"],
  [501, "meditation"],
  [502, "yoga"],
  [503, "sleep"],
  [504, "washhand"],
  [601, "noSmoking"],
  [701, "money"]
]);

export const getHabitIcons = (habitIconName: string) => {
  
  if (habitIcons.hasOwnProperty(habitIconName)) {
    return habitIcons[habitIconName];
  } else {
    return ""
  }
}

export const getHabitIconsByCode = (habitCode: number) => {  
  if (habitIconMap.has(habitCode)) {
    return habitIcons[habitIconMap.get(habitCode) || "ball"]
  } else {
    return ""
  }
}

export const getHabitNameByCode = (habitCode: number) => {
  if (habitIconMap.has(habitCode)) {
    return habitIconMap.get(habitCode) || "ball"
  } else {
    return ""
  }
}
  
export default images;