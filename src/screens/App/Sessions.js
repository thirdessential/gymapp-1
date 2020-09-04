/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, LayoutAnimation} from 'react-native'
import {connect} from "react-redux";
import {TabView, TabBar} from "react-native-tab-view";

import * as actionCreators from '../../store/actions';
import {appTheme} from "../../constants/colors";
import SessionCard from "../../components/SessionCard";
import {spacing} from "../../constants/dimension";
import {getHashedImage} from "../../constants/images";
import moment from "moment";
import TodaySession from "../../components/TodaySession";
import {customDelay, datesAreOnSameDay} from "../../utils/utils";
import {packageImages, rootURL, userTypes} from "../../constants/appConstants";
import {TabRoutes} from "../../navigation/RouteNames";
import strings from "../../constants/strings";
import {screenWidth} from "../../utils/screenDimensions";

const initialLayout = {width: screenWidth};

class Sessions extends Component {
  state = {
    todaySession: null,
    pageIndex: 0,
    futureSessions: [],
    pastSessions: []
  }
  setPage = (pageIndex) => this.setState({pageIndex});

  async componentDidMount() {
    //First set today's session from cache, update it from api and set it again
    this.updateLocalSessionData();
    // await this.props.syncSessions();
    this.updateLocalSessionData();
  }

  updateLocalSessionData = async () => {
    const {sessions} = this.props;
    const today = new Date();
    if (!sessions || sessions.length === 0) return;
    const todaySession = sessions.filter(session => datesAreOnSameDay(new Date(session.date), today))[0];
    const pastSessions = sessions.filter(session => new Date(session.date) < today);
    const futureSessions = sessions.filter(session => new Date(session.date) >= today);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({todaySession, pastSessions, futureSessions});
  }

  getItemLayout = (data, index) => (
    {length: 110, offset: (110 + 10) * index - 5, index}
  )
  renderTodaySession = () => {
    const {todaySession} = this.state;
    if (!todaySession) return null;  //TODO: should we return some sort of no sessions message?
    const date = new Date(todaySession.date);
    return <TodaySession
      title={todaySession.packageId.title}
      thumbnail={packageImages[todaySession.packageId.category]}
      duration={todaySession.duration}
      date={date}
      time={moment(date).format('LT')}
      status={todaySession.status}
      trainer={this.props.userType===userTypes.TRAINER}
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
  renderSessionList = (sessions) => {
    return <FlatList
      ref={(ref) => {
        this.flatListRef = ref;
      }}
      data={sessions}
      renderItem={this.renderSession}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={this.separator}
      keyExtractor={this.keyExtractor}
      ListFooterComponent={this.separator}
      // getItemLayout={this.getItemLayout}
    />
  }


  routes = [
    {key: TabRoutes.FutureSessions, title: strings.UPCOMING},
    {key: TabRoutes.PastSessions, title: strings.DONE},
  ];
  renderScene = ({route}) => {
    console.log(route.key)
    switch (route.key) {
      case TabRoutes.FutureSessions:
        return this.renderSessionList(this.state.futureSessions);
      case TabRoutes.PastSessions:
        return this.renderSessionList(this.state.pastSessions);
      default:
        return null;
    }
  };

  renderTabView = () => {
    return (
      <TabView
        navigationState={{index: this.state.pageIndex, routes: this.routes}}
        renderScene={this.renderScene}
        onIndexChange={this.setPage}
        initialLayout={initialLayout}
        swipeEnabled={false}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{backgroundColor: "transparent"}}
            indicatorStyle={{backgroundColor: appTheme.lightContent}}
            tabStyle={styles.bubble}
            labelStyle={styles.noLabel}
          />
        )}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTodaySession()}
        {/*{this.renderSessionList()}*/}
        {this.renderTabView()}
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
  },
  noLabel: {
    fontSize: 12,
  },
  bubble: {
    backgroundColor: "transparent",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

});

const mapStateToProps = (state) => ({
  sessions: state.trainer.sessions,
  userType:state.user.userType
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);