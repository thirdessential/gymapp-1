export {
  setAuthenticated,
  syncFirebaseAuth,
} from "./auth.actions";

export {
  setAuthToken,
  setUserType,
  setInitialLoginOff,
  updateUserData,
  subscribePackage,
  getActivities,
  acceptTerms
} from "./user.actions";

export {
  setIncomingCall,
  endCallAction as endCall,
  setCallActive,
  resetInAppCall
} from './call.actions';

export {
  setUserList,
  updateUsersList,
  setUser,
  updateGlobalSlots
} from "./app.actions";

export {
  createPackage,
  deletePackage,
  createSlots,
  syncSubscriptions,
  generateCoupons,
  syncCoupons,
  getAccountSummary,
  addAccount,
  getMyAccounts,
  getCallbacks,
  acceptCallback,
  callbackDone,
  rejectCallback,
  scheduleStream,
  syncSessions
} from './trainer.actions';

export {
  updatePosts,
  updatePost,
  unlikePost,
  likePost,
  likeComment,
  unlikeComment,
  commentOnPost,
  reportPost,
  getPostsForUser,
  updateQuestions,
  answerQuestion,
  deletePost,
  reportQuestion,
  updateLiveStreams,
  setLiveStreamStatus,
} from './social.actions';

export {
  updateBmiRecords,
  submitBmi,
  getPreferences,
  updatePreferences,
  updateExerciseIndex,
  updateTarget,
  addCalorieData,
  addFoods,
  addWaterIntake,
} from './fitness.actions';

export {
  addNotification,
  readNotification,
  clearAllNotifications,
  syncNotifications,
} from './notification.actions';