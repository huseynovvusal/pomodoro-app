import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "./screens/HomeScreen"
import SettingsScreen from "./screens/SettingsScreen"

const Stack = createStackNavigator()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        component={HomeScreen}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
