/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Button,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import Home from './app/Home/Home';
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const App = () => {
  const [location, setLocation] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageGalleryUri, setImageGalleryUri] = useState('');

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setImageUri(result.assets[0].uri);
    }
  };

  const openImageGallery = async () => {
    const result = await launchImageLibrary(options);
    setImageGalleryUri(result.assets[0].uri);
  };

  useEffect(() => {});

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  Geolocation.getCurrentPosition(data => console.log('latitude'));
  // console.log('abcd')
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={[styles.btnTxt,{alignSelf:'flex-start'}]}>Home</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.btnContainer} onPress={openCamera}>
            <Text style={styles.btnTxt}>Open Camera</Text>
          </TouchableOpacity>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.img} />
          ) : (
            <View style={{marginBottom: 10}} />
          )}
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={openImageGallery}>
            <Text style={styles.btnTxt}>Open Gallery</Text>
          </TouchableOpacity>
          {imageGalleryUri ? (
            <Image source={{uri: imageGalleryUri}} style={styles.img} />
          ) : (
            <View style={{marginBottom: 10}} />
          )}
        </View>
        <View style={{marginTop: 50}}>
          <Text style={styles.headTitle}>Location Detail</Text>
          <Text style={{color: '#000'}}>
            Latitude: {location ? location.coords.latitude : null}
          </Text>
          <Text style={{color: '#000'}}>
            Longitude: {location ? location.coords.longitude : null}
          </Text>
          <TouchableOpacity style={[styles.btnContainer]} onPress={getLocation}>
            <Text style={styles.btnTxt}>Get Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    backgroundColor: 'red',
    padding: 10,
    width: 200,
    marginVertical: 10,
  },
  btnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  img: {
    height: 200,
    width: 200,
    marginVertical: 10,
  },
  headerContainer: {
    backgroundColor: 'red',
   padding: 10
  },
  headTitle:{
    color:'#000',
    fontSize: 20,
    textDecorationLine:'underline'
  }
});

export default App;
