/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import {spacing} from "../../constants/dimension";

import HitsList from '../HitsList';
import ExpandingText from "../ExpandingText";
import {userTypes} from "../../constants/appConstants";
import colors, {appTheme, darkPallet} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {toTitleCase} from "../../utils/utils";
import Avatar from "../Avatar";
import CallButton from '../CallButton';
import Entypo from "react-native-vector-icons/Entypo";

import {screenWidth} from "../../utils/screenDimensions";
import LinearGradient from "react-native-linear-gradient";

const ProfileOverview = (props) => {
  const {hits} = props;
  return (
    <LinearGradient
      colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
      style={styles.container}>

      <View style={styles.profileHeader}>
        <View style={styles.profileTitle}>
          <View style={styles.titleContainer}>
            <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
            {props.editCallback && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={props.editCallback}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              >
                <Entypo
                  name={'edit'}
                  color={'white'}
                  size={18}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.location}>{toTitleCase(props.location)}</Text>
          {
            props.userType === userTypes.TRAINER && (
              <View style={{alignItems: 'flex-start'}}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={props.rating}
                  starContainerStyle={styles.rating}
                  size={12}
                  isDisabled={true}
                />
              </View>
            )
          }
        </View>
        <View style={styles.avatarContainer}>
          <Avatar url={props.dpUrl} size={spacing.thumbnailMed}/>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ExpandingText
          style={{color: 'white'}}>
          {props.description}</ExpandingText>
      </View>
      <TouchableOpacity onPress={props.onHitsPress} activeOpacity={0.7} style={styles.profileHitsContainer}>
        <HitsList hits={props.hits}/>
        {
          props.initiateVideoCallCallback && (
            <View style={styles.callButtonContainer}>
              <CallButton onPress={props.initiateVideoCallCallback}/>
            </View>
          )
        }
      </TouchableOpacity>
    </LinearGradient>
  );
}

ProfileOverview.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
  rating: PropTypes.number,
  enrollCallback: PropTypes.func,
  initiateVideoCallCallback: PropTypes.func,
  userType: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
    width: '100%',
    borderRadius: 20,
    borderColor: 'transparent',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: -20,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom:spacing.medium_lg
  },
  titleContainer: {
    flexDirection: 'row',
    width: screenWidth / 2.5,
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.MontserratMedium,
  },
  location: {
    color: appTheme.grey,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium_lg
  },
  rating: {
    marginTop: spacing.medium_sm,
  },
  profileTitle: {},
  avatarContainer: {
    marginTop: -spacing.medium_lg - (spacing.thumbnailMed / 6) //Bring some of it out of container
  },
  profileHitsContainer: {
    marginTop: spacing.medium_lg,
    flexDirection: 'row'
  },
  descriptionContainer: {
    marginTop: spacing.medium_lg,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  callButtonContainer: {},
  editButton: {
    marginLeft: spacing.small,
    padding: spacing.small,
  },
  packageListContainer: {},

});

export default React.memo(ProfileOverview);