// export const rootURL = 'https://fitness-first-services.herokuapp.com';
export const rootURL = 'http://192.168.31.125:3001';

export const appName = 'GymAdda';

export const userTypes = {
  USER: 'USER',
  TRAINER: 'TRAINER'
}

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
  TYPE_VIDEO:'TYPE_VIDEO',
}