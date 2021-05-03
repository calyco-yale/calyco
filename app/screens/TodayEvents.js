import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppBase from '../base_components/AppBase';
import PrimaryText from '../base_components/PrimaryText';
import TextButton from '../base_components/TextButton';
import BR from '../base_components/BR';
import { Actions } from 'react-native-router-flux';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import RoundButton from "../base_components/RoundButton";
import { deleteFriendRequestById, createSimpleFriendRequest } from '../../src/graphql/custom_mutations';


class TodayEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userColor: "#ffa500",
      loggedInUser: null,
    };
  };

  getColor = async () => {    
    const userData = await API.graphql(graphqlOperation(getUser, { id: this.props.userId }));
    const iconColor = userData.data.getUser.image_url;

    if (iconColor != null) {
      // console.log('icon Color from db');
      // console.log(iconColor);
      this.setState({userColor: iconColor});
    }
  };

  render() {
    return (
      <>
      <AppBase
        style={{
          justifyContent: 'center',
        }}
      >
        <View style = {{flexDirection: "column"}}>
          <View style = {{ flex: 3}}>
            <TouchableOpacity
                style={{
                    borderColor: this.state.userColor,
                    backgroundColor: 'white',
                    borderWidth: 3,
                    borderRadius: (240 / 2),
                    width: 240,
                    height: 240,
                    position: 'absolute', 
                    top: 100, left: 55, 
                    right: 0, bottom: 0, 
                    justifyContent: 'center',
                }}
            >
              <LottieView
                style={{
                  width: 250,
                  height: 250,
                  position: 'absolute', 
                  top: 0, left: -3, 
                  right: 0, bottom: 0, 
                  justifyContent: 'center',
                }}
                source={changeSVGColor(require("../../assets/8874-cat.json"), this.state.userColor)}
              />
            </TouchableOpacity>
          </View>
          <View style = {{flex: 1}}>
            <RoundButton
              title = "Got it!"
              //onPress = {}
              buttonColor="orange"
            />
          </View>
        </View>
        </AppBase>
      </>
    )
  }
}

export default TodayEvents;