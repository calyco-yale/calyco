import React, { Component, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';


export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId
    };
  };

  fetchUserData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsersShortened))
      this.setState({allData: userData.data.listUsers.items})
    } catch (e) {
      console.log(e);
    }
  }



}
