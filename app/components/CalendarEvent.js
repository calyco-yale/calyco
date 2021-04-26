import { Calendar } from "react-native-calendars";
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { convertLocalTime } from "../helpers";
import Colors from "../../src/constants/colors";

// Calender Component to be displayed in User's Profile Page
class CalendarEvent extends Component {
  constructor(props) {
    super(props);
  }

  // Convert UTC to local time
  timeZoneConvertEvent = events => {
    const change_events = [];
    events.forEach(event => {
      const _ = require("lodash");
      var temp_event = _.cloneDeep(event);
      temp_event.start_datetime = convertLocalTime(event.start_datetime);
      temp_event.end_datetime = convertLocalTime(event.end_datetime);
      change_events.push(temp_event);
    });
    return change_events;
  };

  /* Parse events to find the start and end datetimes for each event
    Return a dictionary of marked dates w/ info on how to mark each date on the calendar:
    has event, color, dot, starting, ending, between */
  parseEvents = events => {
    const listOfMarkedDates = {};
    events.forEach(event => {
      listOfMarkedDates[event.start_datetime.substring(0, 10)] = {
        marked: true,
        dotColor: "#5a5757",
        color: Colors.calycoColor
      };
    });

    events.forEach(event => {
      const daysSpan =
        event.end_datetime.substring(8, 10) -
        event.start_datetime.substring(8, 10);
      if (daysSpan == 0) {
        listOfMarkedDates[event.start_datetime.substring(0, 10)] = {
          marked: true,
          dotColor: "#5a5757",
          color: Colors.calycoColor
        };
        return listOfMarkedDates;
      }
      for (let i = 0; i < daysSpan - 1; i++) {
        let newDate =
          event.start_datetime.substring(0, 8) +
          (parseInt(event.start_datetime.substring(8, 10)) + i + 1).toString();
        listOfMarkedDates[newDate] = {
          color: Colors.calycoColor
        };
      }
      if (
        Object.keys(listOfMarkedDates).includes(
          event.end_datetime.substring(0, 10)
        )
      ) {
        listOfMarkedDates[event.end_datetime.substring(0, 10)] = {
          marked: true,
          dotColor: "#5a5757",
          color: Colors.calycoColor
        };
      } else {
        listOfMarkedDates[event.end_datetime.substring(0, 10)] = {
          color: Colors.calycoColor
        };
      }
    });
    return listOfMarkedDates;
  };

  // Stores the name of the event on a certain day
  parseEventsNames = events => {
    const listOfNames = {};
    events.forEach(event => {
      if (!listOfNames[event.start_datetime.substring(0, 10)]) {
        listOfNames[event.start_datetime.substring(0, 10)] = [];
      }
      listOfNames[event.start_datetime.substring(0, 10)].push(event.name);
      if (
        !Object.keys(listOfNames).includes(event.end_datetime.substring(0, 10))
      ) {
        const daysSpan =
          event.end_datetime.substring(8, 10) -
          event.start_datetime.substring(8, 10);
        for (let i = 0; i < daysSpan - 1; i++) {
          let newDate =
            event.start_datetime.substring(0, 8) +
            (parseInt(event.start_datetime.substring(8, 10)) +
              i +
              1).toString();
          if (!listOfNames[newDate]) {
            listOfNames[newDate] = [];
          }
          listOfNames[newDate].push(event.name);
        }
        if (!listOfNames[event.end_datetime.substring(0, 10)]) {
          listOfNames[event.end_datetime.substring(0, 10)] = [];
        }
        listOfNames[event.end_datetime.substring(0, 10)].push(event.name);
      }
    });

    return listOfNames;
  };

  // called each time a user views the calendar tab in the profile page
  render() {
    // list of event objects the user created
    const events = this.props.events;
    // list of events objects the user was invited to (including nulls due to deleted events)
    const invitedEvents = this.props.invitedEvents;
    // list of events objects the user was invited to (without nulls)
    const newInvitedEvents = [];
    for (let i = 0; i < invitedEvents.length; i++) {
      if (invitedEvents[i] != null) {
        newInvitedEvents.push(invitedEvents[i]);
      }
    }
    // list of all of the events the user is participating in
    const total_events = events.concat(newInvitedEvents);

    if (total_events) {
      // list of events with local times
      const localtimeEvents = this.timeZoneConvertEvent(total_events);
      const listOfMarkedDates = this.parseEvents(localtimeEvents);
      const listOfNames = this.parseEventsNames(localtimeEvents);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Calendar
            markedDates={listOfMarkedDates}
            markingType={"period"}
            // alerts only when a day with an event is pressed
            onDayPress={day => {
              if (Object.keys(listOfMarkedDates).includes(day.dateString)) {
                alert(
                  `There is ${listOfNames[day.dateString]} on ${day.dateString}`
                );
              }
            }}
            style={styles.calendar}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "orange",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "orange",
              indicatorColor: "orange",
              textDayFontFamily: "Futura",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  calendar: {
    width: 350
  }
});

export default CalendarEvent;
