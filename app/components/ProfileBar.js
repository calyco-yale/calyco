import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity, Button, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getColors } from 'lottie-colorify';
import LottieView from 'lottie-react-native';
import RoundButton from '../base_components/RoundButton';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import Modal from 'react-native-modal';
import ColorPicker from 'react-native-wheel-color-picker'

import { updateUser } from "../../src/graphql/custom_mutations";
import { getloggedInUser } from "../helpers";
import { getUser } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";


export default function ProfileBar() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#54d05d");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log(isModalVisible);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickColor = async (color) => {
    console.log("whassup")
    console.log(color)
    setColor(color)
    console.log('END MY SUFFERING');
    const user = await getloggedInUser();
    const user1 = await API.graphql(graphqlOperation(getUser, { id: user.id }));
    console.log(user1)
    await API.graphql(graphqlOperation(updateUser, { id: user.id, image_url: color}))
    const user2 = await API.graphql(graphqlOperation(getUser, { id: user.id }));
    console.log(user2)
  }

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
            onColorChange={(color) => console.log(color)}
            onColorChangeComplete={(color) => pickColor(color)}
          />
          {/* <Text>HI There</Text> */}
          <Button title="Confirm Color" onPress={toggleModal} />
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