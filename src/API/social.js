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


