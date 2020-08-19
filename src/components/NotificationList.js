/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {FlatList, Image, StyleSheet, Text, View,} from "react-native";
import {connect} from "react-redux";
import {Menu, MenuOption, MenuOptions, MenuTrigger,} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";
import Dash from "react-native-dash";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import strings from "../constants/strings";
import {defaultDP} from "../constants/appConstants";
import {screenWidth} from "../utils/screenDimensions";

class NotificationList extends PureComponent {
  renderNotification = ({item}) => {
    return (
      <MenuOption
        style={styles.menuOption}
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
  separator = () => (
    <View
      style={styles.separator}
    />
  )
  renderFooter = () => {
    const {notifications} = this.props;
    if (notifications.length > 0) return null;
    return (
      <MenuOption
        style={[styles.menuOption,{justifyContent:'center'}]}
      >
        {
          notifications.length === 0 && (
            <Text style={styles.showOrHide}>{strings.NO_NOTIFICATIONS}</Text>
          )
        }
      </MenuOption>
    )
  }


  render() {
    const {notifications} = this.props;
    return (
      <Menu>
        <MenuTrigger style={{marginRight: 10}}>
          <Feather
            name="bell"
            color={appTheme.brightContent}
            size={30}
          />
          {
            notifications.length > 0 && (
              <View style={styles.bellIcon}>
                <Text style={{color: appTheme.brightContent}}>
                  {notifications.length}
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
            style={styles.fullWidth}
            renderItem={this.renderNotification}
            ItemSeparatorComponent={this.separator}
            keyExtractor={(item) => item.id}
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
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 40,
    marginTop: spacing.small,
  },
  fullWidth: {
    width: "100%"
  },
  optionsContainer: {
    width: screenWidth / 1.5,
  },
  separator:{
    width:'100%',
    height:0.8,
    backgroundColor:appTheme.brightContent
  }
});

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications || []
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);