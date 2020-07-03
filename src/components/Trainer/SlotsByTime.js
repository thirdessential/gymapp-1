/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types';
import CustomProgressBar from "../CustomProgressBar";
import GenericText from "../GenericText";
import strings from "../../constants/strings";
import {spacing, spacing as dimension} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {formattedTime, formatTimeArray, groupBy, militaryTimeToString, stringToMilitaryTime} from "../../utils/utils";
import SelectableButtonGroup from "../selectableButtonGroup";
import MiniSlotCard from "../MiniSlotCard";


const slotsByTime = (props) => {
  const {slots} = props;
  if (slots.length === 0) return null;

  const [groupedSlots] = useState(groupBy(slots, 'time'));
  const [selectedTime, setSelectedTime] = useState(Object.keys(groupedSlots)[0]);

  const changeSelectedTime = (time) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTime(stringToMilitaryTime(time));
  }

  const ButtonGroup = () => (
    <View style={styles.buttonGroup}>
      <SelectableButtonGroup
        data={formatTimeArray(Object.keys(groupedSlots))}
        selected={militaryTimeToString(selectedTime)}
        onSelect={changeSelectedTime}
      />
    </View>
  )

  const renderSlot = slot => (
    <View style={styles.slotContainer} key={slot.dayOfWeek}>
      <MiniSlotCard day={slot.dayOfWeek} duration={slot.duration} startTime={militaryTimeToString(slot.time)}/>
    </View>
  )
  return (
    <View style={styles.container}>
      <ButtonGroup/>
      <View style={styles.listContainer}>
        {
          groupedSlots[selectedTime].map(slot => renderSlot(slot))
        }
      </View>
    </View>
  );
}

slotsByTime.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroup: {},
  listContainer: {
    marginTop: spacing.medium_lg
  },
  slotContainer: {
    marginBottom: spacing.small
  }
});

export default slotsByTime;