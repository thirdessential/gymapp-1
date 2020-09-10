/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {bmiColors} from "../../constants/colors";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";
import {Circle} from "react-native-progress";
import {DEFAULT_CALORIE_INTAKE_QUOTA} from "../../constants/appConstants";

const fitnessSummary = (props) => {
  if (!props.stats) return null;
  const {proteins, carbs, fats, water, calories} = props.stats;
  const perDay = props.renderPerDay ? '/day' : '';
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.subtext}>{strings.PROTEIN}: <Text style={styles.value}>{proteins}g{perDay}</Text></Text>
        <Text style={[styles.subtext, {color: bmiColors.yellow}]}>{strings.CARBS}: <Text
          style={styles.value}>{carbs}g{perDay}</Text></Text>
        <Text style={[styles.subtext, {color: bmiColors.red}]}>{strings.FATS}: <Text
          style={styles.value}>{fats}g{perDay}</Text></Text>
        <Text style={[styles.subtext, {color: bmiColors.lightBlue}]}>{strings.HYDRATION}: <Text
          style={styles.value}>{water}ml{perDay}</Text></Text>
      </View>
      <View style={styles.center}>
        <Circle
          style={{marginVertical: spacing.small}}
          showsText={true}
          size={85}
          formatText={() => `${calories} cal`}
          textStyle={{fontSize: fontSizes.h3}}
          progress={calories / DEFAULT_CALORIE_INTAKE_QUOTA}
          animated={true}
          color={'#54f0f7'}
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
    fontSize: fontSizes.h3,
    paddingVertical: spacing.small_sm
  },
  center: {
    justifyContent: 'center'
  }
});

export default React.memo(fitnessSummary);