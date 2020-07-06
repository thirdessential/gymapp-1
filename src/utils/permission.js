/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {PermissionsAndroid} from "react-native";

export async function requestCameraAndAudioPermission() {
  try {
    const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) &&
      await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    if(alreadyGranted){
      console.log("permissions already granted");
      return true;
    }

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] ===
      PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.CAMERA"] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("cameras & mic permissions available");
      return true;
    } else {
      console.log("Permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
