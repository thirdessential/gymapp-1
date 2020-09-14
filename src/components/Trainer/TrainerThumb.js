/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import {spacing} from "../../constants/dimension";
import {toTitleCase} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme} from "../../constants/colors";
import HitsList from "../HitsList";
import PackagePreviewList from './PackagePreviewList';

const trainerThumb = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
        <View style={styles.mainTitle}>
          <View style={styles.dpContainer}>
            <Avatar roundedMultiplier={4} size={spacing.thumbnailMini} url={props.dpUrl}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
            <Text style={styles.location}>{toTitleCase(props.location)}</Text>
          </View>
        </View>
        <View style={styles.extraContent}>
          <HitsList hits={props.hits} size={fontSizes.h3}/>
        </View>
      </TouchableOpacity>
      {
        props.packages && props.packages.length > 0 && (
          <View style={styles.packageListContainer}>
            <PackagePreviewList onPackagePress={props.onPackagePress} packages={props.packages}/>
          </View>
        )
      }
    </View>
  );
}

trainerThumb.propTypes = {
  name: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  displayName: {
    color: appTheme.textPrimary,
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
    marginRight: 'auto'
  },
  callButtonContainer: {
    marginLeft: 'auto'
  },
  extraContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.small,
    marginLeft: spacing.small
  },
  packageListContainer: {
    width: '100%',
    marginTop: spacing.medium_sm,
    padding: spacing.small,
    zIndex: 100
  },
  hitsContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hits: {
    marginRight: spacing.medium_sm
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
  rating: {},
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default React.memo(trainerThumb);