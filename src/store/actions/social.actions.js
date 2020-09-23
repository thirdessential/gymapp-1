import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import { INITIAL_PAGE } from "../../constants/appConstants";
import { showInfo } from "../../utils/notification";
import { LayoutAnimation } from "react-native";

// Set posts array, setting my=true sets user's own posts array
// Only references to notification objects are stored in array
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

// Set live stream array
const setStreams = (liveStreams, my) => ({
  type: actionTypes.SET_STREAMS,
  payload: {
    liveStreams,
    my
  }
});
const appendStreams = (liveStreams, my) => ({
  type: actionTypes.APPEND_STREAMS,
  payload: {
    liveStreams,
    my
  }
});

export const setPost = (post) => ({
  type: actionTypes.SET_POST,
  payload: {
    post
  }
});
const setComments = (postId, comments) => ({
  type: actionTypes.SET_COMMENTS,
  payload: {
    postId,
    comments
  }
});
export const removePost = (postId) => ({
  type: actionTypes.REMOVE_POST,
  payload: {
    postId
  }
});
const removeQuestion = (questionId) => ({
  type: actionTypes.REMOVE_QUESTION,
  payload: {
    questionId
  }
});
export const setQuestions = (questions) => ({
  type: actionTypes.SET_QUESTIONS,
  payload: {
    questions
  }
});
export const appendQuestions = (questions) => ({
  type: actionTypes.APPEND_QUESTIONS,
  payload: {
    questions,
  }
});

export const updatePosts = (page = '', my = false) => {
  return async (dispatch) => {
    try {
      let { posts, nextPage } = my ?
        await API.listMyPosts(page === INITIAL_PAGE ? null : page) :
        await API.listPosts(page === INITIAL_PAGE ? null : page);
      if (posts) {
        if (page === INITIAL_PAGE)
          await dispatch(setPosts(posts, my)); // initialise list from scratch
        else dispatch(appendPosts(posts, my)); // else append data to list
      }
      return nextPage;
    } catch (error) {
      console.log("post list update failed", error);
      return null;
    }
  };
};

// Update data of a particular post, modifies its reference
export const updatePost = (postId) => {
  return async (dispatch) => {
    try {
      let { comments, post, likes } = await API.getPost(postId);
      post.likes = likes;
      dispatch(setPost(post));
      if (comments)
        dispatch(setComments(postId, comments));
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
};

// Optimistic update, change data first, call API later
export const likePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      let post = getState().social.postDetails[postId];
      post.likes.push({ likedBy: getState().user.userId });
      dispatch(setPost(post));
      await API.likePost(postId);
      return true;
    } catch (error) {
      console.log("Like post failed", error);
      return null;
    }
  };
};

export const unlikePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      let post = { ...getState().social.postDetails[postId] };
      post.likes = post.likes.filter(like => like.likedBy !== getState().user.userId);
      dispatch(setPost(post));
      await API.unlikePost(postId);
      return true;
    } catch (error) {
      console.log("unlike post failed", error);
      return null;
    }
  };
};

export const likeComment = (postId, commentId) => {
  return async (dispatch, getState) => {
    try {
      let comments = [...getState().social.commentsForPost[postId]];
      comments = comments.map(comment => {
        if (comment._id === commentId)
          comment.likes.push({ likedBy: getState().user.userId });
        return comment;
      });
      dispatch(setComments(postId, comments));
      await API.likeComment(commentId);
      return true;
    } catch (error) {
      console.log("like comment failed", error);
      return null;
    }
  };
};

export const unlikeComment = (postId, commentId) => {
  return async (dispatch, getState) => {
    try {
      let comments = [...getState().social.commentsForPost[postId]];
      comments = comments.map(comment => {
        if (comment._id === commentId)
          comment.likes = comment.likes.filter(like => like.likedBy !== getState().user.userId);
        return comment;
      }
      );
      dispatch(setComments(postId, comments));
      await API.unlikeComment(commentId);
      return true;
    } catch
    (error) {
      console.log("unlike comment failed", error);
      return null;
    }
  }
}

export const commentOnPost = (postId, commentText) => {
  return async (dispatch, getState) => {
    try {
      let post = { ...getState().social.postDetails[postId] };
      let { comment } = await API.commentOnPost(postId, commentText);
      await dispatch(updatePost(postId));
      return true;
    } catch (error) {
      console.log("post update failed", error);
      return null;
    }
  };
}

