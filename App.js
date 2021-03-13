import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from './src/graphql/queries';

export default function App() {
  const data = API.graphql(graphqlOperation(listUsers));
  console.log(data);
  return (

    <View style={styles.container}>
      <h4> {data} </h4>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
