import React, { Component } from 'react';
import { View, Text, ScrollView, Button, Dimensions  } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import CalendarEvent from '../components/CalendarEvent';
import { isFriend, sentFriendRequest, getloggedInUser, receivedFriendRequest, deleteMutualFriendship, sendFriendNotification, getInvitedEvents } from '../helpers';
import UpcomingEvent from '../components/UpcomingEvent';
import { Actions } from 'react-native-router-flux';
import { API, graphqlOperation, loadingBar } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { deleteFriendRequestById, createSimpleFriendRequest } from '../../src/graphql/custom_mutations';


class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedInUser: null,
      loggedIn: false,
      events: [],
      invitedEvents: [],
      index: 0,
      routes: [{ key: 'first', title: 'Calendar' }, { key: 'second', title: 'Upcoming Events' }]
    };
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

    if (user && loggedInUser) {
      let requestOrDelete = null;
      // TODO: Add check to see if user already received friend request 
      if (user.id != loggedInUser.id){
        const friendshipId = isFriend(loggedInUser, user)
        if (friendshipId) {
          requestOrDelete = <TextButton
                              onPress={() => this.deleteFriendship(loggedInUser, user)}
                              title={"Remove Friend"}
                              style={{width: '80%', textAlign: 'center'}}
                            />;
        } else {
          const requestId = sentFriendRequest(loggedInUser, user)
          if (requestId){
            requestOrDelete = <TextButton
                                onPress={() => this.deleteFriendRequest(requestId)}
                                title={"Undo Friend Request"}
                                style={{width: '80%', textAlign: 'center'}}
                              />;
          } else {
            const receivedId = receivedFriendRequest(loggedInUser, user)
            if (receivedId) {
              requestOrDelete = <Text>Pending friend request from this user...</Text>
            } else {
              requestOrDelete = <TextButton
                                  onPress={() => this.sendFriendRequest(loggedInUser, user.id)}
                                  title={"Send Friend Request"}
                                  style={{width: '80%', textAlign: 'center'}}
                                />;
            }
          }
        }
      }

      let friendRequestPage = null;
      if (user.id == loggedInUser.id){
        friendRequestPage = <TextButton
                              onPress={() => Actions.friendRequestScreen({user: user, friendRequests: user.friendRequests.items})}
                              title={"Friend Requests"}
                              style={{width: '80%', textAlign: 'center'}}
                            />
      }

      return (
        <>
          <View style={{ flex: 0.4, backgroundColor: '#ffffff'}}>
            <AppBase style={{flex: 0.4}}>
              <PrimaryText size={'26px'}>{user.username}</PrimaryText>
              <PrimaryText size = {'20px'}>{user.first_name + ' ' + user.last_name}</PrimaryText>
              <PrimaryText>{user.dob}</PrimaryText>
              <TextButton
                onPress={() => Actions.friendScreen({friendships: user.friendships.items})}
                title={"Display Friends"}
                style={{width: '80%', textAlign: 'center'}}
              />

              {friendRequestPage}
              
              {requestOrDelete}
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
export default UserProfileScreen;
