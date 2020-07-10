export {
  updateAxiosToken,
  firebaseGoogleAuth,
  syncUserType
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
  getGlobalSlots,
  subscribeToPackage,
  bookAppointment,
  sendPaymentData,
  myAppointments,
  recentActivity
} from './user';

export {
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
  syncSlots,
  getMySubscriptions
} from './trainer';

export {
  uploadImage
} from './storage';

export {
  makeCall,
  setBusy,
  setAvailable
} from './call';