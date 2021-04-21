import React, { Component } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, ScrollView, Button, Dimensions  } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Updates from 'expo-updates';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import BR from '../base_components/BR';
import RoundButton from '../base_components/RoundButton';
import CalendarEvent from '../components/CalendarEvent';
import UpcomingEvent from '../components/UpcomingEvent';
import ProfileBar from '../components/ProfileBar';
import { getloggedInUser } from '../helpers';
import { Auth } from 'aws-amplify';
import { Actions } from 'react-native-router-flux';
import { API, graphqlOperation } from "aws-amplify";
import { deleteEvent } from "../../src/graphql/custom_mutations";
import { getInvitedEvents } from "../helpers";



class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      events: [],
      invitedEvents: [],
      index: 0,
      routes: [{ key: 'first', title: 'Calendar' }, { key: 'second', title: 'My Events' }]
    };
  };

  fetchUserData = async () => {
    try {
      const loggedInUser = await getloggedInUser()
      const invitedEvents = await getInvitedEvents(loggedInUser)
      this.setState({ loggedInUser: loggedInUser, events: loggedInUser.events.items, invitedEvents: invitedEvents })
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        this.fetchUserData();
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  deleteEvent = async(eventId)  => {
    try {
      await API.graphql(
        graphqlOperation(deleteEvent, { id: eventId })
      );
      await this.fetchUserData();
    } catch (e) {
      console.log(e);
    }
  };

  // Sign out Function
  signOutProfile = async () => {
    try {
        await Auth.signOut();
        Actions.loginScreen();
        Updates.reloadAsync();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  // Tab Related Functions
  FirstRoute = () => (
    <>
    <ScrollView style={{ flex: 2, backgroundColor: '#ffffff' }}>
      <BR size={5} />
      <RoundButton
      title="Add Event"
      onPress={() => Actions.createEventScreen()}
      buttonColor='grey'
      />
      <BR size={5}/>
      <CalendarEvent user = {this.state.loggedInUser} loggedIn = {true} events = {this.state.events} invitedEvents={this.state.invitedEvents}/>
    </ScrollView>
    </>
  );
  
  SecondRoute = () => (
    <>
    <ScrollView style={{ flex: 2, backgroundColor: '#ffffff' }}>
      <UpcomingEvent user = {this.state.loggedInUser} loggedIn = {true} events = {this.state.events} invitedEvents={this.state.invitedEvents} deleteEvent = {this.deleteEvent}></UpcomingEvent>
    </ScrollView>
    </>
  );
  
  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  render() {
    const layout = Dimensions.get('window');
    const { loggedInUser, events, invitedEvents, index, routes } = this.state;
    if (loggedInUser) {
      return (
        <>
          <View style={{flex: 0.4, marginTop: 35.0 }}>
            <AppBase style={{height: '30%'}}>
              <View style={[styles.container, {
                flexDirection: "row"
              }]}>
                <View style={{ flex: 1 }}>
                  <ProfileBar />
                </View>
                <View style={{ flex: 2 }}>
                  <PrimaryText size={'25px'} style={{ left: 15 }}>{loggedInUser.first_name + ' ' + loggedInUser.last_name}</PrimaryText>
                  <PrimaryText size={'15px'} style={{ left: 15, fontFamily: "Futura-MediumItalic" }}>{'@' + loggedInUser.username}</PrimaryText>
                  <BR size={15}/>
                  
                  <TextButton
                    onPress={() => this.signOutProfile()}
                    title={"Sign Out"}
                    style={styles.sign_out}
                  />

                  <TextButton
                    onPress={() => Actions.friendScreen({friendships: loggedInUser.friendships.items})}
                    title={"My Friends"}
                    style={styles.friend_displays}
                  />

                  <TextButton
                    onPress={() => Actions.friendRequestScreen({user: loggedInUser, friendRequests: loggedInUser.friendRequests.items})}
                    title={"Friend Requests"}
                    style={styles.request_displays}
                  />

                </View>
              </View>
            </AppBase>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={this.renderScene}
            onIndexChange={() => this.setState({index: index})}
            initialLayout={{ width: layout.width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                renderLabel={({ route, color }) => (
                  <Text style={{ color: 'black', margin: 8, fontSize: 17, fontFamily: "Futura" }}>
                    {route.title}
                  </Text>
                )}
                style={{backgroundColor: 'gray'}}
              />
            )}
          />
        </>
      );
    } else {
      return (
      <AppBase> 
        <Text style = {{fontSize: 25, marginTop: 100, fontFamily: "Futura"}}>
          Loading...
        </Text>
      </AppBase>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    padding: 20,
  },
  friend_displays: {
    width: '80%',
    position: 'absolute',
    top: 1,
    left: 40, 
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Futura'
  },
  request_displays: {
    width: '80%',
    position: 'absolute',
    top: 30,
    left: 40, 
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Futura'
  },
  sign_out: {
    color: 'red',
    width: '80%',
    position: 'absolute',
    top: 59,
    left: 40, 
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Futura'
  },
  
});

export default UserProfileScreen;
