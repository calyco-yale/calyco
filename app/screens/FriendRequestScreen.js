import React, { Component } from "react";
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import changeSVGColor from "@killerwink/lottie-react-native-color";
import { getFriendRequests, createMutualFriendship, userItemSeparator } from "../helpers";
import AppBase from "../base_components/AppBase";
import { API, graphqlOperation } from "aws-amplify";
import { getUserFriendRequests } from "../../src/graphql/custom_queries";
import { deleteFriendRequestById } from "../../src/graphql/custom_mutations";
import RoundButton from "../base_components/RoundButton";

// Screen for displaying friend requests
// Array of friend request ids and user object passed in as props
class FriendRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequests: []
    };
  }

  fetchRequestData = async () => {
    try {
      // Fetch the friend request objects from the list of ids and set state of component
      const requests = await getFriendRequests(this.props.friendRequests);
      this.setState({ friendRequests: requests });
    } catch (e) {
      console.log(e);
    }
  };

  // Function to accept friend request given request id and sender of request
  acceptRequest = async (requestId, sender) => {
    try {
      // Create friendships on both sides
      await createMutualFriendship(sender.id, this.props.user.id);
      // Delete friend request
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }));
      // Refetch user's friend requests after update
      const refetch = await API.graphql(graphqlOperation(getUserFriendRequests, { id: this.props.user.id }));
      const requests = await getFriendRequests(refetch.data.getUser.friendRequests.items);
      this.setState({ friendRequests: requests });
    } catch (e) {
      console.log(e);
    }
  };

  // Function to decline friend request given request id
  declineRequest = async requestId => {
    try {
      // Delete the request
      await API.graphql(graphqlOperation(deleteFriendRequestById, { id: requestId }));
      // Refetch user's friend request data
      const refetch = await API.graphql(graphqlOperation(getUserFriendRequests, { id: this.props.user.id }));
      const requests = await getFriendRequests(refetch.data.getUser.friendRequests.items);
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

  // Function to render friend request item for Flatlist
  renderRequestItem(item) {
    const { requestId, sender } = item;
    const profilecat = "../../assets/8874-cat.json";
    const imagePath = require(profilecat);

    return (
      <View requestId={requestId} style={styles.requestList}>
        <View>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              left: -15,
              backgroundColor: "white",
              borderColor: sender.image_url,
              borderWidth: 3,
              borderRadius: 140 / 2,
              width: 120,
              height: 120
            }}
          >
            <LottieView
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: -12,
                left: -14
              }}
              source={changeSVGColor(imagePath, sender.image_url)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 6 }}>
          <View
            style={{ flexDirection: "row", paddingRight: 15, paddingLeft: 15 }}
          >
            <View style={{ paddingLeft: 100 }}>
              <Text style={styles.usernameText}>
                @{sender.username}
              </Text>
              <Text style={styles.fullnameText}>
                {sender.first_name} {sender.last_name}
              </Text>
              <RoundButton
                small="true"
                buttonColor="blue"
                onPress={() => this.acceptRequest(requestId, sender)}
                title="Confirm"
              />
            </View>
            <View style={{ paddingTop: 70 }}>
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
    paddingLeft: 20
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
