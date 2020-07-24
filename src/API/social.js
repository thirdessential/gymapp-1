import axios from "./config";

import {imageTypes, rootURL} from '../constants/appConstants';
import {validateResponseCode} from "../utils/utils";
import RNFetchBlob from "rn-fetch-blob";
import {compressImage, getFileExtension} from "./storage";

export const createTextPost = async (textContent) => {
  try {
    let response = await axios.post('/post', {textContent});
    if (validateResponseCode(response.status))
      return response;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const createImagePost = async (path, textContent, token) => {
  try {
    let fileExtension = getFileExtension(path);
    console.log("Uploading from ", path);
    let compressedPath = await compressImage(path, imageTypes.COVER.dimension);

    const uploadData = [
      {
        name: "mediaContent",
        filename: path,
        type: "image/" + fileExtension,
        data: RNFetchBlob.wrap(compressedPath),
      },
    ];
    uploadData.push({
      name: 'textContent',
      data: textContent
    });

    let response = await RNFetchBlob.fetch(
      "POST",
      rootURL + '/post',
      {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      uploadData,
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("error", e);
    return false;
  }
};

export const createVideoPost=async (path, textContent, token,videoSrc) =>{
  try{
    let fileExtension = getFileExtension(path);
    console.log("Uploading from 1 ", fileExtension);
    console.log("Uploading from ", path);
    console.log("videosrc" +JSON.stringify(videoSrc));
    const uploadData = [
      {
        name: "mediaContent",
        filename: path,
        type: "video/" + fileExtension,
        data: RNFetchBlob.wrap(videoSrc.uri),
      },
    ];
    uploadData.push({
      name: 'textContent',
      data: textContent
    });
    console.log("upload data is "+uploadData);
    let response = await RNFetchBlob.fetch(
      "POST",
      rootURL + '/post',
      {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      uploadData,
    );
    console.log(response.data);
    return response.data;
  }catch(e){
    console.log("error", e);
    return false;
  }

}

export const listPosts = async (url = '') => {
  try {
    let response = !!url ?
      await axios.get(url) :
      await axios.get('/post/getAll');
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const listMyPosts = async (url = '') => {
  try {
    let response = !!url ?
      await axios.get(url) :
      await axios.get('/post/user/my');
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getPost = async postId => {
  try {
    let response = await axios.get(`/post/${postId}`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const likePost = async postId => {
  try {
    let response = await axios.post(`/post/${postId}/like`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const unlikePost = async postId => {
  try {
    let response = await axios.post(`/post/${postId}/unlike`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const commentOnPost = async (postId, commentText) => {
  try {
    let response = await axios.post(`/comment/${postId}`, {commentText});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const likeComment = async (commentId) => {
  try {
    let response = await axios.post(`/comment/${commentId}/like`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const unlikeComment = async (commentId) => {
  try {
    let response = await axios.post(`/comment/${commentId}/unlike`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const deletePost = async postId => {
  try {
    let response = await axios.delete(`/post/${postId}`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const reportPost = async postId => {
  try {
    let response = await axios.put(`/post/${postId}/reportSpam`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const reportQuestion = async questionId => {
  try {
    let response = await axios.put(`/question/${questionId}/reportSpam`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const reportComment = async commentId => {
  try {
    let response = await axios.put(`/comment/${commentId}/reportSpam`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const getPostsForUser = async (userId) => {
  try {
    let response = await axios.get(`/post/user/${userId}`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const postQuestion = async (questionText) => {
  try {
    let response = await axios.post(`/question`, {questionText});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const listQuestions = async () => {
  try {
    let response = await axios.get(`/question/getAll`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const likeQuestion = async (questionId) => {
  try {
    let response = await axios.post(`/question/${questionId}/like`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const answerQuestion = async (questionId, answerText) => {
  try {
    let response = await axios.post(`/answer/${questionId}`, {answerText});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const likeAnswer = async (answerId) => {
  try {
    let response = await axios.post(`/answer/${answerId}/like`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const unlikeAnswer = async (answerId) => {
  try {
    let response = await axios.post(`/answer/${answerId}/unlike`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}