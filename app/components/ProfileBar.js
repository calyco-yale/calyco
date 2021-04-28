import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//renders the profile picture in the profile screen
export default function ProfileBar() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#54d05d");
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
      setColor("#54d05d");
    }
  };

  // retrieve color from database and set if valid
  userColor();


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // console.log(isModalVisible);
  };

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
    setColor(color)
    const user = await getloggedInUser();
    await API.graphql(graphqlOperation(updateUser, { id: user.id, image_url: color}))
  }
  
  //Lottie file path of profile image
  const profilecat = "../../assets/8874-cat.json";
  const imagePath = require(profilecat);

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
 
  return (
    <>
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      {image ? 
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
      }

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
