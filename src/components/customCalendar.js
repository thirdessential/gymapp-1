import React from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {appTheme} from "../constants/colors";


const customCalendar = (props) => {

  const {selectedDate = Date(), onDateChange} = props;

  const markedDates = {};
  const selected = new Date(selectedDate);
  const dateString = selected.toISOString().split('T')[0];
  markedDates[dateString] = {selected: true, selectedColor: appTheme.brightContent};
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth()+1)
  return (
    <Calendar

      markedDates={markedDates}
      minDate={Date()}
      maxDate={nextMonth}
      onDayPress={({dateString}) => onDateChange(dateString)}
      hideExtraDays={true}
      firstDay={1}
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={true}
      theme={{
        calendarBackground: appTheme.background,
        textSectionTitleColor: 'white',
        selectedDayTextColor: 'white',
        dayTextColor: 'white',
        textDisabledColor: appTheme.grey,
        arrowColor: appTheme.lightContent,
        disabledArrowColor: appTheme.grey,
        monthTextColor: appTheme.lightContent,
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
  )
}

export default customCalendar;