import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/login";
import DashboardScreen from "./src/dashboardScreen";
import ProductScreen from "./src/productScreen";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LoginScreen"}>
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerTitle:"Login Page",headerTitleAlign: "center",}}/>
        <Stack.Screen name="dashboard" component={DashboardScreen}  options={{headerTitle:"dashboard",headerTitleAlign: "center",}}/>
        <Stack.Screen name="product" component={ProductScreen}  options={{headerTitle:"Product",headerTitleAlign: "center",}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;