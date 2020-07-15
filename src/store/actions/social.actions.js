import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {INITIAL_PAGE} from "../../constants/appConstants";


export const setPosts = (posts, my = false) => ({
  type: actionTypes.SET_POSTS,
  payload: {
    posts,
    my
  }
});
export const appendPosts = (posts, my = false) => ({
  type: actionTypes.APPEND_POSTS,
  payload: {
    posts,
    my
  }
});
export const setPost = (post) => ({
  type: actionTypes.SET_POST,
  payload: {
    post
  }
});

export const updatePosts = (page = '', my = false) => {
  return async (dispatch) => {
    try {
      let {posts, nextPage} = my ?
        await API.listMyPosts(page === INITIAL_PAGE ? null : page) :
        await API.listPosts(page === INITIAL_PAGE ? null : page);
      if (posts) {
        if (page === INITIAL_PAGE)
          await dispatch(setPosts(posts, my)); // initialise list from scratch
        else dispatch(appendPosts(posts, my)); // else append data to list
        posts.map(post => dispatch(setPost(post)))
      }
      return nextPage;
    } catch (error) {
      console.log("post list update failed", error);
      return null;
    }
  };
};

export const updatePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      let {comments} = await API.getPost(postId);
      if (comments) {
        let post = getState().social.postDetails[postId];
        post.comments = comments;
        dispatch(setPost(post));
      }
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
};

export const likePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      let post = getState().social.postDetails[postId];
      post.likes.push({likedBy: getState().user.userId});
      dispatch(setPost(post));
      await API.likePost(postId);
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
};

export const unlikePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      let post = getState().social.postDetails[postId];
      post.likes.pop();
      dispatch(setPost(post));
      await API.unlikePost(postId);
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
};

export const commentOnPost = (postId, commentText) => {
  return async (dispatch, getState) => {
    try {
      let post = {...getState().social.postDetails[postId]};
      let {comment} = await API.commentOnPost(postId, commentText);
      await dispatch(updatePost(postId))
      // let comments = [...post.comments];
      // comments.push(comment);
      // post.comments = comments;
      // dispatch(setPost(post));
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
}