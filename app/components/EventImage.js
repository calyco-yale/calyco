import React, { useState, useEffect, Component } from 'react';
import { StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const EventImage = (event) => {
  const eventDict = {
    //1: 'https://assets10.lottiefiles.com/packages/lf20_4jfpujz6.json',
    exercise: require("../../assets/29951-healthy-lifestyle-exercise.json"),
    rest: require("../../assets/9626-levitate-meditate-peace-and-love.json"),
    study: require("../../assets/25200-student.json"),
    party: require("../../assets/29774-dance-party.json"),
    meeting: require("../../assets/41448-online-team-collaboration-animation.json"),
    meal: require("../../assets/48950-bento-box.json"),
    other: require("../../assets/46864-lovely-cats.json"),
    
  }

  var eventPath = eventDict[event.event];
  if (event.event == null) {
    eventPath = eventDict["exercise"];
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
            backgroundColor: '#f0f0f0',
          }}
          source={eventPath}
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