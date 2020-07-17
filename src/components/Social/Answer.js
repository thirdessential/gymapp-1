/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import Modal from 'react-native-modal';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {StyleSheet, View, Text, TouchableOpacity, Button} from "react-native";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import {screenWidth} from "../../utils/screenDimensions";
import strings from "../../constants/strings";

const answer = (props) => {
  const {
    createdBy, likeCount, createdOn, text, likeCallback,
    unlikeCallback, onProfilePress, isLiked
  } = props;
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const toggleLike = () => {
    if (liked) {
      unlikeCallback();
      setLocalLikeCount(localLikeCount - 1);
    } else {
      likeCallback();
      setLocalLikeCount(localLikeCount + 1);
    }
    setLiked(!liked);
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.displayName,{color:appTheme.brightContent}]}>{strings.ANSWERED_BY}</Text>
        <Text style={[styles.displayName, styles.postTime]}>{timeAgo.format(new Date(createdOn))}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onProfilePress} style={styles.titleContainer}>
        <Text style={styles.displayName}>{createdBy}</Text>
      </TouchableOpacity>
      <Text style={styles.textContent}>{text}</Text>
      <View style={styles.hitsContainer}>

      </View>
    </View>
  )
}

answer.propTypes = {};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.default+1,
    fontWeight: '700',
    fontFamily: fonts.CenturyGothic,
    textShadowColor: 'rgba(0, 0, 0, 0.16)',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 6
  },
  postTime: {
    color: appTheme.brightContent,
    marginLeft: 'auto'
  },
  textContent: {
    color: 'white',
    fontSize: fontSizes.default,
    width: '100%',
    fontFamily: fonts.CenturyGothicBold,
    marginTop: spacing.medium_sm
  },
  hitsContainer:{
    flexDirection: 'row'
  }

});

export default answer;