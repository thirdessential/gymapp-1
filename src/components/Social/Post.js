/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import Avatar from "../Avatar";
import FastImage from "react-native-fast-image";
import {screenWidth} from "../../utils/screenDimensions";

const post = (props) => {
  const {
    commentCount, createdBy, displayImageUrl,
    imageUrl, likeCount, createdOn, text, likeCallback,
    unlikeCallback, onProfilePress,
    flagCallback, shareCallback, showComment = true, isLiked
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
        <TouchableOpacity activeOpacity={0.8} onPress={onProfilePress} style={styles.titleContainer}>
          <Avatar size={spacing.postAvatar} url={displayImageUrl} roundedMultiplier={1}/>
          <Text style={styles.displayName}>{createdBy}</Text>
        </TouchableOpacity>
        <Text style={[styles.displayName, styles.postTime]}>{timeAgo.format(new Date(createdOn))}</Text>
      </View>
      {
        !!imageUrl && (
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: imageUrl}}
              style={styles.displayImage}
            />
          </View>
        )
      }
      <Text style={styles.textContent}>{text}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={toggleLike} activeOpacity={0.6} style={styles.hitButton}>
          <AntDesign name={'like1'} size={28} color={liked ? appTheme.brightContent : appTheme.grey}/>
          <Text style={styles.hits}>{localLikeCount}</Text>
        </TouchableOpacity>
        {
          showComment &&
          <View activeOpacity={0.6} style={styles.hitButton}>
            <MaterialCommunityIcons name={'comment'} size={28} color={appTheme.grey}/>
            <Text style={styles.hits}>{commentCount}</Text>
          </View>
        }
        {
          flagCallback &&
          <TouchableOpacity  onPress={flagCallback} activeOpacity={0.6} o>
            <Fontisto name={'flag'} size={28} color={appTheme.grey}/>
          </TouchableOpacity>
        }
        {
          shareCallback &&
          <TouchableOpacity activeOpacity={0.6}>
            <Fontisto name={'share-a'} size={28} color={appTheme.brightContent}/>
          </TouchableOpacity>
        }


      </View>

    </View>
  )
}


post.propTypes = {};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: appTheme.darkBackground,
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
    fontSize: fontSizes.default,
    fontWeight: '700',
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.medium_sm,
    textShadowColor: 'rgba(0, 0, 0, 0.16)',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 6
  },
  postTime: {
    color: appTheme.brightContent,
    marginLeft: 'auto'
  },
  imageContainer: {
    marginTop: spacing.medium
  },
  displayImage: {
    borderRadius: 10,
    height: 250,
    width: screenWidth - spacing.medium * 4
  },
  textContent: {
    color: 'white',
    fontSize: fontSizes.default,
    width: '100%',
    fontFamily: fonts.CenturyGothicBold,
    marginTop: spacing.medium_sm
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: spacing.medium_sm,
    justifyContent: 'space-between',
    width: '100%'
  },
  hitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hits: {
    color: 'white',
    marginLeft: spacing.medium_sm
  }
});

export default post;