/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {spacing} from "../constants/dimension";
import {
  defaultDP,
  MS_IN_DAY,
  sessionStatus,
  streamText,
  subscriptionType,
  subscriptionTypeNames
} from "../constants/appConstants";
import {appTheme, bmiColors} from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {formatSeconds} from "../utils/utils";
import Ion from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import strings from "../constants/strings";

class TodaySession extends React.Component {
  state = {
    countDown: '        ', //  8 spaces for initial layout,
  }

  componentDidMount() {
    const date = new Date(this.props.date);
    const now = new Date();
    if ((date - now > 0)) {
      this.setState({countDown: formatSeconds((date - now) / 1000)});
      this.timer = setInterval(() => {
        const now = new Date();
        this.setState({countDown: formatSeconds((date - now) / 1000)});
        if ((date - now) / 1000 < 5) {
          clearInterval(this.timer);
          this.timer = null;
          this.setState({countDown:'        '})
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const joinEnabled = this.props.status === sessionStatus.LIVE;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{strings.TODAY_WORKOUT}</Text>
          <Text style={[styles.subtitle, {marginTop: 'auto', marginBottom: spacing.small}]}>{this.props.title}</Text>
          <Text
            style={[styles.subtitle, {color: appTheme.brightContent, fontSize: fontSizes.h2}]}>{this.props.time}, <Text><MaterialCommunityIcons
            name={'timer-outline'}
            size={14}/> {this.props.duration}
          </Text></Text>
          <View style={[styles.row, {marginTop: spacing.small}]}>
            {
              this.timer && (
                <>
                  <Ion style={{marginRight: spacing.small_sm}} name={'timer-outline'} size={14}
                       color={bmiColors.blue}/>
                  <Text style={[styles.subtitle, {color: bmiColors.blue}]}>{this.state.countDown}</Text>
                </>
              )
            }
            <TouchableOpacity
              disabled={!joinEnabled}
              onPress={this.props.onJoin}
              style={[styles.startButton, !joinEnabled && {
                backgroundColor: appTheme.grey, marginLeft: 0
              }]}>
              <Text style={styles.subHeading}>{this.props.trainer ? strings.START : strings.JOIN}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FastImage
          source={this.props.thumbnail}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: appTheme.darkBackground,
    padding: spacing.large,
    paddingVertical: spacing.medium,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 180,
    width: 100,
    borderRadius: 15,
    elevation: 4
  },
  content: {
    marginRight: spacing.medium,
    flex: 1
  },
  title: {
    fontSize: fontSizes.bigTitle,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_sm
  },
  subtitle: {
    fontSize: fontSizes.h1,
    color: bmiColors.lightBlue,
    fontFamily: fonts.MontserratSemiBold,
  },
  startButton: {
    backgroundColor: appTheme.live,
    borderRadius: 6,
    padding: spacing.small_sm,
    paddingHorizontal: spacing.medium_sm,
    marginLeft:'auto'
  },
  subHeading: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    textAlign: 'center'
  },

});

export default React.memo(TodaySession);