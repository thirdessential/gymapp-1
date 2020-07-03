/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'native-base';

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import SelectableButton from "./selectableButton";
import strings from "../constants/strings";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";

let daysMapping = {'SUN': 'Su', 'MON': 'M', 'TUE': 'Tu', 'WED': 'W', 'THU': 'Th', 'FRI': 'F', 'SAT': 'Sa'};

const slot = (props) => {
  return (
    <Card style={styles.cardStyle}>
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
          <Text style={styles.startTime}>{props.startTime}</Text>
          <Text style={styles.timeText}>{props.duration} Min</Text>
        </View>

        <View style={styles.actionButtonContainer}>
          {
            props.bookCallback && (
              <SelectableButton onPress={props.bookCallback} selected={true} textContent={strings.BOOK} textStyle={styles.buttonText}/>

            )
          }
        </View>
      </View>
    </Card>
  );
}


slot.propTypes = {
  startTime: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
};

slot.defaultProps = {
  displayName: 'Yash Shrivastav',
  startTime: '5:20 PM',
  imageUrl: 'sd'
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor: appTheme.background,
    borderColor: appTheme.background
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
    paddingTop: spacing.medium_sm
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
  }

});

export default slot;