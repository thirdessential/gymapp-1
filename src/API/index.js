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
  listUsers,
  updateUserInfo,
  getUserInfo,
  getMyInfo,
  getGlobalSlots
} from './user';

export {
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
  syncSlots,
  getGroupedSlots
} from './trainer';

export {
  uploadImage
} from './storage';

export {
  makeCall
} from './call';