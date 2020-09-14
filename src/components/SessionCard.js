/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import FastImage from 'react-native-fast-image'
import {StyleSheet, Text, View} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {spacing} from "../constants/dimension";
import {
  MS_IN_DAY,
  sessionStatus,
  streamText,
  subscriptionType,
  subscriptionTypeNames
} from "../constants/appConstants";
import {appTheme, bmiColors} from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import {formatSeconds} from "../utils/utils";
import {subscribersBuilder} from "../constants/strings";

class SessionCard extends React.Component {

  state = {
    countDown: '        ' //  8 spaces for initial layout
  }

  componentDidMount() {
    const date = new Date(this.props.date);
    const now = new Date();
    if ((date - now > 0) && (date - now) < MS_IN_DAY * 4) {
      this.setState({countDown: formatSeconds((date - now) / 1000)});
      this.timer = setInterval(() => {
        const now = new Date();
        this.setState({countDown: formatSeconds((date - now) / 1000)});
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const date = new Date(this.props.date);
    const color = this.props.status === sessionStatus.SCHEDULED ? appTheme.brightContent : bmiColors.lightBlue;
    const statusStyle = {color};
    const statusContainerStyle = {borderColor: color};
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={this.props.thumbnail}
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {/*<FontAwesome name={this.props.type === subscriptionType.BATCH ? 'group' : 'user'}/>*/}
            {this.props.title}
          </Text>
          <Text style={[styles.title, {
            color: bmiColors.lightBlue,
            fontSize: fontSizes.h3
          }]}>{subscriptionTypeNames[this.props.type]}</Text>
          {this.props.subscribers && this.props.type === subscriptionType.BATCH &&
          <Text style={[styles.subtitle, {color: bmiColors.red}]}>{subscribersBuilder(this.props.subscribers)}</Text>
          }
          <Text
            style={[styles.subtitle, {color: appTheme.brightContent}]}>{this.props.time}, <Text><MaterialCommunityIcons
            name={'timer-outline'}
            size={14}/> {this.props.duration}
          </Text></Text>
          <Text style={[styles.subtitle, {color: bmiColors.blue}]}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <View style={[styles.statusContainer, statusContainerStyle]}>
            <Text style={[styles.status, statusStyle]}>{streamText[this.props.status]}</Text>
          </View>
          <View style={styles.row}>
            {
              this.timer && this.props.status === sessionStatus.SCHEDULED && (
                <>
                  <Ion style={{marginRight: spacing.small_sm}} name={'timer-outline'} size={14}
                       color={bmiColors.blue}/>
                  <Text style={[styles.subtitle, {color: bmiColors.blue}]}>{this.state.countDown}</Text>
                </>
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: appTheme.darkBackground,
    padding: spacing.medium_sm,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: spacing.thumbnail,
    width: spacing.thumbnail,
    borderRadius: 15,
    elevation: 4
  },
  content: {
    marginLeft: spacing.medium,
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    fontSize: fontSizes.h2,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_sm
  },
  subtitle: {
    fontSize: fontSizes.h3,
    color: bmiColors.blue,
    fontFamily: fonts.CenturyGothic,
  },
  statusContainer: {
    marginLeft: 'auto',
    borderRadius: 5,
    borderWidth: 0.6,
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

export default React.memo(SessionCard);