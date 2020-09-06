import {readFromStorage, saveToStorage} from "./storage";

const PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';
import RNExitApp from "react-native-exit-app";
import LaunchApplication from "react-native-bring-foreground";

import {
  appPackageId,
  firebaseTopics,
  notificationActions, notificationActionTypes,
  remoteMessageTypes,
  storageKeys
} from "../constants/appConstants";
import {navigate} from "../navigation/RootNavigation";
import RouteNames from "../navigation/RouteNames";
import {requestCameraAndAudioPermission} from "./permission";
import {showMessage, hideMessage} from "react-native-flash-message";
import strings from "../constants/strings";
import {not} from "react-native-reanimated";

export const callHandler = async (remoteMessage) => {
  console.log('Remote Message handled in the background!', remoteMessage);
  const {data} = remoteMessage;
  switch (data.type) {
    case remoteMessageTypes.CALL:
      LocalCallNotification(data);
      const modifiedData = {...data, receiveTime: new Date()}
      await saveToStorage(storageKeys.PENDING_CALL, modifiedData);
      LaunchApplication.open(appPackageId);
      break;
    case remoteMessageTypes.APPOINTMENT:
      const {content} = data;
      if (!!content)
        LocalMessageNotification(strings.NEW_APPOINTMENT, content);
      break;
    case remoteMessageTypes.CALLBACK_REQ: {
      const {content} = data;
      if (!!content)
        LocalMessageNotification(strings.CALL_REQUEST, content);
      await appendOfflineNotification(data);
    }
      break;
    case remoteMessageTypes.CALLBACK_ACCEPT: {
      const {content, displayImage} = data;
      if (!!content)
        LocalMessageNotification(strings.CALL_REQUEST_ACCEPTED, content);
      await appendOfflineNotification(data);
    }
      break;
    case remoteMessageTypes.GENERIC_NOTIFICATION:
      const {message} = data;
      LocalMessageNotification(strings.LIVE, message);
      await appendOfflineNotification(data);
      break;
    case remoteMessageTypes.SESSION_STARTED: {
      const {message} = data;
      LocalMessageNotification(strings.SESSION, message);
      await appendOfflineNotification(data);
    }
      break;
    default:
      break;
  }
}

const appendOfflineNotification = async (data) => {
  let notifications = await readFromStorage(storageKeys.PENDING_NOTIFICATIONS);
  if (!notifications) notifications = [];
  notifications.push(data);
  await saveToStorage(storageKeys.PENDING_NOTIFICATIONS, notifications);
}

export const configureFCMNotification = async () => {
  try {
    let deviceToken = await messaging().getToken();
    messaging().subscribeToTopic(firebaseTopics.SILENT_NOTIFICATION);
    // messaging().subscribeToTopic(firebaseTopics.DISPLAY_NOTIFICATION);

    console.log("Subscribed to topics");
    PushNotification.configure({
      onRegister: (token) => {
        // console.log("TOKEN:", token);
      },
      onNotification: handleNotification,
      senderID: deviceToken,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
      visibility: 'public',

    });
  } catch (error) {
    console.log("error", error);
  }
};

const handleNotification = async (notification) => {
  console.log("General Notification", notification);
  if (notification.action === notificationActions.Reject) {
    PushNotification.cancelAllLocalNotifications();
    RNExitApp.exitApp();
  }
  if (notification.action === notificationActions.Accept) {
    PushNotification.cancelAllLocalNotifications();
    const {agoraAppId, sessionId, type} = notification.payload;
    switch (type) {
      case remoteMessageTypes.CALL:
        console.log("Accepted call");
        const permissionGranted = await requestCameraAndAudioPermission();
        if (!permissionGranted) return;
        navigate(RouteNames.VideoCall, {
          AppID: agoraAppId,
          ChannelName: sessionId
        });
        break;
      case remoteMessageTypes.APPOINTMENT:
        console.log("Handle appointment action here");
        break;
      default:
        break;
    }
  }
  if (notification.foreground) {
    console.log("Handled notification in App"); // no need for this actually
    // showNotification(notification.message);
  }
};

export const LocalCallNotification = (data) => {
  const {displayName} = data;
  PushNotification.localNotification({
    autoCancel: false, // (optional) default: true
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    color: "red",
    vibrate: true,
    vibration: 300,
    priority: "high",
    visibility: "public",
    importance: "high",
    allowWhileIdle: true,
    ignoreInForeground: false,
    // ongoing:true,
    /* iOS and Android properties */
    title: `${displayName} calling`,
    message: "Accept call?",
    playSound: true,
    soundName: "ringer.mp3",
    number: 10,
    actions: `["${notificationActions.Accept}", "${notificationActions.Reject}"]`,
    payload: data
  });
}
export const LocalMessageNotification = (title, message) => {
  PushNotification.localNotification({
    autoCancel: false, // (optional) default: true
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    color: "green",
    vibrate: true,
    vibration: 300,
    priority: "high",
    visibility: "public",
    importance: "high",
    allowWhileIdle: true,
    ignoreInForeground: false,
    // ongoing:true,
    /* iOS and Android properties */
    title: title,
    message: message,
    playSound: true,
    number: 10,
  });
}

export const showSuccess = message => {
  showMessage({
    message: message,
    type: "success",
  });
}

export const showInfo = message => {
  showMessage({
    message: message,
    type: "info",
  });
}

export const showError = message => {
  showMessage({
    message: message,
    type: "danger",
  });
}