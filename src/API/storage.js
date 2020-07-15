import RNFetchBlob from "rn-fetch-blob";
import ImageResizer from "react-native-image-resizer";

import {dpDimension, imageTypes, rootURL} from "../constants/appConstants";
import {getOSPath} from "../utils/utils";

export const getFileExtension = (path) => path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);

export const uploadImage = async (path, token, imageType = imageTypes.AVATAR) => {
  try {
    let fileExtension = getFileExtension(path);
    console.log("Uploading from ", path);
    let compressedPath = await compressImage(path, imageType.dimension);
    const url = imageType.type === imageTypes.AVATAR.type ? '/user/displayImage' : '/user/wallImage';

    const uploadData = [
      {
        name: "mediaContent",
        filename: path,
        type: "image/" + fileExtension,
        data: RNFetchBlob.wrap(compressedPath),
      },
    ];
    let response = await RNFetchBlob.fetch(
      "PUT",
      rootURL + url,
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


export const compressImage = async (uri, dimensions) => {
  try {
    console.log("Starting compressor for ", uri);
    let extension = getFileExtension(uri);
    if (extension === "jpg") extension = "jpeg"; //Imageresizer demands this
    if (extension !== "jpeg" && extension !== "png") {
      //We have something other than jpg or png, maybe a bmp?
      console.log("Compressor changing extension to jpg from", extension);
      extension = "jpg";
    }
    let compressedImage = await ImageResizer.createResizedImage(
      uri,
      dimensions.width,
      dimensions.height,
      extension.toUpperCase(),
      80,
      0,
    );
    console.log("Compressed image response", compressedImage);
    console.log("Compressed to ", compressedImage.size / 1000, "kb");
    return compressedImage.path;
  } catch (error) {
    console.log("Compression error", error);
    return false;
  }
};
