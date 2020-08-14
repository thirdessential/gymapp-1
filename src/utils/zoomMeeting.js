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
      zoomToken
    );
    console.log({startMeetingResult});
  } catch (e) {
    console.log({e});
  }
}

export const joinMeeting = async (meetingNumber, password) => {
  await ZoomUs.initialize(
    zoomConfig.key,
    zoomConfig.secret,
    zoomConfig.domain
  );
  const displayName = 'Test student';

  try {
    const joinMeetingResult = await ZoomUs.joinMeeting(
      displayName,
      meetingNumber,
    );
    console.log({joinMeetingResult});
  } catch (e) {
    console.log({e});
  }
}
