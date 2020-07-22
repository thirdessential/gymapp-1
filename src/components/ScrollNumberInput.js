import React from "react";
import {appTheme, bmiColors} from "../constants/colors";
import {spacing} from "../constants/dimension";
import {FlatList, StyleSheet, Text, View} from "react-native";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";

const data = [];
const MIN = 300;
const MAX = 2000;

const scrollNumberInput = (props) => {
  const renderBar = ({style, value, renderTitle}) => {
    const active = props.value === value;
    return (
      <View style={styles.barContainer}>
        <View style={[style, active?styles.active:null]}/>
        {renderTitle && <Text style={styles.text}>{value / 10}</Text>}
      </View>
    )
  }
  const handleScroll = function(event) {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offset/13.5);
    props.onChange(index+MIN+12)
  }
  const separator = () => <View style={styles.separator}/>
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{alignItems: 'center'}}
        initialNumToRender={400}
        horizontal={true}
        ItemSeparatorComponent={separator}
        ListHeaderComponent={() => <View style={{width: 10}}/>}
        removeClippedSubviews={true}
        maxToRenderPerBatch={100}
        renderItem={({item, index}) => renderBar(item)}
        keyExtractor={({item, index}) => index}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={400}
        getItemLayout={(data, index) => (
          {length: 1.5, offset: 13.5 * index, index}
        )}
        onScroll={handleScroll}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  barContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar: {
    height: 12,
    width: 1.5,
    borderRadius: 10,
    backgroundColor: appTheme.greyC
  },
  mediumBar: {
    height: 17,
    width: 1.5,
    borderRadius: 10,
    backgroundColor: appTheme.greyC
  },
  longBar: {
    height: 24,
    width: 1.5,
    borderRadius: 10,
    backgroundColor: appTheme.textPrimary
  },
  separator: {
    width: 12,
    height: 1,
    alignSelf: 'center',
    backgroundColor: appTheme.grey
  },
  titleContainer: {
    position: 'absolute'
  },
  title: {
    color: appTheme.grey
  },
  active: {
    backgroundColor:'red'
  },
  text: {
    color: appTheme.grey,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h4,
    position: 'absolute',
    zIndex: 1000000,
    width: 20,
    textAlign: 'center',
    // paddingLeft:5,
    height: fontSizes.h3,
    bottom: 0,
  }
});
for (let i = MIN; i < MAX; i++) {
  if (!(i % 10))
    data.push({value: i, style: styles.longBar, renderTitle: true});
  else if (!(i % 5))
    data.push({value: i, style: styles.mediumBar});
  else
    data.push({value: i, style: styles.bar})

}
export default React.memo(scrollNumberInput);