import React, { PureComponent ,useState} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { spacing } from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { appTheme, darkPallet } from "../../constants/colors";
import {getRandomGradient} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";

const CardList = ({ data }) => {
  const [color, setColor] = useState(getRandomGradient());
 // const [color] = useState(() => getRandomGradient());
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, height: 130 }}
      data={data}
      renderItem={({ item: rowData }) => {
        return (
          <View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={color}
            style={styles.element}
          >
            <View style={{ alignItems: "center"}}>
              <Text
                style={styles.headerAndFooter}
              >
                {rowData.day}
              </Text>

              <Text
                style={styles.dateTime}
              >
                {rowData.time}
              </Text>
              <Text
                style={styles.dateTime}
              >
                {rowData.duration}
              </Text>
              <Text
                style={styles.headerAndFooter}
              >
                {rowData.bodyPart}
              </Text>
            </View>
          </LinearGradient>
          </View>
        );
      }}
      keyExtractor={(item, index) => index}
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
element:{
  marginHorizontal: 10,
  borderColor: appTheme.greyC,
  borderWidth: 1,
  borderRadius: 15,
  width: 150,

  marginTop: 10,
  flex: 1,
  justifyContent:'center',
},
headerAndFooter: {
  fontSize: fontSizes.h3,
  color: "white",
  marginTop: 5,
  fontWeight: "bold",
},
dateTime: {
  fontSize: fontSizes.h4,
  color: "white",
  marginTop: 5,
  fontFamily: fonts.CenturyGothic,
},
});
