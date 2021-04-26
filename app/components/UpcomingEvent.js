import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { convertLocalTime } from '../helpers';

import BoxSimple from "../components/EventBox";

class UpcomingEvent extends Component {
  constructor(props) {
    super(props);
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
    const events = this.props.events
    const invitedEvents = this.props.invitedEvents
    const newInvitedEvents = [];
    for (let i = 0; i < invitedEvents.length; i++) {
      if (invitedEvents[i] != null) {
        newInvitedEvents.push(invitedEvents[i]);
      }
    }
    if (events) {
      const sortedEvents = this.sortEvents(events);
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
                    style={{justifyContent: "flex-end", alignItems: "flex-end" }}
                  >
                    <TouchableOpacity onPress={() => this.props.deleteEvent(event.id)}>
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
      }
      else {
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
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default UpcomingEvent;
