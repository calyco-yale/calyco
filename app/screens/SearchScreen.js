// Redirect here when search icon clicked in navbar

import React, { Component, useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import UserComponent from '../components/User'
import BR from '../base_components/BR'

import { API, graphqlOperation } from 'aws-amplify';
import { listUsersShortened } from '../../src/graphql/custom_queries';

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
        const itemData = item.name
          ? item.name.toUpperCase()
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

  _renderItem = ({ item }) => (
    <UserComponent userItem={item} />
  );

  _itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  componentDidMount(){
    this.fetchUserData();
  }

  render() {
    const { search, filteredData, allData } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Search..."
          onChangeText={(text) => this._filterSearch(text)}
          onClear={() => this._filterSearch("")}
          value={search}
        />

        <FlatList
          data={filteredData}
          // keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this._itemSeparator}
          renderItem={this._renderItem}
        />
      </View>

    );
  }
}
export default SearchScreen;
