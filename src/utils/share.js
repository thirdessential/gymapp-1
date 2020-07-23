import { Linking, Platform, Share } from "react-native";

const openLink = async (url) => {
  try {
    let supported = await Linking.canOpenURL(url);
    if (!supported) {
      console.log("Can't handle url: " + url);
      return false;
    } else {
      Linking.openURL(url);
      return true;
    }
  } catch (err) {
    console.log("Can't handle url: " + url);
    return false;
  }
};

export const shareToWhatsApp = async (text) => {
  const url = `whatsapp://send?text=${text}`;
  return openLink(url);
};

export const shareToWhatsAppWithContact = (text, phoneNumber) => {
  const url = `whatsapp://send?text=${text}&phone=${phoneNumber}`;
  return openLink(url);
};

export const shareToSms = (message, phone) => {
  return openLink(`sms:${phone}${getSMSDivider()}body=${message}`);
};

const getSMSDivider = () => (Platform.OS === "ios" ? "&" : "?");

// Tries sharing to whatsapp, falls back to message
export const fallbackShare = async (message, phone = null) => {
  try {
    let result = await shareToWhatsAppWithContact(message, phone);
    if (!result) {
      // Whatsapp share failed, share to messaging
      let result = await shareToSms(message, phone);
      if (!result) {
        console.error("Message share failed");
        return false;
      } else return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const setWhatsappInstalled = async () => {
  global.isWhatsappInstalled = await Linking.canOpenURL("whatsapp://send?text=hello");
};

export const openMail = async (email, subject, body = " ") => {
  Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
};

export const textShare = async (text = "test") => {
  try {
    const result = await Share.share({
      message: text,
    });
    if (result.action === Share.sharedAction) {
      return true;
    } else if (result.action === Share.dismissedAction) {
      return false;
    }
  } catch (error) {
    console.log("Sharing error", error);
    return false;
  }
};
