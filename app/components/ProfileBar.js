import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getColors } from 'lottie-colorify';
import LottieView from 'lottie-react-native';
import RoundButton from '../base_components/RoundButton';
import changeSVGColor from '@killerwink/lottie-react-native-color';

export default function ProfileBar() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("gray");

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

  const pickColor = () => {

  }

  const profilecat = "../../assets/8874-cat.json";
  const imagePath = require(profilecat);


  return (
    <>
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
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
      <LottieView
        style={{
          width: 150,
          height: 150,
          backgroundColor: '#eee',
        }}
        source={changeSVGColor(imagePath, '#000000')}
      />
      <Button
        title="Change Color"
        buttonColor="gray"
        style={{
          fontSize: 12
        }}
        onPress={() => {pickColor}}
      />

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
  selected: {
    position: 'absolute',
    top: 15,
    left: 0,
    borderWidth:5,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 125,
    height: 125,
    backgroundColor:'#fff',
    borderRadius:100,
  }

});