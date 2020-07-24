export {
  setAuthenticated,
  resetAuth,
  syncFirebaseAuth,
  setNewUser
} from "./auth.actions";

export {
  setAuthToken,
  setUserType,
  setInitialLoginOff,
  updateUserData,
  subscribePackage,
  getActivities,
  getAppointments
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
  syncCoupons
} from './trainer.actions';

export {
  updatePosts,
  updatePost,
  unlikePost,
  likePost,
  commentOnPost,
  reportPost,
  getPostsForUser,
  updateQuestions,
  answerQuestion,
  deletePost,
  reportQuestion
} from './social.actions';

export {
  updateBmiRecords,
  submitBmi,
  getPreferences,
  updatePreferences,
  updateExerciseIndex,
  updateTarget
} from './fitness.actions';