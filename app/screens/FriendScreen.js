import React, { Component } from "react";
import { FlatList } from "react-native";
import { getFriends, renderUserItem, userItemSeparator } from "../helpers";

import AppBase from "../base_components/AppBase";

// Screen to display friends of user
// Friendship ids and user object passed in as props
class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  // Function to fetch friend data to be called when component is mounted
  fetchFriendData = async () => {
    try {
      // Fetch the friend user objects from the array of friendship ids
      const friends = await getFriends(this.props.friendships);
      // Set state of component
      this.setState({ friends: friends });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.fetchFriendData();
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  // Display a Flatlist of friends
  render() {
    const { friends } = this.state;
    return (
      <AppBase>
        <FlatList
          data={friends}
          ItemSeparatorComponent={userItemSeparator}
          renderItem={renderUserItem}
        />
      </AppBase>
    );
  }
}
export default FriendScreen;
