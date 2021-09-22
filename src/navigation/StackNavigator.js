import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// pages
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#0C111F',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: '#F1A93D',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};
