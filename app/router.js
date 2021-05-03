import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VerificationScreen from './screens/VerificationScreen';
import SearchScreen from './screens/SearchScreen';
import UserProfileScreen from './screens/UserProfileScreen'
import LoggedInUserProfileScreen from './screens/LoggedInUserProfileScreen'
import FriendScreen from './screens/FriendScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';
import NewsFeedScreen from './screens/NewsFeedScreen';
import CreateEventScreen from './screens/CreateEventScreen.js';
import AddParticipantsScreen from './screens/AddParticipantsScreen';
import { NewsFeedTab, SearchTab, ProfileTab } from './components/NavBar';
import TodayEvents from './screens/TodayEvents';

// Primary logic for navigating between each screen of the app

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

      <Scene
        key="todayEvents"
        component={TodayEvents}
        //initial
        hideNavBar
      />

      <Scene key='tabBar' gesturesEnabled={false} hideNavBar tabs={true} tabBarStyle={styles.tabBar} default='Main'>
        <Scene 
          key='newsFeed' 
          component={NewsFeedScreen} 
          hideNavBar
          icon={NewsFeedTab} 
          title='News Feed'
        />
        <Scene 
          key='searchScreen' 
          component={SearchScreen} 
          hideNavBar
          icon={SearchTab} 
          title='Search'
        />
        <Scene 
          key ="loggedInUserProfileScreen" 
          component={LoggedInUserProfileScreen} 
          hideNavBar
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
    
    <Scene
        key="addParticipantsScreen"
        component={AddParticipantsScreen}
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

export default AppRouter;