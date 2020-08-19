/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {FlatList, Image, StyleSheet, Text, View,} from "react-native";
import {connect} from "react-redux";
import {Menu, MenuOption, MenuOptions, MenuTrigger,} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";

import * as actionCreators from '../store/actions';
import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import strings from "../constants/strings";
import {defaultDP, notificationActionTypes} from "../constants/appConstants";
import {screenHeight, screenWidth} from "../utils/screenDimensions";
import RouteNames from "../navigation/RouteNames";
import {navigate} from "../navigation/RootNavigation";
import {joinMeeting} from "../utils/zoomMeeting";
import {not} from "react-native-reanimated";

class NotificationList extends PureComponent {
  renderNotification = ({item}) => {
    const bgStyle = {backgroundColor: item.read ? appTheme.background : appTheme.darkGrey};
    return (
      <MenuOption
        style={[styles.menuOption, bgStyle]}
        onSelect={() => this.handleAction(item)}
      >
        <Image
          source={{uri: item.displayImage || defaultDP,}}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.text}>{item.text}</Text>
      </MenuOption>
    )
  }
  handleAction = (item) => {
    const {id, read, data, type} = item;
    console.log(item);
    switch (type) {
      case notificationActionTypes.CALL_REQUEST:
        navigate(RouteNames.CallRequests);
        break;
      case notificationActionTypes.STREAM:
        if (data && !read) {
          joinMeeting(data.meetingId, data.meetingPassword, this.props.userName)
        }
        break;
      default:
        break;
    }
    this.props.readNotification(id);
  }
  separator = () => (
    <View
      style={styles.separator}
    />
  )
  getUnreadCount = () => {
    const {notifications} = this.props;
    return notifications.filter(notification => !notification.read).length;
  }
  renderHeader = () => {
    const {notifications} = this.props;
    const unreadCount = this.getUnreadCount();
    if (notifications.length === 0 || unreadCount === 0) return null;
    return (
      <MenuOption
        style={[styles.menuOption, {justifyContent: 'center', backgroundColor: appTheme.background}]}
        onSelect={this.readAll}
      >

        <Text style={styles.showOrHide}>{strings.MARK_ALL_READ}</Text>
      </MenuOption>
    )
  }
  renderFooter = () => {
    const {notifications} = this.props;
    if (notifications.length > 0) return null;
    return (
      <MenuOption
        style={[styles.menuOption, {justifyContent: 'center'}]}
      >
        {
          notifications.length === 0 && (
            <Text style={styles.showOrHide}>{strings.NO_NOTIFICATIONS}</Text>
          )
        }
      </MenuOption>
    )
  }
  readAll = () => {
    const {notifications, readNotification} = this.props;
    notifications.map(notification => readNotification(notification.id));
  }


  render() {
    const {notifications} = this.props;
    const unreadCount = this.getUnreadCount();
    return (
      <Menu>
        <MenuTrigger style={{marginRight: 10}}>
          <Feather
            name="bell"
            color={appTheme.brightContent}
            size={30}
          />
          {
            unreadCount > 0 && (
              <View style={styles.bellIcon}>
                <Text style={{color: appTheme.brightContent}}>
                  {unreadCount}
                </Text>
              </View>
            )
          }
        </MenuTrigger>
        <MenuOptions
          customStyles={styles.darkBackground}
          optionsContainerStyle={styles.optionsContainer}
        >
          {this.renderHeader()}
          <FlatList
            data={notifications}
            style={styles.fullWidth}
            renderItem={this.renderNotification}
            ItemSeparatorComponent={this.separator}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          {this.renderFooter()}
        </MenuOptions>
      </Menu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium_sm,
  },
  darkBackground: {
    flex: 1,
    marginRight: spacing.medium_sm
  },
  text: {
    marginLeft: spacing.medium_sm,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    // marginRight: 20,
  },
  showOrHide: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    // paddingVertical: spacing.small
  },
  bellIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: -5,
    marginTop: -5,
    backgroundColor: "white",
    borderRadius: 20,
    height: 20,
    width: 20,
  },
  menuOption: {
    flexDirection: "row",
    backgroundColor: appTheme.darkGrey,
    paddingRight:spacing.medium_sm
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 40,
    marginTop: spacing.small,
  },
  fullWidth: {
    width: "100%",
    height: screenHeight / 1.5
  },
  optionsContainer: {
    width: screenWidth / 1.5,
  },
  separator: {
    width: '100%',
    height: 0.8,
    backgroundColor: appTheme.brightContent,
  }
});

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications || [],
  userName: state.user.userData.name,
});

const mapDispatchToProps = (dispatch) => ({
  readNotification: id => dispatch(actionCreators.readNotification(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);