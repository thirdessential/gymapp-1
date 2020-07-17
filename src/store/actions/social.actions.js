import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {INITIAL_PAGE} from "../../constants/appConstants";
import post from "../../components/Social/Post";
import {showInfo, showSuccess} from "../../utils/notification";


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
export const removePost = (postId) => ({
  type: actionTypes.REMOVE_POST,
  payload: {
    postId
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

export const reportPost = postId => {
  return async (dispatch, getState) => {
    try {
      dispatch(removePost(postId));
      let result = await API.reportPost(postId);
      showInfo('Post Reported');
      return true;
    } catch (error) {
      console.log("post report failed", error);
      return null;
    }
  };
}

export const reportComment = (postId, commentId) => {
  return async (dispatch, getState) => {
    try {
      let result = await API.reportComment(commentId);
      showInfo('Comment Reported');
      return true;
    } catch (error) {
      console.log("post report failed", error);
      return null;
    }
  };
}

export const setPostsForUser = (userId, posts) => ({
  type: actionTypes.SET_POSTS_FOR_USER,
  payload: {
    userId,
    posts
  }
});

export const getPostsForUser = (userId, page='') => {
  return async (dispatch) => {
    try {
      let {nextPage, posts} = await API.getPostsForUser(userId);
      dispatch(setPostsForUser(userId, posts));
      return nextPage;
    } catch (error) {
      console.log("post fetch for user failed", error);
      return null;
    }
  };
}