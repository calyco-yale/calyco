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
      // const eventData = await API.graphql(
      //   graphqlOperation(listEventsUpcoming)
      // );
      // this.setState({ events: eventData.data.listEvents.items });
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
    const { events } = this.state;
    if (events) {
      // const listOfNames = this.parseEventsNames(events);
      // const listOfStartTimes = this.parseEventsStartTimes(events);
      // const listOfEndTimes = this.parseEventsEndTimes(events);

      // const ordered_names = {};
      // Object.keys(listOfNames).sort().forEach(function(key) {
      //   ordered_names[key] = listOfNames[key];
      // });

      // const ordered_start_time = {};
      // Object.keys(listOfStartTimes).sort().forEach(function(key) {
      //   ordered_start_time[key] = listOfStartTimes[key];
      // });

      // const ordered_end_time = {};
      // Object.keys(listOfEndTimes).sort().forEach(function(key) {
      //   ordered_end_time[key] = listOfEndTimes[key];
      // });

      const sortedEvents = this.sortEvents(events);
      // if (sortedEvents[0])
      //   console.log(sortedEvents[0].start_datetime.substring(0, 10));
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

          {/* <Post
            event_name={listOfNames[0]}
            // event_date={item.item.event_date}
            // event_host={item.item.event_host}
          />; */}
        </View>
      );
    }
  }
}

export default UpcomingEvent;
