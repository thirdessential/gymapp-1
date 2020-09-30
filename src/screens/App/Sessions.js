/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, LayoutAnimation , ScrollView , RefreshControl} from 'react-native'
import {connect} from "react-redux";
import {TabView, TabBar} from "react-native-tab-view";
import { militaryTimeToString } from "../../utils/utils";
import * as actionCreators from '../../store/actions';
import {appTheme} from "../../constants/colors";
import SessionCard from "../../components/SessionCard";
import {spacing} from "../../constants/dimension";
import {getHashedImage} from "../../constants/images";
import moment from "moment";
import {datesAreOnSameDay} from "../../utils/utils";
import {subscriptionType, userTypes} from "../../constants/appConstants";
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import strings from "../../constants/strings";
import {screenWidth} from "../../utils/screenDimensions";
import {hostMeeting, joinMeeting} from "../../utils/zoomMeeting";
import TodaySessionSwiper from "../../components/TodaySessionSwiper";

const initialLayout = {width: screenWidth};

class Sessions extends Component {
  state = {
    todaySessions: null,
    pageIndex: 0,
    futureSessions: [],
    pastSessions: [],
    joinLoading: null
  }
  setPage = (pageIndex) => this.setState({pageIndex});

  async componentDidMount() {
    //First set today's session from cache, update it from api and set it again
    this.updateLocalSessionData();
    await this.props.syncSessions();
    this.updateLocalSessionData();
    this.setState({refreshing: false})

  }

  updateLocalSessionData = async () => {
    // Local update is a common pattern in which we take data from redux store, transform it for our component
    const {sessions} = this.props;
    const today = new Date();
    if (!sessions || sessions.length === 0) return;
    const todaySessions = sessions.filter(session => datesAreOnSameDay(new Date(session.date), today));
    const pastSessions = sessions.filter(session => new Date(session.date) < today);
    const futureSessions = sessions.filter(session => new Date(session.date) >= today);
    this.setState({todaySessions, pastSessions, futureSessions});
  }

  onJoin = async (sessionId, type) => {
    this.setState({joinLoading: sessionId});
    const {data} = await this.props.joinSession(sessionId);
    const {clientKey, clientSecret, meetingNumber, meetingPassword} = data;
    switch (type) {
      case subscriptionType.BATCH: {
        // join zoom session
        await joinMeeting(meetingNumber, meetingPassword, this.props.userName, clientKey, clientSecret);
      }
        break;
      case subscriptionType.SINGLE: {
        // Join agora call
        const {
          agoraAppId,
          sessionId,
          displayName,
          displayImage
        } = data;
        this.props.navigation.navigate(RouteNames.VideoCall, {
          AppID: agoraAppId,
          ChannelName: sessionId,
          displayPictureUrl: displayImage,
          displayName: displayName,
        });
      }
        break;
      default:
        break;
    }
    this.setState({joinLoading: null});
  }
  onStart = async (sessionId, type) => {
    const {navigation} = this.props;
    this.setState({joinLoading: sessionId});
    const {data, token} = await this.props.startSession(sessionId);
    switch (type) {
      case subscriptionType.BATCH: {
        const {clientKey, clientSecret, meetingNumber} = data;
        // Host zoom meeting
        await hostMeeting(meetingNumber, token, this.props.userName, clientKey, clientSecret);
        if (navigation.canGoBack()) // go to previous screen so that session data is properly updated when it is reopened, just an insurance, optional
          navigation.goBack();
      }
        break;
      case subscriptionType.SINGLE: {
        const {
          agoraAppId,
          sessionId,
          displayPictureUrl,
          displayName
        } = data;
        navigation.pop();
        // Start agora call
        navigation.navigate(RouteNames.VideoCall, {
          AppID: agoraAppId,
          ChannelName: sessionId,
          initiating: true,
          displayPictureUrl,
          displayName,
        });
      }
        break;
      default:
        break;
    }
    this.setState({joinLoading: null});
  }
  renderTodaySessions = () => {
    const {todaySessions} = this.state;
    if (!todaySessions) return null;
    const onJoin = this.props.userType === userTypes.TRAINER ? this.onStart : this.onJoin;
    return (
      <TodaySessionSwiper
        sessions={todaySessions}
        onJoin={onJoin}
        trainer={this.props.userType === userTypes.TRAINER} // different actions based on userType
        loadingId={this.state.joinLoading} // signify which session's api call is in loading state
      />
    )
  }

  renderSession = ({item}) => {
    const date = new Date(item.date);
    const hours = item.date.substr(11,2);
    const mins = item.date.substr(14,2);
    const time = hours + mins;
    console.log(time)
    const thumbnail = getHashedImage(item._id); // Return same image for item id, image is same between re render cycles
    const {users} = item;
    return (
      <SessionCard
        status={item.status}
        thumbnail={thumbnail}
        title={item.packageId.title}
        duration={item.duration}
        time={militaryTimeToString(time)}
        date={date}
        type={item.type}
        subscribers={users && users.length}
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
    />
  }

  routes = [
    {key: TabRoutes.FutureSessions, title: strings.UPCOMING},
    {key: TabRoutes.PastSessions, title: strings.DONE},
  ];
  renderScene = ({route}) => {
    // Render future and done sessions in a tab view
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
        style={styles.tabView}
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
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount()
   
  }
  render() {
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={this._onRefresh}
        />
      }
      >
        <View style={styles.container}>
          {this.renderTodaySessions()}
          {this.renderTabView()}
        </View>
      </ScrollView>
      
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
  tabView: {
    marginTop: -spacing.medium
  }
});

const mapStateToProps = (state) => ({
  sessions: state.trainer.sessions,
  userType: state.user.userType,
  userName: state.user.userData.name,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
  startSession: (sessionId) => dispatch(actionCreators.startSession(sessionId)),
  joinSession: (sessionId) => dispatch(actionCreators.joinSession(sessionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);