/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {connect} from "react-redux";
import {Menu, MenuOption, MenuOptions, MenuTrigger, renderers} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import Ionicons from "react-native-vector-icons/Ionicons";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

import * as actionCreators from '../store/actions';
import {appTheme, bmiColors} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import strings from "../constants/strings";
import {defaultDP, notificationActionTypes} from "../constants/appConstants";
import {screenHeight, screenWidth} from "../utils/screenDimensions";
import RouteNames from "../navigation/RouteNames";
import {navigate} from "../navigation/RootNavigation";
import {joinMeeting} from "../utils/zoomMeeting";
import {showInfo} from "../utils/notification";

class NotificationList extends PureComponent {
  renderNotification = ({item, index}) => {

    const {sentDate} = item;
    const date = new Date(sentDate);
    const bgStyle = {backgroundColor: index % 2 ? appTheme.background : appTheme.darkGrey};
    return (
      <MenuOption
        style={[styles.menuOption, bgStyle]}
        onSelect={() => this.handleAction(item)}
      >
        <View style={styles.row}>
          <Image
            source={{uri: item.displayImage || defaultDP,}}
            style={styles.image}
            resizeMode={"contain"}
          />
          <View>
            <Text style={styles.text}>{item.text}</Text>
            <View style={[styles.row, {justifyContent: 'space-between', marginRight: spacing.space_40}]}>
              <Text style={styles.subtitle}>{timeAgo.format(date)}</Text>
              <Ionicons name='checkmark-done-sharp' color={item.read ? bmiColors.lightBlue : appTheme.greyC}/>
            </View>
          </View>
        </View>
      </MenuOption>
    )
  }

  handleAction = (item) => {
    const {id, read, data, type} = item;
    switch (type) {
      case notificationActionTypes.CALL_REQUEST:
        navigate(RouteNames.CallRequests);
        break;
      case notificationActionTypes.COUPON_APPROVED:
        navigate(RouteNames.CouponMachine);
        break;
      case notificationActionTypes.STREAM:
        if (Object.keys(data).length !== 0 && !read) {
          showInfo(strings.JOINING);
          joinMeeting(data.meetingNumber, data.meetingPassword, this.props.userName, data.clientKey, data.clientSecret);
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
  renderMarkRead = () => {
    const {notifications} = this.props;
    const unreadCount = this.getUnreadCount();
    if (notifications.length === 0) return null;
    return (
      <View>
        {this.separator()}
        <MenuOption
          style={[styles.menuOption, {
            justifyContent: unreadCount === 0 ? 'flex-end' : 'space-between',
            paddingVertical: spacing.small_lg,
            backgroundColor: appTheme.background,
            flexDirection: 'row'
          }]}
        >
          {unreadCount !== 0 &&
          <TouchableOpacity onPress={this.readAll}>
            <Text style={styles.showOrHide}>{strings.MARK_ALL_READ}</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity onPress={this.clearAll}>
            <Text style={styles.showOrHide}>{strings.CLEAR_ALL}</Text>
          </TouchableOpacity>
        </MenuOption>
      </View>
    )
  }
  noNotifications = () => {
    const {notifications} = this.props;
    if (notifications.length > 0) return null;
    return (
      <MenuOption
        style={[styles.menuOption, {justifyContent: 'center', backgroundColor: appTheme.darkGrey}]}
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
    this.menu.close();
    const {notifications, readNotification} = this.props;
    notifications.map(notification => readNotification(notification.id));
  }
  clearAll = () => {
    this.menu.close();
    this.props.clearAll();
  }

  render() {
    const {notifications} = this.props;
    const unreadCount = this.getUnreadCount();
    return (
      <Menu
        style={styles.rightMargin}
        rendererProps={{
          placement: 'bottom', anchorStyle: {
            backgroundColor: appTheme.darkGrey
          }
        }}
        renderer={renderers.Popover}
        anchorStyle={{height: 100}}
        ref={ref_ => this.menu = ref_}>
        <MenuTrigger>
          <Feather
            name="bell"
            color={appTheme.brightContent}
            size={25}
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
          <FlatList
            data={notifications}
            style={notifications.length > 0 ? styles.fullWidth : {}}
            renderItem={this.renderNotification}
            ItemSeparatorComponent={this.separator}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          {this.renderMarkRead()}
          {this.noNotifications()}
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
  rightMargin: {
    marginRight: spacing.medium_sm
  },
  darkBackground: {
    flex: 1,
    marginRight: spacing.medium_sm,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: spacing.medium_sm,
    marginRight: spacing.medium,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h3,
  },
  subtitle: {
    marginLeft: spacing.medium_sm,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4,
  },
  showOrHide: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h4,
    alignSelf: 'center'
  },
  bellIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: -5,
    marginTop: -5,
    backgroundColor: appTheme.textPrimary,
    borderRadius: 20,
    height: 20,
    width: 20,
  },
  menuOption: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium_sm
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 40,
    marginTop: spacing.small,
  },
  fullWidth: {
    maxHeight: screenHeight / 1.5,
    backgroundColor: appTheme.darkGrey
  },
  optionsContainer: {
    width: screenWidth / 1.5,
  },
  separator: {
    width: '100%',
    height: 0.6,
    backgroundColor: appTheme.grey,
  }
});

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications || [],
  userName: state.user.userData.name,
});

const mapDispatchToProps = (dispatch) => ({
  readNotification: id => dispatch(actionCreators.readNotification(id)),
  clearAll: () => dispatch(actionCreators.clearAllNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);