// Redirect here when search icon clicked in navbar

import React, { Component, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Colors from '../../src/constants/colors';
import {renderUserItem, userItemSeparator} from '../helpers';

import { API, graphqlOperation } from 'aws-amplify';
import { listUsersShortened } from '../../src/graphql/custom_queries';

import {suggestTimes} from '../helpers'
import { getUser } from '../../src/graphql/queries';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredData: [],
      allData: []
    };
  };

  fetchUserData = async () => {
    try {
      // Example of suggestTimes algorithm usage
      // const jinny = await API.graphql(graphqlOperation(getUser, { id: 'b9ea6a53-3922-4c09-ad6d-30557623014e' }))
      // const rina = await API.graphql(graphqlOperation(getUser, { id: '662ee4a5-0510-4616-a315-0cdb4f742c63' }))
      // const daniel = await API.graphql(graphqlOperation(getUser, { id: '3b3d84e2-feda-4b3e-a055-a11b84c43f54' }))
      // console.log(suggestTimes([jinny.data.getUser, rina.data.getUser, daniel.data.getUser], "2021-04-04"))

      const userData = await API.graphql(graphqlOperation(listUsersShortened))
      this.setState({allData: userData.data.listUsers.items})
    } catch (e) {
      console.log(e);
    }
  }

  _filterSearch = (text) => {
    const { search, filteredData, allData } = this.state;
    if (text) {
      const newData = allData.filter(function (item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({filteredData: newData});
    } else {
      this.setState({filteredData: []}); //No query
    }
    this.setState({search: text});
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        if (this.state.allData.length == 0) {
          this.fetchUserData();
        }
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { search, filteredData, allData } = this.state;
    return (
      <View style={{ backgroundColor: Colors.baseColor, marginTop: 35.0 }}>
        <SearchBar
          placeholder="Search..."
          onChangeText={(text) => this._filterSearch(text)}
          onClear={() => this._filterSearch("")}
          value={search}
        />

        <FlatList
          data={filteredData}
          // keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={userItemSeparator}
          renderItem={renderUserItem}
        />
      </View>
    );
  }
}

export default SearchScreen;
