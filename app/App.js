import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ImageBackground } from 'react-native';

import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import LoginComponent from './components/Login'
Amplify.configure(config)

export default function App() {
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <ImageBackground 
  //       source= {require("../assets/calyco-cat-2.jpg")}
  //       style={{
  //         height:'100%',
  //         width:'100%',
  //         position: 'relative'
  //       }}
  //     >
  //       <Button
  //         title="Create Account"
  //         color="#841584"
  //         position = "absolute"
  //         accessibilityLabel="Learn more about this purple button"
  //       />
  //       <Text style={{textAlignVertical: "center", textAlign: "center",}}>Calyco</Text>
  //     </ImageBackground>
      
  //     <StatusBar style="auto"/>
  //   </SafeAreaView>
  // );
  return (
    <LoginComponent
      //loading={loginLoading}
      //loginError={loginError}
      //disableLogin={disableLogin}
      //onLoginSubmit={this.handleLoginSubmit}
      //onEmailChange={this.handleEmailChange}
      //onPasswordChange={this.handlePasswordChange}
    />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
