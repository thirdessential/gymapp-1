export {
  updateAxiosToken,
  firebaseTrainerAuth,
  firebaseUserAuth
} from './auth';

export {
  attemptGoogleAuth,
  registerWithEmail,
  signInWithEmail
} from './firebaseMethods';

export {
  listTrainers,
  updateUserInfo,
  getUserInfo,
  getMyInfo,
} from './user';

export {
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
  createSlot
} from './trainer';

export {
  uploadImage
} from './storage';

export {
  makeCall
} from './call';