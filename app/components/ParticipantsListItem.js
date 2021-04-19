import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ParticipantsListItem = ({ item }) => {
  return (
    <View style={styles.listItemView}>
      <Text style={styles.listItemText}>
        {item.username}
      </Text>
      <Image
        onPress={() => pass}
        style={styles.removeIcon}
        source={require("../../assets/remove_icon.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ParticipantsListItem;
