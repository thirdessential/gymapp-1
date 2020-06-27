/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import SelectableButton from '../selectableButton';
import Avatar from '../Avatar';
import GenericText from "../GenericText";
import strings, {coachedPeople} from "../../constants/strings";
import SlotPreview from "./SlotPreview";
import StarRating from "../StarRating";

import {spacing} from "../../constants/dimension";
import {toTitleCase} from "../../utils/utils";
import CallButton from "../callButton";
import ExpandingText from "../ExpandingText";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme} from "../../constants/colors";
import {AirbnbRating} from "react-native-ratings";
import Hits from "../Hits";
import ProfileHits from "../Profile/ProfileHits";
import PackagePreviewList from './PackagePreviewList';

const trainerThumb = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
        <View style={styles.container}>
          <View style={styles.dpContainer}>
            <Avatar roundedMultiplier={4} size={spacing.thumbnailMini} url={props.dpUrl}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
            <Text style={styles.location}>{toTitleCase(props.location)}</Text>
          </View>
          <View style={styles.callButtonContainer}>
            <CallButton onPress={props.callClicked} size={25}/>
          </View>
        </View>

        <View style={styles.extraContent}>
          <View style={styles.experienceContainer}>

            <ProfileHits
              // followers={hits.followers}
              transformations={5}
              // rating={hits.rating}
              // following={hits.following}
              programCount={4}
            />
            <SelectableButton selected textContent={strings.FOLLOW}/>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.packageListContainer}>
        <PackagePreviewList packages={props.packages}/>
      </View>
    </View>
  );
}

trainerThumb.propTypes = {
  name: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  dpUrl: PropTypes.string.isRequired,
  slots: PropTypes.shape({
    used: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired
  }),
  rating: PropTypes.number.isRequired
};

// trainerThumb.defaultProps = { //testing, remove this later
//   name: Math.random() > 0.5 ? 'Kalyan Battersetty' : 'Khushbu Dutta Gupta',
//   experience: 123,
//   dpUrl: Math.random() > 0.5 ? 'https://i.ya-webdesign.com/images/people-standing-png-4.png' : 'https://www.pngitem.com/pimgs/m/28-288789_transparent-png-person-standing-standing-png-download.png',
//   slots: 2,
//   rating: 4.3
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsSemiBold
  },
  location: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: fonts.PoppinsMedium
  },
  dpContainer: {
    marginBottom: spacing.small
  },
  textContainer: {
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    marginLeft: spacing.medium_lg,
  },
  callButtonContainer: {
    marginLeft: 'auto'
  },
  extraContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.small
  },
  packageListContainer: {
    width: '100%',
    marginTop: spacing.small,
    // backgroundColor:appTheme.grey,
    padding: spacing.small,
    zIndex: 100
  },
  plan: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h5,
    fontFamily: fonts.PoppinsRegular,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: appTheme.brightContent,
    width: spacing.thumbnailMini,
    textAlign: 'center'
  },
  bioContainer: {
    marginLeft: spacing.medium_lg,
    width: '60%'
  },
  rating: {
    marginTop: spacing.small,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }


});

export default trainerThumb;