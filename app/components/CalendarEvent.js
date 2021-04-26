<<<<<<< HEAD
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { Component, useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../src/constants/colors";
import AppBase from "../base_components/AppBase";
import UserComponent from "../components/User";
import {
  getInvitedEvents,
  renderUserItem,
  userItemSeparator
} from "../helpers";

import { API, graphqlOperation } from "aws-amplify";
import { listEventsShortened } from "../../src/graphql/custom_queries";
=======
import { Calendar } from "react-native-calendars";
import React, { Component } from "react";
import { View } from "react-native";
>>>>>>> testing-framework
import { convertLocalTime } from "../helpers";

class CalendarEvent extends Component {
  constructor(props) {
    super(props);
  }

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

  parseEvents = events => {
    const listOfMarkedDates = {};
    events.forEach(event => {
      listOfMarkedDates[event.start_datetime.substring(0, 10)] = {
        marked: true,
        dotColor: "#5a5757",
        // startingDay: true,
        color: "#f4a95d"
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
          // startingDay: true,
          // endingDay: true,
          color: "#f4a95d"
        };
        return listOfMarkedDates;
      }
      for (let i = 0; i < daysSpan - 1; i++) {
        let newDate =
          event.start_datetime.substring(0, 8) +
          (parseInt(event.start_datetime.substring(8, 10)) + i + 1).toString();
        listOfMarkedDates[newDate] = {
          color: "#f4a95d"
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
          color: "#f4a95d"
        };
      } else {
        listOfMarkedDates[event.end_datetime.substring(0, 10)] = {
          // endingDay: true,
          color: "#f4a95d"
        };
      }
    });
    return listOfMarkedDates;
  };

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

  render() {
    const events = this.props.events;
    const invitedEvents = this.props.invitedEvents;
    const newInvitedEvents = [];
    for (let i = 0; i < invitedEvents.length; i++) {
      if (invitedEvents[i] != null) {
        newInvitedEvents.push(invitedEvents[i]);
      }
    }
    const total_events = events.concat(newInvitedEvents);

    if (total_events) {
      const second_events = total_events;
      const a_events = this.timeZoneConvertEvent(second_events);
      const listOfMarkedDates = this.parseEvents(a_events);
      const listOfNames = this.parseEventsNames(a_events);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={listOfMarkedDates}
            markingType={"period"}
            onDayPress={day => {
              if (Object.keys(listOfMarkedDates).includes(day.dateString)) {
                alert(
                  `There is ${listOfNames[day.dateString]} on ${day.dateString}`
                );
              }
              // 1. for each date in event_dates --> mark dates
              // 2. if pressed date is in list of event dates => alert
            }}
            style={{ width: 350 }}
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

export default CalendarEvent;
