/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import Modal from 'react-native-modal';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {StyleSheet, View, Text, TouchableOpacity, Button} from "react-native";

import colors, {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import Avatar from "../Avatar";
import FastImage from "react-native-fast-image";
import {screenWidth} from "../../utils/screenDimensions";
import {defaultDP} from "../../constants/appConstants";
import strings from "../../constants/strings";
import Entypo from "react-native-vector-icons/Entypo";

const post = (props) => {
  const {
    commentCount, createdBy, displayImageUrl,
    imageUrl, likeCount, createdOn, text, likeCallback,
    unlikeCallback, onProfilePress, hideOptions = false,
    flagCallback, shareCallback, showComment = true, isLiked,
    renderFooter, imagePressCallback, deleteCallback
  } = props;
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isModalVisible, setModalVisible] = useState(false);
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ConfirmModal = () => {
    return (
      <Modal
        animationType={'slide'}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onRequestClose={toggleModal}
        visible={isModalVisible}>
        <View
          style={{backgroundColor: appTheme.darkGrey, padding: spacing.medium, borderRadius: 10, alignItems: 'center'}}>
          <Text style={styles.modalTitle}>{strings.CONFIRM_FLAG}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '50%'}}>
            <TouchableOpacity onPress={onFlagPress} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, {backgroundColor: appTheme.grey}]}>
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const menu = () => (
    <Menu>
      <MenuTrigger>
        <Entypo style={{marginLeft: spacing.small}} name={'dots-three-vertical'} color={appTheme.brightContent}
                size={24}/>
      </MenuTrigger>
      <MenuOptions customStyles={styles.menu}>
        {
          flagCallback && <MenuOption style={styles.menuButton} onSelect={toggleModal}>
            <Fontisto name={'flag'} size={28} color={appTheme.brightContent}/>
            <Text style={styles.menuText}>{strings.REPORT_CONTENT}</Text>
          </MenuOption>
        }
        {
          deleteCallback &&
          <MenuOption style={styles.menuButton} onSelect={deleteCallback}>
            <Fontisto name={'trash'} size={28} color={colors.rejectRed}/>
            <Text style={styles.menuText}>{strings.DELETE}</Text>
          </MenuOption>
        }
      </MenuOptions>
    </Menu>
  )

  const onFlagPress = () => {
    toggleModal();
    flagCallback();
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onProfilePress} style={styles.titleContainer}>
          <Avatar size={spacing.postAvatar} url={!!displayImageUrl ? displayImageUrl : defaultDP}
                  roundedMultiplier={1}/>
          <Text style={styles.displayName}>{createdBy}</Text>
        </TouchableOpacity>
        <Text style={[styles.displayName, styles.postTime]}>{timeAgo.format(new Date(createdOn))}</Text>
        {menu()}
      </View>
      {
        !!imageUrl && (
          <TouchableOpacity disabled={!imagePressCallback} activeOpacity={0.7} onPress={imagePressCallback}
                            style={styles.imageContainer}>
            <FastImage
              source={{uri: imageUrl}}
              style={styles.displayImage}
            />
          </TouchableOpacity>
        )
      }
      <Text style={styles.textContent}>{text}</Text>
      {
        !hideOptions && (
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
            {/*{*/}
            {/*  flagCallback &&*/}
            {/*  <TouchableOpacity onPress={toggleModal} activeOpacity={0.6} o>*/}
            {/*    <Fontisto name={'flag'} size={28} color={appTheme.grey}/>*/}
            {/*  </TouchableOpacity>*/}
            {/*}*/}
            {
              shareCallback &&
              <TouchableOpacity activeOpacity={0.6}>
                <Fontisto name={'share-a'} size={28} color={appTheme.brightContent}/>
              </TouchableOpacity>
            }
          </View>
        )
      }
      {
        renderFooter && renderFooter()
      }
      <ConfirmModal/>
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
    width: '100%',
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
  },
  modalButton: {
    borderRadius: 8,
    backgroundColor: appTheme.brightContent,
    padding: spacing.small,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
  },
  modalButtonText: {
    color: 'white',
    fontFamily: fonts.MontserratMedium
  },
  modalTitle: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h0,
    marginBottom: spacing.medium
  },
  menu: {
    backgroundColor: appTheme.darkBackground,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: appTheme.background,
    alignItems: 'center',
    padding:spacing.small_lg,
    paddingHorizontal:spacing.medium_lg
  },
  menuText: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
  }
});

export default React.memo(post);