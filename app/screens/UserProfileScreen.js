import React, { Component, useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
// import TextButton from '../base_components/TextButton';

import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';




export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  };

  fetchUserData = async () => {
    try {
      // console.log(this.userId)
      const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }))
      console.log(userData.data.getUser)
      this.setState({user: userData.data.getUser})
      console.log(user)
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount(){
    // this.setState({userId: this.props.userId})
    this.fetchUserData();
  }

  render() {
    const { user } = this.state;

    return (
      <View>
        <Text>{user.username}</Text>
      </View>

    );
  }


}
