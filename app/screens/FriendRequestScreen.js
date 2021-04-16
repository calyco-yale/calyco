import React, { Component } from "react";
import { View, FlatList, Image, StyleSheet, Text } from "react-native";

import {
  getFriendRequests,
  createMutualFriendship,
  userItemSeparator
} from "../helpers";

import AppBase from "../base_components/AppBase";
import PrimaryText from "../base_components/PrimaryText";

import { API, graphqlOperation } from "aws-amplify";
import { getUserFriendRequests } from "../../src/graphql/custom_queries";
import { deleteFriendRequestById } from "../../src/graphql/custom_mutations";
import { Actions } from "react-native-router-flux";
import RoundButton from "../base_components/RoundButton";

class FriendRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequests: []
    };
  }

  fetchRequestData = async () => {
    try {
      const requests = await getFriendRequests(this.props.friendRequests);
      this.setState({ friendRequests: requests });
    } catch (e) {
      console.log(e);
    }
  };

  acceptRequest = async (requestId, sender) => {
    try {
      // Create friendships on both sides
      await createMutualFriendship(sender.id, this.props.user.id);
      // Delete friend request
      await API.graphql(
        graphqlOperation(deleteFriendRequestById, { id: requestId })
      );
      const refetch = await API.graphql(
        graphqlOperation(getUserFriendRequests, { id: this.props.user.id })
      );
      const requests = await getFriendRequests(
        refetch.data.getUser.friendRequests.items
      );
      this.setState({ friendRequests: requests });
    } catch (e) {
      console.log(e);
    }
  };

  declineRequest = async requestId => {
    try {
      await API.graphql(
        graphqlOperation(deleteFriendRequestById, { id: requestId })
      );
      const refetch = await API.graphql(
        graphqlOperation(getUserFriendRequests, { id: this.props.user.id })
      );
      const requests = await getFriendRequests(
        refetch.data.getUser.friendRequests.items
      );
      this.setState({ friendRequests: requests });
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

  renderRequestItem(item) {
    const { requestId, sender } = item;
    return (
      <View requestId={requestId} style={styles.requestList}>
        <View>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://timesofindia.indiatimes.com/photo/67586673.cms"
            }}
          />
          {/* sender.image_url  */}
          <Text style={styles.usernameText}>
            @{sender.username}
          </Text>
        </View>
        <View style={{ paddingTop: 8 }}>
          <Text style={styles.fullnameText}>
            {sender.first_name} {sender.last_name}
          </Text>
          <View
            style={{ flexDirection: "row", paddingRight: 15, paddingLeft: 15 }}
          >
            <View style={{ paddingRight: 10 }}>
              <RoundButton
                small="true"
                buttonColor="blue"
                onPress={() => this.acceptRequest(requestId, sender)}
                title="Confirm"
              />
            </View>
            <View>
              <RoundButton
                small="true"
                buttonColor="grey"
                onPress={() => this.declineRequest(requestId)}
                title="Delete"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { friendRequests } = this.state; //Array of form {friendRequestId, Sender user object}
    if (friendRequests.length != 0) {
      return (
        <AppBase>
          <FlatList
            data={friendRequests}
            keyExtractor={(item, index) => item.requestId}
            ItemSeparatorComponent={userItemSeparator}
            renderItem={({ index, item }) => this.renderRequestItem(item)}
          />
        </AppBase>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  requestList: {
    flexDirection: "row",
    padding: 15,
    borderColor: "#c7c7c7",
    borderBottomWidth: 1
  },
  usernameText: {
    color: "#717172",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5
  },
  fullnameText: {
    fontSize: 25,
    paddingTop: 10,
    paddingLeft: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "relative",
    padding: 15,
    marginRight: 15
  }
});
export default FriendRequestScreen;
