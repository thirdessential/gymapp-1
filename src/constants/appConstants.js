import {cardBackgrounds} from "./images";

export const rootURL = 'https://fitness-first-services.herokuapp.com';
// export const rootURL = 'http://192.168.31.125:3001';
if (__DEV__) {
  console.log('Development');
} else {
  console.log('Production');
}
export const appName = 'GymAdda';

export const userTypes = {
  USER: 'USER',
  TRAINER: 'TRAINER'
}
export const INITIAL_USER_TYPE = userTypes.USER;
export const videoFeedConfig = {
  width: 360,
  height: 640,
  bitrate: 600,
  FPS: 30
}
export const appPackageId = 'com.thirdessential.fitnessfirst';

export const notificationActions = {
  Accept: 'Accept',
  Reject: 'Reject'
}

export const storageKeys = {
  PENDING_CALL: 'PENDING_CALL'
}
export const webClientId = '284208119571-nt9fitb9l2o4qulefvju8gqeo7aaug01.apps.googleusercontent.com';

export const videoTestMode = false;
export const callTimeout = 30000; //30 secs

export const WEEK_DAYS = {
  SUN: 'SUN',
  MON: 'MON',
  TUE: 'TUE',
  WED: 'WED',
  THU: 'THU',
  FRI: 'FRI',
  SAT: 'SAT',
};
export const allowedDurations = [30, 45, 60];

export const imageTypes = {
  AVATAR: {
    type: 'AVATAR',
    dimension: {
      width: 400,
      height: 400
    }
  },
  COVER: {
    type: 'COVER',
    dimension: {
      height: 700,
      width: 800
    }
  }
}
export const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';
export const paymentKey = 'rzp_test_BuIiL164HHvbBm';

export const remoteMessageTypes = {
  CALL: 'call',
  APPOINTMENT: "appointmentNotification",
  SESSION: 'sessionNotification',
  UPDATE_POSTS: 'UPDATE_POSTS',
}

export const INITIAL_PAGE = 'INITIAL_PAGE';

export const MAX_POST_LENGTH = 300;
export const firebaseTopics = {
  SILENT_NOTIFICATION: 'SILENT_NOTIFICATION'
}
export const POST_TYPE = {
  TYPE_POST: 'TYPE_POST',
  TYPE_WORKOUT: 'TYPE_WORKOUT',
  TYPE_QUESTION: 'TYPE_QUESTION',
  TYPE_VIDEO: 'TYPE_VIDEO',
}
export const CONTENT_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
}
export const COUPON_GEN = {
  minGen: 1,
  maxGen: 10,
  minDiscount: 3,
  maxDiscount: 100,
  minValidity: 1,
  maxValidity: 6
}
export const packageTypes = {
  FAT_LOSS: 'Fat Loss',
  WEIGHT_LOSS: 'Weight Loss',
  WEIGHT_GAIN: 'Weight Gain',
  MUSCLE_GAIN: 'Muscle Gain',
  BODY_MASS_GAIN: 'Body Mass Gain',
  LEAN_BODY_MASS: 'Lean Body Mass',
  POWER_LIFTING: 'Power Lifting',
  STRENGTH_GAIN: 'Strength Gain'
}
export const packageImages = {
  FAT_LOSS: cardBackgrounds.bg1,
  WEIGHT_LOSS: cardBackgrounds.bg2,
  WEIGHT_GAIN: cardBackgrounds.bg3,
  MUSCLE_GAIN: cardBackgrounds.bg4,
  BODY_MASS_GAIN: cardBackgrounds.bg5,
  LEAN_BODY_MASS: cardBackgrounds.bg6,
  POWER_LIFTING: cardBackgrounds.bg7,
  STRENGTH_GAIN: cardBackgrounds.bg8
}
export const callbackStatus = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
}

export const categories = [
  {
    url:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=626&q=80",
    type: "YOGA",
  },
  {
    url:
      "https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot1509/vadymvdrobot150900418/45024728-portrait-of-a-fitness-man-doing-stretching-exercises-at-gym.jpg?ver=6",
    type: "STRETCH",
  },
  {
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQToXUY2WuidMG6tCZBmujFN9wtIjSEL_WLvA&usqp=CAU",
    type: "WORKOUT",
  },
  {
    url:
      "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=704&q=80",
    type: "CARDIO",
  },
];

export const bodyParts = [
  {
    url:
      "https://3.bp.blogspot.com/-oFwofSWO-XQ/ViiCsb0p_nI/AAAAAAAAEfs/vKzc9-8AXIk/s1600/Six%2BPack%2BAbs%2BHD%2BWallpaper.jpg",
    type: "ABS",
  },
  {
    url:
      "https://images.unsplash.com/photo-1583454122781-8cf8f5af9d2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    type: "ARMS",
  },
  {
    url:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    type: "BACK",
  },
  {
    url:
      "https://media.self.com/photos/5dd2f7580e115400090e89be/16:9/w_1600,c_limit/190916_SELF_1101.jpg",
    type: "BUTTOCKS",
  },
  {
    url:
      "https://manofmany.com/wp-content/uploads/2019/03/10-Best-Chest-Exercises-for-Men-1280x720.jpg",
    type: "CHEST",
  },
  {
    url:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    type: "FULL BODY",
  },

  {
    url:
      "https://manofmany.com/wp-content/uploads/2019/03/10-Best-Shoulder-Exercises-for-Men-Man-lifting-weights-shoulder-muscle-1280x720.jpg",
    type: "SHOULDERS",
  },
  {
    url:
      "https://cdn-ami-drupal.heartyhosting.com/sites/muscleandfitness.com/files/styles/full_node_image_1090x614/public/quad-exercise-routine-3.jpg?itok=sfR46rrH&timestamp=1370452907",
    type: "LEGS",
  },
];
