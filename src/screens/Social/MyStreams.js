/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from "react";
import {
  View,
  StyleSheet, Image, Text, TextInput, TouchableOpacity, LayoutAnimation, ActivityIndicator,
} from "react-native";
import {connect} from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

import {appTheme, bmiColors} from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import {spacing} from "../../constants/dimension";
import {INITIAL_PAGE} from "../../constants/appConstants";
import {hostMeeting, joinMeeting} from "../../utils/zoomMeeting";
import StreamList from "../../components/Social/StreamList";
import {startStream} from "../../API";
import Entypo from "react-native-vector-icons/Entypo";
import RouteNames from "../../navigation/RouteNames";
import Loader from "../../components/Loader";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {customDelay} from "../../utils/utils";
import {showSuccess} from "../../utils/notification";
import strings from "../../constants/strings";

class MyStreams extends PureComponent {

  state = {
    nextLiveStreamPage: INITIAL_PAGE,
    loading: false
  }

  componentDidMount() {
    this.updateLiveStreams();
  }

  updateLiveStreams = async () => {
    const {updateLiveStreams} = this.props;
    const {nextLiveStreamPage} = this.state;
    if (!!nextLiveStreamPage)
      this.setState({
        nextLiveStreamPage: await updateLiveStreams(nextLiveStreamPage)
      });
  }

  onStartStream = async (stream) => {
    this.setState({loading: true});
    const res = await startStream(stream._id);
    if (res.success) {
      this.setState({loading: false});
      // showSuccess(strings.GOING_LIVE_);
      await hostMeeting(stream.meetingId, res.token, this.props.userName);
    }

  }
  renderLiveStreams = () => {
    return (
      <StreamList
        streams={this.props.liveStreams}
        onStart={this.onStartStream}
      />
    )
  }
  openLiveScheduler = () => this.props.navigation.navigate(RouteNames.LiveScheduler);
  fab = () => {
    return (
      <TouchableOpacity
        style={[styles.fab, styles.fabPosition]}
        onPress={this.openLiveScheduler}
      >
        <Entypo name={"plus"} color={"white"} size={32}/>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLiveStreams()}
        {this.fab()}
        <Loader loading={this.state.loading}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    paddingHorizontal: spacing.medium_sm,
    backgroundColor: appTheme.background,
    flex: 1,
  },
  fab: {
    height: spacing.space_50,
    width: spacing.space_50,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.brightContent,
  },
  fabPosition: {
    position: "absolute",
    bottom: spacing.medium_sm,
    right: spacing.medium,
  },

});

const mapStateToProps = (state) => ({
  userName: state.user.userData.name,
  liveStreams: state.social.myLiveStreams,
});

const mapDispatchToProps = (dispatch) => ({
  updateLiveStreams: (page) => dispatch(actionCreators.updateLiveStreams(page, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyStreams);