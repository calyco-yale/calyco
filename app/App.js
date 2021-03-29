import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ImageBackground } from 'react-native';

import Amplify from 'aws-amplify'
import config from '../aws-exports'
import AppRouter from './router.js'
Amplify.configure(config)

export default function App() {
  return (
    <AppRouter/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
