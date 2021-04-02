import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ProfileBar() {
  const [image, setImage] = useState(null);
  const name = "Catherine Ocpylac";
  const id = "kitty_123";
  const bio = "Yale '22";
  const friends = 251;

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <>
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150, 
    height: 150,
    borderRadius: 250
  }

});