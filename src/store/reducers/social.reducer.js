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
      return updateObject(state, {posts: filteredPosts});
    }
    default:
      return state;
  }
};

export default reducer;
