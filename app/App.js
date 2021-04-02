import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ImageBackground } from 'react-native';

import Amplify from 'aws-amplify'
import config from '../aws-exports'
import AppRouter from './router.js'
Amplify.configure(config)

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SignupScreen from './screens/SignupScreen';

import NavBar from './components/NavBar';


export default function App() {
  return (
    <>
      <AppRouter/>
      {/* <NavBar/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});