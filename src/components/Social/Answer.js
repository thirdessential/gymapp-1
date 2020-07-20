/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const answer = (props) => {
  const {
    createdBy, likeCount, createdOn, text, likeCallback,
    unlikeCallback, onProfilePress, isLiked
  } = props;
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const like = () => {
    setLocalLikeCount(localLikeCount + 1);
    setLiked(true);
    setDisliked(false);
    likeCallback();
  }
  const dislike = () => {
    setLocalLikeCount(localLikeCount - 1);
    setLiked(false);
    setDisliked(true);
    unlikeCallback();
  }
  return (
    <View style={styles.container}>
      <View style={styles.likeContainer}>
        <TouchableOpacity
          disabled={liked}
          onPress={like}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <FontAwesome5Icon name={'chevron-up'} size={20} color={liked ? appTheme.brightContent : appTheme.grey}/>
        </TouchableOpacity>
        <Text style={styles.hits}>{localLikeCount}</Text>
        <TouchableOpacity
          disabled={disliked}
          onPress={dislike}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <FontAwesome5Icon name={'chevron-down'} size={20} color={disliked ? appTheme.brightContent : appTheme.grey}/>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.titleContainer}>
          <Text style={[styles.displayName, {color: appTheme.brightContent}]}>{strings.ANSWERED_BY}</Text>
          <Text style={[styles.displayName, styles.postTime]}>{timeAgo.format(new Date(createdOn))}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={onProfilePress} style={styles.titleContainer}>
          <Text style={styles.displayName}>{createdBy}</Text>
        </TouchableOpacity>
        <Text style={styles.textContent}>{text}</Text>
        <View style={styles.hitsContainer}>
        </View>
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
    flexDirection: 'row',
    flex: 1,
    width: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%'
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.default + 1,
    fontWeight: '700',
    fontFamily: fonts.CenturyGothic,
    textShadowColor: 'rgba(0, 0, 0, 0.16)',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 6,
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
  hitsContainer: {
    flexDirection: 'row'
  },
  likeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium
  },
  hits: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic
  },


});

export default React.memo(answer);