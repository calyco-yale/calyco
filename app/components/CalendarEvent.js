import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const CalendarEvent = () =>
  <Calendar
    // Collection of dates that have to be marked. Default = {}
    markedDates={{
      "2021-03-28": { selected: true, marked: true, selectedColor: "blue" },
      "2021-03-17": { marked: true, dotColor: "red", activeOpacity: 0 },
      "2021-03-22": { disabled: true, disableTouchEvent: true }
    }}
    onDayPress={day => {
      console.log("selected day", day);
    }}
  />;
export default CalendarEvent;
