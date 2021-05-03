import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity, Button, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import RoundButton from '../base_components/RoundButton';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import Modal from 'react-native-modal';
import ColorPicker from 'react-native-wheel-color-picker'

import { updateUser } from "../../src/graphql/custom_mutations";
import { getloggedInUser } from "../helpers";
import { getUser } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";


//renders the profile picture in the profile screen
export default function ProfileBar() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#ffa500");
  const [isModalVisible, setModalVisible] = useState(false);

  //retrieves color by backend graphql call
  const userColor = async() => {    
    const user = await getloggedInUser();
    const userData = await API.graphql(graphqlOperation(getUser, { id: user.id }));
    const iconColor = userData.data.getUser.image_url;

    if (iconColor != null) {
      // console.log('icon Color from db');
      // console.log(iconColor);
      setColor(iconColor);
    } else {
      setColor("#ffa500");
    }
  };

  // retrieve color from database and set if valid
  userColor();


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // console.log(isModalVisible);
  };

  const pickColor = async (color) => {
    setColor(color)
    const user = await getloggedInUser();
    await API.graphql(graphqlOperation(updateUser, { id: user.id, image_url: color}))
  }
  
  //Lottie file path of profile image
  const profilecat = "../../assets/8874-cat.json";
  const imagePath = require(profilecat);
  
  return (
    <>
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    }}>
      {/* {image ? 
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          onPress={pickImage}/> : 
        <TouchableOpacity
          style={styles.selected}
          onPress={pickImage}
        >
          <MaterialCommunityIcons name="account" size={50} />
        </TouchableOpacity>
      } */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          backgroundColor: 'white',
          // justifyContent: 'center',
          // alignContent: 'center',
          borderColor: color,
          borderWidth: 3,
          borderRadius: (140 / 2),
          width: 140,
          height: 140,
        }}
        //onPress={pickColor}
        onPress={toggleModal}
      >
        <LottieView
          style={{
            width: 200,
            height: 200,
            // justifyContent: 'center',
            // alignContent: 'center',
            position: 'absolute',
            top: -10,
            left: -11,
          }}
          source={changeSVGColor(imagePath, color)}
        />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <ColorPicker
            // onColorChange={(color) => console.log(color)}
            color={color}
            onColorChangeComplete={(color) => pickColor(color)}
          />
          {/* <Text>HI There</Text> */}
          <RoundButton
            title="Confirm Color"
            onPress={toggleModal}
            buttonColor="orange"
          />
        </View>
      </Modal>
    </View>
    </>
  );
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
});
