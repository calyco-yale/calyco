import React, { Component } from 'react';
import { Drawer, Router, Scene, Actions } from 'react-native-router-flux';

import LoginScreen from './screens/LoginScreen';
// import HomeScreen from './screens/HomeScreen';
import Colors from '../src/constants/colors';
import SignupScreen from './screens/SignupScreen';
import TabViewExample from './screens/ProfilePage';
import VerificationScreen from './screens/VerificationScreen';
import SearchScreen from './screens/SearchScreen';
import UserProfileScreen from './screens/UserProfileScreen'
import FriendScreen from './screens/FriendScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';


const AppRouter = () => (
  <Router>

    <Scene key="root" title="">
      <Scene
        key="loginScreen"
        component={TabViewExample}
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

export default AppRouter;