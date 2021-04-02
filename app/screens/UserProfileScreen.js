import React, { Component, useState, useEffect } from 'react';
import { Text } from 'react-native';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import { isFriend, sentFriendRequest, getloggedInUser } from '../helpers';

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
      console.log(userData)
      const user = userData.data.getUser
      const loggedInUser = await getloggedInUser()
      this.setState({ user: user, loggedInUser: loggedInUser })
    } catch (e) {
      console.log(e);
    }
  };

  deleteFriendship = async(friendshipId)  => {
    try {
      await API.graphql(graphqlOperation(deleteFriendshipById, { id: friendshipId }))
    } catch (e) {
      console.log(e);
    }
  }

  deleteFriendRequest = async(requestId)  => {
    try {
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }))
      console.log(this.props.userId)
      
      Actions.refresh({ key: "userProfileScreen", userId: this.props.userId  })
    } catch (e) {
      console.log(e);
    }
  }

  sendFriendRequest = async(loggedInUser, userId)  => {
    try {
      await API.graphql(graphqlOperation(createSimpleFriendRequest, { userId: userId, senderId: loggedInUser.id }))
      console.log(this.props.userId)
      // Actions.refresh({ key: "userProfileScreen", userId: this.props.userId  })
      Actions.pop(); 
      setTimeout(()=> Actions.refresh({ key: "userProfileScreen", userId: this.props.userId }), 500);
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
    console.log(user)
    
    if (user) {
      let requestOrDelete = null;
      // TODO: Replace loggedInUser with actual value
      // TODO: Correct friend and friendrequest conditions
      if (user.id != loggedInUser.id){
        const friendshipId = isFriend(loggedInUser, user)
        console.log(friendshipId)
        if (friendshipId) {
          requestOrDelete = <TextButton
                              onPress={() => this.deleteFriendship(friendshipId)}
                              title={"Remove Friend"}
                              style={{width: '80%', textAlign: 'center'}}
                            />;
        } else {
          requestId = sentFriendRequest(loggedInUser, user)
          if (requestId){
            requestOrDelete = <TextButton
                                onPress={() => this.deleteFriendRequest(requestId)}
                                title={"Delete Request"}
                                style={{width: '80%', textAlign: 'center'}}
                              />;
          } else {
            requestOrDelete = <TextButton
                              onPress={() => this.sendFriendRequest(loggedInUser, user.id)}
                              title={"Send Friend Request"}
                              style={{width: '80%', textAlign: 'center'}}
                            />;
          }
        }
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

          <TextButton
            onPress={() => Actions.friendRequestScreen({user: user, friendRequests: user.friendRequests.items})}
            title={"Friend Requests"}
            style={{width: '80%', textAlign: 'center'}}
          />
          
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
