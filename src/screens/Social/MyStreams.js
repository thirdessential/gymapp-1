/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";

import { appTheme } from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import { spacing } from "../../constants/dimension";
import { INITIAL_PAGE, streamStatus } from "../../constants/appConstants";
import { hostMeeting, joinMeeting } from "../../utils/zoomMeeting";
import StreamList from "../../components/Social/StreamList";
import { startStream } from "../../API";
import RouteNames from "../../navigation/RouteNames";
import Loader from "../../components/Loader";

class MyStreams extends PureComponent {

  state = {
    nextLiveStreamPage: INITIAL_PAGE,
    loading: false
  }

  componentDidMount() {
    this.updateLiveStreams();
  }

  updateLiveStreams = async () => {
    const { updateLiveStreams } = this.props;
    const { nextLiveStreamPage } = this.state;
    if (!!nextLiveStreamPage)
      this.setState({
        nextLiveStreamPage: await updateLiveStreams(nextLiveStreamPage)
      });
  }
  async refreshlist(data) {
    const { updateLiveStreams } = this.props;

    this.setState({
      nextLiveStreamPage: await updateLiveStreams(INITIAL_PAGE)
    });
  }
  onStartStream = async (stream) => {
    this.setState({ loading: true });
    const res = await startStream(stream._id);

    if (res.success) {
      await hostMeeting(stream.meetingNumber, res.token, this.props.userName, stream.clientKey, stream.clientSecret);
      this.setState({ loading: false });
      this.props.setStreamFinished(stream._id);
    }
  }
  renderLiveStreams = () => {
    return (
      <StreamList
        streams={this.props.liveStreams}
        onStart={this.onStartStream}
        refresh={(data) => { this.refreshlist(data) }}
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
        <Entypo name={"plus"} color={"white"} size={32} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLiveStreams()}
        {this.fab()}
        <Loader loading={this.state.loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  setStreamFinished: (streamId) => dispatch(actionCreators.setLiveStreamStatus(streamId, streamStatus.FINISHED))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyStreams);