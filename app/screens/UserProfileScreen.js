import React, { Component, useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';

import { Actions } from 'react-native-router-flux';

import { getFriends } from '../helpers';

import { API, graphqlOperation, loadingBar } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';


class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      friends: []
    };
  };

  fetchUserData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      const user = userData.data.getUser
      const friends = await getFriends(user.friendships.items)
      this.setState({user: user, friends: friends})
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
    const { user, friends } = this.state;
    if (user) {
      return (
        <AppBase>
          <PrimaryText size={26}>{user.username}</PrimaryText>
          <PrimaryText size = {20}>{user.first_name + ' ' + user.last_name}</PrimaryText>
          <PrimaryText>{user.dob}</PrimaryText>

          <TextButton
          onPress={() => Actions.friendScreen({friends: friends})}
          title={"Display Friends"}
          style={{
            width: '80%',
            textAlign: 'center'
          }}
        />
        </AppBase>
      );
    } else {
      return (
      <AppBase> 
        <Text 
        style = {{
          fontSize: 25,
          marginTop: 100
        }}>
          Loading...
          </Text>
      </AppBase>
      )
    }
  }
}
export default UserProfileScreen;
