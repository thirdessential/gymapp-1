import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity,} from "react-native";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

import {screenWidth} from "../utils/screenDimensions";

const imageCard = ({title, image, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} resizeMode={'contain'}/>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export const cardSize = screenWidth / 2 - 2 * spacing.medium;
const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    margin: spacing.small_sm,
    width: cardSize,
    height: cardSize
  },
  image: {
    height: screenWidth / 3.5,
    width: screenWidth / 3.5
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold,
    marginTop: spacing.medium_sm,
    marginBottom:spacing.small
  }
});

export default React.memo(imageCard);