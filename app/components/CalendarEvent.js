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
      const tempEvents = this.props.user.events.items;
      if (!this.props.loggedIn){
        const publicEvents = this.getPublicEvents(tempEvents);
        this.setState({events: publicEvents});
      }
      else {
        this.setState({events: tempEvents});
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
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

  parseEventsNames = events => {
    const listOfNames = {};
    events.forEach(event => {
      if (!listOfNames[event.date]) {
        listOfNames[event.date] = [];
      }
      listOfNames[event.date].push(event.name);
    });

    return listOfNames;
  };

  render() {
    const { events } = this.state;
    if (events) {
      const listOfMarkedDates = this.parseEvents(events);
      const listOfNames = this.parseEventsNames(events);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={listOfMarkedDates}
            onDayPress={day => {
              if (Object.keys(listOfMarkedDates).includes(day.dateString)) {
                alert(
                  `There is ${listOfNames[day.dateString]} on ${day.dateString}`
                );
              }
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