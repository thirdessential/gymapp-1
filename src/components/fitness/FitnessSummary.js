/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {appTheme, bmiColors} from "../../constants/colors";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";
import {Circle} from "react-native-progress";
import {DEFAULT_WATER_INTAKE_QUOTA} from "../../constants/appConstants";

const fitnessSummary = (props) => {
  if (!props.stats) return null;
  const {proteins, carbs, fats, water} = props.stats;
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.subtext}>{strings.PROTEIN} : <Text style={styles.value}>{proteins}</Text></Text>
        <Text style={[styles.subtext, {color: bmiColors.yellow}]}>{strings.CARBS} : <Text
          style={styles.value}>{carbs}</Text></Text>
        <Text style={[styles.subtext, {color: bmiColors.red}]}>{strings.FATS} : <Text style={styles.value}>{fats}</Text></Text>
      </View>
      <View>
        <Circle
          style={{marginVertical: spacing.small}}
          showsText={true}
          size={75}
          formatText={() => `${water} ml`}
          textStyle={{fontSize: fontSizes.h3}}
          progress={water / DEFAULT_WATER_INTAKE_QUOTA}
          animated={false}
          color={bmiColors.blue}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.medium_sm,
    justifyContent: 'space-between',
    paddingTop: spacing.small
  },
  subtext: {
    color: bmiColors.blue,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h1,
    paddingVertical: spacing.small_sm
  },
});

export default React.memo(fitnessSummary);