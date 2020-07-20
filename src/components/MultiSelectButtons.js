/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native'
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";

import SelectableButton from "./selectableButton";
import Appointment from "./GlobalSlot";
import {Card} from "native-base";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";

const multiSelectButtons = ({data, transformer = (text) => text, onPress, sorter = array => array}) => {

  const renderButton = (text) => {
    const active = data[text];
    return (
      <TouchableOpacity
        onPress={() => onPress(text)}
        activeOpacity={0.7}
        style={[styles.button, active ? styles.activeButton : null]}>
        <Text style={[styles.textContent, active ? styles.activeText : null]}>{transformer(text)}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.default}>
      <FlatList
        data={sorter(Object.keys(data))}
        horizontal={true}
        renderItem={({item}) => renderButton(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{marginLeft: spacing.medium_sm}}/>}
        ListFooterComponent={() => <View style={{marginLeft: spacing.medium_sm}}/>}
        ListHeaderComponent={() => <View style={{marginRight: spacing.medium_sm}}/>}
      />
    </View>
  )

}

multiSelectButtons.propTypes = {};

const styles = StyleSheet.create({
  default: {
    backgroundColor: appTheme.background,
    borderColor: appTheme.darkBackground,
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,

    // paddingLeft: spacing.medium_sm,
    // paddingRight: spacing.medium_sm
  },
  textContent: {
    fontFamily: fonts.Monospace,
    fontWeight: 'bold',
    color: appTheme.textPrimary,
    fontSize: fontSizes.default
  },
  activeText: {
    color: appTheme.brightContent
  },
  button: {
    padding: spacing.medium_sm,
    paddingTop: spacing.small_lg,
    paddingBottom: spacing.small_lg,
  },
  activeButton: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 6,
  }
});

export default React.memo(multiSelectButtons);