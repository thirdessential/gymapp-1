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
      let {posts, nextPage} =  my?
        await API.listMyPosts(page === INITIAL_PAGE ? null : page):
        await API.listPosts(page === INITIAL_PAGE ? null : page);
      if (posts) {
        if (page === INITIAL_PAGE)
          await dispatch(setPosts(posts,my)); // initialise list from scratch
        else dispatch(appendPosts(posts,my)); // else append data to list
      }
      return nextPage;
    } catch (error) {
      console.log("post list update failed", error);
      return null;
    }
  };
};

export const updatePost = (postId) => {
  return async (dispatch) => {
    try {
      let {post, comments} = await API.getPost(postId);
      if (post) {
        post.comments = comments;
        dispatch(setPost(post));
      }
      return post;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
};
