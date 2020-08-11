import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import strings from "../constants/strings";
import {spacing} from "../constants/dimension";
import {appTheme} from "../constants/colors";
import {screenWidth} from "../utils/screenDimensions";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import SelectExercise from "../screens/Fitness/SelectExercise";

const exerciseCard = ({uri, name}) => {
  const renderSeparator = () => <View style={styles.separator}/>

  return (
    <View
      style={styles.cardContainer}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        source={{uri}}
      />
      <View style={styles.content}>
        <Text numberOfLines={3} style={styles.brightText}>{name.toUpperCase()}</Text>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.count}>6</Text>
            <Text style={styles.subtitle}>{strings.AVG_MINUTES}</Text>
          </View>
          {renderSeparator()}
          <View style={styles.rowItem}>
            <Text style={styles.count}>3</Text>
            <Text style={styles.subtitle}>{strings.SETS}</Text>
          </View>
          {renderSeparator()}
          <View style={styles.rowItem}>
            <Text style={styles.subtitle}>Intermediate</Text>
            <Text style={styles.subtitle}>level</Text>
          </View>
        </View>
        {/*<TouchableOpacity style={styles.}>*/}
        {/**/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  cardContainer: {
    height: '80%',
    backgroundColor: appTheme.textPrimary,
    borderRadius: 20,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  content: {
    height: '50%',
    width: '101%',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: -1,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
    padding: spacing.medium,
  },
  image: {
    height: screenWidth / 1.4,
    width: '100%',
  },
  brightText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h0,
    textAlign: 'center'
  },
  darkText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fontSizes.h1,
    textAlign: 'center'
  },
  brightButton: {
    backgroundColor: appTheme.darkBackground,
    width: '101%',
    borderRadius: 20,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -1
  },
  count: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    textAlign: 'center',
    fontSize: fontSizes.h1
  },
  subtitle: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic,
    fontSize:fontSizes.h4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.medium
  },
  rowItem:{
    alignItems:'center',
    justifyContent:'center'
  },
  separator: {
    height: '70%',
    width: 1,
    backgroundColor: appTheme.greyC,
    marginHorizontal: spacing.medium_sm
  }
});


export default exerciseCard;