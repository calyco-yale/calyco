import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { Component, useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../src/constants/colors";
import AppBase from "../base_components/AppBase";
import UserComponent from "../components/User";
import { renderUserItem, userItemSeparator } from "../helpers";

import BoxSimple from "../components/EventBox";

import CalendarEvent from "../components/CalendarEvent";

import Post from "./Post";

import { API, graphqlOperation, SortDirection } from "aws-amplify";
import { listEventsUpcoming } from "../../src/graphql/custom_queries";

class UpcomingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getPublicEvents = events => {
    const publicEvents = [];
    events.forEach(event => {
      if (event.public) {
        publicEvents.push(event);
      }
    });

    return publicEvents;
  };

  fetchEventData = async () => {
    try {
      const tempEvents = this.props.user.events.items;
      if (!this.props.loggedIn) {
        const publicEvents = this.getPublicEvents(tempEvents);
        this.setState({ events: publicEvents });
      } else {
        this.setState({ events: tempEvents });
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.fetchEventData();
  }

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

  parseEventsStartTimes = events => {
    const listOfStartTimes = {};
    events.forEach(event => {
      listOfStartTimes[event.date] = event.start_time;
    });

    return listOfStartTimes;
  };

  parseEventsEndTimes = events => {
    const listOfEndTimes = {};
    events.forEach(event => {
      listOfEndTimes[event.date] = event.end_time;
    });

    return listOfEndTimes;
  };

  sortEvents = events => {
    const newEvents = events.sort((a, b) =>
      a.start_datetime
        .substring(0, 10)
        .localeCompare(b.start_datetime.substring(0, 10))
    );
    return newEvents;
  };

  render() {
    this.fetchEventData();
    const { events } = this.state;
    if (events) {
      const sortedEvents = this.sortEvents(events);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {sortedEvents.map(event => {
            return (
              <BoxSimple style={{ backgroundColor: "#ffffff" }}>
                <Text>
                  {event.name}
                </Text>
                <Text>
                  {event.start_datetime} - {event.end_datetime}
                </Text>
              </BoxSimple>
            );
          })}
        </View>
      );
    }
  }
}

export default UpcomingEvent;
