import LinearGradient from "react-native-linear-gradient";
import {StyleSheet, Text} from "react-native";
import React, {useState} from "react";
import {appTheme, getRandomGradient} from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

const liveCard = (props) => {
  const [color] = useState(getRandomGradient());
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={color}
      style={styles.element}
    >
      <Text
        style={styles.headerAndFooter}
      >
        {props.day}
      </Text>

      <Text
        style={styles.dateTime}
      >
        {props.time}
      </Text>
      <Text
        style={styles.dateTime}
      >
        {props.duration}
      </Text>
      <Text
        style={styles.headerAndFooter}
      >
        {props.bodyPart}
      </Text>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  element: {
    marginHorizontal: 10,
    borderColor: appTheme.greyC,
    borderWidth: 1,
    borderRadius: 15,
    width: 150,
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerAndFooter: {
    fontSize: fontSizes.h3,
    color: appTheme.textPrimary,
    marginTop: 5,
    fontFamily: fonts.CenturyGothicBold
  },
  dateTime: {
    fontSize: fontSizes.h4,
    color: appTheme.textPrimary,
    marginTop: 5,
    fontFamily: fonts.CenturyGothic,
  },
});


export default React.memo(liveCard);