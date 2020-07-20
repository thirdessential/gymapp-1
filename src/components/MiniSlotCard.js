/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'native-base';

import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import SelectableButton from "./selectableButton";
import strings from "../constants/strings";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import {color} from "react-native-reanimated";

let daysMapping = {'SUN': 'Su', 'MON': 'M', 'TUE': 'Tu', 'WED': 'W', 'THU': 'Th', 'FRI': 'F', 'SAT': 'Sa'};

const slot = (props) => {
  const disabled = props.bookCallback && props.subscribedBy;
  const cardDisabledStyle = disabled ? {backgroundColor: appTheme.darkGrey, borderColor: appTheme.darkGrey} : {};

  return (
    <Card style={[styles.cardStyle, cardDisabledStyle]}>
      <View style={styles.container}>
        <View style={styles.dayContainer}>
          <FontAwesome
            name="calendar"
            color={'white'}
            size={50}
          />
          <Text style={styles.day}>{daysMapping[props.day]}</Text>
        </View>
        <View style={styles.slotDetails}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.startTime}>{props.startTime}</Text>
            {disabled && <Text style={styles.timeText}>{strings.BOOKED}</Text>
            }
          </View>
          <Text style={styles.timeText}>{props.duration} Min</Text>
          {props.subscribedBy && !props.bookCallback && (
            <Text style={styles.displayName}>{strings.ALLOTTED_TO}{props.subscribedBy}</Text>
          )}
        </View>

        <View style={styles.actionButtonContainer}>
          {
            props.bookCallback && !props.subscribedBy && (
              <SelectableButton
                onPress={props.bookCallback}
                selected={true}
                textContent={!!props.subscribedBy ? strings.BOOKED : strings.BOOK}
                textStyle={styles.buttonText}/>
            )
          }
        </View>
      </View>
    </Card>
  );
}


slot.propTypes = {
  // startTime: PropTypes.string.isRequired,
  // day: PropTypes.string.isRequired,
  // duration: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor: appTheme.darkBackground,
    borderColor: appTheme.darkBackground,
    elevation: 5
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    justifyContent: 'space-between'
  },
  slotDetails: {
    paddingLeft: spacing.medium,
    paddingTop: spacing.medium_sm,
    flex: 1
  },
  startTime: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  timeText: {
    color: appTheme.grey,
    fontFamily: 'Poppins-Medium',
  },
  actionButtonContainer: {
    marginLeft: 'auto',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  day: {
    color: 'white',
    position: 'absolute',
    fontFamily: fonts.MontserratSemiBold,
    paddingTop: spacing.small,
    fontSize: fontSizes.h1
  },
  buttonText: {
    fontSize: fontSizes.h3
  },
  displayName: {
    color: appTheme.grey,
    fontFamily: 'Poppins-Medium',
    fontSize: fontSizes.h3
  }

});

export default React.memo(slot);