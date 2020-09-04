export {
  updateAxiosToken,
  firebaseGoogleAuth,
  acceptTerms
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
  recentActivity,
  subscribeRollback,
  requestCallback
} from './user';

export {
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
  syncSlots,
  getMySubscriptions,
  getMySessions,
  generateCoupons,
  getMyCoupons,
  getAccountSummary,
  addAccount,
  getMyAccounts,
  acceptCallBack,
  rejectCallBack,
  callbackDone,
  getCallbacks,
  scheduleStream,
  startStream
} from './trainer';

export {
  uploadImage
} from './storage';

export {
  makeCall,
  setBusy,
  setAvailable
} from './call';

export {
  createImagePost,
  createTextPost,
  createVideoPost,
  listPosts,
  listMyPosts,
  getPost,
  likePost,
  unlikePost,
  commentOnPost,
  unlikeComment,
  likeComment,
  reportComment,
  reportPost,
  getPostsForUser,
  likeAnswer,
  likeQuestion,
  listQuestions,
  postQuestion,
  answerQuestion,
  unlikeAnswer,
  deletePost,
  reportQuestion,
  listLiveStreams,
  listMyLiveStreams,
} from './social';

export {
  recordBmi,
  getBmiHistory,
  updatePreferences,
  getPreferences,
  updateExerciseIndex,
  updateTarget,
  waterIntake,
  searchFood,
  updateMealIntake,
  getRecommendation
} from './fitness'