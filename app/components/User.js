import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';

// Component for rendering information of given user
// Should go to profile page of user when clicked
class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userColor: "#ffa500",
    }
  };

  getColor = async () => {
    //console.log(this.props);    
    const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userItem.id }));
    const iconColor = userData.data.getUser.image_url;

    if (iconColor != null) {
      // console.log('icon Color from db');
      // console.log(iconColor);
      this.setState({userColor: iconColor});
    }
  };

  render() {
    const { userItem } = this.props; //User object
    this.getColor();
    return (
      <TouchableOpacity
      style={styles.listItem}
      onPress={() => Actions.userProfileScreen({ userId: userItem.id })}
    >
        <View style = {{flexDirection: "row"}}>
          <View style = {{flex: 1}}>
            <TouchableOpacity
              style={{
                  borderColor: this.state.userColor,
                  borderWidth: 1,
                  borderRadius: (65 / 2),
                  width: 65,
                  height: 65,
                  position: 'absolute', 
                  top: -9, left: 20, 
                  right: 0, bottom: 20, 
                  justifyContent: 'center',
              }}
            >
              <LottieView
              source={changeSVGColor(require("../../assets/8874-cat.json"), this.state.userColor)}
              />
            </TouchableOpacity>
          </View>
            
              <View style={styles.listView}>
                <Text style={styles.userText}>
                  {userItem.first_name} {userItem.last_name}
                </Text>
              </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 15,
    borderColor: "#c7c7c7",
    borderBottomWidth: 1
  },
  listView: {
    width: 60,
    height: 50,
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginRight: 0
  },
  userText: {
    width: "100%",
    fontSize: 25,
    top: 2,
    marginRight: 50,
    fontFamily: "Futura-Medium",
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
