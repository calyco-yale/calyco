import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, View, Text, Image } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VerificationScreen from './screens/VerificationScreen';
import SearchScreen from './screens/SearchScreen';
import UserProfileScreen from './screens/UserProfileScreen'
import LoggedInUserProfileScreen from './screens/LoggedInUserProfileScreen'
import FriendScreen from './screens/FriendScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';
// import ProfilePage from './screens/ProfilePage'; 
import NewsFeedScreen from './screens/NewsFeedScreen';
import CreateEventScreen from './screens/CreateEventScreen.js';

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

      <Scene key='tabBar' hideNavBar tabs={true} tabBarStyle={styles.tabBar} default='Main'>
        <Scene 
          key='newsFeed' 
          component={NewsFeedScreen} 
          hideNavBar 
          gesturesEnabled={false}
          icon={NewsFeedTab} 
          title='News Feed'
        />
        <Scene 
          key='searchScreen' 
          component={SearchScreen} 
          hideNavBar
          gesturesEnabled={false}
          icon={SearchTab} 
          title='Search'
        />
        <Scene 
          key ="loggedInUserProfileScreen" 
          component={LoggedInUserProfileScreen} 
          hideNavBar 
          gesturesEnabled={false}
          icon={ProfileTab} 
          title='My Profile'
        />
      </Scene>

      <Scene
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
        title='Profile'
        backTitle='Back'
      />

      <Scene 
        key="friendScreen"
        title='Friends'
        backTitle='Back'
        component={FriendScreen}
      />

      <Scene
        key="friendRequestScreen"
        title='Friend Requests'
        backTitle='Back'
        component = {FriendRequestScreen}
      />

    <Scene
        key="createEventScreen"
        component={CreateEventScreen}
        hideNavBar
      />
    
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
  const newsFeedIconFocused = require("../assets/home-variant.png")
  const newsFeedIconUnfocused = require("../assets/home-variant-outline.png")
  let newsFeedIcon = props.focused ? newsFeedIconFocused : newsFeedIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={newsFeedIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>News Feed</Text>
  </View>
  );
}

const SearchTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  const searchIconFocused = require("../assets/account-search.png")
  const searchIconUnfocused = require("../assets/account-search-outline.png")
  let searchIcon = props.focused ? searchIconFocused : searchIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={searchIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>Search</Text>
  </View>
  );
}

const ProfileTab = (props) => {
  let textColor = props.focused ? '#333333' : '#999999'
  const profileIconFocused = require("../assets/account-circle.png")
  const profileIconUnfocused = require("../assets/account-circle-outline.png")
  let profileIcon = props.focused ? profileIconFocused : profileIconUnfocused
  let borderColor = props.focused ? '#333333' : '#FFFFFF'
  return (
  <View style={{flex: 1, flexDirection:'column', alignItems:'center', justifyContent:'center', borderTopColor: borderColor, borderTopWidth:4, padding:20}}>
  <Image source ={profileIcon} style={{width: 20, height: 20}} />
  <Text style={{color: textColor}}>Profile</Text>
  </View>
  );
}

export default AppRouter;