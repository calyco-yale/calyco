import React, { Component, useState, useEffect } from 'react';
import { Text } from 'react-native';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import { isFriend, sentFriendRequest, getloggedInUser, receivedFriendRequest, deleteMutualFriendship } from '../helpers';

import { Actions } from 'react-native-router-flux';

import { API, graphqlOperation, loadingBar } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { deleteFriendshipById, deleteFriendRequestById, createSimpleFriendRequest } from '../../src/graphql/custom_mutations';


class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedInUser: null
    };
  };

  fetchUserData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      const user = userData.data.getUser
      const loggedInUser = await getloggedInUser()
      this.setState({ user: user, loggedInUser: loggedInUser })
    } catch (e) {
      console.log(e);
    }
  };

  deleteFriendship = async(loggedInUser, user)  => {
    try {
      await deleteMutualFriendship(loggedInUser, user);
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      this.setState({user: userData.data.getUser});
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
      this.setState({user: userData.data.getUser});
    } catch (e) {
      console.log(e);
    }
  }


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

  render() {
    const { user, loggedInUser } = this.state;
    
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
        <AppBase>
          <PrimaryText size={26}>{user.username}</PrimaryText>
          <PrimaryText size = {20}>{user.first_name + ' ' + user.last_name}</PrimaryText>
          <PrimaryText>{user.dob}</PrimaryText>

          <TextButton
            onPress={() => Actions.friendScreen({friendships: user.friendships.items})}
            title={"Display Friends"}
            style={{width: '80%', textAlign: 'center'}}
          />

          {friendRequestPage}
          
          {requestOrDelete}
        </AppBase>
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
