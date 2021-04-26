import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Colors from '../../src/constants/colors';
import {renderUserItem, userItemSeparator} from '../helpers';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsersShortened } from '../../src/graphql/custom_queries';

// Screen to search users
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredData: [],
      allData: []
    };
  };

  // Fetch all user data in database; called on component mount
  fetchUserData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsersShortened))
      this.setState({allData: userData.data.listUsers.items})
    } catch (e) {
      console.log(e);
    }
  }

  // Function to filter users to be called on change of search input
  _filterSearch = (text) => {
    const { search, filteredData, allData } = this.state;
    if (text) {
      // Filters out users not matching the search query
      // Case insensitive
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
    this.setState({search: text}); // Update query state
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

  // Renders search bar and list of filtered users underneath
  render() {
    const { search, filteredData, allData } = this.state;
    return (
      <View style={{ backgroundColor: Colors.baseColor, marginTop: 55 }}>
        <SearchBar
          placeholder="Search..."
          onChangeText={(text) => this._filterSearch(text)}
          onClear={() => this._filterSearch("")}
          value={search}
          style= {{fontFamily: "Futura"}}
        />

        <FlatList
          data={filteredData}
          ItemSeparatorComponent={userItemSeparator}
          renderItem={renderUserItem}
        />
      </View>
    );
  }
}

export default SearchScreen;
