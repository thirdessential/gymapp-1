/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import GenericText from "../GenericText";
import CallButton from '../callButton';
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {toTitleCase} from "../../utils/utils";
import {appTheme} from "../../constants/colors";

const userThumb = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.dpContainer}>
        <Avatar roundedMultiplier={4} size={spacing.thumbnailMini} url={props.dpUrl}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
        <Text style={styles.location}>{toTitleCase(props.location)}</Text>
      </View>
      <View style={styles.callButtonContainer}>
        <CallButton/>
      </View>
    </View>
  );
}

userThumb.propTypes = {
  name: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

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
  callButtonContainer:{
    marginLeft: 'auto'
  }
});

export default userThumb;