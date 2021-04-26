import React, { Component } from "react";

// query imports
import { API, graphqlOperation } from "aws-amplify";
import { listUsersWithEvents } from "../../src/graphql/custom_queries";

import { userItemSeparator } from "../helpers";

import {
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { SearchBar } from "react-native-elements";
import TextButton from "../base_components/TextButton";
import Header from "../components/Header";

class AddParticipantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      search: "",
      filteredData: [],
      allData: []
    };
  }

  // set list of participants and list of data for all users with event
  fetchRequestData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsersWithEvents));
      this.setState({
        allData: userData.data.listUsers.items,
        participants: this.props.participants
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchRequestData();
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  _filterSearch = text => {
    const { allData } = this.state;
    if (text) {
      const newData = allData.filter(function(item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ filteredData: newData });
    } else {
      this.setState({ filteredData: [] });
    }
    this.setState({ search: text });
  };

  // adds selected user to the list of participants
  addParticipant(participant) {
    let participants = this.state.participants;
    let pids = participants.map(p => p.id);
    if (participant.id == this.props.loggedInUser.id) {
      Alert.alert("Cannot add yourself as a participant.");
    } else if (pids.includes(participant.id)) {
      Alert.alert("Participant already added.");
    } else {
      participants.push(participant);
      this.setState({ participants: participants });
    }
  }

  // removes selected user from the list of participants
  deleteParticipant(participant_id) {
    let participants = this.state.participants;
    let index = -1;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id == participant_id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      participants.splice(index, 1);
    }
    this.setState({ participants: participants });
  }

  // returns a component that contains added participant and the remove icon
  renderParticipantsListItem(item) {
    return (
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>
          {item.username}
        </Text>
        <TouchableOpacity onPress={() => this.deleteParticipant(item.id)}>
          <Image
            style={styles.removeIcon}
            source={require("../../assets/remove_icon.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { participants, search, filteredData } = this.state;
    if (participants && this.props.loggedInUser) {
      let displayParticipants = [];
      for (let i = 0; i < participants.length; i++) {
        displayParticipants.push(
          <Text key={participants[i].id}>
            {participants[i].username}
          </Text>
        );
      }
      return (
        <View style={styles.container}>
          <Header title="Participants" />
          {/* list of participants added */}
          <FlatList
            style={styles.participantList}
            horizontal={true}
            data={participants}
            renderItem={({ item }) => this.renderParticipantsListItem(item)}
          />
          <SearchBar
            style={styles.bar}
            placeholder="Search..."
            onChangeText={text => this._filterSearch(text)}
            onClear={() => this._filterSearch("")}
            value={search}
          />
          {/* list of participants user can choose to add from */}
          <FlatList
            data={filteredData}
            ItemSeparatorComponent={userItemSeparator}
            renderItem={({ item }) =>
              <View style={styles.listItem}>
                <TextButton
                  style={styles.searchText}
                  title={item.username}
                  primary
                  onPress={() => this.addParticipant(item)}
                />
              </View>}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60
  },
  loading: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  listItem: {
    width: "100%",
    padding: 15,
    borderColor: "#c7c7c7",
    borderBottomWidth: 1
  },
  searchText: {
    fontSize: 20,
    padding: 15
  },
  listItemView: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItemText: {
    fontSize: 23,
    color: "black"
  },
  removeIcon: {
    marginLeft: 5,
    marginBottom: 5,
    width: 15,
    height: 15,
    tintColor: "firebrick"
  }
});

export default AddParticipantScreen;
