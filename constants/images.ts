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
}

export const habitList = ["ball", "game", "money", "baseball", "cooking", "noSmoking", "speed", "study", "swimming", "tennis", "tourism", "walkTheDog", "waterGlass"]

export const getHabitIcons = (habitIconName: string) => {
  if (habitIcons.hasOwnProperty(habitIconName)) {
    return habitIcons[habitIconName];
  } else {
    return ""
  }
}
  
export default images;