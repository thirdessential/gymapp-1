import {socialState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS: {
      const {my, posts} = action.payload;
      return my ?
        updateObject(state, {myPosts: posts}) :
        updateObject(state, {posts});
    }
    case actionTypes.APPEND_POSTS:
      const {posts, my} = action.payload;
      if (my) {
        const oldPosts = [...state.myPosts];
        return updateObject(state, {myPosts: oldPosts.concat(posts)});
      } else {
        const oldPosts = [...state.posts];
        return updateObject(state, {posts: oldPosts.concat(posts)});
      }
    case actionTypes.SET_POST: {
      const {post} = action.payload;
      const postDetails = {...state.postDetails};
      postDetails[post._id] = post;
      return updateObject(state, {postDetails});
    }
    case actionTypes.REMOVE_POST: {
      const {postId} = action.payload;
      const oldPosts = [...state.posts];
      const filteredPosts = oldPosts.filter(post => post._id !== postId);
      const oldMyPosts = [...state.myPosts];
      const filteredMyPosts = oldMyPosts.filter(post => post._id !== postId);

      return updateObject(state, {posts: filteredPosts, myPosts: filteredMyPosts});
    }
    case actionTypes.REMOVE_QUESTION: {
      const {questionId} = action.payload;
      const oldQuestions = [...state.questions];
      const filteredQuestions = oldQuestions.filter(question => question._id !== questionId);
      return updateObject(state, {questions: filteredQuestions});
    }
    case actionTypes.SET_POSTS_FOR_USER: {
      const {userId, posts} = action.payload;
      const postsForUser = {...state.postsForUser};
      postsForUser[userId] = posts;
      return updateObject(state, {postsForUser});
    }
    case actionTypes.SET_QUESTIONS: {
      return updateObject(state, action.payload)
    }
    case actionTypes.APPEND_QUESTIONS: {
      const {questions} = action.payload;
      const oldQuestions = [...state.questions];
      return updateObject(state, {posts: oldQuestions.concat(questions)});
    }
    case actionTypes.SET_QUESTION: {
      const {question} = action.payload;
      let oldQuestions = [...state.questions];
      oldQuestions = oldQuestions.map(localQuestion => question._id === localQuestion._id ? question : localQuestion);
      return updateObject(state, {questions: oldQuestions});
    }
    default:
      return state;
  }
};

export default reducer;
