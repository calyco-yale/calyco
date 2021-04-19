import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import CreateEventComponent from '../components/CreateEvent';

// query imports
import { API, graphqlOperation } from 'aws-amplify';
import { listUsersShortened } from '../../src/graphql/custom_queries';

import { Actions } from 'react-native-router-flux';
import { userItemSeparator} from '../helpers';

import { getUser } from '../../src/graphql/queries';
import { Alert, View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TextButton from '../base_components/TextButton';

class AddParticipantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Should have access to logged in user => this.props.loggedInUser
      participants: [],
      search: "",
      filteredData: [],
      allData: []
    };
  }

  fetchRequestData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsersShortened))
      console.log('fetch', this.props.participants)
      this.setState({allData: userData.data.listUsers.items, participants: this.props.participants})
    } catch (e) {
        console.log(e);
    }
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { 
        this.fetchRequestData()
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
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


  renderUser(item){
    console.log(item);
    <TextButton title={item.username} primary onPress={() => this.addParticipant(item) }/>
  }

  addParticipant(participant){
    let participants = this.state.participants
    console.log('here')
    console.log(participant)
    console.log(participants)
    if (participant == this.props.loggedInUser){
      Alert.alert("Cannot add yourself as a participant.")
    } else if (participants.includes(participant)) {
      Alert.alert("Participant already added.")
    } else {
      participants.push(participant)
      console.log(participants)
      this.setState({ participants: participants})
    }
  }

  render() {
    const { participants, search, filteredData, allData } = this.state
    console.log('render', participants)
    console.log(filteredData)
    return (
      <View>
        <Text>
          {participants.map(p => {
            <TextButton title={p.username} primary onPress={() => Actions.userProfileScreen({ userId: p.id })}/>
          })}
        </Text>

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
          renderItem={({ item }) => <TextButton title={item.username} primary onPress={() => this.addParticipant(item)}/>}
        />
      </View>

    );
  }
}

export default AddParticipantScreen;