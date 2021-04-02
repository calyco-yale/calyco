import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { Component, useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../src/constants/colors";
import AppBase from "../base_components/AppBase";
import UserComponent from "../components/User";
import { renderUserItem, userItemSeparator } from "../helpers";

import { API, graphqlOperation } from "aws-amplify";
import { listEventsShortened } from "../../src/graphql/custom_queries";

class CalendarEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  fetchEventData = async () => {
    try {
      const eventData = await API.graphql(
        graphqlOperation(listEventsShortened)
      );
      this.setState({ events: eventData.data.listEvents.items });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    console.log(this);
    // this.didFocusListener = this.props.addListener("didFocus", () => {
    //   if (this.state.events.length == 0) {
    this.fetchEventData();
    // }
    // });
  }

  // componentWillUnmount() {
  //   this.didFocusListener.remove();
  // }

  parseEvents = events => {
    const listOfMarkedDates = {};
    events.forEach(event => {
      listOfMarkedDates[event.date] = {
        marked: true,
        dotColor: "red"
      };
    });

    return listOfMarkedDates;
  };

  render() {
    const { events } = this.state;
    console.log(events);
    if (events) {
      const listOfMarkedDates = this.parseEvents(events);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={listOfMarkedDates}
            onDayPress={day => {
              alert(`Event on this day:${day.dateString}`);
              // 1. for each date in event_dates --> mark dates
              // 2. if pressed date is in list of event dates => alert
            }}
          />
        </View>
      );
    }
  }
}

export default CalendarEvent;
