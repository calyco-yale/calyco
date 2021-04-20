import React, { useState, useEffect, Component } from 'react';
import { StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const EventImage = () => {
  const eventDict = {
    //1: 'https://assets10.lottiefiles.com/packages/lf20_4jfpujz6.json',
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null
  }

  return ( 
    // <LottieView 
    //   source={require("../../assets/48950-bento-box.json")} 
    //   autoPlay 
    //   loop 
    // />
    <LottieView
          // ref={animation => {
          //   this.animation = animation;
          // }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#eee',
          }}
          source={require("../../assets/48950-bento-box.json")}
          autoPlay
          loop
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
    />
  )
}


const styles = StyleSheet.create({
  image: {
    width: 125, 
    height: 125,
    borderRadius: 100,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  selected: {
    position: 'absolute',
    top: 5,
    left: 5,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 125,
    height: 125,
    backgroundColor:'#fff',
    borderRadius:100,
  }

  });

export default EventImage;