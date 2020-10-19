import {readFromStorage, saveToStorage} from "./storage";

const PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';
import RNExitApp from "react-native-exit-app";
import LaunchApplication from "react-native-bring-foreground";
import {convertdate} from '../utils/utils'
import {
  appPackageId,
  firebaseTopics,
  notificationActions,
  remoteMessageTypes,
  storageKeys
} from "../constants/appConstants";
import {navigate} from "../navigation/RootNavigation";
import RouteNames from "../navigation/RouteNames";
import {requestCameraAndAudioPermission} from "./permission";
import {showMessage} from "react-native-flash-message";
import strings from "../constants/strings";

export const callHandler = async (remoteMessage) => {
  console.log('Remote Message handled in the background!', remoteMessage);
  // Notification handler when the app is shut down
  const {data} = remoteMessage;
  switch (data.type) {
    case remoteMessageTypes.CALL:
      // Show a notification and save notification data to storage
      LocalCallNotification(data);
      const modifiedData = {...data, receiveTime: convertdate(new Date())};
      await saveToStorage(storageKeys.PENDING_CALL, modifiedData);
      // Attempt to launch application and bring to foreground, works only on some devices
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
      const {content} = data;
      if (!!content)
        LocalMessageNotification(strings.CALL_REQUEST_ACCEPTED, content);
      // Save to async storage, when the app starts it'll be retrieved
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
    // Subscribe to all required topics here
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
    // Reject incoming call
    PushNotification.cancelAllLocalNotifications();
    RNExitApp.exitApp();
  }
  if (notification.action === notificationActions.Accept) {
    // Accept incoming call
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
    soundName: "ringer.mp3", // audio file stored in android/app/src/main/res/raw. Modify to change ringing tone
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

// In app notification handlers
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