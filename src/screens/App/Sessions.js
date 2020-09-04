/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, LayoutAnimation} from 'react-native'
import {connect} from "react-redux";

import * as actionCreators from '../../store/actions';
import {appTheme} from "../../constants/colors";
import SessionCard from "../../components/SessionCard";
import {spacing} from "../../constants/dimension";
import {getHashedImage} from "../../constants/images";
import moment from "moment";
import TodaySession from "../../components/TodaySession";
import {customDelay, datesAreOnSameDay} from "../../utils/utils";
import {rootURL} from "../../constants/appConstants";

class Sessions extends Component {
  state = {
    todaySession: null
  }

  async componentDidMount() {
    //First set today's session from cache, update it and set it again
    this.setTodaySession();
    // await this.props.syncSessions();
    this.setTodaySession();
  }

  setTodaySession = async () => {
    const {sessions} = this.props;
    const today = new Date();
    if (!sessions || sessions.length === 0) return;
    const todaySession = sessions.filter(session => datesAreOnSameDay(new Date(session.date), today))[0];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({todaySession});
    //
    // await customDelay(10); //wait for ref to be initialised
    // const index = sessions.map(function (e) {
    //   return e._id;
    // }).indexOf(todaySession._id);
    // this.flatListRef.scrollToIndex({animated: true, index});
  }

  getItemLayout = (data, index) => (
    {length: 110, offset: (105 + 10) * index, index}
  )
  renderTodaySession = () => {
    const {todaySession} = this.state;
    if (!todaySession) return null;  //TODO: should we return some sort of no sessions message?

    return <TodaySession
      title={todaySession.packageId.title}
      thumbnail={todaySession.trainerId.displayPictureUrl}
      duration={todaySession.duration}
    />
  }

  renderSession = ({item}) => {
    const date = new Date(item.date);
    const thumbnail = getHashedImage(item._id);
    return (
      <SessionCard
        // thumbnail={packageImages[item.packageId.category]}
        status={item.status}
        thumbnail={thumbnail}
        title={item.packageId.title}
        duration={item.duration}
        time={moment(date).format('LT')}
        date={date}
        type={item.type}
      />
    )
  }

  keyExtractor = (item) => item._id
  separator = () => <View style={styles.separator}/>
  renderSessions = () => {
    return <FlatList
      ref={(ref) => {
        this.flatListRef = ref;
      }}
      data={this.props.sessions}
      renderItem={this.renderSession}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={this.separator}
      keyExtractor={this.keyExtractor}
      ListFooterComponent={this.separator}
      getItemLayout={this.getItemLayout}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTodaySession()}
        {this.renderSessions()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium_sm
  },
  separator: {
    margin: spacing.small
  }

});

const mapStateToProps = (state) => ({
  sessions: state.trainer.sessions,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);