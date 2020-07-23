import React from "react";
import {appTheme, bmiColors} from "../constants/colors";
import {spacing} from "../constants/dimension";
import {FlatList, StyleSheet, Text, View} from "react-native";

const data = [];
for (let i = 0; i < 50; i++) {
  if (i < 7)
    data.push({ color: bmiColors.blue, value: i});
  else if (i < 20)
    data.push({color: bmiColors.lightBlue, value: i});
  else if (i < 30)
    data.push({color: bmiColors.yellow, value: i});
  else data.push({ color: bmiColors.red, value: i});
}


const bmiBar = (props) => {
  const renderBar = ({color, value}) => {
    const selfValue = value/2 + 15;
    const active = Math.floor(props.value+0.5) ===(selfValue);
    return (
      <View style={[styles.bar,active?styles.active:null,  {backgroundColor: color}]}/>
    )
  }
  const separator = () => <View style={styles.separator}/>
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{alignItems:'center'}}
        initialNumToRender={50}
        horizontal={true}
        ItemSeparatorComponent={separator}
        renderItem={({item, index}) => renderBar(item)}
        keyExtractor={({item,index})=>index}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{flexDirection: 'row', marginTop: spacing.small, justifyContent: 'space-between'}}>
        <Text style={styles.title}>15</Text>
        <Text style={styles.title}>20</Text>
        <Text style={styles.title}>25</Text>
        <Text style={styles.title}>30</Text>
        <Text style={styles.title}>35</Text>
        <Text style={styles.title}>40</Text>
      </View>
    </View>
  )
}

const width = 3 * 50 + 2.5 * 49; // separator + bars
const styles = StyleSheet.create({
  container: {
    width:width
  },
  bar: {
    height: 20,
    width: 3,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  separator: {
    width: 2.5
  },
  titleContainer: {
    position: 'absolute'
  },
  title: {
    color: appTheme.grey
  },
  active:{
    height: 35,
  }
});
export default React.memo(bmiBar);