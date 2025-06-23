import React, { useState,useEffect,useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity,translateY,Animated,TextInput, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DashboardScreen = () => {

  const navigation = useNavigation();




  return (
    <View style={styles.container}>
    <Text>dashboard</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  
});

export default DashboardScreen;


