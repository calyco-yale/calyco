import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { convertLocalTime } from '../helpers';

import BoxSimple from "../components/EventBox";

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

  getCurrentandAfterEvents = sortedEvents => {
    const new_date = new Date();
    const newEvents = [];
    sortedEvents.forEach(event => {
      // console.log(new_date)
      // console.log(event.end_datetime);
      const new_time = convertLocalTime(event.end_datetime);
      const temp_date = new Date(new_time.substring(0,4), new_time.substring(5,7) - 1, new_time.substring(8,10), new_time.substring(11,13), new_time.substring(14,16), 0, 0);
      if (temp_date >= new_date) {
        newEvents.push(event);
      }
    });

    return newEvents;
  };

  //output upcoming events component that shows name, time, and ability to delete if logged in user
  render() {
    const events = this.props.events;
    const invitedEvents = this.props.invitedEvents;
    // console.log("invited");
    // console.log(invitedEvents);
    const newInvitedEvents = {};
    const invitedList = [];
    for (let i = 0; i < invitedEvents.length; i++) {
      if (invitedEvents[i]) {
        if (!newInvitedEvents[invitedEvents[i].start_datetime]) {
          newInvitedEvents[invitedEvents[i].start_datetime] = [];
        }
        newInvitedEvents[invitedEvents[i].start_datetime].push(invitedEvents[i]);
        invitedList.push(invitedEvents[i]);
      }
    }
    const mergedEvents = events.concat(invitedList);
    if (events) {
      const sortedEvents = this.sortEvents(mergedEvents);
      const afterEvents = this.getCurrentandAfterEvents(sortedEvents);
      // console.log(afterEvents);
      if (this.props.loggedIn) {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {afterEvents.map(event => {
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
            {afterEvents.map(event => {
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
