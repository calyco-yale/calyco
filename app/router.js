import React, { Component } from 'react';
import { Drawer, Router, Scene, Actions, Stack, Tabs } from 'react-native-router-flux';
import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
// import HomeScreen from './screens/HomeScreen';
import Colors from '../src/constants/colors';
import SignupScreen from './screens/SignupScreen';
import VerificationScreen from './screens/VerificationScreen';
import SearchScreen from './screens/SearchScreen';
import UserProfileScreen from './screens/UserProfileScreen'
import FriendScreen from './screens/FriendScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';
import ProfilePage from './screens/ProfilePage';
import NavBar from './components/NavBar';
import NewsFeedScreen from './screens/NewsFeedScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const AppRouter = () => (
  <Router>
    <Scene key="root" title="">
      <Scene
        key="loginScreen"
        initial
        component={LoginScreen}
        gesturesEnabled={false}
        hideNavBar
      />

      {/* <Scene
        key="signupScreen"
        component={SignupScreen}
        hideNavBar
      />

      <Scene
        key="verificationScreen"
        component={VerificationScreen}
        hideNavBar
      />

      <Scene
        key="userProfileScreen"
        component={UserProfileScreen}
      />

      <Scene 
        key="friendScreen"
        component={FriendScreen}
      />

      <Scene
        key="friendRequestScreen"
        component = {FriendRequestScreen}
      /> */}

      <Scene key='tabBar' hideNavBar tabs={true} tabBarStyle={styles.tabBar} default='Main'>
        <Scene key='newsFeed' component={NewsFeedScreen} hideNavBar={true} icon={NewsFeedTab} title='News Feed'/>
        <Scene key='searchScreen' component={SearchScreen} hideNavBar={true} icon={SearchTab} title='Search Screen'/>
        <Scene key ='profilePage' component={ProfilePage} hideNavBar={true} icon={ProfileTab} title='Profile Page'/>
      </Scene>
    
    </Scene>
  </Router>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent:'space-between'
  }
});

const NewsFeedTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  // const settingImageFocused = require("Give your image path")
  // const settingImageUnfocused = require("Give your image path")
  // let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <MaterialCommunityIcons name="home" color= '#000000' size={26} />
  <Text style={{color: textColor}}>Settings</Text>
  </View>
  );
}

const SearchTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  // const settingImageFocused = <MaterialCommunityIcons name="home" color={color} size={26} />
  // const settingImageUnfocused = require("Give your image path")
  // let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <MaterialCommunityIcons name="bell" color= '#000000' size={26} />
  <Text style={{color: textColor}}>Settings</Text>
  </View>
  );
}

const ProfileTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  // const settingImageFocused = require("Give your image path")
  // const settingImageUnfocused = require("Give your image path")
  // let settingImage = props.focused ? settingImageFocused : settingImageUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <MaterialCommunityIcons name="account" color= '#000000' size={26} />
  <Text style={{color: textColor}}>Settings</Text>
  </View>
  );
}

export default AppRouter;