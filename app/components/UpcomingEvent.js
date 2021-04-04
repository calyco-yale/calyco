import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React, { Component, useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../src/constants/colors";
import AppBase from "../base_components/AppBase";
import UserComponent from "../components/User";
import { renderUserItem, userItemSeparator } from "../helpers";

import BoxSimple from '../components/EventBox'

import Post from './Post';

import { API, graphqlOperation } from "aws-amplify";
import { listEventsUpcoming } from "../../src/graphql/custom_queries";

class UpcomingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  fetchEventData = async () => {
    try {
      const eventData = await API.graphql(
        graphqlOperation(listEventsUpcoming)
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

  parseEventsNames = events => {
    const listOfNames = {};
    events.forEach(event => {
      listOfNames[event.date] = event.name;
    });

    return listOfNames;
  };

  parseEventsStartTimes= events => {
    const listOfStartTimes = {};
    events.forEach(event => {
      listOfStartTimes[event.date] = event.start_time;
    });

    return listOfStartTimes;
  };

  parseEventsEndTimes= events => {
    const listOfEndTimes = {};
    events.forEach(event => {
      listOfEndTimes[event.date] = event.end_time;
    });

    return listOfEndTimes;
  };

  render() {
    const { events } = this.state;
    if (events) {
      const listOfNames = this.parseEventsNames(events);
      const listOfStartTimes = this.parseEventsStartTimes(events);
      const listOfEndTimes = this.parseEventsEndTimes(events);
      // console.log(listOfNames);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {Object.keys(listOfNames).map(date => {
            return(
              <BoxSimple style= {{backgroundColor: '#ffffff'}}>
                <Text>{listOfNames[date]}</Text>
                <Text>{date}</Text>
                <Text>{listOfStartTimes[date].substring(0,5)} - {listOfEndTimes[date].substring(0,5)}</Text>
              </BoxSimple>
            )
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