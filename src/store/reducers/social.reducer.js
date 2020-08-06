import {socialState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const idTransformer = objArray => objArray.map(obj => obj._id);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS: {
      const {my, posts} = action.payload;
      const postDetails = {...state.postDetails};
      posts.map(post => postDetails[post._id] = post);
      return my ?
        updateObject(state, {myPosts: idTransformer(posts), postDetails}) :
        updateObject(state, {posts: idTransformer(posts), postDetails});
    }
    case actionTypes.APPEND_POSTS:
      let {posts, my} = action.payload;
      const postDetails = {...state.postDetails};
      posts.map(post => postDetails[post._id] = post);
      posts = idTransformer(posts);
      if (my) {
        const oldPosts = [...state.myPosts];
        return updateObject(state, {postDetails, myPosts: oldPosts.concat(posts)});
      } else {
        const oldPosts = [...state.posts];
        return updateObject(state, {postDetails, posts: oldPosts.concat(posts)});
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
      const filteredPosts = oldPosts.filter(postId_ => postId_ !== postId);
      const oldMyPosts = [...state.myPosts];
      const filteredMyPosts = oldMyPosts.filter(postId_ => postId_ !== postId);

      return updateObject(state, {posts: filteredPosts, myPosts: filteredMyPosts});
    }
    case actionTypes.REMOVE_QUESTION: {
      const {questionId} = action.payload;
      const oldQuestions = [...state.questions];
      const filteredQuestions = oldQuestions.filter(questionId_ => questionId_ !== questionId);
      return updateObject(state, {questions: filteredQuestions});
    }
    case actionTypes.SET_POSTS_FOR_USER: {
      const {userId, posts} = action.payload;
      const postDetails = {...state.postDetails};
      posts.map(post => postDetails[post._id] = post);
      const postsForUser = {...state.postsForUser};
      postsForUser[userId] = idTransformer(posts);
      return updateObject(state, {postsForUser});
    }
    case actionTypes.SET_QUESTIONS: {
      const {questions} = action.payload;
      const postDetails = {...state.postDetails};
      questions.map(question => postDetails[question._id] = question);
      return updateObject(state, {questions: idTransformer(questions), postDetails})
    }
    case actionTypes.APPEND_QUESTIONS: {
      let {questions} = action.payload;
      const oldQuestions = [...state.questions];
      const postDetails = {...state.postDetails};
      questions.map(question => postDetails[question._id] = question);
      questions = idTransformer(questions);
      return updateObject(state, {questions: oldQuestions.concat(questions), postDetails});
    }
    default:
      return state;
  }
};

export default reducer;
