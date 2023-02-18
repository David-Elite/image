import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Geolocation from '@react-native-community/geolocation'


const Home = () => {

  Geolocation.getCurrentPosition(data => console.log('abc',data.coords.latitude))

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({})