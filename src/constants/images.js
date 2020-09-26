function hashCode(s) {
  for (var i = 0, h = 0; i < s.length; i++)
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}

export const cardBackgrounds = {
  bg1: require('../../assets/images/card/1.jpeg'),
  bg2: require('../../assets/images/card/2.jpeg'),
  bg3: require('../../assets/images/card/3.jpeg'),
  bg4: require('../../assets/images/card/4.jpeg'),
  bg5: require('../../assets/images/card/5.jpeg'),
  bg6: require('../../assets/images/card/6.jpeg'),
  bg7: require('../../assets/images/card/7.jpeg'),
  bg8: require('../../assets/images/card/8.jpeg'),
}

export const iconBackgrounds = {
  packages: require('../../assets/Icons/Packages.png'),
  appointments: require('../../assets/Icons/Appointments.png'),
  bmr: require('../../assets/Icons/BMR.png'),
  calorie: require('../../assets/Icons/CalorieIntake.png'),
  dietPlan: require('../../assets/Icons/dietPlan.png'),
  sleepMonitor: require('../../assets/Icons/sleepMonitor.png'),
  slots: require('../../assets/Icons/slots.png'),
  subscriptions: require('../../assets/Icons/subscription.png'),
  workouts: require('../../assets/Icons/workouts.png'),
  waterIntake: require('../../assets/Icons/Water.png'),
  days: require('../../assets/Icons/days.png'),
  preference: require('../../assets/Icons/preference.png'),
  discount: require('../../assets/Icons/discount.png'),
  coupon: require('../../assets/Icons/Coupon.png'),
  physical: require('../../assets/Icons/Physical.png'),
  coinMan: require('../../assets/Icons/CoinMan.png'),
  graphMan: require('../../assets/Icons/graphMan.png'),
  moneyBag: require('../../assets/Icons/moneyBag.png'),
  serverTable: require('../../assets/Icons/serverTable.png'),
  addAccount: require('../../assets/Icons/career_.png'),
}

export const getRandomImage = () => {
  const images = Object.keys(cardBackgrounds);
  const count = images.length;
  const index = Math.floor(Math.random() * count);
  return cardBackgrounds[images[index]];
}

// For a string, which can be an item id, return an image. This is better than getting a random image, as the image will
// not change between re renders
export const getHashedImage = (toHash) => {
  const images = Object.keys(cardBackgrounds);
  const count = images.length;
  const index = Math.abs(hashCode(toHash) % count);
  return cardBackgrounds[images[index]];
}