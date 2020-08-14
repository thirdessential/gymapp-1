/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Button, Text, TouchableOpacity} from 'react-native'
import RouteNames from "../../navigation/RouteNames";
import {requestCameraAndAudioPermission} from "../../utils/permission";
import {spacing} from "../../constants/dimension";
import GenericText from "../../components/GenericText";
import ZoomUs from 'react-native-zoom-us';

const zoomUserType = 2; // 2 - pro user
class Zoom extends Component {
  zakTokenRaw = 'eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJQSl9UejFPaVNQMkdxLWc3RHYwOGt3IiwiaXNzIjoid2ViIiwic3R5IjoxLCJ3Y2QiOiJhdzEiLCJjbHQiOjAsInN0ayI6Ijk2WENXbzIwTlZsZ3BlYk5ZakNFa0N0LXpxX1F5Vlp3ZWtuUjgyUGtJNzguRWdJQUFBRno1NVF6WGdBQWpLQWdjVWhMSzBvemMxbHlNMHQwTXk5Mk1WVnhPRXRPU214aFZVbElUalU0TTJVQURETkRRa0YxYjJsWlV6TnpQUU5oZHpFIiwiZXhwIjoxNTk3MzU0MTE2LCJpYXQiOjE1OTczMTgxMTYsImFpZCI6IklUTjBPckdOVDBHQnB4WTh5YmRJRGciLCJjaWQiOiIifQ.DLldhfDimGgXD0PZMlMp9WgCiuPgAG9jnt8WmEUpS28'; // TODO: meeting zak
  meetingNo = '95159013427'; // TODO: meeting number
  // A screen whose only job is to open VideoCall with these params
  async componentDidMount() {
    await ZoomUs.initialize(
      'hKodHeKdo7c0g7Qh4Dx5MnQMp6j19tc1WGbs',
      'Pxu4Jq7BjGG50kXxoDizV1FkAcLxdwTmDtPq',
      'zoom.us'
    );
  }


  async start() {
    const zakToken =  decodeURIComponent(this.zakTokenRaw);
    const displayName = 'Test mentor';
    //
    // // TODO recieve user's details from zoom API? WOUT: webinar user is different
    const userId = 'oggybuddy10@gmail.com'; // NOTE: no need for userId when using zakToken
    const userType = zoomUserType;
    const zoomToken = 'null'; // NOTE: no need for userId when using zakToken

    const zoomAccessToken = zakToken;

    try {
      const startMeetingResult = await ZoomUs.startMeeting(
        displayName,
        this.meetingNo,
        userId,
        userType,
        zoomAccessToken,
        zoomToken
      );
      console.warn({ startMeetingResult });
    } catch(e) {
      console.warn({ e });
    }
  }
  async join() {
    const displayName = 'Test student';

    try {
      const joinMeetingResult = await ZoomUs.joinMeeting(
        displayName,
        '91079451499',
      );
      console.warn({ joinMeetingResult });
    } catch(e) {
      console.warn({ e });
    }
  }

  render() {
    return (<View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <GenericText type={GenericText.types.headingBold}>Zoom test</GenericText>
        </View>

        <TouchableOpacity
          onPress={() => this.start()}
          style={styles.buttonContainer}>
          <GenericText type={GenericText.types.heading}>Start test</GenericText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.join()}
          style={styles.buttonContainer}>
          <GenericText type={GenericText.types.heading}>Join Meeting</GenericText>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: spacing.large_lg,
    marginTop: spacing.large_lg
  },
  buttonContainer: {
    width: 200,
    justifyContent: 'center',
    alignItems: "center",
    margin: spacing.medium_sm,
    borderColor: 'black',
    borderWidth: 1,
    padding: spacing.small,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    borderRadius: 10
  }
});

export default Zoom;