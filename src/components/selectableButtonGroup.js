/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native'

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import SelectableButton from "./selectableButton";

const selectableButtonGroup = (props) => {

  const renderButton = (text) => {
    return <SelectableButton
      textContent={text}
      onPress={() => props.onSelect(text)}
      selected={props.selected === text}
      activeStyle={props.activeStyle}
    />
  }

  const {containerStyle} = props;
  return (
    <View style={[styles.default, containerStyle]}>
      <FlatList
        data={props.data}
        horizontal={true}
        renderItem={({item}) => renderButton(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: appTheme.content,
    borderRadius: 6,
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm
  },
});

export default React.memo(selectableButtonGroup);