export const deletePost = postId => {
  return async (dispatch) => {
    try {
      dispatch(removePost(postId));
      await API.deletePost(postId);
      showInfo('Post deleted');
      return true;
    } catch (error) {
      console.log("post delete failed", error);
      return null;
    }
  };
}
export const reportPost = postId => {
  return async (dispatch, getState) => {
    try {
      dispatch(removePost(postId));
      await API.reportPost(postId);
      showInfo('Post Reported');
      return true;
    } catch (error) {
      console.log("post report failed", error);
      return null;
    }
  };
}
export const reportQuestion = questionId => {
  return async (dispatch) => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(removeQuestion(questionId));
      await API.reportQuestion(questionId);
      showInfo('Content Reported');
      return true;
    } catch (error) {
      console.log("Question report failed", error);
      return null;
    }
  };
}

export const reportComment = (postId, commentId) => {
  return async (dispatch, getState) => {
    try {
      await API.reportComment(commentId);
      showInfo('Comment Reported');
      return true;
    } catch (error) {
      console.log("post report failed", error);
      return null;
    }
  };
}

// Set posts for a particular user
export const setPostsForUser = (userId, posts) => ({
  type: actionTypes.SET_POSTS_FOR_USER,
  payload: {
    userId,
    posts
  }
});

export const getPostsForUser = (userId, page = '') => {
  return async (dispatch) => {
    try {
      let { nextPage, posts } = await API.getPostsForUser(userId);
      dispatch(setPostsForUser(userId, posts));
      return nextPage;
    } catch (error) {
      console.log("post fetch for user failed", error);
      return null;
    }
  };
}

export const updateQuestions = (page = '') => {
  return async (dispatch) => {
    try {
      let { questions, nextPage } = await API.listQuestions(page === INITIAL_PAGE ? null : page);
      if (questions) {
        if (page === INITIAL_PAGE)
          await dispatch(setQuestions(questions)); // initialise list from scratch
        else dispatch(appendQuestions(questions)); // else append data to list
        // questions.map(question => dispatch(setQuestion(question)))
      }
      return nextPage;
    } catch (error) {
      console.log("question list update failed", error);
      return null;
    }
  };
};

// Optimistic update, create an answer object and append to answers list
export const answerQuestion = (questionId, answerText) => {
  return async (dispatch, getState) => {
    try {
      API.answerQuestion(questionId, answerText)
        .then(() => dispatch(updateQuestions(INITIAL_PAGE)));
      let question = getState().social.postDetails[questionId];
      let answer = {
        "_id": Math.random().toString(),
        "answerText": answerText,
        "spam": false,
        "approved": true,
        "postedBy": getState().user.userData,
        "createdOn": Date.now(),
        "updatedOn": Date.now(),
        "__v": 0,
        "likes": []
      };
      question.answers.push(answer);
      dispatch(setPost(question));
    } catch (error) {
      console.log("answer question failed", error);
      return null;
    }
  };
};

export const updateLiveStreams = (page = '', my = false) => {
  return async (dispatch) => {
    try {
      const listStreams = my ? API.listMyLiveStreams : API.listLiveStreams;
      let { streams, nextPage } = await listStreams(page === INITIAL_PAGE ? null : page);
      if (streams) {
        if (page === INITIAL_PAGE)
          await dispatch(setStreams(streams, my)); // initialise list from scratch
        else dispatch(appendStreams(streams, my)); // else append data to list
      }
      return nextPage;
    } catch (error) {
      console.log("post list update failed", error);
      return null;
    }
  };
};

// Update status of a live stream. SCHEDULED->LIVE->FINISHED
export const setLiveStreamStatus = (streamId, status) => {
  return async (dispatch, getState) => {
    try {
      let myLiveStreams = [...getState().social.myLiveStreams];
      let liveStreams = [...getState().social.liveStreams];
      myLiveStreams = myLiveStreams.map(stream => {
        if (stream._id === streamId)
          stream.status = status;
        return stream;
      });
      dispatch(setStreams(myLiveStreams, true));
      liveStreams = liveStreams.map(stream => {
        if (stream._id === streamId)
          stream.status = status;
        return stream;
      });
      dispatch(setStreams(liveStreams));
    } catch (error) {
      console.log("stream status update failed", error);
      return null;
    }
  };
};