import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { Component, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../src/constants/colors";
import AppBase from "../base_components/AppBase";
import UserComponent from "../components/User";
import { renderUserItem, userItemSeparator } from "../helpers";
import { convertLocalTime } from "../helpers";
import { Actions } from "react-native-router-flux";

import BoxSimple from "../components/EventBox";

import CalendarEvent from "../components/CalendarEvent";

import Post from "./Post";

import { API, graphqlOperation, SortDirection } from "aws-amplify";
import { listEventsUpcoming } from "../../src/graphql/custom_queries";
import { deleteEvent } from "../../src/graphql/custom_mutations";
import { getUser } from "../../src/graphql/queries";

class UpcomingEvent extends Component {
  constructor(props) {
    super(props);
  }

  //get names of events from backend
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

  //sort the events by time to output in order
  sortEvents = events => {
    const newEvents = events.sort((a, b) =>
      a.start_datetime
        .substring(0, 10)
        .localeCompare(b.start_datetime.substring(0, 10))
    );
    return newEvents;
  };

  //output upcoming events component that shows name, time, and ability to delete if logged in user
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
    // console.log("total_events", total_events);
    if (total_events) {
      const sortedEvents = this.sortEvents(total_events);
      if (this.props.loggedIn) {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {sortedEvents.map(event => {
              const start_time = convertLocalTime(event.start_datetime);
              const end_time = convertLocalTime(event.end_datetime);
              return (
                <BoxSimple style={{ backgroundColor: "#ffffff" }}>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.props.deleteEvent(event.id)}
                    >
                      <Image
                        style={styles.removeIcon}
                        source={require("../../assets/delete.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.eventText}>
                    {event.name}
                  </Text>
                  <Text>
                    {start_time} - {end_time}
                  </Text>
                </BoxSimple>
              );
            })}
          </View>
        );
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {sortedEvents.map(event => {
              const start_time = convertLocalTime(event.start_datetime);
              const end_time = convertLocalTime(event.end_datetime);
              return (
                <BoxSimple style={{ backgroundColor: "#ffffff" }}>
                  <Text style={styles.eventText}>
                    {event.name}
                  </Text>
                  <Text>
                    {start_time} - {end_time}
                  </Text>
                </BoxSimple>
              );
            })}
          </View>
        );
      }
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  removeIcon: {
    marginLeft: 5,
    marginBottom: 5,
    width: 15,
    height: 15,
    tintColor: "firebrick"
  },
  eventText: {
    color: "#f4a95d",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default UpcomingEvent;
