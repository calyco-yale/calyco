import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import BR from '../base_components/BR';
import CalendarEvent from '../components/CalendarEvent';
import { isFriend, sentFriendRequest, getloggedInUser, receivedFriendRequest, deleteMutualFriendship, sendFriendNotification, getInvitedEvents } from '../helpers';
import UpcomingEvent from '../components/UpcomingEvent';
import { Actions } from 'react-native-router-flux';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import { deleteFriendRequestById, createSimpleFriendRequest } from '../../src/graphql/custom_mutations';

// Screen to display given user's profile screen
class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userColor: "#ffa500",
      loggedInUser: null,
      loggedIn: false,
      events: [],
      invitedEvents: [],
      index: 0,
      routes: [{ key: 'first', title: 'Calendar' }, { key: 'second', title: 'Upcoming Events' }]
    };
  };

  getColor = async () => {    
    const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }));
    const iconColor = userData.data.getUser.image_url;

    if (iconColor != null) {
      // console.log('icon Color from db');
      // console.log(iconColor);
      this.setState({userColor: iconColor});
    }
  };


  fetchUserData = async () => {
    try {
      const loggedInUser = await getloggedInUser()
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      const user = userData.data.getUser
      const loggedIn = (user.id == loggedInUser.id)
      const invitedEvents = await getInvitedEvents(user)
      this.setState({ user: user, loggedInUser: loggedInUser, loggedIn: loggedIn, events: this.fetchEventData(user.events.items, loggedIn), invitedEvents: this.fetchEventData(invitedEvents, loggedIn) })
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

  // Event processing function
  fetchEventData(events, loggedIn){
    try {
      if (!loggedIn) {
        let publicEvents = [];
        for (let i = 0; i < events.length; i++){
          if (events[i] && events[i].public) {
            publicEvents.push(events[i]);
          }
        }
        return publicEvents
      } else {
        return events
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Friendship Related Functions
  deleteFriendship = async(loggedInUser, user)  => {
    try {
      await deleteMutualFriendship(loggedInUser, user)
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      const loggedInUserData = await API.graphql(graphqlOperation(getUser, { id: this.state.loggedInUser.id }))
      this.setState({user: userData.data.getUser, loggedInUser: loggedInUserData.data.getUser});
      this.forceUpdate()
    } catch (e) {
      console.log(e);
    }
  }

  deleteFriendRequest = async(requestId)  => {
    try {
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }))
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      this.setState({user: userData.data.getUser});
    } catch (e) {
      console.log(e);
    }
  }

  sendFriendRequest = async(loggedInUser, userId)  => {
    try {
      await API.graphql(graphqlOperation(createSimpleFriendRequest, { userId: userId, senderId: loggedInUser.id }))
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      await sendFriendNotification(userData.data.getUser.pushToken);
      this.setState({user: userData.data.getUser});
    } catch (e) {
      console.log(e);
    }
  }

  //function to delete event
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

  // Tab Related Functions

  //showing calendar tab
  FirstRoute = () => (
    <>
    <ScrollView style={{ flex: 2, backgroundColor: '#ffffff' }}>
      <CalendarEvent user = {this.state.user} loggedIn = {this.state.loggedIn} events = {this.state.events} invitedEvents={this.state.invitedEvents}/>
    </ScrollView>
    </>
  );
  
  //showing upcoming events tab
  SecondRoute = () => (
    <>
    <ScrollView style={{ flex: 2, backgroundColor: '#ffffff' }}>
      <UpcomingEvent user = {this.state.user} loggedIn = {this.state.loggedIn} events = {this.state.events} invitedEvents={this.state.invitedEvents} deleteEvent = {this.deleteEvent}></UpcomingEvent>
    </ScrollView>
    </>
  );
  
  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  //output the profile page layout with the 3 parts - 
  // 1. shows user profile information 
  // 2. shows user's calendar
  // 3. shows user's upcoming events
  // outputs friendships 
  render() {
    const layout = Dimensions.get('window');
    const { user, loggedInUser, loggedIn, events, invitedEvents, index, routes } = this.state;


    // Once user data is fetched
    if (user && loggedInUser) {
      let requestOrDelete = null;
      // When the user is not the logged in user
      this.getColor();
      if (user.id != loggedInUser.id){
        const friendshipId = isFriend(loggedInUser, user)
        if (friendshipId) { // If the user and logged in user are friends
          requestOrDelete = <TextButton
                              onPress={() => this.deleteFriendship(loggedInUser, user)}
                              title={"Remove Friend"}
                              style={styles.requests}
                            />;
        } else {
          const requestId = sentFriendRequest(loggedInUser, user)
          if (requestId){ //If the logged in user has sent a friend request to the user
            requestOrDelete = <TextButton
                                onPress={() => this.deleteFriendRequest(requestId)}
                                title={"Undo Friend Request"}
                                style={styles.requests}
                              />;
          } else {
            const receivedId = receivedFriendRequest(loggedInUser, user)
            if (receivedId) { //If the logged in user has received a friend request from the user
              requestOrDelete = <Text>Pending friend request from this user...</Text>
            } else { //Else
              requestOrDelete = <TextButton
                                  onPress={() => this.sendFriendRequest(loggedInUser, user.id)}
                                  title={"Send Friend Request"}
                                  style={styles.requests}
                                />;
            }
          }
        }
      }

      // Display friend request page only if user is logged in
      let friendRequestPage = null;
      if (user.id == loggedInUser.id){
        friendRequestPage = <TextButton
                              onPress={() => Actions.friendRequestScreen({user: user, friendRequests: user.friendRequests.items})}
                              title={"Friend Requests"}
                              style={styles.requests}
                            />
      }

      // Display user details
      return (
        <>
          <View style={{ flex: 0.4, marginTop: 35.0 }}>
            <AppBase style={{height: '30%'}}>
              <View style={[styles.container, {
                  flexDirection: "row"
                }]}>
                  <View style={{ flex: 1 }}>
                    {/* <Text> hi there</Text> */}
                    <TouchableOpacity
                        style={{
                            borderColor: this.state.userColor,
                            position: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundColor: 'white',
                            borderWidth: 3,
                            borderRadius: (140 / 2),
                            width: 140,
                            height: 140,
                        }}
                    >
                      <LottieView
                        style={{
                          width: 200,
                          height: 200,
                          // justifyContent: 'center',
                          // alignContent: 'center',
                          position: 'absolute',
                          top: -10,
                          left: -11,
                        }}
                        source={changeSVGColor(require("../../assets/8874-cat.json"), this.state.userColor)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 2 }}>
                    <PrimaryText size={'25px'} style={{ left: 15 }}>{user.first_name + ' ' + user.last_name}</PrimaryText>
                    <PrimaryText size={'15px'} style={{ left: 15, fontFamily: "Futura-MediumItalic" }}>{'@' + user.username}</PrimaryText>
                    <BR size={15}/>

                    <TextButton
                      onPress={() => Actions.friendScreen({friendships: user.friendships.items})}
                      title={"Display Friends"}
                      style={styles.friends}
                    />

                    {friendRequestPage}
                    
                    {requestOrDelete}

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
                  <Text style={{ color: 'black', margin: 8 }}>
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
        <Text style = {{fontSize: 25, marginTop: 100}}>
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
  friends: {
    width: '80%',
    position: 'absolute',
    top: 1,
    left: 40, 
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Futura'
  },
  requests: {
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
