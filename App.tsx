import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/login";
import DashboardScreen from "./src/dashboardScreen";
import ProductScreen from "./src/productScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import MapScreen from "./src/address";
import AddressListScreen from "./src/allAddress";
// import OTPScreen from "./src/otp";

const Stack = createNativeStackNavigator();

const App = () => {

  const [initial, satInitial] = useState('')

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          satInitial('dashboard');
        } else {
          satInitial('LoginScreen');
        }
      } catch (error) {
        console.warn('Error retrieving email:', error);
        satInitial('LoginScreen');
      }
    }

    checkLogin();
  },[])
if (!initial) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: "Login Page", headerTitleAlign: "center", }} />
        <Stack.Screen name="dashboard" component={DashboardScreen} options={{ headerTitle: "dashboard", headerTitleAlign: "center", }} />
        <Stack.Screen name="product" component={ProductScreen} options={{ headerTitle: "Product", headerTitleAlign: "center", }} />
        <Stack.Screen name="Address" component={MapScreen}  options={{headerTitle:"Address",headerTitleAlign: "center",}}/>
        <Stack.Screen name="AddressList" component={AddressListScreen}  options={{headerTitle:"Address",headerTitleAlign: "center",}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;