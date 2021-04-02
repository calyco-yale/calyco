import React, { Component } from 'react';
import { Drawer, Router, Scene, Actions, Stack, Tabs } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
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


const AppRouter = () => (
  <Router>
    <Scene key="root" title="">
      <Scene
        key="loginScreen"
        component={LoginScreen}
        initial
        gesturesEnabled={false}
        hideNavBar
      />
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
        key="searchScreen"
        component={SearchScreen}
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
      />

      <Stack>
        <Scene key='tabBar' tabs={true} tabBarStyle={styles.tabBar} default='Main'>
          <Scene key='newsFeed' component={NewsFeedScreen} hideNavBar={true} title='News Feed'/>
          <Scene key='searchScreen' component={SearchScreen} hideNavBar={true} title='Search Screen'/>
          <Scene key ='profilePage' component={ProfilePage} hideNavBar={true} title='Profile Page'/>
        </Scene>
      </Stack>

      {/* <Drawer
        key="drawer"
        hideNavBar
        contentComponent={SideDrawer}
        drawerIcon={<DrawerImage />}
        panHandlers={null}
        drawerWidth={300}
      >
        <Scene>
          <Scene
            key="homeScreen"
            component={HomeScreen}
            title="Restaurant App"
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />

          <Scene
            key="cuisineRestaurants"
            component={CuisineRestaurantsScreen}
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />

          <Scene
            key="restaurantScreen"
            component={RestaurantInfoScreen}
          />

          <Scene
            key="cartScreen"
            component={CartScreen}
            navigationBarStyle={{
              backgroundColor: '#fff',
              elevation: 2,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
            title="Cart"
          />

          <Scene
            drawer={false}
            key="paymentHome"
            component={PaymentHome}
          />

          <Scene
            key="paymentSuccess"
            component={PaymentComplete}
          />

          <Scene
            key="paymentFailed"
            component={PaymentFailed}
          />
          <Scene
            key="showAllOrders"
            component={OrdersList}
            title="My Orders"
          />
        </Scene>
      </Drawer> */}
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