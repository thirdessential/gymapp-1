/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

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
import strings, {subscribersBuilder} from "../constants/strings";

class TodaySession extends React.Component {
  state = {
    countDown: '        ', //  8 spaces for initial layout,
    startEnabled: false
  }

  componentDidMount() {
    this.initialise();
  }

  initialise = () => {
    const date = new Date(this.props.date);
    // const date = new Date();
    // date.setMinutes(date.getMinutes() + 7);
    const now = new Date();
    if (!this.props.trainer && this.props.status === sessionStatus.LIVE) {
      this.setState({startEnabled: true});
    }
    if ((date - now > 0)) {
      this.setState({countDown: formatSeconds((date - now) / 1000)});
      this.timer = setInterval(() => {
        const now = new Date();
        this.setState({countDown: formatSeconds((date - now) / 1000)});
        const remainingSeconds = (date - now) / 1000;
        if (remainingSeconds < 5) {
          clearInterval(this.timer);
          this.timer = null;
          this.setState({countDown: '        '});
        } else if (remainingSeconds < 600 && this.props.trainer) {
          this.setState({startEnabled: true});
        }
      }, 1000);
    } else if ((now - date) / 1000 < 3600) {
      if (this.props.trainer)
        this.setState({startEnabled: true});
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.status !== this.props.status) {
      clearInterval(this.timer);
      this.initialise(); // init again when status changes
    }
    return true;
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const {startEnabled} = this.state;
    const color = this.props.status === sessionStatus.SCHEDULED ? appTheme.brightContent : bmiColors.lightBlue;
    const statusStyle = {color};
    const statusContainerStyle = {
      borderColor: color,
      marginLeft: this.props.type === subscriptionType.BATCH ? spacing.small_lg : 0
    };
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
          <View style={styles.row}>
            {this.props.subscribers && this.props.type === subscriptionType.BATCH &&
            <Text style={[styles.subtitle, {
              color: bmiColors.red,
              fontSize: fontSizes.h2
            }]}>{subscribersBuilder(this.props.subscribers)}</Text>
            }
            <View style={[styles.statusContainer, statusContainerStyle]}>
              <Text style={[styles.status, statusStyle]}>{streamText[this.props.status]}</Text>
            </View>
          </View>
          <View style={[styles.row, {marginTop: spacing.small}]}>

            {
              this.props.loading && <ActivityIndicator size={24} color={appTheme.brightContent}/>
            }
            {
              !this.props.loading && this.props.status !== sessionStatus.FINISHED && !this.props.referenceMode &&
              <TouchableOpacity
                disabled={!startEnabled}
                onPress={this.props.onJoin}
                style={[styles.startButton, !startEnabled && {
                  backgroundColor: appTheme.grey
                }]}>
                <Text style={styles.subHeading}>{this.props.trainer ? strings.START : strings.JOIN}</Text>
              </TouchableOpacity>
            }
            {
              this.props.referenceMode && (
                <TouchableOpacity
                  onPress={this.props.onJoin}
                  style={styles.startButton}>
                  <Text style={styles.subHeading}>{strings.OPEN}</Text>
                </TouchableOpacity>
              )
            }
            {
              this.timer && this.props.status === sessionStatus.SCHEDULED && !this.props.loading && (
                <View style={[styles.row, {marginLeft: spacing.medium_sm}]}>
                  <Ion style={{marginRight: spacing.small_sm}} name={'timer-outline'} size={16}
                       color={bmiColors.blue}/>
                  <Text style={[styles.subtitle, {color: bmiColors.blue}]}>{this.state.countDown}</Text>
                </View>
              )
            }
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
    padding: spacing.medium,
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
  },
  subHeading: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    textAlign: 'center'
  },
  statusContainer: {
    borderRadius: 5,
    borderWidth: 0.6,
    marginTop: spacing.small,
    marginLeft: spacing.small,
    padding: spacing.small,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0
  },
  status: {
    fontSize: fontSizes.h5,
    fontFamily: fonts.PoppinsRegular,
  }
});

export default React.memo(TodaySession);