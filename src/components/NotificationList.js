/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import {connect} from "react-redux";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";
import Dash from "react-native-dash";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import strings from "../constants/strings";

class NotificationList extends PureComponent {
  renderNotification = ({item}) => {
    return (
      <MenuOption
        style={styles.menuOption}
      >
        <Image
          source={{
            uri:
              "https://avatars0.githubusercontent.com/u/49580371?s=460&u=74f444710198d10f41e44f01637c3de3529db178&v=4",
          }}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.text}>{item.text}</Text>
      </MenuOption>
    )
  }
  separator = () => (
    <Dash
      style={styles.fullWidth}
      dashGap={0.1}
      dashColor={appTheme.brightContent}
      dashThickness={0.8}
    />
  )
  renderFooter = () => {
    const {notifications} = this.props;
    return (
      <MenuOption
        style={{
          flexDirection: "row",
          backgroundColor: appTheme.background,
          justifyContent: "center",
        }}
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
    backgroundColor: appTheme.background,
    flex: 1,
    paddingHorizontal: spacing.medium_sm,
  },
  darkBackground: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
  },
  text: {
    marginLeft: spacing.medium_sm,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    marginRight: 20,
  },
  showOrHide: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    paddingVertical: spacing.small
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
    backgroundColor: appTheme.background,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  fullWidth: {
    width: "100%"
  },
  optionsContainer: {
    width: 250,
    marginTop: 10
  }

});

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications || []
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);