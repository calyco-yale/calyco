import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../src/constants/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: Colors.calycoColor
  },
  text: {
    fontSize: 23,
    textAlign: "center",
    color: "black"
  }
});

export default Header;
