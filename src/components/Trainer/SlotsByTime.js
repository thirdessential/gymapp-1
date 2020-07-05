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
  const getSubscriberName = slot => {
    const {subscriptionId} = slot;
    if(!subscriptionId)return null;
    const {name} = subscriptionId.subscribedBy;
    return !!name?name:null;
  }

  const renderSlot = (slot,index) => (
    // keys can sometimes not be unique TODO:Backend changes
    <View style={styles.slotContainer} key={slot.dayOfWeek + index}>
      <MiniSlotCard
        bookCallback={props.bookCallback ? () => props.bookCallback(slot.dayOfWeek, slot.time) : null}
        day={slot.dayOfWeek}
        duration={slot.duration}
        subscribedBy={getSubscriberName(slot)}
        startTime={militaryTimeToString(slot.time)}/>
    </View>
  )
  return (
    <View style={styles.container}>
      <ButtonGroup/>
      <View style={styles.listContainer}>
        {
          groupedSlots[selectedTime].map((slot,index) => renderSlot(slot,index))
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