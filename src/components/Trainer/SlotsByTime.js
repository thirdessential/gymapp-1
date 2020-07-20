/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import {spacing} from "../../constants/dimension";

import {formatTimeArray, groupBy, militaryTimeToString, stringToMilitaryTime} from "../../utils/utils";
import SelectableButtonGroup from "../selectableButtonGroup";
import MiniSlotCard from "../MiniSlotCard";

const slotsByTime = (props) => {
  const {slots, bookCallback} = props;
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
    if (!subscriptionId) return null;
    const name = subscriptionId.subscribedBy && subscriptionId.subscribedBy.name;
    return !!name ? name : null;
  }

  const renderSlot = (slot, index) => {
    // keys can sometimes not be unique TODO:Backend changes
    return (
      <View style={styles.slotContainer} key={slot.dayOfWeek + index}>
        <MiniSlotCard
          bookCallback={props.bookCallback ? () => props.bookCallback(slot.dayOfWeek, slot.time) : null}
          day={slot.dayOfWeek}
          duration={slot.duration}
          subscribedBy={getSubscriberName(slot)}
          startTime={militaryTimeToString(slot.time)}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ButtonGroup/>
      <View style={styles.listContainer}>
        {/*{*/}
        {/*  groupedSlots[selectedTime].map((slot, index) => renderSlot(slot, index))*/}
        {/*}*/}
        <FlatList
          data={groupedSlots[selectedTime]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{margin: spacing.medium_lg}}/>}
          renderItem={({item, index}) => renderSlot(item, index)}/>
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
    marginTop: spacing.medium_lg,
    // height:screenHeight/1.4
  },
  slotContainer: {
    marginBottom: spacing.small
  }
});

export default React.memo(slotsByTime);