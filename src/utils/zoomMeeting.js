import ZoomUs from 'react-native-zoom-us';
import {zoomConfig} from "../constants/appConstants";

const zoomUserType = 2; // 2 - pro user

export const hostMeeting = async (meetingNumber, zakTokenRaw, displayName = 'Trainer') => {
  await ZoomUs.initialize(
    zoomConfig.key,
    zoomConfig.secret,
    zoomConfig.domain
  );
  const zakToken = decodeURIComponent(zakTokenRaw);
  const userType = zoomUserType;
  const zoomToken = 'null';
  try {
    const startMeetingResult = await ZoomUs.startMeeting(
      displayName,
      meetingNumber.toString(),
      'random',
      userType,
      zakToken,
      zoomToken,
      true
    );
    console.log({startMeetingResult});
  } catch (e) {
    console.log({e});
  }
}

export const joinMeeting = async (meetingNumber, password, displayName="User") => {
  await ZoomUs.initialize(
    zoomConfig.key,
    zoomConfig.secret,
    zoomConfig.domain
  );

  try {
    const joinMeetingResult = await ZoomUs.joinMeetingWithPassword(
      displayName,
      meetingNumber.toString(),
      password,
      true
    );
    console.log({joinMeetingResult});
  } catch (e) {
    console.log({e});
  }
}
