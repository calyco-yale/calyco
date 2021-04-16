import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";

class UserComponent extends Component {
  render() {
    const { userItem } = this.props;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => Actions.userProfileScreen({ userId: userItem.id })}
      >
        <View style={styles.listView}>
          <Image
            style={styles.profileImage}
            source={{ uri: userItem.image_url }}
          />
          <Text style={styles.userText}>
            {userItem.first_name} {userItem.last_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 15,
    // backgroundColor: "#f8f8f8",
    borderColor: "#c7c7c7",
    borderBottomWidth: 1
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userText: {
    width: "100%",
    fontSize: 25,
    top: 10
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: "relative",
    padding: 15,
    marginRight: 15
  }
});
export default UserComponent;
