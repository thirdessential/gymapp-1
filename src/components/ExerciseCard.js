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
import Ionicons from "react-native-vector-icons/Ionicons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {exerciseLevels} from "../constants/appConstants";
import {toTitleCase} from "../utils/utils";

const exerciseCard = ({uri, name, minutes, sets, level, selectLevel}) => {
  const renderSeparator = () => <View style={styles.separator}/>

  const renderMenu = () => {
    return (
      <Menu style={styles.menuContainer}>
        <MenuTrigger customStyles={{padding: spacing.small_lg}}>
          <Text style={styles.menuTitle}>{level}</Text>
        </MenuTrigger>
        <MenuOptions customStyles={styles.menu} optionsContainerStyle={{width: 150, marginTop: 10}}>
          <MenuOption style={styles.menuButton} onSelect={() => selectLevel(exerciseLevels.BEGINNER)}>
            <Text style={styles.menuText}>{toTitleCase(exerciseLevels.BEGINNER)}</Text>
          </MenuOption>
          <MenuOption style={styles.menuButton} onSelect={() => selectLevel(exerciseLevels.INTERMEDIATE)}>
            <Text style={styles.menuText}>{toTitleCase(exerciseLevels.INTERMEDIATE)}</Text>
          </MenuOption>
          <MenuOption style={styles.menuButton} onSelect={() => selectLevel(exerciseLevels.ADVANCED)}>
            <Text style={styles.menuText}>{toTitleCase(exerciseLevels.ADVANCED)}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  }

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
            <Text style={styles.count}>{minutes}</Text>
            <Text style={styles.subtitle}>{strings.AVG_MINUTES}</Text>
          </View>
          {renderSeparator()}
          <View style={styles.rowItem}>
            <Text style={styles.count}>{sets}</Text>
            <Text style={styles.subtitle}>{strings.SETS}</Text>
          </View>
          {renderSeparator()}
          {renderMenu()}
        </View>
        <TouchableOpacity style={styles.button}>
          <Ionicons color={appTheme.textPrimary} name={'play-outline'} size={30}/>
        </TouchableOpacity>
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
    fontSize: fontSizes.h4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.medium,
    marginTop: 'auto'
  },
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: '70%',
    width: 1,
    backgroundColor: appTheme.greyC,
    marginHorizontal: spacing.medium_sm
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: appTheme.brightContent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing.small,
    marginBottom: spacing.small
  },
  menuContainer: {
    borderColor: appTheme.grey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    padding: spacing.small
  },
  menuTitle: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4
  },
  menu: {
    backgroundColor: appTheme.darkBackground,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: appTheme.background,
    alignItems: 'center',
    padding: spacing.small_lg,
    paddingHorizontal: spacing.medium_lg
  },
  menuText: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
});

export default exerciseCard;